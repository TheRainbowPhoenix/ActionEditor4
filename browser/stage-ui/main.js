import { parseStage, serializeStage } from './stg4-parser.js';
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

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length) {
        handleFiles(files[0]);
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