#include <stdio.h>
#include <stdlib.h>
#include "Item_Effect.h"
#include "Item.h"

void Read_Item_Data(struct Item* item_data, FILE* read_file) {
	char* temp_str;

	//initial 11 00 00 00
	fread(&item_data->start, sizeof(int), 1, read_file);
	fread(&item_data->inherit_palette, sizeof(char), 1, read_file);
	fread(&item_data->inherit_palette_data_number, sizeof(short int), 1, read_file);

	fread(&item_data->any_of_appearance_conditions_true, sizeof(char), 1, read_file);
	fread(&item_data->appearance_condition_once_met_always_true, sizeof(char), 1, read_file);
	fread(&item_data->appearance_position_offset_x_dot, sizeof(short int), 1, read_file);
	fread(&item_data->appearance_position_offset_y_dot, sizeof(short int), 1, read_file);

	fread(&item_data->image_number, sizeof(short int), 1, read_file);
	fread(&item_data->image_type, sizeof(char), 1, read_file);
	fread(&item_data->frame, sizeof(short int), 1, read_file);
	fread(&item_data->z_coordinate, sizeof(char), 1, read_file);
	fread(&item_data->transparency, sizeof(char), 1, read_file);
	fread(&item_data->mark_display, sizeof(char), 1, read_file);
	fread(&item_data->mark_number, sizeof(short int), 1, read_file);

	fread(&item_data->display_above_head_on_acquisition, sizeof(char), 1, read_file);
	fread(&item_data->acquisition_type, sizeof(char), 1, read_file);
	fread(&item_data->gigantic, sizeof(char), 1, read_file);
	fread(&item_data->sound_effect, sizeof(short int), 1, read_file);

	fread(&item_data->unknown, sizeof(int), 1, read_file);

	fread(&item_data->item_name_length, sizeof(int), 1, read_file);
	if(item_data->item_name_length > 1) {
		temp_str = new char[item_data->item_name_length];
		fread(temp_str, sizeof(char), item_data->item_name_length, read_file);
		item_data->item_name = temp_str;
		delete[] temp_str;
	}

	fread(&item_data->position_x, sizeof(short int), 1, read_file);
	fread(&item_data->position_y, sizeof(short int), 1, read_file);

	fread(&item_data->number_of_inherited_data, sizeof(int), 1, read_file);
	fread(&item_data->inherit_item_name, sizeof(char), 1, read_file);
	fread(&item_data->inherit_appearance_condition, sizeof(char), 1, read_file);
	fread(&item_data->inherit_initial_position_offset_x, sizeof(char), 1, read_file);
	fread(&item_data->inherit_initial_position_offset_y, sizeof(char), 1, read_file);
	fread(&item_data->inherit_image, sizeof(char), 1, read_file);
	fread(&item_data->inherit_z_coordinate, sizeof(char), 1, read_file);
	fread(&item_data->inherit_transparency, sizeof(char), 1, read_file);
	fread(&item_data->inherit_mark, sizeof(char), 1, read_file);
	fread(&item_data->inherit_gigantic, sizeof(char), 1, read_file);
	fread(&item_data->inherit_acquisition_type, sizeof(char), 1, read_file);
	fread(&item_data->inherit_display_above_head_on_acquisition, sizeof(char), 1, read_file);
	fread(&item_data->inherit_sound_effect, sizeof(char), 1, read_file);
	fread(&item_data->inherit_effect, sizeof(char), 1, read_file);

	fread(&item_data->number_of_appearance_condition_data, sizeof(int), 1, read_file);
	if (item_data->number_of_appearance_condition_data > 0) {
		item_data->appearance_condition_data.resize(item_data->number_of_appearance_condition_data);
		for (int i = 0; i < item_data->number_of_appearance_condition_data; ++i) {
			Read_Basic_Condition_Data(&item_data->appearance_condition_data[i], read_file);
		}
	}

	fread(&item_data->number_of_effects, sizeof(int), 1, read_file);
	if(item_data->number_of_effects > 0) {
		item_data->effects.resize(item_data->number_of_effects);
		for(int i = 0; i < item_data->number_of_effects; ++i) {
			Read_Item_Effect(&item_data->effects[i], read_file);
		}
	}
}

void Write_Item_Data(struct Item* item_data, FILE* write_file) {
	//initial 11 00 00 00
	fwrite(&item_data->start, sizeof(int), 1, write_file);
	fwrite(&item_data->inherit_palette, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_palette_data_number, sizeof(short int), 1, write_file);

	fwrite(&item_data->any_of_appearance_conditions_true, sizeof(char), 1, write_file);
	fwrite(&item_data->appearance_condition_once_met_always_true, sizeof(char), 1, write_file);
	fwrite(&item_data->appearance_position_offset_x_dot, sizeof(short int), 1, write_file);
	fwrite(&item_data->appearance_position_offset_y_dot, sizeof(short int), 1, write_file);

	fwrite(&item_data->image_number, sizeof(short int), 1, write_file);
	fwrite(&item_data->image_type, sizeof(char), 1, write_file);
	fwrite(&item_data->frame, sizeof(short int), 1, write_file);
	fwrite(&item_data->z_coordinate, sizeof(char), 1, write_file);
	fwrite(&item_data->transparency, sizeof(char), 1, write_file);
	fwrite(&item_data->mark_display, sizeof(char), 1, write_file);
	fwrite(&item_data->mark_number, sizeof(short int), 1, write_file);

	fwrite(&item_data->display_above_head_on_acquisition, sizeof(char), 1, write_file);
	fwrite(&item_data->acquisition_type, sizeof(char), 1, write_file);
	fwrite(&item_data->gigantic, sizeof(char), 1, write_file);
	fwrite(&item_data->sound_effect, sizeof(short int), 1, write_file);

	fwrite(&item_data->unknown, sizeof(int), 1, write_file);

	fwrite(&item_data->item_name_length, sizeof(int), 1, write_file);
	if(item_data->item_name_length > 1) {
		fwrite(item_data->item_name.c_str(), sizeof(char), item_data->item_name_length, write_file);
	}

	fwrite(&item_data->position_x, sizeof(short int), 1, write_file);
	fwrite(&item_data->position_y, sizeof(short int), 1, write_file);

	fwrite(&item_data->number_of_inherited_data, sizeof(int), 1, write_file);
	fwrite(&item_data->inherit_item_name, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_appearance_condition, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_initial_position_offset_x, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_initial_position_offset_y, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_image, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_z_coordinate, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_transparency, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_mark, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_gigantic, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_acquisition_type, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_display_above_head_on_acquisition, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_sound_effect, sizeof(char), 1, write_file);
	fwrite(&item_data->inherit_effect, sizeof(char), 1, write_file);

	fwrite(&item_data->number_of_appearance_condition_data, sizeof(int), 1, write_file);
	if (item_data->number_of_appearance_condition_data > 0) {
		for (int i = 0; i < item_data->number_of_appearance_condition_data; ++i) {
			Write_Basic_Condition_Data(&item_data->appearance_condition_data[i], write_file);
		}
	}

	fwrite(&item_data->number_of_effects, sizeof(int), 1, write_file);
	if(item_data->number_of_effects > 0) {
		for(int i = 0; i < item_data->number_of_effects; ++i) {
			Write_Item_Effect(&item_data->effects[i], write_file);
		}
	}
}
