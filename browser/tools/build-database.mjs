import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import {
    serializeAnime,
    serializeAnimeSet,
    serializeBgm,
    serializeBmpCharaExc,
    serializeCharaEffect,
    serializeEffect,
    serializePicture,
    serializeScrEffect,
    serializeSound,
    serializeSwordType,
    resolveSerializer
} from '../src/data/databases.js';

const SERIALIZERS = new Map([
    ['anime', serializeAnime],
    ['animeset', serializeAnimeSet],
    ['bgm', serializeBgm],
    ['bmp_charaexc', serializeBmpCharaExc],
    ['charaeffect', serializeCharaEffect],
    ['effect', serializeEffect],
    ['picture', serializePicture],
    ['screffect', serializeScrEffect],
    ['sound', serializeSound],
    ['swordtype', serializeSwordType]
]);

function normalizeKey(value) {
    return value.toLowerCase().replace(/\.json$/i, '').replace(/\.dat$/i, '');
}

function detectSerializerType(inputPath) {
    const fileName = path.basename(inputPath);
    const normalized = normalizeKey(fileName);
    if (SERIALIZERS.has(normalized)) {
        return normalized;
    }
    return null;
}

function getSerializer(type) {
    if (!type) {
        throw new Error('Missing database type. Provide --type or use a recognised file name.');
    }
    const normalized = normalizeKey(type);
    if (SERIALIZERS.has(normalized)) {
        return SERIALIZERS.get(normalized);
    }
    return resolveSerializer(type);
}

function printUsage() {
    console.error('Usage: node build-database.mjs <input.json> <output.dat> [--type <name>]');
    console.error('Supported types:', Array.from(SERIALIZERS.keys()).join(', '));
}

async function main(argv) {
    const args = argv.slice(2);
    if (args.length < 2) {
        printUsage();
        process.exitCode = 1;
        return;
    }

    let inputPath = null;
    let outputPath = null;
    let type = null;

    for (let index = 0; index < args.length; index += 1) {
        const value = args[index];
        if (!inputPath) {
            inputPath = value;
            continue;
        }
        if (!outputPath) {
            outputPath = value;
            continue;
        }
        if (value === '--type' && index + 1 < args.length) {
            type = args[index + 1];
            index += 1;
            continue;
        }
        console.error(`Unknown argument: ${value}`);
        printUsage();
        process.exitCode = 1;
        return;
    }

    if (!inputPath || !outputPath) {
        console.error('Input and output paths are required.');
        printUsage();
        process.exitCode = 1;
        return;
    }

    if (!type) {
        type = detectSerializerType(inputPath);
    }

    let serializer;
    try {
        serializer = getSerializer(type || path.basename(outputPath));
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
        return;
    }

    let payload;
    try {
        const jsonContent = await readFile(inputPath, 'utf8');
        payload = JSON.parse(jsonContent);
    } catch (error) {
        console.error(`Failed to read ${inputPath}:`, error.message);
        process.exitCode = 1;
        return;
    }

    let arrayBuffer;
    try {
        arrayBuffer = serializer(payload);
    } catch (error) {
        console.error(`Failed to serialise ${inputPath}:`, error.message);
        process.exitCode = 1;
        return;
    }

    const outputBytes = Buffer.from(new Uint8Array(arrayBuffer));

    try {
        await writeFile(outputPath, outputBytes);
    } catch (error) {
        console.error(`Failed to write ${outputPath}:`, error.message);
        process.exitCode = 1;
    }
}

main(process.argv).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});