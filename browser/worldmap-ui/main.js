import EncodingModule from 'encoding-japanese';
import { parseWorldMap, serializeWorldMap } from '../src/data/worldMap.js';

const encoding = EncodingModule?.default ?? EncodingModule;
if (encoding && typeof encoding.convert === 'function') {
  globalThis.__ACTED_ENCODING_JAPANESE__ = encoding;
}

// 多言語対応のテキスト
const translations = {
  en: {
    title: 'World Map Converter',
    description: 'Dump WorldMap.dat files to JSON, tweak them, then rebuild an identical binary. The parser mirrors the desktop editor so you can debug issues without leaving the browser.',
    dumpTitle: 'Dump WorldMap.dat',
    dumpDescription: 'Select a binary world map. The tool parses and prints a formatted JSON payload.',
    buildTitle: 'Build WorldMap.dat',
    buildDescription: 'Load a JSON payload (dumped or hand-authored) and rebuild a binary file.',
    filePickerLabel: 'WorldMap.dat file',
    dumpButton: 'Dump to JSON',
    copyJson: 'Copy JSON',
    downloadJson: 'Download JSON',
    loadJsonFile: 'Load JSON file',
    buildButton: 'Build binary',
    downloadDat: 'Download WorldMap.dat',
    jsonOutputPlaceholder: 'JSON output',
    jsonInputPlaceholder: 'Paste or edit the world map JSON that should become WorldMap.dat',
    footer: 'For testing purpose. Not a final product or tool.',
    dropZoneDump: 'Drop WorldMap.dat file here or use file picker',
    dropZoneBuild: 'Drop JSON file here or use file picker',
    statusReady: 'Ready. Drop a file to begin.',
    statusProcessing: 'Processing...',
    errorNoFile: 'Select a WorldMap.dat file to dump.',
    errorNoJson: 'Enter or load JSON before building.',
    errorClipboard: 'Clipboard access is not available in this browser.',
    errorNoJsonToCopy: 'There is no JSON to copy yet.',
    successCopied: 'Copied JSON to clipboard.',
    successDumped: 'Parsed {0} successfully. JSON is {1} characters.',
    successLoaded: 'Loaded {0} ({1} bytes) into the editor.',
    successBuilt: 'Serialised world map successfully. Binary size: {0} bytes.',
    errorParse: 'Failed to parse {0}: {1}',
    errorBuild: 'Failed to build world map: {1}',
    errorReadFile: 'Failed to read file: {1}'
  },
  ja: {
    title: 'ワールドマップコンバーター',
    description: 'WorldMap.datファイルをJSONに変換して編集し、同一のバイナリを再構築します。デスクトップエディターと同じパーサーを使用しているため、ブラウザ内で問題をデバッグできます。',
    dumpTitle: 'WorldMap.datの抽出',
    dumpDescription: 'バイナリのワールドマップを選択してください。ツールが解析してフォーマットされたJSONを表示します。',
    buildTitle: 'WorldMap.datの構築',
    buildDescription: 'JSONペイロード（抽出済みまたは手動作成）を読み込んでバイナリファイルを再構築します。',
    filePickerLabel: 'WorldMap.datファイル',
    dumpButton: 'JSONに変換',
    copyJson: 'JSONをコピー',
    downloadJson: 'JSONをダウンロード',
    loadJsonFile: 'JSONファイルを読み込み',
    buildButton: 'バイナリを構築',
    downloadDat: 'WorldMap.datをダウンロード',
    jsonOutputPlaceholder: 'JSON出力',
    jsonInputPlaceholder: 'WorldMap.datになるワールドマップJSONを貼り付けまたは編集してください',
    footer: 'テスト目的です。最終製品またはツールではありません。',
    dropZoneDump: 'WorldMap.datファイルをここにドロップするか、ファイルピッカーを使用してください',
    dropZoneBuild: 'JSONファイルをここにドロップするか、ファイルピッカーを使用してください',
    statusReady: '準備完了。ファイルをドロップして開始してください。',
    statusProcessing: '処理中...',
    errorNoFile: '抽出するWorldMap.datファイルを選択してください。',
    errorNoJson: '構築前にJSONを入力または読み込んでください。',
    errorClipboard: 'このブラウザではクリップボードにアクセスできません。',
    errorNoJsonToCopy: 'コピーするJSONがまだありません。',
    successCopied: 'JSONをクリップボードにコピーしました。',
    successDumped: '{0}の解析に成功しました。JSONは{1}文字です。',
    successLoaded: '{0} ({1}バイト) をエディターに読み込みました。',
    successBuilt: 'ワールドマップのシリアライズに成功しました。バイナリサイズ: {0}バイト。',
    errorParse: '{0}の解析に失敗しました: {1}',
    errorBuild: 'ワールドマップの構築に失敗しました: {1}',
    errorReadFile: 'ファイルの読み込みに失敗しました: {1}'
  }
};

