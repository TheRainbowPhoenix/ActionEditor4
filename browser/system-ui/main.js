import { parseSystem, serializeSystem } from '../src/data/system.js';

// 多言語対応のテキスト
const translations = {
  en: {
    title: 'ActionEditor System.dat Converter',
    description: 'Convert between System.dat and its JSON representation.',
    converterTitle: 'System.dat Converter',
    converterDescription: 'Drop a System.dat file to convert to JSON, or a JSON file to rebuild System.dat.',
    selectFile: 'Select a file',
    dropZoneText: 'Drop a .dat or .json file here',
    preview: 'Preview',
    downloadResult: 'Download result',
    downloadReady: 'Download Ready',
    downloadSystemDat: 'Download System.dat',
    footerTip: 'Tip: start from the original System.dat file in original/PURE/default.',
    statusReady: 'Ready. Drop a file to begin.',
    statusProcessing: 'Processing...',
    errorUnsupportedFile: 'Unsupported file type. Provide a .dat or .json file.',
    successDatToJson: 'Converted {0} to {1}.',
    successJsonToDat: 'Built {0} from {1}.',
    errorParse: 'Failed to parse {0}: {1}',
    errorBuild: 'Failed to build from {0}: {1}'
  },
  ja: {
    title: 'ActionEditor System.dat コンバーター',
    description: 'System.dat と JSON 表現の間で変換します。',
    converterTitle: 'System.dat コンバーター',
    converterDescription: 'System.dat ファイルをドロップして JSON に変換、または JSON ファイルをドロップして System.dat を再構築します。',
    selectFile: 'ファイルを選択',
    dropZoneText: '.dat または .json ファイルをここにドロップ',
    preview: 'プレビュー',
    downloadResult: '結果をダウンロード',
    downloadReady: 'ダウンロード準備完了',
    downloadSystemDat: 'System.dat をダウンロード',
    footerTip: 'ヒント: original/PURE/default 内の元の System.dat ファイルから開始してください。',
    statusReady: '準備完了。ファイルをドロップして開始してください。',
    statusProcessing: '処理中...',
    errorUnsupportedFile: '未対応のファイルタイプです。.dat または .json ファイルを指定してください。',
    successDatToJson: '{0} を {1} に変換しました。',
    successJsonToDat: '{1} から {0} を構築しました。',
    errorParse: '{0} の解析に失敗しました: {1}',
    errorBuild: '{0} からの構築に失敗しました: {1}'
  }
};

let currentLanguage = 'en';

const dropZone = document.getElementById('drop-zone');
const status = document.getElementById('status');
const preview = document.getElementById('preview');
const output = document.getElementById('output');
const downloadButton = document.getElementById('download-button');
const downloadSection = document.getElementById('download-section');
const downloadDatLink = document.getElementById('download-dat-link');
const fileInput = document.getElementById('file-input');
const fileButton = document.getElementById('file-button');
const languageSelect = document.getElementById('language-select');

let jsonDownloadUrl = null;
let datDownloadUrl = null;
let currentDownloadName = null;
let currentMode = null; // 'dat-to-json' or 'json-to-dat'

