import Encoding from 'encoding-japanese';

const SHIFT_JIS_DECODER = (() => {
    if (typeof TextDecoder === 'undefined') {
        return null;
    }
    try {
        return new TextDecoder('shift-jis');
    } catch (error) {
        return null;
    }
})();

const SHIFT_JIS_ENCODER = (() => {
    if (typeof TextEncoder === 'undefined') {
        return null;
    }
    try {
        // Some environments expose a Shift_JIS encoder behind this label.
        const encoder = new TextEncoder('shift-jis');
        if (encoder.encoding && encoder.encoding.toLowerCase() !== 'shift-jis') {
            return null;
        }
        return encoder;
    } catch (error) {
        try {
            const encoder = new TextEncoder('shift_jis');
            if (encoder.encoding && encoder.encoding.toLowerCase() !== 'shift_jis') {
                return null;
            }
            return encoder;
        } catch (innerError) {
            return null;
        }
    }
})();

function ensureEncodingModule() {
    if (!Encoding || typeof Encoding.convert !== 'function') {
        throw new Error('encoding-japanese module is required to handle Shift-JIS data.');
    }
    return Encoding;
}

export function normalizeDecodedShiftJis(value) {
    if (!value) {
        return '';
    }
    return value.replace(/\uFF0D/g, '\u2212');
}

export function normalizeForEncoding(value) {
    if (!value) {
        return '';
    }
    return value.replace(/\u2212/g, '\uFF0D');
}

export function decodeShiftJis(bytes) {
    if (bytes.byteLength === 0) {
        return '';
    }
    if (SHIFT_JIS_DECODER) {
        return normalizeDecodedShiftJis(SHIFT_JIS_DECODER.decode(bytes));
    }
    const encoding = ensureEncodingModule();
    const array = Array.isArray(bytes) ? bytes : Array.from(bytes);
    return normalizeDecodedShiftJis(encoding.convert(array, { to: 'UNICODE', from: 'SJIS', type: 'string' }));
}

export function encodeShiftJis(value) {
    const normalized = normalizeForEncoding(value);
    if (!normalized) {
        return new Uint8Array(0);
    }
    if (SHIFT_JIS_ENCODER) {
        return SHIFT_JIS_ENCODER.encode(normalized);
    }
    const encoding = ensureEncodingModule();
    const unicodeCodes = encoding.stringToCode(normalized);
    const array = encoding.convert(unicodeCodes, { to: 'SJIS', from: 'UNICODE' });
    return Uint8Array.from(array);
}