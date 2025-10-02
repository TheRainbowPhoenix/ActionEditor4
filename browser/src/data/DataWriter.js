// DataWriter.js (Stream-based)

import { encodeShiftJis } from './shiftJis.js';

// toUint8Array helper remains the same
function toUint8Array(source) {
    if (source instanceof Uint8Array) return source;
    if (source instanceof ArrayBuffer) return new Uint8Array(source);
    if (ArrayBuffer.isView(source)) return new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    throw new TypeError('Unsupported binary source. Expected ArrayBuffer or typed array.');
}

/**
 * This class acts as a controller for a TransformStream,
 * providing methods to write structured data which are then enqueued as binary chunks.
 */
export default class DataWriter {
    #controller;

    constructor(controller) {
        if (!controller || typeof controller.enqueue !== 'function') {
            throw new TypeError('A TransformStream controller is required.');
        }
        this.#controller = controller;
    }

    #enqueue(buffer) {
        this.#controller.enqueue(new Uint8Array(buffer));
    }

    writeUint8(value) {
        const buffer = new ArrayBuffer(1);
        new DataView(buffer).setUint8(0, value);
        this.#enqueue(buffer);
    }
    writeInt8(value) {
        const buffer = new ArrayBuffer(1);
        new DataView(buffer).setInt8(0, value);
        this.#enqueue(buffer);
    }
    writeUint16(value) {
        const buffer = new ArrayBuffer(2);
        new DataView(buffer).setUint16(0, value, true);
        this.#enqueue(buffer);
    }
    writeInt16(value) {
        const buffer = new ArrayBuffer(2);
        new DataView(buffer).setInt16(0, value, true);
        this.#enqueue(buffer);
    }
    writeUint32(value) {
        const buffer = new ArrayBuffer(4);
        new DataView(buffer).setUint32(0, value, true);
        this.#enqueue(buffer);
    }
    writeInt32(value) {
        const buffer = new ArrayBuffer(4);
        new DataView(buffer).setInt32(0, value, true);
        this.#enqueue(buffer);
    }
    writeFloat64(value) {
        const buffer = new ArrayBuffer(8);
        new DataView(buffer).setFloat64(0, Number.isFinite(value) ? value : 0, true);
        this.#enqueue(buffer);
    }

    writeBytes(source) {
        const bytes = toUint8Array(source);
        if (bytes.length > 0) {
            this.#controller.enqueue(bytes);
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
}