#include <stdio.h>
#include <stdlib.h>
#include "Character.h"

Character::Character() {
	character_name = "";
}

void Read_Character_Data(struct Character* character_data, FILE* read_file) {
	int size;

	//initial 35 00 00 00
	fread(&character_data->start, sizeof(int), 1, read_file);

	fread(&character_data->inherit_palette, sizeof(char), 1, read_file);
	fread(&character_data->inherit_palette_data_number, sizeof(short int), 1, read_file);

	fread(&character_data->any_of_appearance_conditions_true, sizeof(char), 1, read_file);
	fread(&character_data->appearance_condition_once_met_always_true, sizeof(char), 1, read_file);
	fread(&character_data->facing_right, sizeof(char), 1, read_file);
	fread(&character_data->number_of_doubles, sizeof(char), 1, read_file);
	fread(&character_data->appearance_position_offset_x_bl, sizeof(short int), 1, read_file);
	fread(&character_data->appearance_position_offset_x_dot, sizeof(short int), 1, read_file);
	fread(&character_data->appearance_position_offset_y_bl, sizeof(short int), 1, read_file);
	fread(&character_data->appearance_position_offset_y_dot, sizeof(short int), 1, read_file);
	fread(&character_data->appearance_position_offset_x_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&character_data->appearance_position_offset_y_flip_if_facing_right, sizeof(char), 1, read_file);

	fread(&character_data->image_number, sizeof(short int), 1, read_file);
	fread(&character_data->image_type, sizeof(char), 1, read_file);
	fread(&character_data->image_offset, sizeof(short int), 1, read_file);
	fread(&character_data->animation_set, sizeof(short int), 1, read_file);
	fread(&character_data->z_coordinate, sizeof(char), 1, read_file);
	fread(&character_data->transparency, sizeof(char), 1, read_file);
	fread(&character_data->initial_character_effect, sizeof(short int), 1, read_file);
	fread(&character_data->initial_character_effect_execution_type, sizeof(char), 1, read_file);
	fread(&character_data->initial_character_effect_loop_execution, sizeof(char), 1, read_file);
	fread(&character_data->character_effect_on_death, sizeof(short int), 1, read_file);
	fread(&character_data->character_effect_on_death_execution_type, sizeof(char), 1, read_file);
	fread(&character_data->mark_display, sizeof(char), 1, read_file);
	fread(&character_data->mark_number, sizeof(short int), 1, read_file);

	fread(&character_data->operation, sizeof(short int), 1, read_file);
	fread(&character_data->faction, sizeof(char), 1, read_file);
	fread(&character_data->character_id, sizeof(char), 1, read_file);

	fread(&character_data->flying, sizeof(char), 1, read_file);
	fread(&character_data->direction_fixed, sizeof(char), 1, read_file);
	fread(&character_data->invincible, sizeof(char), 1, read_file);
	fread(&character_data->invincible_effect, sizeof(char), 1, read_file);
	fread(&character_data->block, sizeof(char), 1, read_file);
	fread(&character_data->gigantic, sizeof(char), 1, read_file);
	fread(&character_data->synchronize_with_auto_scroll, sizeof(char), 1, read_file);
	fread(&character_data->line_of_sight, sizeof(char), 1, read_file);
	fread(&character_data->line_of_sight_range, sizeof(char), 1, read_file);

	fread(&character_data->hp, sizeof(int), 1, read_file);
	fread(&character_data->sp, sizeof(int), 1, read_file);
	fread(&character_data->stopping_ease_during_inertial_movement, sizeof(short int), 1, read_file);
	fread(&character_data->body_hit_detection_range, sizeof(char), 1, read_file);
	fread(&character_data->body_hit_power, sizeof(int), 1, read_file);
	fread(&character_data->body_hit_impact, sizeof(char), 1, read_file);
	fread(&character_data->body_hit_effect, sizeof(short int), 1, read_file);
	fread(&character_data->defense, sizeof(int), 1, read_file);
	fread(&character_data->impact_resistance, sizeof(char), 1, read_file);

	fread(&character_data->score, sizeof(int), 1, read_file);
	fread(&character_data->holds_item_at_same_position, sizeof(char), 1, read_file);

	fread(&character_data->has_group, sizeof(char), 1, read_file);
	fread(&character_data->group_number, sizeof(short int), 1, read_file);
	fread(&character_data->action_condition_range, sizeof(char), 1, read_file);
	fread(&character_data->action_condition_judgment_type, sizeof(char), 1, read_file);

	fread(&character_data->unknown1, sizeof(int), 1, read_file);

	char* temp_str;
	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		character_data->character_name = temp_str;
		delete[] temp_str;
	}

	fread(&character_data->position_x, sizeof(short int), 1, read_file);
	fread(&character_data->position_y, sizeof(short int), 1, read_file);
	fread(&character_data->unknown2, sizeof(int), 1, read_file);

	fread(&character_data->number_of_inherited_data, sizeof(int), 1, read_file);
	fread(&character_data->inherit_character_name, sizeof(char), 1, read_file);
	fread(&character_data->inherit_operation, sizeof(char), 1, read_file);
	fread(&character_data->inherit_faction, sizeof(char), 1, read_file);
	fread(&character_data->inherit_character_id, sizeof(char), 1, read_file);
	fread(&character_data->inherit_appearance_condition, sizeof(char), 1, read_file);
	fread(&character_data->inherit_facing_right, sizeof(char), 1, read_file);
	fread(&character_data->inherit_number_of_doubles, sizeof(char), 1, read_file);
	fread(&character_data->inherit_initial_position_offset_x, sizeof(char), 1, read_file);
	fread(&character_data->inherit_initial_position_offset_y, sizeof(char), 1, read_file);
	fread(&character_data->inherit_image, sizeof(char), 1, read_file);
	fread(&character_data->inherit_animation_set, sizeof(char), 1, read_file);
	fread(&character_data->inherit_z_coordinate, sizeof(char), 1, read_file);
	fread(&character_data->inherit_transparency, sizeof(char), 1, read_file);
	fread(&character_data->inherit_initial_character_effect, sizeof(char), 1, read_file);
	fread(&character_data->inherit_character_effect_on_death, sizeof(char), 1, read_file);
	fread(&character_data->inherit_mark, sizeof(char), 1, read_file);
	fread(&character_data->inherit_direction_fixed, sizeof(char), 1, read_file);
	fread(&character_data->inherit_flying, sizeof(char), 1, read_file);
	fread(&character_data->inherit_invincible, sizeof(char), 1, read_file);
	fread(&character_data->inherit_block, sizeof(char), 1, read_file);
	fread(&character_data->inherit_gigantic, sizeof(char), 1, read_file);
	fread(&character_data->inherit_synchronize_with_auto_scroll, sizeof(char), 1, read_file);
	fread(&character_data->inherit_line_of_sight, sizeof(char), 1, read_file);
	fread(&character_data->inherit_hp, sizeof(char), 1, read_file);
	fread(&character_data->inherit_sp, sizeof(char), 1, read_file);
	fread(&character_data->inherit_body_hit_detection_range, sizeof(char), 1, read_file);
	fread(&character_data->inherit_body_hit_power, sizeof(char), 1, read_file);
	fread(&character_data->inherit_body_hit_impact, sizeof(char), 1, read_file);
	fread(&character_data->inherit_body_hit_effect, sizeof(char), 1, read_file);
	fread(&character_data->inherit_defense, sizeof(char), 1, read_file);
	fread(&character_data->inherit_impact_resistance, sizeof(char), 1, read_file);
	fread(&character_data->inherit_stopping_ease_during_inertial_movement, sizeof(char), 1, read_file);
	fread(&character_data->inherit_action_condition, sizeof(char), 1, read_file);
	fread(&character_data->inherit_group, sizeof(char), 1, read_file);
	fread(&character_data->inherit_score, sizeof(char), 1, read_file);
	fread(&character_data->inherit_holds_item_at_same_position, sizeof(char), 1, read_file);
	fread(&character_data->inherit_action, sizeof(char), 1, read_file);

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		character_data->appearance_condition_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Basic_Condition_Data(&character_data->appearance_condition_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if(size > 0) {
		character_data->flow_data.resize(size);
		for(int i = 0; i < size; ++i) {
			Read_Flow_Data(&character_data->flow_data[i], read_file);
		}
	}
}

