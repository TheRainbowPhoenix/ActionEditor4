import { parseStage, serializeStage } from '../src/data/stage.js';

const dropZone = document.getElementById('drop-zone');
const status = document.getElementById('status');
const preview = document.getElementById('preview');
const output = document.getElementById('output');
const downloadButton = document.getElementById('download-button');
const fileInput = document.getElementById('file-input');
const fileButton = document.getElementById('file-button');

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

function setDragState(active) {
  dropZone.classList.toggle('dragging', active);
}

function isStageFile(file) {
  return /\.stg4(?:_\d+)?$/i.test(file.name);
}

function isJsonFile(file) {
  return file.name.toLowerCase().endsWith('.json');
}

async function handleStageFile(file) {
  try {
    const buffer = await file.arrayBuffer();
    const parsed = parseStage(buffer);
    const json = JSON.stringify(parsed, null, 2);
    resetPreview();
    output.value = json;
    preview.hidden = false;
    const blob = new Blob([json], { type: 'application/json' });
    downloadUrl = URL.createObjectURL(blob);
    downloadName = file.name.replace(/\.stg4(?:_\d*)?$/i, '.json');
    if (downloadName === file.name) {
      downloadName = `${file.name}.json`;
    }
    downloadButton.disabled = false;
    setStatus(`Converted ${file.name} to ${downloadName}.`);
  } catch (error) {
    resetPreview();
    console.error(error);
    setStatus(`Failed to parse ${file.name}: ${error.message}`, 'error');
  }
}

async function handleJsonFile(file) {
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const arrayBuffer = serializeStage(payload);
    resetPreview();
    const bytes = new Uint8Array(arrayBuffer);
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    downloadUrl = URL.createObjectURL(blob);
    const baseName = file.name.replace(/\.json$/i, '');
    const version = Number(payload?.version ?? 0);
    const safeVersion = Number.isInteger(version) && version > 0 ? version : null;
    const prefix = baseName.replace(/(\.stg4)(?:_\d+)?$/i, '');
    const suffix = safeVersion ? `.stg4_${safeVersion}` : '.stg4_rebuilt';
    downloadName = `${prefix}${suffix}`;
    downloadButton.disabled = false;
    preview.hidden = true;
    output.value = '';
    if (safeVersion) {
      setStatus(`Built ${downloadName} from ${file.name} (version ${safeVersion}).`);
    } else {
      setStatus(`Built ${downloadName} from ${file.name}. Stage version not provided; used default suffix.`);
    }
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
  setStatus('Processing...');
  handleFile(files[0]);
}

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  setDragState(true);
});

dropZone.addEventListener('dragleave', (event) => {
  if (event.target === dropZone) {
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

setStatus('Ready. Drop a file to begin.');