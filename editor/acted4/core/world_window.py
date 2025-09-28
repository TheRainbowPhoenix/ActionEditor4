from PySide6.QtWidgets import (QMainWindow, QDockWidget, QToolBar, QMenuBar,
                              QStatusBar, QMessageBox, QMenu, QFileDialog, QScrollArea,
                              QWidget, QVBoxLayout, QFrame, QLabel)
from PySide6.QtCore import Qt, QSettings, QPoint, QRect, QSize, Signal
from PySide6.QtGui import QAction, QActionGroup, QPainter, QImage, QPen, QColor, QPixmap, QFont
import os
from typing import Union, Optional
from pathlib import Path
from enum import Enum, auto

from .project import ProjectData
from ..common.window_manager import WindowManager
from ..common.app_state import AppStateManager, PaletteMode
from ..data.files import WorldEventBase, WorldEventPage
from ..dialogs.world.event_palette import EventListEntry, EventPalette
from ..dialogs.world.world_map_settings_dialog import WorldMapSettingsDialog
from ..dialogs.world.world_event_dialog import WorldEventDialog
from ..common.resource_cache import resource_cache

class EditMode(Enum):
    MAP_CHIP = auto()
    EVENT = auto()

class EditOperation(Enum):
    NONE = auto()
    SINGLE_TILE = auto()
    SELECT_AREA = auto()
    PAINT_BLOCK = auto()

