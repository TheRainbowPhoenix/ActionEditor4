# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'BmpCharaExcXkjuyu.ui'
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
from PySide6.QtWidgets import (QApplication, QCheckBox, QComboBox, QGridLayout,
    QHBoxLayout, QLabel, QLayout, QLineEdit,
    QListWidget, QListWidgetItem, QPushButton, QSizePolicy,
    QSpacerItem, QVBoxLayout, QWidget)

class Ui_BmpCharaExcWidget(object):
    def setupUi(self, BmpCharaExcWidget):
        if not BmpCharaExcWidget.objectName():
            BmpCharaExcWidget.setObjectName(u"BmpCharaExcWidget")
        BmpCharaExcWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(BmpCharaExcWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.bmpVList = QVBoxLayout()
        self.bmpVList.setObjectName(u"bmpVList")
        self.bmpVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.bmpVList.setContentsMargins(8, 8, 8, 8)
        self.bmpList = QListWidget(BmpCharaExcWidget)
        self.bmpList.setObjectName(u"bmpList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.bmpList.sizePolicy().hasHeightForWidth())
        self.bmpList.setSizePolicy(sizePolicy)

        self.bmpVList.addWidget(self.bmpList)

        self.bmpLButtons = QHBoxLayout()
        self.bmpLButtons.setObjectName(u"bmpLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.bmpLButtons.addItem(self.horizontalSpacer)

        self.bmpLNewButton = QPushButton(BmpCharaExcWidget)
        self.bmpLNewButton.setObjectName(u"bmpLNewButton")
        self.bmpLNewButton.setMaximumSize(QSize(80, 24))

        self.bmpLButtons.addWidget(self.bmpLNewButton)

        self.bmpLClearButton = QPushButton(BmpCharaExcWidget)
        self.bmpLClearButton.setObjectName(u"bmpLClearButton")
        self.bmpLClearButton.setMaximumSize(QSize(80, 24))

        self.bmpLButtons.addWidget(self.bmpLClearButton)

        self.bmpLCountButton = QPushButton(BmpCharaExcWidget)
        self.bmpLCountButton.setObjectName(u"bmpLCountButton")
        self.bmpLCountButton.setMaximumSize(QSize(80, 24))

        self.bmpLButtons.addWidget(self.bmpLCountButton)


        self.bmpVList.addLayout(self.bmpLButtons)


        self.horizontalLayout_3.addLayout(self.bmpVList)

        self.widget = QWidget(BmpCharaExcWidget)
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


        self.gridLayout.addLayout(self.horizontalLayout_6, 1, 1, 1, 1)

        self.horizontalLayoutWidget_4 = QWidget(self.widget)
        self.horizontalLayoutWidget_4.setObjectName(u"horizontalLayoutWidget_4")
        self.horizontalLayoutWidget_4.setGeometry(QRect(10, 95, 361, 36))
        self.horizontalLayout = QHBoxLayout(self.horizontalLayoutWidget_4)
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.horizontalLayout.setContentsMargins(0, 0, 0, 0)
        self.giantCharCheckBox = QCheckBox(self.horizontalLayoutWidget_4)
        self.giantCharCheckBox.setObjectName(u"giantCharCheckBox")

        self.horizontalLayout.addWidget(self.giantCharCheckBox)

        self.giantCharScaleComboBox = QComboBox(self.horizontalLayoutWidget_4)
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.addItem("")
        self.giantCharScaleComboBox.setObjectName(u"giantCharScaleComboBox")
        self.giantCharScaleComboBox.setEnabled(False)

        self.horizontalLayout.addWidget(self.giantCharScaleComboBox)

        self.horizontalSpacer_2 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout.addItem(self.horizontalSpacer_2)


        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(BmpCharaExcWidget)

        QMetaObject.connectSlotsByName(BmpCharaExcWidget)
    # setupUi

    def retranslateUi(self, BmpCharaExcWidget):
        BmpCharaExcWidget.setWindowTitle(QCoreApplication.translate("BmpCharaExcWidget", u"Character-Specific BMP", None))
        self.bmpLNewButton.setText(QCoreApplication.translate("BmpCharaExcWidget", u"New", None))
        self.bmpLClearButton.setText(QCoreApplication.translate("BmpCharaExcWidget", u"Clear", None))
        self.bmpLCountButton.setText(QCoreApplication.translate("BmpCharaExcWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("BmpCharaExcWidget", u"Name", None))
        self.label_3.setText(QCoreApplication.translate("BmpCharaExcWidget", u"Path", None))
        self.nameSameFileCheckBox.setText(QCoreApplication.translate("BmpCharaExcWidget", u"Same as File Name", None))
        self.pathBrowseButton.setText(QCoreApplication.translate("BmpCharaExcWidget", u"Browse...", None))
        self.giantCharCheckBox.setText(QCoreApplication.translate("BmpCharaExcWidget", u"Giant Character", None))
        self.giantCharScaleComboBox.setItemText(0, QCoreApplication.translate("BmpCharaExcWidget", u"x4", None))
        self.giantCharScaleComboBox.setItemText(1, QCoreApplication.translate("BmpCharaExcWidget", u"x9", None))
        self.giantCharScaleComboBox.setItemText(2, QCoreApplication.translate("BmpCharaExcWidget", u"x16", None))
        self.giantCharScaleComboBox.setItemText(3, QCoreApplication.translate("BmpCharaExcWidget", u"x25", None))
        self.giantCharScaleComboBox.setItemText(4, QCoreApplication.translate("BmpCharaExcWidget", u"x36", None))
        self.giantCharScaleComboBox.setItemText(5, QCoreApplication.translate("BmpCharaExcWidget", u"x49", None))
        self.giantCharScaleComboBox.setItemText(6, QCoreApplication.translate("BmpCharaExcWidget", u"x64", None))
        self.giantCharScaleComboBox.setItemText(7, QCoreApplication.translate("BmpCharaExcWidget", u"x81", None))
        self.giantCharScaleComboBox.setItemText(8, QCoreApplication.translate("BmpCharaExcWidget", u"x100", None))

    # retranslateUi

