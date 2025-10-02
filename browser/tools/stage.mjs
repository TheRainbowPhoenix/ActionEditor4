#!/usr/bin/env node
import { createReadStream, createWriteStream } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import process from 'node:process';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const require = createRequire(import.meta.url);

// Dynamically load encoding-japanese for Shift_JIS support
try {
    const encoding = require('encoding-japanese');
    if (encoding) {
        globalThis.__ACTED_ENCODING_JAPANESE__ = encoding?.default ?? encoding;
    }
} catch (error) {
    // Ignore. The parser will throw a more specific error if it's truly needed.
}

// Update this path to point to your stage parser
import { parseStage, serializeStage } from '../src/data/stage.js';

const DEFAULT_OUTPUT_INDENT = 2;

const jsonReplacer = (key, value) => {
  if (value instanceof Uint8Array) {
    return { $type: "Uint8Array", data: Array.from(value) };
  }
  return value;
};

const jsonReviver = (key, value) => {
  if (value && typeof value === "object" && value.$type === "Uint8Array" && Array.isArray(value.data)) {
    return new Uint8Array(value.data);
  }
  return value;
};

function printUsage() {
    console.error('Usage: node stage.mjs <dump|build> <input> [output]');
    console.error('\nCommands:');
    console.error('  dump    Convert a .stg4_1020 file to JSON.');
    console.error('  build   Convert a JSON file to a .stg4_1020 file.');
    console.error('\nExamples:');
    console.error('  node stage.mjs dump stage1.stg4_1020 > stage1.json');
    console.error('  node stage.mjs dump stage1.stg4_1020 --out stage1.json');
    console.error('  node stage.mjs build stage1.json stage1_new.stg4_1020');
}

/**
 * Dumps a .stg4 file to JSON using streams.
 * @param {string} inputPath - Path to the .stg4 file.
 * @param {string|null} outputPath - Path for the output .json file, or null for stdout.
 */
async function dumpStage(inputPath, outputPath) {
    let parsed;
    try {
        // 1. Create a Node.js readable stream from the input file.
        const nodeStream = createReadStream(inputPath);

        // 2. Convert the Node.js stream to a Web Stream, which parseStage expects.
        const webStream = Readable.toWeb(nodeStream);

        // 3. Await the stream-based parser.
        parsed = await parseStage(webStream);
    } catch (error) {
        throw new Error(`Failed to parse ${inputPath}: ${error.message}`);
    }

    const json = JSON.stringify(parsed, jsonReplacer, DEFAULT_OUTPUT_INDENT);

    if (outputPath) {
        try {
            await writeFile(outputPath, json, 'utf8');
            console.log(`Successfully wrote JSON to ${outputPath}`);
        } catch (error) {
            throw new Error(`Failed to write ${outputPath}: ${error.message}`);
        }
        return;
    }

    // Write to standard output if no output file is specified.
    process.stdout.write(`${json}\n`);
}

/**
 * Builds a .stg4 file from a JSON file using streams.
 * @param {string} inputPath - Path to the .json file.
 * @param {string} outputPath - Path for the output .stg4 file.
 */
async function buildStage(inputPath, outputPath) {
    let payload;
    try {
        const jsonContent = await readFile(inputPath, 'utf8');
        payload = JSON.parse(jsonContent, jsonReviver);
    } catch (error) {
        throw new Error(`Failed to read or parse JSON from ${inputPath}: ${error.message}`);
    }

    try {
        // 1. Get the Web Stream from the serializer.
        const serializationWebStream = serializeStage(payload);

        // 2. Convert the Web Stream back into a Node.js stream.
        const serializationNodeStream = Readable.fromWeb(serializationWebStream);

        // 3. Create a Node.js writable stream for the output file.
        const fileWriteStream = createWriteStream(outputPath);

        // 4. Use pipeline to efficiently stream from the serializer to the file.
        // This avoids buffering the entire binary file in memory.
        await pipeline(serializationNodeStream, fileWriteStream);

        console.log(`Successfully built ${outputPath}`);
    } catch (error) {
        throw new Error(`Failed to serialize or write to ${outputPath}: ${error.message}`);
    }
}


// --- Main CLI Logic (largely unchanged from your example) ---

function isFlag(value) {
    return typeof value === 'string' && value.startsWith('--');
}

async function main(argv) {
    const args = argv.slice(2);
    if (args.length === 0) {
        printUsage();
        return process.exit(1);
    }

    const [command, ...rest] = args;
    if (command !== 'dump' && command !== 'build') {
        console.error(`Unknown command: ${command}`);
        printUsage();
        return process.exit(1);
    }

    try {
        if (command === 'dump') {
            if (rest.length === 0) throw new Error('Missing input .stg4 file for dump command.');

            let inputPath = null;
            let outputPath = null;
            for (let i = 0; i < rest.length; i++) {
                const value = rest[i];
                if (!inputPath && !isFlag(value)) inputPath = value;
                else if ((value === '--out' || value === '-o') && i + 1 < rest.length) outputPath = rest[++i];
                else if (!outputPath && !isFlag(value)) outputPath = value;
                else throw new Error(`Unknown argument: ${value}`);
            }

            if (!inputPath) throw new Error('Missing input .stg4 file for dump command.');
            await dumpStage(inputPath, outputPath);

        } else if (command === 'build') {
            if (rest.length < 2) throw new Error('Build command requires an input JSON file and an output .stg4 path.');
            const [inputPath, outputPath] = rest;
            if (isFlag(inputPath) || isFlag(outputPath)) throw new Error('Invalid arguments for build command.');
            await buildStage(inputPath, outputPath);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        printUsage();
        process.exit(1);
    }
}

main(process.argv);