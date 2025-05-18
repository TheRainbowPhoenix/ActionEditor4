from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox, QFileDialog
from .base_dialog import SideListTabDialog
from .ui_Effect import Ui_EffectWidget
from ...core.project import ProjectData
from ...data.files import EffectElement, EffectAnimation
from .animation_list import ListManager, AnimationDialog
import os

class EffectDialog(SideListTabDialog):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent, skip_first=True)
        
        # Set up UI
        self.ui = Ui_EffectWidget()
        self.ui.setupUi(self)
          # Initialize list management
        if self.project.effect:
            self.init_side_list(
                self.ui.effectList,
                self.ui.effectLNewButton,
                self.ui.effectLClearButton,
                self.ui.effectLCountButton,
                self.project.effect.data.elements,
                EffectElement
            )
        
        # Connect signals
        self._connect_signals()

        if self.project.effect:
            # Force initial form update
            if self.ui.effectList.count() > 0:
                self.ui.effectList.setCurrentRow(0)
                self._update_element_ui()
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        # Element editing
        self.ui.effectList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        self.ui.nameSameFileCheckBox.clicked.connect(self._on_same_name_changed)
        self.ui.pathBrowseButton.clicked.connect(self._on_browse_path)
        self.ui.widthSpinBox.valueChanged.connect(self._on_width_changed)
        self.ui.heightSpinBox.valueChanged.connect(self._on_height_changed)
        self.ui.allowGiantCheckBox.clicked.connect(self._on_giant_changed)
          # Setup animation list manager
        self.anim_manager = ListManager(
            self.ui.animationListWidget,
            self.ui.insertAnimButton,
            self.ui.editAnimButton,
            self.ui.deleteAnimButton,
            [],  # Empty list initially
            lambda anim: f"{anim.start}-{anim.end}",
            self._create_animation,
            self._edit_animation,
            self._delete_animation
        )
        
    def _on_selected_element_changed(self, row):
        """Handle selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        self._updating = True
        
        # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        self.ui.nameLineEdit.setEnabled(not element.is_name_same_path)
        self.ui.pathLineReadOnly.setText(element.path)
        self.ui.nameSameFileCheckBox.setChecked(element.is_name_same_path == 1)
        self.ui.widthSpinBox.setValue(element.width)
        self.ui.heightSpinBox.setValue(element.height)
        self.ui.allowGiantCheckBox.setChecked(element.is_giant == 1)
        
        # Update animations list
        self.anim_manager.data_list = element.animations
        self.anim_manager.refresh_list()
        
        self._updating = False
        
    def update_form_fields(self):
        """Update form fields after list operations"""
        self._update_element_ui()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        # Limit name to 12 characters
        text = text[:12]
        if text != self.ui.nameLineEdit.text():
            self.ui.nameLineEdit.setText(text)
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        element.name = text
        self.update_list_item(self.ui.effectList, current_row, element)
        self.mark_dirty()
        
    def _update_name_from_path(self, current_row: int, element: EffectElement):
        """Update element name from its path if same-name is enabled"""
        if element.is_name_same_path and element.path:
            basename = os.path.splitext(os.path.basename(element.path))[0][:12]
            element.name = basename
            self.ui.nameLineEdit.setText(basename)
            self.update_list_item(self.ui.effectList, current_row, element)
            
    def _on_same_name_changed(self, checked):
        """Handle same name checkbox"""
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        element.is_name_same_path = 1 if checked else 0
        self.ui.nameLineEdit.setEnabled(not checked)
        
        if checked:
            self._update_name_from_path(current_row, element)
            
        self.mark_dirty()
        
    def _on_browse_path(self):
        """Handle path browse button"""
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        effects_dir = os.path.join(self.project.path, "image")
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select Effect Image",
            effects_dir,
            "Image Files (*.bmp *.png)"
        )
        
        if file_path:
            element = self.project.effect.data.elements[self.offset(current_row)]
            rel_path = os.path.relpath(file_path, self.project.path)
            element.path = f".\\{rel_path}" if not rel_path.startswith('.\\') else rel_path
            self.ui.pathLineReadOnly.setText(element.path)
            
            self._update_name_from_path(current_row, element)
            self.mark_dirty()
            
    def _on_width_changed(self, value):
        """Handle width change"""
        if self._updating:
            return
            
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        element.width = value
        self.mark_dirty()
        
    def _on_height_changed(self, value):
        """Handle height change"""
        if self._updating:
            return
            
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        element.height = value
        self.mark_dirty()
        
    def _on_giant_changed(self, checked):
        """Handle giant checkbox"""
        if self._updating:
            return
            
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        element.is_giant = 1 if checked else 0
        self.mark_dirty()
        
    def _on_animation_inserted(self, start: int, end: int):
        """Handle animation insert"""
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        anim = EffectAnimation()
        anim.start = start
        anim.end = end
        element.animations.append(anim)
        self.anim_list.set_animations(element.animations)
        self.mark_dirty()
        
    def _on_animation_edit(self, index: int):
        """Handle animation edit"""
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        anim = element.animations[index]
        
        dialog = AnimationDialog(self, anim.start, anim.end)
        if dialog.exec():
            anim.start = dialog.start_value
            anim.end = dialog.end_value
            self.anim_list.set_animations(element.animations)
            self.mark_dirty()
            
    def _on_animation_deleted(self, index: int):
        """Handle animation delete"""
        current_row = self.ui.effectList.currentRow()
        if current_row < 0 or not self.project.effect:
            return
            
        element = self.project.effect.data.elements[self.offset(current_row)]
        del element.animations[index]
        self.anim_list.set_animations(element.animations)
        self.mark_dirty()
        
    def _create_animation(self) -> EffectAnimation:
        """Create new animation via dialog"""
        dialog = AnimationDialog(self)
        if dialog.exec():
            anim = EffectAnimation()
            anim.start = dialog.start_value
            anim.end = dialog.end_value
            self.mark_dirty()
            return anim
        return None
        
    def _edit_animation(self, anim: EffectAnimation):
        """Edit existing animation via dialog"""
        dialog = AnimationDialog(self, anim.start, anim.end)
        if dialog.exec():
            anim.start = dialog.start_value
            anim.end = dialog.end_value
            self.mark_dirty()
            
    def _delete_animation(self, anim: EffectAnimation):
        """Called before animation is deleted"""
        self.mark_dirty()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.effect.save()