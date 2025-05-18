from .base_dialog import BaseTabDialog
from ...core.project import ProjectData

class AnimeDialog(BaseTabDialog):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(project, parent)
        # TODO: Setup UI and implement functionality