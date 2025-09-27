from PySide6.QtWidgets import (
    QStatusBar,
    QLabel,
    QWidget,
    QVBoxLayout,
    QScrollArea,
    QFrame,
)
from PySide6.QtCore import Qt, QRect, Signal
from PySide6.QtGui import QPainter, QImage, QPen, QColor, QMouseEvent
from typing import List, Optional

class TilePickerWidget(QFrame):
    """Widget to display and select tiles"""
    TILE_SIZE = 32
    TILES_PER_ROW = 5
    tileSelected = Signal(int)  # Emit tile index when selected
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setFrameStyle(QFrame.Panel | QFrame.Sunken)
        self.setAttribute(Qt.WA_StyledBackground, True)
        self.setAutoFillBackground(True)
        
        self.tiles_image: Optional[QImage] = None
        self.tiles_types = []
        self.selected_index = 0
        self.setMouseTracking(True)
        
    def set_tiles(self, tiles_types: List, tileset_path: str):
        """Set available tiles"""
        self.tiles_types = tiles_types
        self.tiles_image = QImage(tileset_path)
        if self.tiles_image:
            # Create inverse mask from transparency color
            transparent_color = self.tiles_image.pixelColor(0, 0)
            mask = self.tiles_image.createMaskFromColor(transparent_color.rgb())
            mask.invertPixels()
            self.tiles_image.setAlphaChannel(mask)
            
            # Calculate size
            rows = (len(tiles_types) + self.TILES_PER_ROW - 1) // self.TILES_PER_ROW
            self.setMinimumSize(self.TILES_PER_ROW * self.TILE_SIZE, 
                              rows * self.TILE_SIZE)
        self.update()
        
    def paintEvent(self, event):
        """Draw tiles grid"""
        super().paintEvent(event)
        painter = QPainter(self)
        
        if not self.tiles_image or not self.tiles_types:
            return
            
        tile_per_row = self.tiles_image.width() // self.TILE_SIZE
        
        for i, tile in enumerate(self.tiles_types):
            x = (i % self.TILES_PER_ROW) * self.TILE_SIZE
            y = (i // self.TILES_PER_ROW) * self.TILE_SIZE
            
            # Draw tile
            tile_x = (tile.graphic % tile_per_row) * self.TILE_SIZE
            tile_y = (tile.graphic // tile_per_row) * self.TILE_SIZE
            source = QRect(tile_x, tile_y, self.TILE_SIZE, self.TILE_SIZE)
            target = QRect(x, y, self.TILE_SIZE, self.TILE_SIZE)
            painter.drawImage(target, self.tiles_image, source)
            
            # Draw selection
            if i == self.selected_index:
                pen = QPen(QColor(255, 255, 0))
                painter.setPen(pen)
                painter.drawRect(target)
                
    def mousePressEvent(self, event: QMouseEvent):
        """Handle tile selection"""
        if event.button() == Qt.LeftButton:
            pos = event.pos()
            tile_x = pos.x() // self.TILE_SIZE
            tile_y = pos.y() // self.TILE_SIZE
            index = tile_y * self.TILES_PER_ROW + tile_x
            
            if index < len(self.tiles_types):
                self.selected_index = index
                self.tileSelected.emit(index)
                self.update()

from .base_palette import FloatingPaletteWindow


class ChipPicker(FloatingPaletteWindow):
    """Floating window for selecting map chips"""
    tileSelected = Signal(int)  # Signal emitted when tile is selected
    def __init__(self, parent=None):
        super().__init__("Map Chip Picker", parent)
        
        # Create central widget
        central = QWidget()
        layout = QVBoxLayout(central)
        layout.setContentsMargins(0, 0, 0, 0)
        
        # Create picker widget with scrolling
        scroll = QScrollArea()
        self.picker = TilePickerWidget()
        scroll.setWidget(self.picker)
        layout.addWidget(scroll)
        
        self.setCentralWidget(central)
        
        # Create status bar
        self.statusBar = QStatusBar()
        self.setStatusBar(self.statusBar)
        self.info_label = QLabel("")
        self.statusBar.addWidget(self.info_label)

        # Connect signals
        self.picker.tileSelected.connect(self._on_tile_selected)
        self.hide()  # Hidden by default
        self.resize(200, 400)
        
    def set_tiles(self, tiles_types: List, tileset_path: str):
        """Set available tiles"""
        self.tiles_types = tiles_types
        self.picker.set_tiles(tiles_types, tileset_path)
        if tiles_types:
            self._on_tile_selected(0)
    
    def _on_tile_selected(self, index: int):
        """Update status when tile is selected"""
        tile = self.tiles_types[index]
        self.info_label.setText(f"{tile.graphic}: {tile.name}")
        self.tileSelected.emit(tile.graphic)
        
    def set_edit_mode(self, enabled: bool):
        """Enable/disable tile picking"""
        self.picker.setEnabled(enabled)