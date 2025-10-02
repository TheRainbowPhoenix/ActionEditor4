// SHIFT_JIS and normalization helpers remain the same
const SHIFT_JIS_DECODER = (() => {
    try { return new TextDecoder('shift-jis'); } catch (e) { return new TextDecoder('utf-8'); }
})();
function normalizeShiftJisString(value) { return value.replace(/\uFF0D/g, '\u2212'); }

export default class DataReader {
    constructor(stream) {
        if (!stream || typeof stream.getReader !== 'function') {
            throw new TypeError('A ReadableStream instance is required.');
        }
        this.reader = stream.getReader();
        this.buffer = new Uint8Array(0);
        this.offset = 0; // Position within the current buffer
        this.streamPosition = 0; // Total position in the stream
        this.isDone = false;
    }

    /**
     * Ensures the internal buffer has at least `required` bytes available.
     * If not, it reads more from the underlying stream until the requirement is met.
     * @param {number} required Number of bytes needed.
     * @returns {Promise<void>}
     */
    async #ensureBytes(required) {
        while (this.buffer.length - this.offset < required && !this.isDone) {
            const { value, done } = await this.reader.read();
            if (done) {
                this.isDone = true;
                if (this.buffer.length - this.offset < required) {
                    throw new RangeError('Attempted to read beyond the end of the stream.');
                }
                break;
            }
            
            // Trim consumed bytes from the buffer
            const remaining = this.buffer.slice(this.offset);
            const newBuffer = new Uint8Array(remaining.length + value.length);
            newBuffer.set(remaining, 0);
            newBuffer.set(value, remaining.length);
            
            this.buffer = newBuffer;
            this.offset = 0;
        }
    }

    /**
     * Reads a specified number of bytes into a DataView for typed reads.
     * @param {number} byteLength Number of bytes to read.
     * @returns {Promise<DataView>}
     */
    async #readView(byteLength) {
        await this.#ensureBytes(byteLength);
        const view = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.offset, byteLength);
        this.offset += byteLength;
        this.streamPosition += byteLength;
        return view;
    }

    async readUint8() { return (await this.#readView(1)).getUint8(0); }
    async readInt8() { return (await this.#readView(1)).getInt8(0); }
    async readUint16() { return (await this.#readView(2)).getUint16(0, true); }
    async readInt16() { return (await this.#readView(2)).getInt16(0, true); }
    async readUint32() { return (await this.#readView(4)).getUint32(0, true); }
    async readInt32() { return (await this.#readView(4)).getInt32(0, true); }
    async readFloat64() { return (await this.#readView(8)).getFloat64(0, true); }

    async readBytes(length) {
        await this.#ensureBytes(length);
        const bytes = this.buffer.subarray(this.offset, this.offset + length);
        this.offset += length;
        this.streamPosition += length;
        return bytes;
    }

    async readString(length) {
        if (length === 0) return '';
        const bytes = await this.readBytes(length);
        const text = SHIFT_JIS_DECODER.decode(bytes).replace(/\0+$/, '');
        return normalizeShiftJisString(text);
    }

    async readStdString() {
        const length = await this.readUint32();
        if (length <= 1) return '';
        return this.readString(length);
    }
}