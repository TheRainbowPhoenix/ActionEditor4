from PySide6.QtWidgets import QWidget, QListWidget, QPushButton, QInputDialog, QMessageBox
from ...core.project import ProjectData
from typing import Any, Callable, List

class BaseTabWidget(QWidget):
    def __init__(self, project: ProjectData, parent=None):
        super().__init__(parent)
        self.project = project
        self._is_dirty = False
        self._updating = False
        
    @property
    def is_dirty(self) -> bool:
        """Check if data has been modified"""
        return self._is_dirty
        
    def mark_dirty(self):
        """Mark data as modified"""
        self._is_dirty = True
        
    def apply_changes(self) -> bool:
        """Apply changes to project data"""
        return True
        
    def reset_changes(self):
        """Reset any pending changes"""
        self._is_dirty = False

class SideListTabWidget(BaseTabWidget):
    def __init__(self, project: ProjectData, parent=None, skip_first=False):
        super().__init__(project, parent)
        self._list_data = None
        self._format_item = None
        self.skip_first = skip_first

    @property
    def list_data(self):
        """Get the list, skipping index 0 if skip_first is True."""
        if self.skip_first:
            return self._list_data[1:]
        return self._list_data

    @list_data.setter
    def list_data(self, value):
        """Set the list, keeping index 0 as a placeholder if skip_first is True."""
        if self.skip_first:
            # Index 0 is reserved/hidden: keep its current value or set as None
            current_zero = self._list_data[0] if self._list_data else None
            self._list_data = [current_zero] + list(value)
        else:
            self._list_data = list(value)

    def set_list_item(self, idx, value):
        real_idx = idx + 1 if self.skip_first else idx
        self._list_data[real_idx] = value

    def _update_format(self, total_items: int) -> None:
        """Update format based on number of items"""
        if self.skip_first:
            if total_items > 99:
                self._format_item = lambda i, e: f"{i:03d} {e.name}"
            elif total_items > 9:
                self._format_item = lambda i, e: f"{i:02d} {e.name}"
            else:
                self._format_item = lambda i, e: f"{i} {e.name}"
        else:
            if total_items > 99:
                self._format_item = lambda i, e: f"{i+1:03d} {e.name}"
            elif total_items > 9:
                self._format_item = lambda i, e: f"{i+1:02d} {e.name}"
            else:
                self._format_item = lambda i, e: f"{i+1} {e.name}"
            
    def _refresh_format_and_list(self, list_widget: QListWidget):
        """Update format and refresh all items"""
        total = len(self.list_data)
        self._update_format(total)
        
        for i in range(list_widget.count()):
            element = self.list_data[i]
            list_widget.item(i).setText(self._format_item(self.offset(i), element))
            
    def init_side_list(self, 
                        list_widget: QListWidget,
                        new_btn: QPushButton,
                        clear_btn: QPushButton,
                        count_btn: QPushButton,
                        data_list: List[Any],
                        new_element_factory: Callable[[], Any],
                        format_item: Callable[[int, Any], str] = None):
        """Initialize a side list with standard controls"""
        self._list_data = data_list
        if format_item:
            self._format_item = format_item
        else:
            self._update_format(len(data_list))
        
        # Connect standard buttons
        new_btn.clicked.connect(lambda: self._on_list_new(list_widget, new_element_factory))
        clear_btn.clicked.connect(lambda: self._on_list_clear(list_widget, new_element_factory))
        count_btn.clicked.connect(lambda: self._on_list_count(list_widget, new_element_factory))
        
        # Load initial data
        self._refresh_list(list_widget)

    def init_side_list_dual(self, 
                        list_widget: QListWidget,
                        insert_btn: QPushButton,
                        delete_btn: QPushButton,
                        data_list: List[Any],
                        new_element_factory: Callable[[], Any],
                        format_item: Callable[[int, Any], str] = None):
        self._list_data = data_list
        self._list_widget = list_widget # Store for helper methods
        self._new_element_factory = new_element_factory # Store for insert method

        if format_item:
            self._format_item = format_item
        else:
            # Use default formatting, accounting for skip_first if applicable
            self._update_format(len(data_list))

        # Connect standard buttons
        insert_btn.clicked.connect(self._on_list_insert)
        delete_btn.clicked.connect(self._on_list_delete)
        
        # Load initial data
        self._refresh_list(list_widget)
        
    def _refresh_list(self, list_widget: QListWidget = None):
        """Refresh list widget with current data"""
        if not self.list_data or not self._format_item:
            return
        
        if list_widget is None:
            list_widget = self._list_widget
        
        self._list_widget.blockSignals(True)

        list_widget.clear()

        list_data = self.list_data
        for i, element in enumerate(list_data):
            list_widget.addItem(self._format_item(self.offset(i), element))
            
        if list_widget.count() > 0:
            list_widget.setCurrentRow(0)
        
        self._list_widget.blockSignals(False)

    def offset(self, i):
        return i +1 if self.skip_first else i
            
    def _on_list_new(self, list_widget: QListWidget, new_element_factory: Callable[[], Any]):
        """Handle new element button"""
        element = new_element_factory()
        self._list_data.append(element)
        new_index = len(self.list_data)
        
        # Update format if needed
        old_format = self._format_item
        self._update_format(new_index)
        if old_format != self._format_item:
            self._refresh_format_and_list(list_widget)
        else:
            list_widget.addItem(self._format_item(self.offset(new_index-1), element))
            
        list_widget.setCurrentRow(list_widget.count() - 1)
        self.mark_dirty()

    def update_form_fields(self):
        """Update form fields after list operations. Override in subclasses."""
        pass

    def _on_list_clear(self, list_widget: QListWidget, new_element_factory: Callable[[], Any]):
        """Handle clear element button"""
        current_row = list_widget.currentRow()
        if current_row < 0 or not self.list_data:
            return
        
        element = new_element_factory()
        self.set_list_item(current_row, element)
        list_widget.item(current_row).setText(self._format_item(self.offset(current_row), element))
        self.mark_dirty()
        
        # Update form fields
        self.update_form_fields()
        
    def _on_list_count(self, list_widget: QListWidget, new_element_factory: Callable[[], Any]):
        """Handle set count button"""
        if not self.list_data:
            return
            
        count, ok = QInputDialog.getInt(
            self, 
            "Set Count", 
            "Enter number of entries:",
            list_widget.count(),
            1, 999
        )
        
        if not ok:
            return
            
        current_count = len(self.list_data)
        if count > current_count:
            # Add new elements
            for i in range(count - current_count):
                # self._on_list_new(list_widget, new_element_factory)
                element = new_element_factory()
                self._list_data.append(element)
                list_widget.addItem("") 
        else:
            # Remove elements from end
            self.list_data = self.list_data[:count]
            while list_widget.count() > count:
                list_widget.takeItem(list_widget.count() - 1)
                
        # Update format and refresh all items
        self._refresh_format_and_list(list_widget)
        self.mark_dirty()
        
    def update_list_item(self, list_widget: QListWidget, row: int, element: Any):
        """Update a single item in the list without full refresh"""
        if 0 <= row < list_widget.count():
            list_widget.item(row).setText(self._format_item(self.offset(row), element))
    
    def _on_list_insert(self):
        """Insert a new element before the currently selected index."""
        current_row = self._list_widget.currentRow()
        
        # If no item is selected, default to inserting at the end
        if current_row < 0:
            insert_index = len(self._list_data)
        else:
            # Insert *before* the selected item
            insert_index = current_row

        new_element = self._new_element_factory()
        if new_element is None: # Factory might return None on cancel
            return

        # Insert into the underlying data list
        self._list_data.insert(insert_index, new_element)
        
        # Refresh the list view to reflect the new item
        self._refresh_list()
        
        # Optionally, select the newly inserted item
        self._list_widget.setCurrentRow(insert_index)

    def _on_list_delete(self):
        """Delete the currently selected element."""
        current_row = self._list_widget.currentRow()
        
        if current_row < 0 or current_row >= len(self._list_data):
            # No valid selection or selection is out of bounds
            QMessageBox.warning(self, "Delete Item", "Please select an item to delete.")
            return

        # Confirm deletion if desired
        # reply = QMessageBox.question(self, "Delete Item", "Are you sure you want to delete the selected item?")
        # if reply != QMessageBox.Yes:
        #     return

        # Remove from the underlying data list
        del self._list_data[current_row]
        
        # Refresh the list view
        self._refresh_list()
        
        # Adjust selection: select the item that moved into the deleted spot,
        # or the last item if the last one was deleted.
        new_row_count = self._list_widget.count()
        if new_row_count > 0:
            # Preferably select the item that was after the deleted one, now at current_row
            # If the deleted item was the last one, select the new last item (current_row - 1)
            select_row = min(current_row, new_row_count - 1)
            self._list_widget.setCurrentRow(select_row)