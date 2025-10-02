import { parseStage, serializeStage } from './stg4-parser.js';

// --- i18n & Translations ---
const translations = {
  en: {
    title: 'ActionEditor Stage4 Converter',
    description: 'Convert between .stg4 stage files and their JSON representation.',
    statusReady: 'Ready.',
    statusProcessing: 'Processing...',
    statusSuccess: 'Success!',
    statusError: 'Error: {0}',
    dropZoneText: 'or',
    browseButton: 'Browse Files',
    footer: 'ActionEditor Stage4 Converter | Drag & Drop File Processing | Stream-based Analysis',
    // Import Panel
    importTitle: 'Import STG4 to JSON',
    importDropZoneTitle: 'Drop .stg4 File Here',
    downloadJson: 'Download JSON',
    importSuccess: 'Converted {0} to JSON.',
    // Export Panel
    exportTitle: 'Export JSON to STG4',
    exportDropZoneTitle: 'Drop .json File Here',
    downloadStg4: 'Download STG4',
    exportSuccess: 'Built {0} from JSON.',
    unsupportedFile: 'Unsupported file type.'
  },
  ja: {
    title: 'ActionEditor Stage4 コンバーター',
    description: '.stg4 ステージファイルとJSON表現を相互に変換します。',
    statusReady: '準備完了',
    statusProcessing: '処理中...',
    statusSuccess: '成功！',
    statusError: 'エラー: {0}',
    dropZoneText: 'または',
    browseButton: 'ファイルを選択',
    footer: 'ActionEditor Stage4 コンバーター | ドラッグ＆ドロップ処理 | ストリームベース解析',
    // Import Panel
    importTitle: 'STG4 を JSON にインポート',
    importDropZoneTitle: '.stg4 ファイルをここにドロップ',
    downloadJson: 'JSONをダウンロード',
    importSuccess: '{0} をJSONに変換しました。',
    // Export Panel
    exportTitle: 'JSON を STG4 にエクスポート',
    exportDropZoneTitle: '.json ファイルをここにドロップ',
    downloadStg4: 'STG4をダウンロード',
    exportSuccess: 'JSONから {0} を作成しました。',
    unsupportedFile: 'サポートされていないファイル形式です。'
  }
};

let currentLanguage = 'en';

function t(key, ...params) {
  let text = (translations[currentLanguage] && translations[currentLanguage][key]) || translations.en[key] || key;
  params.forEach((param, index) => {
    text = text.replace(`{${index}}`, param);
  });
  return text;
}

function updateLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
        element.textContent = t(key);
    }
  });
}

// --- Encoders

const jsonReplacer = (key, value) => {
  if (value instanceof Uint8Array) {
    return { $type: "Uint8Array", data: Array.from(value) };
  }
  return value;
};

const jsonReviver = (key, value) => {
  if (value && typeof value === "object" && value.$type === "Uint8Array" && Array.isArray(value.data)) {
    return new Uint8Array(value.data);
  }
  return value;
};

// --- DOM Panel Objects ---
const importPanel = {
    dropArea: document.getElementById('importDropArea'),
    fileInput: document.getElementById('importFileInput'),
    statusMessage: document.getElementById('importStatusMessage'),
    output: document.getElementById('importOutput'),
    downloadButton: document.getElementById('importDownloadButton'),
    result: { url: null, name: null }
};

const exportPanel = {
    dropArea: document.getElementById('exportDropArea'),
    fileInput: document.getElementById('exportFileInput'),
    statusMessage: document.getElementById('exportStatusMessage'),
    output: document.getElementById('exportOutputInfo'),
    downloadButton: document.getElementById('exportDownloadButton'),
    result: { url: null, name: null }
};

// --- Core Logic ---

function setStatus(panel, message, type = 'info') {
    panel.statusMessage.textContent = message;
    panel.statusMessage.className = 'status ' + type;
}

function resetPanel(panel) {
    if (panel.result.url) {
        URL.revokeObjectURL(panel.result.url);
    }
    panel.result.url = null;
    panel.result.name = null;
    panel.downloadButton.classList.add('disabled');
    panel.output.style.display = 'none';
    setStatus(panel, t('statusReady'), 'info');
}

