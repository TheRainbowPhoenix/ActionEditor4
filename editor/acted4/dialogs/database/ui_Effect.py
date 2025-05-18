# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'EffectJVCOJP.ui'
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
    QSpacerItem, QSpinBox, QVBoxLayout, QWidget)

class Ui_EffectWidget(object):
    def setupUi(self, EffectWidget):
        if not EffectWidget.objectName():
            EffectWidget.setObjectName(u"EffectWidget")
        EffectWidget.resize(678, 450)
        self.horizontalLayout_3 = QHBoxLayout(EffectWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.effectVList = QVBoxLayout()
        self.effectVList.setObjectName(u"effectVList")
        self.effectVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.effectVList.setContentsMargins(8, 8, 8, 8)
        self.effectList = QListWidget(EffectWidget)
        self.effectList.setObjectName(u"effectList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.effectList.sizePolicy().hasHeightForWidth())
        self.effectList.setSizePolicy(sizePolicy)

        self.effectVList.addWidget(self.effectList)

        self.effectLButtons = QHBoxLayout()
        self.effectLButtons.setObjectName(u"effectLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.effectLButtons.addItem(self.horizontalSpacer)

        self.effectLNewButton = QPushButton(EffectWidget)
        self.effectLNewButton.setObjectName(u"effectLNewButton")
        self.effectLNewButton.setMaximumSize(QSize(80, 24))

        self.effectLButtons.addWidget(self.effectLNewButton)

        self.effectLClearButton = QPushButton(EffectWidget)
        self.effectLClearButton.setObjectName(u"effectLClearButton")
        self.effectLClearButton.setMaximumSize(QSize(80, 24))

        self.effectLButtons.addWidget(self.effectLClearButton)

        self.effectLCountButton = QPushButton(EffectWidget)
        self.effectLCountButton.setObjectName(u"effectLCountButton")
        self.effectLCountButton.setMaximumSize(QSize(80, 24))

        self.effectLButtons.addWidget(self.effectLCountButton)


        self.effectVList.addLayout(self.effectLButtons)


        self.horizontalLayout_3.addLayout(self.effectVList)

        self.widget = QWidget(EffectWidget)
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

        self.gridLayoutWidget_2 = QWidget(self.widget)
        self.gridLayoutWidget_2.setObjectName(u"gridLayoutWidget_2")
        self.gridLayoutWidget_2.setGeometry(QRect(10, 100, 246, 56))
        self.gridLayout_2 = QGridLayout(self.gridLayoutWidget_2)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.gridLayout_2.setContentsMargins(0, 0, 0, 0)
        self.widthSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.widthSpinBox.setObjectName(u"widthSpinBox")
        self.widthSpinBox.setMinimumSize(QSize(60, 0))
        self.widthSpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.widthSpinBox, 0, 1, 1, 1)

        self.heightLabel = QLabel(self.gridLayoutWidget_2)
        self.heightLabel.setObjectName(u"heightLabel")

        self.gridLayout_2.addWidget(self.heightLabel, 1, 0, 1, 1)

        self.heightSpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.heightSpinBox.setObjectName(u"heightSpinBox")
        self.heightSpinBox.setMinimumSize(QSize(60, 0))
        self.heightSpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.heightSpinBox, 1, 1, 1, 1)

        self.widthLabel = QLabel(self.gridLayoutWidget_2)
        self.widthLabel.setObjectName(u"widthLabel")

        self.gridLayout_2.addWidget(self.widthLabel, 0, 0, 1, 1)

        self.allowGiantCheckBox = QCheckBox(self.widget)
        self.allowGiantCheckBox.setObjectName(u"allowGiantCheckBox")
        self.allowGiantCheckBox.setGeometry(QRect(10, 165, 241, 20))
        self.animationGroupBox = QGroupBox(self.widget)
        self.animationGroupBox.setObjectName(u"animationGroupBox")
        self.animationGroupBox.setGeometry(QRect(10, 195, 281, 191))
        self.layoutWidget = QWidget(self.animationGroupBox)
        self.layoutWidget.setObjectName(u"layoutWidget")
        self.layoutWidget.setGeometry(QRect(15, 20, 245, 26))
        self.effectLButtons_2 = QHBoxLayout(self.layoutWidget)
        self.effectLButtons_2.setObjectName(u"effectLButtons_2")
        self.effectLButtons_2.setContentsMargins(0, 0, 0, 0)
        self.insertAnimButton = QPushButton(self.layoutWidget)
        self.insertAnimButton.setObjectName(u"insertAnimButton")
        self.insertAnimButton.setMaximumSize(QSize(80, 24))

        self.effectLButtons_2.addWidget(self.insertAnimButton)

        self.editAnimButton = QPushButton(self.layoutWidget)
        self.editAnimButton.setObjectName(u"editAnimButton")
        self.editAnimButton.setMaximumSize(QSize(80, 24))

        self.effectLButtons_2.addWidget(self.editAnimButton)

        self.deleteAnimButton = QPushButton(self.layoutWidget)
        self.deleteAnimButton.setObjectName(u"deleteAnimButton")
        self.deleteAnimButton.setMaximumSize(QSize(80, 24))

        self.effectLButtons_2.addWidget(self.deleteAnimButton)

        self.horizontalSpacer_2 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.effectLButtons_2.addItem(self.horizontalSpacer_2)

        self.animationListWidget = QListWidget(self.animationGroupBox)
        self.animationListWidget.setObjectName(u"animationListWidget")
        self.animationListWidget.setGeometry(QRect(15, 55, 246, 121))

        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(EffectWidget)

        QMetaObject.connectSlotsByName(EffectWidget)
    # setupUi

    def retranslateUi(self, EffectWidget):
        EffectWidget.setWindowTitle(QCoreApplication.translate("EffectWidget", u"Effect", None))
        self.effectLNewButton.setText(QCoreApplication.translate("EffectWidget", u"New", None))
        self.effectLClearButton.setText(QCoreApplication.translate("EffectWidget", u"Clear", None))
        self.effectLCountButton.setText(QCoreApplication.translate("EffectWidget", u"Count", None))
        self.label_2.setText(QCoreApplication.translate("EffectWidget", u"Name", None))
        self.label_3.setText(QCoreApplication.translate("EffectWidget", u"Path", None))
        self.nameSameFileCheckBox.setText(QCoreApplication.translate("EffectWidget", u"Same as File Name", None))
        self.pathBrowseButton.setText(QCoreApplication.translate("EffectWidget", u"Browse...", None))
        self.heightLabel.setText(QCoreApplication.translate("EffectWidget", u"Height", None))
        self.widthLabel.setText(QCoreApplication.translate("EffectWidget", u"Width", None))
        self.allowGiantCheckBox.setText(QCoreApplication.translate("EffectWidget", u"Allow Giant Size", None))
        self.animationGroupBox.setTitle(QCoreApplication.translate("EffectWidget", u"Animation", None))
        self.insertAnimButton.setText(QCoreApplication.translate("EffectWidget", u"Insert", None))
        self.editAnimButton.setText(QCoreApplication.translate("EffectWidget", u"Edit", None))
        self.deleteAnimButton.setText(QCoreApplication.translate("EffectWidget", u"Delete", None))
    # retranslateUi

