#pragma once
#include<string>

struct Message_Details {
	char bytes1_14[14];
	std::string message;
	char bytes19_38[20];
	int display_position_specification_method;
	int coordinate_x;
	int coordinate_y;
	int display_position_offset_x;
	int display_position_offset_y;
	int auto_adjust_to_not_go_off_screen;
	int display_time_specification_method;
	int display_time;
	int pause;
	int display_variables;
	int follow_screen;
	int auto_update;
	int message_id_present;
	int message_id;
	int window_display;
	int message_clear;
	int update_interval;
	int instant_display;
	int coordinate_unit;
	int set_options;
	int assign_return_value_to_flow_variable;
};

void Read_Message_Details(struct Message_Details* details, FILE* read_file);
void Write_Message_Details(struct Message_Details* details, FILE* write_file);
