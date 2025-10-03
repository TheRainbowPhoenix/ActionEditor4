import { DataReader, DataWriter } from './data-reader-writer.js';

// --- Utilities (internal to this module) ---

function readStdString(reader) {
    return reader.readStdString();
}

function writeStdString(writer, value) {
    writer.writeStdString(value || '');
}

function loadElements(reader, count, factory) {
    const results = [];
    for (let index = 0; index < count; index += 1) {
        results.push(factory(reader));
    }
    return results;
}

function writeElements(writer, elements, callback) {
    for (const element of (elements || [])) {
        callback(writer, element);
    }
}

// --- Structure Parsers & Writers (internal) ---

function parseWorldChip(reader) {
    return {
        header: reader.readUint32(),
        tile_index: reader.readUint32(),
        locked: reader.readUint32(),
        graphic: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readStdString(reader),
        unused_string: readStdString(reader)
    };
}

function writeWorldChip(writer, chip) {
    writer.writeUint32(chip?.header ?? 0);
    writer.writeUint32(chip?.tile_index ?? 0);
    writer.writeUint32(chip?.locked ?? 0);
    writer.writeUint32(chip?.graphic ?? 0);
    writer.writeUint32(chip?.strings_count ?? 2);
    writeStdString(writer, chip?.name);
    writeStdString(writer, chip?.unused_string);
}

function parseWorldEventPage(reader) {
    return {
        header: reader.readUint32(),
        event_type: reader.readUint32(),
        graphic: reader.readUint32(),
        world_number: reader.readUint32(),
        pass_without_clear: reader.readUint32(),
        play_after_clear: reader.readUint32(),
        on_game_clear: reader.readUint32(),
        appearance_condition_world: reader.readUint32(),
        appearance_condition_variable: reader.readUint32(),
        appearance_condition_constant: reader.readUint32(),
        appearance_condition_comparison_content: reader.readUint32(),
        appearance_condition_total_score: reader.readUint32(),
        variation_setting_present: reader.readUint32(),
        variation_variable: reader.readUint32(),
        variation_constant: reader.readUint32(),
        strings_count: reader.readUint32(),
        world_name: readStdString(reader),
        start_stage: readStdString(reader)
    };
}

function writeWorldEventPage(writer, page) {
    writer.writeUint32(page?.header ?? 0);
    writer.writeUint32(page?.event_type ?? 0);
    writer.writeUint32(page?.graphic ?? 0);
    writer.writeUint32(page?.world_number ?? 0);
    writer.writeUint32(page?.pass_without_clear ?? 0);
    writer.writeUint32(page?.play_after_clear ?? 0);
    writer.writeUint32(page?.on_game_clear ?? 0);
    writer.writeUint32(page?.appearance_condition_world ?? 0);
    writer.writeUint32(page?.appearance_condition_variable ?? 0);
    writer.writeUint32(page?.appearance_condition_constant ?? 0);
    writer.writeUint32(page?.appearance_condition_comparison_content ?? 0);
    writer.writeUint32(page?.appearance_condition_total_score ?? 0);
    writer.writeUint32(page?.variation_setting_present ?? 0);
    writer.writeUint32(page?.variation_variable ?? 0);
    writer.writeUint32(page?.variation_constant ?? 0);
    writer.writeUint32(page?.strings_count ?? 2);
    writeStdString(writer, page?.world_name);
    writeStdString(writer, page?.start_stage);
}

function parseWorldEvent(reader) {
    const event = {
        header: reader.readUint32(),
        placement_x: reader.readUint32(),
        placement_y: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readStdString(reader)
    };
    const pagesCount = reader.readUint32();
    event.pages_count = pagesCount;
    event.pages = loadElements(reader, pagesCount, parseWorldEventPage);
    return event;
}

function writeWorldEvent(writer, event) {
    writer.writeUint32(event?.header ?? 0);
    writer.writeUint32(event?.placement_x ?? 0);
    writer.writeUint32(event?.placement_y ?? 0);
    writer.writeUint32(event?.strings_count ?? 1);
    writeStdString(writer, event?.name);
    const pages = event?.pages || [];
    writer.writeUint32(event?.pages_count ?? pages.length);
    writeElements(writer, pages, writeWorldEventPage);
}


// --- Core Parsing & Serialization Logic ---

/**
 * The core synchronous parser that works on a complete ArrayBuffer.
 * @param {ArrayBuffer} buffer
 */
