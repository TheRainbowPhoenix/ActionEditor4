#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import {
    parseAnime,
    parseAnimeSet,
    parseBgm,
    parseBmpCharaExc,
    parseCharaEffect,
    parseEffect,
    parsePicture,
    parseScrEffect,
    parseSound,
    parseSwordType,
    resolveParser
} from '../src/data/databases.js';

const DEFAULT_OUTPUT_INDENT = 2;

const PARSERS = new Map([
    ['anime', parseAnime],
    ['animeset', parseAnimeSet],
    ['bgm', parseBgm],
    ['bmp_charaexc', parseBmpCharaExc],
    ['charaeffect', parseCharaEffect],
    ['effect', parseEffect],
    ['picture', parsePicture],
    ['screffect', parseScrEffect],
    ['sound', parseSound],
    ['swordtype', parseSwordType]
]);

function normalizeKey(value) {
    return value.toLowerCase();
}

function detectParserType(inputPath) {
    const fileName = path.basename(inputPath);
    const normalized = normalizeKey(fileName.replace(/\.dat$/i, ''));
    if (PARSERS.has(normalized)) {
        return normalized;
    }
    return null;
}

function getParser(type) {
    if (!type) {
        throw new Error('Missing database type. Provide --type or use a recognised file name.');
    }
    const normalized = normalizeKey(type.replace(/\.dat$/i, ''));
    if (PARSERS.has(normalized)) {
        return PARSERS.get(normalized);
    }
    return resolveParser(type);
}

function printUsage() {
    console.error('Usage: node dump-database.mjs <input.dat> [--type <name>] [--out <file>]');
    console.error('Supported types:', Array.from(PARSERS.keys()).join(', '));
}

async function main(argv) {
    const args = argv.slice(2);
    if (args.length === 0) {
        printUsage();
        process.exitCode = 1;
        return;
    }

    let inputPath = null;
    let type = null;
    let outputPath = null;

    for (let index = 0; index < args.length; index += 1) {
        const value = args[index];
        if (!inputPath && !value.startsWith('--')) {
            inputPath = value;
            continue;
        }
        if (value === '--type' && index + 1 < args.length) {
            type = args[index + 1];
            index += 1;
            continue;
        }
        if (value === '--out' && index + 1 < args.length) {
            outputPath = args[index + 1];
            index += 1;
            continue;
        }
        console.error(`Unknown argument: ${value}`);
        printUsage();
        process.exitCode = 1;
        return;
    }

    if (!inputPath) {
        console.error('Missing input file path.');
        printUsage();
        process.exitCode = 1;
        return;
    }

    if (!type) {
        type = detectParserType(inputPath);
    }

    let parser;
    try {
        parser = getParser(type || path.basename(inputPath));
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
        return;
    }

    let buffer;
    try {
        buffer = await readFile(inputPath);
    } catch (error) {
        console.error(`Failed to read ${inputPath}:`, error.message);
        process.exitCode = 1;
        return;
    }

    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    let parsed;
    try {
        parsed = parser(arrayBuffer);
    } catch (error) {
        console.error(`Failed to parse ${inputPath}:`, error.message);
        process.exitCode = 1;
        return;
    }

    const json = JSON.stringify(parsed, null, DEFAULT_OUTPUT_INDENT);

    if (outputPath) {
        try {
            await writeFile(outputPath, json, 'utf8');
        } catch (error) {
            console.error(`Failed to write ${outputPath}:`, error.message);
            process.exitCode = 1;
            return;
        }
    } else {
        console.log(json);
    }
}

main(process.argv).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
