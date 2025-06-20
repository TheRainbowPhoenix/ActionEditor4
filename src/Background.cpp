#include <stdlib.h>
#include "Background.h"

void Read_Background(struct Background* background_data, FILE* read_file) {
	char* temp_str;

	fread(&background_data->start, sizeof(int), 1, read_file);
	fread(&background_data->display_from_start, sizeof(int), 1, read_file);
	fread(&background_data->specified_by_color, sizeof(int), 1, read_file);
	fread(&background_data->color_number, sizeof(int), 1, read_file);
	fread(&background_data->display_in_front_of_character, sizeof(int), 1, read_file);
	fread(&background_data->horizontal_scroll_speed, sizeof(double), 1, read_file);
	fread(&background_data->vertical_scroll_speed, sizeof(double), 1, read_file);
	fread(&background_data->horizontal_auto_scroll, sizeof(int), 1, read_file);
	fread(&background_data->vertical_auto_scroll, sizeof(int), 1, read_file);
	fread(&background_data->horizontal_auto_scroll_speed, sizeof(double), 1, read_file);
	fread(&background_data->vertical_auto_scroll_speed, sizeof(double), 1, read_file);
	fread(&background_data->bytes61_80, sizeof(char), 20, read_file);
	fread(&background_data->image_path_length, sizeof(int), 1, read_file);
	if (background_data->image_path_length > 1) {
		temp_str = new char[background_data->image_path_length];
		fread(temp_str, sizeof(char), background_data->image_path_length, read_file);
		background_data->image_path = temp_str;
		delete[] temp_str;
	}
}

void Write_Background(struct Background* background_data, FILE* write_file) {
	fwrite(&background_data->start, sizeof(int), 1, write_file);
	fwrite(&background_data->display_from_start, sizeof(int), 1, write_file);
	fwrite(&background_data->specified_by_color, sizeof(int), 1, write_file);
	fwrite(&background_data->color_number, sizeof(int), 1, write_file);
	fwrite(&background_data->display_in_front_of_character, sizeof(int), 1, write_file);
	fwrite(&background_data->horizontal_scroll_speed, sizeof(double), 1, write_file);
	fwrite(&background_data->vertical_scroll_speed, sizeof(double), 1, write_file);
	fwrite(&background_data->horizontal_auto_scroll, sizeof(int), 1, write_file);
	fwrite(&background_data->vertical_auto_scroll, sizeof(int), 1, write_file);
	fwrite(&background_data->horizontal_auto_scroll_speed, sizeof(double), 1, write_file);
	fwrite(&background_data->vertical_auto_scroll_speed, sizeof(double), 1, write_file);
	fwrite(&background_data->bytes61_80, sizeof(char), 20, write_file);
	fwrite(&background_data->image_path_length, sizeof(int), 1, write_file);
	if (background_data->image_path_length > 1) {
		fwrite(background_data->image_path.c_str(), sizeof(char), background_data->image_path_length, write_file);
	}
}
