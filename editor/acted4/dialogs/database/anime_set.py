from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox, QFrame
from PySide6.QtCore import Qt, QTime
from PySide6.QtGui import QPainter, QPen, QColor
from .base_dialog import BaseTabDialog
from .ui_AnimeSet import Ui_AnimeSetWidget
from ...core.project import ProjectData
from ...data.files import AnimeSetElement, Animation
from enum import Enum, auto
import os
import time

class SampleType(Enum):
    BLOCK = "Block"
    CHARACTER = "Character"
    ITEM = "Item"
    SHOT = "Screenshot"
    DEDICATED = "Dedicated BMP"
    
    @property
    def display_name(self) -> str:
        """Get localized display name"""
        # TODO: Make this translation-ready
        # For now, keep Japanese names for compatibility
        return {
            SampleType.BLOCK: "ブロック",
            SampleType.CHARACTER: "キャラ",
            SampleType.ITEM: "アイテム",
            SampleType.SHOT: "ショット",
            SampleType.DEDICATED: "専用bmp"
        }[self]

class AnimeSetDialog(BaseTabDialog):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent)
        
        # Set up UI
        self.ui = Ui_AnimeSetWidget()
        self.ui.setupUi(self)
        
        # Setup spinboxes ranges
        self.ui.flyingOffSpinBox.setRange(0, 999)
        self.ui.invincibleOffSpinBox.setRange(0, 999)
        self.ui.blockOffSpinBox.setRange(0, 999)
        self.ui.frameStartSpinBox.setRange(0, 239)
        
        # Setup combo box
        self._setup_sample_box()
        
        # Connect signals
        self._connect_signals()
        
        # Load initial data
        self._load_data()
        
        # Initial preview refresh
        self.refresh_preview()
        
    def _setup_sample_box(self):
        """Setup sample combo box"""
        self.ui.sampleComboBox.clear()
        
        # Add all sample types
        for sample_type in SampleType:
            self.ui.sampleComboBox.addItem(sample_type.display_name)
            
        # Update controls for initial selection
        self._update_sample_controls()
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        # List management
        self.ui.animList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.animLNewButton.clicked.connect(self._on_new_element)
        self.ui.animLClearButton.clicked.connect(self._on_clear_element)
        self.ui.animLCountButton.clicked.connect(self._on_set_count)
        
        # Element editing
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        self.ui.flyingOffSpinBox.valueChanged.connect(self._on_flying_offset_changed)
        self.ui.invincibleOffSpinBox.valueChanged.connect(self._on_invincible_offset_changed)
        self.ui.blockOffSpinBox.valueChanged.connect(self._on_block_offset_changed)
        
        # Sample controls
        self.ui.sampleComboBox.currentIndexChanged.connect(self._on_sample_type_changed)
        self.ui.sampleListButton.clicked.connect(self._on_sample_list)
        
        # Pattern list
        self.ui.animPatList.currentRowChanged.connect(self._on_selected_pattern_changed)
        self.ui.animPatList.itemDoubleClicked.connect(self._on_edit_pattern)
        self.ui.animPatButton.clicked.connect(self._on_edit_pattern)
        
        # Preview updates
        self.ui.animList.currentRowChanged.connect(self.refresh_preview)
        self.ui.sampleComboBox.currentIndexChanged.connect(self.refresh_preview)
        self.ui.sampleCountSpinBox.valueChanged.connect(self.refresh_preview)
        self.ui.frameStartSpinBox.valueChanged.connect(self.refresh_preview)
        
    def _load_data(self):
        """Load data from project"""
        if not self.project.anime_set:
            return
        
        # Load animation set list
        self.ui.animList.clear()
        for i, element in enumerate(self.project.anime_set.data.elements):
            self.ui.animList.addItem(f"{i+1} {element.name}")
            
        if self.ui.animList.count() > 0:
            self.ui.animList.setCurrentRow(0)
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.animList.currentRow()
        if current_row < 0 or not self.project.anime_set:
            return
            
        element = self.project.anime_set.data.elements[current_row]
        
        # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        self.ui.flyingOffSpinBox.setValue(element.flying_offset)
        self.ui.invincibleOffSpinBox.setValue(element.invincibility_offset)
        self.ui.blockOffSpinBox.setValue(element.block_offset)
        
        # Update animation patterns
        self.ui.animPatList.clear()
        for anim in element.animations:
            self.ui.animPatList.addItem(f"{anim.animation_name} ~{len(anim.frames)}")
            
    def _update_sample_controls(self):
        """Update sample-related controls based on current selection"""
        current_type = SampleType(list(SampleType)[self.ui.sampleComboBox.currentIndex()].value)
        
        if current_type == SampleType.DEDICATED:
            # Count BMP files for dedicated mode - TODO: should be pulled later from the tab about custom pictures
            chara_sp_dir = os.path.join(self.project.path, "chara_sp")
            if os.path.exists(chara_sp_dir):
                bmp_count = len([f for f in os.listdir(chara_sp_dir) if f.lower().endswith('.bmp')])
                # Add 1 for null/empty image option
                self.ui.sampleCountSpinBox.setValue(bmp_count)
            else:
                self.ui.sampleCountSpinBox.setValue(1)
                
            # self.ui.sampleCountSpinBox.setEnabled(False)
            self.ui.sampleListButton.setEnabled(False)
        else:
            # self.ui.sampleCountSpinBox.setEnabled(True)
            self.ui.sampleListButton.setEnabled(True)

        # Only enable for some ???
        self.ui.frameStartSpinBox.setEnabled(
            current_type in [SampleType.DEDICATED, SampleType.CHARACTER]
        )
            
    def _on_selected_element_changed(self, row):
        """Handle animation set selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _on_new_element(self):
        """Add new animation set element"""
        if not self.project.anime_set:
            return
            
        element = AnimeSetElement()
        self.project.anime_set.data.elements.append(element)
        new_index = len(self.project.anime_set.data.elements)
        self.ui.animList.addItem(f"{new_index} {element.name}")
        self.ui.animList.setCurrentRow(self.ui.animList.count() - 1)
        self.mark_dirty()
        
    def _on_clear_element(self):
        """Reset current element to defaults"""
        current_row = self.ui.animList.currentRow()
        if current_row < 0 or not self.project.anime_set:
            return
            
        element = self.project.anime_set.data.elements[current_row]
        element.flying_offset = 0
        element.block_offset = 8
        element.invincibility_offset = 4
        element.animations.clear()
        
        self._update_element_ui()
        self.mark_dirty()
        
    def _on_set_count(self):
        """Change number of animation set elements"""
        if not self.project.anime_set:
            return
            
        count, ok = QInputDialog.getInt(
            self, 
            "Set Count", 
            "Enter number of animation sets:",
            self.ui.animList.count(),
            1, 999
        )
        
        if not ok:
            return
            
        current_count = len(self.project.anime_set.data.elements)
        if count > current_count:
            # Add new elements
            for i in range(count - current_count):
                self._on_new_element()
        else:
            # Remove elements from end
            self.project.anime_set.data.elements = self.project.anime_set.data.elements[:count]
            while self.ui.animList.count() > count:
                self.ui.animList.takeItem(self.ui.animList.count() - 1)
                
        self.mark_dirty()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.animList.currentRow()
        if current_row < 0 or not self.project.anime_set:
            return
            
        element = self.project.anime_set.data.elements[current_row]
        element.name = text
        self.ui.animList.item(current_row).setText(f"{current_row+1} {text}")
        self.mark_dirty()
        
    def _on_flying_offset_changed(self, value):
        """Handle flying offset change"""
        current_row = self.ui.animList.currentRow()
        if current_row < 0 or not self.project.anime_set:
            return
            
        self.project.anime_set.data.elements[current_row].flying_offset = value
        self.mark_dirty()
        
    def _on_invincible_offset_changed(self, value):
        """Handle invincible offset change"""
        current_row = self.ui.animList.currentRow()
        if current_row < 0 or not self.project.anime_set:
            return
            
        self.project.anime_set.data.elements[current_row].invincibility_offset = value
        self.mark_dirty()
        
    def _on_block_offset_changed(self, value):
        """Handle block offset change"""
        current_row = self.ui.animList.currentRow()
        if current_row < 0 or not self.project.anime_set:
            return
            
        self.project.anime_set.data.elements[current_row].block_offset = value
        self.mark_dirty()
        
    def _on_sample_type_changed(self, index):
        """Handle sample type selection change"""
        self._update_sample_controls()
        
    def _on_sample_list(self):
        """Handle sample list button click"""
        # TODO: Implement tile picker dialog
        QMessageBox.information(self, "Not Implemented", "Tile Picker not yet implemented")
        
    def _on_selected_pattern_changed(self, row):
        """Handle animation pattern selection change"""
        # TODO: Implement when needed
        pass
        
    def _on_edit_pattern(self):
        """Open animation pattern editor"""
        # TODO: Implement animation pattern editor
        QMessageBox.information(self, "Not Implemented", "Animation Pattern Editor not yet implemented")
        
    def refresh_preview(self, *args):
        """Update preview frame with current animation frame"""
        if not hasattr(self.ui, 'previewFrame'):
            return
            
        class PreviewPainter(QFrame):
            def paintEvent(self, event):
                super().paintEvent(event)
                painter = QPainter(self)
                painter.setRenderHint(QPainter.Antialiasing)
                
                # Get frame dimensions
                w = self.width()
                h = self.height()
                
                # Create green pen
                pen = QPen(QColor(0, 255, 0))
                pen.setWidth(2)
                painter.setPen(pen)
                
                # Move line based on time
                offset = int(time.time() * 1000) % w
                
                # Draw diagonal line that moves
                painter.drawLine(offset, 0, (offset + 10) % w, h)
                
        # Replace frame with custom painted frame
        old_frame = self.ui.previewFrame
        new_frame = PreviewPainter(self.ui.widget)
        new_frame.setObjectName(u"previewFrame")
        new_frame.setGeometry(old_frame.geometry())
        new_frame.setAutoFillBackground(False)
        new_frame.setFrameShape(QFrame.Shape.Box)
        new_frame.setFrameShadow(QFrame.Shadow.Plain)
        old_frame.hide()
        new_frame.show()
        self.ui.previewFrame = new_frame
        
        # Force immediate update
        self.ui.previewFrame.update()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        # Changes are already applied to project.anime_set.data
        # Just need to save the file
        return self.project.anime_set.save()