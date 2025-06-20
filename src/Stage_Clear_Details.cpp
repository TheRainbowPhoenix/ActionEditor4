#include <stdio.h>
#include <stdlib.h>
#include "Stage_Clear_Details.h"

void Read_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* read_file) {
	char* temp_str;
	fread(&details->bytes1_14, sizeof(char), 14, read_file);
	fread(&details->path_length, sizeof(int), 1, read_file);
	if (details->path_length > 1) {
		temp_str = new char[details->path_length];
		fread(temp_str, sizeof(char), details->path_length, read_file);
		details->path = temp_str;
		delete[] temp_str;
	}
	fread(&details->bytes19_38, sizeof(char), 20, read_file);
	fread(&details->stage_transition, sizeof(int), 1, read_file);
	fread(&details->number, sizeof(int), 1, read_file);
	fread(&details->change_world_map_position, sizeof(int), 1, read_file);
	fread(&details->world_map_position_x, sizeof(int), 1, read_file);
	fread(&details->world_map_position_y, sizeof(int), 1, read_file);
	fread(&details->change_initial_position, sizeof(int), 1, read_file);
	fread(&details->initial_position_x, sizeof(int), 1, read_file);
	fread(&details->initial_position_y, sizeof(int), 1, read_file);
	fread(&details->initial_position_main_character_direction, sizeof(int), 1, read_file);
	fread(&details->execute_autosave, sizeof(int), 1, read_file);
	fread(&details->add_clear_text_to_replay, sizeof(int), 1, read_file);
}

void Write_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_14, sizeof(char), 14, write_file);
	fwrite(&details->path_length, sizeof(int), 1, write_file);
	if (details->path_length > 1) {
		fwrite(details->path.c_str(), sizeof(char), details->path_length, write_file);
	}
	fwrite(&details->bytes19_38, sizeof(char), 20, write_file);
	fwrite(&details->stage_transition, sizeof(int), 1, write_file);
	fwrite(&details->number, sizeof(int), 1, write_file);
	fwrite(&details->change_world_map_position, sizeof(int), 1, write_file);
	fwrite(&details->world_map_position_x, sizeof(int), 1, write_file);
	fwrite(&details->world_map_position_y, sizeof(int), 1, write_file);
	fwrite(&details->change_initial_position, sizeof(int), 1, write_file);
	fwrite(&details->initial_position_x, sizeof(int), 1, write_file);
	fwrite(&details->initial_position_y, sizeof(int), 1, write_file);
	fwrite(&details->initial_position_main_character_direction, sizeof(int), 1, write_file);
	fwrite(&details->execute_autosave, sizeof(int), 1, write_file);
	fwrite(&details->add_clear_text_to_replay, sizeof(int), 1, write_file);
}
