import DataReader from './DataReader.js';
import DataWriter from './DataWriter.js';

const MAGIC_VALUES = new Set([0xB6, 0x03c6, 0x03fc]);

function ensureReader(source) {
    if (source instanceof DataReader) {
        return source;
    }
    return new DataReader(source);
}

function readVersion(reader) {
    const version = reader.readUint32();
    if (!MAGIC_VALUES.has(version)) {
        throw new Error(`Unexpected database version: 0x${version.toString(16)}`);
    }
    return version;
}

function readLengthPrefixedString(reader) {
    const length = reader.readUint32();
    if (length <= 1) {
        return '';
    }
    return reader.readString(length);
}

function writeLengthPrefixedString(writer, value) {
    writer.writeLengthPrefixedString(value ?? '');
}

function loadElements(count, factory) {
    const results = [];
    for (let index = 0; index < count; index += 1) {
        results.push(factory());
    }
    return results;
}

function writeElements(elements, callback) {
    for (const element of elements) {
        callback(element);
    }
}

function parseAnimation(reader) {
    const animation = {
        header: reader.readUint32(),
        sample_list_index: reader.readUint16(),
        sample_type: reader.readUint8(),
        frame_start: reader.readUint16(),
        strings_count: reader.readUint32(),
        name: readLengthPrefixedString(reader),
        frames: []
    };

    const frameCount = reader.readUint32();
    animation.frames = loadElements(frameCount, () => ({
        header: reader.readUint32(),
        frame_index: reader.readUint32(),
        display_time: reader.readUint32(),
        exec_commands: reader.readUint32(),
        unknown2: reader.readUint32()
    }));

    return animation;
}

function writeAnimation(writer, animation) {
    writer.writeUint32(animation.header ?? 0);
    writer.writeUint16(animation.sample_list_index ?? 0);
    writer.writeUint8(animation.sample_type ?? 0);
    writer.writeUint16(animation.frame_start ?? 0);
    writer.writeUint32(animation.strings_count ?? 0);
    writeLengthPrefixedString(writer, animation.name);

    const frames = Array.isArray(animation.frames) ? animation.frames : [];
    writer.writeUint32(frames.length);
    writeElements(frames, (frame) => {
        writer.writeUint32(frame.header ?? 0);
        writer.writeUint32(frame.frame_index ?? 0);
        writer.writeUint32(frame.display_time ?? 0);
        writer.writeUint32(frame.exec_commands ?? 0);
        writer.writeUint32(frame.unknown2 ?? 0);
    });
}

function parseAnimationSetElement(reader) {
    const header = reader.readUint32();
    const invincibilityOffset = reader.readUint32();
    const blockOffset = reader.readUint32();
    const flyingOffset = reader.readUint32();
    const strings_count = reader.readUint32();
    const name = readLengthPrefixedString(reader);

    const animationCount = reader.readUint32();
    const animations = loadElements(animationCount, () => parseAnimation(reader));

    return {
        header,
        flying_offset: flyingOffset,
        block_offset: blockOffset,
        invincibility_offset: invincibilityOffset,
        strings_count,
        name,
        animations
    };
}

function writeAnimationSetElement(writer, element) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.invincibility_offset ?? 0);
    writer.writeUint32(element.block_offset ?? 0);
    writer.writeUint32(element.flying_offset ?? 0);
    writer.writeUint32(element.unknown ?? 0);
    writeLengthPrefixedString(writer, element.name);

    const animations = Array.isArray(element.animations) ? element.animations : [];
    writer.writeUint32(animations.length);
    writeElements(animations, (animation) => writeAnimation(writer, animation));
}

function parseSwordPosition(reader) {
    return {
        header: reader.readUint32(),
        x: reader.readInt32(),
        y: reader.readInt32(),
        unknown1: reader.readUint32(),
        unknown2: reader.readUint32(),
        unknown3: reader.readUint32(),
        unknown4: reader.readUint32(),
        unknown5: reader.readUint32(),
        width: reader.readUint32(),
        height: reader.readUint32(),
        index: reader.readUint32(),
        unknown6: reader.readUint32()
    };
}

