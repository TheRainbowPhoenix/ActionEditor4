from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox
from .base_dialog import SideListTabWidget
from .ui_CharaEffect import Ui_CharaEffectWidget
from ...core.project import ProjectData
from ...data.files import CharaEffectElement
from enum import Enum

class EffectType(Enum):
    BURST = "Burst"
    SPLIT_H = "Split (Horizontal)"
    SPLIT_V = "Split (Vertical)"
    WAVE_H = "Wave (Horizontal)"
    WAVE_V = "Wave (Vertical)"
    WAVE_POINT = "Wave Point"
    ROTATE_A = "Rotate A"
    ROTATE_B = "Rotate B"
    ROTATE_DEPTH = "Rotate (Depth)"
    CIRCLE = "Circle"
    EXPAND = "Expand"
    NOISE = "Noise"
    # CHANGE = "Change"
    COLOR_CHANGE = "Color Change"
    # TRANSPARENCY = "Transparency"
    SEMI_TRANSPARENCY = "Semi-Transparency"
    MOSAIC = "Mosaic"
    BLUR = "Blur"

class CharaEffectDialog(SideListTabWidget):
    # Effect parameters configuration
    EFFECT_PARAMS = {
        EffectType.BURST: {
            "params": [
                ("Duration (1/10s)", 5, True, 1, 9999),
                ("Start Position (dot)", 0, True, 0, 999),
                ("End Position (dot)", 32, True, 0, 999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },
        EffectType.SPLIT_H: {
            "params": [
                ("Duration (1/10s)", 5, True, 1, 9999),
                ("Start Position (dot)", 0, True, 0, 999),
                ("End Position (dot)", 32, True, 0, 999),
                ("Split Count", 4, True, 2, 16),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },
        EffectType.SPLIT_V: {
            "params": [
                ("Duration (1/10s)", 5, True, 1, 9999),
                ("Start Position (dot)", 0, True, 0, 999),
                ("End Position (dot)", 32, True, 0, 999),
                ("Split Count", 4, True, 2, 16),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },
        EffectType.WAVE_H: {
            "params": [
                ("Duration (1/10s)", 5, True, 1, 9999),
                ("Start Width (dot)", 0, True, 0, 999),
                ("End Width (dot)", 32, True, 0, 999),
                ("Number of Waves", 2, True, 2, 16),
                ("Wave Roughness (dot)", 2, True, 1, 4)
            ],
            "note": "Direct3D ON:\nDirect3D OFF: Slightly slow"
        },
        EffectType.WAVE_V: {
            "params": [
                ("Duration (1/10s)", 5, True, 1, 9999),
                ("Start Width (dot)", 0, True, 0, 999),
                ("End Width (dot)", 32, True, 0, 999),
                ("Number of Waves", 2, True, 2, 16),
                ("Wave Roughness (dot)", 2, True, 1, 4)
            ],
            "note": "Direct3D ON:\nDirect3D OFF: Slightly slow"
        },
        EffectType.WAVE_POINT: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Blinking Interval (1/60s)", 2, True, 1, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: Fast\nDirect3D OFF: Fast"
        },
        EffectType.ROTATE_A: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Angle", 0, True, 0, 9999),
                ("End Angle", 1440, True, 0, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: Rotation A and B are the same\nDirect3D OFF: Giant prioritize execution"
        },
        EffectType.ROTATE_B: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Angle", 0, True, 0, 9999),
                ("End Angle", 1440, True, 0, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: Rotation A and B are the same\nDirect3D OFF: Slightly slower, Giant prioritize accuracy"
        },
        EffectType.ROTATE_DEPTH: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Position (dot)", 0, True, 0, 9999),
                ("End Position (dot)", 256, True, 0, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: "
        },
        EffectType.CIRCLE: {
            "params": [
                ("Duration (1/10s)", 5, True, 1, 9999),
                ("Start Radius (dot)", 32, True, 0, 32),
                ("End Radius (dot)", 0, True, 0, 32),
                ("Circle Roughness (dot)", 2, True, 1, 4),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: Slightly slow"
        },
        EffectType.EXPAND: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Width (dot)", 32, True, 0, 320),
                ("End Width (dot)", 64, True, 0, 320),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF: "
        },
        EffectType.NOISE: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Distance", 100, True, 0, 100),
                ("End Distance", 5, True, 0, 100),
                ("X Offset (dot)", 0, True, 0, 16),
                ("Y Offset (dot)", 0, True, 0, 16)
            ],
            "note": "Direct3D ON: Too slow\nDirect3D OFF: Slow"
        },
        EffectType.COLOR_CHANGE: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Opacity", 1, True, 1, 4),
                ("End Opacity", 1, True, 1, 4),
                ("Color", 16, True, 16, 207),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: 8-bit → Low precision, 16-bit → Slightly slow"
        },
        EffectType.SEMI_TRANSPARENCY: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Blinking Interval (1/60s)", 9999, True, 1, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: 8-bit → Low precision, 16-bit → Very slow"
        },
        EffectType.MOSAIC: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Intensity", 1, True, 1, 16),
                ("End Intensity", 8, True, 1, 16),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: 16-bit → Slow"
        },
        EffectType.BLUR: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Intensity", 1, True, 1, 4),
                ("End Intensity", 4, True, 1, 4),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: Only on 16-bit or more. Slow"
        }
        # TODO: Add other effects configuration
    }
    
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent, skip_first=True)
        
        # Set up UI
        self.ui = Ui_CharaEffectWidget()
        self.ui.setupUi(self)
        
        # Setup effect combo box
        self.ui.effectComboBox.clear()
        for effect in EffectType:
            self.ui.effectComboBox.addItem(effect.value)
            
        # Initialize list management
        if self.project.chara_effect:
            self.init_side_list(
                self.ui.charaFxList,
                self.ui.charaFxLNewButton,
                self.ui.charaFxLClearButton,
                self.ui.charaFxLCountButton,
                self.project.chara_effect.data.elements,
                CharaEffectElement
            )
            # Force initial form update
            if self.ui.charaFxList.count() > 0:
                self.ui.charaFxList.setCurrentRow(0)
                self._update_element_ui()
        
        # Connect signals
        self._connect_signals()
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        # Element editing
        self.ui.charaFxList.currentRowChanged.connect(self._on_selected_element_changed)
        self.ui.nameLineEdit.textChanged.connect(self._on_name_changed)
        self.ui.effectComboBox.currentIndexChanged.connect(self._on_effect_changed)
        
        # Parameters
        self.ui.param1SpinBox.valueChanged.connect(lambda v: self._on_param_changed(0, v))
        self.ui.param2SpinBox.valueChanged.connect(lambda v: self._on_param_changed(1, v))
        self.ui.param3SpinBox.valueChanged.connect(lambda v: self._on_param_changed(2, v))
        self.ui.param4SpinBox.valueChanged.connect(lambda v: self._on_param_changed(3, v))
        self.ui.param5SpinBox.valueChanged.connect(lambda v: self._on_param_changed(4, v))
        
    def _update_effect_params(self, effect_type: EffectType):
        """Update parameter labels and spinboxes for selected effect"""
        config = self.EFFECT_PARAMS.get(effect_type)
        if not config:
            return
            
        param_labels = [self.ui.param1Label, self.ui.param2Label, self.ui.param3Label, 
                       self.ui.param4Label, self.ui.param5Label]
        param_spinboxes = [self.ui.param1SpinBox, self.ui.param2SpinBox, self.ui.param3SpinBox,
                          self.ui.param4SpinBox, self.ui.param5SpinBox]
                          
        for i, (label, default, enabled, min_val, max_val) in enumerate(config["params"]):
            param_labels[i].setText(label if label is not None else f"param {effect_type.value} {i+1}")
            param_spinboxes[i].setMinimum(min_val)
            param_spinboxes[i].setMaximum(max_val)
            param_spinboxes[i].setValue(default)
            param_spinboxes[i].setEnabled(enabled)
        
        self.ui.labelNote.setText(config.get("note", ""))
            
    def _on_selected_element_changed(self, row):
        """Handle selection change"""
        if row >= 0:
            self._update_element_ui()
            
    def _update_element_ui(self):
        """Update UI with selected element data"""
        current_row = self.ui.charaFxList.currentRow()
        if current_row < 0 or not self.project.chara_effect:
            return
            
        element = self.project.chara_effect.data.elements[self.offset(current_row)]
        self._updating = True
        
        # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        self.ui.effectComboBox.setCurrentIndex(element.effect)
        
        # Update parameters
        self.ui.param1SpinBox.setValue(element.param1)
        self.ui.param2SpinBox.setValue(element.param2)
        self.ui.param3SpinBox.setValue(element.param3)
        self.ui.param4SpinBox.setValue(element.param4)
        self.ui.param5SpinBox.setValue(element.param5)
        
        # Update parameter labels
        effect_type = list(EffectType)[element.effect]
        self._update_effect_params(effect_type)
        
        self._updating = False
        
    def update_form_fields(self):
        """Update form fields after list operations"""
        self._update_element_ui()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.charaFxList.currentRow()
        if current_row < 0 or not self.project.chara_effect:
            return
            
        # Limit name to 12 characters
        text = text[:12]
        if text != self.ui.nameLineEdit.text():
            self.ui.nameLineEdit.setText(text)
            return
            
        element = self.project.chara_effect.data.elements[self.offset(current_row)]
        element.name = text
        self.update_list_item(self.ui.charaFxList, current_row, element)
        self.mark_dirty()
        
    def _on_effect_changed(self, index):
        """Handle effect type change"""
        current_row = self.ui.charaFxList.currentRow()
        if current_row < 0 or not self.project.chara_effect or self._updating:
            return
            
        element = self.project.chara_effect.data.elements[self.offset(current_row)]
        element.effect = index
        
        # Update parameter UI
        effect_type = list(EffectType)[index]
        self._update_effect_params(effect_type)
        
        self.mark_dirty()
        
    def _on_param_changed(self, param_index: int, value: int):
        """Handle parameter value change"""
        if self._updating:
            return
            
        current_row = self.ui.charaFxList.currentRow()
        if current_row < 0 or not self.project.chara_effect:
            return
            
        element = self.project.chara_effect.data.elements[self.offset(current_row)]
        setattr(element, f"param{param_index + 1}", value)
        self.mark_dirty()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.chara_effect.save()