let currentLanguage = 'en';

const dumpFileInput = document.getElementById('dump-file');
const dumpButton = document.getElementById('dump-button');
const copyJsonButton = document.getElementById('copy-json');
const downloadJsonLink = document.getElementById('download-json');
const dumpStatus = document.getElementById('dump-status');
const jsonOutput = document.getElementById('json-output');
const dumpDropZone = document.getElementById('dump-drop-zone');

const loadJsonFileButton = document.getElementById('load-json-file');
const buildFileInput = document.getElementById('build-file');
const buildButton = document.getElementById('build-button');
const downloadDatLink = document.getElementById('download-dat');
const buildStatus = document.getElementById('build-status');
const jsonInput = document.getElementById('json-input');
const buildDropZone = document.getElementById('build-drop-zone');

const languageSelect = document.getElementById('language-select');

let jsonDownloadUrl = null;
let datDownloadUrl = null;

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
  
  // placeholder属性の更新
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // ステータスメッセージを現在の言語で更新
  updateStatusMessages();
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

// ステータスメッセージを更新
function updateStatusMessages() {
  if (dumpStatus.textContent === translations.en.statusReady || dumpStatus.textContent === translations.ja.statusReady) {
    setStatus(dumpStatus, t('statusReady'));
  }
  if (buildStatus.textContent === translations.en.statusReady || buildStatus.textContent === translations.ja.statusReady) {
    setStatus(buildStatus, t('statusReady'));
  }
}

function readStoredLanguage() {
  try {
    return localStorage.getItem('worldmap-ui-language');
  } catch (error) {
    console.warn('Failed to read stored language preference:', error);
    return null;
  }
}

function writeStoredLanguage(value) {
  try {
    localStorage.setItem('worldmap-ui-language', value);
  } catch (error) {
    console.warn('Failed to persist language preference:', error);
  }
}

function revokeUrl(url) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

function setStatus(target, message, state = null) {
  if (!target) {
    return;
  }
  target.textContent = message;
  if (state) {
    target.dataset.state = state;
  } else {
    delete target.dataset.state;
  }
}

function formatError(error) {
  if (!error) {
    return 'Unknown error';
  }
  if (error.stack) {
    return error.stack;
  }
  if (error.message) {
    return error.message;
  }
  return String(error);
}

function showError(target, error) {
  console.error(error);
  setStatus(target, formatError(error), 'error');
}

function showSuccess(target, message) {
  setStatus(target, message, 'success');
}

function updateDownloadLink(link, currentUrl, blob, filename) {
  if (!link) {
    return currentUrl;
  }
  revokeUrl(currentUrl);
  if (!blob) {
    link.classList.add('disabled');
    link.removeAttribute('href');
    link.removeAttribute('download');
    return null;
  }
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.classList.remove('disabled');
  return url;
}

// ドラッグ&ドロップのハンドラー
function setupDropZone(dropZone, inputElement, onFileDrop) {
  dropZone.addEventListener('dragenter', (event) => {
    event.preventDefault();
    dropZone.classList.add('dragging');
  });

  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  dropZone.addEventListener('dragleave', (event) => {
    if (event.target === dropZone || !dropZone.contains(event.relatedTarget)) {
      dropZone.classList.remove('dragging');
    }
  });

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('dragging');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      // 入力要素のfilesを更新
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      inputElement.files = dataTransfer.files;
      
      onFileDrop(files[0]);
    }
  });
}

async function dumpWorldMap() {
  const file = dumpFileInput?.files?.[0];
  if (!file) {
    setStatus(dumpStatus, t('errorNoFile'), 'error');
    return;
  }

  try {
    setStatus(dumpStatus, t('statusProcessing'));
    const buffer = await file.arrayBuffer();
    const parsed = parseWorldMap(buffer);
    const formatted = JSON.stringify(parsed, null, 2);
    jsonOutput.value = formatted;
    const jsonBaseName = file.name.replace(/\.dat$/i, '') || 'WorldMap';
    const jsonFileName = `${jsonBaseName}.json`;
    jsonDownloadUrl = updateDownloadLink(
      downloadJsonLink,
      jsonDownloadUrl,
      new Blob([formatted], { type: 'application/json' }),
      jsonFileName
    );
    showSuccess(
      dumpStatus,
      t('successDumped', file.name, formatted.length.toLocaleString())
    );
  } catch (error) {
    jsonDownloadUrl = updateDownloadLink(downloadJsonLink, jsonDownloadUrl, null);
    showError(dumpStatus, t('errorParse', file.name, error.message));
  }
}

