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
  setStatus('Processing stream...');
  try {
    const stream = file.stream();
    
    // The top-level parser now takes the stream directly
    const parsed = await parseStage(stream);
    
    const stringifiableObject = convertBinaryDataToObject(parsed);
    const json = JSON.stringify(stringifiableObject, null, 2);
    
    resetPreview();
    output.value = json;
    preview.hidden = false;
    const blob = new Blob([json], { type: 'application/json' });
    downloadUrl = URL.createObjectURL(blob);
    downloadName = file.name.replace(/\.stg4(?:_\d*)?$/i, '.json');
    downloadButton.disabled = false;
    setStatus(`Converted ${file.name} to ${downloadName}.`);
  } catch (error) {
    resetPreview();
    console.error(error);
    setStatus(`Failed to parse stream from ${file.name}: ${error.message}`, 'error');
  }
}

async function handleJsonFile(file) {
  setStatus('Building stream...');
  try {
    const text = await file.text();
    const parsedJson = JSON.parse(text);
    const payload = convertObjectToBinaryData(parsedJson);

    // serializeStage now returns a TransformStream
    const serializationStream = serializeStage(payload);
    
    // We will stream the result directly to a Blob
    const blobStream = new WritableStream({
        chunks: [],
        write(chunk) {
            this.chunks.push(chunk);
        },
        close() {
            const blob = new Blob(this.chunks, { type: 'application/octet-stream' });
            resetPreview();
            downloadUrl = URL.createObjectURL(blob);
            downloadName = (file.name.replace(/\.json$/i, '') || 'stage_new') + '.stg4_1020';
            downloadButton.disabled = false;
            preview.hidden = true;
            output.value = '';
            setStatus(`Built ${downloadName} from ${file.name}.`);
        },
        abort(err) {
            console.error("Blob stream aborted:", err);
            setStatus(`Failed to build stream from ${file.name}: ${err.message}`, 'error');
        }
    });

    await serializationStream.readable.pipeTo(blobStream);
    
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