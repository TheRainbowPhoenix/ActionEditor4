import DataReader from './DataReader.js';

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

function loadElements(count, factory) {
    const results = [];
    for (let index = 0; index < count; index += 1) {
        results.push(factory());
    }
    return results;
}

function parseAnimation(reader) {
    const animation = {
        header: reader.readUint32(),
        sample_list_index: reader.readUint16(),
        sample_type: reader.readUint8(),
        frame_start: reader.readUint16(),
        unknown: reader.readUint32(),
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

function parseAnimationSetElement(reader) {
    const header = reader.readUint32();
    const invincibilityOffset = reader.readUint32();
    const blockOffset = reader.readUint32();
    const flyingOffset = reader.readUint32();
    const unknown = reader.readUint32();
    const name = readLengthPrefixedString(reader);

    const animationCount = reader.readUint32();
    const animations = loadElements(animationCount, () => parseAnimation(reader));

    return {
        header,
        flying_offset: flyingOffset,
        block_offset: blockOffset,
        invincibility_offset: invincibilityOffset,
        unknown,
        name,
        animations
    };
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

function parseEffectElement(reader) {
    const element = {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32(),
        width: reader.readUint32(),
        height: reader.readUint32(),
        is_giant: reader.readUint32(),
        unknown: reader.readUint32(),
        name: readLengthPrefixedString(reader),
        path: readLengthPrefixedString(reader)
    };

    const animationCount = reader.readUint32();
    element.animations = loadElements(animationCount, () => parseEffectAnimation(reader));
    return element;
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
        unknown: reader.readUint32(),
        name: readLengthPrefixedString(reader)
    };
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
        unknown: reader.readUint32(),
        name: readLengthPrefixedString(reader)
    };
}

function parseBmpCharaExcElement(reader) {
    return {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32(),
        is_giant: reader.readUint32(),
        scale_mode: reader.readUint32(),
        unknown: reader.readUint32(),
        name: readLengthPrefixedString(reader),
        path: readLengthPrefixedString(reader)
    };
}

function parseSwordTypeElement(reader) {
    const element = {
        header: reader.readUint32(),
        is_name_same_path: reader.readUint32(),
        unknown: reader.readUint32(),
        name: readLengthPrefixedString(reader),
        path_left: readLengthPrefixedString(reader),
        path_right: readLengthPrefixedString(reader)
    };

    const positionCount = reader.readUint32();
    element.positions = loadElements(positionCount, () => parseSwordPosition(reader));
    return element;
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

export function parseAnime(source) {
    return parseList(source, parseAnimation);
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

export function parseBgm(source) {
    return parseList(source, (reader) => parseSimpleAsset(reader, true));
}

export function parseCharaEffect(source) {
    return parseList(source, parseCharaEffectElement);
}

export function parsePicture(source) {
    return parseList(source, parseSimpleAsset);
}

export function parseSound(source) {
    return parseList(source, parseSimpleAsset);
}

export function parseBmpCharaExc(source) {
    return parseList(source, parseBmpCharaExcElement);
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

export function parseScrEffect(source) {
    return parseList(source, parseScreenEffectElement);
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

export function resolveParser(name) {
    const normalized = normalizeName(name);
    if (PARSER_MAP.has(normalized)) {
        return PARSER_MAP.get(normalized);
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

export { PARSER_MAP };
