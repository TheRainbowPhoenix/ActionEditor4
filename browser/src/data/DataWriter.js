import { encodeShiftJis } from './shiftJis.js';

function toUint8Array(source) {
    if (source instanceof Uint8Array) {
        return source;
    }
    if (source instanceof ArrayBuffer) {
        return new Uint8Array(source);
    }
    if (ArrayBuffer.isView(source)) {
        const { buffer, byteOffset, byteLength } = source;
        return new Uint8Array(buffer, byteOffset, byteLength);
    }
    throw new TypeError('Unsupported binary source. Expected ArrayBuffer or typed array.');
}

export default class DataWriter {
    constructor(initialCapacity = 1024) {
        this.buffer = new ArrayBuffer(initialCapacity);
        this.view = new DataView(this.buffer);
        this.length = 0;
    }

    ensureCapacity(additional) {
        const required = this.length + additional;
        if (required <= this.buffer.byteLength) {
            return;
        }
        let capacity = this.buffer.byteLength || 1;
        while (capacity < required) {
            capacity *= 2;
        }
        const newBuffer = new ArrayBuffer(capacity);
        new Uint8Array(newBuffer).set(new Uint8Array(this.buffer, 0, this.length));
        this.buffer = newBuffer;
        this.view = new DataView(this.buffer);
    }

    writeUint8(value) {
        this.ensureCapacity(1);
        this.view.setUint8(this.length, value);
        this.length += 1;
    }

    writeInt8(value) {
        this.ensureCapacity(1);
        this.view.setInt8(this.length, value);
        this.length += 1;
    }

    writeUint16(value) {
        this.ensureCapacity(2);
        this.view.setUint16(this.length, value, true);
        this.length += 2;
    }

    writeInt16(value) {
        this.ensureCapacity(2);
        this.view.setInt16(this.length, value, true);
        this.length += 2;
    }

    writeUint32(value) {
        this.ensureCapacity(4);
        this.view.setUint32(this.length, value, true);
        this.length += 4;
    }

    writeInt32(value) {
        this.ensureCapacity(4);
        this.view.setInt32(this.length, value, true);
        this.length += 4;
    }

    writeFloat64(value) {
        this.ensureCapacity(8);
        this.view.setFloat64(this.length, Number.isFinite(value) ? value : 0, true);
        this.length += 8;
    }

    writeBytes(source) {
        const bytes = toUint8Array(source);
        this.ensureCapacity(bytes.byteLength);
        new Uint8Array(this.buffer, this.length, bytes.byteLength).set(bytes);
        this.length += bytes.byteLength;
    }

    writeString(value, length) {
        const encoded = encodeShiftJis(value || '');
        if (encoded.length > length) {
            this.writeBytes(encoded.subarray(0, length));
        } else {
            this.writeBytes(encoded);
            if (encoded.length < length) {
                this.writeBytes(new Uint8Array(length - encoded.length));
            }
        }
    }

    writeLengthPrefixedString(value) {
        const bytes = encodeShiftJis(value || '');
        this.writeUint32(bytes.length + 1);
        if (bytes.length > 0) {
            this.writeBytes(bytes);
            this.writeUint8(0);
        }
    }

    align(alignment) {
        const remainder = this.length % alignment;
        if (remainder === 0) {
            return;
        }
        const padding = alignment - remainder;
        this.writeBytes(new Uint8Array(padding));
    }

    toArrayBuffer() {
        return this.buffer.slice(0, this.length);
    }

    toUint8Array() {
        return new Uint8Array(this.buffer, 0, this.length);
    }
}