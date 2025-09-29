const SHIFT_JIS_DECODER = (() => {
    if (typeof TextDecoder === 'undefined') {
        return null;
    }
    try {
        return new TextDecoder('shift-jis');
    } catch (error) {
        // Fallback to UTF-8 if the runtime does not support Shift-JIS explicitly.
        return new TextDecoder('utf-8');
    }
})();

function normalizeShiftJisString(value) {
    // Normalise characters that differ between Python's Shift-JIS codec and WHATWG encoders.
    return value.replace(/\uFF0D/g, '\u2212');
}

function toArrayBuffer(source) {
    if (source instanceof ArrayBuffer) {
        return source;
    }
    if (ArrayBuffer.isView(source)) {
        const { buffer, byteOffset, byteLength } = source;
        return buffer.slice(byteOffset, byteOffset + byteLength);
    }
    throw new TypeError('Unsupported binary source. Expected ArrayBuffer or typed array.');
}

export default class DataReader {
    constructor(source) {
        this.buffer = toArrayBuffer(source);
        this.view = new DataView(this.buffer);
        this.offset = 0;
    }

    get remaining() {
        return this.view.byteLength - this.offset;
    }

    seek(position) {
        if (position < 0 || position > this.view.byteLength) {
            throw new RangeError('Attempted to seek outside the buffer bounds.');
        }
        this.offset = position;
    }

    skip(bytes) {
        this.seek(this.offset + bytes);
    }

    readUint8() {
        const value = this.view.getUint8(this.offset);
        this.offset += 1;
        return value;
    }

    readInt8() {
        const value = this.view.getInt8(this.offset);
        this.offset += 1;
        return value;
    }

    readChar() {
        return this.readInt8();
    }

    readUint16() {
        const value = this.view.getUint16(this.offset, true);
        this.offset += 2;
        return value;
    }

    readInt16() {
        const value = this.view.getInt16(this.offset, true);
        this.offset += 2;
        return value;
    }

    readUint32() {
        const value = this.view.getUint32(this.offset, true);
        this.offset += 4;
        return value;
    }

    readInt32() {
        const value = this.view.getInt32(this.offset, true);
        this.offset += 4;
        return value;
    }

    readFloat64() {
        const value = this.view.getFloat64(this.offset, true);
        this.offset += 8;
        return value;
    }
    
    readBytes(length) {
        if (length < 0 || this.offset + length > this.view.byteLength) {
            throw new RangeError('Attempted to read beyond the buffer length.');
        }
        const bytes = new Uint8Array(this.buffer, this.offset, length);
        this.offset += length;
        return bytes;
    }

    readString(length) {
        if (length === 0) {
            return '';
        }
        const bytes = this.readBytes(length);
        let text;
        if (!SHIFT_JIS_DECODER) {
            text = String.fromCharCode(...bytes);
        } else {
            text = SHIFT_JIS_DECODER.decode(bytes);
        }
        text = text.replace(/\0+$/, '');
        return normalizeShiftJisString(text);
    }

    readStdString() {
        const length = this.readUint32();
        if (length <= 1) {
            return '';
        }
        return this.readString(length);
    }
}
