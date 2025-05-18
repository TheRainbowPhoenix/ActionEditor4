# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'Pictureqjpvci.ui'
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
    QListWidgetItem, QPushButton, QSizePolicy, QSpacerItem,
    QVBoxLayout, QWidget)

class Ui_PictureWidget(object):
    def setupUi(self, PictureWidget):
        if not PictureWidget.objectName():
            PictureWidget.setObjectName(u"PictureWidget")
        PictureWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(PictureWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.pictVList = QVBoxLayout()
        self.pictVList.setObjectName(u"pictVList")
        self.pictVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.pictVList.setContentsMargins(8, 8, 8, 8)
        self.pictList = QListWidget(PictureWidget)
        self.pictList.setObjectName(u"pictList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.pictList.sizePolicy().hasHeightForWidth())
        self.pictList.setSizePolicy(sizePolicy)

        self.pictVList.addWidget(self.pictList)

        self.pictLButtons = QHBoxLayout()
        self.pictLButtons.setObjectName(u"pictLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.pictLButtons.addItem(self.horizontalSpacer)

        self.pictLNewButton = QPushButton(PictureWidget)
        self.pictLNewButton.setObjectName(u"pictLNewButton")
        self.pictLNewButton.setMaximumSize(QSize(80, 24))

        self.pictLButtons.addWidget(self.pictLNewButton)

        self.pictLClearButton = QPushButton(PictureWidget)
        self.pictLClearButton.setObjectName(u"pictLClearButton")
        self.pictLClearButton.setMaximumSize(QSize(80, 24))

        self.pictLButtons.addWidget(self.pictLClearButton)

        self.pictLCountButton = QPushButton(PictureWidget)
        self.pictLCountButton.setObjectName(u"pictLCountButton")
        self.pictLCountButton.setMaximumSize(QSize(80, 24))

        self.pictLButtons.addWidget(self.pictLCountButton)


        self.pictVList.addLayout(self.pictLButtons)


        self.horizontalLayout_3.addLayout(self.pictVList)

        self.widget = QWidget(PictureWidget)
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


        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(PictureWidget)

        QMetaObject.connectSlotsByName(PictureWidget)
    # setupUi

    def retranslateUi(self, PictureWidget):
        PictureWidget.setWindowTitle(QCoreApplication.translate("PictureWidget", u"Picture", None))
        self.pictLNewButton.setText(QCoreApplication.translate("PictureWidget", u"New", None))
        self.pictLClearButton.setText(QCoreApplication.translate("PictureWidget", u"Clear", None))
        self.pictLCountButton.setText(QCoreApplication.translate("PictureWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("PictureWidget", u"Name", None))
        self.label_3.setText(QCoreApplication.translate("PictureWidget", u"Path", None))
        self.nameSameFileCheckBox.setText(QCoreApplication.translate("PictureWidget", u"Same as File Name", None))
        self.pathBrowseButton.setText(QCoreApplication.translate("PictureWidget", u"Browse...", None))
    # retranslateUi

