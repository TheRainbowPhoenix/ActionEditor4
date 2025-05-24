from PySide6.QtWidgets import QWidget, QInputDialog, QMessageBox
from .base_dialog import SideListTabDialog
from .ui_ScrEffect import Ui_ScrEffectWidget
from ...core.project import ProjectData
from ...data.files import ScreenEffectElement
from enum import Enum

class EffectType(Enum):
    MOVE = "Move"  # 移動
    SHAKE_H = "Shake (Horizontal)"  # 振動(横)
    SHAKE_V = "Shake (Vertical)"    # 振動(縦)
    SPLIT_H = "Split (Horizontal)"  # 分割(横)
    SPLIT_V = "Split (Vertical)"    # 分割(縦)
    WAVE_H = "Wave (Horizontal)"    # 波紋(横)
    WAVE_V = "Wave (Vertical)"      # 波紋(縦)
    BLINK = "Blink"  # 点滅
    ROTATE = "Rotate"  # 回転
    CIRCLE = "Circle"
    EXPAND = "Expand" # 拡大
    LENS = "Lens"  # レンズ
    MOSAIC = "Mosaic"  # モザイク

class ScreenEffectDialog(SideListTabDialog):
    # Effect parameters configuration - reusing CharaEffect parameters for now
    EFFECT_PARAMS = {
        EffectType.MOVE: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start X (dot)", 0, True, -640, 640), # TODO: dynamic ??
                ("Start Y (dot)", 0, True, -480, 480),
                ("End X (dot)", 640, True, -640, 640),
                ("End Y (dot)", 0, True, -480, 480)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },

        EffectType.SHAKE_H: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Width (dot)", 4, True, 1, 640),
                ("Amplitude", 4, True, 1, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },
        EffectType.SHAKE_V: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Height (dot)", 4, True, 1, 480),
                ("Amplitude", 4, True, 1, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },

        EffectType.SPLIT_H: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Position (dot)", 0, True, 0, 640),
                ("End Position (dot)", 640, True, 0, 640),
                ("Split Count", 15, True, 2, 240),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },
        EffectType.SPLIT_V: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Position (dot)", 0, True, 0, 480),
                ("End Position (dot)", 480, True, 0, 480),
                ("Split Count", 20, True, 2, 320),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF:"
        },

        EffectType.WAVE_H: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Width (dot)", 0, True, 0, 640),
                ("End Width (dot)", 640, True, 0, 640),
                ("Number of Waves", 4, True, 2, 240),
                ("Wave Roughness (dot)", 8, True, 1, 48)
            ],
            "note": "Direct3D ON:\nDirect3D OFF: Slightly slow"
        },
        EffectType.WAVE_V: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Width (dot)", 0, True, 0, 480),
                ("End Width (dot)", 480, True, 0, 480),
                ("Number of Waves", 4, True, 2, 320),
                ("Wave Roughness (dot)", 10, True, 1, 64)
            ],
            "note": "Direct3D ON:\nDirect3D OFF: Slightly slow"
        },

        EffectType.BLINK: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Blinking Interval (1/60s)", 10, True, 1, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: Fast\nDirect3D OFF: Fast"
        },
        
        EffectType.ROTATE: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Angle", 0, True, 0, 9999),
                ("End Angle", 1440, True, 0, 9999),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: Slightly slower"
        },
        
        EffectType.CIRCLE: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Radius (dot)", 640, True, 0, 640),
                ("End Radius (dot)", 0, True, 0, 640),
                ("Circle Roughness (dot)", 8, True, 1, 48),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: Slightly slow\nDirect3D OFF: Slightly slow"
        },

        EffectType.EXPAND: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Width (dot)", 640, True, 0, 6400),
                ("End Width (dot)", 1280, True, 0, 6400),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON:\nDirect3D OFF: "
        },
        
        EffectType.LENS: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Intensity", 1500, True, 0, 1500),
                ("End Intensity", 5, True, 0, 1500),
                ("Offset X (dot)", 0, True, -320, 320),
                ("Offset Y (dot)", 0, True, -240, 240)
            ],
            "note": "Direct3D ON: Too Slow\nDirect3D OFF: Too Slow"
        },
        
        EffectType.MOSAIC: {
            "params": [
                ("Duration (1/10s)", 10, True, 1, 9999),
                ("Start Intensity", 1, True, 1, 240),
                ("End Intensity", 60, True, 1, 240),
                ("", 0, False, 0, 999),
                ("", 0, False, 0, 999)
            ],
            "note": "Direct3D ON: \nDirect3D OFF: 16-bit → Slow"
        }
    }
    
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent, skip_first=True)
        
        # Set up UI
        self.ui = Ui_ScrEffectWidget()
        self.ui.setupUi(self)
        
        # Setup effect combo box
        self.ui.effectComboBox.clear()
        for effect in EffectType:
            self.ui.effectComboBox.addItem(effect.value)
            
        # Initialize list management
        if self.project.scr_effect:
            self.init_side_list(
                self.ui.scrFxList,
                self.ui.scrFxLNewButton,
                self.ui.scrFxLClearButton,
                self.ui.scrFxLCountButton,
                self.project.scr_effect.data.elements,
                ScreenEffectElement
            )
            
            # Force initial form update
            if self.ui.scrFxList.count() > 0:
                self.ui.scrFxList.setCurrentRow(0)
                self._update_element_ui()
        
        # Connect signals
        self._connect_signals()
        
    def _connect_signals(self):
        """Connect UI signals to slots"""
        # Element editing
        self.ui.scrFxList.currentRowChanged.connect(self._on_selected_element_changed)
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
        current_row = self.ui.scrFxList.currentRow()
        if current_row < 0 or not self.project.scr_effect:
            return
            
        element = self.project.scr_effect.data.elements[self.offset(current_row)]
        self._updating = True
        
        # Update element properties
        self.ui.nameLineEdit.setText(element.name)
        if element.effect > 0:
            self.ui.effectComboBox.setCurrentIndex(element.effect - 1)
        
        # Update parameters
        self.ui.param1SpinBox.setValue(element.param1)
        self.ui.param2SpinBox.setValue(element.param2)
        self.ui.param3SpinBox.setValue(element.param3)
        self.ui.param4SpinBox.setValue(element.param4)
        self.ui.param5SpinBox.setValue(element.param5)
        
        # Update parameter labels - off by one
        if element.effect > 0:
            effect_type = list(EffectType)[element.effect - 1]
            self._update_effect_params(effect_type)
        
        self._updating = False
        
    def update_form_fields(self):
        """Update form fields after list operations"""
        self._update_element_ui()
        
    def _on_name_changed(self, text):
        """Handle name edit"""
        current_row = self.ui.scrFxList.currentRow()
        if current_row < 0 or not self.project.scr_effect:
            return
            
        # Limit name to 12 characters
        text = text[:12]
        if text != self.ui.nameLineEdit.text():
            self.ui.nameLineEdit.setText(text)
            return
            
        element = self.project.scr_effect.data.elements[self.offset(current_row)]
        element.name = text
        self.update_list_item(self.ui.scrFxList, current_row, element)
        self.mark_dirty()
        
    def _on_effect_changed(self, index):
        """Handle effect type change"""
        current_row = self.ui.scrFxList.currentRow()
        if current_row < 0 or not self.project.scr_effect or self._updating:
            return
            
        element = self.project.scr_effect.data.elements[self.offset(current_row)]
        element.effect = index
        
        # Update parameter UI
        if index > 0:
            effect_type = list(EffectType)[index - 1]
            self._update_effect_params(effect_type)
        
        self.mark_dirty()
        
    def _on_param_changed(self, param_index: int, value: int):
        """Handle parameter value change"""
        if self._updating:
            return
            
        current_row = self.ui.scrFxList.currentRow()
        if current_row < 0 or not self.project.scr_effect:
            return
            
        element = self.project.scr_effect.data.elements[self.offset(current_row)]
        setattr(element, f"param{param_index + 1}", value)
        self.mark_dirty()
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        if not self._is_dirty:
            return True
            
        return self.project.scr_effect.save()