from PySide6.QtWidgets import QDialog, QFileDialog, QMessageBox
from pathlib import Path
from typing import Union
import shutil
import os

from ..core.project import Project, ProjectData, ProjectRequirements
from .config import get_config
from ..dialogs.quickstart import QuickStart

class ProjectManager:
    @staticmethod
    def show_project_picker() -> Union[ProjectData, None]:
        """Show project picker and load selected project"""
        project_picker = QuickStart()
        if project_picker.exec() != QDialog.Accepted:
            return None
            
        if project_picker.selected_project is None:
            return None
            
        return ProjectManager.try_load_project(project_picker.selected_project)
        
    @staticmethod
    def try_load_project(path: Union[str, Path]) -> Union[ProjectData, None]:
        """Try to load a project and handle errors"""
        project = Project.try_load(path)
        if project is None:
            return None
            
        # Add to recent projects on successful load
        get_config().add_recent_project(str(project.path))
        return project
        
    @staticmethod
    def save_project_as(project: ProjectData, new_path: Union[str, Path]) -> Union[ProjectData, None]:
        """Save project to a new location"""
        new_path = Path(new_path)
        requirements = ProjectRequirements()
        
        # Create required folders
        for folder in requirements.required_folders:
            folder_path = new_path / folder
            folder_path.mkdir(parents=True, exist_ok=True)
            
        # Copy required files
        for rel_path in requirements.required_files.values():
            src = project.path / rel_path
            if src.exists():
                dst = new_path / rel_path
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)
                
        # Copy optional files that exist
        for rel_path in requirements.optional_files.values():
            src = project.path / rel_path
            if src.exists():
                dst = new_path / rel_path
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)
                
        # Try loading the new project
        return ProjectManager.try_load_project(new_path)