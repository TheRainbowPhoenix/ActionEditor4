from PySide6.QtWidgets import QWidget
from ...core.project import ProjectData

class BaseTabDialog(QWidget):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(parent)
        self.project = project
        self._is_dirty = False
        
    @property
    def is_dirty(self) -> bool:
        """Check if data has been modified"""
        return self._is_dirty
        
    def mark_dirty(self):
        """Mark data as modified"""
        self._is_dirty = True
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        return True
        
    def reset_changes(self):
        """Reset any pending changes"""
        self._is_dirty = False