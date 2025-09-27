from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox, QFileDialog
from .base_dialog import BaseTabWidget, SideListTabWidget
from .ui_BmpCharaExc import Ui_BmpCharaExcWidget
from ...core.project import ProjectData
from ...data.files import BmpCharaExcElement
import os

class BmpCharaExcDialog(SideListTabWidget):
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
        super().__init__(project, parent, skip_first=True)
        
        # Set up UI
        self.ui = Ui_BmpCharaExcWidget()
        self.ui.setupUi(self)
        
        # Setup combo box items in correct order
        self.ui.giantCharScaleComboBox.clear()
        for value in sorted(self.SCALE_MODES.keys()):
            self.ui.giantCharScaleComboBox.addItem(self.SCALE_MODES[value], value)
            
        # Initialize list management
        if self.project.bmp_chara_exc:
            self.init_side_list(
                self.ui.bmpList,
                self.ui.bmpLNewButton,
                self.ui.bmpLClearButton,
                self.ui.bmpLCountButton,
                self.project.bmp_chara_exc.data.elements,
                BmpCharaExcElement
            )
        
        # Connect signals
        self._connect_signals()
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        # Element editing
        self.ui.bmpList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        self.ui.nameSameFileCheckBox.clicked.connect(self._on_same_name_changed)
        self.ui.pathBrowseButton.clicked.connect(self._on_browse_path)
        self.ui.giantCharCheckBox.clicked.connect(self._on_giant_char_changed)
        self.ui.giantCharScaleComboBox.currentIndexChanged.connect(self._on_scale_changed)
        
    def _on_selected_element_changed(self, row):
        """Handle selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        element = self.project.bmp_chara_exc.data.elements[self.offset(current_row)]
        self._updating = True
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
        self._updating = False

    def update_form_fields(self):
        """Update form fields after list operations"""
        self._update_element_ui()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        # Limit name to 12 characters
        text = text[:12]
        if text != self.ui.nameLineEdit.text():
            self.ui.nameLineEdit.setText(text)
            return
            
        element = self.project.bmp_chara_exc.data.elements[self.offset(current_row)]
        element.name = text
        self.update_list_item(self.ui.bmpList, current_row, element)
        self.mark_dirty()
        
    def _update_name_from_path(self, current_row: int, element: BmpCharaExcElement):
        """Update element name from its path if same-name is enabled"""
        if element.is_name_same_path and element.path:
            basename = os.path.splitext(os.path.basename(element.path))[0][:12]
            element.name = basename
            self.ui.nameLineEdit.setText(basename)
            self.update_list_item(self.ui.bmpList, current_row, element)
            
    def _on_same_name_changed(self, checked):
        """Handle same name checkbox"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        element = self.project.bmp_chara_exc.data.elements[self.offset(current_row)]
        element.is_name_same_path = 1 if checked else 0
        self.ui.nameLineEdit.setEnabled(not checked)
        
        if checked:
            self._update_name_from_path(current_row, element)
            
        self.mark_dirty()
        
    def _on_browse_path(self):
        """Handle path browse button"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        bmp_dir = os.path.join(self.project.path, "bmp", "chara_sp")
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select BMP File",
            bmp_dir,
            "BMP Files (*.bmp)"
        )
        
        if file_path:
            element = self.project.bmp_chara_exc.data.elements[self.offset(current_row)]
            rel_path = os.path.relpath(file_path, self.project.path)
            element.path = f".\\{rel_path}" if not rel_path.startswith('.\\') else rel_path
            self.ui.pathLineReadOnly.setText(element.path)
            
            self._update_name_from_path(current_row, element)
            self.mark_dirty()
            
    def _on_giant_char_changed(self, checked):
        """Handle giant character checkbox"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        element = self.project.bmp_chara_exc.data.elements[self.offset(current_row)]
        element.is_giant = 1 if checked else 0
        self.ui.giantCharScaleComboBox.setEnabled(checked)
        self.mark_dirty()
        
    def _on_scale_changed(self, index):
        """Handle scale combo box"""
        current_row = self.ui.bmpList.currentRow()
        if current_row < 0 or not self.project.bmp_chara_exc:
            return
            
        element = self.project.bmp_chara_exc.data.elements[self.offset(current_row)]
        element.scale_mode = self.ui.giantCharScaleComboBox.currentData()
        self.mark_dirty()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.bmp_chara_exc.save()