from PySide6.QtWidgets import QDialog, QVBoxLayout, QHBoxLayout, QLabel, QSpinBox, QPushButton

class PositionDialog(QDialog):
    def __init__(self, parent=None, pos=None):
        super().__init__(parent)
        self.pos = pos
        self.setWindowTitle("Sword Position")
        self._setup_ui()
        if pos:
            self._load_position()
        
    def _setup_ui(self):
        layout = QVBoxLayout(self)
        
        # Position inputs
        pos_layout = QHBoxLayout()
        pos_layout.addWidget(QLabel("X:"))
        self.x_spin = QSpinBox()
        self.x_spin.setRange(-9999, 9999)
        pos_layout.addWidget(self.x_spin)
        
        pos_layout.addWidget(QLabel("Y:"))
        self.y_spin = QSpinBox()
        self.y_spin.setRange(-9999, 9999)
        pos_layout.addWidget(self.y_spin)
        layout.addLayout(pos_layout)
        
        # Size inputs
        size_layout = QHBoxLayout()
        size_layout.addWidget(QLabel("Width:"))
        self.width_spin = QSpinBox()
        self.width_spin.setRange(0, 9999)
        size_layout.addWidget(self.width_spin)
        
        size_layout.addWidget(QLabel("Height:"))
        self.height_spin = QSpinBox()
        self.height_spin.setRange(0, 9999)
        size_layout.addWidget(self.height_spin)
        layout.addLayout(size_layout)

        
        # Position inputs
        index_layout = QHBoxLayout()
        
        index_layout.addWidget(QLabel("Index:"))
        self.index_spin = QSpinBox()
        self.index_spin.setRange(1, 10)
        index_layout.addWidget(self.index_spin)
        layout.addLayout(index_layout)
        
        # OK/Cancel buttons
        btn_layout = QHBoxLayout()
        ok_btn = QPushButton("OK")
        cancel_btn = QPushButton("Cancel")
        ok_btn.clicked.connect(self.accept)
        cancel_btn.clicked.connect(self.reject)
        btn_layout.addWidget(ok_btn)
        btn_layout.addWidget(cancel_btn)
        layout.addLayout(btn_layout)
        
    def _load_position(self):
        """Load position data into UI"""
        self.x_spin.setValue(self.pos.x)
        self.y_spin.setValue(self.pos.y)
        self.width_spin.setValue(self.pos.width)
        self.height_spin.setValue(self.pos.height)
        self.index_spin.setValue(self.pos.index)
        
    def get_values(self):
        """Get values from UI"""
        return {
            'x': self.x_spin.value(),
            'y': self.y_spin.value(),
            'width': self.width_spin.value(),
            'height': self.height_spin.value(),
            'index': self.index_spin.value()
        }