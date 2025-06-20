#include "stdio.h"
#include "World_Chip.h"

void Read_World_Chip(struct World_Chip* world_chip_data, FILE* read_file) {
	int size;
	char *temp_str;
	fread(&world_chip_data->version, sizeof(int), 1, read_file);
	fread(&world_chip_data->graphic, sizeof(int), 1, read_file);
	fread(&world_chip_data->movement_unavailable, sizeof(int), 1, read_file);
	fread(&world_chip_data->unknown1, sizeof(int), 1, read_file);
	fread(&world_chip_data->unknown2, sizeof(int), 1, read_file);
	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		world_chip_data->name = temp_str;
		delete[] temp_str;
	}
	fread(&world_chip_data->unknown3, sizeof(int), 1, read_file);
}

void Write_World_Chip(struct World_Chip* world_chip_data, FILE* write_file) {
	int size;
	fwrite(&world_chip_data->version, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->graphic, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->movement_unavailable, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->unknown1, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->unknown2, sizeof(int), 1, write_file);

	size = world_chip_data->name.size() + 1;
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 1) {
		fwrite(world_chip_data->name.c_str(), sizeof(char), size, write_file);
	}

	fwrite(&world_chip_data->unknown3, sizeof(int), 1, write_file);
}