class MapViewport(QFrame):
    """Custom widget for displaying the world map"""
    TILE_SIZE = 32
    mouseMoved = Signal(QPoint)  # Add signal at class level
    def __init__(self, parent=None):
        super().__init__(parent)
        self._parent: WorldWindow = parent
        self.setFrameStyle(QFrame.Panel | QFrame.Sunken)
        self.setStyleSheet("background-color: black;")
        # self.setAttribute(Qt.WA_StyledBackground, True)
        # self.setAutoFillBackground(True)
        self.operation = EditOperation.NONE
        self.selection_start = QPoint(-1, -1)
        self.selection_end = QPoint(-1, -1)
        self.is_painting = False  # Track painting state for drag
        
        # Map state
        self.map_width = 32
        self.map_height = 32
        self.tiles = []
        self.tiles_image: Optional[QImage] = None
        self.background_image: Optional[QImage] = None
        self.event_positions: set[tuple[int, int]] = set()
        self.events = []
        self.event_placement_order: dict[tuple[int, int], int] = {}
        self.event_spritesheet: Optional[QImage] = None
        
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

    def set_events(self, events: list):
        """Set event placements for highlighting."""
        self.events = events
        self.event_positions = {
            (event.placement_x, event.placement_y)
            for event in events
            if hasattr(event, "placement_x") and hasattr(event, "placement_y")
        }
        self.event_placement_order = {}
        for event in events:
            if hasattr(event, "placement_x") and hasattr(event, "placement_y") and hasattr(event, "pages") and event.pages:
                pos = (event.placement_x, event.placement_y)
                # Store the world_number from the first page
                world_num = event.pages[0].world_number
                self.event_placement_order[pos] = world_num
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
        """Handle mouse press"""
        grid_x = event.pos().x() // self.TILE_SIZE
        grid_y = event.pos().y() // self.TILE_SIZE

        if grid_x >= 0 and grid_x < self.map_width and \
           grid_y >= 0 and grid_y < self.map_height:

            if event.button() == Qt.LeftButton:
                # Handle event placement
                if self._parent.edit_mode == EditMode.EVENT:
                    self._parent._place_event(grid_x, grid_y)
                else: # Handle MAP_CHIP placement
                    self.is_painting = True
                    self.operation = EditOperation.SINGLE_TILE
                    if hasattr(self._parent, "_place_tile"):
                        self._parent._place_tile(event.pos())
                    elif hasattr(self._parent, "_place_block"):
                        self._parent._place_block(event.pos())
            elif event.button() == Qt.RightButton:
                self.operation = EditOperation.SELECT_AREA
                self.selection_start = QPoint(
                    event.pos().x() // self.TILE_SIZE,
                    event.pos().y() // self.TILE_SIZE
                )
                self.selection_end = self.selection_start
        event.accept()
            
    def mouseReleaseEvent(self, event):
        """Handle mouse release"""
        if event.button() == Qt.LeftButton:
            self.is_painting = False
        elif event.button() == Qt.RightButton and self.operation == EditOperation.SELECT_AREA:
            # Finalize selection and switch to block paint mode
            if self.selection_start != QPoint(-1, -1):
                self.operation = EditOperation.PAINT_BLOCK
                if hasattr(self._parent, "_finalize_selection"):
                    self._parent._finalize_selection(self.selection_start, self.selection_end)
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
                
                if self.operation == EditOperation.SELECT_AREA:
                    self.selection_end = QPoint(grid_x, grid_y)
                elif self.operation == EditOperation.SINGLE_TILE and self.is_painting:
                    if hasattr(self._parent, "_place_tile"):
                        self._parent._place_tile(pos)
                self.update()
            
    def paintEvent(self, event):
        """Draw the map"""
        # super().paintEvent(event)
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
                    
                    # Check if there's an event at this position and draw yellow corner indicator
                    if (x, y) in self.event_positions:
                        current_event = None
                        for event in self.events:
                            if event.placement_x == x and event.placement_y == y:
                                current_event = event
                                break
                        
                        # NEW: Define the rectangle for the event graphic (half tile size)
                        event_rect_size = self.TILE_SIZE // 2 # Half the tile size
                        event_rect = QRect(
                            x * self.TILE_SIZE,
                            y * self.TILE_SIZE,
                            event_rect_size,
                            event_rect_size
                        )
                        
                        # NEW: Draw the event graphic if available
                        if current_event and hasattr(current_event, 'pages') and current_event.pages:
                            # Use the graphic from the first page for now
                            graphic_index = current_event.pages[0].graphic
                            
                            # NEW: Use the resource cache to get the sprite
                            spritesheet_path = Path(self._parent.project.path) / "bmp" / "WorldEvent.bmp"
                            sprite = resource_cache.get_sprite(spritesheet_path, graphic_index, 32, 32)
                            
                            if sprite:
                                # Scale the sprite to fit the event_rect (half tile size)
                                scaled_sprite = sprite.scaled(
                                    event_rect.width(),
                                    event_rect.height(),
                                    Qt.AspectRatioMode.KeepAspectRatio,
                                    Qt.TransformationMode.SmoothTransformation
                                )
                                # Draw the scaled sprite within the event_rect
                                painter.drawImage(event_rect, scaled_sprite)
                        
                        # Draw yellow border around the event rectangle (half tile size)
                        pen = QPen(QColor(255, 255, 0), 1)  # Yellow border, 2px width
                        painter.setPen(pen)
                        painter.setBrush(Qt.NoBrush)  # No fill
                        painter.drawRect(event_rect)

                        # Draw the event placement number
                        world_number = self.event_placement_order.get((x, y), 0)
                        if world_number > 0:
                            painter.setPen(QColor(255, 255, 255))
                            painter.setFont(QFont("Arial", 8, QFont.Weight.Thin)) # Small bold font
                            number_text = str(world_number)
                            text_rect = event_rect
                            painter.drawText(text_rect, Qt.AlignmentFlag.AlignCenter, number_text)

        
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
            
        # Draw selection rectangle if active
        if self.operation in [EditOperation.SELECT_AREA, EditOperation.PAINT_BLOCK]:
            if self.selection_start != QPoint(-1, -1):
                pen = QPen(QColor(0xFF, 0x00, 0x80))
                painter.setPen(pen)
                
                x1 = min(self.selection_start.x(), self.selection_end.x()) * self.TILE_SIZE
                y1 = min(self.selection_start.y(), self.selection_end.y()) * self.TILE_SIZE
                x2 = max(self.selection_start.x(), self.selection_end.x()) * self.TILE_SIZE + self.TILE_SIZE
                y2 = max(self.selection_start.y(), self.selection_end.y()) * self.TILE_SIZE + self.TILE_SIZE
                
                painter.drawRect(QRect(x1, y1, x2 - x1, y2 - y1))

