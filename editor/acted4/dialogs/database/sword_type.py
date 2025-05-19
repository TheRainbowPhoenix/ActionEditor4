from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox, QFileDialog
from .base_dialog import SideListTabDialog
from .ui_SwordType import Ui_SwordTypeWidget
from ...core.project import ProjectData
from ...data.files import SwordTypeElement, SwordPosition
from .animation_list import ListManager
from .position_dialog import PositionDialog
import os

class SwordTypeDialog(SideListTabDialog):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent, skip_first=False)
        
        # Set up UI
        self.ui = Ui_SwordTypeWidget()
        self.ui.setupUi(self)
        
        # Initialize list management
        if self.project.sword_type:
            self.init_side_list(
                self.ui.swordTypeList,
                self.ui.swordTypeLNewButton,
                self.ui.swordTypeLClearButton,
                self.ui.swordTypeLCountButton,
                self.project.sword_type.data.elements,
                SwordTypeElement
            )
        
        # Connect signals
        self._connect_signals()

        
        if self.project.sword_type:
            # Force initial form update
            if self.ui.swordTypeList.count() > 0:
                self.ui.swordTypeList.setCurrentRow(0)
                self._update_element_ui()

        
    def _connect_signals(self):
        """Connect UI signals to slots"""        # Element editing
        self.ui.swordTypeList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        self.ui.nameSameFileCheckBox.clicked.connect(self._on_same_name_changed)
        self.ui.leftPathBrowseButton.clicked.connect(lambda: self._on_browse_path('left'))
        self.ui.rightPathBrowseButton.clicked.connect(lambda: self._on_browse_path('right'))
        
        # Position list manager
        self.pos_manager = ListManager(
            self.ui.positionListWidget,
            self.ui.insertPosButton,
            self.ui.editPosButton,
            self.ui.deletePosButton,
            [],  # Empty list initially
            lambda pos: f"{pos.x},{pos.y} [{pos.width}x{pos.height}] {pos.index}",
            self._create_position,
            self._edit_position,
            self._delete_position
        )
        
    def _on_selected_element_changed(self, row):
        """Handle selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.swordTypeList.currentRow()
        if current_row < 0 or not self.project.sword_type:
            return
            
        element = self.project.sword_type.data.elements[self.offset(current_row)]
        self._updating = True
          # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        self.ui.nameLineEdit.setEnabled(not element.is_name_same_path)
        self.ui.nameSameFileCheckBox.setChecked(element.is_name_same_path == 1)
        self.ui.leftPathLineReadOnly.setText(element.path_left)
        self.ui.rightPathLineReadOnly.setText(element.path_right)
        
        # Update positions list
        self.pos_manager.data_list = element.positions
        self.pos_manager.refresh_list()
        
        self._updating = False
        
    def update_form_fields(self):
        """Update form fields after list operations"""
        self._update_element_ui()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.swordTypeList.currentRow()
        if current_row < 0 or not self.project.sword_type:
            return
            
        # Limit name to 12 characters
        text = text[:12]
        if text != self.ui.nameLineEdit.text():
            self.ui.nameLineEdit.setText(text)
            return
            
        element = self.project.sword_type.data.elements[self.offset(current_row)]
        element.name = text
        self.update_list_item(self.ui.swordTypeList, current_row, element)
        self.mark_dirty()
        
    def _on_browse_path(self, side: str):
        """Handle path browse button"""
        current_row = self.ui.swordTypeList.currentRow()
        if current_row < 0 or not self.project.sword_type:
            return
            
        sword_dir = os.path.join(self.project.path, "image")
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            f"Select Sword {side.title()} Image",
            sword_dir,
            "Image Files (*.bmp *.png)"
        )
        
        if file_path:
            element = self.project.sword_type.data.elements[self.offset(current_row)]
            rel_path = os.path.relpath(file_path, self.project.path)
            rel_path = f".\\{rel_path}" if not rel_path.startswith('.\\') else rel_path
            
            if side == 'left':
                element.path_left = rel_path
                self.ui.leftPathLineReadOnly.setText(rel_path)
            else:
                element.path_right = rel_path
                self.ui.rightPathLineReadOnly.setText(rel_path)
            
            if element.is_name_same_path:
                self._update_name_from_path(current_row, element)
            
            self.mark_dirty()
            
    def _update_name_from_path(self, current_row: int, element: SwordTypeElement):
        """Update element name from its path if same-name is enabled"""
        if element.is_name_same_path and (element.path_left or element.path_right):
            # Use left path first, fall back to right path
            path = element.path_left if element.path_left else element.path_right
            basename = os.path.splitext(os.path.basename(path))[0][:12]
            element.name = basename
            self.ui.nameLineEdit.setText(basename)
            self.update_list_item(self.ui.swordTypeList, current_row, element)
            
    def _on_same_name_changed(self, checked):
        """Handle same name checkbox"""
        current_row = self.ui.swordTypeList.currentRow()
        if current_row < 0 or not self.project.sword_type:
            return
            
        element = self.project.sword_type.data.elements[self.offset(current_row)]
        element.is_name_same_path = 1 if checked else 0
        self.ui.nameLineEdit.setEnabled(not checked)
        
        if checked:
            self._update_name_from_path(current_row, element)
            
        self.mark_dirty()
        
    def _create_position(self) -> SwordPosition:
        """Create new position via dialog"""
        dialog = PositionDialog(self)
        if dialog.exec():
            pos = SwordPosition()
            values = dialog.get_values()
            pos.x = values['x']
            pos.y = values['y']
            pos.width = values['width']
            pos.height = values['height']
            pos.index = values.get('index', 1)
            self.mark_dirty()
            return pos
        return None
        
    def _edit_position(self, pos: SwordPosition):
        """Edit existing position via dialog"""
        dialog = PositionDialog(self, pos)
        if dialog.exec():
            values = dialog.get_values()
            pos.x = values['x']
            pos.y = values['y']
            pos.width = values['width']
            pos.height = values['height']
            pos.index = values.get('index', 1)
            self.mark_dirty()
            
    def _delete_position(self, pos: SwordPosition):
        """Called before position is deleted"""
        self.mark_dirty()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.sword_type.save()