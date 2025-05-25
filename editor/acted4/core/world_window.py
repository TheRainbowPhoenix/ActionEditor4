from PySide6.QtWidgets import (QMainWindow, QDockWidget, QToolBar, QMenuBar,
                              QStatusBar, QMessageBox, QMenu, QFileDialog, QScrollArea,
                              QWidget, QVBoxLayout, QFrame, QLabel)
from PySide6.QtCore import Qt, QSettings, QPoint, QRect, QSize, Signal
from PySide6.QtGui import QAction, QActionGroup, QPainter, QImage, QPen, QColor, QPixmap
import os
from typing import Union, Optional
from pathlib import Path
from enum import Enum, auto

from .project import ProjectData
from ..common.window_manager import WindowManager
from ..common.app_state import AppStateManager, PaletteMode

class EditMode(Enum):
    MAP_CHIP = auto()
    EVENT = auto()

class MapViewport(QFrame):
    """Custom widget for displaying the world map"""
    TILE_SIZE = 32
    mouseMoved = Signal(QPoint)  # Add signal at class level
    def __init__(self, parent=None):
        super().__init__(parent)
        self._parent: WorldWindow = parent
        self.setFrameStyle(QFrame.Panel | QFrame.Sunken)
        self.setAttribute(Qt.WA_StyledBackground, True)
        self.setAutoFillBackground(True)
        self.is_painting = False  # Track painting state for drag
        
        # Map state
        self.map_width = 32
        self.map_height = 32
        self.tiles = []
        self.tiles_image: Optional[QImage] = None
        self.background_image: Optional[QImage] = None
        
        # Mouse tracking for grid highlight
        self.setMouseTracking(True)
        self.hover_pos = QPoint(-1, -1)
        
    def set_map_size(self, width: int, height: int):
        """Set map dimensions"""
        self.map_width = width
        self.map_height = height
        self.setMinimumSize(width * self.TILE_SIZE, height * self.TILE_SIZE)
        self.update()
        
    def set_tiles(self, tiles: list):
        """Set map tiles"""
        self.tiles = tiles
        self.update()
        
    def load_tileset(self, path: Union[str, Path]):
        """Load tileset image"""
        self.tiles_image = QImage(str(path))
        if self.tiles_image:
            # Create inverse mask from transparency color
            transparent_color = self.tiles_image.pixelColor(0, 0)
            mask = self.tiles_image.createMaskFromColor(transparent_color.rgb())
            mask.invertPixels()  # Invert the mask so transparent color becomes transparent
            self.tiles_image.setAlphaChannel(mask)
        self.update()
        
    def load_background(self, path: Union[str, Path]):
        """Load background image"""
        if path and os.path.exists(path):
            self.background_image = QImage(str(path))
            self.update()
            
    def mousePressEvent(self, event):
        """Handle mouse press for tile painting start"""
        if event.button() == Qt.LeftButton:
            self.is_painting = True
            if hasattr(self.parent().parent(), "_place_tile"):
                self.parent().parent()._place_tile(event.pos())
            event.accept()
            
    def mouseReleaseEvent(self, event):
        """Handle mouse release to stop painting"""
        if event.button() == Qt.LeftButton:
            self.is_painting = False
            event.accept()
            
    def mouseMoveEvent(self, event):
        """Track mouse for grid highlight and painting"""
        pos = event.pos()
        grid_x = pos.x() // self.TILE_SIZE
        grid_y = pos.y() // self.TILE_SIZE
        
        if grid_x >= 0 and grid_x < self.map_width and \
           grid_y >= 0 and grid_y < self.map_height:
            # Update hover position if changed
            if grid_x != self.hover_pos.x() or grid_y != self.hover_pos.y():
                self.hover_pos = QPoint(grid_x, grid_y)
                self.mouseMoved.emit(self.hover_pos)
                
                # Continue painting if mouse button is held
                if self.is_painting:
                    
                    if hasattr(self._parent, "_place_tile"):
                        self._parent._place_tile(pos)
                self.update()
            
    def paintEvent(self, event):
        """Draw the map"""
        super().paintEvent(event)
        painter = QPainter(self)
        
        # Draw background if available
        if self.background_image:
            painter.drawImage(0, 0, self.background_image)
            
        # Draw tiles if tileset is loaded
        if self.tiles_image and self.tiles:
            tile_per_row = self.tiles_image.width() // self.TILE_SIZE
            for y in range(self.map_height):
                for x in range(self.map_width):
                    idx = y * self.map_width + x
                    if idx < len(self.tiles):
                        tile_idx = self.tiles[idx]
                        if tile_idx > 0:  # 0 is empty
                            tile_x = (tile_idx % tile_per_row) * self.TILE_SIZE
                            tile_y = (tile_idx // tile_per_row) * self.TILE_SIZE
                            target = QRect(x * self.TILE_SIZE, y * self.TILE_SIZE,
                                         self.TILE_SIZE, self.TILE_SIZE)
                            source = QRect(tile_x, tile_y, self.TILE_SIZE, self.TILE_SIZE)
                            painter.drawImage(target, self.tiles_image, source)
                            
        # Draw grid
        pen = QPen(QColor(200, 200, 200))
        painter.setPen(pen)
        
        for x in range(self.map_width + 1):
            painter.drawLine(x * self.TILE_SIZE, 0,
                           x * self.TILE_SIZE, self.map_height * self.TILE_SIZE)
                           
        for y in range(self.map_height + 1):
            painter.drawLine(0, y * self.TILE_SIZE,
                           self.map_width * self.TILE_SIZE, y * self.TILE_SIZE)
                           
        # Draw hover highlight
        if self.hover_pos.x() >= 0:
            pen = QPen(QColor(0x80, 0x00, 0xFF))
            painter.setPen(pen)
            rect = QRect(self.hover_pos.x() * self.TILE_SIZE,
                        self.hover_pos.y() * self.TILE_SIZE,
                        self.TILE_SIZE, self.TILE_SIZE)
            painter.drawRect(rect)

class WorldWindow(QMainWindow):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(parent)
        self.project = project
        self.selected_tile = 0
        self.edit_mode = EditMode.MAP_CHIP  # Default to map chip mode
        
        # Window setup
        self.setWindowTitle("World Map Editor")
        self.resize(800, 600)
        
        # Create central widget with scrolling
        scroll = QScrollArea()
        self.map_view = MapViewport(self)
        scroll.setWidget(self.map_view)
        self.setCentralWidget(scroll)
        
        # Create UI elements
        self.create_actions()
        self.create_menus()
        self.create_toolbars()
        self.create_dock_widgets()
        
        # Create status bar
        self.statusBar = QStatusBar(self)
        self.setStatusBar(self.statusBar)
        self.coord_label = QLabel("Coordinates (-,-)")
        self.statusBar.addWidget(self.coord_label)
        
        # Connect viewport signals
        self.map_view.mouseMoved.connect(self.on_map_hover)
        
        # Create chip picker window
        from ..dialogs.world.chip_picker import ChipPicker
        self.chip_picker = ChipPicker(self)
        self.chip_picker.set_edit_mode(True)  # Start in MAP_CHIP mode
        
        # Connect chip picker signals
        self.chip_picker.tileSelected.connect(self._on_tile_selected)
        self.chip_picker.show()  # Show by default since we start in MAP_CHIP mode
        
        # Connect mouse events for tile placement
        self.map_view.mousePressEvent = self._on_map_click
        
        # Load map data
        self.load_map_data()
        
    def create_actions(self):
        """Create window actions"""
        # File actions
        self.save_as_action = QAction("Save As(&S)", self)
        self.save_as_action.setShortcut("Ctrl+S")
        self.save_as_action.triggered.connect(self.on_save_as)
        
        self.exit_action = QAction("Exit(&E)", self)
        self.exit_action.triggered.connect(self.on_exit)
        
        # Edit actions
        self.undo_action = QAction("Undo(&U)", self)
        self.undo_action.setShortcut("Ctrl+Z")
        self.undo_action.triggered.connect(self.on_undo)
        
        self.redo_action = QAction("Redo(&R)", self)
        self.redo_action.setShortcut("Ctrl+Y")
        self.redo_action.triggered.connect(self.on_redo)
        
        # Palette actions
        self.mapchip_action = QAction("Map Chip(&M)", self)
        self.mapchip_action.setCheckable(True)
        self.mapchip_action.triggered.connect(self.on_mapchip)
        
        self.event_action = QAction("Event(&E)", self)
        self.event_action.setCheckable(True)
        self.event_action.triggered.connect(self.on_event)
        
        # Clear actions
        self.clear_mapchips_action = QAction("Clear All Map Chips(&M)", self)
        self.clear_mapchips_action.triggered.connect(self.on_clear_mapchips)
        
        self.clear_events_action = QAction("Clear All Events(&V)", self)
        self.clear_events_action.triggered.connect(self.on_clear_events)
        
        # Settings actions
        self.settings_action = QAction("World Map Settings(&W)", self)
        self.settings_action.triggered.connect(self.on_settings)
        
    def create_menus(self):
        """Create menu bar"""
        # File menu
        file_menu = self.menuBar().addMenu("File(&F)")
        file_menu.addAction(self.save_as_action)
        file_menu.addAction(self.exit_action)
        
        # Edit menu
        edit_menu = self.menuBar().addMenu("Edit(&E)")
        edit_menu.addAction(self.undo_action)
        edit_menu.addAction(self.redo_action)
        edit_menu.addSeparator()
        
        palette_menu = edit_menu.addMenu("Change Palette(&P)")
        palette_menu.addAction(self.mapchip_action)
        palette_menu.addAction(self.event_action)
        
        clear_menu = edit_menu.addMenu("Clear Placement Data(&C)")
        clear_menu.addAction(self.clear_mapchips_action)
        clear_menu.addAction(self.clear_events_action)
        
        # Settings menu
        settings_menu = self.menuBar().addMenu("Settings(&S)")
        settings_menu.addAction(self.settings_action)
        
    def create_toolbars(self):
        """Create tool bars"""
        toolbar = self.addToolBar("Main")
        toolbar.setMovable(False)
        
        toolbar.addAction(self.save_as_action)
        toolbar.addSeparator()
        toolbar.addAction(self.undo_action)
        toolbar.addAction(self.redo_action)
        toolbar.addSeparator()
        toolbar.addAction(self.mapchip_action)
        toolbar.addAction(self.event_action)
        
    def create_dock_widgets(self):
        """Create dock widgets"""
        # TODO: Implement map chip and event palettes
        pass
        
    def load_map_data(self):
        """Load map data from project"""
        if self.project.world_map:
            data = self.project.world_map.data
            
            # Set map dimensions
            self.map_view.set_map_size(data.width, data.height)
            
            # Load tiles
            self.map_view.set_tiles(data.tiles)
            
            # Load tileset
            tileset_path = os.path.join(self.project.path, "bmp", "WorldMapChip.bmp")
            if os.path.exists(tileset_path):
                self.map_view.load_tileset(tileset_path)
                
            # Load background if used
            if data.use_background and data.bg_path:
                bg_path = os.path.join(self.project.path, data.bg_path)
                self.map_view.load_background(bg_path)
            
            # Initialize chip picker
            self.chip_picker.set_tiles(data.tiles_types, tileset_path)
            self.chip_picker.show()
                
    def on_save_as(self):
        """Handle save as action"""
        # TODO: Implement save as
        pass
        
    def on_exit(self):
        """Handle exit action"""
        WindowManager.instance().show_main_window()
        self.close()
        
    def closeEvent(self, event):
        """Handle window close"""
        WindowManager.instance().show_main_window()
        super().closeEvent(event)
        
    def on_undo(self):
        """Handle undo action"""
        # TODO: Implement undo
        pass
        
    def on_redo(self):
        """Handle redo action"""
        # TODO: Implement redo
        pass
        
    def _on_tile_selected(self, tile_index: int):
        """Handle tile selection from picker"""
        self.selected_tile = tile_index
        
    def _place_tile(self, pos: QPoint):
        """Place a tile at the given grid position"""
        if self.edit_mode != EditMode.MAP_CHIP:
            return
            
        grid_x = pos.x() // self.map_view.TILE_SIZE
        grid_y = pos.y() // self.map_view.TILE_SIZE
        
        if grid_x >= 0 and grid_x < self.map_view.map_width and \
           grid_y >= 0 and grid_y < self.map_view.map_height:
            # Place tile at position
            idx = grid_y * self.map_view.map_width + grid_x
            if idx < len(self.map_view.tiles):
                self.map_view.tiles[idx] = self.selected_tile
                self.map_view.update()

    def _on_map_click(self, event):
        """Handle map click for tile placement"""
        if event.button() == Qt.LeftButton:
            self.map_view.is_painting = True
            self._place_tile(event.pos())
            event.accept()
                
    def _set_edit_mode(self, mode: EditMode):
        """Switch between edit modes"""
        self.edit_mode = mode
        self.mapchip_action.setChecked(mode == EditMode.MAP_CHIP)
        self.event_action.setChecked(mode == EditMode.EVENT)
        
        if mode == EditMode.MAP_CHIP:
            self.chip_picker.set_edit_mode(True)
            self.chip_picker.show()
        else:
            self.chip_picker.set_edit_mode(False)
            self.chip_picker.hide()
            
    def on_mapchip(self):
        """Handle map chip mode selection"""
        self._set_edit_mode(EditMode.MAP_CHIP)
            
    def on_event(self):
        """Handle event mode selection"""
        self._set_edit_mode(EditMode.EVENT)
        # TODO: Show event palette
            
    def on_clear_mapchips(self):
        """Handle clear map chips action"""
        reply = QMessageBox.question(
            self, "Clear Map Chips",
            "Are you sure you want to clear all map chips?",
            QMessageBox.Yes | QMessageBox.No,
            QMessageBox.No
        )
        if reply == QMessageBox.Yes:
            # TODO: Implement clear
            pass
            
    def on_clear_events(self):
        """Handle clear events action"""
        reply = QMessageBox.question(
            self, "Clear Events",
            "Are you sure you want to clear all events?",
            QMessageBox.Yes | QMessageBox.No,
            QMessageBox.No
        )
        if reply == QMessageBox.Yes:
            # TODO: Implement clear
            pass
            
    def on_settings(self):
        """Handle settings action"""
        # TODO: Implement settings dialog
        pass
        
    def on_map_hover(self, pos: QPoint):
        """Update status bar with current coordinates"""
        self.coord_label.setText(f"Coordinates ({pos.x()},{pos.y()})")