function parseWorldMapFile(buffer) {
    const reader = new DataReader(buffer);
    const version = reader.readUint32();
    
    // Read main properties
    const data = {
        settings_count: reader.readUint32(),
        width: reader.readUint32(),
        height: reader.readUint32(),
        chunk_width: reader.readUint32(),
        chunk_pow: reader.readUint32(),
        init_x: reader.readUint32(),
        init_y: reader.readUint32(),
        background_index: reader.readUint32(),
        use_background: reader.readUint32(),
        strings_count: reader.readUint32(),
        name: readStdString(reader),
        bg_path: readStdString(reader),
    };

    // Read arrays
    data.tiles_types_count = reader.readUint32();
    data.tiles_types = loadElements(reader, data.tiles_types_count, parseWorldChip);

    data.tiles_count = reader.readUint32();
    data.tiles = loadElements(reader, data.tiles_count, r => r.readUint32());

    data.events_count = reader.readUint32();
    data.events = loadElements(reader, data.events_count, parseWorldEvent);

    data.events_pal_count = reader.readUint32();
    data.events_pal = loadElements(reader, data.events_pal_count, parseWorldEvent);

    return { version, data };
}

/**
 * The core synchronous writer that populates a DataWriter.
 * @param {DataWriter} writer
 * @param {object} worldMap
 */
function writeWorldMapFile(writer, worldMap) {
    if (!worldMap || typeof worldMap !== 'object') {
        throw new TypeError('World map payload must be an object.');
    }
    const version = worldMap.version;
    if (typeof version !== 'number') {
        throw new TypeError('World map payload is missing a numeric version field.');
    }
    writer.writeUint32(version);

    const data = worldMap.data ?? {};
    writer.writeUint32(data.settings_count ?? 0);
    writer.writeUint32(data.width ?? 0);
    writer.writeUint32(data.height ?? 0);
    writer.writeUint32(data.chunk_width ?? 0);
    writer.writeUint32(data.chunk_pow ?? 0);
    writer.writeUint32(data.init_x ?? 0);
    writer.writeUint32(data.init_y ?? 0);
    writer.writeUint32(data.background_index ?? 0);
    writer.writeUint32(data.use_background ?? 0);
    writer.writeUint32(data.strings_count ?? 2);
    writeStdString(writer, data.name);
    writeStdString(writer, data.bg_path);

    const tilesTypes = data.tiles_types || [];
    writer.writeUint32(data.tiles_types_count ?? tilesTypes.length);
    writeElements(writer, tilesTypes, writeWorldChip);

    const tiles = data.tiles || [];
    writer.writeUint32(data.tiles_count ?? tiles.length);
    for (const tile of tiles) {
        writer.writeUint32(tile ?? 0);
    }

    const events = data.events || [];
    writer.writeUint32(data.events_count ?? events.length);
    writeElements(writer, events, writeWorldEvent);

    const eventsPal = data.events_pal || [];
    writer.writeUint32(data.events_pal_count ?? eventsPal.length);
    writeElements(writer, eventsPal, writeWorldEvent);
}

// --- Stream Handling ---

class WorldMapTransformStream {
    constructor() {
        let fileBuffer = new Uint8Array(0);
        this.stream = new TransformStream({
            transform(chunk, controller) {
                const newBuffer = new Uint8Array(fileBuffer.length + chunk.length);
                newBuffer.set(fileBuffer, 0);
                newBuffer.set(chunk, fileBuffer.length);
                fileBuffer = newBuffer;
            },
            flush(controller) {
                try {
                    const result = parseWorldMapFile(fileBuffer.buffer);
                    controller.enqueue(result);
                } catch (e) {
                    controller.error(e);
                }
            }
        });
        this.readable = this.stream.readable;
        this.writable = this.stream.writable;
    }
}

/**
 * Parses a WorldMap.dat file from a web stream.
 * @param {ReadableStream} stream - The stream of the file.
 * @returns {Promise<object>} A promise that resolves with the parsed world map object.
 */
export async function parseWorldMap(stream) {
    const transformStream = new WorldMapTransformStream();
    const parsedStream = stream.pipeThrough(transformStream.stream);
    const reader = parsedStream.getReader();
    const { value } = await reader.read();
    return value;
}

/**
 * Serializes a world map object to a ReadableStream of bytes.
 * @param {object} data - The world map data object.
 * @returns {ReadableStream<Uint8Array>}
 */
export function serializeWorldMap(data) {
    return new ReadableStream({
        start(controller) {
            try {
                const writer = new DataWriter();
                writeWorldMapFile(writer, data);
                const buffer = writer.toBuffer();
                controller.enqueue(new Uint8Array(buffer));
                controller.close();
            } catch (e) {
                console.error("Error during WorldMap serialization:", e);
                controller.error(e);
            }
        }
    });
}