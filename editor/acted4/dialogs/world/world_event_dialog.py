from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional, get_args, get_origin

from PySide6.QtWidgets import (
    QCheckBox,
    QComboBox,
    QDialog,
    QDialogButtonBox,
    QFileDialog,
    QLineEdit,
    QListWidget,
    QMessageBox,
    QPushButton,
    QSpinBox,
    QWidget,
    QLabel,
    QVBoxLayout,
    QHBoxLayout,
    QGroupBox,
)
from PySide6.QtCore import Qt
from PySide6.QtGui import QPixmap

from ..database.base_dialog import SideListTabWidget
from ...data.files import WorldEventBase, WorldEventPage
from .ui_WorldEventDialog import Ui_WorldEventDialogWidget
from ...common.resource_cache import resource_cache


def format_page_item(index: int, page: WorldEventPage) -> str:
    page_index = index + 1
    world_number = page.world_number
    return f"{page_index} World #{world_number}"

class WorldEventDialog(QDialog):
    """Editable dialog for a single world map event."""
    def __init__(
        self,
        event: WorldEventBase,
        parent: Optional[QWidget] = None,
        *,
        project_path: Optional[str] = None,
    ) -> None:
        super().__init__(parent)
        
        self.ui = Ui_WorldEventDialogWidget()
        self.ui.setupUi(self)

        self.setWindowTitle("World Event")
        self._event = event
        self._project_path = Path(project_path) if project_path else Path("")
        self._current_page_index = 0 # Track current page index in the UI

        # Resolve child widgets that we bind to.
        self._pages_list: QListWidget = self.ui.pagesListWidget
        self._event_name: QLineEdit = self.ui.eventNameLineEdit
        self._placement_x: QSpinBox = self.ui.placementXSpinBox
        self._placement_y: QSpinBox = self.ui.placementYSpinBox
        self._strings_count: QSpinBox = self.ui.stringsCountSpinBox
        self._page_insert: QPushButton = self.ui.pageInsertButton
        self._page_delete: QPushButton = self.ui.pageDeleteButton
        self._event_type: QComboBox = self.ui.eventTypeComboBox
        self._graphic: QComboBox = self.ui.graphicComboBox
        self._world_number: QSpinBox = self.ui.worldNumberSpinBox
        self._total_score: QSpinBox = self.ui.totalScoreSpinBox
        self._pass_without_clear: QCheckBox = self.ui.passWithoutClearCheckBox
        self._play_after_clear: QCheckBox = self.ui.playAfterClearCheckBox
        self._on_game_clear: QComboBox = self.ui.onGameClearComboBox
        self._appearance_world: QSpinBox = self.ui.appearanceWorldSpinBox
        self._appearance_variable: QComboBox = self.ui.appearanceVariableComboBox
        self._appearance_constant: QSpinBox = self.ui.appearanceConstantSpinBox
        self._appearance_comparison: QComboBox = self.ui.appearanceComparisonComboBox
        self._variation_present: QCheckBox = self.ui.variationPresentCheckBox
        self._variation_variable: QComboBox = self.ui.variationVariableComboBox
        self._variation_constant: QSpinBox = self.ui.variationConstantSpinBox
        self._world_name: QLineEdit = self.ui.worldNameLineEdit
        self._start_stage: QLineEdit = self.ui.startStageLineEdit
        self._start_stage_browse: QPushButton = self.ui.startStageBrowseButton
        self._button_box: QDialogButtonBox = self.ui.buttonBox
        self._graphic_preview: QLabel = self.ui.graphicPreview

        # Store references to widgets that depend on event type
        self._world_dependent_widgets = [
            self._world_name,
            self._start_stage,
            self._start_stage_browse,
            self._world_number,
            self._world_number,  # The spinbox itself
            self._pass_without_clear,
            self._play_after_clear,
            self._on_game_clear,
            self._variation_present,
            # The variation fields will be handled separately by _update_variation_fields
        ]
        # Variation sub-widgets are also dependent
        self._variation_dependent_widgets = [
            self._variation_variable,
            self._variation_constant
        ]

        self._graphic_preview.setStyleSheet("background-color: black;")

        # Hide placement fields as they are typically managed externally
        self.ui.placementLabel.setVisible(False)
        self.ui.placementWidget.setVisible(False)

        # Initialize list management logic (similar to SideListTabWidget)
        self._list_data = self._event.pages # The actual list to manage
        self._format_item = format_page_item

        # Connect standard buttons
        self._page_insert.clicked.connect(self._on_list_insert)
        self._page_delete.clicked.connect(self._on_list_delete)

        # Load initial data for the list and the first page's fields
        self._populate_combo_boxes()
        self._connect_signals()
        self._load_initial_data()


    # ------------------------------------------------------------------
    # Utility helpers
    def _populate_combo_boxes(self) -> None:
        # The actual option lists still need to be sourced from the project.
        # Provide sensible placeholders so the dialog is usable today.
        self._event_type.clear()
        for value, label in enumerate(["World", "Path", "Wall"]):
            self._event_type.addItem(label, value)

        self._graphic.clear()
        spritesheet_path = self._project_path / "bmp" / "WorldEvent.bmp"
        sprite_width = 32
        sprite_height = 32
        num_sprites = resource_cache.get_sprite_count(spritesheet_path, sprite_width, sprite_height)
        if num_sprites > 0:
            for i in range(num_sprites):
                self._graphic.addItem(str(i), i) # Display index as text
        else:
            # Fallback if image is not available
            for value, label in enumerate(
                [f"{i}" for i in range(0, 16)] # Provide a reasonable default range
            ):
                self._graphic.addItem(label, value)

        self._on_game_clear.clear()
        for value, label in enumerate(["Do Nothing", "Start New Game+", "Return to Title Screen (※Not Recommended)"]):
            self._on_game_clear.addItem(label, value)
        # TODO: Placeholder variables - these should ideally come from the project
        placeholder_variables = [f"Variable {i:03d}" for i in range(0, 999)]
        self._appearance_variable.clear()
        for idx, label in enumerate(placeholder_variables):
            self._appearance_variable.addItem(label, idx)
        self._variation_variable.clear()
        for idx, label in enumerate(placeholder_variables):
            self._variation_variable.addItem(label, idx)

        self._appearance_comparison.clear()
        for value, label in enumerate(
            [
                "== Equal",
                "!= Not Equal",
                ">= Greater Equal",
                "<= Less Equal",
                "> Greater Than",
                "< Less Than",
                "% Is Multiple Of",
                "!% Is Not Multiple Of"
            ]
        ):
            self._appearance_comparison.addItem(label, value)

    def _connect_signals(self) -> None:
        self._pages_list.currentRowChanged.connect(self._on_page_changed)
        self._variation_present.toggled.connect(self._on_variation_toggled)
        self._start_stage_browse.clicked.connect(self._on_browse_start_stage)
        self._world_name.textChanged.connect(self._on_world_name_changed)
        self._button_box.accepted.connect(self.accept)
        # self._button_box.rejected.connect(self.reject)
        self._event_type.currentIndexChanged.connect(self._on_event_type_changed)
        self._graphic.currentIndexChanged.connect(self._on_graphic_changed)

    def _combo_value(self, combo: QComboBox) -> int:
        data = combo.currentData()
        if data is None:
            return combo.currentIndex()
        try:
            return int(data)
        except (TypeError, ValueError):
            return combo.currentIndex()

    def _set_combo_value(self, combo: QComboBox, value: int) -> None:
        if combo.count() == 0:
            return
        idx = combo.findData(value)
        if idx < 0:
            try:
                idx = combo.findData(int(value))
            except (TypeError, ValueError):
                idx = -1
        if idx < 0:
            idx = min(max(int(value), 0), combo.count() - 1) if combo.count() else 0
        combo.setCurrentIndex(max(0, idx))

    def _load_initial_data(self):
        """Load the main event data and the pages list."""
        # Load main event data
        self._event_name.setText(self._event.name)
        self._placement_x.setValue(self._event.placement_x)
        self._placement_y.setValue(self._event.placement_y)
        self._strings_count.setValue(self._event.strings_count)

        # Load pages list
        self._refresh_list()
        if self._pages_list.count() > 0:
            self._pages_list.setCurrentRow(self._current_page_index)
            # Load the first page's data into the UI
            self._load_page_fields(self._list_data[self._current_page_index])

    def _on_graphic_changed(self, index: int):
        """Update the graphic preview label when the graphic combo box changes."""
        spritesheet_path = self._project_path / "bmp" / "WorldEvent.bmp"
        sprite_width = 32
        sprite_height = 32
        sprite_image = resource_cache.get_sprite(spritesheet_path, index, sprite_width, sprite_height)
        if sprite_image:
            # Convert QImage to QPixmap for the label
            sprite_pixmap = QPixmap.fromImage(sprite_image)
            # Scale the pixmap to fit the preview label (24x24), preserving aspect ratio
            scaled_pixmap = sprite_pixmap.scaled(
                self._graphic_preview.width(),
                self._graphic_preview.height(),
                Qt.AspectRatioMode.KeepAspectRatio,
                Qt.TransformationMode.SmoothTransformation
            )
            self._graphic_preview.setPixmap(scaled_pixmap)
        else:
            # Clear the preview if sprite is invalid
            self._graphic_preview.clear()


    # ------------------------------------------------------------------
    # List Management Logic
    def _on_list_insert(self):
        """Insert a new element before the currently selected index."""
        current_row = self._pages_list.currentRow()

        # If no item is selected, default to inserting at the end
        if current_row < 0:
            insert_index = len(self._list_data)
        else:
            # Insert *before* the selected item
            insert_index = current_row

        new_element = WorldEventPage() # Create a new page instance

        # Insert into the underlying data list
        self._list_data.insert(insert_index, new_element)

        # Refresh the list view to reflect the new item
        self._refresh_list()

        # Optionally, select the newly inserted item
        self._pages_list.setCurrentRow(insert_index)
        # Update the current page index
        self._current_page_index = insert_index
        # Load the new page's fields into the UI
        self._load_page_fields(new_element)


    def _on_list_delete(self):
        """Delete the currently selected element."""
        current_row = self._pages_list.currentRow()

        if current_row < 0 or current_row >= len(self._list_data):
            # No valid selection or selection is out of bounds
            QMessageBox.warning(self, "Delete Page", "Please select a page to delete.")
            return

        # Confirm deletion if desired
        # reply = QMessageBox.question(self, "Delete Page", "Are you sure you want to delete the selected page?")
        # if reply != QMessageBox.Yes:
        #     return

        # Remove from the underlying data list
        del self._list_data[current_row]

        # Refresh the list view
        self._refresh_list()

        # Adjust selection: select the item that moved into the deleted spot,
        # or the last item if the last one was deleted.
        new_row_count = self._pages_list.count()
        if new_row_count > 0:
            # Preferably select the item that was after the deleted one, now at current_row
            # If the deleted item was the last one, select the new last item (current_row - 1)
            select_row = min(current_row, new_row_count - 1)
            self._pages_list.setCurrentRow(select_row)
            # Update the current page index
            self._current_page_index = select_row
            # Load the newly selected page's fields into the UI
            self._load_page_fields(self._list_data[select_row])
        else:
            # If all pages were deleted, add a default one and load it
            self._list_data.append(WorldEventPage())
            self._refresh_list()
            self._pages_list.setCurrentRow(0)
            self._current_page_index = 0
            self._load_page_fields(self._list_data[0])


    def _refresh_list(self):
        """Refresh the QListWidget items based on the underlying data list."""
        self._pages_list.blockSignals(True) # Prevent signal emission during update
        self._pages_list.clear()

        for i, element in enumerate(self._list_data): # Iterate the actual list
            item_text = self._format_item(i, element)
            self._pages_list.addItem(item_text)

        self._pages_list.blockSignals(False) # Re-enable signals
        # Update delete button state based on list size
        self._page_delete.setEnabled(len(self._list_data) > 1)


    # ------------------------------------------------------------------
    # Data loading / saving for current page
    def _save_current_page(self) -> None:
        """Save the currently edited page's UI values back to the data object."""
        if not (0 <= self._current_page_index < len(self._list_data)):
            return
        page = self._list_data[self._current_page_index]
        # Save all page-specific fields from the UI
        page.header = 0x14
        page.event_type = self._combo_value(self._event_type)
        page.graphic = self._combo_value(self._graphic)
        page.world_number = self._world_number.value()
        page.pass_without_clear = 1 if self._pass_without_clear.isChecked() else 0
        page.play_after_clear = 1 if self._play_after_clear.isChecked() else 0
        page.on_game_clear = self._combo_value(self._on_game_clear)
        page.appearance_condition_world = self._appearance_world.value()
        page.appearance_condition_variable = self._combo_value(self._appearance_variable)
        page.appearance_condition_constant = self._appearance_constant.value()
        page.appearance_condition_comparison_content = self._combo_value(
            self._appearance_comparison
        )
        page.appearance_condition_total_score = self._total_score.value()
        page.variation_setting_present = 1 if self._variation_present.isChecked() else 0
        page.variation_variable = self._combo_value(self._variation_variable)
        page.variation_constant = self._variation_constant.value()
        page.world_name = self._world_name.text()
        page.start_stage = self._start_stage.text()


    def _save_main_event_data(self) -> None:
        """Save the main event's UI values back to the data object."""
        self._event.name = self._event_name.text()
        self._event.placement_x = self._placement_x.value()
        self._event.placement_y = self._placement_y.value()
        self._event.strings_count = self._strings_count.value()


    def _load_page_fields(self, page: WorldEventPage) -> None:
        """Load a page's data into the UI fields."""
        # Load page-specific fields into the UI
        self._set_combo_value(self._event_type, page.event_type)
        self._set_combo_value(self._graphic, page.graphic)
        self._world_number.setValue(page.world_number)
        self._total_score.setValue(page.appearance_condition_total_score)
        self._pass_without_clear.setChecked(bool(page.pass_without_clear))
        self._play_after_clear.setChecked(bool(page.play_after_clear))
        self._set_combo_value(self._on_game_clear, page.on_game_clear)
        self._appearance_world.setValue(page.appearance_condition_world)
        self._set_combo_value(
            self._appearance_variable, page.appearance_condition_variable
        )
        self._appearance_constant.setValue(page.appearance_condition_constant)
        self._set_combo_value(
            self._appearance_comparison,
            page.appearance_condition_comparison_content,
        )
        self._variation_present.setChecked(bool(page.variation_setting_present))
        self._set_combo_value(self._variation_variable, page.variation_variable)
        self._variation_constant.setValue(page.variation_constant)
        self._world_name.setText(page.world_name)
        self._start_stage.setText(page.start_stage)
        self._update_variation_fields()
        self._on_event_type_changed(self._combo_value(self._event_type))
        self._on_graphic_changed(self._combo_value(self._graphic)) # Trigger preview update


    # ------------------------------------------------------------------
    # Slots
    def _on_page_changed(self, row: int) -> None:
        """Handle when the user selects a different page in the list."""
        if row == self._current_page_index:
            return

        # Save the currently edited page before loading the new one
        if 0 <= self._current_page_index < len(self._list_data):
            self._save_current_page()
            # Update the list item text after saving, in case world_number changed
            item = self._pages_list.item(self._current_page_index)
            if item:
                page = self._list_data[self._current_page_index]
                item.setText(self._format_item(self._current_page_index, page))

        self._current_page_index = max(0, row)
        if 0 <= row < len(self._list_data):
            page = self._list_data[row]
            self._load_page_fields(page)


    def _on_event_type_changed(self, index: int) -> None:
        """Enable/disable fields based on the selected event type."""
        is_world_type = (index == 0) # Assuming "World" is at index 0
        self._update_world_type_fields(is_world_type)

    def _update_world_type_fields(self, enabled: bool) -> None:
        """Set enabled state for widgets dependent on event type being 'World'."""
        for widget in self._world_dependent_widgets:
            # Exclude variation sub-widgets here, they are handled separately
            if widget not in self._variation_dependent_widgets:
                widget.setEnabled(enabled)
        # The variation sub-widgets depend on *both* the event type AND the variation checkbox
        self._update_variation_fields(self._variation_present.isChecked() and enabled)

    def _on_variation_toggled(self, checked: bool) -> None:
        event_type_index = self._combo_value(self._event_type)
        is_world_type = (event_type_index == 0)
        self._update_variation_fields(checked and is_world_type)

    def _update_variation_fields(self, checked_and_world: Optional[bool] = None) -> None:
        if checked_and_world is None:
            event_type_index = self._combo_value(self._event_type)
            is_world_type = (event_type_index == 0)
            checked = self._variation_present.isChecked()
            checked_and_world = checked and is_world_type

        for widget in self._variation_dependent_widgets:
            widget.setEnabled(checked_and_world)

    def _on_world_name_changed(self, text: str) -> None:
        if not (0 <= self._current_page_index < len(self._list_data)):
            return
        # Update the actual page data
        self._list_data[self._current_page_index].world_name = text
        item = self._pages_list.item(self._current_page_index)
        if item is not None:
            # Re-format the item text to reflect the change
            page = self._list_data[self._current_page_index]
            preview = self._format_item(self._current_page_index, page)
            item.setText(preview)

    def _on_browse_start_stage(self) -> None:
        start_dir = self._project_path or ""
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select Stage File",
            start_dir,
            "All Files (*.*)",
        )
        if file_path:
            self._start_stage.setText(file_path)

    # ------------------------------------------------------------------
    def accept(self) -> None:  # noqa: D102 - standard override
        self._save_current_page()
        # Update the list item text for the current page one last time
        item = self._pages_list.item(self._current_page_index)
        if item and 0 <= self._current_page_index < len(self._list_data):
            page = self._list_data[self._current_page_index]
            item.setText(self._format_item(self._current_page_index, page))

        # Save the main event data
        self._save_main_event_data()

        # Update the pages count
        self._event.pages_count = len(self._list_data)

        super().accept()

    # ------------------------------------------------------------------
    @staticmethod
    def edit_event(
        event: WorldEventBase,
        parent: Optional[QWidget] = None,
        *,
        project_path: Optional[str] = None,
    ) -> bool:
        """Open a modal dialog to edit the event."""
        dialog = WorldEventDialog(event, parent, project_path=project_path)
        return dialog.exec() == QDialog.Accepted