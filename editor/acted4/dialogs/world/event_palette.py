"""Temporary implementation of the world event palette and supporting dialogs."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, List, Optional

from PySide6.QtCore import Qt, Signal
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
    application while we wait for the dedicated Qt Designer layouts.  A request
    to the UI designer is attached in :meth:`_show_designer_placeholder` and
    explains the visual requirements captured from the reference screenshots.
    """

    insertRequested = Signal()
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
        self.event_list = QListWidget(self)
        self.event_list.setSelectionMode(QAbstractItemView.SingleSelection)
        self.event_list.itemDoubleClicked.connect(self._handle_edit_action)
        layout.addWidget(self.event_list)

        # Action buttons
        buttons_row = QHBoxLayout()
        self.insert_button = QPushButton("Insert", self)
        self.edit_button = QPushButton("Edit", self)
        self.delete_button = QPushButton("Delete", self)
        self.count_button = QPushButton("Data Count", self)

        self.insert_button.clicked.connect(self._handle_insert_action)
        self.edit_button.clicked.connect(self._handle_edit_action)
        self.delete_button.clicked.connect(self._handle_delete_action)
        self.count_button.clicked.connect(self._handle_data_count_action)

        for button in (self.insert_button, self.edit_button, self.delete_button, self.count_button):
            buttons_row.addWidget(button)

        layout.addLayout(buttons_row)

        # Designer instructions placeholder
        self._show_designer_placeholder(layout)

        self.setCentralWidget(central)
        self.hide()

    # ------------------------------------------------------------------
    # Public API
    def set_entries(self, entries: Iterable[EventListEntry]) -> None:
        """Populate the event template list."""

        self.entries = list(entries)
        self.event_list.clear()

        for entry in self.entries:
            item = QListWidgetItem(f"{entry.slot:>3}  {entry.name}")
            self.event_list.addItem(item)

        if self.event_list.count():
            self.event_list.setCurrentRow(0)

    def current_index(self) -> Optional[int]:
        """Return the currently selected row or ``None``."""

        row = self.event_list.currentRow()
        return row if row >= 0 else None

    # ------------------------------------------------------------------
    # Internal helpers
    def _handle_insert_action(self) -> None:
        dialog = EventEditorDialog(self)
        if dialog.exec() == QDialog.Accepted:
            self.insertRequested.emit()

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

    def _show_designer_placeholder(self, layout: QVBoxLayout) -> None:
        """Displays instructions for the designer until a final UI arrives."""

        note = QLabel(self)
        note.setWordWrap(True)
        note.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        note.setStyleSheet("color: #666; font-size: 11px;")
        note.setText(
            "Designer TODO: replace this placeholder with the dedicated Qt "
            "Designer dialog matching the legacy 'Event Palette'. Include "
            "the three checkboxes, the sortable template list, and action "
            "buttons ('Insert', 'Edit', 'Delete', 'Data Count')."
        )
        layout.addWidget(note)


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

    def __init__(self, current_value: int, parent=None) -> None:
        super().__init__(parent)
        self.setWindowTitle("Event Count")

        layout = QFormLayout(self)
        self.spin = QSpinBox(self)
        self.spin.setRange(0, 999)
        self.spin.setValue(max(0, current_value))
        layout.addRow(QLabel("Number of entries:"), self.spin)

        buttons = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        buttons.accepted.connect(self.accept)
        buttons.rejected.connect(self.reject)
        layout.addWidget(buttons)

    def value(self) -> int:
        """Return the value selected in the spin box."""

        return self.spin.value()

