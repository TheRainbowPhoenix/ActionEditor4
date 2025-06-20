#include "stdio.h"
#include "Event.h"

void Read_Event(struct Event* event, FILE* read_file) {
	int size;
	char* temp_str;

	fread(&event->start, sizeof(int), 1, read_file);
	fread(&event->placement_x, sizeof(int), 1, read_file);
	fread(&event->placement_y, sizeof(int), 1, read_file);
	fread(&event->unknown1, sizeof(int), 1, read_file);

	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		event->event_name = temp_str;
		delete[] temp_str;
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		event->page_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Event_Page(&event->page_data[i], read_file);
		}
	}

}

void Write_Event(struct Event* event, FILE* write_file) {
	int size;

	fwrite(&event->start, sizeof(int), 1, write_file);
	fwrite(&event->placement_x, sizeof(int), 1, write_file);
	fwrite(&event->placement_y, sizeof(int), 1, write_file);
	fwrite(&event->unknown1, sizeof(int), 1, write_file);

	size = event->event_name.size() + 1;
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 1) {
		fwrite(event->event_name.c_str(), sizeof(char), size, write_file);
	}

	size = event->page_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_Event_Page(&event->page_data[i], write_file);
		}
	}

}

