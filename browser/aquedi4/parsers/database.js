// parsers/database.js

import { DataReader, DataWriter } from './data-reader-writer.js';

const MAGIC_VALUES = new Set([0xB6, 0x03c6, 0x03fc]);

function readVersion(reader, expectedValues = MAGIC_VALUES) {
    const version = reader.readUint32();
    if (!expectedValues.has(version)) {
        throw new Error(`Unexpected database version: 0x${version.toString(16)}`);
    }
    return version;
}

function writeVersion(writer, version, expectedValues = MAGIC_VALUES) {
    if (!expectedValues.has(version)) {
        throw new Error(`Unexpected database version: 0x${version?.toString(16)}`);
    }
    writer.writeUint32(version);
}

function readStdString(reader) {
    return reader.readStdString();
}

function writeStdString(writer, value) {
    writer.writeStdString(value ?? '');
}

function loadElements(reader, count, factory) {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(factory(reader));
    }
    return results;
}

function writeElements(writer, elements, callback) {
    for (const element of (elements || [])) {
        callback(writer, element);
    }
}

// --- Element Parsers & Writers ---

function parseAnimation(reader) {
    const animation = {
        header: reader.readUint32(),
        sample_list_index: reader.readUint16(),
        sample_type: reader.readUint8(),
        frame_start: reader.readUint16(),
        strings_count: reader.readUint32(),
        name: readStdString(reader),
    };
    const frameCount = reader.readUint32();
    animation.frames = loadElements(reader, frameCount, (r) => ({
        header: r.readUint32(),
        frame_index: r.readUint32(),
        display_time: r.readUint32(),
        exec_commands: r.readUint32(),
        unknown2: r.readUint32()
    }));
    return animation;
}

function writeAnimation(writer, animation) {
    writer.writeUint32(animation.header ?? 0);
    writer.writeUint16(animation.sample_list_index ?? 0);
    writer.writeUint8(animation.sample_type ?? 0);
    writer.writeUint16(animation.frame_start ?? 0);
    writer.writeUint32(animation.strings_count ?? 1); // Should be 1 for the name
    writeStdString(writer, animation.name);
    const frames = animation.frames || [];
    writer.writeUint32(frames.length);
    writeElements(writer, frames, (w, frame) => {
        w.writeUint32(frame.header ?? 0);
        w.writeUint32(frame.frame_index ?? 0);
        w.writeUint32(frame.display_time ?? 0);
        w.writeUint32(frame.exec_commands ?? 0);
        w.writeUint32(frame.unknown2 ?? 0);
    });
}

// ... (And so on for all your other `parse...` and `write...` functions)
// I will include a few more for completeness.

// --- Sound
function parseSoundElement(reader, hasVolume = false) {
    const element = {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32()
    };
    element.strings_count = reader.readUint32(); // Added missing field
    element.name = readStdString(reader);
    element.path = readStdString(reader);
    return element;
}

function writeSoundElement(writer, element, hasVolume = false) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.is_name_same_path ?? 0);
    if (hasVolume) {
        writer.writeUint32(element.volume ?? 100);
        writer.writeUint32(element.unknown ?? 0);
    } else {
        writer.writeUint32(element.unknown2 ?? 0);
    }
    writer.writeUint32(element.strings_count ?? 2);
    writeStdString(writer, element.name);
    writeStdString(writer, element.path);
}

// --- Generic

function parseSimpleAsset(reader, hasVolume = false) {
    const element = {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32()
    };
    if (hasVolume) {
        element.volume = reader.readUint32();
        element.unknown = reader.readUint32();
    } else {
        element.unknown2 = reader.readUint32();
    }
    element.strings_count = reader.readUint32(); // Added missing field
    element.name = readStdString(reader);
    element.path = readStdString(reader);
    return element;
}