function parseEffectAnimation(reader) {
    return {
        header: reader.readUint32(),
        start: reader.readUint32(),
        end: reader.readUint32(),
        unknown: reader.readUint32()
    };
}

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

    element.name = readLengthPrefixedString(reader);
    element.path = readLengthPrefixedString(reader);
    return element;
}

function writeSimpleAsset(writer, element, hasVolume = false) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.is_name_same_path ?? 0);
    if (hasVolume) {
        writer.writeUint32(element.volume ?? 0);
        writer.writeUint32(element.unknown ?? 0);
    } else {
        writer.writeUint32(element.unknown2 ?? 0);
    }
    writeLengthPrefixedString(writer, element.name);
    writeLengthPrefixedString(writer, element.path);
}

function parseEffectElement(reader) {
    const element = {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32(),
        width: reader.readUint32(),
        height: reader.readUint32(),
        is_giant: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readLengthPrefixedString(reader),
        path: readLengthPrefixedString(reader)
    };

    const animationCount = reader.readUint32();
    element.animations = loadElements(animationCount, () => parseEffectAnimation(reader));
    return element;
}

function writeEffectElement(writer, element) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.is_name_same_path ?? 0);
    writer.writeUint32(element.width ?? 0);
    writer.writeUint32(element.height ?? 0);
    writer.writeUint32(element.is_giant ?? 0);
    writer.writeUint32(element.strings_count ?? 0);
    writeLengthPrefixedString(writer, element.name);
    writeLengthPrefixedString(writer, element.path);

    const animations = Array.isArray(element.animations) ? element.animations : [];
    writer.writeUint32(animations.length);
    writeElements(animations, (animation) => {
        writer.writeUint32(animation.header ?? 0);
        writer.writeUint32(animation.start ?? 0);
        writer.writeUint32(animation.end ?? 0);
        writer.writeUint32(animation.unknown ?? 0);
    });
}

function parseCharaEffectElement(reader) {
    return {
        header: reader.readUint32(),
        effect: reader.readUint32(),
        param1: reader.readUint32(),
        param2: reader.readUint32(),
        param3: reader.readUint32(),
        param4: reader.readUint32(),
        param5: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readLengthPrefixedString(reader)
    };
}

function writeCharaEffectElement(writer, element) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.effect ?? 0);
    writer.writeUint32(element.param1 ?? 0);
    writer.writeUint32(element.param2 ?? 0);
    writer.writeUint32(element.param3 ?? 0);
    writer.writeUint32(element.param4 ?? 0);
    writer.writeUint32(element.param5 ?? 0);
    writer.writeUint32(element.strings_count ?? 0);
    writeLengthPrefixedString(writer, element.name);
}

function parseScreenEffectElement(reader) {
    return {
        header: reader.readUint32(),
        effect: reader.readUint32(),
        param1: reader.readUint32(),
        param2: reader.readUint32(),
        param3: reader.readUint32(),
        param4: reader.readUint32(),
        param5: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readLengthPrefixedString(reader)
    };
}

function writeScreenEffectElement(writer, element) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.effect ?? 0);
    writer.writeUint32(element.param1 ?? 0);
    writer.writeUint32(element.param2 ?? 0);
    writer.writeUint32(element.param3 ?? 0);
    writer.writeUint32(element.param4 ?? 0);
    writer.writeUint32(element.param5 ?? 0);
    writer.writeUint32(element.strings_count ?? 0);
    writeLengthPrefixedString(writer, element.name);
}

function parseBmpCharaExcElement(reader) {
    return {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32(),
        is_giant: reader.readUint32(),
        scale_mode: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readLengthPrefixedString(reader),
        path: readLengthPrefixedString(reader)
    };
}

function writeBmpCharaExcElement(writer, element) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.is_name_same_path ?? 0);
    writer.writeUint32(element.is_giant ?? 0);
    writer.writeUint32(element.scale_mode ?? 0);
    writer.writeUint32(element.strings_count ?? 0);
    writeLengthPrefixedString(writer, element.name);
    writeLengthPrefixedString(writer, element.path);
}

