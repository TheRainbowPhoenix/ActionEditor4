from PySide6.QtCore import QSettings
from PySide6.QtWidgets import QApplication, QStyle, QStyleFactory
import os

class ThemeManager:
    def __init__(self):
        self.settings = QSettings("PC", "ActionEditor")
        self.themes_path = os.path.join(os.path.dirname(__file__), "..", "resources", "themes")
        
    def apply_theme(self, theme_name: str):
        # Set Fusion style as base
        app = QApplication.instance()
        # app.setStyle(QStyleFactory.create("Fusion"))
        
        # Apply theme stylesheet
        theme_file = os.path.join(self.themes_path, theme_name, "style.qss")
        if not os.path.exists(theme_file):
            return False
            
        with open(theme_file, "r") as f:
            stylesheet = f.read()
            
        app.setStyleSheet(stylesheet)
        self.settings.setValue("theme", theme_name)
        return True