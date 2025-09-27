"""Shared helpers for floating palette windows used by the world editor."""

from __future__ import annotations

from PySide6.QtCore import Qt
from PySide6.QtWidgets import QMainWindow


class FloatingPaletteWindow(QMainWindow):
    """Common window chrome for floating palette dialogs.

    The legacy tool exposes several tool windows that should behave like
    floating palettes: they stay on top of the world editor, are resizable,
    and only display a bare title bar. Qt lets us implement that by sharing
    the window flags between the different dialogs.  Using a small helper
    keeps that logic in one place so new palettes automatically match the
    existing behaviour.
    """

    def __init__(self, title: str, parent=None) -> None:
        super().__init__(parent)
        self.setWindowTitle(title)
        self.setWindowFlags(
            Qt.Tool
            # | Qt.WindowStaysOnTopHint
            | Qt.CustomizeWindowHint
            | Qt.WindowTitleHint
        )

