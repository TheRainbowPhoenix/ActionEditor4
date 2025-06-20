#pragma once
#include <string>
#include <vector>
#include "Basic_Condition.h"
#include "Item_Effect.h"

struct Item {
	int start;
	char inherit_palette;
	short int inherit_palette_data_number;

	char any_of_appearance_conditions_true;
	char appearance_condition_once_met_always_true;
	short int appearance_position_offset_x_dot;
	short int appearance_position_offset_y_dot;

	short int image_number;
	char image_type;
	short int frame;
	char z_coordinate;
	char transparency;
	char mark_display;//0:don't display 1:display 2:display only in editor
	short int mark_number;

	char display_above_head_on_acquisition;
	char acquisition_type;
	char gigantic;
	short int sound_effect;

	int unknown;

	int item_name_length;
	std::string item_name;

	short int position_x;
	short int position_y;

	int number_of_inherited_data;
	char inherit_item_name;
	char inherit_appearance_condition;
	char inherit_initial_position_offset_x;
	char inherit_initial_position_offset_y;
	char inherit_image;
	char inherit_z_coordinate;
	char inherit_transparency;
	char inherit_mark;
	char inherit_gigantic;
	char inherit_acquisition_type;
	char inherit_display_above_head_on_acquisition;
	char inherit_sound_effect;
	char inherit_effect;

	int number_of_appearance_condition_data;
	std::vector<Basic_Condition> appearance_condition_data;
	int number_of_effects;
	std::vector<Item_Effect> effects;
};

void Read_Item_Data(struct Item* item_data, FILE* read_file);
void Write_Item_Data(struct Item* item_data, FILE* write_file);

