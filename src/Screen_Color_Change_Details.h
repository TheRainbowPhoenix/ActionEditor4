#pragma once

struct Screen_Color_Change_Details {
	char bytes1_38[38];
	int r;
	int g;
	int b;
	int percent;
	int restore_to_original_color;
	int time_required_for_change;
	int instant_display;
	int instant_display_count;
};

void Read_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* read_file);
void Write_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* write_file);
