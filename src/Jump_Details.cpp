#include <stdio.h>
#include "Jump_Details.h"

void Read_Jump_Details(struct Jump_Details* details, FILE* read_file) {
	fread(&details->bytes1_5, sizeof(char), 5, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(short int), 1, read_file);
	fread(&details->bytes11_38, sizeof(char), 28, read_file);
	fread(&details->jump_type, sizeof(int), 1, read_file);
	fread(&details->max_jump_inertial_movement_speed, sizeof(int), 1, read_file);
	fread(&details->max_jump_height, sizeof(int), 1, read_file);
	fread(&details->min_jump_inertial_movement_speed, sizeof(int), 1, read_file);
	fread(&details->min_jump_height, sizeof(int), 1, read_file);
}

void Write_Jump_Details(struct Jump_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_5, sizeof(char), 5, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(short int), 1, write_file);
	fwrite(&details->bytes11_38, sizeof(char), 28, write_file);
	fwrite(&details->jump_type, sizeof(int), 1, write_file);
	fwrite(&details->max_jump_inertial_movement_speed, sizeof(int), 1, write_file);
	fwrite(&details->max_jump_height, sizeof(int), 1, write_file);
	fwrite(&details->min_jump_inertial_movement_speed, sizeof(int), 1, write_file);
	fwrite(&details->min_jump_height, sizeof(int), 1, write_file);
}
