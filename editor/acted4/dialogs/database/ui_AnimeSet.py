# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'AnimeSetqIuRdH.ui'
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
    QGroupBox, QHBoxLayout, QLabel, QLayout,
    QLineEdit, QListWidget, QListWidgetItem, QPushButton,
    QSizePolicy, QSpacerItem, QSpinBox, QVBoxLayout,
    QWidget)

class Ui_AnimeSetWidget(object):
    def setupUi(self, AnimeSetWidget):
        if not AnimeSetWidget.objectName():
            AnimeSetWidget.setObjectName(u"AnimeSetWidget")
        AnimeSetWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(AnimeSetWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.animVList = QVBoxLayout()
        self.animVList.setObjectName(u"animVList")
        self.animVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.animVList.setContentsMargins(8, 8, 8, 8)
        self.animList = QListWidget(AnimeSetWidget)
        self.animList.setObjectName(u"animList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.animList.sizePolicy().hasHeightForWidth())
        self.animList.setSizePolicy(sizePolicy)

        self.animVList.addWidget(self.animList)

        self.animLButtons = QHBoxLayout()
        self.animLButtons.setObjectName(u"animLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.animLButtons.addItem(self.horizontalSpacer)

        self.animLNewButton = QPushButton(AnimeSetWidget)
        self.animLNewButton.setObjectName(u"animLNewButton")
        self.animLNewButton.setMaximumSize(QSize(80, 24))

        self.animLButtons.addWidget(self.animLNewButton)

        self.animLClearButton = QPushButton(AnimeSetWidget)
        self.animLClearButton.setObjectName(u"animLClearButton")
        self.animLClearButton.setMaximumSize(QSize(80, 24))

        self.animLButtons.addWidget(self.animLClearButton)

        self.animLCountButton = QPushButton(AnimeSetWidget)
        self.animLCountButton.setObjectName(u"animLCountButton")
        self.animLCountButton.setMaximumSize(QSize(80, 24))

        self.animLButtons.addWidget(self.animLCountButton)


        self.animVList.addLayout(self.animLButtons)


        self.horizontalLayout_3.addLayout(self.animVList)

        self.widget = QWidget(AnimeSetWidget)
        self.widget.setObjectName(u"widget")
        sizePolicy1 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.widget.sizePolicy().hasHeightForWidth())
        self.widget.setSizePolicy(sizePolicy1)
        self.widget.setMinimumSize(QSize(400, 450))
        self.widget.setBaseSize(QSize(800, 400))
        self.gridLayoutWidget_2 = QWidget(self.widget)
        self.gridLayoutWidget_2.setObjectName(u"gridLayoutWidget_2")
        self.gridLayoutWidget_2.setGeometry(QRect(10, 42, 201, 101))
        self.gridLayout_2 = QGridLayout(self.gridLayoutWidget_2)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.gridLayout_2.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)
        self.gridLayout_2.setContentsMargins(0, 0, 0, 0)
        self.label_5 = QLabel(self.gridLayoutWidget_2)
        self.label_5.setObjectName(u"label_5")

        self.gridLayout_2.addWidget(self.label_5, 2, 0, 1, 1)

        self.label_3 = QLabel(self.gridLayoutWidget_2)
        self.label_3.setObjectName(u"label_3")

        self.gridLayout_2.addWidget(self.label_3, 0, 0, 1, 1)

        self.label_4 = QLabel(self.gridLayoutWidget_2)
        self.label_4.setObjectName(u"label_4")

        self.gridLayout_2.addWidget(self.label_4, 1, 0, 1, 1)

        self.flyingOffSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.flyingOffSpinBox.setObjectName(u"flyingOffSpinBox")
        self.flyingOffSpinBox.setMaximumSize(QSize(40, 16777215))

        self.gridLayout_2.addWidget(self.flyingOffSpinBox, 0, 1, 1, 1)

        self.invincibleOffSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.invincibleOffSpinBox.setObjectName(u"invincibleOffSpinBox")
        self.invincibleOffSpinBox.setMaximumSize(QSize(40, 16777215))

        self.gridLayout_2.addWidget(self.invincibleOffSpinBox, 1, 1, 1, 1)

        self.blockOffSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.blockOffSpinBox.setObjectName(u"blockOffSpinBox")
        self.blockOffSpinBox.setMaximumSize(QSize(40, 16777215))

        self.gridLayout_2.addWidget(self.blockOffSpinBox, 2, 1, 1, 1)

        self.groupBox = QGroupBox(self.widget)
        self.groupBox.setObjectName(u"groupBox")
        self.groupBox.setGeometry(QRect(10, 152, 201, 191))
        self.animPatButton = QPushButton(self.groupBox)
        self.animPatButton.setObjectName(u"animPatButton")
        self.animPatButton.setGeometry(QRect(60, 20, 75, 24))
        self.animPatList = QListWidget(self.groupBox)
        self.animPatList.setObjectName(u"animPatList")
        self.animPatList.setGeometry(QRect(10, 50, 181, 131))
        self.horizontalLayoutWidget = QWidget(self.widget)
        self.horizontalLayoutWidget.setObjectName(u"horizontalLayoutWidget")
        self.horizontalLayoutWidget.setGeometry(QRect(10, 2, 201, 41))
        self.horizontalLayout_4 = QHBoxLayout(self.horizontalLayoutWidget)
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.horizontalLayout_4.setContentsMargins(0, 0, 0, 0)
        self.label_2 = QLabel(self.horizontalLayoutWidget)
        self.label_2.setObjectName(u"label_2")

        self.horizontalLayout_4.addWidget(self.label_2)

        self.nameLineEdit = QLineEdit(self.horizontalLayoutWidget)
        self.nameLineEdit.setObjectName(u"nameLineEdit")

        self.horizontalLayout_4.addWidget(self.nameLineEdit)

        self.label_6 = QLabel(self.widget)
        self.label_6.setObjectName(u"label_6")
        self.label_6.setGeometry(QRect(10, 352, 49, 21))
        self.sampleComboBox = QComboBox(self.widget)
        self.sampleComboBox.setObjectName(u"sampleComboBox")
        self.sampleComboBox.setGeometry(QRect(57, 352, 91, 22))
        self.sampleCountSpinBox = QSpinBox(self.widget)
        self.sampleCountSpinBox.setObjectName(u"sampleCountSpinBox")
        self.sampleCountSpinBox.setGeometry(QRect(180, 352, 40, 21))
        self.sampleCountSpinBox.setMaximumSize(QSize(40, 16777215))
        self.label_7 = QLabel(self.widget)
        self.label_7.setObjectName(u"label_7")
        self.label_7.setGeometry(QRect(160, 352, 16, 21))
        self.sampleListButton = QPushButton(self.widget)
        self.sampleListButton.setObjectName(u"sampleListButton")
        self.sampleListButton.setGeometry(QRect(225, 350, 31, 26))
        self.previewFrame = QFrame(self.widget)
        self.previewFrame.setObjectName(u"previewFrame")
        self.previewFrame.setGeometry(QRect(270, 352, 24, 24))
        self.previewFrame.setAutoFillBackground(False)
        self.previewFrame.setFrameShape(QFrame.Shape.Box)
        self.previewFrame.setFrameShadow(QFrame.Shadow.Plain)
        self.widget_2 = QWidget(self.previewFrame)
        self.widget_2.setObjectName(u"widget_2")
        self.widget_2.setGeometry(QRect(-340, -430, 400, 462))
        sizePolicy1.setHeightForWidth(self.widget_2.sizePolicy().hasHeightForWidth())
        self.widget_2.setSizePolicy(sizePolicy1)
        self.widget_2.setMinimumSize(QSize(400, 400))
        self.widget_2.setBaseSize(QSize(800, 400))
        self.gridLayoutWidget_3 = QWidget(self.widget_2)
        self.gridLayoutWidget_3.setObjectName(u"gridLayoutWidget_3")
        self.gridLayoutWidget_3.setGeometry(QRect(20, 60, 201, 101))
        self.gridLayout_3 = QGridLayout(self.gridLayoutWidget_3)
        self.gridLayout_3.setObjectName(u"gridLayout_3")
        self.gridLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)
        self.gridLayout_3.setContentsMargins(0, 0, 0, 0)
        self.label_9 = QLabel(self.gridLayoutWidget_3)
        self.label_9.setObjectName(u"label_9")

        self.gridLayout_3.addWidget(self.label_9, 2, 0, 1, 1)

        self.label_10 = QLabel(self.gridLayoutWidget_3)
        self.label_10.setObjectName(u"label_10")

        self.gridLayout_3.addWidget(self.label_10, 0, 0, 1, 1)

        self.label_11 = QLabel(self.gridLayoutWidget_3)
        self.label_11.setObjectName(u"label_11")

        self.gridLayout_3.addWidget(self.label_11, 1, 0, 1, 1)

        self.flyingOffSpinBox_2 = QSpinBox(self.gridLayoutWidget_3)
        self.flyingOffSpinBox_2.setObjectName(u"flyingOffSpinBox_2")
        self.flyingOffSpinBox_2.setMaximumSize(QSize(40, 16777215))

        self.gridLayout_3.addWidget(self.flyingOffSpinBox_2, 0, 1, 1, 1)

        self.invincibleOffSpinBox_2 = QSpinBox(self.gridLayoutWidget_3)
        self.invincibleOffSpinBox_2.setObjectName(u"invincibleOffSpinBox_2")
        self.invincibleOffSpinBox_2.setMaximumSize(QSize(40, 16777215))

        self.gridLayout_3.addWidget(self.invincibleOffSpinBox_2, 1, 1, 1, 1)

        self.blockOffSpinBox_2 = QSpinBox(self.gridLayoutWidget_3)
        self.blockOffSpinBox_2.setObjectName(u"blockOffSpinBox_2")
        self.blockOffSpinBox_2.setMaximumSize(QSize(40, 16777215))

        self.gridLayout_3.addWidget(self.blockOffSpinBox_2, 2, 1, 1, 1)

        self.groupBox_2 = QGroupBox(self.widget_2)
        self.groupBox_2.setObjectName(u"groupBox_2")
        self.groupBox_2.setGeometry(QRect(20, 170, 201, 191))
        self.animPatButton_2 = QPushButton(self.groupBox_2)
        self.animPatButton_2.setObjectName(u"animPatButton_2")
        self.animPatButton_2.setGeometry(QRect(60, 20, 75, 24))
        self.animPatList_2 = QListWidget(self.groupBox_2)
        self.animPatList_2.setObjectName(u"animPatList_2")
        self.animPatList_2.setGeometry(QRect(10, 50, 181, 131))
        self.horizontalLayoutWidget_2 = QWidget(self.widget_2)
        self.horizontalLayoutWidget_2.setObjectName(u"horizontalLayoutWidget_2")
        self.horizontalLayoutWidget_2.setGeometry(QRect(20, 20, 201, 41))
        self.horizontalLayout_5 = QHBoxLayout(self.horizontalLayoutWidget_2)
        self.horizontalLayout_5.setObjectName(u"horizontalLayout_5")
        self.horizontalLayout_5.setContentsMargins(0, 0, 0, 0)
        self.label_12 = QLabel(self.horizontalLayoutWidget_2)
        self.label_12.setObjectName(u"label_12")

        self.horizontalLayout_5.addWidget(self.label_12)

        self.nameLineEdit_2 = QLineEdit(self.horizontalLayoutWidget_2)
        self.nameLineEdit_2.setObjectName(u"nameLineEdit_2")

        self.horizontalLayout_5.addWidget(self.nameLineEdit_2)

        self.label_13 = QLabel(self.widget_2)
        self.label_13.setObjectName(u"label_13")
        self.label_13.setGeometry(QRect(20, 370, 49, 21))
        self.sampleComboBox_2 = QComboBox(self.widget_2)
        self.sampleComboBox_2.setObjectName(u"sampleComboBox_2")
        self.sampleComboBox_2.setGeometry(QRect(67, 370, 91, 22))
        self.sampleCountSpinBox_2 = QSpinBox(self.widget_2)
        self.sampleCountSpinBox_2.setObjectName(u"sampleCountSpinBox_2")
        self.sampleCountSpinBox_2.setGeometry(QRect(190, 370, 40, 21))
        self.sampleCountSpinBox_2.setMaximumSize(QSize(40, 16777215))
        self.label_14 = QLabel(self.widget_2)
        self.label_14.setObjectName(u"label_14")
        self.label_14.setGeometry(QRect(170, 370, 16, 21))
        self.sampleListButton_2 = QPushButton(self.widget_2)
        self.sampleListButton_2.setObjectName(u"sampleListButton_2")
        self.sampleListButton_2.setGeometry(QRect(235, 368, 31, 26))
        self.previewFrame_2 = QFrame(self.widget_2)
        self.previewFrame_2.setObjectName(u"previewFrame_2")
        self.previewFrame_2.setGeometry(QRect(280, 370, 24, 24))
        self.previewFrame_2.setAutoFillBackground(False)
        self.previewFrame_2.setFrameShape(QFrame.Shape.Box)
        self.previewFrame_2.setFrameShadow(QFrame.Shadow.Plain)
        self.label_15 = QLabel(self.widget_2)
        self.label_15.setObjectName(u"label_15")
        self.label_15.setGeometry(QRect(70, 395, 116, 21))
        self.frameStartSpinBox_2 = QSpinBox(self.widget_2)
        self.frameStartSpinBox_2.setObjectName(u"frameStartSpinBox_2")
        self.frameStartSpinBox_2.setGeometry(QRect(190, 395, 40, 21))
        self.frameStartSpinBox_2.setMaximumSize(QSize(40, 16777215))
        self.label_8 = QLabel(self.widget)
        self.label_8.setObjectName(u"label_8")
        self.label_8.setGeometry(QRect(60, 377, 116, 21))
        self.frameStartSpinBox = QSpinBox(self.widget)
        self.frameStartSpinBox.setObjectName(u"frameStartSpinBox")
        self.frameStartSpinBox.setGeometry(QRect(180, 377, 40, 21))
        self.frameStartSpinBox.setMaximumSize(QSize(40, 16777215))

        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(AnimeSetWidget)

        QMetaObject.connectSlotsByName(AnimeSetWidget)
    # setupUi

    def retranslateUi(self, AnimeSetWidget):
        AnimeSetWidget.setWindowTitle(QCoreApplication.translate("AnimeSetWidget", u"Basic Animation Set", None))
        self.animLNewButton.setText(QCoreApplication.translate("AnimeSetWidget", u"New", None))
        self.animLClearButton.setText(QCoreApplication.translate("AnimeSetWidget", u"Clear", None))
        self.animLCountButton.setText(QCoreApplication.translate("AnimeSetWidget", u"Count", None))
        self.label_5.setText(QCoreApplication.translate("AnimeSetWidget", u"Block Offset", None))
        self.label_3.setText(QCoreApplication.translate("AnimeSetWidget", u"Flying Offset", None))
        self.label_4.setText(QCoreApplication.translate("AnimeSetWidget", u"Invincibility Offset", None))
        self.groupBox.setTitle(QCoreApplication.translate("AnimeSetWidget", u"Animation Pattern", None))
        self.animPatButton.setText(QCoreApplication.translate("AnimeSetWidget", u"Edit", None))
        self.label_2.setText(QCoreApplication.translate("AnimeSetWidget", u"Name", None))
        self.label_6.setText(QCoreApplication.translate("AnimeSetWidget", u"Sample", None))
        self.label_7.setText(QCoreApplication.translate("AnimeSetWidget", u"of", None))
        self.sampleListButton.setText(QCoreApplication.translate("AnimeSetWidget", u"List", None))
        self.label_9.setText(QCoreApplication.translate("AnimeSetWidget", u"Block Offset", None))
        self.label_10.setText(QCoreApplication.translate("AnimeSetWidget", u"Flying Offset", None))
        self.label_11.setText(QCoreApplication.translate("AnimeSetWidget", u"Invincibility Offset", None))
        self.groupBox_2.setTitle(QCoreApplication.translate("AnimeSetWidget", u"Animation Pattern", None))
        self.animPatButton_2.setText(QCoreApplication.translate("AnimeSetWidget", u"Edit", None))
        self.label_12.setText(QCoreApplication.translate("AnimeSetWidget", u"Name", None))
        self.label_13.setText(QCoreApplication.translate("AnimeSetWidget", u"Sample", None))
        self.label_14.setText(QCoreApplication.translate("AnimeSetWidget", u"of", None))
        self.sampleListButton_2.setText(QCoreApplication.translate("AnimeSetWidget", u"List", None))
        self.label_15.setText(QCoreApplication.translate("AnimeSetWidget", u"Frame (Start Position)", None))
        self.label_8.setText(QCoreApplication.translate("AnimeSetWidget", u"Frame (Start Position)", None))
    # retranslateUi

