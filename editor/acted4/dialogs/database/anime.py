from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox, QFrame
from PySide6.QtCore import Qt
from PySide6.QtGui import QPainter, QPen, QColor
from .base_dialog import SideListTabWidget
from .ui_Anime import Ui_AnimeWidget
from .dlg.anime_pattern import AnimePatternDialog
from ...core.project import ProjectData
from ...data.files import Animation
from .anime_set import SampleType
import time
import os

class AnimeDialog(SideListTabWidget):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent, skip_first=True)
        
        # Set up UI
        self.ui = Ui_AnimeWidget()
        self.ui.setupUi(self)
        
        # Initialize list management
        if self.project.anime:
            self.init_side_list(
                self.ui.animeList,
                self.ui.animeLNewButton,
                self.ui.animeLClearButton,
                self.ui.animeLCountButton,
                self.project.anime.data.elements,
                Animation
            )
        
        # Setup sample types combo
        self._setup_sample_box()
        
        # Connect signals
        self._connect_signals()
            
        if self.project.anime:
            # Force initial form update
            if self.ui.animeList.count() > 0:
                self.ui.animeList.setCurrentRow(0)
                self._update_element_ui()
        
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
        # Element editing
        self.ui.animeList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        
        # Sample controls
        self.ui.sampleComboBox.currentIndexChanged.connect(self._on_sample_type_changed)
        self.ui.sampleCountSpinBox.valueChanged.connect(self._on_sample_count_changed)
        self.ui.sampleListButton.clicked.connect(self._on_sample_list)
        self.ui.frameStartSpinBox.valueChanged.connect(self._on_frame_start_changed)
        
        # Pattern editing
        self.ui.animPatButton.clicked.connect(self._on_edit_pattern)
        
    def _on_selected_element_changed(self, row):
        """Handle animation selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.animeList.currentRow()
        if current_row < 0 or not self.project.anime:
            return
            
        element = self.project.anime.data.elements[self.offset(current_row)]
        self._updating = True
        
        # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        self.ui.sampleComboBox.setCurrentIndex(element.sample_type)
        self.ui.sampleCountSpinBox.setValue(element.sample_list_index)
        self.ui.frameStartSpinBox.setValue(element.frame_start)

        self.ui.frameStartSpinBox.setEnabled(
            SampleType(list(SampleType)[element.sample_type].value) in [SampleType.DEDICATED, SampleType.CHARACTER]
        )
        
        self._updating = False
        
    def update_form_fields(self):
        """Update form fields after list operations"""
        self._update_element_ui()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.animeList.currentRow()
        if current_row < 0 or not self.project.anime:
            return
        
        # Limit name to 12 characters
        text = text[:12]
        if text != self.ui.nameLineEdit.text():
            self.ui.nameLineEdit.setText(text)
            return
            
        element = self.project.anime.data.elements[self.offset(current_row)]
        element.name = text
        self.update_list_item(self.ui.animeList, current_row, element)
        self.mark_dirty()
        
    def _update_sample_controls(self):
        """Update sample-related controls based on current selection"""
        current_type = SampleType(list(SampleType)[self.ui.sampleComboBox.currentIndex()].value)
        
        if current_type == SampleType.DEDICATED:
            # Count BMP files for dedicated mode
            chara_sp_dir = os.path.join(self.project.path, "chara_sp")
            if os.path.exists(chara_sp_dir):
                bmp_count = len([f for f in os.listdir(chara_sp_dir) if f.lower().endswith('.bmp')])
                self.ui.sampleCountSpinBox.setValue(bmp_count)
            else:
                self.ui.sampleCountSpinBox.setValue(1)
                
        self.ui.frameStartSpinBox.setEnabled(
            current_type in [SampleType.DEDICATED, SampleType.CHARACTER]
        )
            
    def _on_sample_type_changed(self, index):
        """Handle sample type selection change"""
        current_row = self.ui.animeList.currentRow()
        if current_row < 0 or not self.project.anime or self._updating:
            return
            
        element = self.project.anime.data.elements[self.offset(current_row)]
        element.sample_type = index
        self._update_sample_controls()
        self.mark_dirty()
        
    def _on_sample_count_changed(self, value):
        """Handle sample count change"""
        current_row = self.ui.animeList.currentRow()
        if current_row < 0 or not self.project.anime or self._updating:
            return
            
        element = self.project.anime.data.elements[self.offset(current_row)]
        element.sample_type = value
        self.mark_dirty()
        
    def _on_sample_list(self):
        """Handle sample list button click"""
        # TODO: Implement tile picker dialog
        QMessageBox.information(self, "Not Implemented", "Tile Picker not yet implemented")
        
    def _on_frame_start_changed(self, value):
        """Handle frame start change"""
        current_row = self.ui.animeList.currentRow()
        if current_row < 0 or not self.project.anime or self._updating:
            return
            
        element = self.project.anime.data.elements[self.offset(current_row)]
        element.frame_start = value
        self.mark_dirty()
        
    def _on_edit_pattern(self):
        """Open animation pattern editor"""
        current_row = self.ui.animeList.currentRow()
        if current_row < 0 or not self.project.anime:
            return
            
        element = self.project.anime.data.elements[self.offset(current_row)]
        dialog = AnimePatternDialog(self, element.frames)
        if dialog.exec():
            # Animation frames are updated by reference
            self.mark_dirty()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.anime.save()