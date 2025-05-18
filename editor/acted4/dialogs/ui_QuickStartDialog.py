# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'QuickStartDialogWgwzkl.ui'
##
## Created by: Qt User Interface Compiler version 6.9.0
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QAction, QBrush, QColor, QConicalGradient,
    QCursor, QFont, QFontDatabase, QGradient,
    QIcon, QImage, QKeySequence, QLinearGradient,
    QPainter, QPalette, QPixmap, QRadialGradient,
    QTransform)
from PySide6.QtWidgets import (QAbstractItemView, QApplication, QDialog, QFrame,
    QGridLayout, QHBoxLayout, QLabel, QLayout,
    QListView, QListWidget, QListWidgetItem, QPushButton,
    QSizePolicy, QSpacerItem, QVBoxLayout, QWidget)

class Ui_QuickStartDialog(object):
    def setupUi(self, QuickStartDialog):
        if not QuickStartDialog.objectName():
            QuickStartDialog.setObjectName(u"QuickStartDialog")
        QuickStartDialog.resize(554, 594)
        sizePolicy = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(QuickStartDialog.sizePolicy().hasHeightForWidth())
        QuickStartDialog.setSizePolicy(sizePolicy)
        self.actionRemove_item = QAction(QuickStartDialog)
        self.actionRemove_item.setObjectName(u"actionRemove_item")
        self.actionClear_all = QAction(QuickStartDialog)
        self.actionClear_all.setObjectName(u"actionClear_all")
        self.actionRemove_project = QAction(QuickStartDialog)
        self.actionRemove_project.setObjectName(u"actionRemove_project")
        self.actionClearProjects = QAction(QuickStartDialog)
        self.actionClearProjects.setObjectName(u"actionClearProjects")
        self.verticalLayout = QVBoxLayout(QuickStartDialog)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.topBar = QHBoxLayout()
        self.topBar.setObjectName(u"topBar")
        self.verticalLayout_6 = QVBoxLayout()
        self.verticalLayout_6.setObjectName(u"verticalLayout_6")
        self.newBar = QHBoxLayout()
        self.newBar.setSpacing(10)
        self.newBar.setObjectName(u"newBar")
        self.newBar.setContentsMargins(-1, 0, -1, -1)
        self.newButton = QPushButton(QuickStartDialog)
        self.newButton.setObjectName(u"newButton")

        self.newBar.addWidget(self.newButton)

        self.newLabel = QLabel(QuickStartDialog)
        self.newLabel.setObjectName(u"newLabel")

        self.newBar.addWidget(self.newLabel)

        self.horizontalSpacer = QSpacerItem(500, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.newBar.addItem(self.horizontalSpacer)


        self.verticalLayout_6.addLayout(self.newBar)

        self.openBar = QHBoxLayout()
        self.openBar.setSpacing(10)
        self.openBar.setObjectName(u"openBar")
        self.openButton = QPushButton(QuickStartDialog)
        self.openButton.setObjectName(u"openButton")

        self.openBar.addWidget(self.openButton)

        self.openLabel = QLabel(QuickStartDialog)
        self.openLabel.setObjectName(u"openLabel")

        self.openBar.addWidget(self.openLabel)

        self.horizontalSpacer_2 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.openBar.addItem(self.horizontalSpacer_2)


        self.verticalLayout_6.addLayout(self.openBar)


        self.topBar.addLayout(self.verticalLayout_6)

        self.label = QLabel(QuickStartDialog)
        self.label.setObjectName(u"label")
        self.label.setMinimumSize(QSize(60, 60))

        self.topBar.addWidget(self.label)


        self.verticalLayout.addLayout(self.topBar)

        self.verticalLayout_3 = QVBoxLayout()
        self.verticalLayout_3.setSpacing(10)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.verticalLayout_3.setContentsMargins(-1, 0, 0, -1)
        self.frame = QFrame(QuickStartDialog)
        self.frame.setObjectName(u"frame")
        sizePolicy.setHeightForWidth(self.frame.sizePolicy().hasHeightForWidth())
        self.frame.setSizePolicy(sizePolicy)
        self.frame.setMinimumSize(QSize(0, 0))
        self.frame.setFrameShape(QFrame.Shape.NoFrame)
        self.frame.setFrameShadow(QFrame.Shadow.Plain)
        self.verticalLayout_2 = QVBoxLayout(self.frame)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.verticalLayout_2.setContentsMargins(0, 0, 0, 0)
        self.frame1 = QFrame(self.frame)
        self.frame1.setObjectName(u"frame1")
        self.verticalLayout_5 = QVBoxLayout(self.frame1)
        self.verticalLayout_5.setSpacing(8)
        self.verticalLayout_5.setObjectName(u"verticalLayout_5")
        self.verticalLayout_5.setContentsMargins(0, 0, 0, 0)
        self.gridLayout_2 = QGridLayout()
        self.gridLayout_2.setSpacing(6)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.gridLayout_2.setSizeConstraint(QLayout.SizeConstraint.SetDefaultConstraint)
        self.projectFileLabel = QLabel(self.frame1)
        self.projectFileLabel.setObjectName(u"projectFileLabel")
        sizePolicy1 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Fixed)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.projectFileLabel.sizePolicy().hasHeightForWidth())
        self.projectFileLabel.setSizePolicy(sizePolicy1)

        self.gridLayout_2.addWidget(self.projectFileLabel, 0, 0, 1, 1)


        self.verticalLayout_5.addLayout(self.gridLayout_2)

        self.projectsListWidget = QListWidget(self.frame1)
        self.projectsListWidget.setObjectName(u"projectsListWidget")
        sizePolicy2 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy2.setHorizontalStretch(0)
        sizePolicy2.setVerticalStretch(1)
        sizePolicy2.setHeightForWidth(self.projectsListWidget.sizePolicy().hasHeightForWidth())
        self.projectsListWidget.setSizePolicy(sizePolicy2)
        font = QFont()
        font.setPointSize(11)
        self.projectsListWidget.setFont(font)
        self.projectsListWidget.setContextMenuPolicy(Qt.ContextMenuPolicy.ActionsContextMenu)
        self.projectsListWidget.setFrameShape(QFrame.Shape.NoFrame)
        self.projectsListWidget.setFrameShadow(QFrame.Shadow.Plain)
        self.projectsListWidget.setLineWidth(0)
        self.projectsListWidget.setIconSize(QSize(48, 48))
        self.projectsListWidget.setVerticalScrollMode(QAbstractItemView.ScrollMode.ScrollPerPixel)
        self.projectsListWidget.setResizeMode(QListView.ResizeMode.Adjust)
        self.projectsListWidget.setSpacing(5)
        self.projectsListWidget.setViewMode(QListView.ViewMode.ListMode)
        self.projectsListWidget.setUniformItemSizes(False)
        self.projectsListWidget.setWordWrap(False)
        self.projectsListWidget.setSelectionRectVisible(True)

        self.verticalLayout_5.addWidget(self.projectsListWidget)

        self.horizontalLayout_2 = QHBoxLayout()
        self.horizontalLayout_2.setSpacing(6)
        self.horizontalLayout_2.setObjectName(u"horizontalLayout_2")
        self.horizontalSpacer_3 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_2.addItem(self.horizontalSpacer_3)

        self.loadProjectButton = QPushButton(self.frame1)
        self.loadProjectButton.setObjectName(u"loadProjectButton")

        self.horizontalLayout_2.addWidget(self.loadProjectButton)


        self.verticalLayout_5.addLayout(self.horizontalLayout_2)


        self.verticalLayout_2.addWidget(self.frame1)


        self.verticalLayout_3.addWidget(self.frame)


        self.verticalLayout.addLayout(self.verticalLayout_3)


        self.retranslateUi(QuickStartDialog)

        QMetaObject.connectSlotsByName(QuickStartDialog)
    # setupUi

    def retranslateUi(self, QuickStartDialog):
        QuickStartDialog.setWindowTitle(QCoreApplication.translate("QuickStartDialog", u"Quick Start", None))
        self.actionRemove_item.setText(QCoreApplication.translate("QuickStartDialog", u"Remove item", None))
        self.actionClear_all.setText(QCoreApplication.translate("QuickStartDialog", u"Clear all", None))
        self.actionRemove_project.setText(QCoreApplication.translate("QuickStartDialog", u"Delete project", None))
        self.actionClearProjects.setText(QCoreApplication.translate("QuickStartDialog", u"Clear all projects", None))
        self.newButton.setText(QCoreApplication.translate("QuickStartDialog", u"New", None))
        self.newLabel.setText(QCoreApplication.translate("QuickStartDialog", u"Start a new project", None))
        self.openButton.setText(QCoreApplication.translate("QuickStartDialog", u"Open", None))
        self.openLabel.setText(QCoreApplication.translate("QuickStartDialog", u"Open existing project", None))
        self.label.setText(QCoreApplication.translate("QuickStartDialog", u"ActEd4", None))
        self.projectFileLabel.setText(QCoreApplication.translate("QuickStartDialog", u"Recent Projects", None))
        self.loadProjectButton.setText(QCoreApplication.translate("QuickStartDialog", u"Open", None))
    # retranslateUi

