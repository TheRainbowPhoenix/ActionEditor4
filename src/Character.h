#pragma once
#include <string>
#include <vector>
#include "Flow.h"

struct Character {
	Character();

	int start;
	char inherit_palette;
	short int inherit_palette_data_number;

	char any_of_appearance_conditions_true;
	char appearance_condition_once_met_always_true;
	char facing_right;
	char number_of_doubles;
	short int appearance_position_offset_x_bl;
	short int appearance_position_offset_x_dot;
	short int appearance_position_offset_y_bl;
	short int appearance_position_offset_y_dot;
	char appearance_position_offset_x_flip_if_facing_right;
	char appearance_position_offset_y_flip_if_facing_right;

	short int image_number;
	char image_type;
	short int image_offset;
	short int animation_set;
	char z_coordinate;
	char transparency;
	short int initial_character_effect;
	char initial_character_effect_execution_type;
	char initial_character_effect_loop_execution;
	short int character_effect_on_death;
	char character_effect_on_death_execution_type;
	char mark_display;//0:don't display 1:display 2:display only in editor
	short int mark_number;

	short int operation;
	char faction;
	char character_id;

	char flying;
	char direction_fixed;
	char invincible;
	char invincible_effect;
	char block;
	char gigantic;
	char synchronize_with_auto_scroll;
	char line_of_sight;
	char line_of_sight_range;

	int hp;
	int sp;
	short int stopping_ease_during_inertial_movement;
	char body_hit_detection_range;
	int body_hit_power;
	char body_hit_impact;
	short int body_hit_effect;
	int defense;
	char impact_resistance;

	int score;
	char holds_item_at_same_position;

	char has_group;
	short int group_number;
	char action_condition_range;
	char action_condition_judgment_type;

	int unknown1;

	std::string character_name;

	short int position_x;//different from data position number in editor
	short int position_y;
	int unknown2;

	int number_of_inherited_data;
	char inherit_character_name;
	char inherit_operation;
	char inherit_faction;
	char inherit_character_id;
	char inherit_appearance_condition;
	char inherit_facing_right;
	char inherit_number_of_doubles;
	char inherit_initial_position_offset_x;
	char inherit_initial_position_offset_y;
	char inherit_image;
	char inherit_animation_set;
	char inherit_z_coordinate;
	char inherit_transparency;
	char inherit_initial_character_effect;
	char inherit_character_effect_on_death;
	char inherit_mark;
	char inherit_direction_fixed;
	char inherit_flying;
	char inherit_invincible;
	char inherit_block;
	char inherit_gigantic;
	char inherit_synchronize_with_auto_scroll;
	char inherit_line_of_sight;
	char inherit_hp;
	char inherit_sp;
	char inherit_body_hit_detection_range;
	char inherit_body_hit_power;
	char inherit_body_hit_impact;
	char inherit_body_hit_effect;
	char inherit_defense;
	char inherit_impact_resistance;
	char inherit_stopping_ease_during_inertial_movement;
	char inherit_action_condition;
	char inherit_group;
	char inherit_score;
	char inherit_holds_item_at_same_position;
	char inherit_action;
	std::vector<Basic_Condition> appearance_condition_data;
	std::vector<Flow> flow_data;
};

void Read_Character_Data(struct Character* character_data, FILE* read_file);
void Write_Character_Data(struct Character* character_data, FILE* write_file);
