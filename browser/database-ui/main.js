import { resolveParser, resolveSerializer } from '../src/data/databases.js';

const DATABASE_TYPES = [
  'Anime.dat',
  'AnimeSet.dat',
  'Bgm.dat',
  'CharaEffect.dat',
  'Picture.dat',
  'Sound.dat',
  'Bmp_CharaExc.dat',
  'Effect.dat',
  'ScrEffect.dat',
  'SwordType.dat'
];

// 多言語対応のテキスト
const translations = {
  en: {
    title: 'ActionEditor Database Converter',
    description: 'Drop a supported .dat or .json file to convert between the ActionEditor database formats.',
    databaseType: 'Database type',
    autoDetect: 'Auto-detect from filename',
    selectFile: 'Select a file',
    dropZoneText: 'Drop a file here or use the "Select a file" button.',
    preview: 'Preview',
    downloadResult: 'Download result',
    supportedDatabases: 'Supported databases: Anime, AnimeSet, Bgm, CharaEffect, Picture, Sound, Bmp_CharaExc, Effect, ScrEffect, SwordType.',
    statusReady: 'Ready. Drop a file to begin.',
    statusProcessing: 'Processing...',
    errorUnknownType: 'Unknown database type. Select a type before converting.',
    errorUnsupportedFile: 'Unsupported file type. Provide a .dat or .json file.',
    successConvert: 'Converted {0} to {1}.',
    errorParse: 'Failed to parse {0}: {1}',
    errorBuild: 'Failed to build {0}: {1}'
  },
  ja: {
    title: 'ActionEditor データベースコンバーター',
    description: '対応している .dat または .json ファイルをドロップして、ActionEditor データベース形式を変換します。',
    databaseType: 'データベースタイプ',
    autoDetect: 'ファイル名から自動検出',
    selectFile: 'ファイルを選択',
    dropZoneText: 'ファイルをここにドロップするか、「ファイルを選択」ボタンを使用してください。',
    preview: 'プレビュー',
    downloadResult: '結果をダウンロード',
    supportedDatabases: '対応データベース: Anime, AnimeSet, Bgm, CharaEffect, Picture, Sound, Bmp_CharaExc, Effect, ScrEffect, SwordType',
    statusReady: '準備完了。ファイルをドロップして開始してください。',
    statusProcessing: '処理中...',
    errorUnknownType: '不明なデータベースタイプです。変換前にタイプを選択してください。',
    errorUnsupportedFile: '未対応のファイルタイプです。.dat または .json ファイルを指定してください。',
    successConvert: '{0} を {1} に変換しました。',
    errorParse: '{0} の解析に失敗しました: {1}',
    errorBuild: '{0} の構築に失敗しました: {1}'
  }
};

let currentLanguage = 'en';

const canonicalMap = new Map();
for (const type of DATABASE_TYPES) {
  const lower = type.toLowerCase();
  const base = lower.replace(/\.dat$/, '');
  canonicalMap.set(lower, type);
  canonicalMap.set(base, type);
}

const dropZone = document.getElementById('drop-zone');
const status = document.getElementById('status');
const preview = document.getElementById('preview');
const output = document.getElementById('output');
const downloadButton = document.getElementById('download-button');
const typeSelect = document.getElementById('type-select');
const fileInput = document.getElementById('file-input');
const fileButton = document.getElementById('file-button');
const languageSelect = document.getElementById('language-select');

// 言語を更新する関数
function updateLanguage(lang) {
  currentLanguage = lang;
  languageSelect.value = lang;
  
  // データ属性を持つすべての要素を更新
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // ステータスメッセージを現在の言語で更新
  if (status.textContent) {
    const currentText = status.textContent;
    Object.entries(translations.en).forEach(([key, value]) => {
      if (value === currentText && translations[lang][key]) {
        status.textContent = translations[lang][key];
      }
    });
  }
}

// 翻訳関数
function t(key, ...params) {
  let text = translations[currentLanguage][key] || translations.en[key] || key;
  
  // パラメータを置換
  params.forEach((param, index) => {
    text = text.replace(`{${index}}`, param);
  });
  
  return text;
}