class WorldWindow(QMainWindow):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(parent)
        self.project = project
        self.selected_tile = 0
        self.edit_mode = EditMode.MAP_CHIP  # Default to map chip mode
        self.selected_block = None  # Store selected block area
        
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
        
        # Create floating palette windows
        from ..dialogs.world.chip_picker import ChipPicker
        from ..dialogs.world.event_palette import EventPalette

        self.chip_picker = ChipPicker(self)
        self.chip_picker.set_edit_mode(True)  # Start in MAP_CHIP mode

        self.event_palette = EventPalette(self)

        # Connect palette signals
        self.chip_picker.tileSelected.connect(self._on_tile_selected)
        self.event_palette.insertRequested.connect(self._on_insert_event)
        self.event_palette.editRequested.connect(self._on_edit_event)
        self.event_palette.deleteRequested.connect(self._on_delete_event)
        self.event_palette.dataCountRequested.connect(self._on_change_event_count)

        self.chip_picker.show()  # Show by default since we start in MAP_CHIP mode
        
        # Connect mouse events for tile placement
        # self.map_view.mousePressEvent = self._on_map_click
        
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
    
    def _find_next_free_world_number(self, current_events: list[WorldEventBase]) -> int:
        """Finds the next free world number (1-99) based on existing events."""
        used_numbers = {event.pages[0].world_number for event in current_events if event.pages}
        for num in range(1, 100):
            if num not in used_numbers:
                return num
        return 0 

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

            # Load events
            self.map_view.set_events(data.events)
            
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

            # Populate event palette with entries from the project
            from ..dialogs.world.event_palette import EventListEntry

            entries = []
            for idx, event in enumerate(data.events_pal, start=1):
                name_attr = getattr(event, "name", "")
                name = name_attr.strip() if name_attr else "Unnamed Event"
                entries.append(EventListEntry(slot=idx, name=name))

            self.event_palette.set_entries(entries)
        self._refresh_event_palette()
                
    def on_save_as(self):
        """Handle save as action"""
        if not self.project.world_map:
            QMessageBox.warning(self, "Save World Map", "World map data is not available.")
            return

        # TODO: there should not be location picker. This is a bogus translation
        default_path = getattr(self.project.world_map, "file_path", None)
        if default_path is None:
            default_path = self.project.path / "data" / "WorldMap.dat"

        file_path, _ = QFileDialog.getSaveFileName(
            self,
            "Save World Map As",
            str(default_path),
            "World Map (*.dat);;All Files (*)",
        )

        if not file_path:
            return

        if not self.project.world_map.serialize():
            QMessageBox.critical(
                self,
                "Save World Map",
                "Failed to serialize world map.",
            )
            return

        if not self.project.world_map.save_to(file_path):
            QMessageBox.critical(
                self,
                "Save World Map",
                "Failed to save the world map file.",
            )
            return

        # self.project.world_map.file_path = Path(file_path)
        if hasattr(self, "statusBar") and self.statusBar:
            self.statusBar.showMessage(f"Saved world map to {file_path}", 5000)
        
    def on_exit(self):
        """Handle exit action"""
        WindowManager.instance().show_main_window()
        self.close()
        
    def closeEvent(self, event):
        """Handle window close"""
        if self.chip_picker:
            self.chip_picker.close()
        if hasattr(self, "event_palette") and self.event_palette:
            self.event_palette.close()
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

    def _place_event(self, grid_x: int, grid_y: int):
        """Place a new event, edit an existing one, or replace based on palette settings."""
        if self.edit_mode != EditMode.EVENT:
            return

        # Get the selected event template from the palette
        selected_palette_index = self.event_palette.current_index()
        if selected_palette_index is None or selected_palette_index < 0:
            QMessageBox.warning(self, "Place Event", "Please select an event template from the palette.")
            return

        data = self._get_world_map_data()
        if not data:
            return

        # Check if an event already exists at this position
        existing_event_index = None
        existing_event = None
        for i, event in enumerate(data.events):
            if event.placement_x == grid_x and event.placement_y == grid_y:
                existing_event_index = i
                existing_event = event
                break

        project_path = getattr(self.project, "path", None)

        # Determine the action based on checkbox states
        edit_existing = (
            existing_event is not None and
            self.event_palette.edit_placed_checkbox.isChecked()
        )
        edit_before_place = self.event_palette.edit_before_place_checkbox.isChecked()
        auto_assign_number = self.event_palette.auto_number_checkbox.isChecked()

        if edit_existing:
            # An event exists and "Edit placed events" is checked - edit the existing event
            if WorldEventDialog.edit_event(existing_event, self, project_path=project_path):
                # The event was modified in the dialog and accepted.
                # Refresh the map view to reflect the changes (numbering might change).
                self.map_view.set_events(data.events)
                self.statusBar.showMessage(f"Edited event at ({grid_x}, {grid_y})")
        else:
            # No existing event to edit, or "Edit placed events" is unchecked - place a new event
            event_templates = data.events_pal
            if not (0 <= selected_palette_index < len(event_templates)):
                QMessageBox.warning(self, "Place Event", "Selected event template is invalid.")
                return

            selected_template = event_templates[selected_palette_index]

            # Create a new event instance based on the template
            new_event = WorldEventBase()
            # Deep copy basic fields and pages from the template
            new_event.header = 0x0E # selected_template.header
            new_event.strings_count = selected_template.strings_count
            new_event.name = selected_template.name # Or prompt for a name?
            new_event.pages_count = selected_template.pages_count
            # Deep copy pages using dataclass fields
            new_event.pages = [WorldEventPage(**page.__dict__) for page in selected_template.pages]

            # Set the placement coordinates
            new_event.placement_x = grid_x
            new_event.placement_y = grid_y

             # Handle world number assignment based on checkbox and replacement
            if auto_assign_number:
                if existing_event is not None:
                    # Replacing an existing event: keep its world number
                    # Find the world number of the first page of the existing event
                    if existing_event.pages:
                        new_event.pages[0].world_number = existing_event.pages[0].world_number
                    else:
                        # Fallback if existing event has no pages
                        new_event.pages[0].world_number = self._find_next_free_world_number(data.events)
                else:
                    # Placing a new event (not replacing): get the next free number
                    new_event.pages[0].world_number = self._find_next_free_world_number(data.events)

            # Determine if the dialog should open before placing
            should_open_dialog = edit_before_place

            if should_open_dialog:
                # Open the dialog before placing
                if WorldEventDialog.edit_event(new_event, self, project_path=project_path):
                    # The new event was configured in the dialog and accepted.
                    # It might have been assigned a world number in the dialog, or we assigned one above.
                    # If auto-numbering is on and the dialog *didn't* change the number, ensure it's set correctly.
                    # For simplicity, we'll rely on the number set above or in the dialog.
                    # Add/replace the event in the map's events list
                    if existing_event_index is not None:
                        # Replace the existing event
                        data.events[existing_event_index] = new_event
                    else:
                        # Add the new event
                        data.events.append(new_event)
                    # Refresh the map view
                    self.map_view.set_events(data.events)
                    self.statusBar.showMessage(f"Placed/Edited event '{new_event.name}' at ({grid_x}, {grid_y})")
            else:
                # Place the event directly without opening the dialog
                # Add/replace the event in the map's events list
                if existing_event_index is not None:
                    # Replace the existing event
                    data.events[existing_event_index] = new_event
                else:
                    # Add the new event
                    data.events.append(new_event)
                # Refresh the map view
                self.map_view.set_events(data.events)
                self.statusBar.showMessage(f"Placed event '{new_event.name}' at ({grid_x}, {grid_y})")


            # Add the new event to the map's events list
            # data.events.append(new_event)

            # Refresh the map view to show the new event
            # self.map_view.set_events(data.events) # Pass the updated list

            # Optional: Select the newly placed event in the map view or show a confirmation
            # For now, just update the status bar
            # self.statusBar.showMessage(f"Placed event '{new_event.name}' at ({grid_x}, {grid_y})")
        
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

    def _place_block(self, pos: QPoint):
        """Place selected block at position"""
        if not self.selected_block or self.edit_mode != EditMode.MAP_CHIP:
            return
            
        grid_x = pos.x() // self.map_view.TILE_SIZE
        grid_y = pos.y() // self.map_view.TILE_SIZE
        
        # Place block tiles
        for y in range(self.selected_block['height']):
            for x in range(self.selected_block['width']):
                target_x = grid_x + x
                target_y = grid_y + y
                
                if target_x >= 0 and target_x < self.map_view.map_width and \
                   target_y >= 0 and target_y < self.map_view.map_height:
                    block_idx = y * self.selected_block['width'] + x
                    map_idx = target_y * self.map_view.map_width + target_x
                    
                    if block_idx < len(self.selected_block['tiles']) and \
                       map_idx < len(self.map_view.tiles):
                        self.map_view.tiles[map_idx] = self.selected_block['tiles'][block_idx]
                        
        self.map_view.update()
        
    def _finalize_selection(self, start: QPoint, end: QPoint):
        """Handle area selection completion"""
        # Get block bounds
        x1 = min(start.x(), end.x())
        y1 = min(start.y(), end.y())
        x2 = max(start.x(), end.x())
        y2 = max(start.y(), end.y())
        
        # Create block data
        block_width = x2 - x1 + 1
        block_height = y2 - y1 + 1
        block = []
        
        for y in range(y1, y2 + 1):
            for x in range(x1, x2 + 1):
                idx = y * self.map_view.map_width + x
                if idx < len(self.map_view.tiles):
                    block.append(self.map_view.tiles[idx])
                    
        self.selected_block = {
            'width': block_width,
            'height': block_height,
            'tiles': block
        }

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
            self.event_palette.hide()
        else:
            self.chip_picker.set_edit_mode(False)
            self.chip_picker.hide()
            self.event_palette.show()
            self.event_palette.raise_()
    
    def _on_insert_event(self, index: int) -> None:
        """Insert a new event before the selected row."""

        data = self._get_world_map_data()
        if data is None:
            return

        events = data.events_pal
        index = max(0, min(index, len(events)))
        events.insert(index, WorldEventBase())

        self._refresh_event_palette(selected_index=index)

    def _on_edit_event(self, index: int) -> None:
        """Handle edits confirmed by the event palette dialog."""

        data = self._get_world_map_data()
        if data is None or not data.events_pal:
            return

        if index < 0 or index >= len(data.events_pal):
            return

        event = data.events_pal[index]
        project_path = getattr(self.project, "path", None)
        if WorldEventDialog.edit_event(event, self, project_path=project_path):
            self._refresh_event_palette(selected_index=index)

    def _on_delete_event(self, index: int) -> None:
        """Delete the selected event unless it is the last remaining entry."""

        data = self._get_world_map_data()
        if data is None:
            return

        events = data.events_pal
        if len(events) <= 1:
            QMessageBox.information(
                self,
                "Delete Event",
                "At least one event template must remain.",
            )
            return

        if index < 0 or index >= len(events):
            return

        del events[index]

        next_index = min(index, len(events) - 1)
        self._refresh_event_palette(selected_index=next_index)

    def _on_change_event_count(self, new_count: int) -> None:
        """Update the number of event templates in the palette."""

        data = self._get_world_map_data()
        if data is None:
            return

        new_count = max(1, min(99, new_count))
        events = data.events_pal
        current = len(events)

        if new_count > current:
            events.extend(WorldEventBase() for _ in range(new_count - current))
        elif new_count < current:
            del events[new_count:]

        selected_index = self.event_palette.current_index()
        if selected_index is None:
            selected_index = 0
        selected_index = max(0, min(selected_index, len(events) - 1))

        self._refresh_event_palette(selected_index=selected_index)

    def _get_world_map_data(self):
        """Return the current world map data if available."""

        if getattr(self.project, "world_map", None):
            return self.project.world_map.data
        return None

    def _refresh_event_palette(self, *, selected_index: Optional[int] = None) -> None:
        """Sync the event palette widget with the underlying data."""

        if not hasattr(self, "event_palette"):
            return

        data = self._get_world_map_data()
        if data is None:
            self.event_palette.set_entries([])
            return

        events = data.events_pal
        if not events:
            events.append(WorldEventBase())

        entries = []
        for idx, event in enumerate(events, start=1):
            name = (event.name or "").strip()
            display_name = name if name else f"Event {idx}"
            entries.append(EventListEntry(slot=idx, name=display_name))

        self.event_palette.set_entries(entries, selected_index=selected_index)
            
    def on_mapchip(self):
        """Handle map chip mode selection"""
        self._set_edit_mode(EditMode.MAP_CHIP)
            
    def on_event(self):
        """Handle event mode selection"""
        self._set_edit_mode(EditMode.EVENT)
    
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
            data = self._get_world_map_data()
            if data:
                data.events.clear() # Clear placed events
                self.map_view.set_events(data.events) # Refresh the map view
            pass
            
    def on_settings(self):
        """Handle settings action"""
        if not self.project.world_map:
            QMessageBox.warning(self, "World Map Settings", "World map data is not available.")
            return

        background_count = None
        system_data = getattr(getattr(self.project, "system", None), "data", None)
        if system_data is not None:
            backgrounds = getattr(system_data, "world_map_backgrounds", None)
            if backgrounds:
                background_count = len(backgrounds)

        dialog = WorldMapSettingsDialog(
            self.project.world_map,
            self.project.path,
            background_count,
            self,
        )

        if dialog.exec():
            data = self.project.world_map.data
            self.map_view.set_map_size(data.width, data.height)
            self.map_view.set_tiles(data.tiles)

            if data.use_background and data.bg_path:
                normalized = data.bg_path.replace("\\", os.sep)
                bg_path = os.path.join(self.project.path, normalized)
                self.map_view.load_background(bg_path)
            else:
                self.map_view.background_image = None
                self.map_view.update()

            self.coord_label.setText("Coordinates (0,0)")
        
    def on_map_hover(self, pos: QPoint):
        """Update status bar with current coordinates"""
        self.coord_label.setText(f"Coordinates ({pos.x()},{pos.y()})")