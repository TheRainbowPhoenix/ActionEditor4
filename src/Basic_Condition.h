#pragma once

struct Basic_Condition {
	int start;//17 00 00 00
	char type;
	int right_side_constant;
	int right_side_random_lower_limit;
	int right_side_random_upper_limit;
	char left_side_status_target;
	char left_side_status_number;//range display color for distance condition
	char left_side_type;//range display presence/absence for distance condition
	char left_side_common_variable_or_stage_variable;
	short int left_side_variable_number;
	char left_side_flow_variable_number;
	char right_side_type;//display even if self not present for distance condition
	char right_side_status_target;//display even if self transparent for distance condition
	char right_side_status_number;
	char right_side_common_variable_or_stage_variable;
	short int right_side_variable_number;//distance in dot for distance condition
	char right_side_flow_variable_number;
	char how_to_compare;
	char specify_in_percent;
	char left_side_coordinate_type;
	char right_side_coordinate_type;
	char left_side_gigantic_character_coordinate_position;
	char right_side_gigantic_character_coordinate_position;
	char byte38;
	char byte39;
	char byte40;
	char byte41;
	char byte42;
};

void Read_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* read_file);
void Write_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* write_file);