function writeSimpleAsset(writer, element, hasVolume = false) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.is_name_same_path ?? 0);
    if (hasVolume) {
        writer.writeUint32(element.volume ?? 100);
        writer.writeUint32(element.unknown ?? 0);
    } else {
        writer.writeUint32(element.unknown2 ?? 0);
    }
    writer.writeUint32(element.strings_count ?? 2);
    writeStdString(writer, element.name);
    writeStdString(writer, element.path);
}


// --- Main Database Parsers & Writers ---

function parseList(reader, elementFactory) {
    const version = readVersion(reader);
    const count = reader.readUint32();
    const elements = loadElements(reader, count, elementFactory);
    return { version, data: { elements } };
}

function writeList(writer, database, elementWriter) {
    writeVersion(writer, database.version);
    const elements = database?.data?.elements ?? [];
    writer.writeUint32(elements.length);
    writeElements(writer, elements, elementWriter);
}

export function parseAnime(reader) { return parseList(reader, parseAnimation); }
export function serializeAnime(writer, db) { writeList(writer, db, writeAnimation); }

export function parseBgm(reader) { return parseList(reader, r => parseSimpleAsset(r, true)); }
export function serializeBgm(writer, db) { writeList(writer, db, (w, e) => writeSimpleAsset(w, e, true)); }

export function parseSound(reader) { return parseList(reader, r => parseSoundElement(r, false)); }
export function serializeSound(writer, db) { writeList(writer, db, (w, e) => writeSoundElement(w, e, false)); }

// ... Add similar exports for all your database types

// --- Stream Handling ---

/**
 * Parses a complete database file from a buffer.
 * This is the core synchronous parsing function.
 * @param {ArrayBuffer} buffer - The complete file data.
 * @param {Function} parserFunc - The specific parser to use (e.g., parseAnime).
 */
function parseDatabaseFile(buffer, parserFunc) {
    const reader = new DataReader(buffer);
    return parserFunc(reader);
}

/**
 * Creates a Web Stream that transforms binary chunks into a parsed database object.
 */
class DBTransformStream {
    constructor(parserFunc) {
        let fileBuffer = new Uint8Array(0);
        let totalLength = 0;

        this.stream = new TransformStream({
            transform(chunk, controller) {
                const newBuffer = new Uint8Array(totalLength + chunk.length);
                newBuffer.set(fileBuffer, 0);
                newBuffer.set(chunk, totalLength);
                fileBuffer = newBuffer;
                totalLength += chunk.length;
            },
            flush(controller) {
                try {
                    const result = parseDatabaseFile(fileBuffer.buffer, parserFunc);
                    controller.enqueue(result);
                } catch (e) {
                    console.error("Database parsing error:", e);
                    controller.error(e);
                }
            }
        });
        this.readable = this.stream.readable;
        this.writable = this.stream.writable;
    }
}

export const PARSER_FUNC_MAP = new Map([
    ['anime', parseAnime],
    ['anime.dat', parseAnime],
    ['animeset', (r) => parseList(r, parseAnimationSetElement)],
    ['animeset.dat', (r) => parseList(r, parseAnimationSetElement)],
    ['bgm', parseBgm],
    ['bgm.dat', parseBgm],
    ['sound', parseSound],
    ['sound.dat', parseSound],
    // ['picture.dat', parsePicture],
    // ['effect.dat', (r) => parseList(r, parseEffectElement)],
]);

/**
 * Main stream-based loading function for any database.
 * @param {ReadableStream} stream - The binary stream of the .dat file.
 * @param {string} name - The name of the database (e.g., "anime.dat").
 * @returns {Promise<object>} A promise that resolves with the parsed database object.
 */
export async function loadDatabase(stream, name) {
    const parserName = name.toLowerCase().split('/').pop();
    const parserFunc = PARSER_FUNC_MAP.get(parserName);

    if (!parserFunc) {
        throw new Error(`Unknown generic database type: ${name}`);
    }

    const transformStream = new DBTransformStream(parserFunc);
    const parsedStream = stream.pipeThrough(transformStream.stream);
    
    const reader = parsedStream.getReader();
    const { value, done } = await reader.read();

    if (done) {
        return value;
    }
    return value; // Should get the single parsed object
}