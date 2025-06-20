#include <stdio.h>
#include <stdlib.h>
#include "Block.h"

void Read_Block_Data(struct Block* block_data, FILE* read_file) {
	char* temp_str;

	//initial 12 00 00 00
	fread(&block_data->start, sizeof(int), 1, read_file);

	fread(&block_data->inherit_palette, sizeof(char), 1, read_file);
	fread(&block_data->inherit_palette_data_number, sizeof(short int), 1, read_file);

	fread(&block_data->any_of_appearance_conditions_true, sizeof(char), 1, read_file);
	fread(&block_data->appearance_condition_once_met_always_true, sizeof(char), 1, read_file);

	fread(&block_data->image_number, sizeof(short int), 1, read_file);
	fread(&block_data->image_type, sizeof(short int), 1, read_file);

	fread(&block_data->unknown1, sizeof(char), 1, read_file);

	fread(&block_data->in_front_of_character, sizeof(char), 1, read_file);
	fread(&block_data->transparency, sizeof(char), 1, read_file);
	fread(&block_data->mark_display, sizeof(char), 1, read_file);
	fread(&block_data->mark_number, sizeof(char), 1, read_file);

	fread(&block_data->unknown2, sizeof(char), 1, read_file);

	fread(&block_data->block_type, sizeof(char), 1, read_file);
	fread(&block_data->invalid_faction, sizeof(char), 1, read_file);
	fread(&block_data->action, sizeof(char), 1, read_file);
	fread(&block_data->action_parameter, sizeof(int), 1, read_file);
	fread(&block_data->acquired_item_palette, sizeof(char), 1, read_file);
	fread(&block_data->acquired_item_palette_data_number, sizeof(short int), 1, read_file);
	fread(&block_data->block_summon_invalid, sizeof(char), 1, read_file);

	fread(&block_data->unknown3, sizeof(int), 1, read_file);
	fread(&block_data->block_name_length, sizeof(int), 1, read_file);
	if(block_data->block_name_length > 1) {
		temp_str = new char[block_data->block_name_length];
		fread(temp_str, sizeof(char), block_data->block_name_length, read_file);
		block_data->block_name = temp_str;
		delete[] temp_str;
	}

	fread(&block_data->position_x, sizeof(short int), 1, read_file);
	fread(&block_data->position_y, sizeof(short int), 1, read_file);

	fread(&block_data->number_of_inherited_data, sizeof(int), 1, read_file);
	fread(&block_data->inherit_block_name, sizeof(char), 1, read_file);
	fread(&block_data->inherit_appearance_condition, sizeof(char), 1, read_file);
	fread(&block_data->inherit_image, sizeof(char), 1, read_file);
	fread(&block_data->inherit_in_front_of_character, sizeof(char), 1, read_file);
	fread(&block_data->inherit_transparency, sizeof(char), 1, read_file);
	fread(&block_data->inherit_mark, sizeof(char), 1, read_file);
	fread(&block_data->inherit_block_type, sizeof(char), 1, read_file);
	fread(&block_data->inherit_invalid_faction, sizeof(char), 1, read_file);
	fread(&block_data->inherit_action, sizeof(char), 1, read_file);
	fread(&block_data->inherit_acquired_item, sizeof(char), 1, read_file);
	fread(&block_data->inherit_block_summon, sizeof(char), 1, read_file);

	fread(&block_data->number_of_appearance_condition_data, sizeof(int), 1, read_file);
	if (block_data->number_of_appearance_condition_data > 0) {
		block_data->appearance_condition_data.resize(block_data->number_of_appearance_condition_data);
		for (int i = 0; i < block_data->number_of_appearance_condition_data; ++i) {
			Read_Basic_Condition_Data(&block_data->appearance_condition_data[i], read_file);
		}
	}
}

void Write_Block_Data(struct Block* block_data, FILE* write_file) {

	//initial 12 00 00 00
	fwrite(&block_data->start, sizeof(int), 1, write_file);

	fwrite(&block_data->inherit_palette, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_palette_data_number, sizeof(short int), 1, write_file);

	fwrite(&block_data->any_of_appearance_conditions_true, sizeof(char), 1, write_file);
	fwrite(&block_data->appearance_condition_once_met_always_true, sizeof(char), 1, write_file);

	fwrite(&block_data->image_number, sizeof(short int), 1, write_file);
	fwrite(&block_data->image_type, sizeof(short int), 1, write_file);

	fwrite(&block_data->unknown1, sizeof(char), 1, write_file);
	fwrite(&block_data->in_front_of_character, sizeof(char), 1, write_file);
	fwrite(&block_data->transparency, sizeof(char), 1, write_file);
	fwrite(&block_data->mark_display, sizeof(char), 1, write_file);
	fwrite(&block_data->mark_number, sizeof(char), 1, write_file);

	fwrite(&block_data->unknown2, sizeof(char), 1, write_file);

	fwrite(&block_data->block_type, sizeof(char), 1, write_file);
	fwrite(&block_data->invalid_faction, sizeof(char), 1, write_file);
	fwrite(&block_data->action, sizeof(char), 1, write_file);
	fwrite(&block_data->action_parameter, sizeof(int), 1, write_file);
	fwrite(&block_data->acquired_item_palette, sizeof(char), 1, write_file);
	fwrite(&block_data->acquired_item_palette_data_number, sizeof(short int), 1, write_file);
	fwrite(&block_data->block_summon_invalid, sizeof(char), 1, write_file);

	fwrite(&block_data->unknown3, sizeof(int), 1, write_file);
	fwrite(&block_data->block_name_length, sizeof(int), 1, write_file);
	if(block_data->block_name_length > 1) {
		fwrite(block_data->block_name.c_str(), sizeof(char), block_data->block_name_length, write_file);
	}

	fwrite(&block_data->position_x, sizeof(short int), 1, write_file);
	fwrite(&block_data->position_y, sizeof(short int), 1, write_file);

	fwrite(&block_data->number_of_inherited_data, sizeof(int), 1, write_file);
	fwrite(&block_data->inherit_block_name, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_appearance_condition, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_image, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_in_front_of_character, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_transparency, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_mark, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_block_type, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_invalid_faction, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_action, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_acquired_item, sizeof(char), 1, write_file);
	fwrite(&block_data->inherit_block_summon, sizeof(char), 1, write_file);

	fwrite(&block_data->number_of_appearance_condition_data, sizeof(int), 1, write_file);
	if (block_data->number_of_appearance_condition_data > 0) {
		for (int i = 0; i < block_data->number_of_appearance_condition_data; ++i) {
			Write_Basic_Condition_Data(&block_data->appearance_condition_data[i], write_file);
		}
	}
}
