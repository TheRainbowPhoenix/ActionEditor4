#include <stdio.h>
#include "Warp_Details.h"

void Read_Warp_Details(struct Warp_Details* details, FILE* read_file) {
	fread(&details->bytes1_26, sizeof(char), 26, read_file);
	fread(&details->setting_type, sizeof(char), 1, read_file);
	fread(&details->direction, sizeof(char), 1, read_file);
	fread(&details->bytes29_33, sizeof(char), 5, read_file);
	fread(&details->target_x_present, sizeof(char), 1, read_file);
	fread(&details->target_y_present, sizeof(char), 1, read_file);
	fread(&details->target_x_bl, sizeof(short int), 1, read_file);
	fread(&details->target_y_bl, sizeof(short int), 1, read_file);
	fread(&details->target_x_dot, sizeof(short int), 1, read_file);
	fread(&details->target_y_dot, sizeof(short int), 1, read_file);
	fread(&details->target_type, sizeof(char), 1, read_file);
	fread(&details->target_unit, sizeof(char), 1, read_file);
	fread(&details->gigantic_character_coordinate_position, sizeof(char), 1, read_file);
	fread(&details->bytes47_49, sizeof(char), 3, read_file);
	fread(&details->target_x_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->target_y_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->bytes52_59, sizeof(char), 8, read_file);
	fread(&details->distance, sizeof(short int), 1, read_file);
	fread(&details->distance_double, sizeof(short int), 1, read_file);
	fread(&details->bytes64_101, sizeof(char), 38, read_file);
	fread(&details->assign_return_value_to_flow, sizeof(int), 1, read_file);
}

void Write_Warp_Details(struct Warp_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_26, sizeof(char), 26, write_file);
	fwrite(&details->setting_type, sizeof(char), 1, write_file);
	fwrite(&details->direction, sizeof(char), 1, write_file);
	fwrite(&details->bytes29_33, sizeof(char), 5, write_file);
	fwrite(&details->target_x_present, sizeof(char), 1, write_file);
	fwrite(&details->target_y_present, sizeof(char), 1, write_file);
	fwrite(&details->target_x_bl, sizeof(short int), 1, write_file);
	fwrite(&details->target_y_bl, sizeof(short int), 1, write_file);
	fwrite(&details->target_x_dot, sizeof(short int), 1, write_file);
	fwrite(&details->target_y_dot, sizeof(short int), 1, write_file);
	fwrite(&details->target_type, sizeof(char), 1, write_file);
	fwrite(&details->target_unit, sizeof(char), 1, write_file);
	fwrite(&details->gigantic_character_coordinate_position, sizeof(char), 1, write_file);
	fwrite(&details->bytes47_49, sizeof(char), 3, write_file);
	fwrite(&details->target_x_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->target_y_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->bytes52_59, sizeof(char), 8, write_file);
	fwrite(&details->distance, sizeof(short int), 1, write_file);
	fwrite(&details->distance_double, sizeof(short int), 1, write_file);
	fwrite(&details->bytes64_101, sizeof(char), 38, write_file);
	fwrite(&details->assign_return_value_to_flow, sizeof(int), 1, write_file);
}

