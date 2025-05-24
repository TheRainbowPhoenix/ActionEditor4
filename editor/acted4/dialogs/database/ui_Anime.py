# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'AnimeHrtQxw.ui'
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
from PySide6.QtWidgets import (QApplication, QComboBox, QFrame, QGridLayout,
    QHBoxLayout, QLabel, QLayout, QLineEdit,
    QListWidget, QListWidgetItem, QPushButton, QSizePolicy,
    QSpacerItem, QSpinBox, QVBoxLayout, QWidget)

class Ui_AnimeWidget(object):
    def setupUi(self, AnimeWidget):
        if not AnimeWidget.objectName():
            AnimeWidget.setObjectName(u"AnimeWidget")
        AnimeWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(AnimeWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.animeVList = QVBoxLayout()
        self.animeVList.setObjectName(u"animeVList")
        self.animeVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.animeVList.setContentsMargins(8, 8, 8, 8)
        self.animeList = QListWidget(AnimeWidget)
        self.animeList.setObjectName(u"animeList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.animeList.sizePolicy().hasHeightForWidth())
        self.animeList.setSizePolicy(sizePolicy)

        self.animeVList.addWidget(self.animeList)

        self.animeLButtons = QHBoxLayout()
        self.animeLButtons.setObjectName(u"animeLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.animeLButtons.addItem(self.horizontalSpacer)

        self.animeLNewButton = QPushButton(AnimeWidget)
        self.animeLNewButton.setObjectName(u"animeLNewButton")
        self.animeLNewButton.setMaximumSize(QSize(80, 24))

        self.animeLButtons.addWidget(self.animeLNewButton)

        self.animeLClearButton = QPushButton(AnimeWidget)
        self.animeLClearButton.setObjectName(u"animeLClearButton")
        self.animeLClearButton.setMaximumSize(QSize(80, 24))

        self.animeLButtons.addWidget(self.animeLClearButton)

        self.animeLCountButton = QPushButton(AnimeWidget)
        self.animeLCountButton.setObjectName(u"animeLCountButton")
        self.animeLCountButton.setMaximumSize(QSize(80, 24))

        self.animeLButtons.addWidget(self.animeLCountButton)


        self.animeVList.addLayout(self.animeLButtons)


        self.horizontalLayout_3.addLayout(self.animeVList)

        self.widget = QWidget(AnimeWidget)
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

        self.label_7 = QLabel(self.widget)
        self.label_7.setObjectName(u"label_7")
        self.label_7.setGeometry(QRect(160, 115, 16, 21))
        self.label_8 = QLabel(self.widget)
        self.label_8.setObjectName(u"label_8")
        self.label_8.setGeometry(QRect(60, 140, 116, 21))
        self.label_6 = QLabel(self.widget)
        self.label_6.setObjectName(u"label_6")
        self.label_6.setGeometry(QRect(10, 115, 49, 21))
        self.sampleCountSpinBox = QSpinBox(self.widget)
        self.sampleCountSpinBox.setObjectName(u"sampleCountSpinBox")
        self.sampleCountSpinBox.setGeometry(QRect(180, 115, 40, 21))
        self.sampleCountSpinBox.setMaximumSize(QSize(40, 16777215))
        self.sampleListButton = QPushButton(self.widget)
        self.sampleListButton.setObjectName(u"sampleListButton")
        self.sampleListButton.setGeometry(QRect(225, 113, 31, 26))
        self.sampleComboBox = QComboBox(self.widget)
        self.sampleComboBox.setObjectName(u"sampleComboBox")
        self.sampleComboBox.setGeometry(QRect(57, 115, 91, 22))
        self.animPatButton = QPushButton(self.widget)
        self.animPatButton.setObjectName(u"animPatButton")
        self.animPatButton.setGeometry(QRect(10, 65, 116, 31))
        self.previewFrame = QFrame(self.widget)
        self.previewFrame.setObjectName(u"previewFrame")
        self.previewFrame.setGeometry(QRect(270, 115, 24, 24))
        self.previewFrame.setAutoFillBackground(False)
        self.previewFrame.setFrameShape(QFrame.Shape.Box)
        self.previewFrame.setFrameShadow(QFrame.Shadow.Plain)
        self.frameStartSpinBox = QSpinBox(self.widget)
        self.frameStartSpinBox.setObjectName(u"frameStartSpinBox")
        self.frameStartSpinBox.setGeometry(QRect(180, 140, 40, 21))
        self.frameStartSpinBox.setMaximumSize(QSize(40, 16777215))

        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(AnimeWidget)

        QMetaObject.connectSlotsByName(AnimeWidget)
    # setupUi

    def retranslateUi(self, AnimeWidget):
        AnimeWidget.setWindowTitle(QCoreApplication.translate("AnimeWidget", u"Anime", None))
        self.animeLNewButton.setText(QCoreApplication.translate("AnimeWidget", u"New", None))
        self.animeLClearButton.setText(QCoreApplication.translate("AnimeWidget", u"Clear", None))
        self.animeLCountButton.setText(QCoreApplication.translate("AnimeWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("AnimeWidget", u"Name", None))
        self.label_7.setText(QCoreApplication.translate("AnimeWidget", u"of", None))
        self.label_8.setText(QCoreApplication.translate("AnimeWidget", u"Frame (Start Position)", None))
        self.label_6.setText(QCoreApplication.translate("AnimeWidget", u"Sample", None))
        self.sampleListButton.setText(QCoreApplication.translate("AnimeWidget", u"List", None))
        self.animPatButton.setText(QCoreApplication.translate("AnimeWidget", u"Edit pattern", None))
    # retranslateUi

