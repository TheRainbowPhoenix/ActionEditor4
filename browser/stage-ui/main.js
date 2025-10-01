import { parseStage, serializeStage } from './stg4-parser.js';

// 多言語対応のテキスト
const translations = {
  en: {
    title: 'ActionEditor Stage4 Converter',
    description: 'Convert between .stg4_* stage files and their JSON representation.',
    uploadSection: 'Upload STG4 File',
    dropZoneTitle: 'Drag & Drop your STG4 file here',
    dropZoneText: 'or',
    browseButton: 'Browse Files',
    howItWorks: 'How it works:',
    instruction1: 'Upload any STG4 file (.stg4_*) or JSON file',
    instruction2: 'The file will be processed as a stream of STG4 chunks',
    instruction3: 'Each chunk will be displayed in the table below',
    instruction4: 'You can convert between binary STG4 and JSON formats',
    previewSection: 'JSON Preview',
    previewPlaceholder: 'Converted JSON will appear here',
    analysisSection: 'STG4 Chunk Analysis',
    tableStream: 'Stream',
    tableChunkNo: 'Chunk No.',
    tableChunkType: 'Chunk Type',
    tablePlaceholder: 'Upload a STG4 file to see chunk analysis',
    footer: 'ActionEditor Stage4 Converter | Drag & Drop File Processing | Stream-based Analysis',
    statusReady: 'Ready. Drop a file to begin.',
    statusProcessing: 'Processing...',
    statusSuccess: 'File processed successfully!',
    statusError: 'Error processing file: {0}',
    downloadResult: 'Download result'
  },
  ja: {
    title: 'ActionEditor Stage4 コンバーター',
    description: '.stg4_* ステージファイルとJSON表現を変換します。',
    uploadSection: 'STG4ファイルをアップロード',
    dropZoneTitle: 'STG4ファイルをドラッグ＆ドロップ',
    dropZoneText: 'または',
    browseButton: 'ファイルを選択',
    howItWorks: '使い方:',
    instruction1: 'STG4ファイル (.stg4_*) またはJSONファイルをアップロード',
    instruction2: 'ファイルはSTG4チャンクのストリームとして処理されます',
    instruction3: '各チャンクは下のテーブルに表示されます',
    instruction4: 'バイナリSTG4とJSON形式を相互変換できます',
    previewSection: 'JSONプレビュー',
    previewPlaceholder: '変換されたJSONがここに表示されます',
    analysisSection: 'STG4チャンク解析',
    tableStream: 'ストリーム',
    tableChunkNo: 'チャンク番号',
    tableChunkType: 'チャンクタイプ',
    tablePlaceholder: 'STG4ファイルをアップロードしてチャンク解析を表示',
    footer: 'ActionEditor Stage4 コンバーター | ドラッグ＆ドロップ処理 | ストリームベース解析',
    statusReady: '準備完了。ファイルをドロップして開始してください。',
    statusProcessing: '処理中...',
    statusSuccess: 'ファイルの処理に成功しました！',
    statusError: 'ファイル処理エラー: {0}',
    downloadResult: '結果をダウンロード'
  }
};

let currentLanguage = 'en';

// 言語を更新する関数
function updateLanguage(lang) {
  currentLanguage = lang;
  
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

// ブラウザの言語を自動検出
function detectLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('ja')) {
    return 'ja';
  }
  return 'en';
}


// DOM Elements
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.querySelector('.browse-btn');
const output = document.getElementById('output');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const fileInfo = document.getElementById('fileInfo');
const chunkTableBody = document.getElementById('chunkTableBody');
const statusMessage = document.getElementById('statusMessage');
const downloadButton = document.getElementById('download-button');

const status = document.getElementById('status');
const fileButton = document.getElementById('file-button');

const languageSelect = document.getElementById('language-select');

document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');
    
    // Set initial language based on browser detection
    currentLanguage = detectLanguage();
    languageSelect.value = currentLanguage;
    updateLanguage(currentLanguage);

    // Add event listener for language change
    languageSelect.addEventListener('change', function() {
        updateLanguage(this.value);
    });
});
// 初期ステータスを設定
// status.textContent = t('statusReady');

