# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'CharaEffectdywzhG.ui'
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
from PySide6.QtWidgets import (QApplication, QComboBox, QGridLayout, QHBoxLayout,
    QLabel, QLayout, QLineEdit, QListWidget,
    QListWidgetItem, QPushButton, QSizePolicy, QSpacerItem,
    QSpinBox, QVBoxLayout, QWidget)

class Ui_CharaEffectWidget(object):
    def setupUi(self, CharaEffectWidget):
        if not CharaEffectWidget.objectName():
            CharaEffectWidget.setObjectName(u"CharaEffectWidget")
        CharaEffectWidget.resize(680, 450)
        self.horizontalLayout_3 = QHBoxLayout(CharaEffectWidget)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.horizontalLayout_3.setContentsMargins(0, 0, 0, 0)
        self.charaFxVList = QVBoxLayout()
        self.charaFxVList.setObjectName(u"charaFxVList")
        self.charaFxVList.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.charaFxVList.setContentsMargins(8, 8, 8, 8)
        self.charaFxList = QListWidget(CharaEffectWidget)
        self.charaFxList.setObjectName(u"charaFxList")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.MinimumExpanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.charaFxList.sizePolicy().hasHeightForWidth())
        self.charaFxList.setSizePolicy(sizePolicy)

        self.charaFxVList.addWidget(self.charaFxList)

        self.charaFxLButtons = QHBoxLayout()
        self.charaFxLButtons.setObjectName(u"charaFxLButtons")
        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.charaFxLButtons.addItem(self.horizontalSpacer)

        self.charaFxLNewButton = QPushButton(CharaEffectWidget)
        self.charaFxLNewButton.setObjectName(u"charaFxLNewButton")
        self.charaFxLNewButton.setMaximumSize(QSize(80, 24))

        self.charaFxLButtons.addWidget(self.charaFxLNewButton)

        self.charaFxLClearButton = QPushButton(CharaEffectWidget)
        self.charaFxLClearButton.setObjectName(u"charaFxLClearButton")
        self.charaFxLClearButton.setMaximumSize(QSize(80, 24))

        self.charaFxLButtons.addWidget(self.charaFxLClearButton)

        self.charaFxLCountButton = QPushButton(CharaEffectWidget)
        self.charaFxLCountButton.setObjectName(u"charaFxLCountButton")
        self.charaFxLCountButton.setMaximumSize(QSize(80, 24))

        self.charaFxLButtons.addWidget(self.charaFxLCountButton)


        self.charaFxVList.addLayout(self.charaFxLButtons)


        self.horizontalLayout_3.addLayout(self.charaFxVList)

        self.widget = QWidget(CharaEffectWidget)
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
        self.gridLayoutWidget.setGeometry(QRect(5, 15, 371, 108))
        self.gridLayout = QGridLayout(self.gridLayoutWidget)
        self.gridLayout.setObjectName(u"gridLayout")
        self.gridLayout.setContentsMargins(0, 0, 0, 0)
        self.horizontalLayout_4 = QHBoxLayout()
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.nameLineEdit = QLineEdit(self.gridLayoutWidget)
        self.nameLineEdit.setObjectName(u"nameLineEdit")
        self.nameLineEdit.setMinimumSize(QSize(250, 0))

        self.horizontalLayout_4.addWidget(self.nameLineEdit)

        self.horizontalSpacer_3 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_4.addItem(self.horizontalSpacer_3)


        self.gridLayout.addLayout(self.horizontalLayout_4, 0, 1, 1, 1)

        self.label_3 = QLabel(self.gridLayoutWidget)
        self.label_3.setObjectName(u"label_3")

        self.gridLayout.addWidget(self.label_3, 1, 0, 1, 1)

        self.horizontalLayout_6 = QHBoxLayout()
        self.horizontalLayout_6.setObjectName(u"horizontalLayout_6")
        self.effectComboBox = QComboBox(self.gridLayoutWidget)
        self.effectComboBox.setObjectName(u"effectComboBox")
        self.effectComboBox.setMinimumSize(QSize(150, 0))
        self.effectComboBox.setBaseSize(QSize(150, 0))

        self.horizontalLayout_6.addWidget(self.effectComboBox)

        self.horizontalSpacer_2 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_6.addItem(self.horizontalSpacer_2)


        self.gridLayout.addLayout(self.horizontalLayout_6, 1, 1, 1, 1)

        self.label_2 = QLabel(self.gridLayoutWidget)
        self.label_2.setObjectName(u"label_2")

        self.gridLayout.addWidget(self.label_2, 0, 0, 1, 1)

        self.labelNote = QLabel(self.gridLayoutWidget)
        self.labelNote.setObjectName(u"labelNote")

        self.gridLayout.addWidget(self.labelNote, 2, 1, 1, 1)

        self.gridLayoutWidget_2 = QWidget(self.widget)
        self.gridLayoutWidget_2.setObjectName(u"gridLayoutWidget_2")
        self.gridLayoutWidget_2.setGeometry(QRect(40, 130, 246, 131))
        self.gridLayout_2 = QGridLayout(self.gridLayoutWidget_2)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.gridLayout_2.setContentsMargins(0, 0, 0, 0)
        self.param3Label = QLabel(self.gridLayoutWidget_2)
        self.param3Label.setObjectName(u"param3Label")

        self.gridLayout_2.addWidget(self.param3Label, 2, 0, 1, 1)

        self.param1SpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.param1SpinBox.setObjectName(u"param1SpinBox")
        self.param1SpinBox.setMinimumSize(QSize(60, 0))
        self.param1SpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.param1SpinBox, 0, 1, 1, 1)

        self.param1Label = QLabel(self.gridLayoutWidget_2)
        self.param1Label.setObjectName(u"param1Label")

        self.gridLayout_2.addWidget(self.param1Label, 0, 0, 1, 1)

        self.param2SpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.param2SpinBox.setObjectName(u"param2SpinBox")
        self.param2SpinBox.setMinimumSize(QSize(60, 0))
        self.param2SpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.param2SpinBox, 1, 1, 1, 1)

        self.param2Label = QLabel(self.gridLayoutWidget_2)
        self.param2Label.setObjectName(u"param2Label")

        self.gridLayout_2.addWidget(self.param2Label, 1, 0, 1, 1)

        self.param4Label = QLabel(self.gridLayoutWidget_2)
        self.param4Label.setObjectName(u"param4Label")

        self.gridLayout_2.addWidget(self.param4Label, 3, 0, 1, 1)

        self.param5Label = QLabel(self.gridLayoutWidget_2)
        self.param5Label.setObjectName(u"param5Label")

        self.gridLayout_2.addWidget(self.param5Label, 4, 0, 1, 1)

        self.param3SpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.param3SpinBox.setObjectName(u"param3SpinBox")
        self.param3SpinBox.setMinimumSize(QSize(60, 0))
        self.param3SpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.param3SpinBox, 2, 1, 1, 1)

        self.param4SpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.param4SpinBox.setObjectName(u"param4SpinBox")
        self.param4SpinBox.setMinimumSize(QSize(60, 0))
        self.param4SpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.param4SpinBox, 3, 1, 1, 1)

        self.param5SpinBox = QSpinBox(self.gridLayoutWidget_2)
        self.param5SpinBox.setObjectName(u"param5SpinBox")
        self.param5SpinBox.setMinimumSize(QSize(60, 0))
        self.param5SpinBox.setMaximumSize(QSize(80, 16777215))

        self.gridLayout_2.addWidget(self.param5SpinBox, 4, 1, 1, 1)


        self.horizontalLayout_3.addWidget(self.widget)


        self.retranslateUi(CharaEffectWidget)

        QMetaObject.connectSlotsByName(CharaEffectWidget)
    # setupUi

    def retranslateUi(self, CharaEffectWidget):
        CharaEffectWidget.setWindowTitle(QCoreApplication.translate("CharaEffectWidget", u"Character Effect", None))
        self.charaFxLNewButton.setText(QCoreApplication.translate("CharaEffectWidget", u"New", None))
        self.charaFxLClearButton.setText(QCoreApplication.translate("CharaEffectWidget", u"Clear", None))
        self.charaFxLCountButton.setText(QCoreApplication.translate("CharaEffectWidget", u"Count", None))
        self.label_3.setText(QCoreApplication.translate("CharaEffectWidget", u"Effect", None))
        self.label_2.setText(QCoreApplication.translate("CharaEffectWidget", u"Name", None))
        self.labelNote.setText(QCoreApplication.translate("CharaEffectWidget", u"Note", None))
        self.param3Label.setText(QCoreApplication.translate("CharaEffectWidget", u"Parameter", None))
        self.param1Label.setText(QCoreApplication.translate("CharaEffectWidget", u"Parameter", None))
        self.param2Label.setText(QCoreApplication.translate("CharaEffectWidget", u"Parameter", None))
        self.param4Label.setText(QCoreApplication.translate("CharaEffectWidget", u"Parameter", None))
        self.param5Label.setText(QCoreApplication.translate("CharaEffectWidget", u"Parameter", None))
    # retranslateUi

