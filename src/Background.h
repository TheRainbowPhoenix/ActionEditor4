#pragma once
#include "stdio.h"
#include <string>

struct Background {
	int start;
	int display_from_start;
	int specified_by_color;
	int color_number;
	int display_in_front_of_character;
	double horizontal_scroll_speed;
	double vertical_scroll_speed;
	int horizontal_auto_scroll;
	int vertical_auto_scroll;
	double horizontal_auto_scroll_speed;
	double vertical_auto_scroll_speed;
	char bytes61_80[20];
	int image_path_length;
	std::string image_path;
};

void Read_Background(struct Background* background_data, FILE* read_file);
void Write_Background(struct Background* background_data, FILE* write_file);
