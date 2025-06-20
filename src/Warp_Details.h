#pragma once

struct Warp_Details {
	char bytes1_26[26];
	char setting_type;
	char direction;
	char bytes29_33[5];
	char target_x_present;
	char target_y_present;
	short int target_x_bl;
	short int target_y_bl;
	short int target_x_dot;
	short int target_y_dot;
	char target_type;
	char target_unit;
	char gigantic_character_coordinate_position;
	char bytes47_49[3];
	char target_x_flip_if_facing_right;
	char target_y_flip_if_facing_right;
	char bytes52_59[8];
	short int distance;
	short int distance_double;
	char bytes64_101[38];
	int assign_return_value_to_flow;
};

void Read_Warp_Details(struct Warp_Details* details, FILE* read_file);
void Write_Warp_Details(struct Warp_Details* details, FILE* write_file);