// 言語を更新する関数
function updateLanguage(lang) {
  currentLanguage = lang;
  languageSelect.value = lang;
  
  // データ属性を持つすべての要素を更新
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
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

function readStoredLanguage() {
  try {
    return localStorage.getItem('system-ui-language');
  } catch (error) {
    console.warn('Failed to read stored language preference:', error);
    return null;
  }
}

function writeStoredLanguage(value) {
  try {
    localStorage.setItem('system-ui-language', value);
  } catch (error) {
    console.warn('Failed to persist language preference:', error);
  }
}

function resetPreview() {
  // Clean up URLs
  if (jsonDownloadUrl) {
    URL.revokeObjectURL(jsonDownloadUrl);
    jsonDownloadUrl = null;
  }
  if (datDownloadUrl) {
    URL.revokeObjectURL(datDownloadUrl);
    datDownloadUrl = null;
  }
  
  currentDownloadName = null;
  currentMode = null;
  downloadButton.disabled = true;
  preview.hidden = true;
  downloadSection.hidden = true;
  output.value = '';
}

function setStatus(message, type = 'info') {
  status.textContent = message;
  if (type) {
    status.dataset.state = type;
  } else {
    delete status.dataset.state;
  }
}

function setDragState(active) {
  dropZone.classList.toggle('dragging', active);
}

function isDatFile(file) {
  return file.name.toLowerCase().endsWith('.dat');
}

function isJsonFile(file) {
  return file.name.toLowerCase().endsWith('.json');
}

async function handleDatFile(file) {
  try {
    const buffer = await file.arrayBuffer();
    const parsed = parseSystem(buffer);
    const json = JSON.stringify(parsed, null, 2);
    resetPreview();
    output.value = json;
    preview.hidden = false;
    
    // Setup JSON download
    const blob = new Blob([json], { type: 'application/json' });
    jsonDownloadUrl = URL.createObjectURL(blob);
    currentDownloadName = file.name.replace(/\.dat$/i, '.json');
    currentMode = 'dat-to-json';
    
    // Enable download button for JSON
    downloadButton.disabled = false;
    
    setStatus(t('successDatToJson', file.name, currentDownloadName), 'success');
  } catch (error) {
    resetPreview();
    console.error(error);
    setStatus(t('errorParse', file.name, error.message), 'error');
  }
}

async function handleJsonFile(file) {
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const arrayBuffer = serializeSystem(payload);
    resetPreview();
    const bytes = new Uint8Array(arrayBuffer);
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    datDownloadUrl = URL.createObjectURL(blob);
    currentDownloadName = file.name.replace(/\.json$/i, '.dat');
    currentMode = 'json-to-dat';
    
    // Setup DAT download section
    downloadDatLink.href = datDownloadUrl;
    downloadDatLink.download = currentDownloadName;
    downloadSection.hidden = false;
    
    setStatus(t('successJsonToDat', currentDownloadName, file.name), 'success');
  } catch (error) {
    resetPreview();
    console.error(error);
    setStatus(t('errorBuild', file.name, error.message), 'error');
  }
}

async function handleFile(file) {
  if (isDatFile(file)) {
    await handleDatFile(file);
    return;
  }
  if (isJsonFile(file)) {
    await handleJsonFile(file);
    return;
  }
  setStatus(t('errorUnsupportedFile'), 'error');
}

function handleFiles(files) {
  if (!files || files.length === 0) {
    return;
  }
  setStatus(t('statusProcessing'));
  handleFile(files[0]);
}

function downloadCurrentFile() {
  if (!currentMode) return;
  
  if (currentMode === 'dat-to-json' && jsonDownloadUrl && currentDownloadName) {
    // Download JSON file
    const link = document.createElement('a');
    link.href = jsonDownloadUrl;
    link.download = currentDownloadName;
    document.body.append(link);
    link.click();
    link.remove();
  } else if (currentMode === 'json-to-dat' && datDownloadUrl && currentDownloadName) {
    // Download DAT file
    const link = document.createElement('a');
    link.href = datDownloadUrl;
    link.download = currentDownloadName;
    document.body.append(link);
    link.click();
    link.remove();
  }
}

// ドラッグ&ドロップのハンドラー
function setupDropZone() {
  dropZone.addEventListener('dragenter', (event) => {
    event.preventDefault();
    setDragState(true);
  });

  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    setDragState(true);
  });

  dropZone.addEventListener('dragleave', (event) => {
    if (event.target === dropZone || !dropZone.contains(event.relatedTarget)) {
      setDragState(false);
    }
  });

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    setDragState(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  });

  dropZone.addEventListener('click', () => {
    fileInput.click();
  });
}

// 初期化
function init() {
  const savedLanguage = readStoredLanguage();
  const browserLanguage = navigator.language.startsWith('ja') ? 'ja' : 'en';
  const initialLanguage = savedLanguage || browserLanguage;
  
  updateLanguage(initialLanguage);
  setupDropZone();
  setStatus(t('statusReady'));
}

// イベントリスナーの設定
fileButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    handleFiles(files);
  }
  fileInput.value = '';
});

// Single download button that handles both JSON and DAT downloads
downloadButton.addEventListener('click', () => {
  downloadCurrentFile();
});

// Also allow clicking the download link in the download section
downloadDatLink.addEventListener('click', (event) => {
  // Let the native download behavior handle it since we've set href and download attributes
  // No need for additional logic here
});

languageSelect?.addEventListener('change', (event) => {
  const lang = event.target.value;
  updateLanguage(lang);
  writeStoredLanguage(lang);
});

window.addEventListener('beforeunload', () => {
  if (jsonDownloadUrl) {
    URL.revokeObjectURL(jsonDownloadUrl);
  }
  if (datDownloadUrl) {
    URL.revokeObjectURL(datDownloadUrl);
  }
});

// アプリケーションの初期化
init();