function parseSwordTypeElement(reader) {
    const element = {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readLengthPrefixedString(reader),
        path_left: readLengthPrefixedString(reader),
        path_right: readLengthPrefixedString(reader)
    };

    const positionCount = reader.readUint32();
    element.positions = loadElements(positionCount, () => parseSwordPosition(reader));
    return element;
}

function writeSwordTypeElement(writer, element) {
    writer.writeUint32(element.header ?? 0);
    writer.writeUint32(element.is_name_same_path ?? 0);
    writer.writeUint32(element.strings_count ?? 0);
    writeLengthPrefixedString(writer, element.name);
    writeLengthPrefixedString(writer, element.path_left);
    writeLengthPrefixedString(writer, element.path_right);

    const positions = Array.isArray(element.positions) ? element.positions : [];
    writer.writeUint32(positions.length);
    writeElements(positions, (position) => {
        writer.writeUint32(position.header ?? 0);
        writer.writeInt32(position.x ?? 0);
        writer.writeInt32(position.y ?? 0);
        writer.writeUint32(position.unknown1 ?? 0);
        writer.writeUint32(position.unknown2 ?? 0);
        writer.writeUint32(position.unknown3 ?? 0);
        writer.writeUint32(position.unknown4 ?? 0);
        writer.writeUint32(position.unknown5 ?? 0);
        writer.writeUint32(position.width ?? 0);
        writer.writeUint32(position.height ?? 0);
        writer.writeUint32(position.index ?? 0);
        writer.writeUint32(position.unknown6 ?? 0);
    });
}

function parseList(source, elementFactory) {
    const reader = ensureReader(source);
    const version = readVersion(reader);
    const count = reader.readUint32();
    const elements = loadElements(count, () => elementFactory(reader));
    return {
        version,
        data: {
            elements
        }
    };
}

function writeList(database, elementWriter) {
    const writer = new DataWriter();
    writeVersion(writer, database.version);
    const elements = database?.data?.elements ?? [];
    writer.writeUint32(elements.length);
    writeElements(elements, (element) => elementWriter(writer, element));
    return writer.toArrayBuffer();
}

export function parseAnime(source) {
    return parseList(source, parseAnimation);
}

export function serializeAnime(database) {
    return writeList(database, writeAnimation);
}

export function parseAnimeSet(source) {
    const reader = ensureReader(source);
    const version = readVersion(reader);
    const count = reader.readUint32();
    const elements = loadElements(count, () => parseAnimationSetElement(reader));
    return {
        version,
        data: {
            elements
        }
    };
}

export function serializeAnimeSet(database) {
    const writer = new DataWriter();
    writeVersion(writer, database.version);
    const elements = database?.data?.elements ?? [];
    writer.writeUint32(elements.length);
    writeElements(elements, (element) => writeAnimationSetElement(writer, element));
    return writer.toArrayBuffer();
}

export function parseBgm(source) {
    return parseList(source, (reader) => parseSimpleAsset(reader, true));
}

export function serializeBgm(database) {
    return writeList(database, (writer, element) => writeSimpleAsset(writer, element, true));
}

export function parseCharaEffect(source) {
    return parseList(source, parseCharaEffectElement);
}

export function serializeCharaEffect(database) {
    return writeList(database, writeCharaEffectElement);
}

export function parsePicture(source) {
    return parseList(source, parseSimpleAsset);
}

export function serializePicture(database) {
    return writeList(database, (writer, element) => writeSimpleAsset(writer, element));
}

export function parseSound(source) {
    return parseList(source, parseSimpleAsset);
}

export function serializeSound(database) {
    return writeList(database, (writer, element) => writeSimpleAsset(writer, element));
}

export function parseBmpCharaExc(source) {
    return parseList(source, parseBmpCharaExcElement);
}

export function serializeBmpCharaExc(database) {
    return writeList(database, writeBmpCharaExcElement);
}

export function parseEffect(source) {
    const reader = ensureReader(source);
    const version = readVersion(reader);
    const count = reader.readUint32();
    const elements = loadElements(count, () => parseEffectElement(reader));
    return {
        version,
        data: {
            elements
        }
    };
}

