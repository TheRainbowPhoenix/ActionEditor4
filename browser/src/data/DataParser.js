// This file translates the binary data into JavaScript objects.
import DataReader from './DataReader.js';

export function parseCharacter(dataReader) {
    const character = {};
    character.start = dataReader.readInt32();
    character.inherit_palette = dataReader.readChar();
    character.inherit_palette_data_number = dataReader.readInt16();
    // ... continue reading fields in the EXACT same order as the C++ struct ...
    character.hp = dataReader.readInt32();
    character.sp = dataReader.readInt32();
    // ... and so on for all fields.

    // For nested data like flows:
    const flowCount = dataReader.readInt32();
    character.flowData = [];
    for (let i = 0; i < flowCount; i++) {
        character.flowData.push(parseFlow(dataReader));
    }
    return character;
}

export function parseFlow(dataReader) {
    const flow = {};
    // ... read all flow properties
    
    // Parse commands
    const commandCount = dataReader.readInt32();
    flow.commandData = [];
    for (let i = 0; i < commandCount; i++) {
        flow.commandData.push(parseCommand(dataReader));
    }
    return flow;
}

export function parseCommand(dataReader) {
    const command = {};
    command.start = dataReader.readInt32();
    command.byte5 = dataReader.readChar();
    command.type = dataReader.readChar();

    // The most important part: parse the details based on the type
    switch (command.type) {
        case 1: // Wait
            command.details = parseWaitDetails(dataReader);
            break;
        case 11: // Shot
            command.details = parseShotDetails(dataReader);
            break;
        // ... add cases for every command type
    }
    return command;
}

// Example for a specific details struct
function parseShotDetails(dataReader) {
    const details = {};
    details.execution_time = dataReader.readInt16();
    details.execution_time_double = dataReader.readInt16();
    // ... read all fields from the Shot_Details struct
    return details;
}