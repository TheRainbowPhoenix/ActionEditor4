from typing import List
from PySide6.QtWidgets import QDialog, QFrame
from PySide6.QtCore import Qt
from PySide6.QtGui import QPainter, QPen, QColor
from .ui_AnimePattern import Ui_AnimePatternDialog
from ....data.files import AnimationFrame
import time

class AnimePatternDialog(QDialog):
    def __init__(self, parent=None, frames=None, basic_mode=False):
        super().__init__(parent)
        self.frames: List[AnimationFrame] = frames or []
        self.basic_mode = basic_mode
        
        # Set up UI
        self.ui = Ui_AnimePatternDialog()
        self.ui.setupUi(self)

        self._setup_ui()
        
        # Connect signals
        self._connect_signals()
        
        # Initial refresh
        self._refresh_list()
    
    def _setup_ui(self):
        """Setup UI controls"""
        self.ui.frameSpinBox.setRange(0, 299)
        self.ui.timeSpinBox.setRange(1, 9999)
        
        # Hide exec command in basic mode
        if self.basic_mode:
            self.ui.execComCheckBox.setEnabled(False)
            # self.ui.execComCheckBox.setVisible(False)
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        self.ui.insertPatButton.clicked.connect(self._on_insert)
        self.ui.deletePatButton.clicked.connect(self._on_delete)
        self.ui.patternsListWidget.currentRowChanged.connect(self._on_selection_changed)
        self.ui.frameSpinBox.valueChanged.connect(self._on_frame_changed)
        self.ui.timeSpinBox.valueChanged.connect(self._on_time_changed)
        self.ui.execComCheckBox.clicked.connect(self._on_exec_changed)
        
    def _refresh_list(self):
        """Refresh patterns list"""
        self.ui.patternsListWidget.clear()
        for frame in self.frames:
            prefix = "Exec " if frame.exec_commands else "" # コマンド実行
            self.ui.patternsListWidget.addItem(f"{prefix}{frame.frame_index}-{frame.display_time}")
                # f"Frame {frame.frame_index} ({frame.display_time/10:.1f}s)")
            
    def _update_frame_ui(self):
        """Update UI with selected frame data"""
        current = self.ui.patternsListWidget.currentRow()
        if current < 0:
            return
            
        frame = self.frames[current]
        self.ui.frameSpinBox.setValue(frame.frame_index)
        self.ui.timeSpinBox.setValue(frame.display_time)
        self.ui.execComCheckBox.setChecked(frame.exec_commands == 1)
        
    def _on_insert(self):
        """Handle insert button"""
        frame = AnimationFrame()
        frame.frame_index = self.ui.frameSpinBox.value()
        frame.display_time = self.ui.timeSpinBox.value()
        frame.exec_commands = 1 if self.ui.execComCheckBox.isChecked() else 0
        
        self.frames.append(frame)
        self._refresh_list()
        self.ui.patternsListWidget.setCurrentRow(len(self.frames) - 1)
        
    def _on_delete(self):
        """Handle delete button"""
        current = self.ui.patternsListWidget.currentRow()
        if current >= 0:
            del self.frames[current]
            self._refresh_list()
            
    def _on_selection_changed(self, row):
        """Handle pattern selection change"""
        if row >= 0:
            self._update_frame_ui()
            
    def _on_frame_changed(self, value):
        """Handle frame index change"""
        current = self.ui.patternsListWidget.currentRow()
        if current >= 0:
            self.frames[current].frame_index = value
            self._refresh_list()
            
    def _on_time_changed(self, value):
        """Handle display time change"""
        current = self.ui.patternsListWidget.currentRow()
        if current >= 0:
            self.frames[current].display_time = value
            self._refresh_list()
            
    def _on_exec_changed(self, checked):
        """Handle execute commands change"""
        current = self.ui.patternsListWidget.currentRow()
        if current >= 0:
            self.frames[current].exec_commands = 1 if checked else 0