#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import process from 'node:process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

try {
  const encoding = require('encoding-japanese');
  if (encoding) {
    globalThis.__ACTED_ENCODING_JAPANESE__ = encoding?.default ?? encoding;
  }
} catch (error) {
  // Optional dependency for Shift-JIS encoding when running in Node.
}

import { parseStage, serializeStage } from '../src/data/stage.js';

function printUsage() {
  console.error('Usage: node stage-roundtrip.mjs <stage> [<stage> ...] [--json-out <dir>]');
  console.error('Options:');
  console.error('  --json-out <dir>   Write JSON dumps for each stage to the provided directory.');
}

function parseArguments(argv) {
  const args = argv.slice(2);
  if (args.length === 0) {
    printUsage();
    return null;
  }

  const files = [];
  let jsonDir = null;
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === '--help' || value === '-h') {
      printUsage();
      return null;
    }
    if (value === '--json-out' || value === '-j') {
      if (index + 1 >= args.length) {
        console.error('Missing directory after --json-out option.');
        return null;
      }
      jsonDir = args[index + 1];
      index += 1;
      continue;
    }
    files.push(value);
  }

  if (files.length === 0) {
    printUsage();
    return null;
  }

  return { files, jsonDir };
}

function deriveJsonName(stagePath) {
  const base = basename(stagePath);
  const replaced = base.replace(/\.stg4(?:_\d+)?$/i, '.json');
  if (replaced === base) {
    return `${base}.json`;
  }
  return replaced;
}

async function roundTripStage(stagePath, jsonDir) {
  let buffer;
  try {
    buffer = await readFile(stagePath);
  } catch (error) {
    throw new Error(`Failed to read ${stagePath}: ${error.message}`);
  }

  let parsed;
  try {
    parsed = parseStage(buffer);
  } catch (error) {
    throw new Error(`Failed to parse ${stagePath}: ${error.message}`);
  }

  const rebuiltArrayBuffer = serializeStage(parsed);
  const rebuiltBytes = Buffer.from(new Uint8Array(rebuiltArrayBuffer));

  if (buffer.length !== rebuiltBytes.length || !buffer.equals(rebuiltBytes)) {
    throw new Error(`Round-trip mismatch for ${stagePath}.`);
  }

  if (jsonDir) {
    try {
      await mkdir(jsonDir, { recursive: true });
      const jsonName = deriveJsonName(stagePath);
      const jsonPath = join(jsonDir, jsonName);
      const jsonContent = JSON.stringify(parsed, null, 2);
      await writeFile(jsonPath, jsonContent, 'utf8');
    } catch (error) {
      throw new Error(`Failed to write JSON for ${stagePath}: ${error.message}`);
    }
  }

  return parsed.version;
}

async function main() {
  const parsedArgs = parseArguments(process.argv);
  if (!parsedArgs) {
    process.exitCode = 1;
    return;
  }

  const { files, jsonDir } = parsedArgs;
  let failure = false;

  for (const stagePath of files) {
    try {
      const version = await roundTripStage(stagePath, jsonDir);
      console.log(`✔ ${stagePath} (version ${version})`);
    } catch (error) {
      console.error(error.message);
      failure = true;
    }
  }

  if (failure) {
    process.exitCode = 1;
  }
}

main();