void Write_Character_Data(struct Character* character_data, FILE* write_file) {
	int temp_size;

	//initial 35 00 00 00
	fwrite(&character_data->start, sizeof(int), 1, write_file);

	fwrite(&character_data->inherit_palette, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_palette_data_number, sizeof(short int), 1, write_file);

	fwrite(&character_data->any_of_appearance_conditions_true, sizeof(char), 1, write_file);
	fwrite(&character_data->appearance_condition_once_met_always_true, sizeof(char), 1, write_file);
	fwrite(&character_data->facing_right, sizeof(char), 1, write_file);
	fwrite(&character_data->number_of_doubles, sizeof(char), 1, write_file);
	fwrite(&character_data->appearance_position_offset_x_bl, sizeof(short int), 1, write_file);
	fwrite(&character_data->appearance_position_offset_x_dot, sizeof(short int), 1, write_file);
	fwrite(&character_data->appearance_position_offset_y_bl, sizeof(short int), 1, write_file);
	fwrite(&character_data->appearance_position_offset_y_dot, sizeof(short int), 1, write_file);
	fwrite(&character_data->appearance_position_offset_x_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&character_data->appearance_position_offset_y_flip_if_facing_right, sizeof(char), 1, write_file);

	fwrite(&character_data->image_number, sizeof(short int), 1, write_file);
	fwrite(&character_data->image_type, sizeof(char), 1, write_file);
	fwrite(&character_data->image_offset, sizeof(short int), 1, write_file);
	fwrite(&character_data->animation_set, sizeof(short int), 1, write_file);
	fwrite(&character_data->z_coordinate, sizeof(char), 1, write_file);
	fwrite(&character_data->transparency, sizeof(char), 1, write_file);
	fwrite(&character_data->initial_character_effect, sizeof(short int), 1, write_file);
	fwrite(&character_data->initial_character_effect_execution_type, sizeof(char), 1, write_file);
	fwrite(&character_data->initial_character_effect_loop_execution, sizeof(char), 1, write_file);
	fwrite(&character_data->character_effect_on_death, sizeof(short int), 1, write_file);
	fwrite(&character_data->character_effect_on_death_execution_type, sizeof(char), 1, write_file);
	fwrite(&character_data->mark_display, sizeof(char), 1, write_file);
	fwrite(&character_data->mark_number, sizeof(short int), 1, write_file);

	fwrite(&character_data->operation, sizeof(short int), 1, write_file);
	fwrite(&character_data->faction, sizeof(char), 1, write_file);
	fwrite(&character_data->character_id, sizeof(char), 1, write_file);

	fwrite(&character_data->flying, sizeof(char), 1, write_file);
	fwrite(&character_data->direction_fixed, sizeof(char), 1, write_file);
	fwrite(&character_data->invincible, sizeof(char), 1, write_file);
	fwrite(&character_data->invincible_effect, sizeof(char), 1, write_file);
	fwrite(&character_data->block, sizeof(char), 1, write_file);
	fwrite(&character_data->gigantic, sizeof(char), 1, write_file);
	fwrite(&character_data->synchronize_with_auto_scroll, sizeof(char), 1, write_file);
	fwrite(&character_data->line_of_sight, sizeof(char), 1, write_file);
	fwrite(&character_data->line_of_sight_range, sizeof(char), 1, write_file);

	fwrite(&character_data->hp, sizeof(int), 1, write_file);
	fwrite(&character_data->sp, sizeof(int), 1, write_file);
	fwrite(&character_data->stopping_ease_during_inertial_movement, sizeof(short int), 1, write_file);
	fwrite(&character_data->body_hit_detection_range, sizeof(char), 1, write_file);
	fwrite(&character_data->body_hit_power, sizeof(int), 1, write_file);
	fwrite(&character_data->body_hit_impact, sizeof(char), 1, write_file);
	fwrite(&character_data->body_hit_effect, sizeof(short int), 1, write_file);
	fwrite(&character_data->defense, sizeof(int), 1, write_file);
	fwrite(&character_data->impact_resistance, sizeof(char), 1, write_file);

	fwrite(&character_data->score, sizeof(int), 1, write_file);
	fwrite(&character_data->holds_item_at_same_position, sizeof(char), 1, write_file);

	fwrite(&character_data->has_group, sizeof(char), 1, write_file);
	fwrite(&character_data->group_number, sizeof(short int), 1, write_file);
	fwrite(&character_data->action_condition_range, sizeof(char), 1, write_file);
	fwrite(&character_data->action_condition_judgment_type, sizeof(char), 1, write_file);

	fwrite(&character_data->unknown1, sizeof(int), 1, write_file);

	temp_size = character_data->character_name.size() + 1;
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 1) {
		fwrite(character_data->character_name.c_str(), sizeof(char), temp_size, write_file);
	}

	fwrite(&character_data->position_x, sizeof(short int), 1, write_file);
	fwrite(&character_data->position_y, sizeof(short int), 1, write_file);
	fwrite(&character_data->unknown2, sizeof(int), 1, write_file);

	fwrite(&character_data->number_of_inherited_data, sizeof(int), 1, write_file);
	fwrite(&character_data->inherit_character_name, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_operation, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_faction, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_character_id, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_appearance_condition, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_facing_right, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_number_of_doubles, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_initial_position_offset_x, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_initial_position_offset_y, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_image, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_animation_set, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_z_coordinate, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_transparency, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_initial_character_effect, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_character_effect_on_death, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_mark, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_direction_fixed, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_flying, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_invincible, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_block, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_gigantic, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_synchronize_with_auto_scroll, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_line_of_sight, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_hp, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_sp, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_body_hit_detection_range, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_body_hit_power, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_body_hit_impact, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_body_hit_effect, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_defense, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_impact_resistance, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_stopping_ease_during_inertial_movement, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_action_condition, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_group, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_score, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_holds_item_at_same_position, sizeof(char), 1, write_file);
	fwrite(&character_data->inherit_action, sizeof(char), 1, write_file);

	temp_size = character_data->appearance_condition_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Basic_Condition_Data(&character_data->appearance_condition_data[i], write_file);
		}
	}

	temp_size = character_data->flow_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Flow_Data(&character_data->flow_data[i], write_file);
		}
	}
}

