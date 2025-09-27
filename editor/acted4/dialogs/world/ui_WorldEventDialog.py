# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'WorldEventDialogWavbuH.ui'
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
from PySide6.QtWidgets import (QAbstractButton, QApplication, QCheckBox, QComboBox,
    QDialogButtonBox, QFrame, QGridLayout, QGroupBox,
    QHBoxLayout, QLabel, QLineEdit, QListWidget,
    QListWidgetItem, QPushButton, QSizePolicy, QSpacerItem,
    QSpinBox, QVBoxLayout, QWidget)

class Ui_WorldEventDialogWidget(object):
    def setupUi(self, WorldEventDialogWidget):
        if not WorldEventDialogWidget.objectName():
            WorldEventDialogWidget.setObjectName(u"WorldEventDialogWidget")
        WorldEventDialogWidget.resize(634, 614)
        self.rootLayout = QVBoxLayout(WorldEventDialogWidget)
        self.rootLayout.setSpacing(6)
        self.rootLayout.setObjectName(u"rootLayout")
        self.rootLayout.setContentsMargins(8, 8, 8, 8)
        self.headerLayout = QHBoxLayout()
        self.headerLayout.setObjectName(u"headerLayout")
        self.eventIconPlaceholder = QLabel(WorldEventDialogWidget)
        self.eventIconPlaceholder.setObjectName(u"eventIconPlaceholder")
        self.eventIconPlaceholder.setMinimumSize(QSize(24, 24))
        self.eventIconPlaceholder.setMaximumSize(QSize(24, 24))
        self.eventIconPlaceholder.setFrameShape(QFrame.Shape.Box)
        self.eventIconPlaceholder.setFrameShadow(QFrame.Shadow.Sunken)
        self.eventIconPlaceholder.setAlignment(Qt.AlignmentFlag.AlignCenter)

        self.headerLayout.addWidget(self.eventIconPlaceholder)

        self.headerForm = QGridLayout()
        self.headerForm.setObjectName(u"headerForm")
        self.placementLabel = QLabel(WorldEventDialogWidget)
        self.placementLabel.setObjectName(u"placementLabel")
        self.placementLabel.setVisible(False)

        self.headerForm.addWidget(self.placementLabel, 2, 0, 1, 1)

        self.eventNameLabel = QLabel(WorldEventDialogWidget)
        self.eventNameLabel.setObjectName(u"eventNameLabel")

        self.headerForm.addWidget(self.eventNameLabel, 0, 0, 1, 1)

        self.eventNameLineEdit = QLineEdit(WorldEventDialogWidget)
        self.eventNameLineEdit.setObjectName(u"eventNameLineEdit")

        self.headerForm.addWidget(self.eventNameLineEdit, 0, 1, 1, 1)

        self.stringsCountLabel = QLabel(WorldEventDialogWidget)
        self.stringsCountLabel.setObjectName(u"stringsCountLabel")
        self.stringsCountLabel.setVisible(False)

        self.headerForm.addWidget(self.stringsCountLabel, 1, 0, 1, 1)

        self.placementWidget = QWidget(WorldEventDialogWidget)
        self.placementWidget.setObjectName(u"placementWidget")
        self.placementWidget.setVisible(False)
        self.placementLayout = QHBoxLayout(self.placementWidget)
        self.placementLayout.setSpacing(4)
        self.placementLayout.setObjectName(u"placementLayout")
        self.placementXLabel = QLabel(self.placementWidget)
        self.placementXLabel.setObjectName(u"placementXLabel")

        self.placementLayout.addWidget(self.placementXLabel)

        self.placementXSpinBox = QSpinBox(self.placementWidget)
        self.placementXSpinBox.setObjectName(u"placementXSpinBox")
        self.placementXSpinBox.setMinimum(0)
        self.placementXSpinBox.setMaximum(999)

        self.placementLayout.addWidget(self.placementXSpinBox)

        self.placementYLabel = QLabel(self.placementWidget)
        self.placementYLabel.setObjectName(u"placementYLabel")

        self.placementLayout.addWidget(self.placementYLabel)

        self.placementYSpinBox = QSpinBox(self.placementWidget)
        self.placementYSpinBox.setObjectName(u"placementYSpinBox")
        self.placementYSpinBox.setMinimum(0)
        self.placementYSpinBox.setMaximum(999)

        self.placementLayout.addWidget(self.placementYSpinBox)


        self.headerForm.addWidget(self.placementWidget, 2, 1, 1, 1)

        self.stringsCountSpinBox = QSpinBox(WorldEventDialogWidget)
        self.stringsCountSpinBox.setObjectName(u"stringsCountSpinBox")
        self.stringsCountSpinBox.setVisible(False)
        self.stringsCountSpinBox.setMinimum(0)
        self.stringsCountSpinBox.setMaximum(99)

        self.headerForm.addWidget(self.stringsCountSpinBox, 1, 1, 1, 1)

        self.horizontalSpacer_7 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.headerForm.addItem(self.horizontalSpacer_7, 0, 2, 1, 1)


        self.headerLayout.addLayout(self.headerForm)


        self.rootLayout.addLayout(self.headerLayout)

        self.contentLayout = QHBoxLayout()
        self.contentLayout.setObjectName(u"contentLayout")
        self.pageListLayout = QVBoxLayout()
        self.pageListLayout.setObjectName(u"pageListLayout")
        self.pageButtonsLayout = QHBoxLayout()
        self.pageButtonsLayout.setObjectName(u"pageButtonsLayout")
        self.pageInsertButton = QPushButton(WorldEventDialogWidget)
        self.pageInsertButton.setObjectName(u"pageInsertButton")
        self.pageInsertButton.setMaximumSize(QSize(40, 22))

        self.pageButtonsLayout.addWidget(self.pageInsertButton)

        self.pageDeleteButton = QPushButton(WorldEventDialogWidget)
        self.pageDeleteButton.setObjectName(u"pageDeleteButton")
        self.pageDeleteButton.setMaximumSize(QSize(40, 22))

        self.pageButtonsLayout.addWidget(self.pageDeleteButton)


        self.pageListLayout.addLayout(self.pageButtonsLayout)

        self.pagesListWidget = QListWidget(WorldEventDialogWidget)
        self.pagesListWidget.setObjectName(u"pagesListWidget")
        self.pagesListWidget.setMinimumSize(QSize(110, 0))

        self.pageListLayout.addWidget(self.pagesListWidget)


        self.contentLayout.addLayout(self.pageListLayout)

        self.pageDataGroup = QGroupBox(WorldEventDialogWidget)
        self.pageDataGroup.setObjectName(u"pageDataGroup")
        self.pageDataGroup.setMinimumSize(QSize(450, 0))
        self.pageDataGroup.setBaseSize(QSize(550, 0))
        self.pageDataLayout = QGridLayout(self.pageDataGroup)
        self.pageDataLayout.setObjectName(u"pageDataLayout")
        self.variationWrapper = QVBoxLayout()
        self.variationWrapper.setObjectName(u"variationWrapper")
        self.variationLayout = QHBoxLayout()
        self.variationLayout.setSpacing(4)
        self.variationLayout.setObjectName(u"variationLayout")
        self.variationPresentCheckBox = QCheckBox(self.pageDataGroup)
        self.variationPresentCheckBox.setObjectName(u"variationPresentCheckBox")

        self.variationLayout.addWidget(self.variationPresentCheckBox)

        self.variationVariableComboBox = QComboBox(self.pageDataGroup)
        self.variationVariableComboBox.setObjectName(u"variationVariableComboBox")
        self.variationVariableComboBox.setMinimumSize(QSize(180, 0))

        self.variationLayout.addWidget(self.variationVariableComboBox)

        self.variationVariablePickerButton = QPushButton(self.pageDataGroup)
        self.variationVariablePickerButton.setObjectName(u"variationVariablePickerButton")
        self.variationVariablePickerButton.setMaximumSize(QSize(24, 22))

        self.variationLayout.addWidget(self.variationVariablePickerButton)

        self.variationEqualsLabel = QLabel(self.pageDataGroup)
        self.variationEqualsLabel.setObjectName(u"variationEqualsLabel")
        self.variationEqualsLabel.setMinimumSize(QSize(20, 0))
        self.variationEqualsLabel.setMaximumSize(QSize(20, 16777215))

        self.variationLayout.addWidget(self.variationEqualsLabel)

        self.variationConstantSpinBox = QSpinBox(self.pageDataGroup)
        self.variationConstantSpinBox.setObjectName(u"variationConstantSpinBox")
        self.variationConstantSpinBox.setMinimumSize(QSize(60, 0))
        self.variationConstantSpinBox.setMinimum(-9999)
        self.variationConstantSpinBox.setMaximum(9999)

        self.variationLayout.addWidget(self.variationConstantSpinBox)


        self.variationWrapper.addLayout(self.variationLayout)

        self.variationHintLabel = QLabel(self.pageDataGroup)
        self.variationHintLabel.setObjectName(u"variationHintLabel")
        self.variationHintLabel.setWordWrap(True)

        self.variationWrapper.addWidget(self.variationHintLabel)


        self.pageDataLayout.addLayout(self.variationWrapper, 6, 0, 1, 2)

        self.worldNameLabel = QLabel(self.pageDataGroup)
        self.worldNameLabel.setObjectName(u"worldNameLabel")

        self.pageDataLayout.addWidget(self.worldNameLabel, 4, 0, 1, 1)

        self.playAfterClearCheckBox = QCheckBox(self.pageDataGroup)
        self.playAfterClearCheckBox.setObjectName(u"playAfterClearCheckBox")

        self.pageDataLayout.addWidget(self.playAfterClearCheckBox, 11, 0, 1, 2)

        self.worldNameLineEdit = QLineEdit(self.pageDataGroup)
        self.worldNameLineEdit.setObjectName(u"worldNameLineEdit")

        self.pageDataLayout.addWidget(self.worldNameLineEdit, 4, 1, 1, 1)

        self.eventTypeLabel = QLabel(self.pageDataGroup)
        self.eventTypeLabel.setObjectName(u"eventTypeLabel")

        self.pageDataLayout.addWidget(self.eventTypeLabel, 2, 0, 1, 1)

        self.horizontalLayout_5 = QHBoxLayout()
        self.horizontalLayout_5.setObjectName(u"horizontalLayout_5")
        self.worldNumberLabel = QLabel(self.pageDataGroup)
        self.worldNumberLabel.setObjectName(u"worldNumberLabel")

        self.horizontalLayout_5.addWidget(self.worldNumberLabel)

        self.worldNumberSpinBox = QSpinBox(self.pageDataGroup)
        self.worldNumberSpinBox.setObjectName(u"worldNumberSpinBox")
        self.worldNumberSpinBox.setMinimumSize(QSize(40, 0))
        self.worldNumberSpinBox.setMinimum(0)
        self.worldNumberSpinBox.setMaximum(99)

        self.horizontalLayout_5.addWidget(self.worldNumberSpinBox)

        self.worldNumberHintLabel = QLabel(self.pageDataGroup)
        self.worldNumberHintLabel.setObjectName(u"worldNumberHintLabel")

        self.horizontalLayout_5.addWidget(self.worldNumberHintLabel)

        self.horizontalSpacer_5 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_5.addItem(self.horizontalSpacer_5)


        self.pageDataLayout.addLayout(self.horizontalLayout_5, 7, 0, 1, 2)

        self.appearanceGroup = QGroupBox(self.pageDataGroup)
        self.appearanceGroup.setObjectName(u"appearanceGroup")
        self.appearanceLayout = QGridLayout(self.appearanceGroup)
        self.appearanceLayout.setObjectName(u"appearanceLayout")
        self.horizontalLayout_2 = QHBoxLayout()
        self.horizontalLayout_2.setSpacing(12)
        self.horizontalLayout_2.setObjectName(u"horizontalLayout_2")
        self.appearanceWorldLabel = QLabel(self.appearanceGroup)
        self.appearanceWorldLabel.setObjectName(u"appearanceWorldLabel")

        self.horizontalLayout_2.addWidget(self.appearanceWorldLabel)

        self.appearanceWorldSpinBox = QSpinBox(self.appearanceGroup)
        self.appearanceWorldSpinBox.setObjectName(u"appearanceWorldSpinBox")
        self.appearanceWorldSpinBox.setMinimumSize(QSize(40, 0))
        self.appearanceWorldSpinBox.setMinimum(0)
        self.appearanceWorldSpinBox.setMaximum(99)

        self.horizontalLayout_2.addWidget(self.appearanceWorldSpinBox)

        self.appearanceWorldHintLabel = QLabel(self.appearanceGroup)
        self.appearanceWorldHintLabel.setObjectName(u"appearanceWorldHintLabel")

        self.horizontalLayout_2.addWidget(self.appearanceWorldHintLabel)

        self.horizontalSpacer_3 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_2.addItem(self.horizontalSpacer_3)


        self.appearanceLayout.addLayout(self.horizontalLayout_2, 0, 0, 1, 3)

        self.horizontalLayout_3 = QHBoxLayout()
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.totalScoreLabel = QLabel(self.appearanceGroup)
        self.totalScoreLabel.setObjectName(u"totalScoreLabel")

        self.horizontalLayout_3.addWidget(self.totalScoreLabel)

        self.totalScoreSpinBox = QSpinBox(self.appearanceGroup)
        self.totalScoreSpinBox.setObjectName(u"totalScoreSpinBox")
        self.totalScoreSpinBox.setMinimum(0)
        self.totalScoreSpinBox.setMaximum(999999)

        self.horizontalLayout_3.addWidget(self.totalScoreSpinBox)

        self.totalScoreHintLabel = QLabel(self.appearanceGroup)
        self.totalScoreHintLabel.setObjectName(u"totalScoreHintLabel")

        self.horizontalLayout_3.addWidget(self.totalScoreHintLabel)

        self.horizontalSpacer_4 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_3.addItem(self.horizontalSpacer_4)


        self.appearanceLayout.addLayout(self.horizontalLayout_3, 3, 0, 1, 3)

        self.horizontalLayout_4 = QHBoxLayout()
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.appearanceVariableComboBox = QComboBox(self.appearanceGroup)
        self.appearanceVariableComboBox.setObjectName(u"appearanceVariableComboBox")
        self.appearanceVariableComboBox.setMinimumSize(QSize(120, 0))

        self.horizontalLayout_4.addWidget(self.appearanceVariableComboBox)

        self.appearanceVariableLayout = QHBoxLayout()
        self.appearanceVariableLayout.setSpacing(4)
        self.appearanceVariableLayout.setObjectName(u"appearanceVariableLayout")
        self.appearanceVariablePickerButton = QPushButton(self.appearanceGroup)
        self.appearanceVariablePickerButton.setObjectName(u"appearanceVariablePickerButton")
        self.appearanceVariablePickerButton.setMaximumSize(QSize(24, 22))

        self.appearanceVariableLayout.addWidget(self.appearanceVariablePickerButton)

        self.appearanceConstantSpinBox = QSpinBox(self.appearanceGroup)
        self.appearanceConstantSpinBox.setObjectName(u"appearanceConstantSpinBox")
        self.appearanceConstantSpinBox.setMinimum(-9999)
        self.appearanceConstantSpinBox.setMaximum(9999)

        self.appearanceVariableLayout.addWidget(self.appearanceConstantSpinBox)

        self.appearanceComparisonComboBox = QComboBox(self.appearanceGroup)
        self.appearanceComparisonComboBox.setObjectName(u"appearanceComparisonComboBox")
        self.appearanceComparisonComboBox.setMinimumContentsLength(1)

        self.appearanceVariableLayout.addWidget(self.appearanceComparisonComboBox)


        self.horizontalLayout_4.addLayout(self.appearanceVariableLayout)


        self.appearanceLayout.addLayout(self.horizontalLayout_4, 1, 0, 1, 3)


        self.pageDataLayout.addWidget(self.appearanceGroup, 0, 0, 1, 2)

        self.startStageLabel = QLabel(self.pageDataGroup)
        self.startStageLabel.setObjectName(u"startStageLabel")

        self.pageDataLayout.addWidget(self.startStageLabel, 5, 0, 1, 1)

        self.graphicLabel = QLabel(self.pageDataGroup)
        self.graphicLabel.setObjectName(u"graphicLabel")

        self.pageDataLayout.addWidget(self.graphicLabel, 1, 0, 1, 1)

        self.startStageLayout = QHBoxLayout()
        self.startStageLayout.setSpacing(4)
        self.startStageLayout.setObjectName(u"startStageLayout")
        self.startStageLineEdit = QLineEdit(self.pageDataGroup)
        self.startStageLineEdit.setObjectName(u"startStageLineEdit")

        self.startStageLayout.addWidget(self.startStageLineEdit)

        self.startStageBrowseButton = QPushButton(self.pageDataGroup)
        self.startStageBrowseButton.setObjectName(u"startStageBrowseButton")

        self.startStageLayout.addWidget(self.startStageBrowseButton)


        self.pageDataLayout.addLayout(self.startStageLayout, 5, 1, 1, 1)

        self.horizontalLayout = QHBoxLayout()
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.eventTypeComboBox = QComboBox(self.pageDataGroup)
        self.eventTypeComboBox.setObjectName(u"eventTypeComboBox")
        self.eventTypeComboBox.setMinimumSize(QSize(120, 0))

        self.horizontalLayout.addWidget(self.eventTypeComboBox)

        self.horizontalSpacer_2 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout.addItem(self.horizontalSpacer_2)


        self.pageDataLayout.addLayout(self.horizontalLayout, 2, 1, 1, 1)

        self.horizontalLayout_6 = QHBoxLayout()
        self.horizontalLayout_6.setObjectName(u"horizontalLayout_6")
        self.onGameClearLabel = QLabel(self.pageDataGroup)
        self.onGameClearLabel.setObjectName(u"onGameClearLabel")

        self.horizontalLayout_6.addWidget(self.onGameClearLabel)

        self.onGameClearComboBox = QComboBox(self.pageDataGroup)
        self.onGameClearComboBox.setObjectName(u"onGameClearComboBox")
        self.onGameClearComboBox.setMinimumSize(QSize(180, 0))
        self.onGameClearComboBox.setBaseSize(QSize(180, 0))

        self.horizontalLayout_6.addWidget(self.onGameClearComboBox)

        self.horizontalSpacer_6 = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.horizontalLayout_6.addItem(self.horizontalSpacer_6)


        self.pageDataLayout.addLayout(self.horizontalLayout_6, 12, 0, 1, 2)

        self.passWithoutClearCheckBox = QCheckBox(self.pageDataGroup)
        self.passWithoutClearCheckBox.setObjectName(u"passWithoutClearCheckBox")

        self.pageDataLayout.addWidget(self.passWithoutClearCheckBox, 10, 0, 1, 2)

        self.graphicLayout = QHBoxLayout()
        self.graphicLayout.setSpacing(4)
        self.graphicLayout.setObjectName(u"graphicLayout")
        self.graphicLayout.setContentsMargins(-1, -1, -1, 0)
        self.graphicComboBox = QComboBox(self.pageDataGroup)
        self.graphicComboBox.setObjectName(u"graphicComboBox")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.graphicComboBox.sizePolicy().hasHeightForWidth())
        self.graphicComboBox.setSizePolicy(sizePolicy)
        self.graphicComboBox.setMinimumSize(QSize(50, 0))

        self.graphicLayout.addWidget(self.graphicComboBox)

        self.graphicPickerButton = QPushButton(self.pageDataGroup)
        self.graphicPickerButton.setObjectName(u"graphicPickerButton")
        self.graphicPickerButton.setMaximumSize(QSize(24, 22))

        self.graphicLayout.addWidget(self.graphicPickerButton)

        self.graphicPreview = QLabel(self.pageDataGroup)
        self.graphicPreview.setObjectName(u"graphicPreview")
        self.graphicPreview.setMinimumSize(QSize(24, 24))
        self.graphicPreview.setMaximumSize(QSize(24, 24))
        self.graphicPreview.setFrameShape(QFrame.Shape.Box)
        self.graphicPreview.setFrameShadow(QFrame.Shadow.Sunken)

        self.graphicLayout.addWidget(self.graphicPreview)

        self.horizontalSpacer = QSpacerItem(40, 20, QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)

        self.graphicLayout.addItem(self.horizontalSpacer)


        self.pageDataLayout.addLayout(self.graphicLayout, 1, 1, 1, 1)


        self.contentLayout.addWidget(self.pageDataGroup)


        self.rootLayout.addLayout(self.contentLayout)

        self.buttonBox = QDialogButtonBox(WorldEventDialogWidget)
        self.buttonBox.setObjectName(u"buttonBox")
        self.buttonBox.setOrientation(Qt.Orientation.Horizontal)
        self.buttonBox.setStandardButtons(QDialogButtonBox.StandardButton.Cancel|QDialogButtonBox.StandardButton.Ok)

        self.rootLayout.addWidget(self.buttonBox)


        self.retranslateUi(WorldEventDialogWidget)

        QMetaObject.connectSlotsByName(WorldEventDialogWidget)
    # setupUi

    def retranslateUi(self, WorldEventDialogWidget):
        WorldEventDialogWidget.setWindowTitle(QCoreApplication.translate("WorldEventDialogWidget", u"World Event", None))
        self.eventIconPlaceholder.setText("")
        self.placementLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Placement", None))
        self.eventNameLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Event Name", None))
        self.stringsCountLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"String Slots", None))
        self.placementXLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"X", None))
        self.placementYLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Y", None))
        self.pageInsertButton.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Insert", None))
        self.pageDeleteButton.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Delete", None))
        self.pageDataGroup.setTitle(QCoreApplication.translate("WorldEventDialogWidget", u"Page Data", None))
        self.variationPresentCheckBox.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Variation", None))
        self.variationVariablePickerButton.setText(QCoreApplication.translate("WorldEventDialogWidget", u"...", None))
        self.variationEqualsLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"=", None))
        self.variationHintLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"\u2606Change common variables before world starts. Example: Use common variable \"Difficulty\" to separate Normal and Hard modes", None))
        self.worldNameLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"World Name", None))
        self.playAfterClearCheckBox.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Playable after clearing", None))
        self.eventTypeLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Event Type", None))
        self.worldNumberLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"World Number", None))
        self.worldNumberHintLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"\u203b0 means no number (cleared from the start)", None))
        self.appearanceGroup.setTitle(QCoreApplication.translate("WorldEventDialogWidget", u"Appearance Condition", None))
        self.appearanceWorldLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"World", None))
        self.appearanceWorldHintLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"to clear (0 means always appear)", None))
        self.totalScoreLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Total Score", None))
        self.totalScoreHintLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"or above", None))
        self.appearanceVariablePickerButton.setText(QCoreApplication.translate("WorldEventDialogWidget", u"...", None))
        self.startStageLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Start Stage", None))
        self.graphicLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Graphic", None))
        self.startStageBrowseButton.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Browse", None))
        self.onGameClearLabel.setText(QCoreApplication.translate("WorldEventDialogWidget", u"On Game Clear", None))
        self.passWithoutClearCheckBox.setText(QCoreApplication.translate("WorldEventDialogWidget", u"Passable without clearing", None))
        self.graphicPickerButton.setText(QCoreApplication.translate("WorldEventDialogWidget", u"...", None))
        self.graphicPreview.setText("")
    # retranslateUi

