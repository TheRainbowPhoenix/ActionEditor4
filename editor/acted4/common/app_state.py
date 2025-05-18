from enum import Enum, auto

class PaletteMode(Enum):
    BLOCK = auto()
    CHARACTER = auto()
    ITEM = auto()

class AppStateManager:
    _instance = None

    def __init__(self):
        self._palette_mode = PaletteMode.BLOCK
        self._palette_mode_changed_callbacks = []
        
    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
        
    @property
    def palette_mode(self) -> PaletteMode:
        return self._palette_mode
        
    def set_palette_mode(self, mode: PaletteMode):
        if mode != self._palette_mode:
            self._palette_mode = mode
            for callback in self._palette_mode_changed_callbacks:
                callback(mode)
                
    def on_palette_mode_changed(self, callback):
        self._palette_mode_changed_callbacks.append(callback)
        
    def remove_palette_mode_callback(self, callback):
        if callback in self._palette_mode_changed_callbacks:
            self._palette_mode_changed_callbacks.remove(callback)