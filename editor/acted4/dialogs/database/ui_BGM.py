# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'BGMsmEJpJ.ui'
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
from PySide6.QtWidgets import (QApplication, QCheckBox, QGridLayout, QHBoxLayout,
    QLabel, QLayout, QLineEdit, QListWidget,
    QListWidgetItem, QPushButton, QSizePolicy, QSlider,
    QSpacerItem, QVBoxLayout, QWidget)

class Ui_BGMWidget(object):
    def setupUi(self, BGMWidget):
        if not BGMWidget.objectName():
            BGMWidget.setObjectName(u"BGMWidget")
        BGMWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(BGMWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.bgmVList = QVBoxLayout()
        self.bgmVList.setObjectName(u"bgmVList")
        self.bgmVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.bgmVList.setContentsMargins(8, 8, 8, 8)
        self.bgmList = QListWidget(BGMWidget)
        self.bgmList.setObjectName(u"bgmList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.bgmList.sizePolicy().hasHeightForWidth())
        self.bgmList.setSizePolicy(sizePolicy)

        self.bgmVList.addWidget(self.bgmList)

        self.bgmLButtons = QHBoxLayout()
        self.bgmLButtons.setObjectName(u"bgmLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.bgmLButtons.addItem(self.horizontalSpacer)

        self.bgmLNewButton = QPushButton(BGMWidget)
        self.bgmLNewButton.setObjectName(u"bgmLNewButton")
        self.bgmLNewButton.setMaximumSize(QSize(80, 24))

        self.bgmLButtons.addWidget(self.bgmLNewButton)

        self.bgmLClearButton = QPushButton(BGMWidget)
        self.bgmLClearButton.setObjectName(u"bgmLClearButton")
        self.bgmLClearButton.setMaximumSize(QSize(80, 24))

        self.bgmLButtons.addWidget(self.bgmLClearButton)

        self.bgmLCountButton = QPushButton(BGMWidget)
        self.bgmLCountButton.setObjectName(u"bgmLCountButton")
        self.bgmLCountButton.setMaximumSize(QSize(80, 24))

        self.bgmLButtons.addWidget(self.bgmLCountButton)


        self.bgmVList.addLayout(self.bgmLButtons)


        self.horizontalLayout_3.addLayout(self.bgmVList)

        self.widget = QWidget(BGMWidget)
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
        self.gridLayoutWidget.setGeometry(QRect(10, 15, 361, 76))
        self.gridLayout = QGridLayout(self.gridLayoutWidget)
        self.gridLayout.setObjectName(u"gridLayout")
        self.gridLayout.setContentsMargins(0, 0, 0, 0)
        self.label_2 = QLabel(self.gridLayoutWidget)
        self.label_2.setObjectName(u"label_2")

        self.gridLayout.addWidget(self.label_2, 0, 0, 1, 1)

        self.label_3 = QLabel(self.gridLayoutWidget)
        self.label_3.setObjectName(u"label_3")

        self.gridLayout.addWidget(self.label_3, 1, 0, 1, 1)

        self.horizontalLayout_4 = QHBoxLayout()
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.nameLineEdit = QLineEdit(self.gridLayoutWidget)
        self.nameLineEdit.setObjectName(u"nameLineEdit")

        self.horizontalLayout_4.addWidget(self.nameLineEdit)

        self.nameSameFileCheckBox = QCheckBox(self.gridLayoutWidget)
        self.nameSameFileCheckBox.setObjectName(u"nameSameFileCheckBox")

        self.horizontalLayout_4.addWidget(self.nameSameFileCheckBox)


        self.gridLayout.addLayout(self.horizontalLayout_4, 0, 1, 1, 1)

        self.horizontalLayout_6 = QHBoxLayout()
        self.horizontalLayout_6.setObjectName(u"horizontalLayout_6")
        self.pathLineReadOnly = QLineEdit(self.gridLayoutWidget)
        self.pathLineReadOnly.setObjectName(u"pathLineReadOnly")
        self.pathLineReadOnly.setReadOnly(True)

        self.horizontalLayout_6.addWidget(self.pathLineReadOnly)

        self.pathBrowseButton = QPushButton(self.gridLayoutWidget)
        self.pathBrowseButton.setObjectName(u"pathBrowseButton")

        self.horizontalLayout_6.addWidget(self.pathBrowseButton)

        self.playButton = QPushButton(self.gridLayoutWidget)
        self.playButton.setObjectName(u"playButton")
        self.playButton.setMinimumSize(QSize(10, 0))
        self.playButton.setMaximumSize(QSize(40, 16777215))

        self.horizontalLayout_6.addWidget(self.playButton)


        self.gridLayout.addLayout(self.horizontalLayout_6, 1, 1, 1, 1)

        self.horizontalLayoutWidget = QWidget(self.widget)
        self.horizontalLayoutWidget.setObjectName(u"horizontalLayoutWidget")
        self.horizontalLayoutWidget.setGeometry(QRect(10, 100, 281, 26))
        self.horizontalLayout = QHBoxLayout(self.horizontalLayoutWidget)
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.horizontalLayout.setContentsMargins(0, 0, 0, 0)
        self.label = QLabel(self.horizontalLayoutWidget)
        self.label.setObjectName(u"label")
        self.label.setMinimumSize(QSize(80, 0))

        self.horizontalLayout.addWidget(self.label)

        self.volumePercentLabel = QLabel(self.horizontalLayoutWidget)
        self.volumePercentLabel.setObjectName(u"volumePercentLabel")
        self.volumePercentLabel.setMinimumSize(QSize(24, 0))

        self.horizontalLayout.addWidget(self.volumePercentLabel)

        self.volumeSlider = QSlider(self.horizontalLayoutWidget)
        self.volumeSlider.setObjectName(u"volumeSlider")
        self.volumeSlider.setMaximum(100)
        self.volumeSlider.setOrientation(Qt.Orientation.Horizontal)
        self.volumeSlider.setTickPosition(QSlider.TickPosition.NoTicks)

        self.horizontalLayout.addWidget(self.volumeSlider)


        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(BGMWidget)

        QMetaObject.connectSlotsByName(BGMWidget)
    # setupUi

    def retranslateUi(self, BGMWidget):
        BGMWidget.setWindowTitle(QCoreApplication.translate("BGMWidget", u"BGM", None))
        self.bgmLNewButton.setText(QCoreApplication.translate("BGMWidget", u"New", None))
        self.bgmLClearButton.setText(QCoreApplication.translate("BGMWidget", u"Clear", None))
        self.bgmLCountButton.setText(QCoreApplication.translate("BGMWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("BGMWidget", u"Name", None))
        self.label_3.setText(QCoreApplication.translate("BGMWidget", u"Path", None))
        self.nameSameFileCheckBox.setText(QCoreApplication.translate("BGMWidget", u"Same as File Name", None))
        self.pathBrowseButton.setText(QCoreApplication.translate("BGMWidget", u"Browse...", None))
        self.playButton.setText(QCoreApplication.translate("BGMWidget", u"\u25b6", None))
        self.label.setText(QCoreApplication.translate("BGMWidget", u"Volume (%)", None))
        self.volumePercentLabel.setText(QCoreApplication.translate("BGMWidget", u"0", None))
    # retranslateUi

