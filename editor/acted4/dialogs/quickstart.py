from PySide6.QtWidgets import (QDialog, QFileDialog, QMessageBox)
from PySide6.QtCore import Qt
import os

from .ui_QuickStartDialog import Ui_QuickStartDialog
from ..common.config import get_config, RecentFileEntry

class QuickStart(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        
        # Set up the UI
        self.ui = Ui_QuickStartDialog()
        self.ui.setupUi(self)
        
        # Connect signals
        self.ui.newButton.clicked.connect(self.on_new_project)
        self.ui.openButton.clicked.connect(self.on_select_project)
        self.ui.loadProjectButton.clicked.connect(self.on_load_project)
        self.ui.projectsListWidget.itemDoubleClicked.connect(self.on_project_double_clicked)
        
        # Setup context menu
        self.ui.projectsListWidget.addAction(self.ui.actionRemove_project)
        self.ui.projectsListWidget.addAction(self.ui.actionClearProjects)
        self.ui.actionRemove_project.triggered.connect(self.on_remove_project)
        self.ui.actionClearProjects.triggered.connect(self.on_clear_projects)
        
        self.selected_project = None
        
        # Load recent projects
        self.load_recent_projects()

    def on_new_project(self):
        """Create new project"""
        dir_path = QFileDialog.getExistingDirectory(
            self,
            "Select Project Directory",
            "",
            QFileDialog.ShowDirsOnly
        )
        
        if dir_path:
            # For now just treat the selected directory as a project
            self.selected_project = dir_path
            get_config().add_recent_project(dir_path)
            self.accept()
            
    def on_select_project(self):
        """Open existing project"""
        dir_path = QFileDialog.getExistingDirectory(
            self,
            "Select Project Directory",
            "",
            QFileDialog.ShowDirsOnly
        )
        
        if dir_path:
            # Validate project directory
            if self.validate_project_directory(dir_path):
                self.selected_project = dir_path
                get_config().add_recent_project(dir_path)
                self.accept()
            else:
                QMessageBox.critical(self, "Error", "Selected directory is not a valid project")
                
    def validate_project_directory(self, path: str) -> bool:
        """Check if directory contains required project structure"""
        data_dir = os.path.join(path, "data")
        if not os.path.exists(data_dir):
            return False
            
        required_files = ["GValInfo.dat", "System.dat"]
        for file in required_files:
            if not os.path.exists(os.path.join(data_dir, file)):
                return False
                
        return True
        
    def load_recent_projects(self):
        """Load recent projects into list"""
        self.ui.projectsListWidget.clear()
        config = get_config()
        recent_projects = config.get_recent_projects()
        
        for project in recent_projects:
            self.ui.projectsListWidget.addItem(project.path)
            
    def on_load_project(self):
        """Handle load project button"""
        if not self.ui.projectsListWidget.currentItem():
            QMessageBox.warning(self, "Error", "Please select a project from the list")
            return
            
        project_path = self.ui.projectsListWidget.currentItem().text()
        if not os.path.exists(project_path):
            QMessageBox.critical(self, "Error", "Project directory does not exist")
            return
            
        if not self.validate_project_directory(project_path):
            QMessageBox.critical(self, "Error", "Selected directory is not a valid project")
            return
            
        self.selected_project = project_path
        self.accept()
        
    def on_project_double_clicked(self, item):
        """Handle double click on project in list"""
        project_path = item.text()
        if not os.path.exists(project_path):
            QMessageBox.critical(self, "Error", "Project directory does not exist")
            return
            
        if not self.validate_project_directory(project_path):
            QMessageBox.critical(self, "Error", "Selected directory is not a valid project")
            return
            
        self.selected_project = project_path
        self.accept()
        
    def on_remove_project(self):
        """Remove selected project from recent list"""
        item = self.ui.projectsListWidget.currentItem()
        if not item:
            return
            
        config = get_config()
        projects = config.get_recent_projects()
        projects = [p for p in projects if p.path != item.text()]
        config.set_recent_projects(projects)
        self.load_recent_projects()
        
    def on_clear_projects(self):
        """Clear all recent projects"""
        config = get_config()
        config.set_recent_projects([])
        self.load_recent_projects()