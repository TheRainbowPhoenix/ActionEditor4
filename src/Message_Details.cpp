#include <stdio.h>
#include <stdlib.h>
#include "Message_Details.h"

void Read_Message_Details(struct Message_Details* details, FILE* read_file) {
	fread(&details->bytes1_14, sizeof(char), 14, read_file);
	int temp_size;
	char* temp_str;
	fread(&temp_size, sizeof(int), 1, read_file);
	if(temp_size > 1) {
		temp_str = new char[temp_size];
		fread(temp_str, sizeof(char), temp_size, read_file);
		details->message = temp_str;
		delete[] temp_str;
	}
	fread(&details->bytes19_38, sizeof(char), 20, read_file);
	fread(&details->display_position_specification_method, sizeof(int), 1, read_file);
	fread(&details->coordinate_x, sizeof(int), 1, read_file);
	fread(&details->coordinate_y, sizeof(int), 1, read_file);
	fread(&details->display_position_offset_x, sizeof(int), 1, read_file);
	fread(&details->display_position_offset_y, sizeof(int), 1, read_file);
	fread(&details->auto_adjust_to_not_go_off_screen, sizeof(int), 1, read_file);
	fread(&details->display_time_specification_method, sizeof(int), 1, read_file);
	fread(&details->display_time, sizeof(int), 1, read_file);
	fread(&details->pause, sizeof(int), 1, read_file);
	fread(&details->display_variables, sizeof(int), 1, read_file);
	fread(&details->follow_screen, sizeof(int), 1, read_file);
	fread(&details->auto_update, sizeof(int), 1, read_file);
	fread(&details->message_id_present, sizeof(int), 1, read_file);
	fread(&details->message_id, sizeof(int), 1, read_file);
	fread(&details->window_display, sizeof(int), 1, read_file);
	fread(&details->message_clear, sizeof(int), 1, read_file);
	fread(&details->update_interval, sizeof(int), 1, read_file);
	fread(&details->instant_display, sizeof(int), 1, read_file);
	fread(&details->coordinate_unit, sizeof(int), 1, read_file);
	fread(&details->set_options, sizeof(int), 1, read_file);
	fread(&details->assign_return_value_to_flow_variable, sizeof(int), 1, read_file);
}

void Write_Message_Details(struct Message_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_14, sizeof(char), 14, write_file);
	int temp_size = details->message.size() + 1;
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 1) {
		fwrite(details->message.c_str(), sizeof(char), temp_size, write_file);
	}
	fwrite(&details->bytes19_38, sizeof(char), 20, write_file);
	fwrite(&details->display_position_specification_method, sizeof(int), 1, write_file);
	fwrite(&details->coordinate_x, sizeof(int), 1, write_file);
	fwrite(&details->coordinate_y, sizeof(int), 1, write_file);
	fwrite(&details->display_position_offset_x, sizeof(int), 1, write_file);
	fwrite(&details->display_position_offset_y, sizeof(int), 1, write_file);
	fwrite(&details->auto_adjust_to_not_go_off_screen, sizeof(int), 1, write_file);
	fwrite(&details->display_time_specification_method, sizeof(int), 1, write_file);
	fwrite(&details->display_time, sizeof(int), 1, write_file);
	fwrite(&details->pause, sizeof(int), 1, write_file);
	fwrite(&details->display_variables, sizeof(int), 1, write_file);
	fwrite(&details->follow_screen, sizeof(int), 1, write_file);
	fwrite(&details->auto_update, sizeof(int), 1, write_file);
	fwrite(&details->message_id_present, sizeof(int), 1, write_file);
	fwrite(&details->message_id, sizeof(int), 1, write_file);
	fwrite(&details->window_display, sizeof(int), 1, write_file);
	fwrite(&details->message_clear, sizeof(int), 1, write_file);
	fwrite(&details->update_interval, sizeof(int), 1, write_file);
	fwrite(&details->instant_display, sizeof(int), 1, write_file);
	fwrite(&details->coordinate_unit, sizeof(int), 1, write_file);
	fwrite(&details->set_options, sizeof(int), 1, write_file);
	fwrite(&details->assign_return_value_to_flow_variable, sizeof(int), 1, write_file);
}

