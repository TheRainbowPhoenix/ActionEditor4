from PySide6.QtWidgets import (QMainWindow, QDockWidget, QToolBar, QMenuBar,
                              QStatusBar, QMessageBox, QMenu, QFileDialog)
from PySide6.QtCore import Qt, QSettings
from PySide6.QtGui import QAction, QActionGroup
import os
from typing import Union

from .ui_MainWindow import Ui_MainWindow
from .project import ProjectData
from ..common.project_manager import ProjectManager
from ..common.window_manager import WindowManager
from ..common.app_state import AppStateManager, PaletteMode

class MainWindow(QMainWindow):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(parent)
        
        self.project = project
        self.bypass_close_check = False
        
        # Set up the UI
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        
        # Setup palette mode actions
        self.setup_palette_mode_actions()
        
        # Store dock widgets
        self.dockWidgets = []
        
        # Initialize UI elements
        self.init_docks()
        self.read_settings()
        self.setup_recent_stages_menu()
        
        # Connect actions from UI
        self.connect_actions()
        
        # Update window title with project path
        self.setWindowTitle(f"Action Editor 4 - {self.project.path}")
        
    def setup_recent_stages_menu(self):
        """Setup recent stages menu with dynamic entries"""
        self.recent_stages_menu = self.ui.menuRecentStages
        self.recent_stages_menu.aboutToShow.connect(self.update_recent_stages_menu)
        
    def update_recent_stages_menu(self):
        """Update recent stages menu entries"""
        self.recent_stages_menu.clear()
        settings = QSettings('PC', 'ActionEditor')
        recent_stages = settings.value('recentStages', [])
        
        for stage in recent_stages:
            action = QAction(stage, self)
            action.triggered.connect(lambda checked, s=stage: self.open_recent_stage(s))
            self.recent_stages_menu.addAction(action)
            
        if recent_stages:
            self.recent_stages_menu.addSeparator()
        self.recent_stages_menu.addAction('Clear Recent', self.clear_recent_stages)
        
    def add_recent_stage(self, stage_path):
        """Add a stage to recent stages list"""
        settings = QSettings('PC', 'ActionEditor')
        recent_stages = settings.value('recentStages', [])
        
        if stage_path in recent_stages:
            recent_stages.remove(stage_path)
        recent_stages.insert(0, stage_path)
        
        # Keep only last 10 entries
        recent_stages = recent_stages[:10]
        settings.setValue('recentStages', recent_stages)
        
    def clear_recent_stages(self):
        """Clear the recent stages list"""
        settings = QSettings('PC', 'ActionEditor')
        settings.setValue('recentStages', [])
        
    def open_recent_stage(self, stage_path):
        """Open a stage from recent menu"""
        print(f"Opening recent stage: {stage_path}")
        # TODO: Implement stage opening logic
        
    def connect_actions(self):
        """Connect UI actions to their handlers"""
        # File menu
        self.ui.actionNew_Stage.triggered.connect(self.on_new_project)
        self.ui.actionOpen_Stage.triggered.connect(self.on_open_project)
        self.ui.actionSave_Stage.triggered.connect(self.on_save)
        self.ui.actionSave_Stage_As.triggered.connect(self.on_save_as)
        self.ui.actionSave_Common_Palette.triggered.connect(self.on_save_palette)
        self.ui.actionOpen_Project.triggered.connect(self.on_open_project)
        self.ui.actionSave_Project_As.triggered.connect(self.on_save_project_as)
        self.ui.actionClose_Project.triggered.connect(self.on_close_project)
        
        # Edit menu
        self.ui.actionUndo.triggered.connect(self.on_undo)
        self.ui.actionRedo.triggered.connect(self.on_redo)
        self.ui.actionPalette_Block.triggered.connect(self.on_palette_block)
        self.ui.actionPalette_Character.triggered.connect(self.on_palette_character)
        self.ui.actionPalette_Item.triggered.connect(self.on_palette_item)
        self.ui.actionClear_All.triggered.connect(self.on_clear_all)
        self.ui.actionClear_Blocks.triggered.connect(self.on_clear_blocks)
        self.ui.actionClear_Characters.triggered.connect(self.on_clear_characters)
        self.ui.actionClear_Items.triggered.connect(self.on_clear_items)
        
        # View menu
        self.ui.actionCommon_Palette.triggered.connect(self.on_view_common_palette)
        self.ui.actionStage_Palette.triggered.connect(self.on_view_stage_palette)
        self.ui.actionGroup_Info.triggered.connect(self.on_view_group_info)
        self.ui.actionLock_Docks.triggered.connect(self.on_lock_docks)
        
        # Stage menu
        self.ui.actionStage_Settings.triggered.connect(self.on_stage_settings)
        self.ui.actionLoad_Stage_Palette.triggered.connect(self.on_load_stage_palette)
        self.ui.actionSave_Stage_Palette.triggered.connect(self.on_save_stage_palette)
        self.ui.actionStage_Options.triggered.connect(self.on_stage_options)
        
        # Project menu
        self.ui.actionDatabase.triggered.connect(self.on_database)
        self.ui.actionWorld_Map.triggered.connect(self.on_world_map)
        self.ui.actionSystem.triggered.connect(self.on_system)
        self.ui.actionProject_Options.triggered.connect(self.on_project_options)
        
        # Test menu
        self.ui.actionTest_Play.triggered.connect(self.on_test_play)
        self.ui.actionTest_Play_Game.triggered.connect(self.on_test_play_game)
        
        # Other menu
        self.ui.actionBitmap_Tool.triggered.connect(self.on_bitmap_tool)
        
    def init_docks(self):
        # Create basic dock widgets
        self.create_dock('Tools', Qt.LeftDockWidgetArea)
        self.create_dock('Properties', Qt.RightDockWidgetArea)
        self.create_dock('Layers', Qt.RightDockWidgetArea)
        self.create_dock('Tileset', Qt.LeftDockWidgetArea)
        
    def create_dock(self, title: str, area: Qt.DockWidgetArea) -> QDockWidget:
        """Create and register a new dock widget"""
        dock = QDockWidget(title, self)
        dock.setAllowedAreas(Qt.AllDockWidgetAreas)
        self.addDockWidget(area, dock)
        self.dockWidgets.append(dock)
        return dock

    def read_settings(self):
        """Load window settings"""
        settings = QSettings('PC', 'ActionEditor')
        geometry = settings.value('geometry')
        if geometry:
            self.restoreGeometry(geometry)
        state = settings.value('windowState')
        if state:
            self.restoreState(state)

    def write_settings(self):
        """Save window settings"""
        settings = QSettings('PC', 'ActionEditor')
        settings.setValue('geometry', self.saveGeometry())
        settings.setValue('windowState', self.saveState())

    def closeEvent(self, event):
        """Handle application close"""
        if self.bypass_close_check:
            self.write_settings()
            event.accept()
            return
            
        reply = QMessageBox.question(self, 'Exit',
                                   'Are you sure you want to exit?',
                                   QMessageBox.Yes | QMessageBox.No,
                                   QMessageBox.No)

        if reply == QMessageBox.Yes:
            self.write_settings()
            event.accept()
        else:
            event.ignore()

    def on_lock_docks(self, checked):
        """Lock/unlock dock widgets"""
        features = QDockWidget.NoDockWidgetFeatures if checked else (
            QDockWidget.DockWidgetMovable |
            QDockWidget.DockWidgetClosable |
            QDockWidget.DockWidgetFloatable
        )
        for dock in self.dockWidgets:
            dock.setFeatures(features)

    def setup_palette_mode_actions(self):
        """Setup palette mode actions and initial state"""
        # Make actions checkable
        self.ui.actionPalette_Block.setCheckable(True)
        self.ui.actionPalette_Character.setCheckable(True)
        self.ui.actionPalette_Item.setCheckable(True)
        
        # Create action group for mutual exclusivity
        self.palette_group = QActionGroup(self)
        self.palette_group.addAction(self.ui.actionPalette_Block)
        self.palette_group.addAction(self.ui.actionPalette_Character)
        self.palette_group.addAction(self.ui.actionPalette_Item)
        self.palette_group.setExclusive(True)
        
        # Set initial state
        self.ui.actionPalette_Block.setChecked(True)
        AppStateManager.instance().set_palette_mode(PaletteMode.BLOCK)
        
        # Connect to state manager
        AppStateManager.instance().on_palette_mode_changed(self.on_palette_mode_changed)
        
    def on_palette_mode_changed(self, mode: PaletteMode):
        """Handle palette mode changes from other sources"""
        actions = {
            PaletteMode.BLOCK: self.ui.actionPalette_Block,
            PaletteMode.CHARACTER: self.ui.actionPalette_Character,
            PaletteMode.ITEM: self.ui.actionPalette_Item
        }
        actions[mode].setChecked(True)
        
    def on_palette_block(self):
        """Handle block palette selection"""
        if self.ui.actionPalette_Block.isChecked():
            AppStateManager.instance().set_palette_mode(PaletteMode.BLOCK)
            
    def on_palette_character(self):
        """Handle character palette selection"""
        if self.ui.actionPalette_Character.isChecked():
            AppStateManager.instance().set_palette_mode(PaletteMode.CHARACTER)
            
    def on_palette_item(self):
        """Handle item palette selection"""
        if self.ui.actionPalette_Item.isChecked():
            AppStateManager.instance().set_palette_mode(PaletteMode.ITEM)

    # Stub event handlers
    def on_new_project(self):
        pass

    def on_open_project(self):
        """Open a different project"""
        dir_path = QFileDialog.getExistingDirectory(
            self,
            "Select Project Directory",
            "",
            QFileDialog.ShowDirsOnly
        )
        
        if not dir_path:
            return
            
        new_project = ProjectManager.try_load_project(dir_path)
        if new_project is not None:
            # Create new window and show it through window manager
            new_window = MainWindow(project=new_project)
            WindowManager.instance().show_window(new_window)
    
    def on_save_project_as(self):
        """Save project to a new location"""
        dir_path = QFileDialog.getExistingDirectory(
            self,
            "Select New Project Directory",
            "",
            QFileDialog.ShowDirsOnly
        )
        
        if not dir_path:
            return
            
        new_project = ProjectManager.save_project_as(self.project, dir_path)
        if new_project is not None:
            # Create new window and show it through window manager
            new_window = MainWindow(project=new_project)
            WindowManager.instance().show_window(new_window)
    
    def on_close_project(self):
        """Close project and show project picker"""
        self.bypass_close_check = True
        self.close()
        
        project = ProjectManager.show_project_picker()
        if project is not None:
            # Create new window and show it through window manager
            new_window = MainWindow(project=project)
            WindowManager.instance().show_window(new_window)
        # else:
            # Close current window without showing new one
            

    def on_save(self):
        pass

    def on_close_stage(self):
        pass

    def on_save_as(self):
        pass

    def on_save_palette(self):
        pass

    def on_undo(self):
        pass

    def on_redo(self):
        pass

    def on_clear_all(self):
        pass

    def on_clear_blocks(self):
        pass

    def on_clear_characters(self):
        pass

    def on_clear_items(self):
        pass

    def on_view_common_palette(self):
        pass

    def on_view_stage_palette(self):
        pass

    def on_view_group_info(self):
        pass

    def on_stage_settings(self):
        pass

    def on_load_stage_palette(self):
        pass

    def on_save_stage_palette(self):
        pass

    def on_stage_options(self):
        pass
    
    def on_database(self):
        """Show database dialog"""
        from ..dialogs.database.database import DatabaseDialog

        dialog = DatabaseDialog(self.project, self)
        dialog.exec()

    def on_world_map(self):
        pass

    def on_system(self):
        pass

    def on_project_options(self):
        pass

    def on_test_play(self):
        pass

    def on_test_play_game(self):
        pass

    def on_bitmap_tool(self):
        pass