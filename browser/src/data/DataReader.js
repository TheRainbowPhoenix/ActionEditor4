// A helper class to read binary data sequentially, mimicking fread.
export default class DataReader {
    constructor(arrayBuffer) {
        this.dataView = new DataView(arrayBuffer);
        this.offset = 0;
    }

    // Reads a 16-bit signed integer (short int)
    readInt16() {
        const value = this.dataView.getInt16(this.offset, true); // true for little-endian
        this.offset += 2;
        return value;
    }

    // Reads an 8-bit signed integer (char)
    readChar() {
        const value = this.dataView.getInt8(this.offset);
        this.offset += 1;
        return value;
    }

    // ... create methods for readInt32(), readDouble(), etc.

    // Reads a fixed-size byte array
    readBytes(length) {
        const bytes = new Uint8Array(this.dataView.buffer, this.offset, length);
        this.offset += length;
        return bytes;
    }

    // Reads a C-style null-terminated string of a given max length
    readString(length) {
        const bytes = this.readBytes(length);
        const firstNull = bytes.indexOf(0);
        const decoder = new TextDecoder('shift-jis'); // The original code is likely Shift-JIS
        return decoder.decode(bytes.slice(0, firstNull));
    }
}