# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'SoundUNSWlm.ui'
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

class Ui_SoundWidget(object):
    def setupUi(self, SoundWidget):
        if not SoundWidget.objectName():
            SoundWidget.setObjectName(u"SoundWidget")
        SoundWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(SoundWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.soundVList = QVBoxLayout()
        self.soundVList.setObjectName(u"soundVList")
        self.soundVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.soundVList.setContentsMargins(8, 8, 8, 8)
        self.soundList = QListWidget(SoundWidget)
        self.soundList.setObjectName(u"soundList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.soundList.sizePolicy().hasHeightForWidth())
        self.soundList.setSizePolicy(sizePolicy)

        self.soundVList.addWidget(self.soundList)

        self.soundLButtons = QHBoxLayout()
        self.soundLButtons.setObjectName(u"soundLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.soundLButtons.addItem(self.horizontalSpacer)

        self.soundLNewButton = QPushButton(SoundWidget)
        self.soundLNewButton.setObjectName(u"soundLNewButton")
        self.soundLNewButton.setMaximumSize(QSize(80, 24))

        self.soundLButtons.addWidget(self.soundLNewButton)

        self.soundLClearButton = QPushButton(SoundWidget)
        self.soundLClearButton.setObjectName(u"soundLClearButton")
        self.soundLClearButton.setMaximumSize(QSize(80, 24))

        self.soundLButtons.addWidget(self.soundLClearButton)

        self.soundLCountButton = QPushButton(SoundWidget)
        self.soundLCountButton.setObjectName(u"soundLCountButton")
        self.soundLCountButton.setMaximumSize(QSize(80, 24))

        self.soundLButtons.addWidget(self.soundLCountButton)


        self.soundVList.addLayout(self.soundLButtons)


        self.horizontalLayout_3.addLayout(self.soundVList)

        self.widget = QWidget(SoundWidget)
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

        self.label = QLabel(self.widget)
        self.label.setObjectName(u"label")
        self.label.setGeometry(QRect(10, 100, 356, 56))

        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(SoundWidget)

        QMetaObject.connectSlotsByName(SoundWidget)
    # setupUi

    def retranslateUi(self, SoundWidget):
        SoundWidget.setWindowTitle(QCoreApplication.translate("SoundWidget", u"Sound", None))
        self.soundLNewButton.setText(QCoreApplication.translate("SoundWidget", u"New", None))
        self.soundLClearButton.setText(QCoreApplication.translate("SoundWidget", u"Clear", None))
        self.soundLCountButton.setText(QCoreApplication.translate("SoundWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("SoundWidget", u"Name", None))
        self.label_3.setText(QCoreApplication.translate("SoundWidget", u"Path", None))
        self.nameSameFileCheckBox.setText(QCoreApplication.translate("SoundWidget", u"Same as File Name", None))
        self.pathBrowseButton.setText(QCoreApplication.translate("SoundWidget", u"Browse...", None))
        self.label.setText(QCoreApplication.translate("SoundWidget", u"* Only standard (non-compressed) PCM format is supported when\n"
"the Wave extension format is disabled.If the game does not\n"
"play the sound, please convert it to a supported format.", None))
    # retranslateUi

