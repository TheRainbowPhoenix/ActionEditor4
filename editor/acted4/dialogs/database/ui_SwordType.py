# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'SwordTypebPcEKQ.ui'
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
from PySide6.QtWidgets import (QApplication, QCheckBox, QGridLayout, QGroupBox,
    QHBoxLayout, QLabel, QLayout, QLineEdit,
    QListWidget, QListWidgetItem, QPushButton, QSizePolicy,
    QSpacerItem, QVBoxLayout, QWidget)

class Ui_SwordTypeWidget(object):
    def setupUi(self, SwordTypeWidget):
        if not SwordTypeWidget.objectName():
            SwordTypeWidget.setObjectName(u"SwordTypeWidget")
        SwordTypeWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(SwordTypeWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.swordTypeVList = QVBoxLayout()
        self.swordTypeVList.setObjectName(u"swordTypeVList")
        self.swordTypeVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.swordTypeVList.setContentsMargins(8, 8, 8, 8)
        self.swordTypeList = QListWidget(SwordTypeWidget)
        self.swordTypeList.setObjectName(u"swordTypeList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.swordTypeList.sizePolicy().hasHeightForWidth())
        self.swordTypeList.setSizePolicy(sizePolicy)

        self.swordTypeVList.addWidget(self.swordTypeList)

        self.swordTypeLButtons = QHBoxLayout()
        self.swordTypeLButtons.setObjectName(u"swordTypeLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.swordTypeLButtons.addItem(self.horizontalSpacer)

        self.swordTypeLNewButton = QPushButton(SwordTypeWidget)
        self.swordTypeLNewButton.setObjectName(u"swordTypeLNewButton")
        self.swordTypeLNewButton.setMaximumSize(QSize(80, 24))

        self.swordTypeLButtons.addWidget(self.swordTypeLNewButton)

        self.swordTypeLClearButton = QPushButton(SwordTypeWidget)
        self.swordTypeLClearButton.setObjectName(u"swordTypeLClearButton")
        self.swordTypeLClearButton.setMaximumSize(QSize(80, 24))

        self.swordTypeLButtons.addWidget(self.swordTypeLClearButton)

        self.swordTypeLCountButton = QPushButton(SwordTypeWidget)
        self.swordTypeLCountButton.setObjectName(u"swordTypeLCountButton")
        self.swordTypeLCountButton.setMaximumSize(QSize(80, 24))

        self.swordTypeLButtons.addWidget(self.swordTypeLCountButton)


        self.swordTypeVList.addLayout(self.swordTypeLButtons)


        self.horizontalLayout_3.addLayout(self.swordTypeVList)

        self.widget = QWidget(SwordTypeWidget)
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
        self.gridLayoutWidget.setGeometry(QRect(10, 15, 361, 36))
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

        self.nameSameFileCheckBox = QCheckBox(self.gridLayoutWidget)
        self.nameSameFileCheckBox.setObjectName(u"nameSameFileCheckBox")

        self.horizontalLayout_4.addWidget(self.nameSameFileCheckBox)


        self.gridLayout.addLayout(self.horizontalLayout_4, 0, 1, 1, 1)

        self.gridLayoutWidget_2 = QWidget(self.widget)
        self.gridLayoutWidget_2.setObjectName(u"gridLayoutWidget_2")
        self.gridLayoutWidget_2.setGeometry(QRect(10, 60, 296, 106))
        self.gridLayout_2 = QGridLayout(self.gridLayoutWidget_2)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.gridLayout_2.setContentsMargins(0, 0, 0, 0)
        self.label_4 = QLabel(self.gridLayoutWidget_2)
        self.label_4.setObjectName(u"label_4")

        self.gridLayout_2.addWidget(self.label_4, 3, 0, 1, 1)

        self.horizontalLayout_7 = QHBoxLayout()
        self.horizontalLayout_7.setObjectName(u"horizontalLayout_7")
        self.rightPathLineReadOnly = QLineEdit(self.gridLayoutWidget_2)
        self.rightPathLineReadOnly.setObjectName(u"rightPathLineReadOnly")
        self.rightPathLineReadOnly.setReadOnly(True)

        self.horizontalLayout_7.addWidget(self.rightPathLineReadOnly)

        self.rightPathBrowseButton = QPushButton(self.gridLayoutWidget_2)
        self.rightPathBrowseButton.setObjectName(u"rightPathBrowseButton")

        self.horizontalLayout_7.addWidget(self.rightPathBrowseButton)


        self.gridLayout_2.addLayout(self.horizontalLayout_7, 4, 0, 1, 1)

        self.label_3 = QLabel(self.gridLayoutWidget_2)
        self.label_3.setObjectName(u"label_3")

        self.gridLayout_2.addWidget(self.label_3, 0, 0, 1, 1)

        self.horizontalLayout_6 = QHBoxLayout()
        self.horizontalLayout_6.setObjectName(u"horizontalLayout_6")
        self.leftPathLineReadOnly = QLineEdit(self.gridLayoutWidget_2)
        self.leftPathLineReadOnly.setObjectName(u"leftPathLineReadOnly")
        self.leftPathLineReadOnly.setReadOnly(True)

        self.horizontalLayout_6.addWidget(self.leftPathLineReadOnly)

        self.leftPathBrowseButton = QPushButton(self.gridLayoutWidget_2)
        self.leftPathBrowseButton.setObjectName(u"leftPathBrowseButton")

        self.horizontalLayout_6.addWidget(self.leftPathBrowseButton)


        self.gridLayout_2.addLayout(self.horizontalLayout_6, 1, 0, 1, 1)

        self.animationGroupBox = QGroupBox(self.widget)
        self.animationGroupBox.setObjectName(u"animationGroupBox")
        self.animationGroupBox.setGeometry(QRect(10, 195, 281, 191))
        self.layoutWidget = QWidget(self.animationGroupBox)
        self.layoutWidget.setObjectName(u"layoutWidget")
        self.layoutWidget.setGeometry(QRect(15, 20, 245, 26))
        self.swordTypeLButtons_2 = QHBoxLayout(self.layoutWidget)
        self.swordTypeLButtons_2.setObjectName(u"swordTypeLButtons_2")
        self.swordTypeLButtons_2.setContentsMargins(0, 0, 0, 0)
        self.insertPosButton = QPushButton(self.layoutWidget)
        self.insertPosButton.setObjectName(u"insertPosButton")
        self.insertPosButton.setMaximumSize(QSize(80, 24))

        self.swordTypeLButtons_2.addWidget(self.insertPosButton)

        self.editPosButton = QPushButton(self.layoutWidget)
        self.editPosButton.setObjectName(u"editPosButton")
        self.editPosButton.setMaximumSize(QSize(80, 24))

        self.swordTypeLButtons_2.addWidget(self.editPosButton)

        self.deletePosButton = QPushButton(self.layoutWidget)
        self.deletePosButton.setObjectName(u"deletePosButton")
        self.deletePosButton.setMaximumSize(QSize(80, 24))

        self.swordTypeLButtons_2.addWidget(self.deletePosButton)

        self.horizontalSpacer_2 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.swordTypeLButtons_2.addItem(self.horizontalSpacer_2)

        self.positionListWidget = QListWidget(self.animationGroupBox)
        self.positionListWidget.setObjectName(u"positionListWidget")
        self.positionListWidget.setGeometry(QRect(15, 55, 246, 121))

        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(SwordTypeWidget)

        QMetaObject.connectSlotsByName(SwordTypeWidget)
    # setupUi

    def retranslateUi(self, SwordTypeWidget):
        SwordTypeWidget.setWindowTitle(QCoreApplication.translate("SwordTypeWidget", u"Sword Type", None))
        self.swordTypeLNewButton.setText(QCoreApplication.translate("SwordTypeWidget", u"New", None))
        self.swordTypeLClearButton.setText(QCoreApplication.translate("SwordTypeWidget", u"Clear", None))
        self.swordTypeLCountButton.setText(QCoreApplication.translate("SwordTypeWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("SwordTypeWidget", u"Name", None))
        self.nameSameFileCheckBox.setText(QCoreApplication.translate("SwordTypeWidget", u"Same as File Name", None))
        self.label_4.setText(QCoreApplication.translate("SwordTypeWidget", u"Bitmap (facing right)", None))
        self.rightPathBrowseButton.setText(QCoreApplication.translate("SwordTypeWidget", u"Browse...", None))
        self.label_3.setText(QCoreApplication.translate("SwordTypeWidget", u"Bitmap (facing left)", None))
        self.leftPathBrowseButton.setText(QCoreApplication.translate("SwordTypeWidget", u"Browse...", None))
        self.animationGroupBox.setTitle(QCoreApplication.translate("SwordTypeWidget", u"Sword Position", None))
        self.insertPosButton.setText(QCoreApplication.translate("SwordTypeWidget", u"Insert", None))
        self.editPosButton.setText(QCoreApplication.translate("SwordTypeWidget", u"Edit", None))
        self.deletePosButton.setText(QCoreApplication.translate("SwordTypeWidget", u"Delete", None))
    # retranslateUi

