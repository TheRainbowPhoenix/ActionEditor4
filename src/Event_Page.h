#pragma once

#include <string>



struct Event_Page{

	int start;

	int event_type;

	int graphic;

	int world_number;

	int passable_without_clearing;

	int playable_after_clearing;

	int game_clear;

	int appearance_condition_world;

	int appearance_condition_variable;

	int appearance_condition_constant;

	int appearance_condition_comparison_content;

	int appearance_condition_total_score;

	int variation_setting_present;

	int variation_variable;

	int variation_constant;

	int string_count;//fixed at 2

	std::string world_name;

	std::string start_stage;

};



void Read_Event_Page(struct Event_Page* page, FILE* read_file);

void Write_Event_Page(struct Event_Page* page, FILE* write_file);
