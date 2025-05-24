# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'AnimePatternuUNssn.ui'
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
from PySide6.QtWidgets import (QAbstractButton, QApplication, QCheckBox, QDialog,
    QDialogButtonBox, QFrame, QGridLayout, QHBoxLayout,
    QLabel, QListWidget, QListWidgetItem, QPushButton,
    QSizePolicy, QSpinBox, QWidget)

class Ui_AnimePatternDialog(object):
    def setupUi(self, AnimePatternDialog):
        if not AnimePatternDialog.objectName():
            AnimePatternDialog.setObjectName(u"AnimePatternDialog")
        AnimePatternDialog.resize(400, 300)
        self.buttonBox = QDialogButtonBox(AnimePatternDialog)
        self.buttonBox.setObjectName(u"buttonBox")
        self.buttonBox.setGeometry(QRect(30, 240, 341, 32))
        self.buttonBox.setOrientation(Qt.Orientation.Horizontal)
        self.buttonBox.setStandardButtons(QDialogButtonBox.StandardButton.Cancel|QDialogButtonBox.StandardButton.Ok)
        self.layoutWidget = QWidget(AnimePatternDialog)
        self.layoutWidget.setObjectName(u"layoutWidget")
        self.layoutWidget.setGeometry(QRect(20, 20, 158, 26))
        self.animePatLButtons = QHBoxLayout(self.layoutWidget)
        self.animePatLButtons.setObjectName(u"animePatLButtons")
        self.animePatLButtons.setContentsMargins(0, 0, 0, 0)
        self.insertPatButton = QPushButton(self.layoutWidget)
        self.insertPatButton.setObjectName(u"insertPatButton")
        self.insertPatButton.setMaximumSize(QSize(80, 24))

        self.animePatLButtons.addWidget(self.insertPatButton)

        self.deletePatButton = QPushButton(self.layoutWidget)
        self.deletePatButton.setObjectName(u"deletePatButton")
        self.deletePatButton.setMaximumSize(QSize(80, 24))

        self.animePatLButtons.addWidget(self.deletePatButton)

        self.patternsListWidget = QListWidget(AnimePatternDialog)
        self.patternsListWidget.setObjectName(u"patternsListWidget")
        self.patternsListWidget.setGeometry(QRect(20, 55, 156, 181))
        self.gridLayoutWidget = QWidget(AnimePatternDialog)
        self.gridLayoutWidget.setObjectName(u"gridLayoutWidget")
        self.gridLayoutWidget.setGeometry(QRect(200, 65, 133, 80))
        self.gridLayout = QGridLayout(self.gridLayoutWidget)
        self.gridLayout.setObjectName(u"gridLayout")
        self.gridLayout.setContentsMargins(0, 0, 0, 0)
        self.execComCheckBox = QCheckBox(self.gridLayoutWidget)
        self.execComCheckBox.setObjectName(u"execComCheckBox")

        self.gridLayout.addWidget(self.execComCheckBox, 0, 0, 1, 1)

        self.horizontalLayout = QHBoxLayout()
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.frameLabel = QLabel(self.gridLayoutWidget)
        self.frameLabel.setObjectName(u"frameLabel")

        self.horizontalLayout.addWidget(self.frameLabel)

        self.frameSpinBox = QSpinBox(self.gridLayoutWidget)
        self.frameSpinBox.setObjectName(u"frameSpinBox")

        self.horizontalLayout.addWidget(self.frameSpinBox)


        self.gridLayout.addLayout(self.horizontalLayout, 1, 0, 1, 1)

        self.horizontalLayout_2 = QHBoxLayout()
        self.horizontalLayout_2.setObjectName(u"horizontalLayout_2")
        self.timeLabel = QLabel(self.gridLayoutWidget)
        self.timeLabel.setObjectName(u"timeLabel")

        self.horizontalLayout_2.addWidget(self.timeLabel)

        self.timeSpinBox = QSpinBox(self.gridLayoutWidget)
        self.timeSpinBox.setObjectName(u"timeSpinBox")

        self.horizontalLayout_2.addWidget(self.timeSpinBox)


        self.gridLayout.addLayout(self.horizontalLayout_2, 2, 0, 1, 1)

        self.previewFrame = QFrame(AnimePatternDialog)
        self.previewFrame.setObjectName(u"previewFrame")
        self.previewFrame.setGeometry(QRect(340, 90, 24, 24))
        self.previewFrame.setAutoFillBackground(False)
        self.previewFrame.setFrameShape(QFrame.Shape.Box)
        self.previewFrame.setFrameShadow(QFrame.Shadow.Plain)

        self.retranslateUi(AnimePatternDialog)
        self.buttonBox.accepted.connect(AnimePatternDialog.accept)
        self.buttonBox.rejected.connect(AnimePatternDialog.reject)

        QMetaObject.connectSlotsByName(AnimePatternDialog)
    # setupUi

    def retranslateUi(self, AnimePatternDialog):
        AnimePatternDialog.setWindowTitle(QCoreApplication.translate("AnimePatternDialog", u"Anime Pattern", None))
        self.insertPatButton.setText(QCoreApplication.translate("AnimePatternDialog", u"Insert", None))
        self.deletePatButton.setText(QCoreApplication.translate("AnimePatternDialog", u"Delete", None))
        self.execComCheckBox.setText(QCoreApplication.translate("AnimePatternDialog", u"Execute commands", None))
        self.frameLabel.setText(QCoreApplication.translate("AnimePatternDialog", u"Frame", None))
        self.timeLabel.setText(QCoreApplication.translate("AnimePatternDialog", u"Time (0.1s)", None))
    # retranslateUi