DATABASE_TYPES.forEach((type) => {
  const option = document.createElement('option');
  option.value = type;
  option.textContent = type;
  typeSelect.append(option);
});

let downloadUrl = null;
let downloadName = null;

function resetPreview() {
  if (downloadUrl) {
    URL.revokeObjectURL(downloadUrl);
    downloadUrl = null;
  }
  downloadName = null;
  downloadButton.disabled = true;
  preview.hidden = true;
  output.value = '';
}

function setStatus(message, type = 'info') {
  status.textContent = message;
  status.dataset.state = type;
}

function guessTypeFromName(fileName) {
  const lower = fileName.toLowerCase();
  if (canonicalMap.has(lower)) {
    return canonicalMap.get(lower);
  }
  const withoutExtension = lower.replace(/\.[^.]+$/, '');
  if (canonicalMap.has(withoutExtension)) {
    return canonicalMap.get(withoutExtension);
  }
  const appendedDat = `${withoutExtension}.dat`;
  if (canonicalMap.has(appendedDat)) {
    return canonicalMap.get(appendedDat);
  }
  return null;
}

function ensureTypeSelection(fileName) {
  const detected = guessTypeFromName(fileName);
  if (detected) {
    typeSelect.value = detected;
    return detected;
  }
  if (typeSelect.value) {
    return typeSelect.value;
  }
  setStatus(t('errorUnknownType'), 'error');
  typeSelect.focus();
  return null;
}

async function convertDatFile(file) {
  const selectedType = ensureTypeSelection(file.name);
  if (!selectedType) {
    return;
  }

  try {
    const parser = resolveParser(selectedType);
    const buffer = await file.arrayBuffer();
    const database = parser(buffer);
    const json = JSON.stringify(database, null, 2);
    resetPreview();
    downloadName = `${selectedType.replace(/\.dat$/i, '')}.json`;
    const blob = new Blob([json], { type: 'application/json' });
    downloadUrl = URL.createObjectURL(blob);
    downloadButton.disabled = false;
    preview.hidden = false;
    output.value = json;
    setStatus(t('successConvert', file.name, downloadName));
  } catch (error) {
    resetPreview();
    console.error(error);
    setStatus(t('errorParse', file.name, error.message), 'error');
  }
}

async function convertJsonFile(file) {
  const selectedType = ensureTypeSelection(file.name);
  if (!selectedType) {
    return;
  }

  try {
    const text = await file.text();
    const database = JSON.parse(text);
    const serializer = resolveSerializer(selectedType);
    const buffer = serializer(database);
    resetPreview();
    downloadName = selectedType;
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    downloadUrl = URL.createObjectURL(blob);
    downloadButton.disabled = false;
    preview.hidden = false;
    output.value = JSON.stringify(database, null, 2);
    setStatus(t('successConvert', file.name, downloadName));
  } catch (error) {
    resetPreview();
    console.error(error);
    setStatus(t('errorBuild', selectedType, error.message), 'error');
  }
}

async function processFile(file) {
  resetPreview();
  setStatus(t('statusProcessing'));
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'dat') {
    await convertDatFile(file);
  } else if (extension === 'json') {
    await convertJsonFile(file);
  } else {
    setStatus(t('errorUnsupportedFile'), 'error');
  }
}

function handleFiles(fileList) {
  if (!fileList || fileList.length === 0) {
    return;
  }
  processFile(fileList[0]);
}

// イベントリスナーの設定
dropZone.addEventListener('dragenter', (event) => {
  event.preventDefault();
  dropZone.classList.add('dragging');
});

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropZone.addEventListener('dragleave', (event) => {
  if (event.target === dropZone) {
    dropZone.classList.remove('dragging');
  }
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('dragging');
  handleFiles(event.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
  fileInput.value = '';
});

fileButton.addEventListener('click', () => {
  fileInput.click();
});

downloadButton.addEventListener('click', () => {
  if (!downloadUrl || !downloadName) {
    return;
  }
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = downloadName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
});

// 言語変更のイベントリスナー
languageSelect.addEventListener('change', (event) => {
  updateLanguage(event.target.value);
});

// 初期化
updateLanguage(navigator.language.startsWith('ja') ? 'ja' : 'en');
setStatus(t('statusReady'));