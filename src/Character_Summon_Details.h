#pragma once

struct Character_Summon_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	short int sound_effect;
	char play_sound_effect_if_outside_screen;
	char animation;
	char bytes10_30[21];
	char count;
	char formation;
	short int interval;
	short int number_of_columns;
	short int column_interval;
	char target;
	char direction;
	char byte41;
	char target;
	char bytes43_51[9];
	int summon_position_offset_x;
	int summon_position_offset_y;
	char summon_position_offset_x_flip;
	char summon_position_offset_y_flip;
	char bytes62_66[5];
	char faction;
	char bytes68_88[21];
	short int existence_time;
	char existence_time_present;
	char bytes92_119[28];
	char palette_type;
	short int palette_data_number;
	char faction_specification_method;
	char set_acquired_score_to_0;
	char direction_flip;
	char attack;
	char attack_flow;
	char bytes128_143[16];
	char return_value_to_flow_variable;
	char bytes145_147[3];
};

void Read_Character_Summon_Details(struct Character_Summon_Details* details, FILE* read_file);
void Write_Character_Summon_Details(struct Character_Summon_Details* details, FILE* write_file);
