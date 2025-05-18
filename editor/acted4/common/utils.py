import os
from PySide6 import QtUiTools
from PySide6.QtCore import QFile, QIODevice

def load_ui(ui_file_path: str, parent=None):
    ui_file = QFile(ui_file_path)
    if not ui_file.open(QIODevice.ReadOnly):
        raise RuntimeError(f"Cannot open {ui_file_path}: {ui_file.errorString()}")
    
    loader = QtUiTools.QUiLoader()
    ui = loader.load(ui_file, parent)
    ui_file.close()
    return ui