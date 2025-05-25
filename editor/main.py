import sys
from PySide6.QtWidgets import QApplication
from acted4.core.main_window import MainWindow
from acted4.common.theme_manager import ThemeManager
from acted4.common.project_manager import ProjectManager
from acted4.common.window_manager import WindowManager

def main():
    app = QApplication(sys.argv)

    # Apply theme
    theme_manager = ThemeManager()
    theme_manager.apply_theme("native")

    # Show project picker and load project
    project = ProjectManager.show_project_picker()
    if project is None:
        sys.exit(0)

    # Create main window and show through window manager
    window = MainWindow(project=project)
    WindowManager.instance().set_main_window(window)
    WindowManager.instance().show_window(window)

    # Keep running while there are visible windows
    while WindowManager.instance().has_visible_windows():
        ret = app.exec()
        if ret != 0:  # Non-zero return means actual exit requested
            sys.exit(ret)
            
    sys.exit(0)

if __name__ == '__main__':
    main()