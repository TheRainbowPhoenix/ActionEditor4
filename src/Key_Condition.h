#pragma once

struct Key_Condition {
	int start; // 05 00 00 00
	char right_and_left_to_front_and_back;
	short int minimum_input_time;
	short int maximum_input_time;
	char input_time_1_to_infinity;
	char judgment_type;
	int unknown;
	int number_of_key_data;
	char direction_key_neutral;
	char left_key;
	char right_key;
	char up_key;
	char down_key;
	char up_left_key;
	char down_left_key;
	char up_right_key;
	char down_right_key;
	char any_direction_key;
	char action_key_neutral;
	char z_key;
	char x_key;
	char c_key;
	char v_key;
	char a_key;
	char s_key;
	char d_key;
	char f_key;
};

void Read_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* read_file);
void Write_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* write_file);
