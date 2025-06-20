#include <stdio.h>
#include <stdlib.h>
#include "Stage_Palette.h"
#include "Stage_Block.h"
#include "Stage_Character.h"
#include "Stage_Item.h"
#include "Background.h"
#include "Stage.h"

void Read_Stage(struct Stage* stage, FILE* read_file) {
	char* temp_str;
	fread(&stage->version, sizeof(int), 1, read_file);
	fread(&stage->unknown1, sizeof(int), 1, read_file);
	fread(&stage->horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->vertical_movement_change_amount, sizeof(int), 1, read_file);
	fread(&stage->vertical_movement_change_amount_exponent, sizeof(int), 1, read_file);
	fread(&stage->vertical_width, sizeof(int), 1, read_file);
	fread(&stage->horizontal_scroll_minimum_value_enabled, sizeof(int), 1, read_file);
	fread(&stage->horizontal_scroll_maximum_value_enabled, sizeof(int), 1, read_file);
	fread(&stage->vertical_scroll_minimum_value_enabled, sizeof(int), 1, read_file);
	fread(&stage->vertical_scroll_maximum_value_enabled, sizeof(int), 1, read_file);
	fread(&stage->horizontal_scroll_minimum_value, sizeof(int), 1, read_file);
	fread(&stage->horizontal_scroll_maximum_value, sizeof(int), 1, read_file);
	fread(&stage->vertical_scroll_minimum_value, sizeof(int), 1, read_file);
	fread(&stage->vertical_scroll_maximum_value, sizeof(int), 1, read_file);
	fread(&stage->frame_rate, sizeof(int), 1, read_file);
	fread(&stage->time_limit_enabled, sizeof(int), 1, read_file);
	fread(&stage->time_limit, sizeof(int), 1, read_file);
	fread(&stage->warning_sound_start_time, sizeof(int), 1, read_file);
	fread(&stage->horizontal_auto_scroll_enabled, sizeof(int), 1, read_file);
	fread(&stage->vertical_auto_scroll_enabled, sizeof(int), 1, read_file);
	fread(&stage->horizontal_auto_scroll_speed, sizeof(int), 1, read_file);
	fread(&stage->vertical_auto_scroll_speed, sizeof(int), 1, read_file);
	fread(&stage->gravity, sizeof(double), 1, read_file);
	fread(&stage->collision_detection_level, sizeof(int), 1, read_file);
	fread(&stage->character_vs_shot_collision_detection_accuracy, sizeof(int), 1, read_file);
	fread(&stage->bgm_number, sizeof(int), 1, read_file);
	fread(&stage->bgm_loop, sizeof(int), 1, read_file);
	fread(&stage->do_not_replay_same_bgm, sizeof(int), 1, read_file);
	fread(&stage->z_coordinate_enabled, sizeof(int), 1, read_file);
	fread(&stage->inherit_status_from_stock, sizeof(int), 1, read_file);
	fread(&stage->store_status_to_stock, sizeof(int), 1, read_file);
	fread(&stage->status_window_display, sizeof(int), 1, read_file);
	fread(&stage->switch_scene_immediately_on_clear, sizeof(int), 1, read_file);
	fread(&stage->allow_replay_saving, sizeof(int), 1, read_file);
	fread(&stage->stage_display, sizeof(int), 1, read_file);
	fread(&stage->ready_display, sizeof(int), 1, read_file);
	fread(&stage->clear_display, sizeof(int), 1, read_file);
	fread(&stage->gameover_display, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_walking_vs_block_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_walking_vs_block_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_flying_vs_block_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_flying_vs_block_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_walking_vs_character_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_walking_vs_character_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_flying_vs_character_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_flying_vs_character_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_shot_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_shot_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_item_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_item_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_walking_vs_block_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_flying_vs_block_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_walking_vs_character_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_flying_vs_character_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_block_display, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_character_display, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_shot_display, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_item_display, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_block_display_color, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_character_display_color, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_shot_display_color, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_vs_item_display_color, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_walking_vs_block_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_walking_vs_block_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_flying_vs_block_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_flying_vs_block_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_walking_vs_character_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_walking_vs_character_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_flying_vs_character_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_flying_vs_character_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_vs_shot_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_vs_shot_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_walking_vs_block_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_flying_vs_block_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_walking_vs_character_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_flying_vs_character_position, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_item_vs_character_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_item_vs_character_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_shots_vs_character_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_shots_vs_character_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_shots_vs_shot_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_main_character_shots_vs_shot_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_shots_vs_character_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_shots_vs_character_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_shots_vs_shot_horizontal_width, sizeof(int), 1, read_file);
	fread(&stage->collision_detection_enemy_shots_vs_shot_vertical_width, sizeof(int), 1, read_file);
	fread(&stage->unknown2, sizeof(int), 1, read_file);
	fread(&stage->x_coordinate_upper_limit, sizeof(int), 1, read_file);
	fread(&stage->y_coordinate_upper_limit, sizeof(int), 1, read_file);
	fread(&stage->bytes361_408, sizeof(char), 48, read_file);
	fread(&stage->do_not_take_damage_outside_screen, sizeof(int), 1, read_file);
	fread(&stage->main_character_same_character_continuous_damage_invalidation_time, sizeof(int), 1, read_file);
	fread(&stage->main_character_continuous_damage_invalidation_time, sizeof(int), 1, read_file);
	fread(&stage->enemy_same_character_continuous_damage_invalidation_time, sizeof(int), 1, read_file);
	fread(&stage->enemy_continuous_damage_invalidation_time, sizeof(int), 1, read_file);
	fread(&stage->unknown3, sizeof(int), 1, read_file);
	fread(&stage->stage_name_length, sizeof(int), 1, read_file);
	if (stage->stage_name_length > 1) {
		temp_str = new char[stage->stage_name_length];
		fread(temp_str, sizeof(char), stage->stage_name_length, read_file);
		stage->stage_name = temp_str;
		delete[] temp_str;
	}
	fread(&stage->number_of_ranking_items, sizeof(int), 1, read_file);
	fread(&stage->ranking_score, sizeof(int), 1, read_file);
	fread(&stage->ranking_remaining_time, sizeof(int), 1, read_file);
	fread(&stage->ranking_clear_time, sizeof(int), 1, read_file);
	fread(&stage->ranking_remaining_hp, sizeof(int), 1, read_file);
	fread(&stage->ranking_remaining_sp, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_number_of_items, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_left_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_right_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_up_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_down_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_left_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_right_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_up_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_down_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_non_block_characters_end, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_number_of_items, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_left_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_right_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_up_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_down_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_left_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_right_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_up_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_down_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_block_characters_end, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_number_of_items, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_left_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_right_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_up_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_down_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_left_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_right_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_up_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_down_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_items_end, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_number_of_items, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_left_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_right_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_up_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_down_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_left_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_right_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_up_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_down_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_main_character_shots_end, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_number_of_items, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_left_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_right_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_up_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_down_enabled, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_left_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_right_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_up_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_down_range, sizeof(int), 1, read_file);
	fread(&stage->automatic_disappearance_enemy_shots_end, sizeof(int), 1, read_file);
	Read_Stage_Palette(&stage->stage_palette, read_file, 0);
	fread(&stage->number_of_block_data, sizeof(int), 1, read_file);
	if(stage->number_of_block_data > 0) {
		stage->block_data.resize(stage->number_of_block_data);
		for(int i = 0; i < stage->number_of_block_data; ++i) {
			Read_Stage_Block_Data(&stage->block_data[i], read_file);
		}
	}
	fread(&stage->number_of_character_data, sizeof(int), 1, read_file);
	if(stage->number_of_character_data > 0) {
		stage->character_data.resize(stage->number_of_character_data);
		for(int i = 0; i < stage->number_of_character_data; ++i) {
			Read_Stage_Character_Data(&stage->character_data[i], read_file);
		}
	}
	fread(&stage->number_of_item_data, sizeof(int), 1, read_file);
	if(stage->number_of_item_data > 0) {
		stage->item_data.resize(stage->number_of_item_data);
		for(int i = 0; i < stage->number_of_item_data; ++i) {
			Read_Stage_Item_Data(&stage->item_data[i], read_file);
		}
	}
	fread(&stage->number_of_background_data, sizeof(int), 1, read_file);
	if (stage->number_of_background_data > 0) {
		stage->background_data.resize(stage->number_of_background_data);
		for (int i = 0; i < stage->number_of_background_data; ++i) {
			Read_Background(&stage->background_data[i], read_file);
		}
	}
	fread(&stage->number_of_stage_variables, sizeof(int), 1, read_file);
	for (int i = 0; i < 1000; ++i) {
		fread(&stage->stage_variable_name_unknown1[i], sizeof(int), 1, read_file);
		fread(&stage->stage_variable_name_unknown2[i], sizeof(int), 1, read_file);
		fread(&stage->stage_variable_name_length[i], sizeof(int), 1, read_file);
		if (stage->stage_variable_name_length[i] > 1) {
			fread(stage->stage_variable_name[i], sizeof(char), stage->stage_variable_name_length[i], read_file);
		}
	}
	fread(&stage->end, sizeof(int), 1, read_file);
}

