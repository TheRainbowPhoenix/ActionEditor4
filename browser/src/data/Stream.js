// SHIFT_JIS and normalization helpers
import { decodeShiftJis, encodeShiftJis, normalizeDecodedShiftJis } from './shiftJis.js';


const SHIFT_JIS_DECODER = (() => {
    try { return new TextDecoder('shift-jis'); } catch (e) { return new TextDecoder('utf-8'); }
})();

function normalizeShiftJisString(value) { 
    return value.replace(/\uFF0D/g, '\u2212'); 
}

/**
 * Stream-based DataReader that processes chunks incrementally
 */
class StreamDataReader {
  constructor() {
    this.buffer = new Uint8Array(0);
    this.position = 0;
  }

  addData(chunk) {
    const newBuffer = new Uint8Array(this.buffer.length + chunk.length);
    newBuffer.set(this.buffer, 0);
    newBuffer.set(chunk, this.buffer.length);
    this.buffer = newBuffer;
  }

  hasBytes(count) {
    return this.buffer.length - this.position >= count;
  }

  readUint8() {
    if (!this.hasBytes(1)) return null;
    const value = this.buffer[this.position];
    this.position += 1;
    return value;
  }

  readUint16() {
    if (!this.hasBytes(2)) return null;
    const value = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.position, 2).getUint16(0, true);
    this.position += 2;
    return value;
  }

  readUint32() {
    if (!this.hasBytes(4)) return null;
    const value = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.position, 4).getUint32(0, true);
    this.position += 4;
    return value;
  }

  readInt32() {
    if (!this.hasBytes(4)) return null;
    const value = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.position, 4).getInt32(0, true);
    this.position += 4;
    return value;
  }

  readFloat32() {
    if (!this.hasBytes(4)) return null;
    const value = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.position, 4).getFloat32(0, true);
    this.position += 4;
    return value;
  }

  readFloat64() {
    if (!this.hasBytes(8)) return null;
    const value = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.position, 8).getFloat64(0, true);
    this.position += 8;
    return value;
  }

  readString() {
    if (!this.hasBytes(4)) return null;
    const length = this.readUint32();
    if (length === null || !this.hasBytes(length)) return null;
    
    const strBytes = this.buffer.slice(this.position, this.position + length);
    const text = SHIFT_JIS_DECODER.decode(strBytes).replace(/\0+$/, '');
    this.position += length;
    return normalizeShiftJisString(text);
  }

  readStdString() {
    if (!this.hasBytes(4)) return null;
    const length = this.readUint32();
    if (length <= 1) return '';
    return this.readFixedString(length);
  }

  readFixedString(length) {
    const strBytes = this.buffer.slice(this.position, this.position + length);
    const text = SHIFT_JIS_DECODER.decode(strBytes).replace(/\0+$/, '');
    this.position += length;
    return normalizeShiftJisString(text);
  }

  remaining() {
    return this.buffer.length - this.position;
  }

  reset() {
    this.position = 0;
  }
}

export { StreamDataReader };