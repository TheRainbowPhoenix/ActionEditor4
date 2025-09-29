import { parseStage, serializeStage } from '../src/data/stage.js';

// Internationalization strings
const translations = {
  en: {
    title: 'Stage File Converter',
    description: 'Dump .stg4_1020 files to JSON, tweak them, then rebuild an identical binary. The parser mirrors the hex pattern so you can debug issues without leaving the browser.',
    dumpTitle: 'Dump Stage File',
    dumpDescription: 'Select a binary stage file. The tool parses and prints a formatted JSON payload.',
    buildTitle: 'Build Stage File',
    buildDescription: 'Load a JSON payload (dumped or hand-authored) and rebuild a binary stage file.',
    filePickerLabel: 'Stage file (.stg4_1020)',
    dumpButton: 'Dump to JSON',
    copyJson: 'Copy JSON',
    downloadJson: 'Download JSON',
    loadJsonFile: 'Load JSON file',
    buildButton: 'Build binary',
    downloadDat: 'Download .stg4_1020',
    jsonOutputPlaceholder: 'JSON output',
    jsonInputPlaceholder: 'Paste or edit the stage JSON that should become a .stg4_1020 file',
    footer: 'For testing purpose. Not a final product or tool.',
    dropZoneDump: 'Drop .stg4_1020 file here or use file picker',
    dropZoneBuild: 'Drop JSON file here or use file picker',
    statusReady: 'Ready. Drop a file to begin.',
    statusProcessing: 'Processing...',
    errorNoFile: 'Select a .stg4_1020 file to dump.',
    errorNoJson: 'Enter or load JSON before building.',
    errorClipboard: 'Clipboard access is not available in this browser.',
    errorNoJsonToCopy: 'There is no JSON to copy yet.',
    successCopied: 'Copied JSON to clipboard.',
    successDumped: 'Parsed {0} successfully. JSON is {1} characters.',
    successLoaded: 'Loaded {0} ({1} bytes) into the editor.',
    successBuilt: 'Serialised stage file successfully. Binary size: {0} bytes.',
    errorParse: 'Failed to parse {0}: {1}',
    errorBuild: 'Failed to build stage file: {1}',
    errorReadFile: 'Failed to read file: {1}'
  },
  ja: {
    title: 'ステージファイルコンバーター',
    description: '.stg4_1020ファイルをJSONに変換して編集し、同一のバイナリを再構築します。16進パターンをミラーリングしたパーサーを使用しているため、ブラウザ内で問題をデバッグできます。',
    dumpTitle: 'ステージファイルの抽出',
    dumpDescription: 'バイナリのステージファイルを選択してください。ツールが解析してフォーマットされたJSONを表示します。',
    buildTitle: 'ステージファイルの構築',
    buildDescription: 'JSONペイロード（抽出済みまたは手動作成）を読み込んでバイナリのステージファイルを再構築します。',
    filePickerLabel: 'ステージファイル (.stg4_1020)',
    dumpButton: 'JSONに変換',
    copyJson: 'JSONをコピー',
    downloadJson: 'JSONをダウンロード',
    loadJsonFile: 'JSONファイルを読み込み',
    buildButton: 'バイナリを構築',
    downloadDat: '.stg4_1020をダウンロード',
    jsonOutputPlaceholder: 'JSON出力',
    jsonInputPlaceholder: '.stg4_1020になるステージJSONを貼り付けまたは編集してください',
    footer: 'テスト目的です。最終製品またはツールではありません。',
    dropZoneDump: '.stg4_1020ファイルをここにドロップするか、ファイルピッカーを使用してください',
    dropZoneBuild: 'JSONファイルをここにドロップするか、ファイルピッカーを使用してください',
    statusReady: '準備完了。ファイルをドロップして開始してください。',
    statusProcessing: '処理中...',
    errorNoFile: '抽出する.stg4_1020ファイルを選択してください。',
    errorNoJson: '構築前にJSONを入力または読み込んでください。',
    errorClipboard: 'このブラウザではクリップボードにアクセスできません。',
    errorNoJsonToCopy: 'コピーするJSONがまだありません。',
    successCopied: 'JSONをクリップボードにコピーしました。',
    successDumped: '{0}の解析に成功しました。JSONは{1}文字です。',
    successLoaded: '{0} ({1}バイト) をエディターに読み込みました。',
    successBuilt: 'ステージファイルのシリアライズに成功しました。バイナリサイズ: {0}バイト。',
    errorParse: '{0}の解析に失敗しました: {1}',
    errorBuild: 'ステージファイルの構築に失敗しました: {1}',
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

// --- UI and Language Functions (mostly unchanged) ---

function updateLanguage(lang) {
  currentLanguage = lang;
  languageSelect.value = lang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  updateStatusMessages();
}

function t(key, ...params) {
  let text = translations[currentLanguage]?.[key] || translations.en[key] || key;
  params.forEach((param, index) => {
    text = text.replace(`{${index}}`, param);
  });
  return text;
}

function updateStatusMessages() {
  if (dumpStatus.dataset.key === 'statusReady') setStatus(dumpStatus, t('statusReady'));
  if (buildStatus.dataset.key === 'statusReady') setStatus(buildStatus, t('statusReady'));
}

function readStoredLanguage() { try { return localStorage.getItem('stage-ui-language'); } catch (e) { console.warn(e); return null; } }
function writeStoredLanguage(value) { try { localStorage.setItem('stage-ui-language', value); } catch (e) { console.warn(e); } }
function revokeUrl(url) { if (url) URL.revokeObjectURL(url); }

function setStatus(target, message, state = null, key = null) {
  if (!target) return;
  target.textContent = message;
  target.dataset.key = key || '';
  if (state) target.dataset.state = state;
  else delete target.dataset.state;
}

function showError(target, error) {
  console.error(error);
  setStatus(target, error.message, 'error');
}

function showSuccess(target, message) {
  setStatus(target, message, 'success');
}

function updateDownloadLink(link, currentUrl, blob, filename) {
  if (!link) return currentUrl;
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

function setupDropZone(dropZone, onFileDrop) {
  dropZone.addEventListener('dragenter', e => { e.preventDefault(); dropZone.classList.add('dragging'); });
  dropZone.addEventListener('dragover', e => e.preventDefault());
  dropZone.addEventListener('dragleave', e => { if (e.target === dropZone || !dropZone.contains(e.relatedTarget)) dropZone.classList.remove('dragging'); });
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragging');
    if (e.dataTransfer.files.length > 0) onFileDrop(e.dataTransfer.files[0]);
  });
}

// --- Core Application Logic (Refactored for Stage Files) ---

const jsonReplacer = (key, value) => {
  if (value instanceof Uint8Array) {
    // Represent the Uint8Array as an object with a type marker and the data as a plain array.
    return { $type: 'Uint8Array', data: Array.from(value) };
  }
  return value;
};

const jsonReviver = (key, value) => {
  if (value && typeof value === 'object' && value.$type === 'Uint8Array' && Array.isArray(value.data)) {
    return new Uint8Array(value.data);
  }
  return value;
};



async function dumpStageFile(fileFromDrop) {
  const file = fileFromDrop || dumpFileInput?.files?.[0];
  if (!file) {
    setStatus(dumpStatus, t('errorNoFile'), 'error');
    return;
  }
  
  try {
    setStatus(dumpStatus, t('statusProcessing'), null, 'statusProcessing');
    const buffer = await file.arrayBuffer();
    const parsed = parseStage(buffer);
    const formatted = JSON.stringify(parsed, jsonReplacer, 2);
    jsonOutput.value = formatted;
    const jsonBaseName = file.name.replace(/\.stg4_1020$/i, '') || 'stage';
    const jsonFileName = `${jsonBaseName}.json`;
    jsonDownloadUrl = updateDownloadLink(
      downloadJsonLink,
      jsonDownloadUrl,
      new Blob([formatted], { type: 'application/json' }),
      jsonFileName
    );
    showSuccess(dumpStatus, t('successDumped', file.name, formatted.length.toLocaleString()));
  } catch (error) {
    jsonDownloadUrl = updateDownloadLink(downloadJsonLink, jsonDownloadUrl, null);
    showError(dumpStatus, new Error(t('errorParse', file.name, error.message)));
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
  navigator.clipboard.writeText(text)
    .then(() => showSuccess(dumpStatus, t('successCopied')))
    .catch(error => showError(dumpStatus, error));
}

function loadJsonFile() {
  buildFileInput?.click();
}

function readUploadedJson(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    jsonInput.value = reader.result;
    showSuccess(buildStatus, t('successLoaded', file.name, file.size.toLocaleString()));
    buildFileInput.value = '';
  };
  reader.onerror = () => {
    showError(buildStatus, new Error(t('errorReadFile', file.name, reader.error?.message)));
    buildFileInput.value = '';
  };
  reader.readAsText(file);
}

function buildStageFile() {
  const source = jsonInput.value;
  if (!source.trim()) {
    setStatus(buildStatus, t('errorNoJson'), 'error');
    return;
  }
  try {
    const payload = JSON.parse(source, jsonReviver);
    const arrayBuffer = serializeStage(payload);
    const bytes = new Uint8Array(arrayBuffer);
    datDownloadUrl = updateDownloadLink(
      downloadDatLink,
      datDownloadUrl,
      new Blob([bytes], { type: 'application/octet-stream' }),
      'stage_new.stg4_1020'
    );
    showSuccess(buildStatus, t('successBuilt', bytes.byteLength.toLocaleString()));
  } catch (error) {
    datDownloadUrl = updateDownloadLink(downloadDatLink, datDownloadUrl, null);
    showError(buildStatus, new Error(t('errorBuild', '', error.message)));
  }
}

function handleDumpFileDrop(file) {
  dumpStageFile(file);
}

function handleBuildFileDrop(file) {
  const event = { target: { files: [file] } };
  readUploadedJson(event);
}

// --- Initialization ---

function init() {
  const savedLanguage = readStoredLanguage();
  const browserLanguage = navigator.language.startsWith('ja') ? 'ja' : 'en';
  updateLanguage(savedLanguage || browserLanguage);
  
  setupDropZone(dumpDropZone, handleDumpFileDrop);
  setupDropZone(buildDropZone, handleBuildFileDrop);
  
  setStatus(dumpStatus, t('statusReady'), null, 'statusReady');
  setStatus(buildStatus, t('statusReady'), null, 'statusReady');
}

// Event Listeners
dumpButton?.addEventListener('click', () => dumpStageFile());
dumpFileInput?.addEventListener('change', () => dumpStageFile());
copyJsonButton?.addEventListener('click', copyJsonToClipboard);
loadJsonFileButton?.addEventListener('click', loadJsonFile);
buildFileInput?.addEventListener('change', readUploadedJson);
buildButton?.addEventListener('click', buildStageFile);
languageSelect?.addEventListener('change', (event) => {
  const lang = event.target.value;
  updateLanguage(lang);
  writeStoredLanguage(lang);
});
window.addEventListener('beforeunload', () => {
  revokeUrl(jsonDownloadUrl);
  revokeUrl(datDownloadUrl);
});

init();