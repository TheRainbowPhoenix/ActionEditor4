# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'WorldMapaTKsSc.ui'
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
from PySide6.QtWidgets import (QApplication, QCheckBox, QFrame, QGridLayout,
    QHBoxLayout, QLabel, QLayout, QLineEdit,
    QListWidget, QListWidgetItem, QPushButton, QSizePolicy,
    QSpacerItem, QSpinBox, QVBoxLayout, QWidget)

class Ui_WorldMapWidget(object):
    def setupUi(self, WorldMapWidget):
        if not WorldMapWidget.objectName():
            WorldMapWidget.setObjectName(u"WorldMapWidget")
        WorldMapWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(WorldMapWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.worldMapVList = QVBoxLayout()
        self.worldMapVList.setObjectName(u"worldMapVList")
        self.worldMapVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.worldMapVList.setContentsMargins(8, 8, 8, 8)
        self.worldMapList = QListWidget(WorldMapWidget)
        self.worldMapList.setObjectName(u"worldMapList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.worldMapList.sizePolicy().hasHeightForWidth())
        self.worldMapList.setSizePolicy(sizePolicy)

        self.worldMapVList.addWidget(self.worldMapList)

        self.worldMapLButtons = QHBoxLayout()
        self.worldMapLButtons.setObjectName(u"worldMapLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.worldMapLButtons.addItem(self.horizontalSpacer)

        self.worldMapLNewButton = QPushButton(WorldMapWidget)
        self.worldMapLNewButton.setObjectName(u"worldMapLNewButton")
        self.worldMapLNewButton.setMaximumSize(QSize(80, 24))

        self.worldMapLButtons.addWidget(self.worldMapLNewButton)

        self.worldMapLClearButton = QPushButton(WorldMapWidget)
        self.worldMapLClearButton.setObjectName(u"worldMapLClearButton")
        self.worldMapLClearButton.setMaximumSize(QSize(80, 24))

        self.worldMapLButtons.addWidget(self.worldMapLClearButton)

        self.worldMapLCountButton = QPushButton(WorldMapWidget)
        self.worldMapLCountButton.setObjectName(u"worldMapLCountButton")
        self.worldMapLCountButton.setMaximumSize(QSize(80, 24))

        self.worldMapLButtons.addWidget(self.worldMapLCountButton)


        self.worldMapVList.addLayout(self.worldMapLButtons)


        self.horizontalLayout_3.addLayout(self.worldMapVList)

        self.widget = QWidget(WorldMapWidget)
        self.widget.setObjectName(u"widget")
        sizePolicy1 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.widget.sizePolicy().hasHeightForWidth())
        self.widget.setSizePolicy(sizePolicy1)
        self.widget.setMinimumSize(QSize(400, 450))
        self.widget.setBaseSize(QSize(800, 400))
        self.gridLayoutWidget = QWidget(self.widget)
        self.gridLayoutWidget.setObjectName(u"gridLayoutWidget")
        self.gridLayoutWidget.setGeometry(QRect(10, 15, 211, 36))
        self.gridLayout = QGridLayout(self.gridLayoutWidget)
        self.gridLayout.setObjectName(u"gridLayout")
        self.gridLayout.setContentsMargins(0, 0, 0, 0)
        self.label_2 = QLabel(self.gridLayoutWidget)
        self.label_2.setObjectName(u"label_2")

        self.gridLayout.addWidget(self.label_2, 0, 0, 1, 1)

        self.horizontalLayout_4 = QHBoxLayout()
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.nameLineEdit = QLineEdit(self.gridLayoutWidget)
        self.nameLineEdit.setObjectName(u"nameLineEdit")

        self.horizontalLayout_4.addWidget(self.nameLineEdit)


        self.gridLayout.addLayout(self.horizontalLayout_4, 0, 1, 1, 1)

        self.label_6 = QLabel(self.widget)
        self.label_6.setObjectName(u"label_6")
        self.label_6.setGeometry(QRect(15, 60, 49, 21))
        self.graphicSpinBox = QSpinBox(self.widget)
        self.graphicSpinBox.setObjectName(u"graphicSpinBox")
        self.graphicSpinBox.setGeometry(QRect(65, 60, 56, 21))
        self.graphicSpinBox.setMaximumSize(QSize(60, 16777215))
        self.previewFrame = QFrame(self.widget)
        self.previewFrame.setObjectName(u"previewFrame")
        self.previewFrame.setGeometry(QRect(135, 60, 24, 24))
        self.previewFrame.setAutoFillBackground(False)
        self.previewFrame.setFrameShape(QFrame.Shape.Box)
        self.previewFrame.setFrameShadow(QFrame.Shadow.Plain)
        self.lockedCheckBox = QCheckBox(self.widget)
        self.lockedCheckBox.setObjectName(u"lockedCheckBox")
        self.lockedCheckBox.setGeometry(QRect(20, 95, 75, 20))

        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(WorldMapWidget)

        QMetaObject.connectSlotsByName(WorldMapWidget)
    # setupUi

    def retranslateUi(self, WorldMapWidget):
        WorldMapWidget.setWindowTitle(QCoreApplication.translate("WorldMapWidget", u"World Map", None))
        self.worldMapLNewButton.setText(QCoreApplication.translate("WorldMapWidget", u"New", None))
        self.worldMapLClearButton.setText(QCoreApplication.translate("WorldMapWidget", u"Clear", None))
        self.worldMapLCountButton.setText(QCoreApplication.translate("WorldMapWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("WorldMapWidget", u"Name", None))
        self.label_6.setText(QCoreApplication.translate("WorldMapWidget", u"Graphic", None))
        self.lockedCheckBox.setText(QCoreApplication.translate("WorldMapWidget", u"Locked", None))
    # retranslateUi

