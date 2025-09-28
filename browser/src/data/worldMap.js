import DataReader from './DataReader.js';
import DataWriter from './DataWriter.js';

function ensureReader(source) {
    if (source instanceof DataReader) {
        return source;
    }
    return new DataReader(source);
}

function loadElements(count, factory) {
    const results = [];
    for (let index = 0; index < count; index += 1) {
        results.push(factory());
    }
    return results;
}

function writeElements(elements, callback) {
    if (!Array.isArray(elements)) {
        return;
    }
    for (const element of elements) {
        callback(element);
    }
}

function readStdString(reader) {
    return reader.readStdString();
}

function writeStdString(writer, value) {
    writer.writeLengthPrefixedString(value ?? '');
}

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
    event.pages = loadElements(pagesCount, () => parseWorldEventPage(reader));
    return event;
}

function writeWorldEvent(writer, event) {
    writer.writeUint32(event?.header ?? 0);
    writer.writeUint32(event?.placement_x ?? 0);
    writer.writeUint32(event?.placement_y ?? 0);
    writer.writeUint32(event?.strings_count ?? 1);
    writeStdString(writer, event?.name);
    const pages = Array.isArray(event?.pages) ? event.pages : [];
    writer.writeUint32(event?.pages_count ?? pages.length);
    writeElements(pages, (page) => writeWorldEventPage(writer, page));
}

export function parseWorldMap(source) {
    const reader = ensureReader(source);
    const version = reader.readUint32();
    const settingsCount = reader.readUint32();
    const width = reader.readUint32();
    const height = reader.readUint32();
    const chunkWidth = reader.readUint32();
    const chunkPow = reader.readUint32();
    const initX = reader.readUint32();
    const initY = reader.readUint32();
    const backgroundIndex = reader.readUint32();
    const useBackground = reader.readUint32();
    const stringsCount = reader.readUint32();
    const name = readStdString(reader);
    const bgPath = readStdString(reader);

    const tilesTypesCount = reader.readUint32();
    const tilesTypes = loadElements(tilesTypesCount, () => parseWorldChip(reader));

    const tilesCount = reader.readUint32();
    const tiles = loadElements(tilesCount, () => reader.readUint32());

    const eventsCount = reader.readUint32();
    const events = loadElements(eventsCount, () => parseWorldEvent(reader));

    const eventsPalCount = reader.readUint32();
    const eventsPal = loadElements(eventsPalCount, () => parseWorldEvent(reader));

    return {
        version,
        data: {
            settings_count: settingsCount,
            width,
            height,
            chunk_width: chunkWidth,
            chunk_pow: chunkPow,
            init_x: initX,
            init_y: initY,
            background_index: backgroundIndex,
            use_background: useBackground,
            strings_count: stringsCount,
            name,
            bg_path: bgPath,
            tiles_types_count: tilesTypesCount,
            tiles_types: tilesTypes,
            tiles_count: tilesCount,
            tiles,
            events_count: eventsCount,
            events,
            events_pal_count: eventsPalCount,
            events_pal: eventsPal
        }
    };
}

export function serializeWorldMap(worldMap) {
    if (!worldMap || typeof worldMap !== 'object') {
        throw new TypeError('World map payload must be an object.');
    }

    const writer = new DataWriter();
    const version = worldMap.version;
    if (typeof version !== 'number') {
        throw new TypeError('World map payload is missing a numeric version field.');
    }
    writer.writeUint32(version);

    const data = worldMap.data ?? {};
    const settingsCount = data.settings_count ?? worldMap.settings_count ?? 0;
    writer.writeUint32(settingsCount);
    writer.writeUint32(data.width ?? worldMap.width ?? 0);
    writer.writeUint32(data.height ?? worldMap.height ?? 0);
    writer.writeUint32(data.chunk_width ?? worldMap.chunk_width ?? 0);
    writer.writeUint32(data.chunk_pow ?? worldMap.chunk_pow ?? 0);
    writer.writeUint32(data.init_x ?? worldMap.init_x ?? 0);
    writer.writeUint32(data.init_y ?? worldMap.init_y ?? 0);
    writer.writeUint32(data.background_index ?? worldMap.background_index ?? 0);
    writer.writeUint32(data.use_background ?? worldMap.use_background ?? 0);
    writer.writeUint32(data.strings_count ?? worldMap.strings_count ?? 0);
    writeStdString(writer, data.name ?? worldMap.name);
    writeStdString(writer, data.bg_path ?? worldMap.bg_path);

    const tilesTypes = Array.isArray(data.tiles_types) ? data.tiles_types : [];
    const tilesTypesCount = data.tiles_types_count ?? tilesTypes.length;
    writer.writeUint32(tilesTypesCount);
    for (let index = 0; index < tilesTypesCount; index += 1) {
        writeWorldChip(writer, tilesTypes[index]);
    }

    const tiles = Array.isArray(data.tiles) ? data.tiles : [];
    const tilesCount = data.tiles_count ?? tiles.length;
    writer.writeUint32(tilesCount);
    for (let index = 0; index < tilesCount; index += 1) {
        writer.writeUint32(tiles[index] ?? 0);
    }

    const events = Array.isArray(data.events) ? data.events : [];
    const eventsCount = data.events_count ?? events.length;
    writer.writeUint32(eventsCount);
    writeElements(events.slice(0, eventsCount), (event) => writeWorldEvent(writer, event));

    const eventsPal = Array.isArray(data.events_pal) ? data.events_pal : [];
    const eventsPalCount = data.events_pal_count ?? eventsPal.length;
    writer.writeUint32(eventsPalCount);
    writeElements(eventsPal.slice(0, eventsPalCount), (event) => writeWorldEvent(writer, event));

    return writer.toArrayBuffer();
}