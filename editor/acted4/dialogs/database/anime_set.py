from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox
from .base_dialog import BaseTabDialog
from .ui_AnimeSet import Ui_AnimeSetWidget
from ...core.project import ProjectData
from ...data.files import AnimeSetElement, Animation

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
        
        # Connect signals
        self._connect_signals()
        
        # Load initial data
        self._load_data()
        
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
        
        # Pattern list
        self.ui.animPatList.currentRowChanged.connect(self._on_selected_pattern_changed)
        self.ui.animPatButton.clicked.connect(self._on_edit_pattern)
        
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
        
    def _on_selected_pattern_changed(self, row):
        """Handle animation pattern selection change"""
        # TODO: Implement when needed
        pass
        
    def _on_edit_pattern(self):
        """Open animation pattern editor"""
        # TODO: Implement animation pattern editor
        QMessageBox.information(self, "Not Implemented", "Animation Pattern Editor not yet implemented")
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        # Changes are already applied to project.anime_set.data
        # Just need to save the file
        return self.project.anime_set.save()