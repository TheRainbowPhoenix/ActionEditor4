from __future__ import annotations

import os
from pathlib import Path
from typing import Optional

from PySide6.QtWidgets import QDialog, QFileDialog

from .ui_WorldMapSettings import Ui_WorldMapSettingsDialog
from ...data.files import WorldMap


class WorldMapSettingsDialog(QDialog):
    """Configure metadata stored in ``WorldMap.dat``."""

    def __init__(
        self,
        world_map: WorldMap,
        project_path: Path,
        background_count: Optional[int] = None,
        parent=None,
    ) -> None:
        super().__init__(parent)
        self.ui = Ui_WorldMapSettingsDialog()
        self.ui.setupUi(self)

        self._world_map = world_map
        self._project_path = Path(project_path)
        self._background_count = background_count

        self._configure_ranges()
        self._load_from_data()

        # Wiring
        self.ui.useBgCheckBox.toggled.connect(self._on_use_background_toggled)
        self.ui.pathBrowseButton.clicked.connect(self._on_browse_background)
        self.ui.widthSpinBox.valueChanged.connect(self._on_width_changed)
        self.ui.heightSpinBox.valueChanged.connect(self._on_height_changed)

    # ------------------------------------------------------------------
    # Qt overrides
    # ------------------------------------------------------------------
    def accept(self) -> None:  # type: ignore[override]
        data = self._world_map.data
        width = self.ui.widthSpinBox.value()
        height = self.ui.heightSpinBox.value()

        data.width = width
        data.height = height

        # Clamp initial position within the map bounds.
        data.init_x = min(max(self.ui.initXSpinBox.value(), 0), width - 1)
        data.init_y = min(max(self.ui.initYSpinBox.value(), 0), height - 1)

        data.background_index = self.ui.backgroundSpinBox.value()

        use_background = self.ui.useBgCheckBox.isChecked()
        background_path = self.ui.pathLineReadOnly.text().strip()
        if use_background and background_path:
            data.use_background = 1
            data.bg_path = background_path
        else:
            data.use_background = 0
            data.bg_path = ""

        # Ensure the name keeps the legacy default.
        if not data.name:
            data.name = "ワールド"

        # Resize the tile buffer so width/height edits remain consistent.
        expected_tiles = width * height
        current_tiles = len(data.tiles)
        if current_tiles < expected_tiles:
            data.tiles.extend([0] * (expected_tiles - current_tiles))
        elif current_tiles > expected_tiles:
            del data.tiles[expected_tiles:]

        # Update chunk information for the new width.
        chunk_pow, chunk_width = self._world_map._calculate_chunk_size(width)  # type: ignore[attr-defined]
        data.chunk_pow = chunk_pow
        data.chunk_width = chunk_width

        super().accept()

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------
    def _configure_ranges(self) -> None:
        self.ui.widthSpinBox.setRange(20, 200)
        self.ui.heightSpinBox.setRange(15, 150)
        self.ui.initXSpinBox.setRange(0, 199)
        self.ui.initYSpinBox.setRange(0, 149)

        if self._background_count is not None:
            max_index = max(0, self._background_count - 1)
        else:
            # Without palette data fall back to a byte sized palette.
            max_index = 255
        self.ui.backgroundSpinBox.setRange(0, max_index)

    def _load_from_data(self) -> None:
        data = self._world_map.data
        self.ui.widthSpinBox.setValue(data.width)
        self.ui.heightSpinBox.setValue(data.height)
        self.ui.initXSpinBox.setValue(min(max(data.init_x, 0), data.width - 1))
        self.ui.initYSpinBox.setValue(min(max(data.init_y, 0), data.height - 1))
        self.ui.backgroundSpinBox.setValue(data.background_index)
        self.ui.useBgCheckBox.setChecked(bool(data.use_background))
        self.ui.pathLineReadOnly.setText(data.bg_path)

        # Trigger dependent bounds/enabled state.
        self._on_width_changed(data.width)
        self._on_height_changed(data.height)
        self._on_use_background_toggled(bool(data.use_background))

    def _on_use_background_toggled(self, checked: bool) -> None:
        self.ui.pathLineReadOnly.setEnabled(checked)
        self.ui.pathBrowseButton.setEnabled(checked)

    def _on_width_changed(self, width: int) -> None:
        self.ui.initXSpinBox.setMaximum(max(0, width - 1))
        if self.ui.initXSpinBox.value() >= width:
            self.ui.initXSpinBox.setValue(width - 1)

    def _on_height_changed(self, height: int) -> None:
        self.ui.initYSpinBox.setMaximum(max(0, height - 1))
        if self.ui.initYSpinBox.value() >= height:
            self.ui.initYSpinBox.setValue(height - 1)

    def _on_browse_background(self) -> None:
        start_dir = str(self._project_path)
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select Background Image",
            start_dir,
            "Bitmap Files (*.bmp);;All Files (*)",
        )

        if not file_path:
            return

        selected = Path(file_path)
        try:
            relative = selected.relative_to(self._project_path)
        except ValueError:
            # Outside project root, keep absolute path.
            relative = selected

        # ``WorldMap.dat`` stores Windows style separators.
        path_text = str(relative).replace(os.sep, "\\")
        self.ui.pathLineReadOnly.setText(path_text)
        if not self.ui.useBgCheckBox.isChecked():
            self.ui.useBgCheckBox.setChecked(True)