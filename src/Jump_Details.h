#pragma once

struct Jump_Details {
	char bytes1_5[5];
	short int sound_effect;
	char play_if_outside_screen;
	short int animation;
	char bytes11_38[28];
	int jump_type;
	int max_jump_inertial_movement_speed;
	int max_jump_height;
	int min_jump_inertial_movement_speed;
	int min_jump_height;
};

void Read_Jump_Details(struct Jump_Details* details, FILE* read_file);
void Write_Jump_Details(struct Jump_Details* details, FILE* write_file);
