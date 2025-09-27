from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox, QFileDialog
from .base_dialog import SideListTabWidget
from .ui_Picture import Ui_PictureWidget
from ...core.project import ProjectData
from ...data.files import PictureElement
import os

class PictureDialog(SideListTabWidget):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent, skip_first=True)
        
        # Set up UI
        self.ui = Ui_PictureWidget()
        self.ui.setupUi(self)
        
        # Initialize list management
        if self.project.picture:
            self.init_side_list(
                self.ui.pictList,
                self.ui.pictLNewButton,
                self.ui.pictLClearButton,
                self.ui.pictLCountButton,
                self.project.picture.data.elements,
                PictureElement
            )
        
        # Connect remaining signals
        self._connect_signals()
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        # Element editing
        self.ui.pictList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        self.ui.nameSameFileCheckBox.clicked.connect(self._on_same_name_changed)
        self.ui.pathBrowseButton.clicked.connect(self._on_browse_path)
        
    def _on_selected_element_changed(self, row):
        """Handle selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.pictList.currentRow()
        if current_row < 0 or not self.project.picture:
            return
            
        element = self.project.picture.data.elements[self.offset(current_row)]
        self._updating = True
        
        # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        self.ui.nameLineEdit.setEnabled(not element.is_name_same_path)
        self.ui.pathLineReadOnly.setText(element.path)
        self.ui.nameSameFileCheckBox.setChecked(element.is_name_same_path == 1)
        self._updating = False
    
    def update_form_fields(self):
        """Update form fields after list operations"""
        self._update_element_ui()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.pictList.currentRow()
        if current_row < 0 or not self.project.picture:
            return
            
        # Limit name to 12 characters
        text = text[:12]
        if text != self.ui.nameLineEdit.text():
            self.ui.nameLineEdit.setText(text)
            return
            
        element = self.project.picture.data.elements[self.offset(current_row)]
        element.name = text
        self.update_list_item(self.ui.pictList, current_row, element)
        self.mark_dirty()
        
    def _update_name_from_path(self, current_row: int, element: PictureElement):
        """Update element name from its path if same-name is enabled"""
        if element.is_name_same_path and element.path:
            basename = os.path.splitext(os.path.basename(element.path))[0][:12]
            element.name = basename
            self.ui.nameLineEdit.setText(basename)
            self.update_list_item(self.ui.pictList, current_row, element)
        
    def _on_same_name_changed(self, checked):
        """Handle same name checkbox"""
        current_row = self.ui.pictList.currentRow()
        if current_row < 0 or not self.project.picture:
            return
            
        element = self.project.picture.data.elements[self.offset(current_row)]
        element.is_name_same_path = 1 if checked else 0
        self.ui.nameLineEdit.setEnabled(not checked)
        
        if checked:
            self._update_name_from_path(current_row, element)
        
        self.mark_dirty()
        
    def _on_browse_path(self):
        """Handle path browse button"""
        current_row = self.ui.pictList.currentRow()
        if current_row < 0 or not self.project.picture:
            return
            
        pictures_dir = os.path.join(self.project.path, "image")
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select Picture File",
            pictures_dir,
            "Picture Files (*.bmp *.png)"
        )
        
        if file_path:
            element = self.project.picture.data.elements[self.offset(current_row)]
            rel_path = os.path.relpath(file_path, self.project.path)
            element.path = f".\\{rel_path}" if not rel_path.startswith('.\\') else rel_path
            self.ui.pathLineReadOnly.setText(element.path)
            
            self._update_name_from_path(current_row, element)
                
            self.mark_dirty()
            
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.picture.save()