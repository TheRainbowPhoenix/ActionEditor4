import { Bitmap } from "../core/Bitmap.js";

/**
 * The static class that manages image resources.
 */
export function ImageManager() {
    throw new Error("This is a static class");
}

ImageManager.cache = {};

ImageManager._path = "bmp/";

ImageManager.loadBitmap = function(folder, filename) {
    if (filename) {
        const path = ImageManager._path + folder + filename + ".bmp";
        return ImageManager.load(path);
    } else {
        return new Bitmap(1, 1);
    }
};

ImageManager.load = function(path) {
    let bitmap = ImageManager.cache[path];
    if (!bitmap) {
        bitmap = Bitmap.load(path);
        ImageManager.cache[path] = bitmap;
    }
    return bitmap;
};

// Specific loaders based on your file tree
ImageManager.loadCharacter = function(filename) { return this.loadBitmap("chara_sp/", filename); };
ImageManager.loadWorldChip = function(filename) { return this.loadBitmap("", filename); };
ImageManager.loadWorldEvent = function(filename) { return this.loadBitmap("", filename); };
ImageManager.loadBackground = function(filename) { return this.loadBitmap("back/", filename); };

ImageManager.isReady = function() {
    for (const key in this.cache) {
        const bitmap = this.cache[key];
        if (!bitmap.isReady()) {
            return false;
        }
    }
    return true;
};