function copyJsonToClipboard() {
  if (!navigator.clipboard) {
    setStatus(dumpStatus, t('errorClipboard'), 'error');
    return;
  }
  const text = jsonOutput.value;
  if (!text) {
    setStatus(dumpStatus, t('errorNoJsonToCopy'), 'error');
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showSuccess(dumpStatus, t('successCopied'));
    })
    .catch((error) => {
      showError(dumpStatus, error);
    });
}

function loadJsonFile() {
  buildFileInput?.click();
}

function readUploadedJson(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    jsonInput.value = reader.result;
    showSuccess(
      buildStatus,
      t('successLoaded', file.name, file.size.toLocaleString())
    );
    buildFileInput.value = '';
  };
  reader.onerror = () => {
    showError(buildStatus, t('errorReadFile', file.name, reader.error?.message || 'Unknown error'));
    buildFileInput.value = '';
  };
  reader.readAsText(file);
}

function buildWorldMap() {
  const source = jsonInput.value;
  if (!source.trim()) {
    setStatus(buildStatus, t('errorNoJson'), 'error');
    return;
  }
  try {
    const payload = JSON.parse(source);
    const arrayBuffer = serializeWorldMap(payload);
    const bytes = new Uint8Array(arrayBuffer);
    datDownloadUrl = updateDownloadLink(
      downloadDatLink,
      datDownloadUrl,
      new Blob([bytes], { type: 'application/octet-stream' }),
      'WorldMap.dat'
    );
    showSuccess(
      buildStatus,
      t('successBuilt', bytes.byteLength.toLocaleString())
    );
  } catch (error) {
    datDownloadUrl = updateDownloadLink(downloadDatLink, datDownloadUrl, null);
    showError(buildStatus, t('errorBuild', '', error.message));
  }
}

// ファイルドロップ時の処理
function handleDumpFileDrop(file) {
  if (file.name.toLowerCase().endsWith('.dat')) {
    dumpWorldMap();
  } else {
    setStatus(dumpStatus, t('errorNoFile'), 'error');
  }
}

function handleBuildFileDrop(file) {
  if (file.name.toLowerCase().endsWith('.json')) {
    const reader = new FileReader();
    reader.onload = () => {
      jsonInput.value = reader.result;
      showSuccess(
        buildStatus,
        t('successLoaded', file.name, file.size.toLocaleString())
      );
    };
    reader.onerror = () => {
      showError(buildStatus, t('errorReadFile', file.name, reader.error?.message || 'Unknown error'));
    };
    reader.readAsText(file);
  } else {
    setStatus(buildStatus, 'JSONファイルをドロップしてください', 'error');
  }
}

// 初期化
function init() {
  const savedLanguage = readStoredLanguage();
  const browserLanguage = navigator.language.startsWith('ja') ? 'ja' : 'en';
  const initialLanguage = savedLanguage || browserLanguage;
  
  updateLanguage(initialLanguage);
  
  // ドラッグ&ドロップの設定
  setupDropZone(dumpDropZone, dumpFileInput, handleDumpFileDrop);
  setupDropZone(buildDropZone, buildFileInput, handleBuildFileDrop);
  
  setStatus(dumpStatus, t('statusReady'));
  setStatus(buildStatus, t('statusReady'));
}

// イベントリスナーの設定
dumpButton?.addEventListener('click', dumpWorldMap);
copyJsonButton?.addEventListener('click', copyJsonToClipboard);
loadJsonFileButton?.addEventListener('click', loadJsonFile);
buildFileInput?.addEventListener('change', readUploadedJson);
buildButton?.addEventListener('click', buildWorldMap);

languageSelect?.addEventListener('change', (event) => {
  const lang = event.target.value;
  updateLanguage(lang);
  writeStoredLanguage(lang);
});

window.addEventListener('beforeunload', () => {
  revokeUrl(jsonDownloadUrl);
  revokeUrl(datDownloadUrl);
});

// アプリケーションの初期化
init();