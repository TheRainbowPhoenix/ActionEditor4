# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'WorldMapSettingsmibVmX.ui'
##
## Created by: Qt User Interface Compiler version 6.9.0
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide6.QtWidgets import (QAbstractButton, QApplication, QCheckBox, QDialog,
    QDialogButtonBox, QFrame, QGridLayout, QHBoxLayout,
    QLabel, QLineEdit, QPushButton, QSizePolicy,
    QSpinBox, QVBoxLayout, QWidget)

class Ui_WorldMapSettingsDialog(object):
    def setupUi(self, WorldMapSettingsDialog):
        if not WorldMapSettingsDialog.objectName():
            WorldMapSettingsDialog.setObjectName(u"WorldMapSettingsDialog")
        WorldMapSettingsDialog.resize(357, 285)
        self.buttonBox = QDialogButtonBox(WorldMapSettingsDialog)
        self.buttonBox.setObjectName(u"buttonBox")
        self.buttonBox.setGeometry(QRect(20, 240, 321, 32))
        self.buttonBox.setOrientation(Qt.Orientation.Horizontal)
        self.buttonBox.setStandardButtons(QDialogButtonBox.StandardButton.Cancel|QDialogButtonBox.StandardButton.Ok)
        self.gridLayoutWidget_2 = QWidget(WorldMapSettingsDialog)
        self.gridLayoutWidget_2.setObjectName(u"gridLayoutWidget_2")
        self.gridLayoutWidget_2.setGeometry(QRect(20, 10, 246, 157))
        self.gridLayout_2 = QGridLayout(self.gridLayoutWidget_2)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.gridLayout_2.setContentsMargins(0, 0, 0, 0)
        self.widthSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.widthSpinBox.setObjectName(u"widthSpinBox")
        self.widthSpinBox.setMinimumSize(QSize(60, 0))
        self.widthSpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.widthSpinBox, 0, 1, 1, 1)

        self.label_5 = QLabel(self.gridLayoutWidget_2)
        self.label_5.setObjectName(u"label_5")

        self.gridLayout_2.addWidget(self.label_5, 4, 0, 1, 1)

        self.label = QLabel(self.gridLayoutWidget_2)
        self.label.setObjectName(u"label")

        self.gridLayout_2.addWidget(self.label, 0, 0, 1, 1)

        self.label_2 = QLabel(self.gridLayoutWidget_2)
        self.label_2.setObjectName(u"label_2")

        self.gridLayout_2.addWidget(self.label_2, 1, 0, 1, 1)

        self.label_3 = QLabel(self.gridLayoutWidget_2)
        self.label_3.setObjectName(u"label_3")

        self.gridLayout_2.addWidget(self.label_3, 2, 0, 1, 1)

        self.initXSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.initXSpinBox.setObjectName(u"initXSpinBox")
        self.initXSpinBox.setMinimumSize(QSize(60, 0))
        self.initXSpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.initXSpinBox, 2, 1, 1, 1)

        self.label_4 = QLabel(self.gridLayoutWidget_2)
        self.label_4.setObjectName(u"label_4")

        self.gridLayout_2.addWidget(self.label_4, 3, 0, 1, 1)

        self.initYSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.initYSpinBox.setObjectName(u"initYSpinBox")
        self.initYSpinBox.setMinimumSize(QSize(60, 0))
        self.initYSpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.initYSpinBox, 3, 1, 1, 1)

        self.backgroundSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.backgroundSpinBox.setObjectName(u"backgroundSpinBox")
        self.backgroundSpinBox.setMinimumSize(QSize(60, 0))
        self.backgroundSpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.backgroundSpinBox, 4, 1, 1, 1)

        self.heightSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.heightSpinBox.setObjectName(u"heightSpinBox")
        self.heightSpinBox.setMinimumSize(QSize(60, 0))
        self.heightSpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.heightSpinBox, 1, 1, 1, 1)

        self.useBgCheckBox = QCheckBox(self.gridLayoutWidget_2)
        self.useBgCheckBox.setObjectName(u"useBgCheckBox")

        self.gridLayout_2.addWidget(self.useBgCheckBox, 5, 0, 1, 1)

        self.previewFrame = QFrame(WorldMapSettingsDialog)
        self.previewFrame.setObjectName(u"previewFrame")
        self.previewFrame.setGeometry(QRect(275, 120, 24, 24))
        self.previewFrame.setAutoFillBackground(False)
        self.previewFrame.setFrameShape(QFrame.Shape.Box)
        self.previewFrame.setFrameShadow(QFrame.Shadow.Plain)
        self.verticalLayoutWidget = QWidget(WorldMapSettingsDialog)
        self.verticalLayoutWidget.setObjectName(u"verticalLayoutWidget")
        self.verticalLayoutWidget.setGeometry(QRect(20, 175, 321, 51))
        self.verticalLayout = QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.horizontalLayout = QHBoxLayout()
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.label_6 = QLabel(self.verticalLayoutWidget)
        self.label_6.setObjectName(u"label_6")

        self.horizontalLayout.addWidget(self.label_6)

        self.pathLineReadOnly = QLineEdit(self.verticalLayoutWidget)
        self.pathLineReadOnly.setObjectName(u"pathLineReadOnly")
        self.pathLineReadOnly.setReadOnly(True)

        self.horizontalLayout.addWidget(self.pathLineReadOnly)

        self.pathBrowseButton = QPushButton(self.verticalLayoutWidget)
        self.pathBrowseButton.setObjectName(u"pathBrowseButton")

        self.horizontalLayout.addWidget(self.pathBrowseButton)


        self.verticalLayout.addLayout(self.horizontalLayout)

        self.label_7 = QLabel(self.verticalLayoutWidget)
        self.label_7.setObjectName(u"label_7")

        self.verticalLayout.addWidget(self.label_7)


        self.retranslateUi(WorldMapSettingsDialog)
        self.buttonBox.accepted.connect(WorldMapSettingsDialog.accept)
        self.buttonBox.rejected.connect(WorldMapSettingsDialog.reject)

        QMetaObject.connectSlotsByName(WorldMapSettingsDialog)
    # setupUi

    def retranslateUi(self, WorldMapSettingsDialog):
        WorldMapSettingsDialog.setWindowTitle(QCoreApplication.translate("WorldMapSettingsDialog", u"World Map Settings", None))
        self.label_5.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Background", None))
        self.label.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Width", None))
        self.label_2.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Height", None))
        self.label_3.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Initial position (X)", None))
        self.label_4.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Initial position (Y)", None))
        self.useBgCheckBox.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Use Background Image", None))
        self.label_6.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Path", None))
        self.pathBrowseButton.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"Browse...", None))
        self.label_7.setText(QCoreApplication.translate("WorldMapSettingsDialog", u"*Drawn in order: BG Color \u2192 BG Image", None))
    # retranslateUi

