#pragma once
#include <string>
#include <vector>
#include"Basic_Condition.h"

struct Block {

	int start;
	char inherit_palette;
	short int inherit_palette_data_number;

	char any_of_appearance_conditions_true;
	char appearance_condition_once_met_always_true;

	short int image_number;
	short int image_type;

	char unknown1;

	char in_front_of_character;
	char transparency;
	char mark_display;//0:don't display 1:display 2:display only in editor
	char mark_number;

	char unknown2;

	char block_type;//0:no collision 1:collision 2:instant death on collision
	unsigned char invalid_faction;//255 if none, the faction number if present
	char action;
	int action_parameter;
	char acquired_item_palette;
	short int acquired_item_palette_data_number;
	char block_summon_invalid;

	int unknown3;
	int block_name_length;
	std::string block_name;

	short int position_x;
	short int position_y;

	int number_of_inherited_data;
	char inherit_block_name;
	char inherit_appearance_condition;
	char inherit_image;
	char inherit_in_front_of_character;
	char inherit_transparency;
	char inherit_mark;
	char inherit_block_type;
	char inherit_invalid_faction;
	char inherit_action;
	char inherit_acquired_item;
	char inherit_block_summon;

	int number_of_appearance_condition_data;
	std::vector<Basic_Condition> appearance_condition_data;
};

void Read_Block_Data(struct Block* block_data, FILE* read_file);
void Write_Block_Data(struct Block* block_data, FILE* write_file);
