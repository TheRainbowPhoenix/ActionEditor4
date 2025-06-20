#include <stdio.h>
#include "Key_Condition.h"

void Read_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* read_file) {
	fread(&key_condition_data->start, sizeof(int), 1, read_file);
	fread(&key_condition_data->right_and_left_to_front_and_back, sizeof(char), 1, read_file);
	fread(&key_condition_data->minimum_input_time, sizeof(short int), 1, read_file);
	fread(&key_condition_data->maximum_input_time, sizeof(short int), 1, read_file);
	fread(&key_condition_data->input_time_1_to_infinity, sizeof(char), 1, read_file);
	fread(&key_condition_data->judgment_type, sizeof(char), 1, read_file);
	fread(&key_condition_data->unknown, sizeof(int), 1, read_file);
	fread(&key_condition_data->number_of_key_data, sizeof(int), 1, read_file);
	fread(&key_condition_data->direction_key_neutral, sizeof(char), 1, read_file);
	fread(&key_condition_data->left_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->right_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->up_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->down_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->up_left_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->down_left_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->up_right_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->down_right_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->any_direction_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->action_key_neutral, sizeof(char), 1, read_file);
	fread(&key_condition_data->z_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->x_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->c_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->v_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->a_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->s_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->d_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->f_key, sizeof(char), 1, read_file);
}

void Write_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* write_file) {
	fwrite(&key_condition_data->start, sizeof(int), 1, write_file);
	fwrite(&key_condition_data->right_and_left_to_front_and_back, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->minimum_input_time, sizeof(short int), 1, write_file);
	fwrite(&key_condition_data->maximum_input_time, sizeof(short int), 1, write_file);
	fwrite(&key_condition_data->input_time_1_to_infinity, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->judgment_type, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->unknown, sizeof(int), 1, write_file);
	fwrite(&key_condition_data->number_of_key_data, sizeof(int), 1, write_file);
	fwrite(&key_condition_data->direction_key_neutral, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->left_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->right_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->up_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->down_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->up_left_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->down_left_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->up_right_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->down_right_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->any_direction_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->action_key_neutral, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->z_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->x_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->c_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->v_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->a_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->s_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->d_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->f_key, sizeof(char), 1, write_file);
}

