from PySide6.QtWidgets import (QDialog, QTabWidget, QDialogButtonBox, 
                              QVBoxLayout, QHBoxLayout, QWidget, QSpacerItem,
                              QSizePolicy)
from PySide6.QtGui import QPalette
from ...core.project import ProjectData
from typing import Dict, Type
from .base_dialog import BaseTabDialog
from .anime_set import AnimeSetDialog
from .bmp_chara_exc import BmpCharaExcDialog
from .picture import PictureDialog
from .sound import SoundDialog
from .chara_effect import CharaEffectDialog
from .effect import EffectDialog
# TODO: Import other dialog classes

class DatabaseDialog(QDialog):
    # Map of tab names to dialog classes
    TAB_DIALOGS = {
        "Anime Set": AnimeSetDialog,
        "Character-Specific BMP": BmpCharaExcDialog,
        "Picture": PictureDialog,
        "Sound": SoundDialog,
        "Character Effect": CharaEffectDialog,
        "Effect": EffectDialog,
        # TODO: Add more, and plugins ??
    }
    
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(parent)
        self.project = project
        self.tabs: Dict[str, BaseTabDialog] = {}
        
        self.setWindowTitle("Database")
        self.resize(600, 500)
        
        # Create layout
        layout = QVBoxLayout(self)
        
        # Create tab widget
        self.tab_widget = QTabWidget()
        # Make tab widget background match dialog background
        self.tab_widget.setAutoFillBackground(True)
        # self.tab_widget.setPalette(self.palette())

        # bg_color = self.palette().color(self.backgroundRole()).name()
        # self.tab_widget.setStyleSheet(
        #     f"QTabWidget::pane {{ background: {bg_color}; }} "
        #     f"QWidget {{ background: {bg_color}; }}"
        # )

        layout.addWidget(self.tab_widget)
        
        # Create button box
        button_layout = QHBoxLayout()
        button_layout.addItem(QSpacerItem(40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        
        self.button_box = QDialogButtonBox()
        self.button_box.setStandardButtons(
            QDialogButtonBox.Ok | QDialogButtonBox.Cancel | QDialogButtonBox.Apply
        )
        button_layout.addWidget(self.button_box)
        layout.addLayout(button_layout)
        
        # Connect signals
        self.button_box.accepted.connect(self.accept)
        self.button_box.rejected.connect(self.reject)
        self.button_box.button(QDialogButtonBox.Apply).clicked.connect(self.apply_changes)
        
        # Create tabs
        self._create_tabs()
        
    def _create_tabs(self):
        """Create all database tabs"""
        for title, dialog_class in self.TAB_DIALOGS.items():
            # TODO: try-catch error to only fail the bad tab, not the whole dialog
            dialog = dialog_class(self.project, self)
            
            # Set background color from dialog palette
            # bg_color = self.palette().color(self.backgroundRole()).name()
            # dialog.setStyleSheet(f"background: {bg_color};")

            self.tabs[title] = dialog
            self.tab_widget.addTab(dialog, title)
            
    def accept(self):
        """Handle OK button"""
        if self.apply_changes():
            super().accept()
            
    def apply_changes(self) -> bool:
        """Apply changes from all tabs"""
        success = True
        for tab in self.tabs.values():
            if tab.is_dirty and not tab.apply_changes():
                success = False
        return success