export function serializeEffect(database) {
    const writer = new DataWriter();
    writeVersion(writer, database.version);
    const elements = database?.data?.elements ?? [];
    writer.writeUint32(elements.length);
    writeElements(elements, (element) => writeEffectElement(writer, element));
    return writer.toArrayBuffer();
}

export function parseScrEffect(source) {
    return parseList(source, parseScreenEffectElement);
}

export function serializeScrEffect(database) {
    return writeList(database, writeScreenEffectElement);
}

export function parseSwordType(source) {
    const reader = ensureReader(source);
    const version = readVersion(reader);
    const count = reader.readUint32();
    const elements = loadElements(count, () => parseSwordTypeElement(reader));
    return {
        version,
        data: {
            elements
        }
    };
}

export function serializeSwordType(database) {
    const writer = new DataWriter();
    writeVersion(writer, database.version);
    const elements = database?.data?.elements ?? [];
    writer.writeUint32(elements.length);
    writeElements(elements, (element) => writeSwordTypeElement(writer, element));
    return writer.toArrayBuffer();
}

function writeVersion(writer, version) {
    if (!MAGIC_VALUES.has(version)) {
        throw new Error(`Unexpected database version: 0x${version?.toString(16)}`);
    }
    writer.writeUint32(version);
}

function normalizeName(name) {
    return name.toLowerCase();
}

const PARSER_MAP = new Map([
    ['anime', parseAnime],
    ['anime.dat', parseAnime],
    ['animeset', parseAnimeSet],
    ['animeset.dat', parseAnimeSet],
    ['bgm', parseBgm],
    ['bgm.dat', parseBgm],
    ['charaeffect', parseCharaEffect],
    ['charaeffect.dat', parseCharaEffect],
    ['picture', parsePicture],
    ['picture.dat', parsePicture],
    ['sound', parseSound],
    ['sound.dat', parseSound],
    ['bmp_charaexc', parseBmpCharaExc],
    ['bmp_charaexc.dat', parseBmpCharaExc],
    ['effect', parseEffect],
    ['effect.dat', parseEffect],
    ['screffect', parseScrEffect],
    ['screffect.dat', parseScrEffect],
    ['swordtype', parseSwordType],
    ['swordtype.dat', parseSwordType]
]);

const SERIALIZER_MAP = new Map([
    ['anime', serializeAnime],
    ['anime.dat', serializeAnime],
    ['animeset', serializeAnimeSet],
    ['animeset.dat', serializeAnimeSet],
    ['bgm', serializeBgm],
    ['bgm.dat', serializeBgm],
    ['charaeffect', serializeCharaEffect],
    ['charaeffect.dat', serializeCharaEffect],
    ['picture', serializePicture],
    ['picture.dat', serializePicture],
    ['sound', serializeSound],
    ['sound.dat', serializeSound],
    ['bmp_charaexc', serializeBmpCharaExc],
    ['bmp_charaexc.dat', serializeBmpCharaExc],
    ['effect', serializeEffect],
    ['effect.dat', serializeEffect],
    ['screffect', serializeScrEffect],
    ['screffect.dat', serializeScrEffect],
    ['swordtype', serializeSwordType],
    ['swordtype.dat', serializeSwordType]
]);

export function resolveParser(name) {
    const normalized = normalizeName(name);
    if (PARSER_MAP.has(normalized)) {
        return PARSER_MAP.get(normalized);
    }
    throw new Error(`Unknown database type: ${name}`);
}

export function resolveSerializer(name) {
    const normalized = normalizeName(name);
    if (SERIALIZER_MAP.has(normalized)) {
        return SERIALIZER_MAP.get(normalized);
    }
    throw new Error(`Unknown database type: ${name}`);
}

async function loadArrayBuffer(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return response.arrayBuffer();
}

export async function loadDatabase(url, name) {
    const parser = resolveParser(name);
    const buffer = await loadArrayBuffer(url);
    return parser(buffer);
}

export async function loadDatabaseByUrl(url) {
    const name = url.split('/').pop();
    const parser = resolveParser(name);
    const buffer = await loadArrayBuffer(url);
    return parser(buffer);
}

export { PARSER_MAP, SERIALIZER_MAP };
