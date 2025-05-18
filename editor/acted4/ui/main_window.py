from PySide6.QtWidgets import QMainWindow, QDockWidget, QMenuBar

class MainEditorWindow(QMainWindow):
    def __init__(self, project_path: str):
        super().__init__()
        self.project_path = project_path
        self._init_ui()

    def _init_ui(self):
        self.setWindowTitle("Action Editor")
        self.resize(1200, 800)
        
        self._create_menu_bar()
        self._create_dock_widgets()

    def _create_menu_bar(self):
        menubar = self.menuBar()
        file_menu = menubar.addMenu("File")
        edit_menu = menubar.addMenu("Edit")
        view_menu = menubar.addMenu("View")

    def _create_dock_widgets(self):
        tools_dock = QDockWidget("Tools", self)
        tools_dock.setFeatures(
            QDockWidget.DockWidgetFeature.DockWidgetMovable |
            QDockWidget.DockWidgetFeature.DockWidgetFloatable
        )
        self.addDockWidget(Qt.DockWidgetArea.LeftDockWidgetArea, tools_dock)