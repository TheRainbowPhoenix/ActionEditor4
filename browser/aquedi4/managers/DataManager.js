import { parseStage } from "../parsers/stg4-parser.js";
import { parseWorldMap } from "../parsers/worldMap.js";
import { loadDatabase } from "../parsers/database.js";
import { parseSystem } from "../parsers/system.js";

export function DataManager() {
    throw new Error("This is a static class");
}

// Global variables for data
DataManager.$dataSystem = null;
DataManager.$dataWorldMap = null;
DataManager.$dataStage = null;
DataManager.$dataSound = null;
DataManager.$dataAnime = null;
// ... add other $data globals as needed

DataManager._databaseFiles = [
    // The parser is resolved by filename.
    // { name: "$dataSystem", path: "data/System.dat" },
    { name: "$dataAnime", path: "data/database/Anime.dat" },
    { name: "$dataSound", path: "data/database/Sound.dat" },
    // ... all other database files
];

DataManager.loadDatabases = function() {
    const promises = this._databaseFiles.map(fileInfo =>
        this.loadDataFile(fileInfo.name, fileInfo.path)
    );
    
    // Load special, non-list databases separately
    promises.push(this.loadDataFile("$dataSystem", "data/System.dat", true));
    promises.push(this.loadDataFile("$dataWorldMap", "data/WorldMap.dat", true));

    return Promise.all(promises);
};

DataManager.loadDataFile = async function(name, path, isSpecial = false) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`File not found: ${path}`);

        let data;
        if (isSpecial) {
            if (path.endsWith("System.dat")) {
                data = await parseSystem(response.body);
            } else if (path.endsWith("WorldMap.dat")) {
                data = await parseWorldMap(response.body);
            }
        } else {
            // Use the generic database stream parser
            data = await loadDatabase(response.body, path);
        }
        
        window[name] = data;
        console.log(`Loaded ${path}`);
    } catch(e) {
        console.error(`Failed to load ${path}:`, e);
        window[name] = null; // Set to null on failure
    }
};


DataManager.loadStageData = async function(fileName) {

    try {
        const response = await fetch("data/stg4/" + fileName);
        if (!response.ok) throw new Error(`${fileName} not found`);
        window.$dataStage = await parseStage(response.body);
    } catch(e) {
        console.error(`Failed to load ${fileName}:`, e);
        window.$dataStage = null;
    }
};

DataManager.isDataLoaded = function() {
    // Make sure all required data is loaded before proceeding
    for (const fileInfo of this._databaseFiles) {
        if (!window[fileInfo.name]) return false;
    }
    return !!window.$dataWorldMap;
};