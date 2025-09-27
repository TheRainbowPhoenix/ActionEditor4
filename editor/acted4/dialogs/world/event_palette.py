"""Temporary implementation of the world event palette and supporting dialogs."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, List, Optional

from PySide6.QtCore import Signal
from PySide6.QtWidgets import (
    QAbstractItemView,
    QCheckBox,
    QDialog,
    QDialogButtonBox,
    QFormLayout,
    QHBoxLayout,
    QLabel,
    QListWidget,
    QListWidgetItem,
    QMessageBox,
    QPushButton,
    QSpinBox,
    QVBoxLayout,
    QWidget,
)

from .base_palette import FloatingPaletteWindow


@dataclass
class EventListEntry:
    """Simple representation of an event palette row."""

    slot: int
    name: str


class EventPalette(FloatingPaletteWindow):
    """Floating palette used while the world window is in event mode.

    The original application exposes a tool window named ``イベントパレット``.
    The Japanese controls translate to the following elements:

    * ``配置済みなら編集`` -> "Edit placed events"
    * ``配置直前に編集`` -> "Edit before placing"
    * ``ワールド番号を自動で振り分け`` -> "Assign world numbers automatically"
    * ``挿入`` -> "Insert"
    * ``編集`` -> "Edit"
    * ``削除`` -> "Delete"
    * ``データ数`` -> "Data Count"

    The implementation below uses standard Qt widgets so designers can use the
    application while we wait for the dedicated Qt Designer layouts.
    """

    insertRequested = Signal(int)
    editRequested = Signal(int)
    deleteRequested = Signal(int)
    dataCountRequested = Signal(int)

    def __init__(self, parent=None) -> None:
        super().__init__("Event Palette", parent)
        self.setMinimumSize(280, 360)

        self.entries: List[EventListEntry] = []

        central = QWidget(self)
        layout = QVBoxLayout(central)
        layout.setContentsMargins(8, 8, 8, 8)
        layout.setSpacing(6)

        # Options
        self.edit_placed_checkbox = QCheckBox("Edit placed events", self)
        self.edit_before_place_checkbox = QCheckBox("Edit before placing", self)
        self.auto_number_checkbox = QCheckBox("Assign world numbers automatically", self)
        self.auto_number_checkbox.setChecked(True)

        layout.addWidget(self.edit_placed_checkbox)
        layout.addWidget(self.edit_before_place_checkbox)
        layout.addWidget(self.auto_number_checkbox)

        # List of event templates

        # Action buttons
        buttons_row = QHBoxLayout()
        self.insert_button = QPushButton("Insert", self)
        self.edit_button = QPushButton("Edit", self)
        self.delete_button = QPushButton("Delete", self)
        self.count_button = QPushButton("Count", self)

        self.insert_button.clicked.connect(self._handle_insert_action)
        self.edit_button.clicked.connect(self._handle_edit_action)
        self.delete_button.clicked.connect(self._handle_delete_action)
        self.count_button.clicked.connect(self._handle_data_count_action)

        for button in (self.insert_button, self.edit_button, self.delete_button, self.count_button):
            buttons_row.addWidget(button)

        layout.addLayout(buttons_row)
        
        self.event_list = QListWidget(self)
        self.event_list.setSelectionMode(QAbstractItemView.SingleSelection)
        self.event_list.itemDoubleClicked.connect(self._handle_edit_action)
        layout.addWidget(self.event_list)

        self.setCentralWidget(central)
        self.hide()

    # ------------------------------------------------------------------
    # Public API
    def set_entries(
        self,
        entries: Iterable[EventListEntry],
        *,
        selected_index: Optional[int] = None,
    ) -> None:
        """Populate the event template list."""

        self.entries = list(entries)
        self.event_list.clear()

        for entry in self.entries:
            item = QListWidgetItem(f"{entry.slot:>3}  {entry.name}")
            self.event_list.addItem(item)

        if self.event_list.count():
            if selected_index is None:
                selected_index = 0
            selected_index = max(0, min(selected_index, self.event_list.count() - 1))
            self.event_list.setCurrentRow(selected_index)

    def current_index(self) -> Optional[int]:
        """Return the currently selected row or ``None``."""

        row = self.event_list.currentRow()
        return row if row >= 0 else None

    # ------------------------------------------------------------------
    # Internal helpers
    def _handle_insert_action(self) -> None:
        target_index = self.current_index()
        if target_index is None:
            target_index = self.event_list.count()

        dialog = EventEditorDialog(self)
        if dialog.exec() == QDialog.Accepted:
            self.insertRequested.emit(target_index)

    def _handle_edit_action(self, *_args) -> None:
        index = self.current_index()
        if index is None:
            QMessageBox.information(self, "Edit Event", "Select an event to edit.")
            return

        dialog = EventEditorDialog(self)
        if dialog.exec() == QDialog.Accepted:
            self.editRequested.emit(index)

    def _handle_delete_action(self) -> None:
        index = self.current_index()
        if index is None:
            QMessageBox.information(self, "Delete Event", "Select an event to delete.")
            return

        if self.event_list.count() <= 1:
            QMessageBox.information(self, "Delete Event", "At least one event template is required.")
            return

        reply = QMessageBox.question(
            self,
            "Delete Event",
            "Remove the selected event template?",
            QMessageBox.Yes | QMessageBox.No,
            QMessageBox.No,
        )
        if reply == QMessageBox.Yes:
            self.deleteRequested.emit(index)

    def _handle_data_count_action(self) -> None:
        dialog = EventDataCountDialog(self.event_list.count(), self)
        if dialog.exec() == QDialog.Accepted:
            self.dataCountRequested.emit(dialog.value())


class EventEditorDialog(QDialog):
    """Lightweight stub for the complex event editor dialog.

    The reference screenshot shows a multi-section form for event pages.  A
    future Qt Designer form should include:

    * A page selector with "Insert"/"Delete" buttons.
    * Fields for page metadata such as page name, appearance condition, and
      total score thresholds.
    * Graphics preview with a colour picker.
    * Dropdowns for event type, action, parameters, and optional references.
    * Toggles mirroring ``0``/``1`` checkboxes from the legacy UI.
    * Standard OK/Cancel buttons at the bottom.
    """

    def __init__(self, parent=None) -> None:
        super().__init__(parent)
        self.setWindowTitle("Event Editor")
        layout = QVBoxLayout(self)
        instructions = QLabel(
            "This is a placeholder for the event editor dialog. "
            "Please build the detailed layout in Qt Designer based on the "
            "legacy reference."
        )
        instructions.setWordWrap(True)
        layout.addWidget(instructions)

        buttons = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        buttons.accepted.connect(self.accept)
        buttons.rejected.connect(self.reject)
        layout.addWidget(buttons)


class EventDataCountDialog(QDialog):
    """Simple dialog that lets the user pick the number of event slots."""

    MIN_COUNT = 1
    MAX_COUNT = 99

    def __init__(self, current_value: int, parent=None) -> None:
        super().__init__(parent)
        self.setWindowTitle("Event Count")

        layout = QFormLayout(self)
        self.spin = QSpinBox(self)
        self.spin.setRange(self.MIN_COUNT, self.MAX_COUNT)
        clamped = max(self.MIN_COUNT, min(self.MAX_COUNT, current_value))
        self.spin.setValue(clamped)
        layout.addRow(QLabel("Number of entries:"), self.spin)

        buttons = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        buttons.accepted.connect(self.accept)
        buttons.rejected.connect(self.reject)
        layout.addWidget(buttons)

    def value(self) -> int:
        """Return the value selected in the spin box."""

        return self.spin.value()

