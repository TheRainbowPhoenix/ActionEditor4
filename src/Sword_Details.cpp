#include <stdio.h>
#include "Sword_Details.h"

void Read_Sword_Details(struct Sword_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(short int), 1, read_file);
	fread(&details->bytes11_63, sizeof(char), 53, read_file);
	fread(&details->z_coordinate, sizeof(char), 1, read_file);
	fread(&details->transparency, sizeof(char), 1, read_file);
	fread(&details->faction_same_as_user, sizeof(char), 1, read_file);
	fread(&details->faction, sizeof(short int), 1, read_file);
	fread(&details->gigantic, sizeof(short int), 1, read_file);
	fread(&details->sword_type, sizeof(int), 1, read_file);
	fread(&details->bytes75_104, sizeof(char), 30, read_file);
	fread(&details->power, sizeof(int), 1, read_file);
	fread(&details->bytes109_110, sizeof(char), 2, read_file);
	fread(&details->impact, sizeof(char), 1, read_file);
	fread(&details->effect, sizeof(short int), 1, read_file);
	fread(&details->acquired_item_palette_type, sizeof(char), 1, read_file);
	fread(&details->acquired_item_palette_number, sizeof(short int), 1, read_file);
	fread(&details->bytes117_125, sizeof(char), 9, read_file);
	fread(&details->attack, sizeof(char), 1, read_file);
	fread(&details->attack_id, sizeof(char), 1, read_file);
	fread(&details->bytes128_143, sizeof(char), 16, read_file);
}

void Write_Sword_Details(struct Sword_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(short int), 1, write_file);
	fwrite(&details->bytes11_63, sizeof(char), 53, write_file);
	fwrite(&details->z_coordinate, sizeof(char), 1, write_file);
	fwrite(&details->transparency, sizeof(char), 1, write_file);
	fwrite(&details->faction_same_as_user, sizeof(char), 1, write_file);
	fwrite(&details->faction, sizeof(short int), 1, write_file);
	fwrite(&details->gigantic, sizeof(short int), 1, write_file);
	fwrite(&details->sword_type, sizeof(int), 1, write_file);
	fwrite(&details->bytes75_104, sizeof(char), 30, write_file);
	fwrite(&details->power, sizeof(int), 1, write_file);
	fwrite(&details->bytes109_110, sizeof(char), 2, write_file);
	fwrite(&details->impact, sizeof(char), 1, write_file);
	fwrite(&details->effect, sizeof(short int), 1, write_file);
	fwrite(&details->acquired_item_palette_type, sizeof(char), 1, write_file);
	fwrite(&details->acquired_item_palette_number, sizeof(short int), 1, write_file);
	fwrite(&details->bytes117_125, sizeof(char), 9, write_file);
	fwrite(&details->attack, sizeof(char), 1, write_file);
	fwrite(&details->attack_id, sizeof(char), 1, write_file);
	fwrite(&details->bytes128_143, sizeof(char), 16, write_file);
}
