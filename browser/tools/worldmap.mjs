#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import process from 'node:process';

const require = createRequire(import.meta.url);

try {
    const encoding = require('encoding-japanese');
    if (encoding) {
        globalThis.__ACTED_ENCODING_JAPANESE__ = encoding?.default ?? encoding;
    }
} catch (error) {
    // Ignore missing dependency. encodeShiftJis will surface the requirement when needed.
}

import { parseWorldMap, serializeWorldMap } from '../src/data/worldMap.js';

const DEFAULT_OUTPUT_INDENT = 2;

function printUsage() {
    console.error('Usage: node worldmap.mjs <dump|build> <input> [output] [--out <file>]');
    console.error('Examples:');
    console.error('  node worldmap.mjs dump WorldMap.dat --out WorldMap.json');
    console.error('  node worldmap.mjs build WorldMap.json WorldMap.dat');
}

function isFlag(value) {
    return typeof value === 'string' && value.startsWith('--');
}

async function dumpWorldMap(inputPath, outputPath) {
    let buffer;
    try {
        buffer = await readFile(inputPath);
    } catch (error) {
        throw new Error(`Failed to read ${inputPath}: ${error.message}`);
    }

    let parsed;
    try {
        parsed = parseWorldMap(buffer);
    } catch (error) {
        throw new Error(`Failed to parse ${inputPath}: ${error.message}`);
    }

    const json = JSON.stringify(parsed, null, DEFAULT_OUTPUT_INDENT);

    if (outputPath) {
        try {
            await writeFile(outputPath, json, 'utf8');
        } catch (error) {
            throw new Error(`Failed to write ${outputPath}: ${error.message}`);
        }
        return;
    }

    process.stdout.write(`${json}\n`);
}

async function buildWorldMap(inputPath, outputPath) {
    let payload;
    try {
        const jsonContent = await readFile(inputPath, 'utf8');
        payload = JSON.parse(jsonContent);
    } catch (error) {
        throw new Error(`Failed to read ${inputPath}: ${error.message}`);
    }

    let arrayBuffer;
    try {
        arrayBuffer = serializeWorldMap(payload);
    } catch (error) {
        throw new Error(`Failed to serialise ${inputPath}: ${error.message}`);
    }

    const bytes = Buffer.from(new Uint8Array(arrayBuffer));
    try {
        await writeFile(outputPath, bytes);
    } catch (error) {
        throw new Error(`Failed to write ${outputPath}: ${error.message}`);
    }
}

async function main(argv) {
    const args = argv.slice(2);
    if (args.length === 0) {
        printUsage();
        process.exitCode = 1;
        return;
    }

    const [command, ...rest] = args;
    if (command !== 'dump' && command !== 'build') {
        console.error(`Unknown command: ${command}`);
        printUsage();
        process.exitCode = 1;
        return;
    }

    if (command === 'dump') {
        if (rest.length === 0) {
            console.error('Missing input .dat file for dump command.');
            printUsage();
            process.exitCode = 1;
            return;
        }

        let inputPath = null;
        let outputPath = null;
        for (let index = 0; index < rest.length; index += 1) {
            const value = rest[index];
            if (!inputPath && !isFlag(value)) {
                inputPath = value;
                continue;
            }
            if ((value === '--out' || value === '-o') && index + 1 < rest.length) {
                outputPath = rest[index + 1];
                index += 1;
                continue;
            }
            if (!outputPath && !isFlag(value)) {
                outputPath = value;
                continue;
            }
            console.error(`Unknown argument: ${value}`);
            printUsage();
            process.exitCode = 1;
            return;
        }

        if (!inputPath) {
            console.error('Missing input .dat file for dump command.');
            printUsage();
            process.exitCode = 1;
            return;
        }

        try {
            await dumpWorldMap(inputPath, outputPath);
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
        return;
    }

    // build command
    if (rest.length < 2) {
        console.error('Build command requires an input JSON file and an output .dat path.');
        printUsage();
        process.exitCode = 1;
        return;
    }

    const inputPath = rest[0];
    const outputPath = rest[1];
    if (!inputPath || !outputPath || isFlag(inputPath) || isFlag(outputPath)) {
        console.error('Invalid arguments for build command.');
        printUsage();
        process.exitCode = 1;
        return;
    }

    try {
        await buildWorldMap(inputPath, outputPath);
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

main(process.argv).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});