void Write_Stage(struct Stage* stage, FILE* write_file) {
	fwrite(&stage->version, sizeof(int), 1, write_file);
	fwrite(&stage->unknown1, sizeof(int), 1, write_file);
	fwrite(&stage->horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_movement_change_amount, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_movement_change_amount_exponent, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->horizontal_scroll_minimum_value_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->horizontal_scroll_maximum_value_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_scroll_minimum_value_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_scroll_maximum_value_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->horizontal_scroll_minimum_value, sizeof(int), 1, write_file);
	fwrite(&stage->horizontal_scroll_maximum_value, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_scroll_minimum_value, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_scroll_maximum_value, sizeof(int), 1, write_file);
	fwrite(&stage->frame_rate, sizeof(int), 1, write_file);
	fwrite(&stage->time_limit_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->time_limit, sizeof(int), 1, write_file);
	fwrite(&stage->warning_sound_start_time, sizeof(int), 1, write_file);
	fwrite(&stage->horizontal_auto_scroll_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_auto_scroll_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->horizontal_auto_scroll_speed, sizeof(int), 1, write_file);
	fwrite(&stage->vertical_auto_scroll_speed, sizeof(int), 1, write_file);
	fwrite(&stage->gravity, sizeof(double), 1, write_file);
	fwrite(&stage->collision_detection_level, sizeof(int), 1, write_file);
	fwrite(&stage->character_vs_shot_collision_detection_accuracy, sizeof(int), 1, write_file);
	fwrite(&stage->bgm_number, sizeof(int), 1, write_file);
	fwrite(&stage->bgm_loop, sizeof(int), 1, write_file);
	fwrite(&stage->do_not_replay_same_bgm, sizeof(int), 1, write_file);
	fwrite(&stage->z_coordinate_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->inherit_status_from_stock, sizeof(int), 1, write_file);
	fwrite(&stage->store_status_to_stock, sizeof(int), 1, write_file);
	fwrite(&stage->status_window_display, sizeof(int), 1, write_file);
	fwrite(&stage->switch_scene_immediately_on_clear, sizeof(int), 1, write_file);
	fwrite(&stage->allow_replay_saving, sizeof(int), 1, write_file);
	fwrite(&stage->stage_display, sizeof(int), 1, write_file);
	fwrite(&stage->ready_display, sizeof(int), 1, write_file);
	fwrite(&stage->clear_display, sizeof(int), 1, write_file);
	fwrite(&stage->gameover_display, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_walking_vs_block_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_walking_vs_block_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_flying_vs_block_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_flying_vs_block_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_walking_vs_character_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_walking_vs_character_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_flying_vs_character_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_flying_vs_character_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_shot_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_shot_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_item_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_item_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_walking_vs_block_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_flying_vs_block_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_walking_vs_character_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_flying_vs_character_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_block_display, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_character_display, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_shot_display, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_item_display, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_block_display_color, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_character_display_color, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_shot_display_color, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_vs_item_display_color, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_walking_vs_block_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_walking_vs_block_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_flying_vs_block_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_flying_vs_block_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_walking_vs_character_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_walking_vs_character_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_flying_vs_character_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_flying_vs_character_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_vs_shot_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_vs_shot_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_walking_vs_block_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_flying_vs_block_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_walking_vs_character_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_flying_vs_character_position, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_item_vs_character_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_item_vs_character_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_shots_vs_character_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_shots_vs_character_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_shots_vs_shot_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_main_character_shots_vs_shot_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_shots_vs_character_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_shots_vs_character_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_shots_vs_shot_horizontal_width, sizeof(int), 1, write_file);
	fwrite(&stage->collision_detection_enemy_shots_vs_shot_vertical_width, sizeof(int), 1, write_file);
	fwrite(&stage->unknown2, sizeof(int), 1, write_file);
	fwrite(&stage->x_coordinate_upper_limit, sizeof(int), 1, write_file);
	fwrite(&stage->y_coordinate_upper_limit, sizeof(int), 1, write_file);
	fwrite(&stage->bytes361_408, sizeof(char), 48, write_file);
	fwrite(&stage->do_not_take_damage_outside_screen, sizeof(int), 1, write_file);
	fwrite(&stage->main_character_same_character_continuous_damage_invalidation_time, sizeof(int), 1, write_file);
	fwrite(&stage->main_character_continuous_damage_invalidation_time, sizeof(int), 1, write_file);
	fwrite(&stage->enemy_same_character_continuous_damage_invalidation_time, sizeof(int), 1, write_file);
	fwrite(&stage->enemy_continuous_damage_invalidation_time, sizeof(int), 1, write_file);
	fwrite(&stage->unknown3, sizeof(int), 1, write_file);
	fwrite(&stage->stage_name_length, sizeof(int), 1, write_file);
	if (stage->stage_name_length > 1) {
		fwrite(stage->stage_name.c_str(), sizeof(char), stage->stage_name_length, write_file);
	}
	fwrite(&stage->number_of_ranking_items, sizeof(int), 1, write_file);
	fwrite(&stage->ranking_score, sizeof(int), 1, write_file);
	fwrite(&stage->ranking_remaining_time, sizeof(int), 1, write_file);
	fwrite(&stage->ranking_clear_time, sizeof(int), 1, write_file);
	fwrite(&stage->ranking_remaining_hp, sizeof(int), 1, write_file);
	fwrite(&stage->ranking_remaining_sp, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_number_of_items, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_left_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_right_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_up_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_down_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_left_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_right_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_up_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_down_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_non_block_characters_end, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_number_of_items, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_left_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_right_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_up_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_down_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_left_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_right_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_up_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_down_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_block_characters_end, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_number_of_items, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_left_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_right_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_up_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_down_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_left_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_right_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_up_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_down_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_items_end, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_number_of_items, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_left_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_right_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_up_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_down_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_left_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_right_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_up_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_down_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_main_character_shots_end, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_number_of_items, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_left_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_right_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_up_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_down_enabled, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_left_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_right_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_up_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_down_range, sizeof(int), 1, write_file);
	fwrite(&stage->automatic_disappearance_enemy_shots_end, sizeof(int), 1, write_file);
	Write_Stage_Palette(&stage->stage_palette, write_file, 0);
	fwrite(&stage->number_of_block_data, sizeof(int), 1, write_file);
	if(stage->number_of_block_data > 0) {
		for(int i = 0; i < stage->number_of_block_data; ++i) {
			Write_Stage_Block_Data(&stage->block_data[i], write_file);
		}
	}
	fwrite(&stage->number_of_character_data, sizeof(int), 1, write_file);
	if(stage->number_of_character_data > 0) {
		for(int i = 0; i < stage->number_of_character_data; ++i) {
			Write_Stage_Character_Data(&stage->character_data[i], write_file);
		}
	}
	fwrite(&stage->number_of_item_data, sizeof(int), 1, write_file);
	if(stage->number_of_item_data > 0) {
		for(int i = 0; i < stage->item_data.size(); ++i) {
			Write_Stage_Item_Data(&stage->item_data[i], write_file);
		}
	}
	fwrite(&stage->number_of_background_data, sizeof(int), 1, write_file);
	if (stage->number_of_background_data > 0) {
		for (int i = 0; i < stage->number_of_background_data; ++i) {
			Write_Background(&stage->background_data[i], write_file);
		}
	}
	fwrite(&stage->number_of_stage_variables, sizeof(int), 1, write_file);
	for (int i = 0; i < 1000; ++i) {
		fwrite(&stage->stage_variable_name_unknown1[i], sizeof(int), 1, write_file);
		fwrite(&stage->stage_variable_name_unknown2[i], sizeof(int), 1, write_file);
		fwrite(&stage->stage_variable_name_length[i], sizeof(int), 1, write_file);
		if (stage->stage_variable_name_length[i] > 1) {
			fwrite(stage->stage_variable_name[i], sizeof(char), stage->stage_variable_name_length[i], write_file);
		}
	}
	fwrite(&stage->end, sizeof(int), 1, write_file);
}