let downloadUrl = null;
let downloadName = null;

function resetPreview() {
    if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        downloadUrl = null;
    }
    downloadName = null;
    downloadButton.disabled = true;
    output.style.display = 'none';
    previewPlaceholder.style.display = 'block';
}

function setStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = 'status ' + type;

    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 3000);
    }
}

function setDragState(active) {
    dropArea.classList.toggle('drag-over', active);
}

function isStageFile(file) {
    return /\.stg4(?:_\d+)?$/i.test(file.name);
}

function isJsonFile(file) {
    return file.name.toLowerCase().endsWith('.json');
}

async function handleStageFile(file) {
    setStatus('Processing stream...', 'info');
    try {
        const stream = file.stream();

        // The top-level parser now takes the stream directly
        const parsed = await parseStage(stream);

        const json = JSON.stringify(parsed, null, 2);

        resetPreview();
        output.value = json.substring(0,255) + "...";
        output.style.display = 'block';
        previewPlaceholder.style.display = 'none';
        const blob = new Blob([json], { type: 'application/json' });
        downloadUrl = URL.createObjectURL(blob);
        downloadName = file.name.replace(/\.stg4(?:_\d*)?$/i, '.json');
        downloadButton.disabled = false;
        setStatus(`Converted ${file.name} to ${downloadName}.`, 'success');
    } catch (error) {
        resetPreview();
        console.error(error);
        setStatus(`Failed to parse stream from ${file.name}: ${error.message}`, 'error');
    }
}

async function handleJsonFile(file) {
    setStatus('Building stream...', 'info');
    try {
        const text = await file.text();
        const parsedJson = JSON.parse(text);

        // serializeStage now returns a TransformStream
        const serializationStream = serializeStage(parsedJson);

        // We will stream the result directly to a Blob
        const chunks = [];
        const blobStream = new WritableStream({
            write(chunk) {
                chunks.push(chunk);
            },
            close() {
                const combinedBuffer = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
                let offset = 0;
                for (const chunk of chunks) {
                    combinedBuffer.set(chunk, offset);
                    offset += chunk.length;
                }

                const blob = new Blob([combinedBuffer], { type: 'application/octet-stream' });
                resetPreview();
                downloadUrl = URL.createObjectURL(blob);
                downloadName = (file.name.replace(/\.json$/i, '') || 'stage_new') + '.stg4_1020';
                downloadButton.disabled = false;
                output.style.display = 'none';
                previewPlaceholder.style.display = 'block';
                setStatus(`Built ${downloadName} from ${file.name}.`, 'success');
            },
            abort(err) {
                console.error("Blob stream aborted:", err);
                setStatus(`Failed to build stream from ${file.name}: ${err.message}`, 'error');
            }
        });

    } catch (error) {
        resetPreview();
        console.error(error);
        setStatus(`Failed to build from ${file.name}: ${error.message}`, 'error');
    }
}

async function handleFile(file) {
    if (isStageFile(file)) {
        await handleStageFile(file);
        return;
    }
    if (isJsonFile(file)) {
        await handleJsonFile(file);
        return;
    }
    setStatus('Unsupported file type. Provide a .stg4_* or .json file.', 'error');
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length) {
        handleFiles(files); // Pass the entire FileList/array, not files[0]
    }
}


function handleFiles(files) {
    if (!files || files.length === 0) {
        return;
    }
    setStatus('Processing...', 'info');
    handleFile(files[0]);
}

// Event Listeners
browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

// Drag and drop events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.classList.add('drag-over');
}

function unhighlight() {
    dropArea.classList.remove('drag-over');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length) {
        handleFiles(files);
    }
}

downloadButton.addEventListener('click', () => {
    if (!downloadUrl) {
        return;
    }
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadName || 'stage.stg4_461';
    document.body.append(link);
    link.click();
    link.remove();
});

setStatus('Ready. Drop a file to begin.', 'info');

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}