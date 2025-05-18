from PySide6.QtWidgets import QMessageBox
from PySide6.QtCore import Qt, QTimer

class AutoDismissDialog:
    _current_box: QMessageBox = None
    
    @classmethod
    def show_info(cls, title: str, message: str) -> None:
        """Show auto-dismissing info message"""
        if cls._current_box is not None:
            cls._current_box.close()
            
        box = QMessageBox()
        cls._current_box = box
        
        box.setWindowTitle(title)
        box.setText(message)
        box.setIcon(QMessageBox.Information)
        box.setWindowFlags(Qt.Dialog | Qt.CustomizeWindowHint | Qt.WindowTitleHint)
        box.show()
        
    @classmethod
    def dismiss(cls) -> None:
        """Dismiss current message if any"""
        if cls._current_box is not None:
            cls._current_box.close()
            cls._current_box = None