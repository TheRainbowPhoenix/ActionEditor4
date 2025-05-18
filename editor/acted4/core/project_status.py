from dataclasses import dataclass
from enum import Enum, auto
from typing import Dict, List, Union
from pathlib import Path

class FileStatus(Enum):
    NOT_FOUND = auto()
    FOUND = auto()
    PARSE_ERROR = auto()
    PARSED = auto()

@dataclass
class FileInfo:
    path: Path
    status: FileStatus
    error_message: Union[str, None] = None
    
    @property
    def exists(self) -> bool:
        return self.status in (FileStatus.FOUND, FileStatus.PARSED)
        
    @property
    def is_valid(self) -> bool:
        return self.status == FileStatus.PARSED

class ProjectStatus:
    def __init__(self):
        self.files: Dict[str, FileInfo] = {}
        
    def register_file(self, name: str, path: Path) -> None:
        """Register a file to track"""
        status = FileStatus.FOUND if path.exists() else FileStatus.NOT_FOUND
        self.files[name] = FileInfo(path, status)
        
    def set_parse_success(self, name: str) -> None:
        """Mark file as successfully parsed"""
        if name in self.files:
            self.files[name].status = FileStatus.PARSED
            
    def set_parse_error(self, name: str, error: str) -> None:
        """Mark file as failed to parse with error"""
        if name in self.files:
            self.files[name].status = FileStatus.PARSE_ERROR
            self.files[name].error_message = error
            
    def get_status(self, name: str) -> Union[FileInfo, None]:
        """Get status of a file"""
        return self.files.get(name)
        
    def check_required_files(self, required: List[str]) -> bool:
        """Check if all required files are parsed successfully"""
        return all(
            name in self.files and self.files[name].is_valid
            for name in required
        )