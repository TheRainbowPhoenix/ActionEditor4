from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox, QFileDialog
from .base_dialog import BaseTabDialog
from .ui_BmpCharaExc import Ui_BmpCharaExcWidget
from ...core.project import ProjectData
from ...data.files import BmpCharaExcElement
import os

class BmpCharaExcDialog(BaseTabDialog):
    # Scale mode mapping (internal value -> display text)
    SCALE_MODES = {
        2: "x4",
        3: "x9",
        4: "x16",
        5: "x25",
        6: "x36",
        7: "x49",
        8: "x64",
        9: "x81",
        10: "x100"
    }
    
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent)
        
        # Set up UI
        self.ui = Ui_BmpCharaExcWidget()
        self.ui.setupUi(self)
        
        # Setup combo box items in correct order
        self.ui.giantCharScaleComboBox.clear()
        for value in sorted(self.SCALE_MODES.keys()):
            self.ui.giantCharScaleComboBox.addItem(self.SCALE_MODES[value], value)
        
        # Connect signals
        self._connect_signals()
        
        # Load initial data
        self._load_data()
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        # List management
        self.ui.bmpList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.bmpLNewButton.clicked.connect(self._on_new_element)
        self.ui.bmpLClearButton.clicked.connect(self._on_clear_element)
        self.ui.bmpLCountButton.clicked.connect(self._on_set_count)
        
        # Element editing
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        self.ui.nameSameFileCheckBox.clicked.connect(self._on_same_name_changed)
        self.ui.pathBrowseButton.clicked.connect(self._on_browse_path)
        self.ui.giantCharCheckBox.clicked.connect(self._on_giant_char_changed)
        self.ui.giantCharScaleComboBox.currentIndexChanged.connect(self._on_scale_changed)
        
    def _load_data(self):
        """Load data from project"""
        if not self.project.bmp_chara_exc:
            return
              # Load BMP list
        self.ui.bmpList.clear()
        for i, element in enumerate(self.project.bmp_chara_exc.data.elements):
            # if i == 0 and not element.name and not element.path:
            #     continue
            self.ui.bmpList.addItem(f"{i} {element.name}")
            
        if self.ui.bmpList.count() > 0:
            self.ui.bmpList.setCurrentRow(0)
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.bmpList.currentRow()
        # if current_row < 0 or not self.project.bmp_chara_exc:
        #     return
            
        element = self.project.bmp_chara_exc.data.elements[current_row]
        
        # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        self.ui.nameLineEdit.setEnabled(not element.is_name_same_path)
        self.ui.pathLineReadOnly.setText(element.path)
        self.ui.nameSameFileCheckBox.setChecked(element.is_name_same_path == 1)
        self.ui.giantCharCheckBox.setChecked(element.is_giant == 1)
        self.ui.giantCharScaleComboBox.setEnabled(element.is_giant == 1)
        
        # Find combo box index for scale mode value
        scale_index = self.ui.giantCharScaleComboBox.findData(element.scale_mode)
        if scale_index == -1:  # Not found, use default x4
            scale_index = self.ui.giantCharScaleComboBox.findData(2)
        self.ui.giantCharScaleComboBox.setCurrentIndex(scale_index)
        
    def _on_selected_element_changed(self, row):
        """Handle BMP set selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _on_new_element(self):
        """Add new BMP element"""
        if not self.project.bmp_chara_exc:
            return
            
        element = BmpCharaExcElement()
        self.project.bmp_chara_exc.data.elements.append(element)
        new_index = len(self.project.bmp_chara_exc.data.elements)
        self.ui.bmpList.addItem(f"{new_index} {element.name}")
        self.ui.bmpList.setCurrentRow(self.ui.bmpList.count() - 1)
        self.mark_dirty()
        
    def _on_clear_element(self):
        """Reset current element to defaults"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        element = self.project.bmp_chara_exc.data.elements[current_row]
        element.name = ""
        element.path = ""
        element.is_name_same_path = 0
        element.is_giant = 0
        element.scale_mode = 1
        
        self._update_element_ui()
        self.mark_dirty()
        
    def _on_set_count(self):
        """Change number of BMP elements"""
        if not self.project.bmp_chara_exc:
            return
            
        count, ok = QInputDialog.getInt(
            self, 
            "Set Count", 
            "Enter number of BMP entries:",
            self.ui.bmpList.count(),
            1, 999
        )
        
        if not ok:
            return
            
        current_count = len(self.project.bmp_chara_exc.data.elements)
        if count > current_count:
            # Add new elements
            for i in range(count - current_count):
                self._on_new_element()
        else:
            # Remove elements from end
            self.project.bmp_chara_exc.data.elements = self.project.bmp_chara_exc.data.elements[:count]
            while self.ui.bmpList.count() > count:
                self.ui.bmpList.takeItem(self.ui.bmpList.count() - 1)
                
        self.mark_dirty()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        element = self.project.bmp_chara_exc.data.elements[current_row]
        element.name = text
        self.ui.bmpList.item(current_row).setText(f"{current_row} {text}")
        self.mark_dirty()
        
    def _on_same_name_changed(self, checked):
        """Handle same name checkbox"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        element = self.project.bmp_chara_exc.data.elements[current_row]
        element.is_name_same_path = 1 if checked else 0
        self.ui.nameLineEdit.setEnabled(not checked)
        self.mark_dirty()
        
    def _on_browse_path(self):
        """Handle path browse button"""
        current_row = self.ui.bmpList.currentRow()
        # if current_row < 0 or not self.project.bmp_chara_exc:
        #     return
            
        bmp_dir = os.path.join(self.project.path, "bmp", "chara_sp")
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select BMP File",
            bmp_dir,
            "BMP Files (*.bmp)"
        )
        
        if file_path:
            element = self.project.bmp_chara_exc.data.elements[current_row]
            rel_path = os.path.relpath(file_path, self.project.path)
            element.path = f".\\{rel_path}" if not rel_path.startswith('.\\') else rel_path
            self.ui.pathLineReadOnly.setText(element.path)
            self.mark_dirty()
            
    def _on_giant_char_changed(self, checked):
        """Handle giant character checkbox"""
        current_row = self.ui.bmpList.currentRow()
        # if current_row < 0 or not self.project.bmp_chara_exc:
        #     return
            
        element = self.project.bmp_chara_exc.data.elements[current_row]
        element.is_giant = 1 if checked else 0
        self.ui.giantCharScaleComboBox.setEnabled(checked)
        self.mark_dirty()
        
    def _on_scale_changed(self, index):
        """Handle scale combo box"""
        current_row = self.ui.bmpList.currentRow()
        # if current_row < 0 or not self.project.bmp_chara_exc:
        #     return
            
        element = self.project.bmp_chara_exc.data.elements[current_row]
        element.scale_mode = self.ui.giantCharScaleComboBox.currentData()
        self.mark_dirty()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.bmp_chara_exc.save()