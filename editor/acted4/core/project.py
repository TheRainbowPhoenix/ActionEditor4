from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Union
from ..data.files import *
from PySide6.QtWidgets import QMessageBox
from .project_status import ProjectStatus, FileStatus
from ..common.message_box import AutoDismissDialog

@dataclass
class ProjectRequirements:
    """Project file requirements configuration"""
    required_folders: List[str] = None
    required_files: Dict[str, str] = None  # name -> relative path
    optional_files: Dict[str, str] = None  # name -> relative path
    
    def __post_init__(self):
        # Default configuration
        if self.required_folders is None:
            self.required_folders = ["data"]
            
        if self.required_files is None:
            self.required_files = {
                "system": "data/System.dat",
                "gval_info": "data/GValInfo.dat"
            }
            
        if self.optional_files is None:
            self.optional_files = {
                "edit_config": "e_data/EditConfig.dat",
                "sheet_size": "e_data/SheetSize.dat",
                "anime_set": "data/database/AnimeSet.dat",
                "anime": "data/database/Anime.dat",
                "bmp_chara_exc": "data/database/Bmp_CharaExc.dat",
                "sword_type": "data/database/SwordType.dat",
                "effect": "data/database/Effect.dat",
                "chara_effect": "data/database/CharaEffect.dat",
                "scr_effect": "data/database/ScrEffect.dat",
                "picture": "data/database/Picture.dat",
                "sound": "data/database/Sound.dat",
                "bgm": "data/database/Bgm.dat",
                "common_palette": "data/CommonPalette.cplt4",
                "prj_option": "data/PrjOption.dat",
                "world_map": "data/WorldMap.dat"
            }

@dataclass
class ProjectData:
    path: Path
    status: ProjectStatus
    system: Union[System, None] = None
    gval_info: Union[GValInfo, None] = None
    anime_set: Union[AnimeSet, None] = None
    anime: Union[Anime,None] = None
    bmp_chara_exc: Union[BmpCharaExc,None] = None
    sword_type: Union[SwordType,None] = None
    effect: Union[Effect,None] = None
    chara_effect: Union[CharaEffect,None] = None
    scr_effect: Union[ScrEffect,None] = None
    picture: Union[Picture,None] = None
    sound: Union[Sound,None] = None
    bgm: Union[Bgm,None] = None
    common_palette: Union[CommonPalette,None] = None
    prj_option: Union[PrjOption,None] = None
    world_map: Union[WorldMap,None] = None
    
    def has_file(self, name: str) -> bool:
        """Check if a file exists and is valid"""
        status = self.status.get_status(name)
        return status is not None and status.is_valid

class Project:
    @staticmethod
    def try_load(path: Union[str,Path]) -> Union[ProjectData,None]:
        path = Path(path)
        requirements = ProjectRequirements()
        status = ProjectStatus()
        
        # Check required folders
        for folder in requirements.required_folders:
            folder_path = path / folder
            if not folder_path.exists():
                QMessageBox.critical(None, "Error", f"Missing required folder: {folder}")
                return None
                
        # Register and check all files
        AutoDismissDialog.show_info("Loading", "Loading project files...")
        
        # Required files
        for name, rel_path in requirements.required_files.items():
            file_path = path / rel_path
            status.register_file(name, file_path)
            if not file_path.exists():
                AutoDismissDialog.dismiss()
                QMessageBox.critical(None, "Error", f"Missing required file: {rel_path}")
                return None
                
        # Optional files
        for name, rel_path in requirements.optional_files.items():
            status.register_file(name, path / rel_path)
            
        # Create initial project data
        project = ProjectData(path=path, status=status)
        
        # Load required files
        system = System(path / requirements.required_files["system"])
        if system.parse():
            status.set_parse_success("system")
            project.system = system
        else:
            status.set_parse_error("system", "Failed to parse System.dat")
            AutoDismissDialog.dismiss()
            QMessageBox.critical(None, "Error", "Failed to parse System.dat")
            return None
            
        gval_info = GValInfo(path / requirements.required_files["gval_info"])
        if gval_info.parse():
            status.set_parse_success("gval_info")
            project.gval_info = gval_info
        else:
            status.set_parse_error("gval_info", "Failed to parse GValInfo.dat")
            AutoDismissDialog.dismiss()
            QMessageBox.critical(None, "Error", "Failed to parse GValInfo.dat")
            return None
            
        # Try loading optional files
        for name, rel_path in requirements.optional_files.items():
            file_path = path / rel_path
            if file_path.exists():
                try:
                    file_class = globals()[name.title().replace('_', '')]
                    file_obj = file_class(file_path)
                    if file_obj.parse():
                        status.set_parse_success(name)
                        setattr(project, name, file_obj)
                    else:
                        status.set_parse_error(name, f"Failed to parse {rel_path}")
                except Exception as e:
                    status.set_parse_error(name, str(e))
                    
        AutoDismissDialog.dismiss()
        return project