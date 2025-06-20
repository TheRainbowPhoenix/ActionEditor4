#include "stdio.h"
#include "World_Map.h"

void Read_World_Map(struct World_Map* world_map_data, FILE* read_file) {
	int size;
	char* temp_str;

	fread(&world_map_data->version, sizeof(int), 1, read_file);
	fread(&world_map_data->unknown1, sizeof(int), 1, read_file);
	fread(&world_map_data->horizontal_width, sizeof(int), 1, read_file);
	fread(&world_map_data->vertical_width, sizeof(int), 1, read_file);
	fread(&world_map_data->vertical_movement_change_amount, sizeof(int), 1, read_file);
	fread(&world_map_data->vertical_movement_change_amount_exponent, sizeof(int), 1, read_file);
	fread(&world_map_data->initial_position_x, sizeof(int), 1, read_file);
	fread(&world_map_data->initial_position_y, sizeof(int), 1, read_file);
	fread(&world_map_data->background_color, sizeof(int), 1, read_file);
	fread(&world_map_data->unknown2, sizeof(int), 1, read_file);
	fread(&world_map_data->unknown3, sizeof(int), 1, read_file);

	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		world_map_data->unknown4 = temp_str;
		delete[] temp_str;
	}

	fread(&world_map_data->unknown5, sizeof(int), 1, read_file);

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->world_chip_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_World_Chip(&world_map_data->world_chip_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->map_chip_data.resize(size);
		for (int i = 0; i < size; ++i) {
			fread(&world_map_data->map_chip_data[i], sizeof(int), 1, read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->event_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Event(&world_map_data->event_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->event_template_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Event(&world_map_data->event_template_data[i], read_file);
		}
	}

}

void Write_World_Map(struct World_Map* world_map_data, FILE* write_file) {
	int size;

	fwrite(&world_map_data->version, sizeof(int), 1, write_file);
	fwrite(&world_map_data->unknown1, sizeof(int), 1, write_file);
	fwrite(&world_map_data->horizontal_width, sizeof(int), 1, write_file);
	fwrite(&world_map_data->vertical_width, sizeof(int), 1, write_file);
	fwrite(&world_map_data->vertical_movement_change_amount, sizeof(int), 1, write_file);
	fwrite(&world_map_data->vertical_movement_change_amount_exponent, sizeof(int), 1, write_file);
	fwrite(&world_map_data->initial_position_x, sizeof(int), 1, write_file);
	fwrite(&world_map_data->initial_position_y, sizeof(int), 1, write_file);
	fwrite(&world_map_data->background_color, sizeof(int), 1, write_file);
	fwrite(&world_map_data->unknown2, sizeof(int), 1, write_file);
	fwrite(&world_map_data->unknown3, sizeof(int), 1, write_file);

	size = world_map_data->unknown4.size() + 1;
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 1) {
		fwrite(world_map_data->unknown4.c_str(), sizeof(char), size, write_file);
	}

	fwrite(&world_map_data->unknown5, sizeof(int), 1, write_file);

	size = world_map_data->world_chip_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_World_Chip(&world_map_data->world_chip_data[i], write_file);
		}
	}

	size = world_map_data->map_chip_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			fwrite(&world_map_data->map_chip_data[i], sizeof(int), 1, write_file);
		}
	}

	size = world_map_data->event_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_Event(&world_map_data->event_data[i], write_file);
		}
	}

	size = world_map_data->event_template_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_Event(&world_map_data->event_template_data[i], write_file);
		}
	}

}
