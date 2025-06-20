#include <stdio.h>
#include "Basic_Condition.h"

void Read_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* read_file) {
	fread(&basic_condition_data->start, sizeof(int), 1, read_file);
	fread(&basic_condition_data->type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_constant, sizeof(int), 1, read_file);
	fread(&basic_condition_data->right_side_random_lower_limit, sizeof(int), 1, read_file);
	fread(&basic_condition_data->right_side_random_upper_limit, sizeof(int), 1, read_file);
	fread(&basic_condition_data->left_side_status_target, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_status_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_common_variable_or_stage_variable, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_variable_number, sizeof(short int), 1, read_file);
	fread(&basic_condition_data->left_side_flow_variable_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_status_target, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_status_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_common_variable_or_stage_variable, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_variable_number, sizeof(short int), 1, read_file);
	fread(&basic_condition_data->right_side_flow_variable_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->how_to_compare, sizeof(char), 1, read_file);
	fread(&basic_condition_data->specify_in_percent, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_coordinate_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_coordinate_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_gigantic_character_coordinate_position, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_gigantic_character_coordinate_position, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte38, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte39, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte40, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte41, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte42, sizeof(char), 1, read_file);
}

void Write_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* write_file) {
	fwrite(&basic_condition_data->start, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_constant, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->right_side_random_lower_limit, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->right_side_random_upper_limit, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->left_side_status_target, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_status_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_common_variable_or_stage_variable, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_variable_number, sizeof(short int), 1, write_file);
	fwrite(&basic_condition_data->left_side_flow_variable_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_status_target, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_status_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_common_variable_or_stage_variable, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_variable_number, sizeof(short int), 1, write_file);
	fwrite(&basic_condition_data->right_side_flow_variable_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->how_to_compare, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->specify_in_percent, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_coordinate_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_coordinate_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_gigantic_character_coordinate_position, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_gigantic_character_coordinate_position, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte38, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte39, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte40, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte41, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte42, sizeof(char), 1, write_file);
}
