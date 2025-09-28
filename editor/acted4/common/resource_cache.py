from pathlib import Path
from typing import Optional
from PySide6.QtGui import QImage, QColor, Qt

class SpritesheetCache:
    """
    A simple cache for loading and managing spritesheet images.
    """
    def __init__(self):
        self._cache = {}

    def get_spritesheet(self, path: Path) -> Optional[QImage]:
        """
        Get a spritesheet image, loading it if not already cached.
        """
        path_str = str(path)
        if path_str not in self._cache:
            if path.exists() and path.suffix.lower() == ".bmp":
                image = QImage(str(path))
                if not image.isNull():
                    self._cache[path_str] = image
                else:
                    print(f"Warning: Could not load image from {path}")
                    return None
            else:
                print(f"Warning: Spritesheet file not found or not a BMP: {path}")
                return None
        return self._cache[path_str]

    def get_sprite(self, path: Path, index: int, sprite_width: int, sprite_height: int) -> Optional[QImage]:
        """
        Get a specific sprite from a cached spritesheet.
        """
        sheet = self.get_spritesheet(path)
        if not sheet:
            return None

        # Validate dimensions
        if sheet.width() < sprite_width or sheet.height() % sprite_height != 0:
            print(f"Warning: Invalid spritesheet dimensions for {path}")
            return None

        max_index = (sheet.height() // sprite_height) - 1
        if index < 0 or index > max_index:
            print(f"Warning: Graphic index {index} out of range for {path} (0 to {max_index})")
            return None

        x = 0
        y = index * sprite_height
        sprite = sheet.copy(x, y, sprite_width, sprite_height)

        # Handle transparency: Use the top-left pixel as the transparent color
        if not sprite.isNull():
            transparent_color = sprite.pixelColor(0, 0)
            mask = sprite.createMaskFromColor(transparent_color.rgb())
            mask.invertPixels()
            sprite.setAlphaChannel(mask)
        return sprite

    def get_sprite_count(self, path: Path, sprite_width: int, sprite_height: int) -> int:
        """
        Get the number of sprites in a cached spritesheet.
        """
        sheet = self.get_spritesheet(path)
        if not sheet:
            return 0

        if sheet.width() < sprite_width or sheet.height() % sprite_height != 0:
            print(f"Warning: Invalid spritesheet dimensions for {path}")
            return 0

        return sheet.height() // sprite_height

    def clear_cache(self):
        """
        Clear the cache (optional, if needed for memory management).
        """
        self._cache.clear()

# Global instance
resource_cache = SpritesheetCache()