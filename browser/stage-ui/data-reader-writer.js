// SHIFT_JIS and normalization helpers
import { decodeShiftJis, encodeShiftJis, normalizeDecodedShiftJis } from '../src/data/shiftJis.js';


const SHIFT_JIS_DECODER = (() => {
    try { return new TextDecoder('shift-jis'); } catch (e) { return new TextDecoder('utf-8'); }
})();

function normalizeShiftJisString(value) { 
    return value.replace(/\uFF0D/g, '\u2212'); 
}

/**
 * DataReader for reading binary data from streams
 */
class DataReader {
  constructor(buffer) {
    this.view = new DataView(buffer);
    this.position = 0;
  }

  readInt8() {
    const value = this.view.getInt8(this.position);
    this.position += 1;
    return value;
  }

  readUint8() {
    const value = this.view.getUint8(this.position);
    this.position += 1;
    return value;
  }

  readUint16() {
    const value = this.view.getUint16(this.position, true); // little endian
    this.position += 2;
    return value;
  }
  
  readInt16() {
    const value = this.view.getInt16(this.position, true); // little endian
    this.position += 2;
    return value;
  }

  readUint32() {
    const value = this.view.getUint32(this.position, true); // little endian
    this.position += 4;
    return value;
  }

  readInt32() {
    const value = this.view.getInt32(this.position, true); // little endian
    this.position += 4;
    return value;
  }

  readFloat32() {
    const value = this.view.getFloat32(this.position, true); // little endian
    this.position += 4;
    return value;
  }

  readFloat64() {
    const value = this.view.getFloat64(this.position, true); // little endian
    this.position += 8;
    return value;
  }

  readString() {
    const length = this.readUint32();
    if (length > 1) {
        const bytes = new Uint8Array(this.view.buffer, this.position, length);
        this.position += length;
        // const text = decodeShiftJis(bytes);
        const text = SHIFT_JIS_DECODER.decode(bytes).replace(/\0+$/, '');
        return normalizeShiftJisString(text);
    } else {
        return "";
    }   
  }

  readStdString() {
    const length = this.readUint32();
    if (length <= 1) return '';
    return this.readFixedString(length);
  }

  readFixedString(length) {
    const bytes = new Uint8Array(this.view.buffer, this.position, length);
    this.position += length;
    // return decodeShiftJis(bytes);
    const text = SHIFT_JIS_DECODER.decode(bytes).replace(/\0+$/, '');
    return normalizeShiftJisString(text);
  }

  readBytes(length) {
    const bytes = new Uint8Array(this.view.buffer, this.position, length);
    this.position += length;
    return bytes;
  }

  skip(bytes) {
    this.position += bytes;
  }

  remaining() {
    return this.view.byteLength - this.position;
  }
}

/**
 * DataWriter for writing binary data to streams
 */
class DataWriter {
  constructor() {
    this.chunks = [];
    this.position = 0;
  }
  
  writeInt8(value) {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setInt8(0, value);
    this.chunks.push(new Uint8Array(buffer));
    this.position += 1;
  }

  writeUint8(value) {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setUint8(0, value);
    this.chunks.push(new Uint8Array(buffer));
    this.position += 1;
  }

  writeUint16(value) {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setUint16(0, value, true); // little endian
    this.chunks.push(new Uint8Array(buffer));
    this.position += 2;
  }

  writeUint32(value) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, value, true); // little endian
    this.chunks.push(new Uint8Array(buffer));
    this.position += 4;
  }

  writeInt32(value) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, value, true); // little endian
    this.chunks.push(new Uint8Array(buffer));
    this.position += 4;
  }

  writeFloat32(value) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, value, true); // little endian
    this.chunks.push(new Uint8Array(buffer));
    this.position += 4;
  }

  writeFloat64(value) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, value, true); // little endian
    this.chunks.push(new Uint8Array(buffer));
    this.position += 8;
  }

  writeString(value) {
    const bytes = new TextEncoder().encode(value);
    this.writeUint32(bytes.length);
    this.chunks.push(bytes);
    this.position += 4 + bytes.length;
  }

  writeStdString(value) {
    if (value && value.length > 0) {
      const bytes = new TextEncoder().encode(value);
      this.writeUint32(bytes.length);
      this.chunks.push(bytes);
      this.position += 4 + bytes.length;
    } else {
      this.writeUint32(0);
    }
  }

  writeFixedString(value, length) {
    const bytes = new TextEncoder().encode(value);
    const padded = new Uint8Array(length);
    padded.set(bytes);
    this.chunks.push(padded);
    this.position += length;
  }

  writeBytes(bytes) {
    this.chunks.push(bytes);
    this.position += bytes.length;
  }

  toBuffer() {
    const totalLength = this.chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of this.chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result.buffer;
  }
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

export { DataReader, DataWriter, StreamDataReader };