from PySide6.QtWidgets import QApplication
from PySide6.QtWidgets import (QMainWindow)
from typing import Optional

class WindowManager:
    _instance = None
    _current_window: Optional[QMainWindow] = None
    
    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
        
    def show_window(self, window: QMainWindow) -> None:
        """Show a new window and make it the current one"""
        window.show()
        if self._current_window is not None:
            self._current_window.bypass_close_check = True
            self._current_window.close()
        self._current_window = window
        
    def has_visible_windows(self) -> bool:
        """Check if there are any visible windows"""
        return self._current_window is not None and not self._current_window.isHidden()