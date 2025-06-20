#pragma once
#include <string>

struct Stage_Clear_Details {
	char bytes1_14[14];
	int path_length;
	std::string path;
	char bytes19_38[20];
	int stage_transition;
	int number;
	int change_world_map_position;
	int world_map_position_x;
	int world_map_position_y;
	int change_initial_position;
	int initial_position_x;
	int initial_position_y;
	int initial_position_main_character_direction;
	int execute_autosave;
	int add_clear_text_to_replay;
};

void Read_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* read_file);
void Write_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* write_file);
