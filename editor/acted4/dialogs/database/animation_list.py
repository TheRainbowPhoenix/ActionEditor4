from PySide6.QtWidgets import QWidget, QListWidget, QPushButton, QDialog, QVBoxLayout, QHBoxLayout, QLabel, QSpinBox
from typing import List, Callable, Any

class ListManager:
    """Helper class to manage a list widget with insert/edit/delete buttons"""
    def __init__(self, 
                 list_widget: QListWidget,
                 insert_btn: QPushButton,
                 edit_btn: QPushButton,
                 delete_btn: QPushButton,
                 data_list: List[Any],
                 format_item: Callable[[Any], str],
                 on_insert: Callable[[], Any] = None,
                 on_edit: Callable[[Any], None] = None,
                 on_delete: Callable[[Any], None] = None):
        self.list_widget = list_widget
        self.data_list = data_list
        self.format_item = format_item
        self.on_insert = on_insert
        self.on_edit = on_edit
        self.on_delete = on_delete
        
        # Connect signals
        insert_btn.clicked.connect(self._on_insert)
        edit_btn.clicked.connect(self._on_edit)
        delete_btn.clicked.connect(self._on_delete)
        
        # Initial refresh
        self.refresh_list()
        
    def refresh_list(self):
        """Refresh list widget with current data"""
        self.list_widget.clear()
        for item in self.data_list:
            self.list_widget.addItem(self.format_item(item))
            
    def _on_insert(self):
        """Handle insert button"""
        if self.on_insert:
            new_item = self.on_insert()
            if new_item is not None:
                self.data_list.append(new_item)
                self.refresh_list()
                
    def _on_edit(self):
        """Handle edit button"""
        current = self.list_widget.currentRow()
        if current >= 0 and self.on_edit:
            self.on_edit(self.data_list[current])
            self.refresh_list()
            
    def _on_delete(self):
        """Handle delete button"""
        current = self.list_widget.currentRow()
        if current >= 0:
            if self.on_delete:
                self.on_delete(self.data_list[current])
            del self.data_list[current]
            self.refresh_list()

class AnimationDialog(QDialog):
    def __init__(self, parent=None, start=0, end=0):
        super().__init__(parent)
        self.start_value = start
        self.end_value = end
        self._setup_ui()
        
    def _setup_ui(self):
        self.setWindowTitle("Animation")
        layout = QVBoxLayout(self)
        
        # Start/End inputs
        start_layout = QHBoxLayout()
        start_layout.addWidget(QLabel("Start:"))
        self.start_spin = QSpinBox()
        self.start_spin.setRange(0, 9999)
        self.start_spin.setValue(self.start_value)
        start_layout.addWidget(self.start_spin)
        layout.addLayout(start_layout)
        
        end_layout = QHBoxLayout()
        end_layout.addWidget(QLabel("End:"))
        self.end_spin = QSpinBox()
        self.end_spin.setRange(0, 9999)
        self.end_spin.setValue(self.end_value)
        end_layout.addWidget(self.end_spin)
        layout.addLayout(end_layout)
        
        # OK/Cancel buttons
        btn_layout = QHBoxLayout()
        ok_btn = QPushButton("OK")
        cancel_btn = QPushButton("Cancel")
        ok_btn.clicked.connect(self.accept)
        cancel_btn.clicked.connect(self.reject)
        btn_layout.addWidget(ok_btn)
        btn_layout.addWidget(cancel_btn)
        layout.addLayout(btn_layout)
        
    def accept(self):
        self.start_value = self.start_spin.value()
        self.end_value = self.end_spin.value()
        super().accept()