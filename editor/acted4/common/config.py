from PySide6.QtCore import QSettings
from dataclasses import dataclass
from typing import List
from pathlib import Path

@dataclass
class RecentFileEntry:
    io_mode: str
    path: str

    def __eq__(self, other):
        if isinstance(other, RecentFileEntry):
            # Normalize paths before comparison
            my_path = Path(self.path).as_posix()
            other_path = Path(other.path).as_posix() if isinstance(other, RecentFileEntry) else None
            return my_path == other_path
        return False

class Configuration:
    def __init__(self):
        self.settings = QSettings("PC", "ActionEditor")

    def _normalize_path(self, path: str) -> str:
        """Normalize path separators to system default"""
        return str(Path(path))

    def get_recent_projects(self) -> List[RecentFileEntry]:
        """Get list of recent projects"""
        recent_projects = []
        projects_list = self.settings.value("recentProjectsList", [])
        
        seen_paths = set()
        for project in projects_list:
            normalized_path = self._normalize_path(project)
            if normalized_path not in seen_paths:
                seen_paths.add(normalized_path)
                recent_projects.append(RecentFileEntry("", normalized_path))
        return recent_projects

    def set_recent_projects(self, projects: List[RecentFileEntry]):
        """Set list of recent projects"""
        paths = [self._normalize_path(project.path) for project in projects]
        self.settings.setValue("recentProjectsList", paths)

    def add_recent_project(self, file_path: str):
        """Add a project to recent list"""
        normalized_path = self._normalize_path(file_path)
        project = RecentFileEntry("", normalized_path)
        projects = self.get_recent_projects()
        
        # Remove if already exists
        if project in projects:
            projects.remove(project)
            
        # Add to start of list
        projects.insert(0, project)
        
        # Keep only last 10 entries
        projects = projects[:10]
        
        self.set_recent_projects(projects)

# Global configuration instance
_config = None

def get_config() -> Configuration:
    global _config
    if _config is None:
        _config = Configuration()
    return _config