// --- File Handlers ---

async function handleStageFile(file, panel) {
    setStatus(panel, t('statusProcessing'), 'info');
    try {
        const parsed = await parseStage(file.stream());
        const json = JSON.stringify(parsed, jsonReplacer, 2);

        resetPanel(panel);
        panel.output.value = json.substring(0,255) + "...";
        panel.output.style.display = 'block';

        const blob = new Blob([json], { type: 'application/json' });
        panel.result.url = URL.createObjectURL(blob);
        panel.result.name = file.name.replace(/\.stg4(?:_\d*)?$/i, '.json');
        panel.downloadButton.classList.remove('disabled');
        
        setStatus(panel, t('importSuccess', file.name), 'success');
    } catch (error) {
        resetPanel(panel);
        console.error("STG4 Parse Error:", error);
        setStatus(panel, t('statusError', error.message), 'error');
    }
}

async function handleJsonFile(file, panel) {
    setStatus(panel, t('statusProcessing'), 'info');
    try {
        const text = await file.text();
        const parsedJson = JSON.parse(text, jsonReviver);

        // serializeStage now returns a TransformStream
        const serializationStream = serializeStage(parsedJson);

        // Natively stream the response into a Blob
        const blob = await new Response(serializationStream).blob();

        resetPanel(panel);
        
        panel.result.url = URL.createObjectURL(blob);
        panel.result.name = (file.name.replace(/\.json$/i, '') || 'stage_new') + '.stg4_1020';
        
        panel.output.textContent = `File created: ${panel.result.name} (${blob.size} bytes)`;
        panel.output.style.display = 'block';
        panel.downloadButton.classList.remove('disabled');

        setStatus(panel, t('exportSuccess', panel.result.name), 'success');
    } catch (error) {
        resetPanel(panel);
        console.error("JSON Build Error:", error);
        setStatus(panel, t('statusError', error.message), 'error');
    }
}

// --- Event Listener Setup ---

function setupPanelEventListeners(panel, fileHandler, acceptPredicate) {
    // Reset panel on page load
    resetPanel(panel);
    
    // File browse button
    const browseBtn = panel.dropArea.querySelector('.browse-btn');
    browseBtn.addEventListener('click', () => panel.fileInput.click());
    
    // File input change
    panel.fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (acceptPredicate(file.name)) {
                fileHandler(file, panel);
            } else {
                setStatus(panel, t('unsupportedFile'), 'error');
            }
        }
        e.target.value = ''; // Reset input to allow re-uploading the same file
    });

    // Drag and drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        panel.dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        panel.dropArea.addEventListener(eventName, () => panel.dropArea.classList.add('drag-over'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        panel.dropArea.addEventListener(eventName, () => panel.dropArea.classList.remove('drag-over'), false);
    });

    panel.dropArea.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file) {
            if (acceptPredicate(file.name)) {
                fileHandler(file, panel);
            } else {
                setStatus(panel, t('unsupportedFile'), 'error');
            }
        }
    }, false);

    // Download button
    panel.downloadButton.addEventListener('click', () => {
        if (!panel.result.url) return;
        const link = document.createElement('a');
        link.href = panel.result.url;
        link.download = panel.result.name;
        document.body.append(link);
        link.click();
        link.remove();
    });
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Setup i18n
    const languageSelect = document.getElementById('language-select');
    const detectedLang = (navigator.language || navigator.userLanguage).startsWith('ja') ? 'ja' : 'en';
    languageSelect.value = detectedLang;
    updateLanguage(detectedLang);
    languageSelect.addEventListener('change', (e) => updateLanguage(e.target.value));

    // Setup panels
    setupPanelEventListeners(
        importPanel, 
        handleStageFile, 
        (name) => /\.stg4(?:_\d+)?$/i.test(name)
    );
    
    setupPanelEventListeners(
        exportPanel, 
        handleJsonFile, 
        (name) => name.toLowerCase().endsWith('.json')
    );
});