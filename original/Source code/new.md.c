```cpp
#include <stdio.h>
#include "BGM_Playback_Details.h"

void Read_BGM_Playback_Details(struct BGM_Playback_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 41, read_file);
}

void Write_BGM_Playback_Details(struct BGM_Playback_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char), 41, write_file);
}
```

```cpp
#pragma once

struct BGM_Playback_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[41];
};

void Read_BGM_Playback_Details(struct BGM_Playback_Details* details, FILE* read_file);
void Write_BGM_Playback_Details(struct BGM_Playback_Details* details, FILE* write_file);
```

```cpp
#include <DxLib.h>
#include <stdio.h>

#include "Character_Exclusive_Bmp_Database.h"
#include "Sword_Type_Database.h"
#include "Effect_Database.h"
#include "Character_Effect_Database.h"
#include "Sound_Effect_Database.h"

#include "Wait_Details.h"
#include "Linear_Movement_Details.h"
#include "Ground_Movement_Details.h"
#include "Charge_Movement_Details.h"
#include "Circular_Movement_Details.h"
#include "Guided_Movement_Details.h"
#include "Screen_Outside_Avoidance_Movement_Details.h"
#include "Movement_Invalidation_Details.h"
#include "Direction_Change_Details.h"
#include "Jump_Details.h"
#include "Shot_Details.h"
#include "Sword_Details.h"
#include "Block_Summon_Details.h"
#include "Character_Summon_Details.h->h"
#include "Item_Summon_Details.h"
#include "Flow_Operation_Details.h"
#include "Stage_Clear_Details.h"
#include "Game_Wait_Details.h"
#include "Message_Details.h"
#include "Warp_Details.h"
#include "Target_Setting_Details.h"
#include "Status_Operation_Details.h"
#include "Status_Operation_2_Details.h"
#include "Disappearance_Details.h"
#include "Item_Acquisition_Details.h"
#include "Graphic_Change_Details.h"
#include "Basic_Animation_Set_Change_Details.h"
#include "Animation_Execution_Details.h"
#include "Effect_Execution_Details.h"
#include "Character_Effect_Execution_Details.h"
#include "Screen_Effect_Execution_Details.h"
#include "Picture_Display_Details.h"
#include "Screen_Color_Change_Details.h"
#include "Background_Change_Details.h"
#include "Sound_Effect_Playback_Details.h"
#include "BGM_Playback_Details.h"
#include "Code_Execution_Details.h"
#include "Arrangement_Details.h"
#include "Loop_Details.h"

#include "Common_Palette.h"
#include "Stage.h"
#include "Key_Config.h"
#include "World_Map.h"

int Key[256];
struct Character_Exclusive_Bmp_Database* character_exclusive_bmp_data;
struct Sword_Type_Database* sword_type_data;
struct Effect_Database* effect_data;
struct Character_Effect_Database* character_effect_data;
struct Sound_Effect_Database* sound_effect_data;
struct Common_Palette* common_palette;

int font_data[2];

int world_chip_image[75];
int world_event_image[30];
int window_image;
int status_window_image;
int window_frame_color_code;
int text_color_code;
int block_image[8 * 15];//8 across, 15 down. order is from top left downwards.
int character_image[120][20];//120 characters 20 frames.
int character_exclusive_image[999][120];//999 sheets 120 frames
int item_image[15*8*2];//15 down 8 across 2 frames each
int mini_item_image[15 * 8 * 2];
int shot_image[30*4*2];//30 down 4 across 2 frames each
int sword_image[128][2];//128 types left/right
int mark_image[8 * 15];//8 across, 150 down.
int effect_image[1000][640];//1000 sheets 640 frames

int accessory_image_cursor[2];
int accessory_image_mini_cursor[2];
int accessory_image_scrollbar[2];//selection screen for free mode and replay mode. [0] is the currently displayed range
int accessory_image_star;
int accessory_image_world_score;
int accessory_image_score;
int accessory_image_hp;
int accessory_image_sp;
int accessory_image_remaining_lives;
int accessory_image_1up;
int accessory_image_mini_star;
int accessory_image_world_map_player[8];
int accessory_image_hp_bar_empty;
int accessory_image_hp_bar;
int accessory_image_hp_bar_low;
int accessory_image_hp_bar_decrease;
int accessory_image_hp_bar_increase;
int accessory_image_mini_hp_bar_empty;
int accessory_image_mini_hp_bar;
int accessory_image_mini_hp_bar_low;
int accessory_image_mini_hp_bar_decrease;
int accessory_image_mini_hp_bar_increase;
int accessory_image_sp_bar_empty;
int accessory_image_sp_bar;
int accessory_image_sp_bar_low;
int accessory_image_sp_bar_decrease;
int accessory_image_sp_bar_increase;
int accessory_image_mini_sp_bar_empty;
int accessory_image_mini_sp_bar;
int accessory_image_mini_sp_bar_low;
int accessory_image_mini_sp_bar_decrease;
int accessory_image_mini_sp_bar_increase;

int word_image_stage;
int word_image_ready;
int word_image_replay;
int word_image_clear;
int word_image_gameover;
int word_image_red_number[10];
int word_image_pink_number[10];

int sound_effects[10000];
int damage_sound_effect;
int damage_invalid_sound_effect;
int main_character_death_sound_effect;
int enemy_death_sound_effect;
int block_jump_sound_effect;
int stage_clear_sound_effect;

struct Key_Config key_config;

constexpr int system_mode_title = 0;
constexpr int system_mode_world_map = 1;
constexpr int system_mode_game = 2;

int system_mode;

int title_state;
int title_bgm;
int title_selection;
int title_image;

int game_mode_image[7];

struct World_Map world_map_data;
std::vector<struct Event_Page*> world_map_event_page_pointers;

struct World_Map_Control {
    int state;
    int blink_timer;
    int player_position_x;
    int player_position_y;
    int player_direction;
    int player_blink;
    int background_color_code;
    std::string window_message;
} world_map_control;

struct Game_Flow {
    int start;
    char id;
    char group;
    char test_play_only;
    char basic_condition_judgment_type;
    char basic_condition_once_met_always_met;
    char timing;
    char target_character_involved_in_timing;
    char target_number_of_character_involved_in_timing;
    char ease_of_input_with_multiple_key_conditions;
    char allow_continuous_execution_by_holding_key;

    int unknown2;

    int memo_length;
    std::string memo;
    std::vector<Basic_Condition> basic_condition_data;
    std::vector<Key_Condition> key_condition_data;
    std::vector<Command> command_data;

    int executing_command;//-1 is not executing. otherwise, the corresponding command is executing
    int command_execution_time;
    int state;//-1: normal 0:start 1:end 2:pause 3:resume 4:delete 5:permanent stop
};

struct Game_Character {
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
    int max_hp;
    int sp;
    int max_sp;
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

    double position_x;
    double position_y;
    int unknown2;

    std::vector<Basic_Condition> appearance_condition_data;
    std::vector<Game_Flow> flow_data;

    int flow_group_executing_flag[27];//0 is not used, 1-26 correspond to a-z.
    int continuous_damage_invalidation_time;
    int hp_bar_display_time;
    int hp_bar_current;
    int hp_bar_past;
    int sp_bar_display_time;
    int sp_bar_current;
    int sp_bar_past;
    int death;
    int disappearance;
    double movement_speed_x;
    double movement_speed_y;
    int movement_speed_multiplier; //changes with block action. unit is %
    double movement_amount_by_block;
    int on_ground;
    int not_on_ground_count;
    int landing_block_position;
    int block_item_acquisition_cooldown;
    int jumping;
    int jump_inputting;
    int jump_forbidden;
    int hit_block_left;
    int hit_block_right;
    int hit_block_up;
    int hit_block_down;
    int character_variables[8];
    Game_Character* target[4];
    short int executing_character_effect;
    int executing_character_effect_execution_time;
    char executing_character_effect_execution_type;
    char executing_character_effect_loop_execution;
};

struct Game_Item {
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

    double position_x;
    double position_y;

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

    int existence_time;
    int overlapping;
    int disappearance;
};

struct Shot {
    Game_Character* user;
    double position_x;
    double position_y;
    double angle;
    double initial_speed;
    double speed;
    double acceleration;
    short int graphic;
    char z_coordinate;
    char transparency;
    char facing_right;
    short int faction;
    short int gigantic;
    char movement_type;
    short int movement_type_parameter1;
    short int movement_type_parameter2;
    short int movement_type_parameter3;
    Game_Character *movement_target;
    char synchronize_with_auto_scroll;
    double flight_distance;
    char flight_distance_valid;
    short int flight_distance_limit;
    char flight_distance_does_not_disappear;
    int existence_time;
    char disappearance_time_valid;
    short int disappearance_time;
    char penetrate_blocks;
    char penetrate_characters;
    char penetrate_block_characters;
    char disappear_on_hitting_shot;
    char value_for_disappearing_on_hitting_shot;
    int power;
    int impact;
    int effect;
    int attack;
    int attack_id;
    int acquired_item_palette_type;
    int acquired_item_palette_number;
    int disappearance;
    int targeting_and_guidance_control;
    double fall_speed;
};

struct Sword {
    Game_Character* user;
    double position_x;
    double position_y;
    int faction;
    int sword_type;
    int sword_position_number;
    int sword_position_time;
    int gigantic;
    int power;
    int impact;
    int effect;
    int attack;
    int attack_id;
    int acquired_item_palette_type;
    int acquired_item_palette_number;
    int z_coordinate;
    int transparency;
    int facing_right;
    int disappearance;
};

struct Item_Acquisition_Display {
    double position_x;
    double position_y;
    short int image_type;
    char image_number;
    int existence_time;
};

struct Game_Effect {
    double position_x;
    double position_y;
    int effect_number;
    int animation_number;
    int animation_time;
    int disappearance;
};

struct System_Background_Management {
    int display_flag;
    int color_code;
    int image_handle;
    double image_offset_x;
    double image_offset_y;
};

constexpr int game_system_state_player_death = 3;

struct Game_System {
    int state; //0: playing 1:CLEAR display 2:fade out
    int state_control_count;
    int wait_time; //wait for execution time of character effect + 1 second on player death
    int remaining_time;
    int remaining_time_control_count;
    double horizontal_scroll_amount;
    double vertical_scroll_amount;
    int horizontal_scroll_minimum_value;
    int horizontal_scroll_maximum_value;
    int vertical_scroll_minimum_value;
    int vertical_scroll_maximum_value;
    int horizontal_auto_scroll_enabled;
    int vertical_auto_scroll_enabled;
    int horizontal_scroll_speed;
    int vertical_scroll_speed;
    int score;
    int world_score;
    int remaining_lives;
    int number_of_backgrounds;
    std::vector<System_Background_Management> background_management;
};

Block* game_blocks;
Game_Character* game_player;
std::vector<Game_Character> game_characters;
std::vector<Game_Item> game_items;
std::vector<Shot>game_shots;
std::vector<Sword> game_swords;
std::vector<struct Item_Acquisition_Display> item_acquisition_display;
std::vector<Game_Effect> game_effects;
struct Game_System game_system;

//prototype declaration
void Acquire_Item(Game_Item& item, Stage& stage_data);

void Update_World_Map_Event_Pages() {
    for (struct Event_Page*& event_page_pointer : world_map_event_page_pointers) {
        event_page_pointer = nullptr;
    }

    for (int y = 0; y < world_map_data.vertical_width; ++y) {
        for (int x = 0; x < world_map_data.horizontal_width; ++x) {
            for (struct Event& event : world_map_data.event_data) {
                if (event.placement_x == x && event.placement_y == y) {
                    world_map_event_page_pointers[world_map_data.horizontal_width * y + x] = &event.page_data[0];
                }
            }
        }
    }
}

void Move_World_Map(int x, int y) {
    if (x < 0 || x >= world_map_data.horizontal_width || y < 0 || y >= world_map_data.vertical_width) return;
    if (world_map_data.world_chip_data[world_map_data.map_chip_data[world_map_data.vertical_movement_change_amount * y + x]].movement_unavailable == 0) {
        world_map_control.player_position_x = x;
        world_map_control.player_position_y = y;
        Event_Page* event_page_pointer = world_map_event_page_pointers[world_map_data.horizontal_width * world_map_control.player_position_y + world_map_control.player_position_x];
        if (event_page_pointer != nullptr) {
            if (event_page_pointer->event_type == 0 && event_page_pointer->world_name.size() > 0) {
                world_map_control.window_message = event_page_pointer->world_name;
            }
            else {
                world_map_control.window_message = "";
            }
        }
        else {
            world_map_control.window_message = "";
        }
    }
}

void Draw_World_Chips() {
    int current_position_x;
    int current_position_y;
    for (int y = 0; y < 15; ++y) {
        current_position_y = world_map_control.player_position_y - 7 + y;
        if (current_position_y < 0 || current_position_y >= world_map_data.vertical_width) continue;
        for (int x = 0; x < 20; ++x) {
            current_position_x = world_map_control.player_position_x - 10 + x;
            if (current_position_x < 0 || current_position_y >= world_map_data.horizontal_width) continue;
            DrawGraph(32 * x - 16, 32 * y, world_chip_image[world_map_data.world_chip_data[world_map_data.map_chip_data[world_map_data.vertical_movement_change_amount * current_position_y + current_position_x]].graphic], TRUE);
        }
    }
}

void Draw_World_Events() {
    int current_position_x;
    int current_position_y;
    for (int y = 0; y < 15; ++y) {
        current_position_y = world_map_control.player_position_y - 7 + y;
        if (current_position_y < 0 || current_position_y >= world_map_data.vertical_width) continue;
        for (int x = 0; x < 20; ++x) {
            current_position_x = world_map_control.player_position_x - 10 + x;
            if (current_position_x < 0 || current_position_y >= world_map_data.horizontal_width) continue;
            if (world_map_event_page_pointers[world_map_data.horizontal_width * current_position_y + current_position_x] != nullptr) {
                DrawGraph(32 * x - 16, 32 * y, world_event_image[world_map_event_page_pointers[world_map_data.horizontal_width * current_position_y + current_position_x]->graphic * 2], TRUE);
            }
        }
    }
}

void Draw_World_Map_Window() {
    if (world_map_control.window_message.size() > 0) {
        int width = GetDrawStringWidth(world_map_control.window_message.c_str(),world_map_control.window_message.size());
        DrawRectGraph(320 - width / 2 - 1, 212 - 10, 0, 0, width + 2, 18, window_image, FALSE);
        DrawString(320 - width / 2, 212 - 9, world_map_control.window_message.c_str(), text_color_code);
        DrawBox(320 - width / 2 - 1, 212 - 10, 320 + width / 2 + 1, 212 + 10, window_frame_color_code, FALSE);
    }
}

void Convert_Flow_Editor_to_Game(Flow* flow, Game_Flow* game_flow) {
    game_flow->start = flow->start;
    game_flow->id = flow->id;
    game_flow->group = flow->group;
    game_flow->test_play_only = flow->test_play_only;
    game_flow->basic_condition_judgment_type = flow->basic_condition_judgment_type;
    game_flow->basic_condition_once_met_always_met = flow->basic_condition_once_met_always_met;
    game_flow->timing = flow->timing;
    game_flow->target_character_involved_in_timing = flow->target_character_involved_in_timing;
    game_flow->target_number_of_character_involved_in_timing = flow->target_number_of_character_involved_in_timing;
    game_flow->ease_of_input_with_multiple_key_conditions = flow->ease_of_input_with_multiple_key_conditions;
    game_flow->allow_continuous_execution_by_holding_key = flow->allow_continuous_execution_by_holding_key;

    game_flow->unknown2 = flow->unknown2;

    game_flow->memo_length = flow->memo_length;
    game_flow->memo = flow->memo;
    game_flow->basic_condition_data = flow->basic_condition_data;
    game_flow->key_condition_data = flow->key_condition_data;
    game_flow->command_data = flow->command_data;

    game_flow->executing_command = -1;
    game_flow->command_execution_time = 0;
    game_flow->state = -1;
}

void Convert_Character_Editor_to_Game(Character* character, Game_Character* game_character) {
    game_character->start = character->start;
    game_character->inherit_palette = character->inherit_palette;
    game_character->inherit_palette_data_number = character->inherit_palette_data_number;
    game_character->any_of_appearance_conditions_true = character->any_of_appearance_conditions_true;
    game_character->appearance_condition_once_met_always_true = character->appearance_condition_once_met_always_true;
    game_character->facing_right = character->facing_right;
    game_character->number_of_doubles = character->number_of_doubles;
    game_character->appearance_position_offset_x_bl = character->appearance_position_offset_x_bl;
    game_character->appearance_position_offset_x_dot = character->appearance_position_offset_x_dot;
    game_character->appearance_position_offset_y_bl = character->appearance_position_offset_y_bl;
    game_character->appearance_position_offset_y_dot = character->appearance_position_offset_y_dot;
    game_character->appearance_position_offset_x_flip_if_facing_right = character->appearance_position_offset_x_flip_if_facing_right;
    game_character->appearance_position_offset_y_flip_if_facing_right = character->appearance_position_offset_y_flip_if_facing_right;
    game_character->image_number = character->image_number;
    game_character->image_type = character->image_type;
    game_character->image_offset = character->image_offset;
    game_character->animation_set = character->animation_set;
    game_character->z_coordinate = character->z_coordinate;
    game_character->transparency = character->transparency;
    game_character->initial_character_effect = character->initial_character_effect;
    game_character->initial_character_effect_execution_type = character->initial_character_effect_execution_type;
    game_character->initial_character_effect_loop_execution = character->initial_character_effect_loop_execution;
    game_character->character_effect_on_death = character->character_effect_on_death;
    game_character->character_effect_on_death_execution_type = character->character_effect_on_death_execution_type;
    game_character->mark_display = character->mark_display;
    game_character->mark_number = character->mark_number;
    game_character->operation = character->operation;
    game_character->faction = character->faction;
    game_character->character_id = character->character_id;
    game_character->flying = character->flying;
    game_character->direction_fixed = character->direction_fixed;
    game_character->invincible = character->invincible;
    game_character->invincible_effect = character->invincible_effect;
    game_character->block = character->block;
    game_character->gigantic = character->gigantic;
    game_character->synchronize_with_auto_scroll = character->synchronize_with_auto_scroll;
    game_character->line_of_sight = character->line_of_sight;
    game_character->line_of_sight_range = character->line_of_sight_range;
    game_character->hp = character->hp;
    game_character->max_hp = character->hp;
    game_character->sp = character->sp;
    game_character->max_sp = character->sp;
    game_character->stopping_ease_during_inertial_movement = character->stopping_ease_during_inertial_movement;
    game_character->body_hit_detection_range = character->body_hit_detection_range;
    game_character->body_hit_power = character->body_hit_power;
    game_character->body_hit_impact = character->body_hit_impact;
    game_character->body_hit_effect = character->body_hit_effect;
    game_character->defense = character->defense;
    game_character->impact_resistance = character->impact_resistance;
    game_character->score = character->score;
    game_character->holds_item_at_same_position = character->holds_item_at_same_position;
    game_character->has_group = character->has_group;
    game_character->group_number = character->group_number;
    game_character->action_condition_range = character->action_condition_range;
    game_character->action_condition_judgment_type = character->action_condition_judgment_type;
    game_character->unknown1 = character->unknown1;
    game_character->character_name = character->character_name;
    game_character->position_x = character->position_x * 32 + 16;
    game_character->position_y = character->position_y * 32 + 16 - 16 * (game_character->gigantic - 1);
    game_character->unknown2 = character->unknown2;
    game_character->appearance_condition_data = character->appearance_condition_data;
    for (Flow& flow : character->flow_data) {
        Game_Flow* temp_flow = new Game_Flow();
        Convert_Flow_Editor_to_Game(&flow, temp_flow);
        game_character->flow_data.push_back(*temp_flow);
        delete temp_flow;
    }
    game_character->continuous_damage_invalidation_time = 0;
    game_character->hp_bar_display_time = 0;
    game_character->hp_bar_current = 100;
    game_character->hp_bar_past = 100;
    game_character->sp_bar_display_time = 0;
    game_character->sp_bar_current = 100;
    game_character->sp_bar_past = 100;

    game_character->death = 0;
    game_character->disappearance = 0;
    game_character->movement_speed_multiplier = 100;
    game_character->movement_amount_by_block = 0;
    game_character->landing_block_position = -1;
    game_character->block_item_acquisition_cooldown = 0;
    game_character->jump_forbidden = 0;
    game_character->hit_block_left = 0;
    game_character->hit_block_right = 0;
    game_character->hit_block_up = 0;
    game_character->hit_block_down = 0;
    for (int& character_variable : game_character->character_variables) {
        character_variable = 0;
    }
    game_character->target[0] = nullptr; //set to game player after all character processing is done
    game_character->target[1] = nullptr;
    game_character->target[2] = nullptr;
    game_character->target[3] = nullptr;
    game_character->executing_character_effect = 0;
    game_character->executing_character_effect_execution_time = 0;
    game_character->executing_character_effect_execution_type = 0;
    game_character->executing_character_effect_loop_execution = 0;
}


void Convert_Item_Editor_to_Game(Item* item, Game_Item* game_item) {
    game_item->start = item->start;
    game_item->inherit_palette = item->inherit_palette;
    game_item->inherit_palette_data_number = item->inherit_palette_data_number;
    game_item->any_of_appearance_conditions_true = item->any_of_appearance_conditions_true;
    game_item->appearance_condition_once_met_always_true = item->appearance_condition_once_met_always_true;
    game_item->appearance_position_offset_x_dot = item->appearance_position_offset_x_dot;
    game_item->appearance_position_offset_y_dot = item->appearance_position_offset_y_dot;
    game_item->image_number = item->image_number;
    game_item->image_type = item->image_type;
    game_item->frame = item->frame;
    game_item->z_coordinate = item->z_coordinate;
    game_item->transparency = item->transparency;
    game_item->mark_display = item->mark_display;
    game_item->mark_number = item->mark_number;
    game_item->display_above_head_on_acquisition = item->display_above_head_on_acquisition;
    game_item->acquisition_type = item->acquisition_type;
    game_item->gigantic = item->gigantic;
    game_item->sound_effect = item->sound_effect;
    game_item->unknown = item->unknown;
    game_item->item_name_length = item->item_name_length;
    game_item->item_name = item->item_name;
    game_item->position_x = item->position_x * 32 + 16;
    game_item->position_y = item->position_y * 32 + 16;
    game_item->number_of_inherited_data = item->number_of_inherited_data;
    game_item->inherit_item_name = item->inherit_item_name;
    game_item->inherit_appearance_condition = item->inherit_appearance_condition;
    game_item->inherit_initial_position_offset_x = item->inherit_initial_position_offset_x;
    game_item->inherit_initial_position_offset_y = item->inherit_initial_position_offset_y;
    game_item->inherit_image = item->inherit_image;
    game_item->inherit_z_coordinate = item->inherit_z_coordinate;
    game_item->inherit_transparency = item->inherit_transparency;
    game_item->inherit_mark = item->inherit_mark;
    game_item->inherit_gigantic = item->inherit_gigantic;
    game_item->inherit_acquisition_type = item->inherit_acquisition_type;
    game_item->inherit_display_above_head_on_acquisition = item->inherit_display_above_head_on_acquisition;
    game_item->inherit_sound_effect = item->inherit_sound_effect;
    game_item->inherit_effect = item->inherit_effect;
    game_item->number_of_appearance_condition_data = item->number_of_appearance_condition_data;
    game_item->appearance_condition_data = item->appearance_condition_data;
    game_item->number_of_effects = item->number_of_effects;
    game_item->effects = item->effects;

    game_item->existence_time = 0;
    game_item->overlapping = 0;
    game_item->disappearance = 0;
}

int GetHitKeyStateAll_2(int GetHitKeyStateAll_InputKey[]) {
    char GetHitKeyStateAll_Key[256];
    GetHitKeyStateAll(GetHitKeyStateAll_Key);
    for (int i = 0; i < 256; i++) {
        if (GetHitKeyStateAll_Key[i] == 1) GetHitKeyStateAll_InputKey[i]++;
        else                            GetHitKeyStateAll_InputKey[i] = 0;
    }
    return 0;
}

int Get_Color_Code_From_Palette_Image(int color_number) {
    int soft_image = LoadARGB8ColorSoftImage("bmp/plt/Palette.bmp");
    int r, g, b, a;
    GetPixelSoftImage(soft_image, color_number % 16, 8 + color_number / 16, &r, &g, &b, &a);
    DeleteSoftImage(soft_image);

    return GetColor(r, g, b);
}

int Load_Transparent_Bmp_Image(const TCHAR* file_name) {
    int soft_image = LoadARGB8ColorSoftImage(file_name);
    int width, height;
    int r, g, b, a;
    GetSoftImageSize(soft_image, &width, &height);
    for (int y = 0; y < height; ++y) {
        for (int x = 0; x < width; ++x) {
            GetPixelSoftImage(soft_image, x, y, &r, &g, &b, &a);
            if (r == 0 && g == 177 && b == 0) {
                DrawPixelSoftImage(soft_image, x, y, r, g, b, 0);
            }
        }
    }
    int image_handle = CreateGraphFromSoftImage(soft_image);
    DeleteSoftImage(soft_image);
    return image_handle;
}

void Load_World_Chip_Images() {
    int temp_image_handle = Load_Transparent_Bmp_Image("bmp/WorldMapChip.bmp");
    int i = 0;
    for (int y = 0; y < 15; ++y) {
        for (int x = 0; x < 5; ++x) {
            world_chip_image[i] = DerivationGraph(32 * x, 32 * y, 32, 32, temp_image_handle);
            ++i;
        }
    }
    DeleteGraph(temp_image_handle);
}

void Load_World_Event_Images() {
    int temp_image_handle = Load_Transparent_Bmp_Image("bmp/WorldEvent.bmp");
    int i = 0;
    for (int y = 0; y < 15; ++y) {
        for (int x = 0; x < 2; ++x) {
            world_event_image[i] = DerivationGraph(32 * x, 32 * y, 32, 32, temp_image_handle);
            ++i;
        }
    }
    DeleteGraph(temp_image_handle);
}

void Load_Game_Mode_Images() {
    int temp_image_handle = Load_Transparent_Bmp_Image("bmp/GameMode.bmp");
    for (int i = 0; i < 7; ++i) {
        game_mode_image[i] = DerivationGraph(0, 32 * i, 160, 32, temp_image_handle);
    }
    DeleteGraph(temp_image_handle);
}

void Load_Block_Images() {
    int all_block_image_handle = Load_Transparent_Bmp_Image("bmp/Block.bmp");
    int i = 0;
    for(int x = 0; x < 8; ++x){
        for (int y = 0; y < 15; ++y) {
            block_image[i]=DerivationGraph(x*32,y*32,32,32,all_block_image_handle);
            i++;
        }
    }
    DeleteGraph(all_block_image_handle);
}

void Load_Character_Images() {
    char file_name[19];
    int temp_image_handle;
    int image_size_x,image_size_y;
    int character_number = 0;
    int frame_number = 0;
    int number_of_characters;
    int number_of_frames;
    for (int file_number = 1; file_number <= 8; ++file_number) {
        sprintf(file_name,"bmp/Character%d.bmp", file_number);
        temp_image_handle = Load_Transparent_Bmp_Image(file_name);
        GetGraphSize(temp_image_handle, &image_size_x, &image_size_y);
        number_of_characters = image_size_y / 32;
        number_of_frames = image_size_x / 32;
        for (int i = 0; i < number_of_characters; ++i) {
            for (frame_number = 0; frame_number < number_of_frames; ++frame_number) {
                character_image[character_number][frame_number] = DerivationGraph(32 * frame_number, 32 * i, 32, 32, temp_image_handle);
            }
            ++character_number;
        }
        DeleteGraph(temp_image_handle);
    }
}

// comment to avoid code page error

 void Load_Character_Exclusive_Images() {
    int temp_image_handle;
    int image_size_x, image_size_y;
    int number_of_vertical_sheets;
    int number_of_horizontal_sheets;
    int frame_size;
    int frame_number;
    for (int i = 1; i < character_exclusive_bmp_data->records.size(); ++i) {
        temp_image_handle = Load_Transparent_Bmp_Image(character_exclusive_bmp_data->records[i].path.c_str());
        GetGraphSize(temp_image_handle, &image_size_x, &image_size_y);
        if (character_exclusive_bmp_data->records[i].is_gigantic_character) {
            frame_size = 32 * character_exclusive_bmp_data->records[i].size;
        }
        else {
            frame_size = 32;
        }
        number_of_vertical_sheets = image_size_y / frame_size;
         number_of_horizontal_sheets = image_size_x / frame_size;
         frame_number = 0;
        for (int y = 0; y < number_of_vertical_sheets; ++y) {
            for (int x = 0; x < number_of_horizontal_sheets; ++x) {
                character_exclusive_image[i][frame_number] = DerivationGraph(frame_size * x, frame_size * y, frame_size, frame_size, temp_image_handle);
                ++frame_number;
            }
        }
        DeleteGraph(temp_image_handle);
    }
}

void Load_Item_Images() {
    int i = 0;
    int temp_image_handle;
     temp_image_handle = Load_Transparent_Bmp_Image("bmp/Item.bmp");
    for (int x = 0; x < 8; ++x) {
        for (int y = 0; y < 15; ++y) {
            item_image[i]=DerivationGraph(x*64,y*32,32,32,temp_image_handle);
            ++i;
            item_image[i] = DerivationGraph(x * 64+32, y * 32, 32, 32, temp_image_handle);
            ++i;
        }
    }
    DeleteGraph(temp_image_handle);
}

void Load_Mini_Item_Images() {
    int i = 0;
    int temp_image_handle;
    temp_image_handle = Load_Transparent_Bmp_Image("bmp/Item_Mini.bmp");
    for (int x = 0; x < 8; ++x) {
        for (int y = 0; y < 15; ++y) {
            mini_item_image[i] = DerivationGraph(x * 32, y * 16, 16, 16, temp_image_handle);
            ++i;
            mini_item_image[i] = DerivationGraph(x * 32 + 16, y * 16, 16, 16, temp_image_handle);
            ++i;
        }
    }
    DeleteGraph(temp_image_handle);
}

void Load_Shot_Images() {
    int i = 0;
    int temp_image_handle;
    temp_image_handle = Load_Transparent_Bmp_Image("bmp/Shot.bmp");
    for (int x = 0; x < 4; ++x) {
        for (int y = 0; y < 30; ++y) {
            shot_image[i] = DerivationGraph(x * 32, y * 16, 16, 16, temp_image_handle);
            ++i;
            shot_image[i] = DerivationGraph(x * 32 + 16, y * 16, 16, 16, temp_image_handle);
            ++i;
        }
    }
    DeleteGraph(temp_image_handle);
}

void Load_Sword_Images() {
    int i = 0;
    for (Sword_Position& record : sword_type_data->records) {
        sword_image[i][0] = Load_Transparent_Bmp_Image(record.left_facing_bitmap.c_str());
        sword_image[i][1] = Load_Transparent_Bmp_Image(record.right_facing_bitmap.c_str());
        ++i;
    }
}

void Load_Mark_Images() {
    int all_mark_image_handle = Load_Transparent_Bmp_Image("bmp/Mark.bmp");
    int i = 0;
    for (int x = 0; x < 8; ++x) {
        for (int y = 0; y < 15; ++y) {
            mark_image[i] = DerivationGraph(x * 32, y * 32, 32, 32, all_mark_image_handle);
            i++;
        }
    }
    DeleteGraph(all_mark_image_handle);
}

void Load_Effect_Images() {
    int temp_image_handle;
    int image_size_x, image_size_y;
    int number_of_vertical_sheets;
    int number_of_horizontal_sheets;
    int frame_horizontal_width;
    int frame_vertical_width;
    int frame_number;
    for (int i = 1; i < effect_data->records.size(); ++i) {
        temp_image_handle = Load_Transparent_Bmp_Image(effect_data->records[i].path.c_str());
        GetGraphSize(temp_image_handle, &image_size_x, &image_size_y);

        frame_horizontal_width = effect_data->records[i].horizontal_width;
        frame_vertical_width = effect_data->records[i].vertical_width;

        number_of_vertical_sheets = image_size_y / frame_vertical_width;
        number_of_horizontal_sheets = image_size_x / frame_horizontal_width;
        frame_number = 0;
        for (int y = 0; y < number_of_vertical_sheets; ++y) {
            for (int x = 0; x < number_of_horizontal_sheets; ++x) {
                effect_image[i][frame_number] = DerivationGraph(frame_horizontal_width * x, frame_vertical_width * y, frame_horizontal_width, frame_vertical_width, temp_image_handle);
                ++frame_number;
            }
        }
        DeleteGraph(temp_image_handle);
    }
}

void Load_Accessory_Images() {
    int temp_image_handle = Load_Transparent_Bmp_Image("bmp/Accessory.bmp");

    accessory_image_cursor[0] = DerivationGraph(0, 0, 32, 32, temp_image_handle);
    accessory_image_cursor[1] = DerivationGraph(32, 0, 32, 32, temp_image_handle);
    accessory_image_mini_cursor[0] = DerivationGraph(64, 0, 16, 16, temp_image_handle);
    accessory_image_mini_cursor[1] = DerivationGraph(80, 0, 16, 16, temp_image_handle);
    accessory_image_scrollbar[0] = DerivationGraph(64, 16, 16, 16, temp_image_handle);
    accessory_image_scrollbar[1] = DerivationGraph(80, 16, 16, 16, temp_image_handle);
    accessory_image_star = DerivationGraph(96, 0, 32, 32, temp_image_handle);
    accessory_image_world_score = DerivationGraph(0, 32, 16, 16, temp_image_handle);
    accessory_image_score = DerivationGraph(16, 32, 16, 16, temp_image_handle);
    accessory_image_hp = DerivationGraph(32, 32, 16, 16, temp_image_handle);
    accessory_image_sp = DerivationGraph(48, 32, 16, 16, temp_image_handle);
    accessory_image_remaining_lives = DerivationGraph(64, 32, 16, 16, temp_image_handle);
    accessory_image_1up = DerivationGraph(0, 48, 16, 16, temp_image_handle);
    accessory_image_mini_star = DerivationGraph(16, 48, 16, 16, temp_image_handle);
    accessory_image_world_map_player[0] = DerivationGraph(0, 64, 32, 32, temp_image_handle);
    accessory_image_world_map_player[1] = DerivationGraph(32, 64, 32, 32, temp_image_handle);
    accessory_image_world_map_player[2] = DerivationGraph(64, 64, 32, 32, temp_image_handle);
    accessory_image_world_map_player[3] = DerivationGraph(96, 64, 32, 32, temp_image_handle);
    accessory_image_world_map_player[4] = DerivationGraph(0, 96, 32, 32, temp_image_handle);
    accessory_image_world_map_player[5] = DerivationGraph(32, 96, 32, 32, temp_image_handle);
    accessory_image_world_map_player[6] = DerivationGraph(64, 96, 32, 32, temp_image_handle);
    accessory_image_world_map_player[7] = DerivationGraph(96, 96, 32, 32, temp_image_handle);
    accessory_image_hp_bar_empty = DerivationGraph(0, 128, 50, 16, temp_image_handle);
    accessory_image_hp_bar = DerivationGraph(0, 144, 50, 16, temp_image_handle);
    accessory_image_hp_bar_low = DerivationGraph(0, 160, 50, 16, temp_image_handle);
    accessory_image_hp_bar_decrease = DerivationGraph(0, 176, 50, 16, temp_image_handle);
    accessory_image_hp_bar_increase = DerivationGraph(0, 192, 50, 16, temp_image_handle);
    accessory_image_mini_hp_bar_empty = DerivationGraph(0, 208, 50, 2, temp_image_handle);
    accessory_image_mini_hp_bar = DerivationGraph(0, 210, 50, 2, temp_image_handle);
    accessory_image_mini_hp_bar_low = DerivationGraph(0, 212, 50, 2, temp_image_handle);
    accessory_image_mini_hp_bar_decrease = DerivationGraph(0, 214, 50, 2, temp_image_handle);
    accessory_image_mini_hp_bar_increase = DerivationGraph(0, 216, 50, 2, temp_image_handle);
    accessory_image_sp_bar_empty = DerivationGraph(64, 128, 50, 16, temp_image_handle);
    accessory_image_sp_bar = DerivationGraph(64, 144, 50, 16, temp_image_handle);
    accessory_image_sp_bar_low = DerivationGraph(64, 160, 50, 16, temp_image_handle);
    accessory_image_sp_bar_decrease = DerivationGraph(64, 176, 50, 16, temp_image_handle);
    accessory_image_sp_bar_increase = DerivationGraph(64, 192, 50, 16, temp_image_handle);
    accessory_image_mini_sp_bar_empty = DerivationGraph(64, 208, 50, 2, temp_image_handle);
    accessory_image_mini_sp_bar = DerivationGraph(64, 210, 50, 2, temp_image_handle);
    accessory_image_mini_sp_bar_low = DerivationGraph(64, 212, 50, 2, temp_image_handle);
    accessory_image_mini_sp_bar_decrease = DerivationGraph(64, 214, 50, 2, temp_image_handle);
    accessory_image_mini_sp_bar_increase = DerivationGraph(64, 216, 50, 2, temp_image_handle);
}

void Load_Word_Images() {
    int temp_image_handle = Load_Transparent_Bmp_Image("bmp/Word.bmp");

    word_image_stage = DerivationGraph(0, 0, 128, 32, temp_image_handle);
    word_image_ready = DerivationGraph(160, 0, 80, 32, temp_image_handle);
    word_image_replay = DerivationGraph(0, 32, 128, 32, temp_image_handle);
    word_image_clear = DerivationGraph(0, 64, 128, 32, temp_image_handle);
    word_image_gameover = DerivationGraph(0, 96, 144, 32, temp_image_handle);
    for (int i = 0; i < 10; ++i) {
        word_image_red_number[i] = DerivationGraph(32 * i, 128, 32, 32, temp_image_handle);
        word_image_pink_number[i] = DerivationGraph(32 * i, 160, 32, 32, temp_image_handle);
    }
    DeleteGraph(temp_image_handle);
}

void Load_Sound_Effects() {
    for (int i = 1; i < sound_effect_data->records.size(); ++i) {
        sound_effects[i] = LoadSoundMem(sound_effect_data->records[i].path.c_str());
    }
    damage_sound_effect = LoadSoundMem("wave/�����W.wav");
    damage_invalid_sound_effect = LoadSoundMem("wave/�����W���.wav");
    main_character_death_sound_effect = LoadSoundMem("wave/�O�L�^���V��.wav");
    enemy_death_sound_effect = LoadSoundMem("wave/���V��.wav");
    block_jump_sound_effect = LoadSoundMem("wave/�W���v.wav");
    stage_clear_sound_effect = LoadSoundMem("wave/�X�e�[�W�N���A.wav");
}

struct Key_Input {
    int left;
    int right;
    int up;
    int down;
    int z;
    int x;
    int c;
    int v;
    int a;
    int s;
    int d;
    int f;
};
struct Key_Input key_input;

void Adjust_Key_Config_For_Dx_Library(struct Key_Config* key_config) {
    key_config->left = ConvertVirtualKeyToKeyCode(key_config->left);
    key_config->right = ConvertVirtualKeyToKeyCode(key_config->right);
    key_config->up = ConvertVirtualKeyToKeyCode(key_config->up);
    key_config->down = ConvertVirtualKeyToKeyCode(key_config->down);
    key_config->z = ConvertVirtualKeyToKeyCode(key_config->z);
    key_config->x = ConvertVirtualKeyToKeyCode(key_config->x);
    key_config->c = ConvertVirtualKeyToKeyCode(key_config->c);
    key_config->v = ConvertVirtualKeyToKeyCode(key_config->v);
    key_config->a = ConvertVirtualKeyToKeyCode(key_config->a);
    key_config->s = ConvertVirtualKeyToKeyCode(key_config->s);
    key_config->d = ConvertVirtualKeyToKeyCode(key_config->d);
    key_config->f = ConvertVirtualKeyToKeyCode(key_config->f);
}

void Update_Key_Input(struct Key_Config* key_config) {
    if (key_config->play_with_this_setting == 0) {
        if (Key[KEY_INPUT_LEFT] > 0) key_input.left++; else key_input.left = 0;
        if (Key[KEY_INPUT_RIGHT] > 0) key_input.right++; else key_input.right = 0;
        if (Key[KEY_INPUT_UP] > 0) key_input.up++; else key_input.up = 0;
        if (Key[KEY_INPUT_DOWN] > 0) key_input.down++; else key_input.down = 0;
        if (Key[KEY_INPUT_Z] > 0) key_input.z++; else key_input.z = 0;
        if (Key[KEY_INPUT_X] > 0) key_input.x++; else key_input.x = 0;
        if (Key[KEY_INPUT_C] > 0) key_input.c++; else key_input.c = 0;
        if (Key[KEY_INPUT_V] > 0) key_input.v++; else key_input.v = 0;
        if (Key[KEY_INPUT_A] > 0) key_input.a++; else key_input.a = 0;
        if (Key[KEY_INPUT_S] > 0) key_input.s++; else key_input.s = 0;
        if (Key[KEY_INPUT_D] > 0) key_input.d++; else key_input.d = 0;
        if (Key[KEY_INPUT_F] > 0) key_input.f++; else key_input.f = 0;
    }
    else {
        if (Key[key_config->left] > 0) key_input.left++; else key_input.left = 0;
        if (Key[key_config->right] > 0) key_input.right++; else key_input.right = 0;
        if (Key[key_config->up] > 0) key_input.up++; else key_input.up = 0;
        if (Key[key_config->down] > 0) key_input.down++; else key_input.down = 0;
        if (Key[key_config->z] > 0) key_input.z++; else key_input.z = 0;
        if (Key[key_config->x] > 0) key_input.x++; else key_input.x = 0;
        if (Key[key_config->c] > 0) key_input.c++; else key_input.c = 0;
        if (Key[key_config->v] > 0) key_input.v++; else key_input.v = 0;
        if (Key[key_config->a] > 0) key_input.a++; else key_input.a = 0;
        if (Key[key_config->s] > 0) key_input.s++; else key_input.s = 0;
        if (Key[key_config->d] > 0) key_input.d++; else key_input.d = 0;
        if (Key[key_config->f] > 0) key_input.f++; else key_input.f = 0;
    }
}

int Basic_Condition_Comparison_Processing(int left_side, int right_side, int how_to_compare) {
    switch (how_to_compare) {
    case 0:
        return left_side == right_side;
        break;
    case 1:
        return left_side != right_side;
        break;
    case 2:
        return left_side >= right_side;
        break;
    case 3:
        return left_side <= right_side;
        break;
    case 4:
        return left_side > right_side;
        break;
    case 5:
        return left_side < right_side;
        break;
    case 6:
        if (right_side == 0) return 1;
        return left_side % right_side == 0;
        break;
    case 7:
        if (right_side == 0) return 0;
        return left_side % right_side != 0;
        break;
    }
    return false;
}

int Status_Condition_Judgment(Game_Character& character, Basic_Condition& basic_condition) {
    int left_side = 0;
    int right_side = 0;
    Game_Character* left_side_target_character = nullptr;
    Game_Character* right_side_target_character = nullptr;
    switch (basic_condition.left_side_type) {
    case 0:
        if (basic_condition.left_side_status_target <= 4) {
            switch (basic_condition.left_side_status_target) {
            case 0:
                left_side_target_character = &character;
                break;
            case 1:
                left_side_target_character = character.target[0];
                break;
            case 2:
                left_side_target_character = character.target[1];
                break;
            case 3:
                left_side_target_character = character.target[2];
                break;
            case 4:
                left_side_target_character = character.target[3];
                break;
            }
            if (left_side_target_character == nullptr) return 0;
            if (left_side_target_character != nullptr) {
                switch (basic_condition.left_side_status_number) {
                case 0:
                    left_side = left_side_target_character->character_variables[basic_condition.left_side_variable_number - 1];
                    break;
                case 1:
                    left_side = left_side_target_character->hp;
                    break;
                case 2:
                    left_side = left_side_target_character->sp;
                    break;
                case 3:
                    left_side = left_side_target_character->max_hp;
                    break;
                case 4:
                    left_side = left_side_target_character->max_sp;
                    break;
                case 5:
                    left_side = left_side_target_character->character_id;
                    break;
                case 6:
                    left_side = (int)left_side_target_character->position_x;
                    break;
                case 7:
                    left_side = (int)left_side_target_character->position_y;
                    break;
                case 8:
                    left_side = left_side_target_character->z_coordinate;
                    break;
                case 9:
                    left_side = left_side_target_character->mark_number;
                    break;
                case 10:
                    left_side = left_side_target_character->line_of_sight_range;
                    break;
                case 11:
                    left_side = left_side_target_character->body_hit_power;
                    break;
                case 12:
                    left_side = left_side_target_character->body_hit_impact;
                    break;
                case 13:
                    left_side = left_side_target_character->defense;
                    break;
                case 14:
                    left_side = left_side_target_character->impact_resistance;
                    break;
                case 15:
                    left_side = left_side_target_character->stopping_ease_during_inertial_movement;
                    break;
                case 16:
                    left_side = left_side_target_character->score;
                    break;
                }
            }
        }
        // If status target is system
        else {
            switch (basic_condition.left_side_status_number) {
            case 0:
                left_side = game_system.remaining_time;
                break;
            case 1:
                left_side = game_system.horizontal_scroll_speed;
                break;
            case 2:
                left_side = game_system.vertical_scroll_speed;
                break;
            case 3:
                left_side = game_system.score;
                break;
            case 4:
                left_side = game_system.remaining_lives;
                break;
            }
        }
        break;
    }
    switch (basic_condition.right_side_type) {
    case 0:
        right_side = basic_condition.right_side_constant;
        break;
    case 1:
        right_side = GetRand(basic_condition.right_side_random_upper_limit - basic_condition.right_side_random_lower_limit) + basic_condition.right_side_random_lower_limit;
        break;
    case 2:
        if (basic_condition.right_side_status_target <= 4) {
            switch (basic_condition.right_side_status_target) {
            case 0:
                right_side_target_character = &character;
                break;
            case 1:
                right_side_target_character = character.target[0];
                break;
            case 2:
                right_side_target_character = character.target[1];
                break;
            case 3:
                right_side_target_character = character.target[2];
                break;
            case 4:
                right_side_target_character = character.target[3];
                break;
            }
            if (right_side_target_character == nullptr) return 0;
            if (right_side_target_character != nullptr) {
                switch (basic_condition.right_side_status_number) {
                case 0:
                    right_side = right_side_target_character->character_variables[basic_condition.right_side_variable_number - 1];
                    break;
                case 1:
                    right_side = right_side_target_character->hp;
                    break;
                case 2:
                    right_side = right_side_target_character->sp;
                    break;
                case 3:
                    right_side = right_side_target_character->max_hp;
                    break;
                case 4:
                    right_side = right_side_target_character->max_sp;
                    break;
                case 5:
                    right_side = right_side_target_character->character_id;
                    break;
                case 6:
                    right_side = (int)right_side_target_character->position_x;
                    break;
                case 7:
                    right_side = (int)right_side_target_character->position_y;
                    break;
                case 8:
                    right_side = right_side_target_character->z_coordinate;
                    break;
                case 9:
                    right_side = right_side_target_character->mark_number;
                    break;
                case 10:
                    right_side = right_side_target_character->line_of_sight_range;
                    break;
                case 11:
                    right_side = right_side_target_character->body_hit_power;
                    break;
                case 12:
                    right_side = right_side_target_character->body_hit_impact;
                    break;
                case 13:
                    right_side = right_side_target_character->defense;
                    break;
                case 14:
                    right_side = right_side_target_character->impact_resistance;
                    break;
                case 15:
                    right_side = right_side_target_character->stopping_ease_during_inertial_movement;
                    break;
                case 16:
                    right_side = right_side_target_character->score;
                    break;
                }
            }
        }
        // If status target is system
        else {
            switch (basic_condition.right_side_status_number) {
            case 0:
                right_side = game_system.remaining_time;
                break;
            case 1:
                right_side = game_system.horizontal_scroll_speed;
                break;
            case 2:
                right_side = game_system.vertical_scroll_speed;
                break;
            case 3:
                right_side = game_system.score;
                break;
            case 4:
                right_side = game_system.remaining_lives;
                break;
            }
        }
        break;
    }
    return Basic_Condition_Comparison_Processing(left_side, right_side, basic_condition.how_to_compare);
}

int Basic_Condition_Judgment(Game_Character& character, Basic_Condition& basic_condition) {
    switch (basic_condition.type) {
    case 1:
        //return Basic_Condition_Comparison_Processing(common_variables[basic_condition.left_side_variable_number], basic_condition.right_side_constant, basic_condition.how_to_compare);
        break;
    case 2:
        //return Basic_Condition_Comparison_Processing(stage_variables[basic_condition.left_side_variable_number], basic_condition.right_side_constant, basic_condition.how_to_compare);
        break;
    case 3:
        //return Basic_Condition_Comparison_Processing(character.character_variables[basic_condition.left_side_variable_number], basic_condition.right_side_constant, basic_condition.how_to_compare);
        break;
    case 4:
        return Status_Condition_Judgment(character, basic_condition);
        break;
    case 5:
        //return Status_Condition_Judgment_2(character, basic_condition);
        break;
    case 6:
        //return Status_Condition_Judgment_3(character, basic_condition);
        break;
    case 7:
        //return Distance_Condition_Judgment(character, basic_condition);
        break;
    }
    return 0;
}

int Key_Condition_Judgment(Key_Condition& key_condition) {
    if (key_condition.z_key == 1) {
        if (key_input.z == 0) {
            return 0;
        }
    }
    if (key_condition.x_key == 1) {
        if (key_input.x == 0) {
            return 0;
        }
    }
    if (key_condition.c_key == 1) {
        if (key_input.c == 0) {
            return 0;
        }
    }
    if (key_condition.v_key == 1) {
        if (key_input.v == 0) {
            return 0;
        }
    }
    if (key_condition.a_key == 1) {
        if (key_input.a == 0) {
            return 0;
        }
    }
    if (key_condition.s_key == 1) {
        if (key_input.s == 0) {
            return 0;
        }
    }
    if (key_condition.d_key == 1) {
        if (key_input.d == 0) {
            return 0;
        }
    }
    if (key_condition.f_key == 1) {
        if (key_input.f == 0) {
            return 0;
        }
    }
    if (key_condition.any_direction_key == 1) {
        if (key_input.left == 0 && key_input.right == 0 && key_input.up == 0 && key_input.down == 0) {
            return 0;
        }
    }
    return 1;
}

void Start_Next_Command_Execution(Game_Character& character, Game_Flow* flow) {
    if (flow == nullptr) return;
    ++flow->executing_command;
    flow->command_execution_time = 0;
    if (flow->executing_command >= flow->command_data.size()) {
        flow->executing_command = -1;
        if (flow->group != 0) {
            character.flow_group_executing_flag[flow->group] = 0;
        }
    }
}

void Execute_Wait(Game_Character& character, Game_Flow& flow) {
    Wait_Details* details = (Wait_Details*)flow.command_data[flow.executing_command].details;
    ++flow.command_execution_time;
    if (flow.command_execution_time >= details->execution_time * 6) {
        Start_Next_Command_Execution(character, &flow);
    }
}

void Execute_Linear_Movement(Game_Character& character, Game_Flow& flow) {
    Linear_Movement_Details* details = (Linear_Movement_Details*)flow.command_data[flow.executing_command].details;
    double angle = 0.0;
    double speed = details->time_speed_distance_speed * 0.1 * (character.movement_speed_multiplier / 100.0);
    double distance = details->time_speed_distance_distance;
    if (details->movement_direction_setting_type == 0) {
        if (details->movement_direction_direction == 12) {
            if (key_input.left > 0) {
                angle = DX_PI;
                if (details->movement_direction_dont_change_character_direction == 0) character.facing_right = 0;
            }
            else if (key_input.right > 0) {
                angle = 0;
                if (details->movement_direction_dont_change_character_direction == 0) character.facing_right = 1;
            }
            else speed = 0.0;
        }
    }
    character.movement_speed_x += speed * cos(angle);
    character.movement_speed_y += speed * sin(angle);

    ++flow.command_execution_time;

    if (details->time_speed_distance_setting_type == 2 && flow.command_execution_time >= details->time_speed_distance_distance / (details->time_speed_distance_speed * 0.1) ) {
        Start_Next_Command_Execution(character, &flow);
    }
    else if (flow.command_execution_time >= details->execution_time * 6) {
        Start_Next_Command_Execution(character, &flow);
    }
}

void Execute_Jump(Game_Character& character, Game_Flow& flow, Stage* stage_data) {
    Jump_Details* details = (Jump_Details*)flow.command_data[flow.executing_command].details;
    if (flow.command_execution_time == 0) {
        if (character.flying == 0 && character.on_ground == 1 && character.jumping == 0 && character.jump_forbidden == 0) {
            character.movement_speed_y = -sqrt(2 * stage_data->gravity * details->max_jump_height * 16 + 4);//add "+4" to make it slightly larger.
            character.on_ground = 0;
            character.jumping = 1;
            character.jump_inputting = 1;
            if (details->sound_effect > 0) {
                PlaySoundMem(sound_effects[details->sound_effect], DX_PLAYTYPE_BACK);
            }
        }
        else if (details->jump_type == 0){
            Start_Next_Command_Execution(character, &flow);
            return;
        }
    }
    else if (character.jumping == 1) {
        if (character.movement_speed_y >= 0.0) {
            character.jumping = 0;
            character.jump_inputting = 0;
            Start_Next_Command_Execution(character, &flow);
            return;
        }
        else {
            if (details->jump_type > 0) {
                if (flow.key_condition_data.empty() == false && Key_Condition_Judgment(flow.key_condition_data.back()) == 0) {
                    character.jump_inputting = 0;
                }
                if (character.jumping == 1 && character.jump_inputting == 0) {
                    character.movement_speed_y /= 2.0;
                }
            }
        }
    }

    ++flow.command_execution_time;
    if (details->jump_type > 0 && character.on_ground == 1) {
        if (flow.command_execution_time >= 6) {
            Start_Next_Command_Execution(character, &flow);
            return;
        }
    }
}

void Set_Lightning_Strike_Reference_Position(double * x, double* y, double target_position_x, double target_position_y, double angle_radian) {
    double a = sin(angle_radian);
    double b = cos(angle_radian);
    double rx;
    double ry;
    double p1x, p1y, p2x, p2y;
    double dx, dy;
    double distance_squared_1,distance_squared_2;

    if (a >= 0) {
        ry = -16;
    }
    else {
        ry = 480 + 16;
    }

    if (b >= 0) {
        rx = -16;
    }
    else {
        rx = 640 + 16;
    }

    if (a == 0) {
        *x = rx;
        *y = target_position_y;
        return;
    }
    if (b == 0) {
        *x = target_position_x;
        *y = ry;
        return;
    }
    p1x = rx;
    p1y = target_position_y - a * (target_position_x - rx) / b;
    p2x = target_position_x - b * (target_position_y - ry) / a;
    p2y = ry;

    dx = p1x - target_position_x;
    dy = p1y - target_position_y;
    distance_squared_1 = dx * dx + dy * dy;
    dx = p2x - target_position_x;
    dy = p2y - target_position_y;
    distance_squared_2 = dx * dx + dy * dy;
    if (distance_squared_1 <= distance_squared_2) {
        *x = p1x;
        *y = p1y;
        return;
    }
    *x = p2x;
    *y = p2y;
    return;
}

// Used only when not changing firing position according to angle AND setting angle to target
void Set_Shot_Targeting_Reference_Position(double* x, double* y, Game_Character& character, Shot_Details* details, int double_number, double angle_radian) {
    double firing_position_offset_x;
    double firing_position_offset_y;

    firing_position_offset_x = details->firing_position_offset_x + double_number * details->firing_position_offset_x_double;
    if (details->firing_position_offset_x_flip_if_facing_right == 1 && character.facing_right == 1) {
        firing_position_offset_x = -firing_position_offset_x;
    }
    firing_position_offset_y = details->firing_position_offset_y + double_number * details->firing_position_offset_y_double;
    if (details->firing_position_offset_y_flip_if_facing_right == 1 && character.facing_right == 1) {
        firing_position_offset_y = -firing_position_offset_y;
    }

    switch (details->formation) {
    case 0: //straight A
        *x = character.position_x + (16 * character.gigantic + 8 * details->gigantic) * cos(angle_radian) + firing_position_offset_x;
        *y = character.position_y + (16 * character.gigantic + 8 * details->gigantic) * sin(angle_radian) + firing_position_offset_y;
        break;
    case 1: //straight B
        if (character.facing_right == 0) {
            *x = character.position_x - 16 * character.gigantic - 8 * details->gigantic + firing_position_offset_x;
        }
        else {
            *x = character.position_x + 16 * character.gigantic + 8 * details->gigantic + firing_position_offset_x;
        }
        *y = character.position_y + 16 * character.gigantic - 8 * details->gigantic + firing_position_offset_y;
        break;
    case 2: //scatter
        *x = character.position_x + (16 * character.gigantic + 8 * details->gigantic) * cos(angle_radian) + firing_position_offset_x;
        *y = character.position_y + (16 * character.gigantic + 8 * details->gigantic) * sin(angle_radian) + firing_position_offset_y;
        break;
    case 3: //lightning strike
        break;
    case 4: //explosion
        *x = character.position_x + firing_position_offset_x;
        *y = character.position_y + firing_position_offset_y;
        break;
    case 5: //encircle not handled here
        break;
    }
}

void Set_Shot_Position(double* x, double* y, Game_Character& character, Shot_Details* details, int number_of_shots_fired, int double_number, double angle_radian) {
    double firing_position_offset_x;
    double firing_position_offset_y;

    firing_position_offset_x = details->firing_position_offset_x + double_number * details->firing_position_offset_x_double;
    if (details->firing_position_offset_x_flip_if_facing_right == 1 && character.facing_right == 1) {
        firing_position_offset_x = -firing_position_offset_x;
    }
    firing_position_offset_y = details->firing_position_offset_y + double_number * details->firing_position_offset_y_double;
    if (details->firing_position_offset_y_flip_if_facing_right == 1 && character.facing_right == 1) {
        firing_position_offset_y = -firing_position_offset_y;
    }

     switch (details->formation) {
    case 0: //straight A
        *x = character.position_x + (16 * character.gigantic + 8 * details->gigantic) * cos(angle_radian) - (number_of_shots_fired - ((details->number_of_shots_fired - 1) / 2.0)) * (16 * details->gigantic + 16 * details->firing_parameter1) * sin(angle_radian) + firing_position_offset_x;
        *y = character.position_y + (16 * character.gigantic + 8 * details->gigantic) * sin(angle_radian) + (number_of_shots_fired - ((details->number_of_shots_fired - 1) / 2.0)) * (16 * details->gigantic + 16 * details->firing_parameter1) * cos(angle_radian) + firing_position_offset_y;
        break;
    case 1: //straight B
        if (character.facing_right == 0) {
            *x = character.position_x - 16 * character.gigantic - 8 * details->gigantic + firing_position_offset_x;
        }
        else {
            *x = character.position_x + 16 * character.gigantic + 8 * details->gigantic + firing_position_offset_x;
         }
        *y = character.position_y + 16 * character.gigantic - 8 * details->gigantic - number_of_shots_fired * (16 * details->gigantic + 16 * details->firing_parameter1) + firing_position_offset_y;
        break;
    case 2: //scatter
        *x = character.position_x + (16 * character.gigantic + 8 * details->gigantic) * cos(angle_radian) + firing_position_offset_x;
        *y = character.position_y + (16 * character.gigantic + 8 * details->gigantic) * sin(angle_radian) + firing_position_offset_y;
        break;
    case 3: //lightning strike
        break;
    case 4: //explosion
            *x = character.position_x + firing_position_offset_x;
            *y = character.position_y + firing_position_offset_y;
        break;
    case 5: //encircle not handled here
        break;
    }
}

void Execute_Shot(Game_Character& character, Game_Flow& flow) {
    Shot_Details* details = (Shot_Details*)flow.command_data[flow.executing_command].details;

    if (flow.command_execution_time % 6 == 0) {
        int number_of_shots_fired;
        Game_Character* target = nullptr;
        Game_Character* movement_target = nullptr;
        double lightning_strike_reference_position_x = 0;
        double lightning_strike_reference_position_y = 0;
        double shot_targeting_reference_position_x = 0;
        double shot_targeting_reference_position_y = 0;
        double shot_angle = 0;

        //only for lightning strike and encircle, target other than target can be specified
        if (details->formation == 3 || details->formation == 5) {
            switch (details->target) {
             case 0:
                target = character.target[details->firing_target];
                break;
            case 1:
                target = game_player;
                break;
            case 2:
                target = &character;
                break;
            }
        }
        else if (details->set_angle_to_target == 1) {
            target = character.target[details->firing_target];
        }

        //number of shots increases only for lightning strike
        if (details->formation != 3) {
            number_of_shots_fired = details->number_of_shots_fired;
        }
        else if(target != nullptr){
            number_of_shots_fired = details->number_of_shots_fired * details->firing_parameter2;
        }

        if (details->movement_type >= 1 && details->movement_type <= 6) {
            movement_target = character.target[details->movement_target];
        }

        for (int double_number = 0; double_number <= details->number_of_doubles; ++double_number) {
            //if formation is lightning strike or encircle AND target is not present, do not shoot
            if ((details->formation == 3 || details->formation == 5) && target == nullptr) break;
            double dispersion_angle = DX_PI / 180 * (GetRand(2 * details->angle_dispersion) - details->angle_dispersion);
            for (int shot = 0; shot < number_of_shots_fired; ++shot) {
                Shot temp_shot;
                int angle_degrees;
                double angle_radian;
                temp_shot.user = &character;
                if (details->direction != 12) {
                    switch (details->direction) {
                    case 0:
                        if (character.facing_right == 0) angle_degrees = 180;
                        else angle_degrees = 0;
                        break;
                    case 1:
                        if (character.facing_right == 0) angle_degrees = 0;
                        else angle_degrees = 180;
                        break;
                    case 2:
                        angle_degrees = 180;
                        break;
                    case 3:
                        angle_degrees = 0;
                        break;
                    case 4:
                        if (character.facing_right == 0) angle_degrees = 90;
                        else angle_degrees = 270;
                        break;
                    case 5:
                        if (character.facing_right == 0) angle_degrees = 270;
                        else angle_degrees = 90;
                        break;
                    case 6:
                        angle_degrees = 270;
                        break;
                    case 7:
                        angle_degrees = 90;
                        break;
                    case 8:
                        angle_degrees = 225;
                        break;
                    case 9:
                        angle_degrees = 135;
                        break;
                    case 10:
                        angle_degrees = 315;
                        break;
                    case 11:
                        angle_degrees = 45;
                        break;
                    }
                    angle_radian = angle_degrees * DX_PI / 180.0;
                }
                if (details->direction == 12) {
                    double dx = 0, dy = 0;
                    if (key_input.left > 0) dx -= 1;
                    if (key_input.right > 0) dx += 1;
                    if (key_input.up > 0) dy -= 1;
                    if (key_input.down > 0) dy += 1;
                    if (dx == 0 && dy == 0) {
                        if (character.facing_right == 0) angle_radian = DX_PI;
                        else angle_radian = 0;
                    }
                    else {
                        angle_radian = atan2(dy, dx);
                    }
                }
                //if lightning strike
                if (details->formation == 3) {
                    if (shot == 0) {
                        Set_Lightning_Strike_Reference_Position(&lightning_strike_reference_position_x, &lightning_strike_reference_position_y, target->position_x, target->position_y, angle_radian);
                    }
                    double firing_position_offset_x;
                    double firing_position_offset_y;

                    firing_position_offset_x = details->firing_position_offset_x + double_number * details->firing_position_offset_x_double;
                    if (details->firing_position_offset_x_flip_if_facing_right == 1 && character.facing_right == 1) {
                        firing_position_offset_x = -firing_position_offset_x;
                    }
                    firing_position_offset_y = details->firing_position_offset_y + double_number * details->firing_position_offset_y_double;
                    if (details->firing_position_offset_y_flip_if_facing_right == 1 && character.facing_right == 1) {
                        firing_position_offset_y = -firing_position_offset_y;
                    }
                    temp_shot.position_x = lightning_strike_reference_position_x + (16 * details->gigantic + 16 * details->firing_parameter1) * (shot / details->firing_parameter2) * cos(angle_radian) + 16 * details->firing_parameter3 * ((shot % details->firing_parameter2) - (details->firing_parameter2 - 1) / 2.0) * sin(angle_radian) + firing_position_offset_x;
                    temp_shot.position_y = lightning_strike_reference_position_y + (16 * details->gigantic + 16 * details->firing_parameter1) * (shot / details->firing_parameter2) * sin(angle_radian) - 16 * details->firing_parameter3 * ((shot % details->firing_parameter2) - (details->firing_parameter2 - 1) / 2.0) * cos(angle_radian) + firing_position_offset_y;

                    angle_radian += dispersion_angle;
                    if (character.facing_right && details->angle_offset_reverse_rotation_if_facing_right) {
                        angle_radian -= DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                    }
                    else {
                        angle_radian += DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                    }
                }
                else if (details->formation == 5) {
                    double firing_position_offset_x;
                    double firing_position_offset_y;

                    firing_position_offset_x = details->firing_position_offset_x + double_number * details->firing_position_offset_x_double;
                    if (details->firing_position_offset_x_flip_if_facing_right == 1 && character.facing_right == 1) {
                        firing_position_offset_x = -firing_position_offset_x;
                    }
                    firing_position_offset_y = details->firing_position_offset_y + double_number * details->firing_position_offset_y_double;
                    if (details->firing_position_offset_y_flip_if_facing_right == 1 && character.facing_right == 1) {
                        firing_position_offset_y = -firing_position_offset_y;
                    }
                    temp_shot.position_x = target->position_x + details->firing_parameter1 * 16 * cos(angle_radian + DX_PI + shot * 2 * DX_PI / number_of_shots_fired) + firing_position_offset_x;
                    temp_shot.position_y = target->position_y + details->firing_parameter1 * 16 * sin(angle_radian + DX_PI + shot * 2 * DX_PI / number_of_shots_fired) + firing_position_offset_y;

                    angle_radian += dispersion_angle;
                    if (character.facing_right && details->angle_offset_reverse_rotation_if_facing_right) {
                        angle_radian -= DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                    }
                    else {
                        angle_radian += DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                    }
                }
                else {
                    //if straight B, don't change firing position even if checked to change according to angle
                    if (details->change_firing_position_according_to_angle == 0 || details->formation == 1) {
                        Set_Shot_Position(&temp_shot.position_x, &temp_shot.position_y, character, details, shot, double_number, angle_radian);
                        if (details->set_angle_to_target == 1 && target != nullptr) {
                            if (shot == 0) {
                                Set_Shot_Targeting_Reference_Position(&shot_targeting_reference_position_x, &shot_targeting_reference_position_y, character, details, double_number, angle_radian);
                                shot_angle = atan2(target->position_y - shot_targeting_reference_position_y, target->position_x - shot_targeting_reference_position_x);
                            }
                            angle_radian = shot_angle;
                        }
                        angle_radian += dispersion_angle;
                        if (character.facing_right && details->angle_offset_reverse_rotation_if_facing_right) {
                            angle_radian -= DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                        }
                        else {
                            angle_radian += DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                        }
                    }
                    else if (details->change_firing_position_according_to_angle == 1) {
                        if (details->set_angle_to_target == 1 && target != nullptr) {
                            angle_radian = atan2(target->position_y - character.position_y, target->position_x - character.position_x);
                        }
                        angle_radian += dispersion_angle;
                        if (character.facing_right && details->angle_offset_reverse_rotation_if_facing_right) {
                            angle_radian -= DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                        }
                        else {
                            angle_radian += DX_PI / 180 * (details->angle_offset + double_number * details->angle_offset);
                        }
                        Set_Shot_Position(&temp_shot.position_x, &temp_shot.position_y, character, details, shot, double_number, angle_radian);
                    }
                }
                temp_shot.angle = angle_radian;
                //only for scatter
                if (details->formation == 2) {
                    temp_shot.angle += (shot - (number_of_shots_fired - 1) / 2.0) * details->firing_parameter1 * DX_PI / 180;
                }
                //only for encircle or explosion
                if (details->formation == 4 || details->formation == 5) {
                    temp_shot.angle += shot * 2 * DX_PI / number_of_shots_fired;
                }
                temp_shot.initial_speed = details->speed + double_number * details->speed_double;
                temp_shot.speed = temp_shot.initial_speed;
                if (details->acceleration_enabled == 1) {
                    temp_shot.acceleration = details->acceleration + double_number * details->speed_double;
                }
                else {
                    temp_shot.acceleration = 0;
                }

                temp_shot.graphic = details->graphic;
                temp_shot.z_coordinate = details->z_coordinate;
                temp_shot.transparency = details->transparency;
                if (details->faction_same_as_user == 1) {
                    temp_shot.faction = character.faction;
                }
                else {
                    temp_shot.faction = details->faction;
                }
                temp_shot.gigantic = details->gigantic;
                temp_shot.movement_type = details->movement_type;
                temp_shot.movement_type_parameter1 = details->movement_type_parameter1;
                temp_shot.movement_type_parameter2 = details->movement_type_parameter2;
                temp_shot.movement_type_parameter3 = details->movement_type_parameter3;
                temp_shot.movement_target = movement_target;
                temp_shot.synchronize_with_auto_scroll = details->synchronize_with_auto_scroll;
                temp_shot.flight_distance = 0;
                temp_shot.flight_distance_valid = details->flight_distance_valid;
                if (details->flight_distance_valid == 0) {
                    temp_shot.flight_distance_does_not_disappear = 1;
                }
                else {
                    temp_shot.flight_distance_limit = details->flight_distance + double_number * details->flight_distance_double;
                    temp_shot.flight_distance_does_not_disappear = details->flight_distance_does_not_disappear_at_end;
                }
                temp_shot.existence_time = 0;
                 temp_shot.disappearance_time_valid = details->disappearance_time_valid;
                temp_shot.disappearance_time = details->disappearance_time + double_number * details->disappearance_time_double;
                temp_shot.penetrate_blocks = details->penetrate_blocks;
                temp_shot.penetrate_characters = details->penetrate_characters;
                temp_shot.penetrate_block_characters = details->penetrate_block_characters;
                temp_shot.disappear_on_hitting_shot = details->disappear_on_hitting_shot;
                temp_shot.value_for_disappearing_on_hitting_shot = details->value_for_disappearing_on_hitting_shot;
                temp_shot.power = details->power;
                temp_shot.impact = details->impact;
                temp_shot.effect = details->effect;
                temp_shot.attack = details->attack;
                temp_shot.attack_id = details->attack_id;
                temp_shot.acquired_item_palette_number = details->acquired_item_palette_number;
                temp_shot.acquired_item_palette_type = details->acquired_item_palette_type;
                temp_shot.disappearance = 0;
                temp_shot.targeting_and_guidance_control = 0;
                temp_shot.fall_speed = 0;
                game_shots.push_back(temp_shot);
            }
        }
        if (details->sound_effect > 0) {
            PlaySoundMem(sound_effects[details->sound_effect], DX_PLAYTYPE_BACK);
        }
    }

    ++flow.command_execution_time;
    if (flow.command_execution_time >= 6 * details->execution_time) {
        Start_Next_Command_Execution(character, &flow);
    }
}

void Execute_Sword(Game_Character& character, Game_Flow& flow) {
    Sword_Details* details = (Sword_Details*)flow.command_data[flow.executing_command].details;

    if (flow.command_execution_time == 0) {
        Sword temp_sword;
        temp_sword.user = &character;
        temp_sword.sword_type = details->sword_type;
        switch (sword_type_data->records[details->sword_type].sword_positions[0].direction) {
        case 0: //front
            if (character.facing_right == 0) {
                temp_sword.position_x = character.position_x - 16 * character.gigantic - sword_type_data->records[temp_sword.sword_type].sword_positions[0].horizontal_width / 2 * details->gigantic;
            }
            else {
                temp_sword.position_x = character.position_x + 16 * character.gigantic + sword_type_data->records[temp_sword.sword_type].sword_positions[0].horizontal_width / 2 * details->gigantic;
            }
            temp_sword.position_y = character.position_y;
            temp_sword.facing_right = character.facing_right;
            break;
        case 1: //back
            if (character.facing_right == 0) {
                temp_sword.position_x = character.position_x + 16 * character.gigantic + sword_type_data->records[temp_sword.sword_type].sword_positions[0].horizontal_width / 2 * details->gigantic;
                temp_sword.facing_right = 1;
            }
            else {
                temp_sword.position_x = character.position_x - 16 * character.gigantic - sword_type_data->records[temp_sword.sword_type].sword_positions[0].horizontal_width / 2 * details->gigantic;
                temp_sword.facing_right = 0;
            }
            temp_sword.position_y = character.position_y;
            break;
        case 2: //up
            temp_sword.position_x = character.position_x;
            temp_sword.position_y = character.position_y - 16 * character.gigantic - sword_type_data->records[temp_sword.sword_type].sword_positions[0].vertical_width / 2 * details->gigantic;
            temp_sword.facing_right = character.facing_right;
            break;
        case 3: //down
            temp_sword.position_x = character.position_x;
            temp_sword.position_y = character.position_y + 16 * character.gigantic + sword_type_data->records[temp_sword.sword_type].sword_positions[0].vertical_width / 2 * details->gigantic;
            temp_sword.facing_right = character.facing_right;
            break;
        }

        if (details->faction_same_as_user == 1) {
            temp_sword.faction = character.faction;
        }
        else {
            temp_sword.faction = details->faction;
        }
        temp_sword.sword_position_number = 0;
        temp_sword.sword_position_time = 0;
        temp_sword.gigantic = details->gigantic;
        temp_sword.power = details->power;
        temp_sword.impact = details->impact;
        temp_sword.effect = details->effect;
        temp_sword.attack = details->attack;
        temp_sword.attack_id = details->attack_id;
        temp_sword.acquired_item_palette_type = details->acquired_item_palette_type;
        temp_sword.acquired_item_palette_number = details->acquired_item_palette_number;
        temp_sword.z_coordinate = details->z_coordinate;
        temp_sword.transparency = details->transparency;
        temp_sword.disappearance = 0;

        game_swords.push_back(temp_sword);
        if (details->sound_effect > 0) {
            PlaySoundMem(sound_effects[details->sound_effect], DX_PLAYTYPE_BACK);
        }
    }

    ++flow.command_execution_time;
    if (flow.command_execution_time >= 6 * details->execution_time) {
        Start_Next_Command_Execution(character, &flow);
    }
}

void Execute_Flow_Operation(Game_Character& character, Game_Flow& flow) {
    Flow_Operation_Details* details = (Flow_Operation_Details*)flow.command_data[flow.executing_command].details;
    int execution_flag = 1;
    Game_Character* target_character = nullptr;

    if (details->condition_present == 1) {
        if (details->condition_data.size() > 0) {
            if (details->judgment_type == 0) {
                for (Basic_Condition& basic_condition : details->condition_data) {
                    if (Basic_Condition_Judgment(character, basic_condition) == 0) {
                        execution_flag = 0;
                        break;
                    }
                }
            }
            if (details->judgment_type == 1) {
                execution_flag = 0;
                for (Basic_Condition& basic_condition : details->condition_data) {
                    if (Basic_Condition_Judgment(character, basic_condition) == 1) {
                        execution_flag = 1;
                        break;
                    }
                }
            }
        }
    }
    if (execution_flag == 1) {
        switch (details->target_character) {
        case 0:
            target_character = &character;
            break;
        case 1:
            target_character = character.target[0];
            break;
        case 2:
            target_character = character.target[1];
            break;
        case 3:
            target_character = character.target[2];
            break;
        case 4:
            target_character = character.target[3];
            break;
        }
        if (target_character != nullptr) {
            if (details->target_flow == 0) {
                flow.state = details->operation;
            }
            else if (details->target_flow == 1) {
                for (Game_Flow& target_flow : character.flow_data){
                    if (&target_flow != &flow && target_flow.state != 4 && target_flow.state != 5) {
                        target_flow.state = details->operation;
                    }
                }
            }
            else if(details->target_flow == 2){
                for (Game_Flow& target_flow : target_character->flow_data) {
                    if (&target_flow != &flow && target_flow.state != 4 && target_flow.state != 5 && target_flow.id == details->id) {
                        target_flow.state = details->operation;
                    }
                }
            }
        }
    }
    Start_Next_Command_Execution(character, &flow);
}

void Execute_Stage_Clear(Game_Character& character, Game_Flow* flow, Stage* stage_data) {
    if (stage_data->clear_display == 1) {
        game_system.state = 1;
    }
    else {
        game_system.state = 2;
    }
    game_system.state_control_count = 0;

    PlaySoundMem(stage_clear_sound_effect, DX_PLAYTYPE_BACK);

    Start_Next_Command_Execution(character, flow);
}

void Execute_Item_Acquisition(Game_Character& character, Game_Flow* flow, Item_Acquisition_Details* details, Stage* stage_data) {
    Item temp_item;
    Game_Item temp_game_item;

    if (details->palette_type == 0) {
        temp_item = common_palette->item_data[details->palette_data_number];
    }
    if (details->palette_type == 1) {
        temp_item = stage_data->stage_palette.item_data[details->palette_data_number];
    }

    Convert_Item_Editor_to_Game(&temp_item, &temp_game_item);
    Acquire_Item(temp_game_item, *stage_data);

    Start_Next_Command_Execution(character, flow);
}

void Execute_Sound_Effect_Playback(Game_Character& character, Game_Flow* flow, Sound_Effect_Playback_Details* details) {
    PlaySoundMem(sound_effects[details->sound_effect], DX_PLAYTYPE_BACK);
    Start_Next_Command_Execution(character, flow);
}

void Prepare_Flow_Execution(Game_Character* character) {
    for (Game_Flow& flow : character->flow_data) {
        if (flow.executing_command == -1 && (flow.group == 0 || character->flow_group_executing_flag[flow.group] == 0)) {
            int start_execution_flag = 1;
            if (flow.basic_condition_data.size() > 0) {
                for (Basic_Condition& basic_condition : flow.basic_condition_data) {
                    if (Basic_Condition_Judgment(*character, basic_condition) == 0) {
                        start_execution_flag = 0;
                        break;
                    }
                }
            }
            if (flow.key_condition_data.size() > 0) {
                for (Key_Condition& key_condition : flow.key_condition_data) {
                    if (Key_Condition_Judgment(key_condition) == 0) {
                        start_execution_flag = 0;
                        break;
                    }
                }
            }
            if (start_execution_flag) {
                flow.executing_command = 0;
                flow.command_execution_time = 0;
                if (flow.group > 0) {
                    character->flow_group_executing_flag[flow.group] = 1;
                }
            }
        }
    }
}

void Execute_Flow(Game_Character* character, Stage* stage) {
    for (Game_Flow& flow : character->flow_data) {
        if (flow.executing_command != -1) {
            switch (flow.command_data[flow.executing_command].type) {
            case 1:
                Execute_Wait(*character, flow);
                break;
            case 2:
                Execute_Linear_Movement(*character, flow);
                break;
            case 10:
                Execute_Jump(*character, flow, stage);
                break;
            case 11:
                Execute_Shot(*character, flow);
                break;
            case 12:
                Execute_Sword(*character, flow);
                break;
            case 16:
                Execute_Flow_Operation(*character, flow);
                break;
            case 17:
                Execute_Stage_Clear(*character, &flow, stage);
                break;
            case 25:
                Execute_Item_Acquisition(*character, &flow, (Item_Acquisition_Details*)flow.command_data[flow.executing_command].details, stage);
                break;
            case 35:
                Execute_Sound_Effect_Playback(*character, &flow, (Sound_Effect_Playback_Details*)flow.command_data[flow.executing_command].details);
                break;
            default:
                Start_Next_Command_Execution(*character, &flow);
            }
        }
    }
}

bool Judge_Flow_Deletion(Game_Flow& flow) {
    return flow.state == 4;//delete
}

void Delete_Flow(Game_Character* character) {
    std::_Erase_remove_if(character->flow_data, Judge_Flow_Deletion);
}

void Execute_Item_Effects(Game_Item& item, Stage* stage) {
    for (Item_Effect& effect : item.effects) {
        switch (effect.type) {
        case 2:
            Execute_Stage_Clear(*game_player, nullptr, stage);
            break;
        case 10:
            Execute_Item_Acquisition(*game_player, nullptr, (Item_Acquisition_Details*)effect.details, stage);
            break;
        case 20:
            Execute_Sound_Effect_Playback(*game_player, nullptr, (Sound_Effect_Playback_Details*)effect.details);
            break;
        }
    }
}

void Player_Death() {
    game_player->death = 1;

    game_player->executing_character_effect = game_player->character_effect_on_death;
    game_player->executing_character_effect_execution_time = 0;
    game_player->executing_character_effect_execution_type = game_player->character_effect_on_death_execution_type;
    game_player->executing_character_effect_loop_execution = 0;

    game_system.state = game_system_state_player_death;
    game_system.state_control_count = 0;
    if (game_player->character_effect_on_death == 0) {
        game_system.wait_time = 60;
    }
    else if (game_player->executing_character_effect_execution_type == 0 || game_player->executing_character_effect_execution_type == 1) {
        game_system.wait_time = character_effect_data->records[game_player->character_effect_on_death].execution_time * 6 + 60;
    }
    else {
        game_system.wait_time = character_effect_data->records[game_player->character_effect_on_death].execution_time * 6 * 2 + 60;
    }
    PlaySoundMem(main_character_death_sound_effect, DX_PLAYTYPE_BACK);
}

void Player_Damage(Stage* stage, int damage) {
    game_player->hp -= damage;
    game_player->continuous_damage_invalidation_time = stage->main_character_continuous_damage_invalidation_time;
    game_player->hp_bar_display_time = 100;
    game_player->hp_bar_current = 100 * game_player->hp / game_player->max_hp;
    if (game_player->hp <= 0) Player_Death();
}

void Update_Player(Stage* stage) {
    game_player->movement_speed_x = 0.0;
    game_player->movement_speed_x = game_player->movement_amount_by_block;
    if (game_player->flying == 0) {
        game_player->movement_speed_y += stage->gravity;
    }

    if (game_player->block_item_acquisition_cooldown > 0) {
        --game_player->block_item_acquisition_cooldown;
    }

    if (game_player->continuous_damage_invalidation_time > 0) {
        --game_player->continuous_damage_invalidation_time;
    }
    if (game_player->hp_bar_display_time > 0) {
         --game_player->hp_bar_display_time;
    }
    if (game_player->hp_bar_past < game_player->hp_bar_current) {
        ++game_player->hp_bar_past;
    }
    if (game_player->hp_bar_past > game_player->hp_bar_current) {
        --game_player->hp_bar_past;
    }
    if (game_player->sp_bar_display_time > 0) {
        --game_player->sp_bar_display_time;
    }
    if (game_player->sp_bar_past < game_player->sp_bar_current) {
        ++game_player->sp_bar_past;
    }
    if (game_player->sp_bar_past > game_player->sp_bar_current) {
        --game_player->sp_bar_past;
    }
}

void Update_Player_Character_Effect() {
    if (game_player->executing_character_effect > 0) {
        ++game_player->executing_character_effect_execution_time;
        if ((game_player->executing_character_effect_execution_type == 0 || game_player->executing_character_effect_execution_type == 1)
            && game_player->executing_character_effect_execution_time >= character_effect_data->records[game_player->executing_character_effect].execution_time * 6) {
            if (game_player->executing_character_effect_loop_execution == 0) {
                game_player->executing_character_effect = 0;
                if (game_player->death == 1) {
                    game_player->transparency = 1;
                }
            }
            else {
                game_player->executing_character_effect_execution_time = 0;
            }
        }
         else if (game_player->executing_character_effect_execution_type == 2 && game_player->executing_character_effect_execution_time >= character_effect_data->records[game_player->executing_character_effect].execution_time * 6 * 2) {
            if (game_player->executing_character_effect_loop_execution == 0) {
                game_player->executing_character_effect = 0;
                if (game_player->death == 1) {
                    game_player->transparency = 1;
                }
            }
            else {
                game_player->executing_character_effect_execution_time = 0;
            }
        }
    }
}

void Character_Death(Game_Character& character) {
    character.death = 1;

    for (int i = 0; i < 4; ++i) {
        if (game_player->target[i] == &character) {
            game_player->target[i] = nullptr;
        }
    }
    for (Game_Character& current_character : game_characters) {
        for (int i = 0; i < 4; ++i) {
            if (current_character.target[i] == &character) {
                current_character.target[i] = nullptr;
            }
        }
    }
    for (Shot& shot : game_shots) {
        if (shot.movement_target == &character) {
            shot.movement_target = nullptr;
        }
    }

    character.movement_speed_x = 0;
    character.movement_speed_y = 0;

    character.executing_character_effect = character.character_effect_on_death;
    character.executing_character_effect_execution_time = 0;
    character.executing_character_effect_execution_type = character.character_effect_on_death_execution_type;
    character.executing_character_effect_loop_execution = 0;

    PlaySoundMem(enemy_death_sound_effect, DX_PLAYTYPE_BACK);
}

void Character_Damage(Stage* stage, Game_Character& character, int damage) {
    character.hp -= damage;
    character.continuous_damage_invalidation_time = stage->enemy_continuous_damage_invalidation_time;
    character.hp_bar_display_time = 100;
    character.hp_bar_current = 100 * character.hp / character.max_hp;
    if (character.hp <= 0) Character_Death(character);
}

void Update_Character_Character_Effects(Game_Character& character) {
    if (character.executing_character_effect > 0) {
        ++character.executing_character_effect_execution_time;
        if ((character.executing_character_effect_execution_type == 0 || character.executing_character_effect_execution_type == 1)
            && character.executing_character_effect_execution_time >= character_effect_data->records[character.executing_character_effect].execution_time * 6) {
            if (character.executing_character_effect_loop_execution == 0) {
                character.executing_character_effect = 0;
                if (character.death == 1) {
                    character.disappearance = 1;
                    //character.transparency = 1;
                }
            }
            else {
                character.executing_character_effect_execution_time = 0;
            }
        }
        else if (character.executing_character_effect_execution_type == 2 && character.executing_character_effect_execution_time >= character_effect_data->records[character.executing_character_effect].execution_time * 6 * 2) {
            if (character.executing_character_effect_loop_execution == 0) {
                character.executing_character_effect = 0;
                if (character.death == 1) {
                    character.disappearance = 1;
                    //character.transparency = 1;
                }
            }
            else {
                character.executing_character_effect_execution_time = 0;
            }
        }
    }
}

void Update_Characters(Stage* stage) {
    for (Game_Character& character : game_characters) {
        if (character.death == 0) {
            character.movement_speed_x = 0.0;
            if (character.flying == 0) {
                character.movement_speed_y += stage->gravity;
            }
            if (character.continuous_damage_invalidation_time > 0) {
                --character.continuous_damage_invalidation_time;
            }
            if (character.hp_bar_display_time > 0) {
                --character.hp_bar_display_time;
            }
            if (character.hp_bar_past < character.hp_bar_current) {
                ++character.hp_bar_past;
            }
            if (character.hp_bar_past > character.hp_bar_current) {
                --character.hp_bar_past;
            }
            if (character.sp_bar_display_time > 0) {
                --character.sp_bar_display_time;
            }
            if (character.sp_bar_past < character.sp_bar_current) {
                ++character.sp_bar_past;
            }
            if (character.sp_bar_past > character.sp_bar_current) {
                --character.sp_bar_past;
            }
        }
    }
}

bool Judge_Character_Disappearance(Game_Character& character) {
    return character.disappearance == 1;
}

void Disappear_Characters() {
    std::_Erase_remove_if(game_characters, Judge_Character_Disappearance);
}

void Update_Items() {
    for (Game_Item& item : game_items) {
        ++item.existence_time;
    }
}

bool Judge_Shot_Disappearance(Shot& shot) {
    return shot.disappearance == 1;
}

void Update_Shots(Stage* stage) {
    for (Shot& shot : game_shots) {
        double distance_squared;
        double minimum_distance_squared = 99999999;
        double dx, dy;
        Game_Character* nearest_character = nullptr;
        if (shot.flight_distance_valid == 0 || shot.flight_distance < shot.flight_distance_limit * 16) {
            if (shot.acceleration != 0) {
                shot.speed += shot.acceleration * 0.01;
            }
            double shot_speed_x = shot.speed * 0.1 * cos(shot.angle);
            if (shot_speed_x > 0) {
                shot.facing_right = 1;
            }
            else if (shot_speed_x < 0) {
                shot.facing_right = 0;
            }

            if (shot.movement_type >= 1 && shot.movement_type <= 6) {
                if (shot.targeting_and_guidance_control == 0 && shot.flight_distance > 16 * shot.movement_type_parameter1) {
                    switch (shot.movement_type) {
                    case 1:
                        shot.angle = atan2(game_player->position_y - shot.position_y, game_player->position_x - shot.position_x);
                        shot.speed = shot.initial_speed;
                        break;
                    case 2:
                        if (game_player->faction == shot.movement_type_parameter2) {
                            dx = game_player->position_x - shot.position_x;
                            dy = game_player->position_y - shot.position_y;
                            distance_squared = dx * dx + dy * dy;
                            if (distance_squared < minimum_distance_squared) {
                                nearest_character = game_player;
                                minimum_distance_squared = distance_squared;
                            }
                        }
                        for (Game_Character& character : game_characters) {
                            if (character.death == 0 && character.faction == shot.movement_type_parameter2) {
                                dx = character.position_x - shot.position_x;
                                dy = character.position_y - shot.position_y;
                                distance_squared = dx * dx + dy * dy;
                                 if (distance_squared < minimum_distance_squared) {
                                    nearest_character = &character;
                                    minimum_distance_squared = distance_squared;
                                }
                            }
                        }
                        if (nearest_character != nullptr) {
                            shot.angle = atan2(nearest_character->position_y - shot.position_y, nearest_character->position_x - shot.position_x);
                            shot.speed = shot.initial_speed;
                        }
                        break;
                    case 3:
                        if (shot.movement_target != nullptr) {
                            shot.angle = atan2(shot.movement_target->position_y - shot.position_y, shot.movement_target->position_x - shot.position_x);
                            shot.speed = shot.initial_speed;
                        }
                        break;
                    }
                    shot.targeting_and_guidance_control = 1;
                }
            }
            else if (shot.movement_type >= 4 && shot.movement_type <= 7) {
                if (shot.flight_distance > 16 * shot.movement_type_parameter1 && shot.flight_distance <= 16 * shot.movement_type_parameter2) {
                    switch (shot.movement_type) {
                    case 4:
                        shot.angle = atan2(game_player->position_y - shot.position_y, game_player->position_x - shot.position_x);
                        shot.speed = shot.initial_speed;
                        break;
                    case 5:
                        if (shot.targeting_and_guidance_control == 0) {
                            if (game_player->faction == shot.movement_type_parameter3) {
                                dx = game_player->position_x - shot.position_x;
                                dy = game_player->position_y - shot.position_y;
                                distance_squared = dx * dx + dy * dy;
                                if (distance_squared < minimum_distance_squared) {
                                    nearest_character = game_player;
                                    minimum_distance_squared = distance_squared;
                                }
                            }
                            for (Game_Character& character : game_characters) {
                                if (character.death == 0 && character.faction == shot.movement_type_parameter3) {
                                    dx = character.position_x - shot.position_x;
                                    dy = character.position_y - shot.position_y;
                                    distance_squared = dx * dx + dy * dy;
                                    if (distance_squared < minimum_distance_squared) {
                                        nearest_character = &character;
                                        minimum_distance_squared = distance_squared;
                                    }
                                }
                            }
                            if (nearest_character != nullptr) {
                                shot.movement_target = nearest_character;
                            }
                            shot.targeting_and_guidance_control = 1;
                        }
                        if (shot.movement_target != nullptr) {
                            shot.angle = atan2(shot.movement_target->position_y - shot.position_y, shot.movement_target->position_x - shot.position_x);
                            shot.speed = shot.initial_speed;
                        }
                        break;
                    case 6:
                        if (shot.movement_target != nullptr) {
                            shot.angle = atan2(shot.movement_target->position_y - shot.position_y, shot.movement_target->position_x - shot.position_x);
                            shot.speed = shot.initial_speed;
                        }
                        break;
                    case 7:
                        if (game_player->faction == shot.movement_type_parameter3) {
                            dx = game_player->position_x - shot.position_x;
                            dy = game_player->position_y - shot.position_y;
                            distance_squared = dx * dx + dy * dy;
                            if (distance_squared < minimum_distance_squared) {
                                nearest_character = game_player;
                                minimum_distance_squared = distance_squared;
                            }
                        }
                        for (Game_Character& character : game_characters) {
                            if (character.death == 0 && character.faction == shot.movement_type_parameter3) {
                                dx = character.position_x - shot.position_x;
                                dy = character.position_y - shot.position_y;
                                distance_squared = dx * dx + dy * dy;
                                if (distance_squared < minimum_distance_squared) {
                                    nearest_character = &character;
                                    minimum_distance_squared = distance_squared;
                                }
                            }
                        }
                        if (nearest_character != nullptr) {
                            shot.angle = atan2(nearest_character->position_y - shot.position_y, nearest_character->position_x - shot.position_x);
                            shot.speed = shot.initial_speed;
                        }
                        break;
                    }
                }
            }
            else if (shot.movement_type == 8) {
                double wave_movement_amount = 16 * shot.movement_type_parameter1
                                        * (sin((shot.existence_time * shot.movement_type_parameter2 + shot.movement_type_parameter3) * DX_PI / 180)
                                            - sin(((shot.existence_time - 1) * shot.movement_type_parameter2 + shot.movement_type_parameter3) * DX_PI / 180));
                if (shot.facing_right == 0) {
                    shot.position_x -= wave_movement_amount * sin(shot.angle);
                    shot.position_y += wave_movement_amount * cos(shot.angle);
                }
                if (shot.facing_right == 1) {
                    shot.position_x -= wave_movement_amount * sin(DX_PI - shot.angle);
                    shot.position_y += wave_movement_amount * cos(DX_PI - shot.angle);
                }
            }
            else if (shot.movement_type == 9) {
                if (shot.flight_distance > 16 * shot.movement_type_parameter1) {
                    shot.fall_speed += stage->gravity;
                    shot.position_y += shot.fall_speed;
                }
            }

            shot.position_x += shot_speed_x;
            shot.position_y += shot.speed * 0.1 * sin(shot.angle);
            shot.flight_distance += shot.initial_speed * 0.1;

        }
        if (shot.synchronize_with_auto_scroll == 1) {
            if (game_system.horizontal_auto_scroll_enabled == 1) {
                shot.position_x += game_system.horizontal_scroll_speed * 0.1;
            }
            if (game_system.vertical_auto_scroll_enabled == 1) {
                shot.position_y += game_system.vertical_scroll_speed * 0.1;
            }
        }
        ++shot.existence_time;
        if (stage->automatic_disappearance_enemy_shots_left_enabled == 1 && shot.position_x < -stage->automatic_disappearance_enemy_shots_left_range * 32) {
            shot.disappearance = 1;
        }
        if (stage->automatic_disappearance_enemy_shots_right_enabled == 1 && shot.position_x > 640 + stage->automatic_disappearance_enemy_shots_right_range * 32) {
            shot.disappearance = 1;
        }
        if (stage->automatic_disappearance_enemy_shots_up_enabled == 1 && shot.position_y < -stage->automatic_disappearance_enemy_shots_up_range * 32) {
            shot.disappearance = 1;
        }
        if (stage->automatic_disappearance_enemy_shots_down_enabled == 1 && shot.position_y > 480 + stage->automatic_disappearance_enemy_shots_down_range * 32) {
            shot.disappearance = 1;
        }
        if (shot.flight_distance_valid == 1 && shot.flight_distance >= shot.flight_distance_limit * 16 && shot.flight_distance_does_not_disappear == 0) {
            shot.disappearance = 1;
        }
        if (shot.disappearance_time_valid == 1 && shot.existence_time >= shot.disappearance_time * 6) {
            shot.disappearance = 1;
        }
    }
    std::_Erase_remove_if(game_shots, Judge_Shot_Disappearance);
}

bool Judge_Sword_Disappearance(Sword& sword) {
    return sword.disappearance == 1;
}

void Update_Swords() {
    for (Sword& sword : game_swords) {
        ++sword.sword_position_time;
        if (sword.sword_position_time >= 6 * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].display_time) {
            ++sword.sword_position_number;
            sword.sword_position_time = 0;
            if (sword.sword_position_number >= sword_type_data->records[sword.sword_type].sword_positions.size()) {
                sword.disappearance = 1;
                continue;
            }
        }
        switch (sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].direction) {
        case 0: //front
            if (sword.user->facing_right == 0) {
                sword.position_x = sword.user->position_x - 16 * sword.user->gigantic - sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width / 2 * sword.gigantic;
            }
            else {
                sword.position_x = sword.user->position_x + 16 * sword.user->gigantic + sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width / 2 * sword.gigantic;
            }
            sword.position_y = sword.user->position_y;
            sword.facing_right = sword.user->facing_right;
            break;
        case 1: //back
            if (sword.user->facing_right == 0) {
                sword.position_x = sword.user->position_x + 16 * sword.user->gigantic + sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width / 2 * sword.gigantic;
                sword.facing_right = 1;
            }
            else {
                sword.position_x = sword.user->position_x - 16 * sword.user->gigantic - sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width / 2 * sword.gigantic;
                sword.facing_right = 0;
            }
            sword.position_y = sword.user->position_y;
            break;
        case 2: //up
            sword.position_x = sword.user->position_x;
            sword.position_y = sword.user->position_y - 16 * sword.user->gigantic - sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].vertical_width / 2 * sword.gigantic;
            sword.facing_right = sword.user->facing_right;
            break;
        case 3: //down
            sword.position_x = sword.user->position_x;
            sword.position_y = sword.user->position_y + 16 * sword.user->gigantic + sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].vertical_width / 2 * sword.gigantic;
            sword.facing_right = sword.user->facing_right;
            break;
        }
    }
    std::_Erase_remove_if(game_swords, Judge_Sword_Disappearance);
}

void Update_Scroll(Stage* stage) {
    if (game_system.horizontal_auto_scroll_enabled == 1) {
        game_system.horizontal_scroll_amount += game_system.horizontal_scroll_speed * 0.1;
    }
    else {
        game_system.horizontal_scroll_amount = game_player->position_x - 320;
    }
    if (game_system.horizontal_scroll_amount + 640 > game_system.horizontal_scroll_maximum_value) {
        game_system.horizontal_scroll_amount = game_system.horizontal_scroll_maximum_value - 640;
    }
    if (game_system.horizontal_scroll_amount < game_system.horizontal_scroll_minimum_value) {
        game_system.horizontal_scroll_amount = game_system.horizontal_scroll_minimum_value;
    }

    if (game_system.vertical_auto_scroll_enabled == 1) {
        game_system.vertical_scroll_amount += game_system.vertical_scroll_speed * 0.1;
    }
    else {
        game_system.vertical_scroll_amount = game_player->position_y - 240;
    }
    if (game_system.vertical_scroll_amount + 480 > game_system.vertical_scroll_maximum_value) {
        game_system.vertical_scroll_amount = game_system.vertical_scroll_maximum_value - 480;
    }
    if (game_system.vertical_scroll_amount < game_system.vertical_scroll_minimum_value) {
        game_system.vertical_scroll_amount = game_system.vertical_scroll_minimum_value;
    }
}

void Background_Scroll(Stage* stage) {
    for (int i = 0; i < game_system.number_of_backgrounds; ++i) {
        if (stage->background_data[i].horizontal_auto_scroll == 1) {
            game_system.background_management[i].image_offset_x += stage->background_data[i].horizontal_auto_scroll_speed;
            if (game_system.background_management[i].image_offset_x < 0) game_system.background_management[i].image_offset_x += 640;
            if (game_system.background_management[i].image_offset_x >= 640) game_system.background_management[i].image_offset_x -= 640;
        }
        if (stage->background_data[i].vertical_auto_scroll == 1) {
            game_system.background_management[i].image_offset_y += stage->background_data[i].vertical_auto_scroll_speed;
            if (game_system.background_management[i].image_offset_y < 0) game_system.background_management[i].image_offset_y += 480;
            if (game_system.background_management[i].image_offset_y >= 480) game_system.background_management[i].image_offset_y -= 480;
        }
    }
}

void Prevent_Game_Player_From_Going_Outside_Stage(Game_Character* game_player, Stage* stage) {
    int collision_detection_position;//0:center 1:bottom
    int horizontal_width, vertical_width;
    int x_coordinate_lower_limit, x_coordinate_upper_limit, y_coordinate_lower_limit, y_coordinate_upper_limit;
    double x1, x2, y1, y2;//left edge, right edge, top edge, bottom edge of character's collision detection respectively

    if (game_system.horizontal_auto_scroll_enabled == 1) {
        x_coordinate_lower_limit = game_system.horizontal_scroll_amount;
        x_coordinate_upper_limit = game_system.horizontal_scroll_amount + 640;
    }
    else {
        x_coordinate_lower_limit = 0;
        x_coordinate_upper_limit = stage->x_coordinate_upper_limit;
    }
    if (game_system.vertical_auto_scroll_enabled == 1) {
        y_coordinate_lower_limit = game_system.vertical_scroll_amount;
        y_coordinate_upper_limit = game_system.vertical_scroll_amount + 480;
    }
    else {
        y_coordinate_lower_limit = 0;
        y_coordinate_upper_limit = stage->y_coordinate_upper_limit;
    }

    if (game_player->flying == 0) {
        collision_detection_position = stage->collision_detection_main_character_walking_vs_block_position;
        vertical_width = stage->collision_detection_main_character_walking_vs_block_vertical_width;
        horizontal_width = stage->collision_detection_main_character_walking_vs_block_horizontal_width;
    }
    else {
        collision_detection_position = stage->collision_detection_main_character_flying_vs_block_position;
        vertical_width = stage->collision_detection_main_character_flying_vs_block_vertical_width;
        horizontal_width = stage->collision_detection_main_character_flying_vs_block_horizontal_width;
    }

    x1 = game_player->position_x - game_player->gigantic * horizontal_width / 2;
    x2 = game_player->position_x + game_player->gigantic * horizontal_width / 2 - 1;
    if (collision_detection_position == 0) {
        y1 = game_player->position_y - game_player->gigantic * vertical_width / 2;
        y2 = game_player->position_y + game_player->gigantic * vertical_width / 2 - 1;
    }
    else {
        y1 = game_player->position_y + game_player->gigantic * (16 - vertical_width);
        y2 = game_player->position_y + game_player->gigantic * 16 - 1;
    }

    if (x1 < x_coordinate_lower_limit) {
        game_player->position_x = x_coordinate_lower_limit + game_player->gigantic * horizontal_width / 2;
        if (game_player->hit_block_right == 1 && game_system.horizontal_auto_scroll_enabled == 1) {
            Player_Death();
        }
    }
    if (x2 >= x_coordinate_upper_limit) {
        game_player->position_x = x_coordinate_upper_limit - game_player->gigantic * horizontal_width / 2;
        if (game_player->hit_block_left == 1 && game_system.horizontal_auto_scroll_enabled == 1) {
            Player_Death();
        }
    }
    if (y1 < y_coordinate_lower_limit) {
        if (collision_detection_position == 0) {
            game_player->position_y = y_coordinate_lower_limit + game_player->gigantic * vertical_width / 2;
        }
        else {
            game_player->position_y = y_coordinate_lower_limit + game_player->gigantic * (vertical_width - 16);
        }
        if (game_player->hit_block_down == 1 && game_system.vertical_auto_scroll_enabled == 1) {
            Player_Death();
        }
    }
    if (y2 >= y_coordinate_upper_limit) {
        if (game_player->hit_block_up == 1 && game_system.vertical_auto_scroll_enabled == 1) {
            Player_Death();
        }
        else if (game_player->flying == 0) {
            Player_Death();
        }
        if (collision_detection_position == 0) {
            game_player->position_y = y_coordinate_upper_limit - game_player->gigantic * vertical_width / 2;
        }
        else {
            game_player->position_y = y_coordinate_upper_limit - game_player->gigantic * 16;
        }
    }
}

void Judge_Character_Falling_Death(std::vector<Game_Character>& game_characters,Stage* stage) {
    int collision_detection_position;
    int vertical_width;
    double y;

    for (Game_Character& character : game_characters) {
        if (character.death == 0 && character.flying == 0) {
            collision_detection_position = stage->collision_detection_enemy_walking_vs_block_position;
            vertical_width = stage->collision_detection_enemy_walking_vs_block_vertical_width;
            if (collision_detection_position == 0) {
                y = character.position_y + character.gigantic * vertical_width / 2 - 1;
            }
            else {
                y = character.position_y + character.gigantic * 16 - 1;
            }
            if (y >= stage->y_coordinate_upper_limit) {
                Character_Death(character);
            }
        }
    }
}

void Reset_Game_Player_Block_Collision(Game_Character* game_player) {
    game_player->movement_speed_multiplier = 100;
    game_player->movement_amount_by_block = 0;
    game_player->jump_forbidden = 0;
    game_player->hit_block_left = 0;
    game_player->hit_block_right = 0;
    game_player->hit_block_up = 0;
    game_player->hit_block_down = 0;
}

void Reset_Character_Block_Collision(std::vector<Game_Character>& game_characters) {
    for (Game_Character& character : game_characters) {
        character.hit_block_left = 0;
        character.hit_block_right = 0;
        character.hit_block_up = 0;
        character.hit_block_down = 0;
    }
}

void Execute_Block_Action(Game_Character* game_player, Stage* stage, int action, int parameter) {
    switch (action) {
    case 1:
        game_player->movement_speed_y = -sqrt(2 * stage->gravity * parameter * 16 + 4);//add "+4" to make it slightly larger.
        game_player->on_ground = 0;
        PlaySoundMem(block_jump_sound_effect, DX_PLAYTYPE_BACK);
        break;
    case 2:
        game_player->jump_forbidden = 1;
        break;
    case 3:
        game_player->movement_speed_multiplier = parameter;
        break;
    case 4:
        game_player->movement_amount_by_block = -parameter * 0.1;
        break;
    case 5:
        game_player->movement_amount_by_block = parameter * 0.1;
        break;
    }
}

void Acquire_Item_From_Block(int palette_type, int palette_number, Stage* stage_data) {
    Item temp_item;
    Game_Item temp_game_item;

    if (palette_type == 1) {
        temp_item = common_palette->item_data[palette_number];
    }
    if (palette_type == 2) {
        temp_item = stage_data->stage_palette.item_data[palette_number];
    }

    Convert_Item_Editor_to_Game(&temp_item, &temp_game_item);
    Acquire_Item(temp_game_item, *stage_data);

    game_player->block_item_acquisition_cooldown = 60;
}

void Game_Player_Block_Collision_Detection(Game_Character* game_player, Block* block_data, Stage* stage) {
    int collision_detection_position;//0:center 1:bottom
    int horizontal_width, vertical_width;
    double x1, x2, y1, y2;//left edge, right edge, top edge, bottom edge of character's collision detection respectively
    int block_x1, block_x2, block_y1, block_y2;

    int on_ground = 0;
    int block_action = -1;
    int block_action_parameter = 0;
    int item_acquisition_palette_type = 0;
    int item_acquisition_palette_number = 0;

    if (game_player->flying == 0) {
        collision_detection_position = stage->collision_detection_main_character_walking_vs_block_position;
        vertical_width = stage->collision_detection_main_character_walking_vs_block_vertical_width;
        horizontal_width = stage->collision_detection_main_character_walking_vs_block_horizontal_width;
    }
    else {
        collision_detection_position = stage->collision_detection_main_character_flying_vs_block_position;
        vertical_width = stage->collision_detection_main_character_flying_vs_block_vertical_width;
        horizontal_width = stage->collision_detection_main_character_flying_vs_block_horizontal_width;
    }

    game_player->position_x += game_player->movement_speed_x;
    if (game_system.horizontal_auto_scroll_enabled == 1 && game_player->synchronize_with_auto_scroll == 1) {
        game_player->position_x += game_system.horizontal_scroll_speed * 0.1;
    }

    x1 = game_player->position_x - game_player->gigantic * horizontal_width / 2;
    x2 = game_player->position_x + game_player->gigantic * horizontal_width / 2 - 1;
    if (collision_detection_position == 0) {
        y1 = game_player->position_y - game_player->gigantic * vertical_width / 2;
        y2 = game_player->position_y + game_player->gigantic * vertical_width / 2 - 1;
    }
    else {
        y1 = game_player->position_y + game_player->gigantic * (16 - vertical_width);
        y2 = game_player->position_y + game_player->gigantic * 16 - 1;
    }

    block_x1 = (int)x1 / 32;
    block_x2 = (int)x2 / 32;
    block_y1 = (int)y1 / 32;
    block_y2 = (int)y2 / 32;

    //left
    if (block_x1 >= 0) {
        for (int y = block_y1; y <= block_y2; ++y) {
            if (y >= stage->vertical_width) break;
            if (y < 0) continue;
            Block* block = &block_data[stage->horizontal_width * y + block_x1];
            if (block->block_type == 1) {
                game_player->position_x = block_x1 * 32 + 32 + game_player->gigantic * horizontal_width / 2;
                game_player->hit_block_left = 1;
            }
            if (block->block_type == 2) {
                Player_Death();
                return;
            }
        }
    }
    //right
    if (block_x2 < stage->horizontal_width) {
        for (int y = block_y1; y <= block_y2; ++y) {
            if (y >= stage->vertical_width) break;
            if (y < 0) continue;
            Block* block = &block_data[stage->horizontal_width * y + block_x2];
            if (block->block_type == 1) {
                game_player->position_x = block_x2 * 32 - game_player->gigantic * horizontal_width / 2;
                game_player->hit_block_right = 1;
            }
            if (block->block_type == 2) {
                Player_Death();
                return;
            }
        }
    }

    game_player->position_y += game_player->movement_speed_y;
    if (game_system.vertical_auto_scroll_enabled == 1 && game_player->synchronize_with_auto_scroll == 1) {
        game_player->position_y += game_system.vertical_scroll_speed * 0.1;
    }

    x1 = game_player->position_x - game_player->gigantic * horizontal_width / 2;
    x2 = game_player->position_x + game_player->gigantic * horizontal_width / 2 - 1;
    if (collision_detection_position == 0) {
        y1 = game_player->position_y - game_player->gigantic * vertical_width / 2;
        y2 = game_player->position_y + game_player->gigantic * vertical_width / 2;
    }
    else {
        y1 = game_player->position_y + game_player->gigantic * (16 - vertical_width);
        y2 = game_player->position_y + game_player->gigantic * 16;
    }

    block_x1 = (int)x1 / 32;
    block_x2 = (int)x2 / 32;
    block_y1 = (int)y1 / 32;
    block_y2 = (int)y2 / 32;

    //up
    if (block_y1 >= 0) {
        for (int x = block_x1; x <= block_x2; ++x) {
            if (x >= stage->horizontal_width) break;
            if (x < 0) continue;
            Block* block = &block_data[stage->horizontal_width * block_y1 + x];
            if (block->block_type == 1) {
                if (collision_detection_position == 0) {
                    game_player->position_y = block_y1 * 32 + 32 + game_player->gigantic * vertical_width / 2;
                }
                else {
                    game_player->position_y = block_y1 * 32 + 32 + game_player->gigantic * (vertical_width - 16);
                }
                game_player->movement_speed_y = 0;
                game_player->hit_block_up = 1;
            }
            if (block->block_type == 2) {
                Player_Death();
                return;
            }
        }
    }
    //down
    if (block_y2 < stage->vertical_width) {
        double mod = fmod(game_player->position_x, 32);
        int sign = 1;
        if (mod >= 16.0) sign = -1;
        int reference_x = game_player->position_x / 32;
        int repetition = 1;
        int x;
        while (true) {
            x = reference_x + sign * (repetition / 2);
            if ((sign == 1 && x > block_x2) || (sign == -1 && x < block_x1)) {
                break;
            }

            if (x >= stage->horizontal_width) break;
            if (x < 0) continue;
            Block* block = &block_data[stage->horizontal_width * block_y2 + x];
            if (block->block_type == 1) {
                if (collision_detection_position == 0) {
                    game_player->position_y = block_y2 * 32 - game_player->gigantic * vertical_width / 2;
                }
                else {
                    game_player->position_y = block_y2 * 32 - game_player->gigantic * 16;
                }
                game_player->movement_speed_y = 0;
                on_ground = 1;
                game_player->hit_block_down = 1;
                if (game_player->flying == 0 && block_action == -1) {
                    if (game_player->landing_block_position != stage->horizontal_width * block_y2 + x) {
                        game_player->landing_block_position = stage->horizontal_width * block_y2 + x;
                        game_player->block_item_acquisition_cooldown = 0;
                    }
                    block_action = block->action;
                    block_action_parameter = block->action_parameter;
                    if (block->acquired_item_palette > 0) {
                        item_acquisition_palette_type = block->acquired_item_palette;
                        item_acquisition_palette_number = block->acquired_item_palette_data_number;
                    }
                }
            }
            if (block->block_type == 2) {
                Player_Death();
                return;
            }

            sign *= -1;
            ++repetition;
        }
    }

    if (on_ground == 1) {
        game_player->on_ground = 1;
        game_player->not_on_ground_count = 0;
    }
    else{
        game_player->landing_block_position = -1;
        game_player->block_item_acquisition_cooldown = 0;
        if (game_player->on_ground == 1) {
            ++game_player->not_on_ground_count;
            if (game_player->not_on_ground_count > 6) {
                game_player->on_ground = 0;
            }
        }
    }

    if (block_action > 0) {
        Execute_Block_Action(game_player, stage, block_action, block_action_parameter);
    }
    if (item_acquisition_palette_type > 0 && game_player->block_item_acquisition_cooldown == 0) {
        Acquire_Item_From_Block(item_acquisition_palette_type, item_acquisition_palette_number, stage_data);
    }
}

void Character_Block_Collision_Detection(std::vector<Game_Character>& game_characters, Block* block_data, Stage* stage) {
    int collision_detection_position;//0:center 1:bottom
    int horizontal_width, vertical_width;
    double x1, x2, y1, y2;//left edge, right edge, top edge, bottom edge of character's collision detection respectively
    int block_x1, block_x2, block_y1, block_y2;

    int on_ground = 0;

    for (Game_Character& character : game_characters) {
        if (character.flying == 0) {
            collision_detection_position = stage->collision_detection_enemy_walking_vs_block_position;
            vertical_width = stage->collision_detection_enemy_walking_vs_block_vertical_width;
            horizontal_width = stage->collision_detection_enemy_walking_vs_block_horizontal_width;
        }
        else {
            collision_detection_position = stage->collision_detection_enemy_flying_vs_block_position;
            vertical_width = stage->collision_detection_enemy_flying_vs_block_vertical_width;
            horizontal_width = stage->collision_detection_enemy_flying_vs_block_horizontal_width;
        }

        character.position_x += character.movement_speed_x;
        if (game_system.horizontal_auto_scroll_enabled == 1 && character.synchronize_with_auto_scroll == 1) {
            character.position_x += game_system.horizontal_scroll_speed * 0.1;
        }


        x1 = character.position_x - character.gigantic * horizontal_width / 2;
        x2 = character.position_x + character.gigantic * horizontal_width / 2 - 1;
        if (collision_detection_position == 0) {
            y1 = character.position_y - character.gigantic * vertical_width / 2;
            y2 = character.position_y + character.gigantic * vertical_width / 2 - 1;
        }
        else {
            y1 = character.position_y + character.gigantic * (16 - vertical_width);
            y2 = character.position_y + character.gigantic * 16 - 1;
        }

        block_x1 = (int)x1 / 32;
        block_x2 = (int)x2 / 32;
        block_y1 = (int)y1 / 32;
        block_y2 = (int)y2 / 32;

        //left
        if (block_x1 >= 0 && block_x1 < stage->horizontal_width) {
            for (int y = block_y1; y <= block_y2; ++y) {
                if (y >= stage->vertical_width) break;
                if (y < 0) continue;
                Block* block = &block_data[stage->horizontal_width * y + block_x1];
                if (block->block_type > 0) {
                    character.position_x = block_x1 * 32 + 32 + character.gigantic * horizontal_width / 2;
                    character.hit_block_left = 1;
                    break;
                }
            }
        }
        //right
        if (block_x2 >= 0 && block_x2 < stage->horizontal_width) {
            for (int y = block_y1; y <= block_y2; ++y) {
                if (y >= stage->vertical_width) break;
                if (y < 0) continue;
                Block* block = &block_data[stage->horizontal_width * y + block_x2];
                if (block->block_type > 0) {
                    character.position_x = block_x2 * 32 - character.gigantic * horizontal_width / 2;
                    character.hit_block_right = 1;
                    break;
                }
            }
        }

        character.position_y += character.movement_speed_y;
        if (game_system.vertical_auto_scroll_enabled == 1 && character.synchronize_with_auto_scroll == 1) {
            character.position_y += game_system.vertical_scroll_speed * 0.1;
        }

        x1 = character.position_x - character.gigantic * horizontal_width / 2;
        x2 = character.position_x + character.gigantic * horizontal_width / 2 - 1;
        if (collision_detection_position == 0) {
            y1 = character.position_y - character.gigantic * vertical_width / 2;
            y2 = character.position_y + character.gigantic * vertical_width / 2;
        }
        else {
            y1 = character.position_y + character.gigantic * (16 - vertical_width);
            y2 = character.position_y + character.gigantic * 16;
        }

        block_x1 = (int)x1 / 32;
        block_x2 = (int)x2 / 32;
        block_y1 = (int)y1 / 32;
        block_y2 = (int)y2 / 32;

        //up
        if (block_y1 >= 0 && block_y1 < stage->vertical_width) {
            for (int x = block_x1; x <= block_x2; ++x) {
                if (x >= stage->horizontal_width) break;
                if (x < 0) continue;
                Block* block = &block_data[stage->horizontal_width * block_y1 + x];
                if (block->block_type > 0) {
                    if (collision_detection_position == 0) {
                        character.position_y = block_y1 * 32 + 32 + character.gigantic * vertical_width / 2;
                    }
                    else {
                        character.position_y = block_y1 * 32 + 32 + character.gigantic * (vertical_width - 16);
                    }
                    character.movement_speed_y = 0;
                    character.hit_block_up = 1;
                    break;
                }
            }
        }
        //down
        if (block_y2 >= 0 && block_y2 < stage->vertical_width) {
            for (int x = block_x1; x <= block_x2; ++x) {
                if (x >= stage->horizontal_width) break;
                if (x < 0) continue;
                Block* block = &block_data[stage->horizontal_width * block_y2 + x];
                if (block->block_type > 0) {
                    if (collision_detection_position == 0) {
                        character.position_y = block_y2 * 32 - character.gigantic * vertical_width / 2;
                    }
                    else {
                        character.position_y = block_y2 * 32 - character.gigantic * 16;
                    }
                    character.movement_speed_y = 0;
                    on_ground = 1;
                    character.hit_block_down = 1;
                    break;
                }
            }
        }

        if (on_ground == 1) {
            character.on_ground = 1;
            character.not_on_ground_count = 0;
        }
        else if (character.on_ground == 1) {
            ++character.not_on_ground_count;
            if (character.not_on_ground_count > 6) {
                character.on_ground = 0;
            }
        }
    }
}

void Shot_Block_Collision_Detection(std::vector<Shot>& game_shots, Block* block_data, Stage* stage) {
    int horizontal_half_width, vertical_half_width;
     double x1, x2, y1, y2;//left edge, right edge, top edge, bottom edge of shot collision detection respectively
    int block_x1, block_x2, block_y1, block_y2;

    for (Shot& shot : game_shots) {
        if (shot.penetrate_blocks == 1) continue;
        if (shot.user == game_player) {
            horizontal_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_character_horizontal_width / 2;
            vertical_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_character_vertical_width / 2;
        }
        else {
            horizontal_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_character_horizontal_width / 2;
            vertical_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_character_vertical_width / 2;
        }

        x1 = shot.position_x - horizontal_half_width;
        x2 = shot.position_x + horizontal_half_width - 1;
        y1 = shot.position_y - vertical_half_width;
        y2 = shot.position_y + vertical_half_width - 1;

        block_x1 = (int)x1 / 32;
        block_x2 = (int)x2 / 32;
        block_y1 = (int)y1 / 32;
        block_y2 = (int)y2 / 32;

        //left
        if (block_x1 >= 0) {
            for (int y = block_y1; y <= block_y2; ++y) {
                if (y >= stage->horizontal_width) break;
                if (y < 0) continue;
                Block* block = &block_data[stage->horizontal_width * y + block_x1];
                if (block->block_type == 1) {
                    shot.disappearance = 1;
                    break;
                }
            }
        }
        //right
        if (block_x2 < stage->horizontal_width) {
            for (int y = block_y1; y <= block_y2; ++y) {
                if (y >= stage->horizontal_width) break;
                if (y < 0) continue;
                Block* block = &block_data[stage->horizontal_width * y + block_x2];
                if (block->block_type == 1) {
                    shot.disappearance = 1;
                    break;
                }
            }
        }

        //up
        if (block_y1 >= 0) {
            for (int x = block_x1; x <= block_x2; ++x) {
                if (x >= stage->horizontal_width) break;
                if (x < 0) continue;
                Block* block = &block_data[stage->horizontal_width * block_y1 + x];
                if (block->block_type == 1) {
                    shot.disappearance = 1;
                    break;
                }
            }
        }
        //down
        if (block_y2 < stage->vertical_width) {
            for (int x = block_x1; x <= block_x2; ++x) {
                if (x >= stage->horizontal_width) break;
                if (x < 0) continue;
                Block* block = &block_data[stage->horizontal_width * block_y2 + x];
                if (block->block_type == 1) {
                    shot.disappearance = 1;
                    break;
                }
            }
        }
    }
}

void Game_Player_Character_Collision_Detection(Game_Character* game_player, std::vector<Game_Character>& game_characters, Stage* stage) {
    int game_player_collision_detection_position;//0:center 1:bottom
    int game_player_horizontal_half_width, game_player_vertical_half_width;
    double game_player_x1, game_player_x2, game_player_y1, game_player_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int character_collision_detection_position;//0:center 1:bottom
    int character_horizontal_half_width, character_vertical_half_width;
    double character_x1, character_x2, character_y1, character_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int damage;
    int play_damage_sound_effect = 0;

    if (game_player->death == 1) return;
    if (game_player->flying == 0) {
        game_player_collision_detection_position = stage->collision_detection_main_character_walking_vs_character_position;
        game_player_vertical_half_width = game_player->gigantic * stage->collision_detection_main_character_walking_vs_character_vertical_width / 2;
        game_player_horizontal_half_width = game_player->gigantic * stage->collision_detection_main_character_walking_vs_character_horizontal_width / 2;
    }
    else {
        game_player_collision_detection_position = stage->collision_detection_main_character_flying_vs_character_position;
         game_player_vertical_half_width = game_player->gigantic * stage->collision_detection_main_character_flying_vs_character_vertical_width / 2;
        game_player_horizontal_half_width = game_player->gigantic * stage->collision_detection_main_character_flying_vs_character_horizontal_width / 2;
    }

    game_player_x1 = game_player->position_x - game_player_horizontal_half_width;
    game_player_x2 = game_player->position_x + game_player_horizontal_half_width;
    if (game_player_collision_detection_position == 0) {
        game_player_y1 = game_player->position_y - game_player_vertical_half_width;
        game_player_y2 = game_player->position_y + game_player_vertical_half_width;
    }
    else {
        game_player_y1 = game_player->position_y + game_player->gigantic * 16 - 2 * game_player_vertical_half_width;
        game_player_y2 = game_player->position_y + game_player->gigantic * 16;
    }

    for (Game_Character& character : game_characters) {
        if (character.death == 1) continue;
        if (game_player->faction == character.faction) continue;
        if (character.flying == 0) {
            character_collision_detection_position = stage->collision_detection_enemy_walking_vs_character_position;
            character_vertical_half_width = character.gigantic * stage->collision_detection_enemy_walking_vs_character_vertical_width / 2;
             character_horizontal_half_width = character.gigantic * stage->collision_detection_enemy_walking_vs_character_horizontal_width / 2;
        }
        else {
            character_collision_detection_position = stage->collision_detection_enemy_flying_vs_character_position;
            character_vertical_half_width = character.gigantic * stage->collision_detection_enemy_flying_vs_character_vertical_width / 2;
            character_horizontal_half_width = character.gigantic * stage->collision_detection_enemy_flying_vs_character_horizontal_width / 2;
        }

        character_x1 = character.position_x - character_horizontal_half_width;
        character_x2 = character.position_x + character_horizontal_half_width;
        if (character_collision_detection_position == 0) {
            character_y1 = character.position_y - character_vertical_half_width;
            character_y2 = character.position_y + character_vertical_half_width;
        }
        else {
            character_y1 = character.position_y + character.gigantic * 16 - 2 * character_vertical_half_width;
            character_y2 = character.position_y + character.gigantic * 16;
        }
        if (game_player_x1 <= character_x2 && character_x1 <= game_player_x2 && game_player_y1 <= character_y2 && character_y1 <= game_player_y2) {
            if (character.continuous_damage_invalidation_time == 0 && game_player->body_hit_power > 0) {
                if (game_player->body_hit_effect > 0) {
                    Game_Effect* effect = new Game_Effect();
                    effect->position_x = (game_player->position_x + character.position_x) / 2 + GetRand(5) - 2;
                    effect->position_y = (game_player->position_y + character.position_y) / 2 + GetRand(5) - 2;
                    effect->effect_number = game_player->body_hit_effect;
                    effect->animation_number = 0;
                    effect->animation_time = 0;
                    effect->disappearance = 0;
                    game_effects.push_back(*effect);
                    delete effect;
                }
                damage = game_player->body_hit_power - character.defense;
                if (damage > 0) {
                    Character_Damage(stage, character, damage);
                    play_damage_sound_effect = 1;
                }
            }
            if (game_player->continuous_damage_invalidation_time == 0 && character.body_hit_power > 0) {
                if (character.body_hit_effect > 0) {
                    Game_Effect* effect = new Game_Effect();
                    effect->position_x = (game_player->position_x + character.position_x) / 2 + GetRand(5) - 2;
                    effect->position_y = (game_player->position_y + character.position_y) / 2 + GetRand(5) - 2;
                    effect->effect_number = character.body_hit_effect;
                    effect->animation_number = 0;
                    effect->animation_time = 0;
                    effect->disappearance = 0;
                    game_effects.push_back(*effect);
                    delete effect;
                }
                damage = character.body_hit_power - game_player->defense;
                if (damage > 0) {
                    Player_Damage(stage, damage);
                    play_damage_sound_effect = 1;
                }
            }
            if (play_damage_sound_effect == 1) {
                PlaySoundMem(damage_sound_effect, DX_PLAYTYPE_BACK);
                play_damage_sound_effect = 0;
            }
        }
    }
}

void Character_Character_Collision_Detection(std::vector<Game_Character>& game_characters, Stage* stage) {
    Game_Character* character1;
    Game_Character* character2;

    int character1_collision_detection_position;//0:center 1:bottom
    int character1_horizontal_half_width, character1_vertical_half_width;
    double character1_x1, character1_x2, character1_y1, character1_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int character2_collision_detection_position;//0:center 1:bottom
    int character2_horizontal_half_width, character2_vertical_half_width;
    double character2_x1, character2_x2, character2_y1, character2_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int damage;
    int play_damage_sound_effect = 0;

    int number_of_characters = game_characters.size();
    for (int i = 0; i < number_of_characters; ++i) {
        character1 = &game_characters[i];
        if (character1->death == 1) continue;
        if (character1->flying == 0) {
            character1_collision_detection_position = stage->collision_detection_enemy_walking_vs_character_position;
            character1_vertical_half_width = character1->gigantic * stage->collision_detection_enemy_walking_vs_character_vertical_width / 2;
            character1_horizontal_half_width = character1->gigantic * stage->collision_detection_enemy_walking_vs_character_horizontal_width / 2;
        }
        else {
            character1_collision_detection_position = stage->collision_detection_enemy_flying_vs_character_position;
            character1_vertical_half_width = character1->gigantic * stage->collision_detection_enemy_flying_vs_character_vertical_width / 2;
             character1_horizontal_half_width = character1->gigantic * stage->collision_detection_enemy_flying_vs_character_horizontal_width / 2;
        }

        character1_x1 = character1->position_x - character1_horizontal_half_width;
        character1_x2 = character1->position_x + character1_horizontal_half_width;
        if (character1_collision_detection_position == 0) {
            character1_y1 = character1->position_y - character1_vertical_half_width;
            character1_y2 = character1->position_y + character1_vertical_half_width;
        }
        else {
            character1_y1 = character1->position_y + character1->gigantic * 16 - 2 * character1_vertical_half_width;
            character1_y2 = character1->position_y + character1->gigantic * 16;
        }
        for (int j = i + 1; j < number_of_characters; ++j) {
            character2 = &game_characters[j];
            if (character2->death == 1) continue;
            if (character1->faction == character2->faction) continue;
            if (character2->flying == 0) {
                character2_collision_detection_position = stage->collision_detection_enemy_walking_vs_character_position;
                character2_vertical_half_width = character2->gigantic * stage->collision_detection_enemy_walking_vs_character_vertical_width / 2;
                character2_horizontal_half_width = character2->gigantic * stage->collision_detection_enemy_walking_vs_character_horizontal_width / 2;
            }
            else {
                character2_collision_detection_position = stage->collision_detection_enemy_flying_vs_character_position;
                character2_vertical_half_width = character2->gigantic * stage->collision_detection_enemy_flying_vs_character_vertical_width / 2;
                character2_horizontal_half_width = character2->gigantic * stage->collision_detection_enemy_flying_vs_character_horizontal_width / 2;
            }

            character2_x1 = character2->position_x - character2_horizontal_half_width;
            character2_x2 = character2->position_x + character2_horizontal_half_width;
            if (character2_collision_detection_position == 0) {
                character2_y1 = character2->position_y - character2_vertical_half_width;
                character2_y2 = character2->position_y + character2_vertical_half_width;
            }
            else {
                character2_y1 = character2->position_y + character2->gigantic * 16 - 2 * character2_vertical_half_width;
                character2_y2 = character2->position_y + character2->gigantic * 16;
            }
            if (character1_x1 <= character2_x2 && character2_x1 <= character1_x2 && character1_y1 <= character2_y2 && character2_y1 <= character1y2) {
                if (character2->continuous_damage_invalidation_time == 0 && character1->body_hit_power > 0) {
                    if (character1->body_hit_effect > 0) {
                        Game_Effect* effect = new Game_Effect();
                        effect->position_x = (character1->position_x + character2->position_x) / 2 + GetRand(5) - 2;
                        effect->position_y = (character1->position_y + character2->position_y) / 2 + GetRand(5) - 2;
                        effect->effect_number = character1->body_hit_effect;
                        effect->animation_number = 0;
                        effect->animation_time = 0;
                        effect->disappearance = 0;
                        game_effects.push_back(*effect);
                        delete effect;
                    }
                    damage = character1->body_hit_power - character2->defense;
                    if (damage > 0) {
                        Character_Damage(stage, *character2, damage);
                        play_damage_sound_effect = 1;
                    }
                }
                if (character1->continuous_damage_invalidation_time == 0 && character2->body_hit_power > 0) {
                    if (character2->body_hit_effect > 0) {
                        Game_Effect* effect = new Game_Effect();
                        effect->position_x = (character1->position_x + character2->position_x) / 2 + GetRand(5) - 2;
                        effect->position_y = (character1->position_y + character2->position_y) / 2 + GetRand(5) - 2;
                        effect->effect_number = character2->body_hit_effect;
                        effect->animation_number = 0;
                        effect->animation_time = 0;
                        effect->disappearance = 0;
                        game_effects.push_back(*effect);
                        delete effect;
                    }
                    damage = character2->body_hit_power - character1->defense;
                    if (damage > 0) {
                        Character_Damage(stage, *character1, damage);
                        play_damage_sound_effect = 1;
                    }
                }
                if (play_damage_sound_effect == 1) {
                    PlaySoundMem(damage_sound_effect, DX_PLAYTYPE_BACK);
                    play_damage_sound_effect = 0;
                }
            }
        }
    }
}

void Acquire_Item(Game_Item& item, Stage& stage_data) {
    if (item.sound_effect > 0) {
        PlaySoundMem(sound_effects[item.sound_effect], DX_PLAYTYPE_BACK);
    }
    Execute_Item_Effects(item, &stage_data);
    if (item.display_above_head_on_acquisition == 1) {
        struct Item_Acquisition_Display display;
        display.position_x = game_player->position_x;
        display.position_y = game_player->position_y - 16 * game_player->gigantic - 8;
        display.image_type = item.image_type;
        display.image_number = item.image_number;
        display.existence_time = 0;
        item_acquisition_display.push_back(display);
    }
}

void Game_Player_Item_Collision_Detection(Game_Character* game_player, std::vector<Game_Item>& game_items, Stage* stage) {
    double game_player_horizontal_half_width = game_player->gigantic * stage->collision_detection_main_character_vs_item_horizontal_width / 2;
    double game_player_vertical_half_width = game_player->gigantic * stage->collision_detection_main_character_vs_item_vertical_width / 2;
    double item_horizontal_half_width;
    double item_vertical_half_width;

    for (Game_Item& item : game_items) {
        if (item.acquisition_type < 2) {
            item_horizontal_half_width = item.gigantic * stage->collision_detection_item_vs_character_horizontal_width / 2;
            item_vertical_half_width = item.gigantic * stage->collision_detection_item_vs_character_vertical_width / 2;
            if (abs(game_player->position_x - item.position_x) <= game_player_horizontal_half_width + item_horizontal_half_width
                && abs(game_player->position_y - item.position_y) <= game_player_vertical_half_width + item_vertical_half_width) {
                if (item.acquisition_type == 0) {
                    Acquire_Item(item, *stage);
                    item.disappearance = 1;
                }
                else if(item.overlapping == 0){
                    Acquire_Item(item, *stage);
                    item.overlapping = 1;
                }
            }
            else {
                item.overlapping = 0;
            }
        }
    }
}

void Game_Player_Shot_Collision_Detection(Game_Character* game_player, std::vector<Shot>& game_shots, Stage* stage) {
    int game_player_horizontal_half_width, game_player_vertical_half_width;
    double game_player_x1, game_player_x2, game_player_y1, game_player_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int shot_horizontal_half_width, shot_vertical_half_width;
    double shot_x1, shot_x2, shot_y1, shot_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
     int damage;

    if (game_player->death == 1) return;
    if (game_player->continuous_damage_invalidation_time > 0) return;

    game_player_vertical_half_width = game_player->gigantic * stage->collision_detection_main_character_vs_shot_vertical_width / 2;
    game_player_horizontal_half_width = game_player->gigantic * stage->collision_detection_main_character_vs_shot_horizontal_width / 2;

    game_player_x1 = game_player->position_x - game_player_horizontal_half_width;
    game_player_x2 = game_player->position_x + game_player_horizontal_half_width;
    game_player_y1 = game_player->position_y - game_player_vertical_half_width;
    game_player_y2 = game_player->position_y + game_player_vertical_half_width;

    for (Shot& shot : game_shots) {
        if (game_player->faction == shot.faction) continue;
        if (shot.user == game_player) {
            shot_vertical_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_character_vertical_width / 2;
            shot_horizontal_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_character_horizontal_width / 2;
        }
        else {
            shot_vertical_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_character_vertical_width / 2;
            shot_horizontal_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_character_horizontal_width / 2;
        }

        shot_x1 = shot.position_x - shot_horizontal_half_width;
        shot_x2 = shot.position_x + shot_horizontal_half_width;
        shot_y1 = shot.position_y - shot_vertical_half_width;
        shot_y2 = shot.position_y + shot_vertical_half_width;

        if (game_player_x1 <= shot_x2 && shot_x1 <= game_player_x2 && game_player_y1 <= shot_y2 && shot_y1 <= game_player_y2) {
            if (shot.power > 0) {
                if (shot.effect > 0) {
                    Game_Effect* effect = new Game_Effect();
                    effect->position_x = (game_player->position_x + shot.position_x) / 2 + GetRand(5) - 2;
                    effect->position_y = (game_player->position_y + shot.position_y) / 2 + GetRand(5) - 2;
                    effect->effect_number = shot.effect;
                    effect->animation_number = 0;
                    effect->animation_time = 0;
                    effect->disappearance = 0;
                    game_effects.push_back(*effect);
                    delete effect;
                }
                damage = shot.power - game_player->defense;
                if (damage > 0) {
                    Player_Damage(stage, damage);
                }
            }
            if (shot.penetrate_characters == 0 && game_player->block == 0) {
                shot.disappearance = 1;
            }
            else if (shot.penetrate_block_characters == 0 && game_player->block == 1) {
                shot.disappearance = 1;
            }
            PlaySoundMem(damage_sound_effect, DX_PLAYTYPE_BACK);
        }
    }
}

void Character_Shot_Collision_Detection(std::vector<Game_Character>& game_characters, std::vector<Shot>& game_shots, Stage* stage) {
    int character_horizontal_half_width, character_vertical_half_width;
    double character_x1, character_x2, character_y1, character_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int shot_horizontal_half_width, shot_vertical_half_width;
    double shot_x1, shot_x2, shot_y1, shot_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int damage;

    for (Game_Character& character : game_characters) {
        if (character.death == 1) continue;
        if (character.continuous_damage_invalidation_time > 0) continue;
        character_vertical_half_width = character.gigantic * stage->collision_detection_enemy_vs_shot_vertical_width / 2;
        character_horizontal_half_width = character.gigantic * stage->collision_detection_enemy_vs_shot_horizontal_width / 2;

        character_x1 = character.position_x - character_horizontal_half_width;
        character_x2 = character.position_x + character_horizontal_half_width;
        character_y1 = character.position_y - character_vertical_half_width;
        character_y2 = character.position_y + character_vertical_half_width;

        for (Shot& shot : game_shots) {
            if (character.faction == shot.faction) continue;
            if (shot.user == game_player) {
                shot_vertical_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_character_vertical_width / 2;
                shot_horizontal_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_character_horizontal_width / 2;
            }
            else {
                shot_vertical_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_character_vertical_width / 2;
                shot_horizontal_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_character_horizontal_width / 2;
            }

            shot_x1 = shot.position_x - shot_horizontal_half_width;
            shot_x2 = shot.position_x + shot_horizontal_half_width;
            shot_y1 = shot.position_y - shot_vertical_half_width;
            shot_y2 = shot.position_y + shot_vertical_half_width;

            if (character_x1 <= shot_x2 && shot_x1 <= character_x2 && character_y1 <= shot_y2 && shot_y1 <= character_y2) {
                if (shot.power > 0) {
                    if (shot.effect > 0) {
                        Game_Effect* effect = new Game_Effect();
                        effect->position_x = (character.position_x + shot.position_x) / 2 + GetRand(5) - 2;
                        effect->position_y = (character.position_y + shot.position_y) / 2 + GetRand(5) - 2;
                        effect->effect_number = shot.effect;
                        effect->animation_number = 0;
                        effect->animation_time = 0;
                        effect->disappearance = 0;
                        game_effects.push_back(*effect);
                        delete effect;
                    }
                    damage = shot.power - character.defense;
                    if (damage > 0) {
                        Character_Damage(stage, character, damage);
                    }
                }
                if (shot.penetrate_characters == 0 && character.block == 0) {
                    shot.disappearance = 1;
                }
                else if (shot.penetrate_block_characters == 0 && character.block == 1) {
                    shot.disappearance = 1;
                }
                PlaySoundMem(damage_sound_effect, DX_PLAYTYPE_BACK);
            }
        }
    }
}

void Game_Player_Sword_Collision_Detection(Game_Character* game_player, std::vector<Sword>& game_swords, Stage* stage) {
    double game_player_horizontal_half_width = game_player->gigantic * stage->collision_detection_main_character_vs_shot_horizontal_width / 2;
    double game_player_vertical_half_width = game_player->gigantic * stage->collision_detection_main_character_vs_shot_vertical_width / 2;
    double sword_position_x;
    double sword_position_y;
    double sword_horizontal_half_width;
    double sword_vertical_half_width;
    int damage;

    if (game_player->death == 1) return;
    if (game_player->continuous_damage_invalidation_time > 0) return;
    for (Sword& sword: game_swords) {
        if (game_player->faction == sword.faction) continue;
        sword_position_x = sword.position_x + sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_x;
        sword_position_y = sword.position_y + sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_y;
        sword_horizontal_half_width = sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width / 2;
        sword_vertical_half_width = sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].vertical_width / 2;
        if (abs(game_player->position_x - sword_position_x) <= game_player_horizontal_half_width + sword_horizontal_half_width
            && abs(game_player->position_y - sword_position_y) <= game_player_vertical_half_width + sword_vertical_half_width) {
            if (sword.effect > 0) {
                Game_Effect* effect = new Game_Effect();
                effect->position_x = (game_player->position_x + sword_position_x) / 2 + GetRand(5) - 2;
                effect->position_y = (game_player->position_y + sword_position_y) / 2 + GetRand(5) - 2;
                effect->effect_number = sword.effect;
                effect->animation_number = 0;
                effect->animation_time = 0;
                effect->disappearance = 0;
                game_effects.push_back(*effect);
                delete effect;
            }
            damage = sword.power - game_player->defense;
            if (damage > 0) {
                Player_Damage(stage, damage);
            }
            PlaySoundMem(damage_sound_effect, DX_PLAYTYPE_BACK);
        }
    }
}

void Character_Sword_Collision_Detection(std::vector<Game_Character>& game_characters, std::vector<Sword>& game_swords, Stage* stage) {
    double character_horizontal_half_width;
    double character_vertical_half_width;
    double sword_position_x;
    double sword_position_y;
    double sword_horizontal_half_width;
    double sword_vertical_half_width;
    int damage;

    for (Game_Character& character : game_characters) {
        if (character.death == 1) continue;
        if (character.continuous_damage_invalidation_time > 0) continue;
        character_horizontal_half_width = character.gigantic * stage->collision_detection_enemy_vs_shot_horizontal_width / 2;
        character_vertical_half_width = character.gigantic * stage->collision_detection_enemy_vs_shot_vertical_width / 2;
        for (Sword& sword : game_swords) {
            if (character.faction == sword.faction) continue;
            sword_position_x = sword.position_x + sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_x;
            sword_position_y = sword.position_y + sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_y;
            sword_horizontal_half_width = sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width / 2;
            sword_vertical_half_width = sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].vertical_width / 2;
            if (abs(character.position_x - sword_position_x) <= character_horizontal_half_width + sword_horizontal_half_width
                && abs(character.position_y - sword_position_y) <= character_vertical_half_width + sword_vertical_half_width) {
                if (sword.effect > 0) {
                    Game_Effect* effect = new Game_Effect();
                    effect->position_x = (character.position_x + sword_position_x) / 2 + GetRand(5) - 2;
                    effect->position_y = (character.position_y + sword_position_y) / 2 + GetRand(5) - 2;
                    effect->effect_number = sword.effect;
                    effect->animation_number = 0;
                    effect->animation_time = 0;
                    effect->disappearance = 0;
                    game_effects.push_back(*effect);
                    delete effect;
                }
                damage = sword.power - character.defense;
                if (damage > 0) {
                    Character_Damage(stage, character, damage);
                }
                PlaySoundMem(damage_sound_effect, DX_PLAYTYPE_BACK);
            }
        }
    }
}

void Shot_Shot_Collision_Detection(std::vector<Shot>& game_shots, Stage* stage) {
    Shot* shot1;
    Shot* shot2;

    int shot1_horizontal_half_width, shot1_vertical_half_width;
    double shot1_x1, shot1_x2, shot1_y1, shot1_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively
    int shot2_horizontal_half_width, shot2_vertical_half_width;
    double shot2_x1, shot2_x2, shot2_y1, shot2_y2;//left edge, right edge, top edge, bottom edge of collision detection respectively

    int number_of_shots = game_shots.size();
    for (int i = 0; i < number_of_shots; ++i) {
        shot1 = &game_shots[i];
        if (shot1->user == game_player) {
            shot1_vertical_half_width = shot1->gigantic * stage->collision_detection_main_character_shots_vs_shot_vertical_width / 2;
            shot1_horizontal_half_width = shot1->gigantic * stage->collision_detection_main_character_shots_vs_shot_horizontal_width / 2;
        }
        else {
            shot1_vertical_half_width = shot1->gigantic * stage->collision_detection_enemy_shots_vs_shot_vertical_width / 2;
            shot1_horizontal_half_width = shot1->gigantic * stage->collision_detection_enemy_shots_vs_shot_horizontal_width / 2;
        }

        shot1_x1 = shot1->position_x - shot1_horizontal_half_width;
        shot1_x2 = shot1->position_x + shot1_horizontal_half_width;
        shot1_y1 = shot1->position_y - shot1_vertical_half_width;
        shot1_y2 = shot1->position_y + shot1_vertical_half_width;
        for (int j = i + 1; j < number_of_shots; ++j) {
            shot2 = &game_shots[j];
            if (shot1->faction == shot2->faction) continue;
            if (shot1->disappear_on_hitting_shot == 0 && shot2->disappear_on_hitting_shot == 0) continue;
            if (shot2->user == game_player) {
                shot2_vertical_half_width = shot2->gigantic * stage->collision_detection_main_character_shots_vs_shot_vertical_width / 2;
                shot2_horizontal_half_width = shot2->gigantic * stage->collision_detection_main_character_shots_vs_shot_horizontal_width / 2;
            }
            else {
                 shot2_vertical_half_width = shot2->gigantic * stage->collision_detection_enemy_shots_vs_shot_vertical_width / 2;
                shot2_horizontal_half_width = shot2->gigantic * stage->collision_detection_enemy_shots_vs_shot_horizontal_width / 2;
            }

            shot2_x1 = shot2->position_x - shot2_horizontal_half_width;
            shot2_x2 = shot2->position_x + shot2_horizontal_half_width;
            shot2_y1 = shot2->position_y - shot2_vertical_half_width;
            shot2_y2 = shot2->position_y + shot2_vertical_half_width;

            if (shot1_x1 <= shot2_x2 && shot2_x1 <= shot1_x2 && shot1_y1 <= shot2_y2 && shot2_y1 <= shot1_y2) {
                if (shot1->value_for_disappearing_on_hitting_shot <= shot2->value_for_disappearing_on_hitting_shot) {
                    if (shot1->disappear_on_hitting_shot == 1) {
                        shot1->disappearance = 1;
                    }
                }
                if (shot1->value_for_disappearing_on_hitting_shot >= shot2->value_for_disappearing_on_hitting_shot) {
                    if (shot2->disappear_on_hitting_shot == 1) {
                        shot2->disappearance = 1;
                    }
                }
            }
        }
    }
}

void Shot_Sword_Collision_Detection(std::vector<Shot>& game_shots, std::vector<Sword>& game_swords, Stage* stage) {
    double shot_horizontal_half_width;
    double shot_vertical_half_width;
    double sword_position_x;
    double sword_position_y;
    double sword_horizontal_half_width;
    double sword_vertical_half_width;

    for (Shot& shot : game_shots) {
        if (shot.disappear_on_hitting_shot == 0) continue;
        if (shot.user == game_player) {
            shot_horizontal_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_shot_horizontal_width / 2;
            shot_vertical_half_width = shot.gigantic * stage->collision_detection_main_character_shots_vs_shot_vertical_width / 2;
        }
        else {
            shot_horizontal_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_shot_horizontal_width / 2;
            shot_vertical_half_width = shot.gigantic * stage->collision_detection_enemy_shots_vs_shot_vertical_width / 2;
        }
        for (Sword& sword : game_swords) {
            if (shot.faction == sword.faction) continue;
            sword_position_x = sword.position_x + sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_x;
            sword_position_y = sword.position_y + sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_y;
            sword_horizontal_half_width = sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width / 2;
            sword_vertical_half_width = sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].vertical_width / 2;
            if (abs(shot.position_x - sword_position_x) <= shot_horizontal_half_width + sword_horizontal_half_width
                && abs(shot.position_y - sword_position_y) <= shot_vertical_half_width + sword_vertical_half_width) {
                shot.disappearance = 1;
            }
        }
    }
}

bool Judge_Item_Disappearance(Game_Item& item) {
    return item.disappearance == 1;
}

void Disappear_Items(std::vector<Game_Item>& game_items) {
    std::_Erase_remove_if(game_items, Judge_Item_Disappearance);
}

bool Judge_Item_Acquisition_Display_Disappearance(struct Item_Acquisition_Display& display) {
    return display.existence_time > 30;
}

void Update_Item_Acquisition_Display(std::vector<struct Item_Acquisition_Display>& item_acquisition_display) {
    for (struct Item_Acquisition_Display& display : item_acquisition_display) {
        display.position_y -= 0.2;
        ++display.existence_time;
    }
    std::_Erase_remove_if(item_acquisition_display, Judge_Item_Acquisition_Display_Disappearance);
}

bool Judge_Effect_Disappearance(Game_Effect& effect) {
    return effect.disappearance == 1;
}

void Update_Effects(std::vector<Game_Effect>& game_effects) {
    for (Game_Effect& effect : game_effects) {
        ++effect.animation_time;
        if (effect.animation_time >= 6 * effect_data->records[effect.effect_number].effect_animations[effect.animation_number].display_time) {
            ++effect.animation_number;
            effect.animation_time = 0;
            if (effect.animation_number >= effect_data->records[effect.effect_number].effect_animations.size()) {
                effect.disappearance = 1;
            }
        }
    }
    std::_Erase_remove_if(game_effects, Judge_Effect_Disappearance);
}

void Draw_Effects(std::vector<Game_Effect>& game_effects) {
    for (Game_Effect& effect : game_effects) {
         DrawRotaGraph((int)effect.position_x - game_system.horizontal_scroll_amount, (int)effect.position_y - game_system.vertical_scroll_amount, 1, 0, effect_image[effect.effect_number][effect_data->records[effect.effect_number].effect_animations[effect.animation_number].frame], TRUE);
    }
}

void Set_Stage(Stage* stage_data) {
    game_blocks = new Block[stage_data->horizontal_width * stage_data->vertical_width]();
    for (Stage_Block data : stage_data->block_data) {
        int x = data.position % stage_data->vertical_movement_change_amount;
        int y = data.position / stage_data->vertical_movement_change_amount;
        game_blocks[y * stage_data->horizontal_width + x] = data.block;
    }

    delete game_player;
    game_player = new Game_Character();
    game_characters.clear();
    for (Stage_Character& data : stage_data->character_data) {
        Game_Character* temp_character = new Game_Character();
        Convert_Character_Editor_to_Game(&data.character, temp_character);
        if (temp_character->operation == 0) {
            *game_player = *temp_character;
        }
        else {
            game_characters.push_back(*temp_character);
        }
        delete temp_character;
    }

    game_player->target[0] = game_player;
    for (Game_Character& character : game_characters) {
        character.target[0] = game_player;
    }

    game_items.clear();
    for (Stage_Item& data : stage_data->item_data) {
        Game_Item* temp_item = new Game_Item();
        Convert_Item_Editor_to_Game(&data.item, temp_item);
        game_items.push_back(*temp_item);
    }

    game_shots.clear();
    game_swords.clear();
    item_acquisition_display.clear();
    game_effects.clear();

    game_system.remaining_time = stage_data->time_limit;
    game_system.remaining_time_control_count = 0;
    game_system.horizontal_auto_scroll_enabled = stage_data->horizontal_auto_scroll_enabled;
    game_system.vertical_auto_scroll_enabled = stage_data->vertical_auto_scroll_enabled;
    game_system.horizontal_scroll_speed = stage_data->horizontal_auto_scroll_speed;
    game_system.vertical_scroll_speed = stage_data->vertical_auto_scroll_speed;
    game_system.horizontal_scroll_amount = game_player->position_x - 320;
    if (stage_data->horizontal_scroll_minimum_value_enabled == 1) {
        game_system.horizontal_scroll_minimum_value = stage_data->horizontal_scroll_minimum_value * 32;
    }
    else {
        game_system.horizontal_scroll_minimum_value = 0;
    }
    if (stage_data->horizontal_scroll_maximum_value_enabled == 1) {
        game_system.horizontal_scroll_maximum_value = stage_data->horizontal_scroll_maximum_value * 32 + 32;
    }
    else {
        game_system.horizontal_scroll_maximum_value = stage_data->x_coordinate_upper_limit;
    }
    if (game_system.horizontal_scroll_amount + 640 > game_system.horizontal_scroll_maximum_value) {
        game_system.horizontal_scroll_amount = game_system.horizontal_scroll_maximum_value - 640;
    }
    if (game_system.horizontal_scroll_amount < game_system.horizontal_scroll_minimum_value) {
        game_system.horizontal_scroll_amount = game_system.horizontal_scroll_minimum_value;
    }
    game_system.vertical_scroll_amount = game_player->position_y - 240;
    if (stage_data->vertical_scroll_minimum_value_enabled == 1) {
        game_system.vertical_scroll_minimum_value = stage_data->vertical_scroll_minimum_value * 32;
    }
    else {
        game_system.vertical_scroll_minimum_value = 0;
    }
    if (stage_data->vertical_scroll_maximum_value_enabled == 1) {
        game_system.vertical_scroll_maximum_value = stage_data->vertical_scroll_maximum_value * 32 + 32;
    }
    else {
        game_system.vertical_scroll_maximum_value = stage_data->y_coordinate_upper_limit;
    }
    if (game_system.vertical_scroll_amount + 480 > game_system.vertical_scroll_maximum_value) {
        game_system.vertical_scroll_amount = game_system.vertical_scroll_maximum_value - 480;
    }
    if (game_system.vertical_scroll_amount < game_system.vertical_scroll_minimum_value) {
        game_system.vertical_scroll_amount = game_system.vertical_scroll_minimum_value;
    }

    game_system.score = 0;
    game_system.world_score = 0;

    game_system.number_of_backgrounds = 0;
    for (System_Background_Management& background_management : game_system.background_management) {
        DeleteGraph(background_management.image_handle);
    }
    game_system.background_management.clear();
    for (Background& background : stage_data->background_data) {
        System_Background_Management* management = new System_Background_Management();
        management->display_flag = background.display_from_start;
        if (background.specified_by_color == 1) {
            management->color_code = Get_Color_Code_From_Palette_Image(background.color_number);
            management->image_handle = -1;
        }
        else {
            management->color_code = 0;
            management->image_handle = Load_Transparent_Bmp_Image(background.image_path.c_str());
        }
        management->image_offset_x = 0;
        management->image_offset_y = 0;
        game_system.background_management.push_back(*management);
        game_system.number_of_backgrounds++;
    }
}

void Read_And_Set_Stage(Stage* stage_data, const char *file_name) {
    FILE* fp = fopen(file_name, "rb");
    if (fp != NULL) {
        Read_Stage(stage_data, fp);
        fclose(fp);

        Set_Stage(stage_data);

        game_system.state = 0;
        game_system.state_control_count = 0;
    }
}

void Update_Game_System(Stage* stage_data) {
    switch (game_system.state) {
    case 0:
        if (stage_data->time_limit_enabled == 1) {
            if (game_system.remaining_time > 0) {
                ++game_system.remaining_time_control_count;
                if (game_system.remaining_time_control_count >= 60) {
                    --game_system.remaining_time;
                    game_system.remaining_time_control_count = 0;
                }
            }
            if (game_system.remaining_time <= 0) {
                Player_Death();
            }
        }
        break;
    case 1:
        if (game_system.state_control_count < 30) {
            ++game_system.state_control_count;
        }
        if (game_system.state_control_count == 30 && key_input.z == 1) {
            game_system.state = 2;
            game_system.state_control_count = 0;
        }
        break;
    case 2:
         if (game_system.state_control_count < 10) {
            ++game_system.state_control_count;
        }
        if (game_system.state_control_count == 10) {
            //Set_Stage(stage_data);
            //game_system.state = 0;
            //game_system.state_control_count = 0;
            system_mode = system_mode_title;
        }
        break;
    case game_system_state_player_death:
        ++game_system.state_control_count;
        if (game_system.state_control_count >= game_system.wait_time) {
            Set_Stage(stage_data);
            game_system.state = 0;
            game_system.state_control_count = 0;
        }
        break;
    }
}

void Draw_Background(Stage* stage_data, int display_in_front_of_character) {
    int image_offset_x, image_offset_y;
    int number_of_backgrounds = stage_data->background_data.size();
    for (int i = 0; i < number_of_backgrounds; ++i) {
        if (game_system.background_management[i].display_flag == 1 && stage_data->background_data[i].display_in_front_of_character == display_in_front_of_character) {
            if (stage_data->background_data[i].specified_by_color == 1) {
                DrawBox(0, 0, 640, 480, game_system.background_management[i].color_code, TRUE);
            }
            image_offset_x = fmod(-stage_data->background_data[i].horizontal_scroll_speed * game_system.horizontal_scroll_amount, 640);
            image_offset_x += game_system.background_management[i].image_offset_x;
            if (image_offset_x < 0) image_offset_x += 640;

            image_offset_y = fmod(-stage_data->background_data[i].vertical_scroll_speed * game_system.vertical_scroll_amount, 480);
            image_offset_y += game_system.background_management[i].image_offset_y;
            if (image_offset_y < 0) image_offset_y += 480;

            DrawGraph(image_offset_x - 640, image_offset_y - 480, game_system.background_management[i].image_handle, TRUE);
            DrawGraph(image_offset_x, image_offset_y - 480, game_system.background_management[i].image_handle, TRUE);
            DrawGraph(image_offset_x - 640, image_offset_y, game_system.background_management[i].image_handle, TRUE);
            DrawGraph(image_offset_x, image_offset_y, game_system.background_management[i].image_handle, TRUE);
        }
    }
}

//x,y specify the center of the image
void Draw_Game_Object(double x, double y, double size, int image_type, int image_number, int offset, int facing_right){
    switch (image_type) {
    case 0://block
        DrawRotaGraph((int)x, (int)y,size, 0, block_image[image_number],TRUE, facing_right);
        break;
    case 1://character
        DrawRotaGraph((int)x, (int)y, size, 0, character_image[image_number][0], TRUE, facing_right);
        break;
    case 2://item
        DrawRotaGraph((int)x, (int)y, size, 0, item_image[image_number * 2 + offset], TRUE, facing_right);
        break;
    case 3://shot
        DrawRotaGraph((int)x, (int)y, size, 0, shot_image[image_number * 2 + offset], TRUE, facing_right);
        break;
    case 4://exclusive bmp
        if (character_exclusive_bmp_data->records[image_number].is_gigantic_character) {
            DrawRotaGraph((int)x, (int)y, size / (double)character_exclusive_bmp_data->records[image_number].size, 0, character_exclusive_image[image_number][0], TRUE, facing_right);
        }
        else {
            DrawRotaGraph((int)x, (int)y, size, 0, character_exclusive_image[image_number][0], TRUE, facing_right);
        }
        break;
    }
}

void Draw_Characters(Game_Character& character) {
    if (character.transparency == 1) return;

    switch(character_effect_data->records[character.executing_character_effect].effect) {
    case 0:
        Draw_Game_Object(character.position_x - game_system.horizontal_scroll_amount, character.position_y - game_system.vertical_scroll_amount, character.gigantic, character.image_type, character.image_number, 0, character.facing_right);
        if (character.mark_display == 1) {
            DrawRotaGraph((int)character.position_x - game_system.horizontal_scroll_amount, (int)character.position_y - game_system.vertical_scroll_amount, character.gigantic, 0.0, mark_image[character.mark_number], TRUE);
        }
        break;
    case 6:
        int blink_interval = character_effect_data->records[character.executing_character_effect].parameter1;
        if (character.executing_character_effect_execution_time % (blink_interval * 2) < blink_interval) {
            Draw_Game_Object(character.position_x - game_system.horizontal_scroll_amount, character.position_y - game_system.vertical_scroll_amount, character.gigantic, character.image_type, character.image_number, 0, character.facing_right);
            if (character.mark_display == 1) {
                DrawRotaGraph((int)character.position_x - game_system.horizontal_scroll_amount, (int)character.position_y - game_system.vertical_scroll_amount, character.gigantic, 0.0, mark_image[character.mark_number], TRUE);
            }
        }
        break;
    }
}

void Draw_Swords() {
    double position_offset_x, position_offset_y;
    int image_handle;
    for (Sword& sword : game_swords) {
        if (sword.transparency == 1) continue;
        position_offset_x = sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_x;
        if (sword.facing_right == 1 && sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_x_flip_if_facing_right == 1) {
            position_offset_x *= -1.0;
        }
        position_offset_y = sword.gigantic * sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_y;
        if (sword.facing_right == 1 && sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].position_offset_y_flip_if_facing_right == 1) {
            position_offset_y *= -1.0;
        }

        if (sword.facing_right == 0) {
            image_handle = sword_image[sword.sword_type][0];
        }
        else {
            image_handle = sword_image[sword.sword_type][1];
        }

        DrawRectRotaGraph(sword.position_x + position_offset_x - game_system.horizontal_scroll_amount, sword.position_y + position_offset_y - game_system.vertical_scroll_amount,
            sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].display_source_coordinate_x,
            sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].display_source_coordinate_y,
            sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].horizontal_width,
            sword_type_data->records[sword.sword_type].sword_positions[sword.sword_position_number].vertical_width,
            sword.gigantic,
            0.0, image_handle, TRUE
        );
    }
}

void Draw_HP_And_SP_Bars() {
    if (game_player->death == 0) {
        if (game_player->hp_bar_display_time > 0) {
            DrawGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 4 - game_system.vertical_scroll_amount, accessory_image_mini_hp_bar_empty, TRUE);
            if (game_player->hp_bar_current >= game_player->hp_bar_past) {
                DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, game_player->hp_bar_current / 2, 2, accessory_image_mini_hp_bar_increase, TRUE);
                if (game_player->hp <= game_player->max_hp * 33 / 100) {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, game_player->hp_bar_past / 2, 2, accessory_image_mini_hp_bar_low, TRUE);
                }
                else {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, game_player->hp_bar_past / 2, 2, accessory_image_mini_hp_bar, TRUE);
                }
            }
            else {
                DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, game_player->hp_bar_past / 2, 2, accessory_image_mini_hp_bar_decrease, TRUE);
                if (game_player->hp <= game_player->max_hp * 33 / 100) {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, game_player->hp_bar_current / 2, 2, accessory_image_mini_hp_bar_low, TRUE);
                }
                else {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, game_player->hp_bar_current / 2, 2, accessory_image_mini_hp_bar, TRUE);
                }
            }
        }

        if (game_player->max_sp > 0 && game_player->sp_bar_display_time > 0) {
            DrawGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 8 - game_system.vertical_scroll_amount, accessory_image_mini_hp_bar_empty, TRUE);
            if (game_player->sp_bar_current >= game_player->sp_bar_past) {
                DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, game_player->sp_bar_current / 2, 2, accessory_image_mini_sp_bar_increase, TRUE);
                if (game_player->sp <= game_player->max_sp * 33 / 100) {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, game_player->sp_bar_past / 2, 2, accessory_image_mini_sp_bar_low, TRUE);
                }
                else {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, game_player->sp_bar_past / 2, 2, accessory_image_mini_sp_bar, TRUE);
                }
            }
            else {
                DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, game_player->sp_bar_past / 2, 2, accessory_image_mini_sp_bar_decrease, TRUE);
                if (game_player->sp <= game_player->max_sp * 33 / 100) {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, game_player->sp_bar_current / 2, 2, accessory_image_mini_sp_bar_low, TRUE);
                }
                else {
                    DrawRectGraph(game_player->position_x - 25 - game_system.horizontal_scroll_amount, game_player->position_y - 16 * game_player->gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, game_player->sp_bar_current / 2, 2, accessory_image_mini_sp_bar, TRUE);
                }
            }
        }
    }

    for (Game_Character& character : game_characters) {
        if (character.death == 0) {
            if (character.hp_bar_display_time > 0) {
                DrawGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 4 - game_system.vertical_scroll_amount, accessory_image_mini_hp_bar_empty, TRUE);
                if (character.hp_bar_current >= character.hp_bar_past) {
                    DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, character.hp_bar_current / 2, 2, accessory_image_mini_hp_bar_increase, TRUE);
                    if (character.hp <= character.max_hp * 33 / 100) {
                        DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, character.hp_bar_past / 2, 2, accessory_image_mini_hp_bar_low, TRUE);
                    }
                    else {
                        DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, character.hp_bar_past / 2, 2, accessory_image_mini_hp_bar, TRUE);
                    }
                }
                else {
                    DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, character.hp_bar_past / 2, 2, accessory_image_mini_hp_bar_decrease, TRUE);
                    if (character.hp <= character.max_hp * 33 / 100) {
                        DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, character.hp_bar_current / 2, 2, accessory_image_mini_hp_bar_low, TRUE);
                    }
                    else {
                        DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 4 - game_system.vertical_scroll_amount, 0, 0, character.hp_bar_current / 2, 2, accessory_image_mini_hp_bar, TRUE);
                    }
                }
            }
            if (character.max_sp > 0 && character.sp_bar_display_time > 0) {
                DrawGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 8 - game_system.vertical_scroll_amount, accessory_image_mini_hp_bar_empty, TRUE);
                if (character.sp_bar_current >= character.sp_bar_past) {
                    DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, character.sp_bar_current / 2, 2, accessory_image_mini_sp_bar_increase, TRUE);
                    if (character.sp <= character.max_sp * 33 / 100) {
                        DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, character.sp_bar_past / 2, 2, accessory_image_mini_sp_bar_low, TRUE);
                    }
                    else {
                        DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, character.sp_bar_past / 2, 2, accessory_image_mini_sp_bar, TRUE);
                    }
                }
                else {
                     DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, character.sp_bar_past / 2, 2, accessory_image_mini_sp_bar_decrease, TRUE);
                    if (character.sp <= character.max_sp * 33 / 100) {
                        DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, character.sp_bar_current / 2, 2, accessory_image_mini_sp_bar_low, TRUE);
                    }
                    else {
                         DrawRectGraph(character.position_x - 25 - game_system.horizontal_scroll_amount, character.position_y - 16 * character.gigantic - 8 - game_system.vertical_scroll_amount, 0, 0, character.sp_bar_current / 2, 2, accessory_image_mini_sp_bar, TRUE);
                    }
                }
            }
        }
    }
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    ChangeWindowMode(TRUE);//window mode
    if (DxLib_Init() == -1 || SetDrawScreen(DX_SCREEN_BACK) != 0) return -1;//initialization and back buffer

    int program_end = 0;

    ChangeFont("ＭＳ Ｐゴシック");
    SetFontSize(16);
    SetFontThickness(1);

    font_data[0] = CreateFontToHandle("ＭＳ Ｐゴシック", 16, 1);
    font_data[1] = CreateFontToHandle("ＭＳ Ｐゴシック", 8, 1);

    title_image = LoadGraph("bmp/Title.bmp");

    character_exclusive_bmp_data = new Character_Exclusive_Bmp_Database();
    Read_Character_Exclusive_Bmp_Database(character_exclusive_bmp_data);
    sword_type_data = new Sword_Type_Database();
    Read_Sword_Type_Database(sword_type_data);
    effect_data = new Effect_Database();
    Read_Effect_Database(effect_data);
    character_effect_data = new Character_Effect_Database();
    Read_Character_Effect_Database(character_effect_data);
    sound_effect_data = new Sound_Effect_Database();
    Read_Sound_Effect_Database(sound_effect_data);

    common_palette = new struct Common_Palette();
    {
        FILE* common_palette_file = fopen("data/CommonPalette.cplt4", "rb");
        if (common_palette_file != NULL) {
            Read_Common_Palette(common_palette, common_palette_file);
            fclose(common_palette_file);
        }
    }

    Load_World_Chip_Images();
    Load_World_Event_Images();
    window_image = LoadGraph("bmp/Window.bmp");
    status_window_image = LoadGraph("bmp/StatusWindow.bmp");
    window_frame_color_code = Get_Color_Code_From_Palette_Image(240);
    text_color_code = Get_Color_Code_From_Palette_Image(241);
    Load_Game_Mode_Images();
    Load_Block_Images();
    Load_Character_Images();
    Load_Item_Images();
    Load_Mini_Item_Images();
    Load_Shot_Images();
    Load_Sword_Images();
    Load_Character_Exclusive_Images();
    Load_Mark_Images();
    Load_Effect_Images();
    Load_Accessory_Images();
    Load_Word_Images();

    Load_Sound_Effects();

    Read_Key_Config(&key_config);
    Adjust_Key_Config_For_Dx_Library(&key_config);

    system_mode = system_mode_title;

    {
        FILE* world_map_file = fopen("data/WorldMap.dat", "rb");
        Read_World_Map(&world_map_data, world_map_file);

        world_map_control.background_color_code = Get_Color_Code_From_Palette_Image(world_map_data.background_color);
        world_map_control.window_message = "";
        world_map_event_page_pointers.resize(world_map_data.vertical_width * world_map_data.horizontal_width);
    }

    struct Stage* stage_data = new Stage();

    while (ProcessMessage() == 0 && ClearDrawScreen() == 0 && GetHitKeyStateAll_2(Key) == 0 && Key[KEY_INPUT_ESCAPE] == 0 && program_end == 0) {
        Update_Key_Input(&key_config);

        switch (system_mode) {
        case system_mode_title:
            switch (title_state) {
            case 0:
                PlayMusic("bgm/Menu_A.mid", DX_PLAYTYPE_LOOP);
                title_state = 1;
                break;
            case 1:
                if (key_input.down == 1) {
                    ++title_selection;
                    if (title_selection > 6) {
                        title_selection = 0;
                    }
                }
                if (key_input.up == 1) {
                    --title_selection;
                    if (title_selection < 0) {
                        title_selection = 6;
                    }
                }
                if (key_input.z == 1) {
                    switch (title_selection) {
                    case 0:
                        title_state = 2;
                        break;
                    case 6:
                        program_end = 1;
                        break;
                    }
                }
                break;
            case 2:
                StopMusic();

                world_map_control.player_position_x = world_map_data.initial_position_x;
                world_map_control.player_position_y = world_map_data.initial_position_y;
                world_map_control.player_direction = 0;
                world_map_control.player_blink = 0;
                world_map_control.blink_timer = 0;

                title_state = 0;
                system_mode = system_mode_world_map;
                world_map_control.state = 0;

                Update_World_Map_Event_Pages();
                break;
            }
            DrawGraph(0, 0, title_image, FALSE);
            for (int i = 0; i < 7; ++i) {
                DrawRotaGraph(320, 240 + 32 * i, 1, 0, game_mode_image[i], TRUE);
            }
            DrawRotaGraph(224, 240 + 32 * title_selection, 1, 0, accessory_image_cursor[0], TRUE);
            break;
        case system_mode_world_map:
            switch (world_map_control.state) {
            case 0:
                PlayMusic("bgm/Menu_B.mid", DX_PLAYTYPE_LOOP);
                world_map_control.window_message = "";
                world_map_control.state = 1;
                break;
            case 1:
                if (key_input.down == 1 || key_input.down > 30 && key_input.down % 6 == 1) {
                    Move_World_Map(world_map_control.player_position_x, world_map_control.player_position_y + 1);
                    world_map_control.player_direction = 0;
                }
                if (key_input.up == 1 || key_input.up > 30 && key_input.up % 6 == 1) {
                    Move_World_Map(world_map_control.player_position_x, world_map_control.player_position_y - 1);
                    world_map_control.player_direction = 1;
                }
                if (key_input.right == 1 || key_input.right > 30 && key_input.right % 6 == 1) {
                    Move_World_Map(world_map_control.player_position_x + 1, world_map_control.player_position_y);
                    world_map_control.player_direction = 2;
                }
                if (key_input.left == 1 || key_input.left > 30 && key_input.left % 6 == 1) {
                    Move_World_Map(world_map_control.player_position_x - 1, world_map_control.player_position_y);
                    world_map_control.player_direction = 3;
                }
                ++world_map_control.blink_timer;
                if (world_map_control.blink_timer >= 30) {
                    world_map_control.player_blink = (world_map_control.player_blink == 0) ? 1 : 0;
                    world_map_control.blink_timer = 0;
                }
                if (key_input.z == 1) {
                    if (world_map_event_page_pointers[world_map_data.horizontal_width * world_map_control.player_position_y + world_map_control.player_position_x] != nullptr) {
                        if (world_map_event_page_pointers[world_map_data.horizontal_width * world_map_control.player_position_y + world_map_control.player_position_x]->event_type == 0) {
                            if (stage_data != nullptr) {
                                delete stage_data;
                                stage_data = new Stage();
                            }
                            Read_And_Set_Stage(stage_data, world_map_event_page_pointers[world_map_data.horizontal_width * world_map_control.player_position_y + world_map_control.player_position_x]->start_stage.c_str());
                            system_mode = system_mode_game;
                            StopMusic();
                        }
                    }
                }
                break;
            }
            DrawBox(0, 0, 640, 480, world_map_control.background_color_code, TRUE);
            Draw_World_Chips();
            Draw_World_Events();
            DrawRotaGraph(320, 240, 1, 0, accessory_image_world_map_player[world_map_control.player_direction * 2 + world_map_control.player_blink], TRUE);
            Draw_World_Map_Window();

            break;
        case system_mode_game:
            if (game_system.state == 0) {
                Update_Player(stage_data);
                Update_Characters(stage_data);
                Update_Items();
                Update_Item_Acquisition_Display(item_acquisition_display);
                Update_Effects(game_effects);

                Prepare_Flow_Execution(game_player);
                for (Game_Character& character : game_characters) { Prepare_Flow_Execution(&character); }

                Execute_Flow(game_player, stage_data);
                for (Game_Character& character : game_characters) { Execute_Flow(&character, stage_data); }

                Delete_Flow(game_player);
                for (Game_Character& character : game_characters) { Delete_Flow(&character); }
 
                Reset_Game_Player_Block_Collision(game_player);
                Reset_Character_Block_Collision(game_characters);

                Game_Player_Block_Collision_Detection(game_player, game_blocks, stage_data);
                Character_Block_Collision_Detection(game_characters, game_blocks, stage_data);
                Shot_Block_Collision_Detection(game_shots, game_blocks, stage_data);

                Game_Player_Character_Collision_Detection(game_player, game_characters, stage_data);
                Character_Character_Collision_Detection(game_characters, stage_data);

                Update_Scroll(stage_data);
                Background_Scroll(stage_data);
                Prevent_Game_Player_From_Going_Outside_Stage(game_player, stage_data);
                Judge_Character_Falling_Death(game_characters, stage_data);

                Game_Player_Item_Collision_Detection(game_player, game_items, stage_data);

                Update_Shots(stage_data);
                Update_Swords();

                Game_Player_Shot_Collision_Detection(game_player, game_shots, stage_data);
                Game_Player_Sword_Collision_Detection(game_player, game_swords, stage_data);
                Character_Shot_Collision_Detection(game_characters, game_shots, stage_data);
                Character_Sword_Collision_Detection(game_characters, game_swords, stage_data);

                Shot_Shot_Collision_Detection(game_shots, stage_data);
                Shot_Sword_Collision_Detection(game_shots, game_swords, stage_data);

                Disappear_Items(game_items);
            }

            Update_Player_Character_Effect();
            for (Game_Character& character : game_characters) {
                Update_Character_Character_Effects(character);
            }
            Disappear_Characters();

            Update_Game_System(stage_data);

            Draw_Background(stage_data, 0);

            for (int y = game_system.vertical_scroll_amount / 32; y < game_system.vertical_scroll_amount / 32 + 15; ++y) {
                for (int x = game_system.horizontal_scroll_amount / 32; x < game_system.horizontal_scroll_amount / 32 + 20; ++x) {
                    Block* current_block = &game_blocks[y * stage_data->horizontal_width + x];
                    if (current_block->transparency == 1 || current_block->image_number == 0) continue;
                    Draw_Game_Object(x * 32 + 16 - game_system.horizontal_scroll_amount, y * 32 + 16 - game_system.vertical_scroll_amount, 1.0, current_block->image_type, current_block->image_number, 0, 0);
                    if (current_block->mark_display == 1) {
                        DrawRotaGraph(x * 32 + 16 - game_system.horizontal_scroll_amount, y * 32 + 16 - game_system.vertical_scroll_amount, 1.0, 0.0, mark_image[current_block->mark_number], TRUE);
                    }
                }
            }

            Draw_Characters(*game_player);

            for (Game_Character& character : game_characters) {
                if (character.position_x >= game_system.horizontal_scroll_amount && character.position_x < game_system.horizontal_scroll_amount + 640 && character.position_y >= game_system.vertical_scroll_amount && character.position_y < game_system.vertical_scroll_amount + 480) {
                    Draw_Characters(character);
                }
            }

            for (Game_Item& item : game_items) {
                if (item.position_x >= game_system.horizontal_scroll_amount && item.position_x < game_system.horizontal_scroll_amount + 640 && item.position_y >= game_system.vertical_scroll_amount && item.position_y < game_system.vertical_scroll_amount + 480) {
                    if (item.transparency == 1) continue;
                    if (item.image_type == 2 && item.existence_time % 30 < 15) {
                        Draw_Game_Object(item.position_x - game_system.horizontal_scroll_amount, item.position_y - game_system.vertical_scroll_amount, item.gigantic, item.image_type, item.image_number, 0, 0);
                    }
                    else {
                        Draw_Game_Object(item.position_x - game_system.horizontal_scroll_amount, item.position_y - game_system.vertical_scroll_amount, item.gigantic, item.image_type, item.image_number, 1, 0);
                    }
                    if (item.mark_display == 1) {
                        DrawRotaGraph((int)item.position_x - game_system.horizontal_scroll_amount, (int)item.position_y - game_system.vertical_scroll_amount, item.gigantic, 0.0, mark_image[item.mark_number], TRUE);

                    }
                }
            }

            for (Shot& shot : game_shots) {
                if (shot.transparency == 1) continue;
                if (shot.existence_time % 30 < 15) {
                    Draw_Game_Object(shot.position_x - game_system.horizontal_scroll_amount, shot.position_y - game_system.vertical_scroll_amount, shot.gigantic, 3, shot.graphic, 0, shot.facing_right);
                }
                else {
                    Draw_Game_Object(shot.position_x - game_system.horizontal_scroll_amount, shot.position_y - game_system.vertical_scroll_amount, shot.gigantic, 3, shot.graphic, 1, shot.facing_right);
                }
            }

            Draw_Swords();

            for (struct Item_Acquisition_Display& display : item_acquisition_display) {
                if (display.image_type == 2) {
                    DrawRotaGraph((int)display.position_x - game_system.horizontal_scroll_amount, (int)display.position_y - game_system.vertical_scroll_amount, 1, 0, mini_item_image[display.image_number * 2], TRUE);
                }
                else {
                    Draw_Game_Object(display.position_x - game_system.horizontal_scroll_amount, display.position_y - game_system.vertical_scroll_amount, 0.5, display.image_type, display.image_number, 0, 0);
                }
            }

            Draw_Effects(game_effects);

            Draw_Background(stage_data, 1);

            Draw_HP_And_SP_Bars();

            if (stage_data->time_limit_enabled == 1) {
                int remaining_time = game_system.remaining_time;
                int number_of_digits = std::to_string(remaining_time).size();
                for (int i = 0; i < number_of_digits; ++i) {
                    DrawRotaGraph(320 + 16 * (number_of_digits - 1) - 32 * i, 40, 1, 0, word_image_pink_number[remaining_time % 10], TRUE);
                    remaining_time /= 10;
                }
            }

            if (game_system.state == 1) {
                for (int i = 0; i < 8; ++i) {
                    if (i % 2 == 0) {
                        DrawRectRotaGraph(320 - 4 * (30 - game_system.state_control_count), 200 + 4 * i, 0, 4 * i, 128, 4, 1, 0, word_image_clear, TRUE);
                    }
                    else {
                        DrawRectRotaGraph(320 + 4 * (30 - game_system.state_control_count), 200 + 4 * i, 0, 4 * i, 128, 4, 1, 0, word_image_clear, TRUE);
                    }
                }
            }
            if (game_system.state == 2) {
                SetDrawBlendMode(DX_BLENDMODE_ALPHA, 255 * game_system.state_control_count / 10);
                DrawBox(0, 0, 640, 480, 0x000000, TRUE);
                SetDrawBlendMode(DX_BLENDMODE_NOBLEND, 255);
            }
            DrawGraph(0, 0, status_window_image, TRUE);
            DrawGraph(50, 2, accessory_image_world_score, TRUE);
            {
                char text[8];
                sprintf(text, "%d", game_system.world_score);
                DrawString(68, 2, text, text_color_code);
            }
            DrawGraph(185, 2, accessory_image_score, TRUE);
            {
                char text[8];
                sprintf(text, "%d", game_system.score);
                DrawString(203, 2, text, text_color_code);
            }
            DrawGraph(300, 2, accessory_image_hp, TRUE);
            DrawGraph(316, 2, accessory_image_hp_bar_empty, TRUE);
            if (game_player->hp <= game_player->max_hp * 33 / 100) {
                DrawRectGraph(316, 2, 0, 0, 50 * game_player->hp / game_player->max_hp, 16, accessory_image_hp_bar_low, TRUE);
            }
            else {
                DrawRectGraph(316, 2, 0, 0, 50 * game_player->hp / game_player->max_hp, 16, accessory_image_hp_bar, TRUE);
            }
            {
                char text[8];
                sprintf(text, "%d", game_player->hp);
                DrawStringToHandle(318, 6, text, text_color_code, font_data[1]);
            }
            DrawGraph(420, 2, accessory_image_sp, TRUE);
            DrawGraph(436, 2, accessory_image_sp_bar_empty, TRUE);
            if (game_player->max_sp > 0) {
                if (game_player->sp <= game_player->max_sp * 33 / 100) {
                    DrawRectGraph(436, 2, 0, 0, 50 * game_player->sp / game_player->max_sp, 16, accessory_image_sp_bar_low, TRUE);
                }
                else {
                    DrawRectGraph(436, 2, 0, 0, 50 * game_player->sp / game_player->max_sp, 16, accessory_image_sp_bar, TRUE);
                }
            }
            {
                char text[8];
                sprintf(text, "%d", game_player->sp);
                DrawStringToHandle(438, 6, text, text_color_code, font_data[1]);
            }
            DrawGraph(540, 2, accessory_image_remaining_lives, TRUE);
            DrawString(558, 2, "-", text_color_code);
            break;
        }

        ScreenFlip();
    }

    DxLib_End();
    delete[] game_blocks;
    delete game_player;

    return 0;
}



```


```cpp
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
```

```cpp
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

```

```cpp
#include <stdio.h>
#include "Item_Acquisition_Details.h"

void Read_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->palette_type, sizeof(int), 1, read_file);
	fread(&details->palette_data_number, sizeof(int), 1, read_file);
}

void Write_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->palette_type, sizeof(int), 1, write_file);
	fwrite(&details->palette_data_number, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Item_Acquisition_Details {
	char bytes1_38[38];
	int palette_type;
	int palette_data_number;
};

void Read_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* read_file);
void Write_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>

#include "Flow_Change_Details.h"
#include "Stage_Clear_Details.h"
#include "Game_Wait_Details.h"
#include "Message_Details.h"
#include "Warp_Details.h"
#include "Target_Setting_Details.h"
#include "Status_Operation_Details.h"
#include "Status_Operation_2_Details.h"
#include "Disappearance_Details.h"
#include "Item_Acquisition_Details.h"
#include "Graphic_Change_Details.h"
#include "Basic_Animation_Set_Change_Details.h"
#include "Animation_Execution_Details.h"
#include "Effect_Execution_Details.h"
#include "Character_Effect_Execution_Details.h"
#include "Screen_Effect_Execution_Details.h"
#include "Picture_Display_Details.h"
#include "Screen_Color_Change_Details.h"
#include "Background_Change_Details.h"
#include "Sound_Effect_Playback_Details.h"
#include "BGM_Playback_Details.h"
#include "Code_Execution_Details.h"
#include "Arrangement_Details.h"
#include "Loop_Details.h"
#include "Item_Effect.h"

Item_Effect::Item_Effect() {
	details = nullptr;
}

Item_Effect::~Item_Effect(){
	if (details != nullptr) {
		switch (type) {
		case 1:
			delete (Flow_Change_Details*)details;
			break;
		case 2:
			delete (Stage_Clear_Details*)details;
			break;
		case 3:
			delete (Game_Wait_Details*)details;
			break;
		case 4:
			delete (Message_Details*)details;
			break;
		case 5:
			delete (Warp_Details*)details;
			break;
		case 6:
			delete (Target_Setting_Details*)details;
			break;
		case 7:
			delete (Status_Operation_Details*)details;
			break;
		case 8:
			delete (Status_Operation_2_Details*)details;
			break;
		case 9:
			delete (Disappearance_Details*)details;
			break;
		case 10:
			delete (Item_Acquisition_Details*)details;
			break;
		case 11:
			delete (Graphic_Change_Details*)details;
			break;
		case 12:
			delete (Basic_Animation_Set_Change_Details*)details;
			break;
		case 13:
			delete (Animation_Execution_Details*)details;
			break;
		case 14:
			delete (Effect_Execution_Details*)details;
			break;
		case 15:
			delete (Character_Effect_Execution_Details*)details;
			break;
		case 16:
			delete (Screen_Effect_Execution_Details*)details;
			break;
		case 17:
			delete (Picture_Display_Details*)details;
			break;
		case 18:
			delete (Screen_Color_Change_Details*)details;
			break;
		case 19:
			delete (Background_Change_Details*)details;
			break;
		case 20:
			delete (Sound_Effect_Playback_Details*)details;
			break;
		case 21:
			delete (BGM_Playback_Details*)details;
			break;
		case 22:
			delete (Code_Execution_Details*)details;
			break;
		case 23:
			delete (Arrangement_Details*)details;
			break;
		case 24:
			delete (Loop_Details*)details;
			break;
		}
	}
}

Item_Effect::Item_Effect(const Item_Effect& r) {
	start = r.start;
	byte5 = r.byte5;
	type = r.type;
	if (r.details != nullptr) {
		switch (type) {
		case 1:
			details = new Flow_Change_Details(*(Flow_Change_Details*)r.details);
			break;
		case 2:
			details = new Stage_Clear_Details(*(Stage_Clear_Details*)r.details);
			break;
		case 3:
			details = new Game_Wait_Details(*(Game_Wait_Details*)r.details);
			break;
		case 4:
			details = new Message_Details(*(Message_Details*)r.details);
			break;
		case 5:
			details = new Warp_Details(*(Warp_Details*)r.details);
			break;
		case 6:
			details = new Target_Setting_Details(*(Target_Setting_Details*)r.details);
			break;
		case 7:
			details = new Status_Operation_Details(*(Status_Operation_Details*)r.details);
			break;
		case 8:
			details = new Status_Operation_2_Details(*(Status_Operation_2_Details*)r.details);
			break;
		case 9:
			details = new Disappearance_Details(*(Disappearance_Details*)r.details);
			break;
		case 10:
			details = new Item_Acquisition_Details(*(Item_Acquisition_Details*)r.details);
			break;
		case 11:
			details = new Graphic_Change_Details(*(Graphic_Change_Details*)r.details);
			break;
		case 12:
			details = new Basic_Animation_Set_Change_Details(*(Basic_Animation_Set_Change_Details*)r.details);
			break;
		case 13:
			details = new Animation_Execution_Details(*(Animation_Execution_Details*)r.details);
			break;
		case 14:
			details = new Effect_Execution_Details(*(Effect_Execution_Details*)r.details);
			break;
		case 15:
			details = new Character_Effect_Execution_Details(*(Character_Effect_Execution_Details*)r.details);
			break;
		case 16:
			details = new Screen_Effect_Execution_Details(*(Screen_Effect_Execution_Details*)r.details);
			break;
		case 17:
			details = new Picture_Display_Details(*(Picture_Display_Details*)r.details);
			break;
		case 18:
			details = new Screen_Color_Change_Details(*(Screen_Color_Change_Details*)r.details);
			break;
		case 19:
			details = new Background_Change_Details(*(Background_Change_Details*)r.details);
			break;
		case 20:
			details = new Sound_Effect_Playback_Details(*(Sound_Effect_Playback_Details*)r.details);
			break;
		case 21:
			details = new BGM_Playback_Details(*(BGM_Playback_Details*)r.details);
			break;
		case 22:
			details = new Code_Execution_Details(*(Code_Execution_Details*)r.details);
			break;
		case 23:
			details = new Arrangement_Details(*(Arrangement_Details*)r.details);
			break;
		case 24:
			details = new Loop_Details(*(Loop_Details*)r.details);
			break;
		}
	}
}

Item_Effect& Item_Effect::operator=(const Item_Effect& r) {
	start = r.start;
	byte5 = r.byte5;
	type = r.type;
	if (r.details != nullptr) {
		switch (type) {
		case 1:
			details = new Flow_Change_Details(*(Flow_Change_Details*)r.details);
			break;
		case 2:
			details = new Stage_Clear_Details(*(Stage_Clear_Details*)r.details);
			break;
		case 3:
			details = new Game_Wait_Details(*(Game_Wait_Details*)r.details);
			break;
		case 4:
			details = new Message_Details(*(Message_Details*)r.details);
			break;
		case 5:
			details = new Warp_Details(*(Warp_Details*)r.details);
			break;
		case 6:
			details = new Target_Setting_Details(*(Target_Setting_Details*)r.details);
			break;
		case 7:
			details = new Status_Operation_Details(*(Status_Operation_Details*)r.details);
			break;
		case 8:
			details = new Status_Operation_2_Details(*(Status_Operation_2_Details*)r.details);
			break;
		case 9:
			details = new Disappearance_Details(*(Disappearance_Details*)r.details);
			break;
		case 10:
			details = new Item_Acquisition_Details(*(Item_Acquisition_Details*)r.details);
			break;
		case 11:
			details = new Graphic_Change_Details(*(Graphic_Change_Details*)r.details);
			break;
		case 12:
			details = new Basic_Animation_Set_Change_Details(*(Basic_Animation_Set_Change_Details*)r.details);
			break;
		case 13:
			details = new Animation_Execution_Details(*(Animation_Execution_Details*)r.details);
			break;
		case 14:
			details = new Effect_Execution_Details(*(Effect_Execution_Details*)r.details);
			break;
		case 15:
			details = new Character_Effect_Execution_Details(*(Character_Effect_Execution_Details*)r.details);
			break;
		case 16:
			details = new Screen_Effect_Execution_Details(*(Screen_Effect_Execution_Details*)r.details);
			break;
		case 17:
			details = new Picture_Display_Details(*(Picture_Display_Details*)r.details);
			break;
		case 18:
			details = new Screen_Color_Change_Details(*(Screen_Color_Change_Details*)r.details);
			break;
		case 19:
			details = new Background_Change_Details(*(Background_Change_Details*)r.details);
			break;
		case 20:
			details = new Sound_Effect_Playback_Details(*(Sound_Effect_Playback_Details*)r.details);
			break;
		case 21:
			details = new BGM_Playback_Details(*(BGM_Playback_Details*)r.details);
			break;
		case 22:
			details = new Code_Execution_Details(*(Code_Execution_Details*)r.details);
			break;
		case 23:
			details = new Arrangement_Details(*(Arrangement_Details*)r.details);
			break;
		case 24:
			details = new Loop_Details(*(Loop_Details*)r.details);
			break;
		}
	}
	return *this;
}

void Read_Item_Effect(struct Item_Effect* effect, FILE* read_file) {
	fread(&effect->start, sizeof(int), 1, read_file);
	fread(&effect->byte5, sizeof(char), 1, read_file);
	fread(&effect->type, sizeof(char), 1, read_file);
	switch(effect->type) {
	case 1:
		effect->details = new Flow_Change_Details;
		Read_Flow_Change_Details((Flow_Change_Details*)effect->details, read_file);
		break;
	case 2:
		effect->details = new Stage_Clear_Details;
		Read_Stage_Clear_Details((Stage_Clear_Details*)effect->details, read_file);
		break;
	case 3:
		effect->details = new Game_Wait_Details;
		Read_Game_Wait_Details((Game_Wait_Details*)effect->details, read_file);
		break;
	case 4:
		effect->details = new Message_Details;
		Read_Message_Details((Message_Details*)effect->details, read_file);
		break;
	case 5:
		effect->details = new Warp_Details;
		Read_Warp_Details((Warp_Details*)effect->details, read_file);
		break;
	case 6:
		effect->details = new Target_Setting_Details;
		Read_Target_Setting_Details((Target_Setting_Details*)effect->details, read_file);
		break;
	case 7:
		effect->details = new Status_Operation_Details;
		Read_Status_Operation_Details((Status_Operation_Details*)effect->details, read_file);
		break;
	case 8:
		effect->details = new Status_Operation_2_Details;
		Read_Status_Operation_2_Details((Status_Operation_2_Details*)effect->details, read_file);
		break;
	case 9:
		effect->details = new Disappearance_Details;
		Read_Disappearance_Details((Disappearance_Details*)effect->details, read_file);
		break;
	case 10:
		effect->details = new Item_Acquisition_Details;
		Read_Item_Acquisition_Details((Item_Acquisition_Details*)effect->details, read_file);
		break;
	case 11:
		effect->details = new Graphic_Change_Details;
		Read_Graphic_Change_Details((Graphic_Change_Details*)effect->details, read_file);
		break;
	case 12:
		effect->details = new Basic_Animation_Set_Change_Details;
		Read_Basic_Animation_Set_Change_Details((Basic_Animation_Set_Change_Details*)effect->details, read_file);
		break;
	case 13:
		effect->details = new Animation_Execution_Details;
		Read_Animation_Execution_Details((Animation_Execution_Details*)effect->details, read_file);
		break;
	case 14:
		effect->details = new Effect_Execution_Details;
		Read_Effect_Execution_Details((Effect_Execution_Details*)effect->details, read_file);
		break;
	case 15:
		effect->details = new Character_Effect_Execution_Details;
		Read_Character_Effect_Execution_Details((Character_Effect_Execution_Details*)effect->details, read_file);
		break;
	case 16:
		effect->details = new Screen_Effect_Execution_Details;
		Read_Screen_Effect_Execution_Details((Screen_Effect_Execution_Details*)effect->details, read_file);
		break;
	case 17:
		effect->details = new Picture_Display_Details;
		Read_Picture_Display_Details((Picture_Display_Details*)effect->details, read_file);
		break;
	case 18:
		effect->details = new Screen_Color_Change_Details;
		Read_Screen_Color_Change_Details((Screen_Color_Change_Details*)effect->details, read_file);
		break;
	case 19:
		effect->details = new Background_Change_Details;
		Read_Background_Change_Details((Background_Change_Details*)effect->details, read_file);
		break;
	case 20:
		effect->details = new Sound_Effect_Playback_Details;
		Read_Sound_Effect_Playback_Details((Sound_Effect_Playback_Details*)effect->details, read_file);
		break;
	case 21:
		effect->details = new BGM_Playback_Details;
		Read_BGM_Playback_Details((BGM_Playback_Details*)effect->details, read_file);
		break;
	case 22:
		effect->details = new Code_Execution_Details;
		Read_Code_Execution_Details((Code_Execution_Details*)effect->details, read_file);
		break;
	case 23:
		effect->details = new Arrangement_Details;
		Read_Arrangement_Details((Arrangement_Details*)effect->details, read_file);
		break;
	case 24:
		effect->details = new Loop_Details;
		Read_Loop_Details((Loop_Details*)effect->details, read_file);
		break;
	default:
		printf("Unsupported item effect number specified.\n");
	}
}

void Write_Item_Effect(struct Item_Effect* effect, FILE* write_file) {
	fwrite(&effect->start, sizeof(int), 1, write_file);
	fwrite(&effect->byte5, sizeof(char), 1, write_file);
	fwrite(&effect->type, sizeof(char), 1, write_file);
	switch(effect->type) {
	case 1:
		Write_Flow_Change_Details((Flow_Change_Details*)effect->details, write_file);
		break;
	case 2:
		Write_Stage_Clear_Details((Stage_Clear_Details*)effect->details, write_file);
		break;
	case 3:
		Write_Game_Wait_Details((Game_Wait_Details*)effect->details, write_file);
		break;
	case 4:
		Write_Message_Details((Message_Details*)effect->details, write_file);
		break;
	case 5:
		Write_Warp_Details((Warp_Details*)effect->details, write_file);
		break;
	case 6:
		Write_Target_Setting_Details((Target_Setting_Details*)effect->details, write_file);
		break;
	case 7:
		Write_Status_Operation_Details((Status_Operation_Details*)effect->details, write_file);
		break;
	case 8:
		Write_Status_Operation_2_Details((Status_Operation_2_Details*)effect->details, write_file);
		break;
	case 9:
		Write_Disappearance_Details((Disappearance_Details*)effect->details, write_file);
		break;
	case 10:
		Write_Item_Acquisition_Details((Item_Acquisition_Details*)effect->details, write_file);
		break;
	case 11:
		Write_Graphic_Change_Details((Graphic_Change_Details*)effect->details, write_file);
		break;
	case 12:
		Write_Basic_Animation_Set_Change_Details((Basic_Animation_Set_Change_Details*)effect->details, write_file);
		break;
	case 13:
		Write_Animation_Execution_Details((Animation_Execution_Details*)effect->details, write_file);
		break;
	case 14:
		Write_Effect_Execution_Details((Effect_Execution_Details*)effect->details, write_file);
		break;
	case 15:
		Write_Character_Effect_Execution_Details((Character_Effect_Execution_Details*)effect->details, write_file);
		break;
	case 16:
		Write_Screen_Effect_Execution_Details((Screen_Effect_Execution_Details*)effect->details, write_file);
		break;
	case 17:
		Write_Picture_Display_Details((Picture_Display_Details*)effect->details, write_file);
		break;
	case 18:
		Write_Screen_Color_Change_Details((Screen_Color_Change_Details*)effect->details, write_file);
		break;
	case 19:
		Write_Background_Change_Details((Background_Change_Details*)effect->details, write_file);
		break;
	case 20:
		Write_Sound_Effect_Playback_Details((Sound_Effect_Playback_Details*)effect->details, write_file);
		break;
	case 21:
		Write_BGM_Playback_Details((BGM_Playback_Details*)effect->details, write_file);
		break;
	case 22:
		Write_Code_Execution_Details((Code_Execution_Details*)effect->details, write_file);
		break;
	case 23:
		Write_Arrangement_Details((Arrangement_Details*)effect->details, write_file);
		break;
	case 24:
		Write_Loop_Details((Loop_Details*)effect->details, write_file);
		break;
	default:
		printf("Unsupported item effect number specified.\n");
	}
}
```

```cpp
#pragma once

struct Item_Effect {
	Item_Effect();
	~Item_Effect();
	Item_Effect(const Item_Effect& r);
	Item_Effect& operator=(const Item_Effect& r);
	int start; //08 00 00 00
	char byte5;
	char type;
	void* details;
};

void Read_Item_Effect(struct Item_Effect* effect, FILE* read_file);
void Write_Item_Effect(struct Item_Effect* effect, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Item_Summon_Details.h"

void Read_Item_Summon_Details(struct Item_Summon_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(char), 1, read_file);
	fread(&details->bytes10_30, sizeof(char), 21, read_file);
	fread(&details->count, sizeof(char), 1, read_file);
	fread(&details->formation, sizeof(char), 1, read_file);
	fread(&details->interval, sizeof(short int), 1, read_file);
	fread(&details->number_of_columns, sizeof(short int), 1, read_file);
	fread(&details->column_interval, sizeof(short int), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->direction, sizeof(char), 1, read_file);
	fread(&details->byte41, sizeof(char), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->bytes43_51, sizeof(char), 9, read_file);
	fread(&details->summon_position_offset_x, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_y, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_x_flip, sizeof(char), 1, read_file);
	fread(&details->summon_position_offset_y_flip, sizeof(char), 1, read_file);
	fread(&details->bytes62_66, sizeof(char), 5, read_file);
	fread(&details->faction, sizeof(char), 1, read_file);
	fread(&details->bytes68_88, sizeof(char), 21, read_file);
	fread(&details->existence_time, sizeof(short int), 1, read_file);
	fread(&details->existence_time_present, sizeof(char), 1, read_file);
	fread(&details->bytes92_119, sizeof(char), 28, read_file);
	fread(&details->palette_type, sizeof(char), 1, read_file);
	fread(&details->palette_data_number, sizeof(short int), 1, read_file);
	fread(&details->faction_specification_method, sizeof(char), 1, read_file);
	fread(&details->set_acquired_score_to_0, sizeof(char), 1, read_file);
	fread(&details->direction_flip, sizeof(char), 1, read_file);
	fread(&details->attack, sizeof(char), 1, read_file);
	fread(&details->attack_flow, sizeof(char), 1, read_file);
	fread(&details->bytes128_143, sizeof(char), 16, read_file);
}

void Write_Item_Summon_Details(struct Item_Summon_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(char), 1, write_file);
	fwrite(&details->bytes10_30, sizeof(char), 21, write_file);
	fwrite(&details->count, sizeof(char), 1, write_file);
	fwrite(&details->formation, sizeof(char), 1, write_file);
	fwrite(&details->interval, sizeof(short int), 1, write_file);
	fwrite(&details->number_of_columns, sizeof(short int), 1, write_file);
	fwrite(&details->column_interval, sizeof(short int), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->direction, sizeof(char), 1, write_file);
	fwrite(&details->byte41, sizeof(char), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->bytes43_51, sizeof(char), 9, write_file);
	fwrite(&details->summon_position_offset_x, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_y, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_x_flip, sizeof(char), 1, write_file);
	fwrite(&details->summon_position_offset_y_flip, sizeof(char), 1, write_file);
	fwrite(&details->bytes62_66, sizeof(char), 5, write_file);
	fwrite(&details->faction, sizeof(char), 1, write_file);
	fwrite(&details->bytes68_88, sizeof(char), 21, write_file);
	fwrite(&details->existence_time, sizeof(short int), 1, write_file);
	fwrite(&details->existence_time_present, sizeof(char), 1, write_file);
	fwrite(&details->bytes92_119, sizeof(char), 28, write_file);
	fwrite(&details->palette_type, sizeof(char), 1, write_file);
	fwrite(&details->palette_data_number, sizeof(short int), 1, write_file);
	fwrite(&details->faction_specification_method, sizeof(char), 1, write_file);
	fwrite(&details->set_acquired_score_to_0, sizeof(char), 1, write_file);
	fwrite(&details->direction_flip, sizeof(char), 1, write_file);
	fwrite(&details->attack, sizeof(char), 1, write_file);
	fwrite(&details->attack_flow, sizeof(char), 1, write_file);
	fwrite(&details->bytes128_143, sizeof(char), 16, write_file);
}
```

```cpp
#pragma once

// same size as character summon, so character summon is used as is
struct Item_Summon_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	short int sound_effect;
	char play_sound_effect_if_outside_screen;
	char animation;
	char bytes10_30[21];
	char count;
	char formation;
	short int interval;
	short int number_of_columns;
	short int column_interval;
	char target;
	char direction;
	char byte41;
	char target;
	char bytes43_51[9];
	int summon_position_offset_x;
	int summon_position_offset_y;
	char summon_position_offset_x_flip;
	char summon_position_offset_y_flip;
	char bytes62_66[5];
	char faction;
	char bytes68_88[21];
	short int existence_time;
	char existence_time_present;
	char bytes92_119[28];
	char palette_type;
	short int palette_data_number;
	char faction_specification_method;
	char set_acquired_score_to_0;
	char direction_flip;
	char attack;
	char attack_flow;
	char bytes128_143[16];
};

void Read_Item_Summon_Details(struct Item_Summon_Details* details, FILE* read_file);
void Write_Item_Summon_Details(struct Item_Summon_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Animation_Execution_Details.h"

void Read_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 41, read_file);
}

void Write_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char), 41, write_file);
}
```

```cpp
#pragma once

struct Animation_Execution_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[41];
};

void Read_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* read_file);
void Write_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Arrangement_Details.h"

void Read_Arrangement_Details(struct Arrangement_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->command, sizeof(int), 1, read_file);
	fread(&details->parameter, sizeof(int), 1, read_file);
	fread(&details->operator_type, sizeof(int), 1, read_file);
	fread(&details->variable_type, sizeof(int), 1, read_file);
	fread(&details->variable_number, sizeof(int), 1, read_file);
}

void Write_Arrangement_Details(struct Arrangement_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->command, sizeof(int), 1, write_file);
	fwrite(&details->parameter, sizeof(int), 1, write_file);
	fwrite(&details->operator_type, sizeof(int), 1, write_file);
	fwrite(&details->variable_type, sizeof(int), 1, write_file);
	fwrite(&details->variable_number, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Arrangement_Details {
	char bytes1_38[38];
	int command;
	int parameter;
	int operator_type;
	int variable_type;
	int variable_number;
};

void Read_Arrangement_Details(struct Arrangement_Details* details, FILE* read_file);
void Write_Arrangement_Details(struct Arrangement_Details* details, FILE* write_file);
```

```cpp
#include "stdio.h"
#include "Event.h"

void Read_Event(struct Event* event, FILE* read_file) {
	int size;
	char* temp_str;

	fread(&event->start, sizeof(int), 1, read_file);
	fread(&event->placement_x, sizeof(int), 1, read_file);
	fread(&event->placement_y, sizeof(int), 1, read_file);
	fread(&event->unknown1, sizeof(int), 1, read_file);

	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		event->event_name = temp_str;
		delete[] temp_str;
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		event->page_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Event_Page(&event->page_data[i], read_file);
		}
	}

}

void Write_Event(struct Event* event, FILE* write_file) {
	int size;

	fwrite(&event->start, sizeof(int), 1, write_file);
	fwrite(&event->placement_x, sizeof(int), 1, write_file);
	fwrite(&event->placement_y, sizeof(int), 1, write_file);
	fwrite(&event->unknown1, sizeof(int), 1, write_file);

	size = event->event_name.size() + 1;
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 1) {
		fwrite(event->event_name.c_str(), sizeof(char), size, write_file);
	}

	size = event->page_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_Event_Page(&event->page_data[i], write_file);
		}
	}

}

```

```cpp
#pragma once

#include <string>

#include <vector>

#include "Event_Page.h"



struct Event{

	int start;

	int placement_x;

	int placement_y;

	int unknown1;

	std::string event_name;

	std::vector<Event_Page> page_data;

};



void Read_Event(struct Event* event, FILE* read_file);

void Write_Event(struct Event* event, FILE* write_file);
```

```cpp
#include "stdio.h"

#include "Event_Page.h"



void Read_Event_Page(struct Event_Page* page, FILE* read_file) {

	int size;

	char* temp_str;



	fread(&page->start, sizeof(int), 1, read_file);

	fread(&page->event_type, sizeof(int), 1, read_file);

	fread(&page->graphic, sizeof(int), 1, read_file);

	fread(&page->world_number, sizeof(int), 1, read_file);

	fread(&page->passable_without_clearing, sizeof(int), 1, read_file);

	fread(&page->playable_after_clearing, sizeof(int), 1, read_file);

	fread(&page->game_clear, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_world, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_variable, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_constant, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_comparison_content, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_total_score, sizeof(int), 1, read_file);

	fread(&page->variation_setting_present, sizeof(int), 1, read_file);

	fread(&page->variation_variable, sizeof(int), 1, read_file);

	fread(&page->variation_constant, sizeof(int), 1, read_file);

	fread(&page->string_count, sizeof(int), 1, read_file);



	fread(&size, sizeof(int), 1, read_file);

	if (size > 1) {

		temp_str = new char[size];

		fread(temp_str, sizeof(char), size, read_file);

		page->world_name = temp_str;

		delete[] temp_str;

	}



	fread(&size, sizeof(int), 1, read_file);

	if (size > 1) {

		temp_str = new char[size];

		fread(temp_str, sizeof(char), size, read_file);

		page->start_stage = temp_str;

		delete[] temp_str;

	}

}



void Write_Event_Page(struct Event_Page* page, FILE* write_file) {

	int size;



	fwrite(&page->start, sizeof(int), 1, write_file);

	fwrite(&page->event_type, sizeof(int), 1, write_file);

	fwrite(&page->graphic, sizeof(int), 1, write_file);

	fwrite(&page->world_number, sizeof(int), 1, write_file);

	fwrite(&page->passable_without_clearing, sizeof(int), 1, write_file);

	fwrite(&page->playable_after_clearing, sizeof(int), 1, write_file);

	fwrite(&page->game_clear, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_world, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_variable, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_constant, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_comparison_content, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_total_score, sizeof(int), 1, write_file);

	fwrite(&page->variation_setting_present, sizeof(int), 1, write_file);

	fwrite(&page->variation_variable, sizeof(int), 1, write_file);

	fwrite(&page->variation_constant, sizeof(int), 1, write_file);

	fwrite(&page->string_count, sizeof(int), 1, write_file);



	size = page->world_name.size() + 1;

	fwrite(&size, sizeof(int), 1, write_file);

	if (size > 1) {

		fwrite(page->world_name.c_str(), sizeof(char), size, write_file);

	}



	size = page->start_stage.size() + 1;

	fwrite(&size, sizeof(int), 1, write_file);

	if (size > 1) {

		fwrite(page->start_stage.c_str(), sizeof(char), size, write_file);

	}

}


```

```cpp
#pragma once

#include <string>



struct Event_Page{

	int start;

	int event_type;

	int graphic;

	int world_number;

	int passable_without_clearing;

	int playable_after_clearing;

	int game_clear;

	int appearance_condition_world;

	int appearance_condition_variable;

	int appearance_condition_constant;

	int appearance_condition_comparison_content;

	int appearance_condition_total_score;

	int variation_setting_present;

	int variation_variable;

	int variation_constant;

	int string_count;//fixed at 2

	std::string world_name;

	std::string start_stage;

};



void Read_Event_Page(struct Event_Page* page, FILE* read_file);

void Write_Event_Page(struct Event_Page* page, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Wait_Details.h"

void Read_Wait_Details(struct Wait_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 33, read_file);
}

void Write_Wait_Details(struct Wait_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char), 33, write_file);
}
```

```cpp
#pragma once



struct Wait_Details {

	short int execution_time;

	short int execution_time_double;

	char parallel_execution;

	char bytes[33];

};



void Read_Wait_Details(struct Wait_Details* details, FILE* read_file);

void Write_Wait_Details(struct Wait_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Effect_Execution_Details.h"

void Read_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->bytes39_78, sizeof(char), 40, read_file);
}

void Write_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->bytes39_78, sizeof(char), 40, write_file);
}
```

```cpp
#pragma once



struct Effect_Execution_Details {

	char bytes1_38[38];

	char bytes39_78[40];

};



void Read_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* read_file);

void Write_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* write_file);
```

```cpp
#include "Effect_Database.h"

void Read_Effect_Database(struct Effect_Database* database) {
	int temp_size;
	char* temp_str;
	Effect_Animation *temp_animation;

	FILE* read_file = fopen("data/database/Effect.dat", "rb");
	if (read_file != NULL) {
		fread(&database->version, sizeof(int), 1, read_file);
		fread(&database->number_of_records, sizeof(int), 1, read_file);
		if (database->number_of_records > 0) {
			database->records.resize(database->number_of_records);
			for (int i = 0; i < database->number_of_records; ++i) {
				fread(&database->records[i].start, sizeof(int), 1, read_file);
				fread(&database->records[i].same_as_file_name, sizeof(int), 1, read_file);
				fread(&database->records[i].horizontal_width, sizeof(int), 1, read_file);
				fread(&database->records[i].vertical_width, sizeof(int), 1, read_file);
				fread(&database->records[i].allow_gigantic_size, sizeof(int), 1, read_file);
				fread(&database->records[i].number_of_strings, sizeof(int), 1, read_file);
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].name = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].path = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 0) {
					for (int j = 0; j < temp_size; ++j) {
						temp_animation = new Effect_Animation();
						fread(&temp_animation->start, sizeof(int), 1, read_file);
						fread(&temp_animation->frame, sizeof(int), 1, read_file);
						fread(&temp_animation->display_time, sizeof(int), 1, read_file);
						fread(&temp_animation->end, sizeof(int), 1, read_file);
						database->records[i].effect_animations.push_back(*temp_animation);
						delete temp_animation;
					}
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Effect_Database(struct Effect_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/Effect.dat", "wb");
	if (write_file != NULL) {
		fwrite(&database->version, sizeof(int), 1, write_file);
		fwrite(&database->number_of_records, sizeof(int), 1, write_file);
		if (database->number_of_records > 0) {
			for (int i = 0; i < database->number_of_records; ++i) {
				fwrite(&database->records[i].start, sizeof(int), 1, write_file);
				fwrite(&database->records[i].same_as_file_name, sizeof(int), 1, write_file);
				fwrite(&database->records[i].horizontal_width, sizeof(int), 1, write_file);
				fwrite(&database->records[i].vertical_width, sizeof(int), 1, write_file);
				fwrite(&database->records[i].allow_gigantic_size, sizeof(int), 1, write_file);
				fwrite(&database->records[i].number_of_strings, sizeof(int), 1, write_file);
				temp_size = database->records[i].name.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].name.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].path.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].path.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].effect_animations.size();
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 0) {
					for (int j = 0; j < temp_size; ++j) {
						fwrite(&database->records[i].effect_animations[j].start, sizeof(int), 1, write_file);
						fwrite(&database->records[i].effect_animations[j].frame, sizeof(int), 1, write_file);
						fwrite(&database->records[i].effect_animations[j].display_time, sizeof(int), 1, write_file);
						fwrite(&database->records[i].effect_animations[j].end, sizeof(int), 1, write_file);
					}
				}
			}
		}
		fclose(write_file);
	}
}
```

```cpp
#pragma once



#include <vector>

#include <string>



struct Effect_Animation {

	int start; //2

	int frame;

	int display_time;

	int end; //0

};



struct Effect_Record {

	int start; //4

	int same_as_file_name;

	int horizontal_width;

	int vertical_width;

	int allow_gigantic_size;

	int number_of_strings;//2 for name and path

	std::string name;

	std::string path;

	std::vector<Effect_Animation> effect_animations;

};



struct Effect_Database {

	int version;

	int number_of_records;

	std::vector<Effect_Record> records;//[0] is not used

};



void Read_Effect_Database(struct Effect_Database* database);

void Write_Effect_Database(struct Effect_Database* database);
```

```cpp
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

```

```cpp
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
```

```cpp
#include "Character_Exclusive_Bmp_Database.h"

void Read_Character_Exclusive_Bmp_Database(struct Character_Exclusive_Bmp_Database* database) {
	int temp_size;
	char* temp_str;

	FILE* read_file = fopen("data/database/Bmp_CharaExc.dat", "rb");
	if (read_file != NULL) {
		fread(&database->version, sizeof(int), 1, read_file);
		fread(&database->number_of_records, sizeof(int), 1, read_file);
		if (database->number_of_records > 0) {
			database->records.resize(database->number_of_records);
			for (int i = 0; i < database->number_of_records; ++i) {
				fread(&database->records[i].start, sizeof(int), 1, read_file);
				fread(&database->records[i].same_as_file_name, sizeof(int), 1, read_file);
				fread(&database->records[i].is_gigantic_character, sizeof(int), 1, read_file);
				fread(&database->records[i].size, sizeof(int), 1, read_file);
				fread(&database->records[i].number_of_strings, sizeof(int), 1, read_file);
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].name = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].path = temp_str;
					delete[] temp_str;
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Character_Exclusive_Bmp_Database(struct Character_Exclusive_Bmp_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/Bmp_CharaExc.dat", "wb");
	if (write_file != NULL) {
		fwrite(&database->version, sizeof(int), 1, write_file);
		fwrite(&database->number_of_records, sizeof(int), 1, write_file);
		if (database->number_of_records > 0) {
			for (int i = 0; i < database->number_of_records; ++i) {
				fwrite(&database->records[i].start, sizeof(int), 1, write_file);
				fwrite(&database->records[i].same_as_file_name, sizeof(int), 1, write_file);
				fwrite(&database->records[i].is_gigantic_character, sizeof(int), 1, write_file);
				fwrite(&database->records[i].size, sizeof(int), 1, write_file);
				fwrite(&database->records[i].number_of_strings, sizeof(int), 1, write_file);
				temp_size = database->records[i].name.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].name.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].path.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].path.c_str(), sizeof(char), temp_size, write_file);
				}
			}
		}
		fclose(write_file);
	}
}
```

```cpp
#pragma once

#include <vector>
#include <string>

struct Character_Exclusive_Bmp_Record {
	int start; //3
	int same_as_file_name;
	int is_gigantic_character;
	int size;
	int number_of_strings;//2 for name and path
	std::string name;
	std::string path;
};

struct Character_Exclusive_Bmp_Database {
	int version;
	int number_of_records;
	std::vector<Character_Exclusive_Bmp_Record> records;//[0] is not used
};

void Read_Character_Exclusive_Bmp_Database(struct Character_Exclusive_Bmp_Database* database);
void Write_Character_Exclusive_Bmp_Database(struct Character_Exclusive_Bmp_Database* database);
```

```cpp
#include <stdio.h>
#include "Character_Effect_Execution_Details.h"

void Read_Character_Effect_Execution_Details(struct Character_Effect_Execution_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->effect, sizeof(int), 1, read_file);
	fread(&details->execution_type, sizeof(int), 1, read_file);
	fread(&details->loop_execution, sizeof(int), 1, read_file);
}

void Write_Character_Effect_Execution_Details(struct Character_Effect_Execution_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->effect, sizeof(int), 1, write_file);
	fwrite(&details->execution_type, sizeof(int), 1, write_file);
	fwrite(&details->loop_execution, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Character_Effect_Execution_Details {
	char bytes1_38[38];
	int effect;
	int execution_type;
	int loop_execution;
};

void Read_Character_Effect_Execution_Details(struct Character_Effect_Execution_Details* details, FILE* read_file);
void Write_Character_Effect_Execution_Details(struct Character_Effect_Execution_Details* details, FILE* write_file);
```

```cpp
#include "Character_Effect_Database.h"

void Read_Character_Effect_Database(struct Character_Effect_Database* database) {
	int temp_size;
	char* temp_str;

	FILE* read_file = fopen("data/database/CharaEffect.dat", "rb");
	if (read_file != NULL) {
		fread(&database->version, sizeof(int), 1, read_file);
		fread(&database->number_of_records, sizeof(int), 1, read_file);
		if (database->number_of_records > 0) {
			database->records.resize(database->number_of_records);
			for (int i = 0; i < database->number_of_records; ++i) {
				fread(&database->records[i].start, sizeof(int), 1, read_file);
				fread(&database->records[i].effect, sizeof(int), 1, read_file);
				fread(&database->records[i].execution_time, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter1, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter2, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter3, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter4, sizeof(int), 1, read_file);
				fread(&database->records[i].number_of_strings, sizeof(int), 1, read_file);
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].name = temp_str;
					delete[] temp_str;
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Character_Effect_Database(struct Character_Effect_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/CharaEffect.dat", "wb");
	if (write_file != NULL) {
		fwrite(&database->version, sizeof(int), 1, write_file);
		fwrite(&database->number_of_records, sizeof(int), 1, write_file);
		if (database->number_of_records > 0) {
			for (int i = 0; i < database->number_of_records; ++i) {
				fwrite(&database->records[i].start, sizeof(int), 1, write_file);
				fwrite(&database->records[i].effect, sizeof(int), 1, write_file);
				fwrite(&database->records[i].execution_time, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter1, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter2, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter3, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter4, sizeof(int), 1, write_file);
				fwrite(&database->records[i].number_of_strings, sizeof(int), 1, write_file);
				temp_size = database->records[i].name.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].name.c_str(), sizeof(char), temp_size, write_file);
				}
			}
		}
		fclose(write_file);
	}
}
```

```cpp
#pragma once

#include <vector>
#include <string>

struct Character_Effect_Record {
	int start; //2
	int effect; //burst is 1
	int execution_time;
	int parameter1;
	int parameter2;
	int parameter3;
	int parameter4;
	int number_of_strings;//1 for name
	std::string name;
};

struct Character_Effect_Database {
	int version;
	int number_of_records;
	std::vector<Character_Effect_Record> records;//[0] is not used
};

void Read_Character_Effect_Database(struct Character_Effect_Database* database);
void Write_Character_Effect_Database(struct Character_Effect_Database* database);
```

```cpp
#include <stdio.h>
#include "Character_Summon_Details.h"

void Read_Character_Summon_Details(struct Character_Summon_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(char), 1, read_file);
	fread(&details->bytes10_30, sizeof(char), 21, read_file);
	fread(&details->count, sizeof(char), 1, read_file);
	fread(&details->formation, sizeof(char), 1, read_file);
	fread(&details->interval, sizeof(short int), 1, read_file);
	fread(&details->number_of_columns, sizeof(short int), 1, read_file);
	fread(&details->column_interval, sizeof(short int), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->direction, sizeof(char), 1, read_file);
	fread(&details->byte41, sizeof(char), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->bytes43_51, sizeof(char), 9, read_file);
	fread(&details->summon_position_offset_x, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_y, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_x_flip, sizeof(char), 1, read_file);
	fread(&details->summon_position_offset_y_flip, sizeof(char), 1, read_file);
	fread(&details->bytes62_66, sizeof(char), 5, read_file);
	fread(&details->faction, sizeof(char), 1, read_file);
	fread(&details->bytes68_88, sizeof(char), 21, read_file);
	fread(&details->existence_time, sizeof(short int), 1, read_file);
	fread(&details->existence_time_present, sizeof(char), 1, read_file);
	fread(&details->bytes92_119, sizeof(char), 28, read_file);
	fread(&details->palette_type, sizeof(char), 1, read_file);
	fread(&details->palette_data_number, sizeof(short int), 1, read_file);
	fread(&details->faction_specification_method, sizeof(char), 1, read_file);
	fread(&details->set_acquired_score_to_0, sizeof(char), 1, read_file);
	fread(&details->direction_flip, sizeof(char), 1, read_file);
	fread(&details->attack, sizeof(char), 1, read_file);
	fread(&details->attack_flow, sizeof(char), 1, read_file);
	fread(&details->bytes128_143, sizeof(char), 16, read_file);
	fread(&details->return_value_to_flow_variable, sizeof(char), 1, read_file);
	fread(&details->bytes145_147, sizeof(char), 3, read_file);
}

void Write_Character_Summon_Details(struct Character_Summon_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(char), 1, write_file);
	fwrite(&details->bytes10_30, sizeof(char), 21, write_file);
	fwrite(&details->count, sizeof(char), 1, write_file);
	fwrite(&details->formation, sizeof(char), 1, write_file);
	fwrite(&details->interval, sizeof(short int), 1, write_file);
	fwrite(&details->number_of_columns, sizeof(short int), 1, write_file);
	fwrite(&details->column_interval, sizeof(short int), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->direction, sizeof(char), 1, write_file);
	fwrite(&details->byte41, sizeof(char), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->bytes43_51, sizeof(char), 9, write_file);
	fwrite(&details->summon_position_offset_x, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_y, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_x_flip, sizeof(char), 1, write_file);
	fwrite(&details->summon_position_offset_y_flip, sizeof(char), 1, write_file);
	fwrite(&details->bytes62_66, sizeof(char), 5, write_file);
	fwrite(&details->faction, sizeof(char), 1, write_file);
	fwrite(&details->bytes68_88, sizeof(char), 21, write_file);
	fwrite(&details->existence_time, sizeof(short int), 1, write_file);
	fwrite(&details->existence_time_present, sizeof(char), 1, write_file);
	fwrite(&details->bytes92_119, sizeof(char), 28, write_file);
	fwrite(&details->palette_type, sizeof(char), 1, write_file);
	fwrite(&details->palette_data_number, sizeof(short int), 1, write_file);
	fwrite(&details->faction_specification_method, sizeof(char), 1, write_file);
	fwrite(&details->set_acquired_score_to_0, sizeof(char), 1, write_file);
	fwrite(&details->direction_flip, sizeof(char), 1, write_file);
	fwrite(&details->attack, sizeof(char), 1, write_file);
	fwrite(&details->attack_flow, sizeof(char), 1, write_file);
	fwrite(&details->bytes128_143, sizeof(char), 16, write_file);
	fwrite(&details->return_value_to_flow_variable, sizeof(char), 1, write_file);
	fwrite(&details->bytes145_147, sizeof(char), 3, write_file);
}
```

```cpp
#pragma once

struct Character_Summon_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	short int sound_effect;
	char play_sound_effect_if_outside_screen;
	char animation;
	char bytes10_30[21];
	char count;
	char formation;
	short int interval;
	short int number_of_columns;
	short int column_interval;
	char target;
	char direction;
	char byte41;
	char target;
	char bytes43_51[9];
	int summon_position_offset_x;
	int summon_position_offset_y;
	char summon_position_offset_x_flip;
	char summon_position_offset_y_flip;
	char bytes62_66[5];
	char faction;
	char bytes68_88[21];
	short int existence_time;
	char existence_time_present;
	char bytes92_119[28];
	char palette_type;
	short int palette_data_number;
	char faction_specification_method;
	char set_acquired_score_to_0;
	char direction_flip;
	char attack;
	char attack_flow;
	char bytes128_143[16];
	char return_value_to_flow_variable;
	char bytes145_147[3];
};

void Read_Character_Summon_Details(struct Character_Summon_Details* details, FILE* read_file);
void Write_Character_Summon_Details(struct Character_Summon_Details* details, FILE* write_file);
```

```cpp
#include "stdio.h"

#include "Key_Config.h"



void Read_Key_Config(struct Key_Config* key_config) {

	FILE* read_file = fopen("user_data/KeyConfig.dat", "rb");

	int dummy_value;

	if (read_file != NULL) {

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->left, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->right, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->up, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->down, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->z, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->x, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->c, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->v, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->a, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->s, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->d, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->f, sizeof(int), 1, read_file);

		fread(&key_config->number_of_keys, sizeof(int), 1, read_file);

		fread(&key_config->unknown, sizeof(int), 1, read_file);

		fread(&key_config->play_with_this_setting, sizeof(int), 1, read_file);

		fclose(read_file);

	}

}



void Write_Key_Config(struct Key_Config* key_config) {

	FILE* write_file = fopen("user_data/KeyConfig.dat", "wb");

	int mysterious_number = 8;

	if (write_file != NULL) {

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->left, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->right, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->up, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->down, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->z, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->x, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->c, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->v, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->a, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->s, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->d, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->f, sizeof(int), 1, write_file);

		fread(&key_config->number_of_keys, sizeof(int), 1, write_file);

		fread(&key_config->unknown, sizeof(int), 1, write_file);

		fread(&key_config->play_with_this_setting, sizeof(int), 1, write_file);

		fclose(write_file);

	}

}
```

```cpp
#pragma once

struct Key_Config {
	int left = 37;
	int right = 39;
	int up = 38;
	int down = 40;
	int z = 90;
	int x = 88;
	int c = 67;
	int v = 86;
	int a = 65;
	int s = 83;
	int d = 68;
	int f = 70;
	int number_of_keys = 12;
	int unknown = 1;
	int play_with_this_setting = 0;
};

void Read_Key_Config(struct Key_Config* key_config);
void Write_Key_Config(struct Key_Config* key_config);
```

```cpp
#include <stdio.h>
#include "Key_Condition.h"

void Read_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* read_file) {
	fread(&key_condition_data->start, sizeof(int), 1, read_file);
	fread(&key_condition_data->right_and_left_to_front_and_back, sizeof(char), 1, read_file);
	fread(&key_condition_data->minimum_input_time, sizeof(short int), 1, read_file);
	fread(&key_condition_data->maximum_input_time, sizeof(short int), 1, read_file);
	fread(&key_condition_data->input_time_1_to_infinity, sizeof(char), 1, read_file);
	fread(&key_condition_data->judgment_type, sizeof(char), 1, read_file);
	fread(&key_condition_data->unknown, sizeof(int), 1, read_file);
	fread(&key_condition_data->number_of_key_data, sizeof(int), 1, read_file);
	fread(&key_condition_data->direction_key_neutral, sizeof(char), 1, read_file);
	fread(&key_condition_data->left_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->right_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->up_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->down_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->up_left_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->down_left_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->up_right_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->down_right_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->any_direction_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->action_key_neutral, sizeof(char), 1, read_file);
	fread(&key_condition_data->z_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->x_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->c_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->v_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->a_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->s_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->d_key, sizeof(char), 1, read_file);
	fread(&key_condition_data->f_key, sizeof(char), 1, read_file);
}

void Write_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* write_file) {
	fwrite(&key_condition_data->start, sizeof(int), 1, write_file);
	fwrite(&key_condition_data->right_and_left_to_front_and_back, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->minimum_input_time, sizeof(short int), 1, write_file);
	fwrite(&key_condition_data->maximum_input_time, sizeof(short int), 1, write_file);
	fwrite(&key_condition_data->input_time_1_to_infinity, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->judgment_type, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->unknown, sizeof(int), 1, write_file);
	fwrite(&key_condition_data->number_of_key_data, sizeof(int), 1, write_file);
	fwrite(&key_condition_data->direction_key_neutral, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->left_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->right_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->up_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->down_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->up_left_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->down_left_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->up_right_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->down_right_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->any_direction_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->action_key_neutral, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->z_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->x_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->c_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->v_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->a_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->s_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->d_key, sizeof(char), 1, write_file);
	fwrite(&key_condition_data->f_key, sizeof(char), 1, write_file);
}

```

```cpp
#pragma once

struct Key_Condition {
	int start; // 05 00 00 00
	char right_and_left_to_front_and_back;
	short int minimum_input_time;
	short int maximum_input_time;
	char input_time_1_to_infinity;
	char judgment_type;
	int unknown;
	int number_of_key_data;
	char direction_key_neutral;
	char left_key;
	char right_key;
	char up_key;
	char down_key;
	char up_left_key;
	char down_left_key;
	char up_right_key;
	char down_right_key;
	char any_direction_key;
	char action_key_neutral;
	char z_key;
	char x_key;
	char c_key;
	char v_key;
	char a_key;
	char s_key;
	char d_key;
	char f_key;
};

void Read_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* read_file);
void Write_Key_Condition_Data(struct Key_Condition* key_condition_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Graphic_Change_Details.h"

void Read_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->image_type, sizeof(int), 1, read_file);
	fread(&details->image_number, sizeof(int), 1, read_file);
	fread(&details->offset, sizeof(int), 1, read_file);
}

void Write_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->image_type, sizeof(int), 1, write_file);
	fwrite(&details->image_number, sizeof(int), 1, write_file);
	fwrite(&details->offset, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Graphic_Change_Details {
	char bytes1_38[38];
	int image_type;
	int image_number;
	int offset;
};

void Read_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* read_file);
void Write_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Game_Wait_Details.h"

void Read_Game_Wait_Details(struct Game_Wait_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes6_38, sizeof(char), 33, read_file);
	fread(&details->game_wait_execution_time, sizeof(int), 1, read_file);
}

void Write_Game_Wait_Details(struct Game_Wait_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes6_38, sizeof(char), 33, write_file);
	fwrite(&details->game_wait_execution_time, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Game_Wait_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_38[33];
	int game_wait_execution_time;
};

void Read_Game_Wait_Details(struct Game_Wait_Details* details, FILE* read_file);
void Write_Game_Wait_Details(struct Game_Wait_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "Wait_Details.h"
#include "Linear_Movement_Details.h"
#include "Ground_Movement_Details.h"
#include "Charge_Movement_Details.h"
#include "Circular_Movement_Details.h"
#include "Guided_Movement_Details.h"
#include "Screen_Outside_Avoidance_Movement_Details.h"
#include "Movement_Invalidation_Details.h"
#include "Direction_Change_Details.h"
#include "Jump_Details.h"
#include "Shot_Details.h"
#include "Sword_Details.h"
#include "Block_Summon_Details.h"
#include "Character_Summon_Details.h"
#include "Item_Summon_Details.h"
#include "Flow_Operation_Details.h"
#include "Stage_Clear_Details.h"
#include "Game_Wait_Details.h"
#include "Message_Details.h"
#include "Warp_Details.h"
#include "Target_Setting_Details.h"
#include "Status_Operation_Details.h"
#include "Status_Operation_2_Details.h"
#include "Disappearance_Details.h"
#include "Item_Acquisition_Details.h"
#include "Graphic_Change_Details.h"
#include "Basic_Animation_Set_Change_Details.h"
#include "Animation_Execution_Details.h"
#include "Effect_Execution_Details.h"
#include "Character_Effect_Execution_Details.h"
#include "Screen_Effect_Execution_Details.h"
#include "Picture_Display_Details.h"
#include "Screen_Color_Change_Details.h"
#include "Background_Change_Details.h"
#include "Sound_Effect_Playback_Details.h"
#include "BGM_Playback_Details.h"
#include "Code_Execution_Details.h"
#include "Arrangement_Details.h"
#include "Loop_Details.h"
#include "Command.h"


Command::Command() {
	details = nullptr;
}

Command::~Command() {
	if (details != nullptr) {
		switch (type) {
		case 1:
			delete (Wait_Details*)details;
			break;
		case 2:
			delete (Linear_Movement_Details*)details;
			break;
		case 3:
			delete (Ground_Movement_Details*)details;
			break;
		case 4:
			delete (Circular_Movement_Details*)details;
			break;
		case 5:
			delete (Charge_Movement_Details*)details;
			break;
		case 6:
			delete (Guided_Movement_Details*)details;
			break;
		case 7:
			delete (Screen_Outside_Avoidance_Movement_Details*)details;
			break;
		case 8:
			delete (Movement_Invalidation_Details*)details;
			break;
		case 9:
			delete (Direction_Change_Details*)details;
			break;
		case 10:
			delete (Jump_Details*)details;
			break;
		case 11:
			delete (Shot_Details*)details;
			break;
		case 12:
			delete (Sword_Details*)details;
			break;
		case 13:
			delete (Block_Summon_Details*)details;
			break;
		case 14:
			delete (Character_Summon_Details*)details;
			break;
		case 15:
			delete (Item_Summon_Details*)details;
			break;
		case 16:
			delete (Flow_Operation_Details*)details;
			break;
		case 17:
			delete (Stage_Clear_Details*)details;
			break;
		case 18:
			delete (Game_Wait_Details*)details;
			break;
		case 19:
			delete (Message_Details*)details;
			break;
		case 20:
			delete (Warp_Details*)details;
			break;
		case 21:
			delete (Target_Setting_Details*)details;
			break;
		case 22:
			delete (Status_Operation_Details*)details;
			break;
		case 23:
			delete (Status_Operation_2_Details*)details;
			break;
		case 24:
			delete (Disappearance_Details*)details;
			break;
		case 25:
			delete (Item_Acquisition_Details*)details;
			break;
		case 26:
			delete (Graphic_Change_Details*)details;
			break;
		case 27:
			delete (Basic_Animation_Set_Change_Details*)details;
			break;
		case 28:
			delete (Animation_Execution_Details*)details;
			break;
		case 29:
			delete (Effect_Execution_Details*)details;
			break;
		case 30:
			delete (Character_Effect_Execution_Details*)details;
			break;
		case 31:
			delete (Screen_Effect_Execution_Details*)details;
			break;
		case 32:
			delete (Picture_Display_Details*)details;
			break;
		case 33:
			delete (Screen_Color_Change_Details*)details;
			break;
		case 34:
			delete (Background_Change_Details*)details;
			break;
		case 35:
			delete (Sound_Effect_Playback_Details*)details;
			break;
		case 36:
			delete (BGM_Playback_Details*)details;
			break;
		case 37:
			delete (Code_Execution_Details*)details;
			break;
		case 38:
			delete (Arrangement_Details*)details;
			break;
		case 39:
			delete (Loop_Details*)details;
			break;
		}
	}
}

Command::Command(const Command& r) {
	start = r.start;
	byte5 = r.byte5;
	type = r.type;
	if (r.details != nullptr) {
		switch (r.type) {
		case 1:
			details = new Wait_Details(*(Wait_Details*)r.details);
			break;
		case 2:
			details = new Linear_Movement_Details(*(Linear_Movement_Details*)r.details);
			break;
		case 3:
			details = new Ground_Movement_Details(*(Ground_Movement_Details*)r.details);
			break;
		case 4:
			details = new Circular_Movement_Details(*(Circular_Movement_Details*)r.details);
			break;
		case 5:
			details = new Charge_Movement_Details(*(Charge_Movement_Details*)r.details);
			break;
		case 6:
			details = new Guided_Movement_Details(*(Guided_Movement_Details*)r.details);
			break;
		case 7:
			details = new Screen_Outside_Avoidance_Movement_Details(*(Screen_Outside_Avoidance_Movement_Details*)r.details);
			break;
		case 8:
			details = new Movement_Invalidation_Details(*(Movement_Invalidation_Details*)r.details);
			break;
		case 9:
			details = new Direction_Change_Details(*(Direction_Change_Details*)r.details);
			break;
		case 10:
			details = new Jump_Details(*(Jump_Details*)r.details);
			break;
		case 11:
			details = new Shot_Details(*(Shot_Details*)r.details);
			break;
		case 12:
			details = new Sword_Details(*(Sword_Details*)r.details);
			break;
		case 13:
			details = new Block_Summon_Details(*(Block_Summon_Details*)r.details);
			break;
		case 14:
			details = new Character_Summon_Details(*(Character_Summon_Details*)r.details);
			break;
		case 15:
			details = new Item_Summon_Details(*(Item_Summon_Details*)r.details);
			break;
		case 16:
			details = new Flow_Operation_Details(*(Flow_Operation_Details*)r.details);
			break;
		case 17:
			details = new Stage_Clear_Details(*(Stage_Clear_Details*)r.details);
			break;
		case 18:
			details = new Game_Wait_Details(*(Game_Wait_Details*)r.details);
			break;
		case 19:
			details = new Message_Details(*(Message_Details*)r.details);
			break;
		case 20:
			details = new Warp_Details(*(Warp_Details*)r.details);
			break;
		case 21:
			details = new Target_Setting_Details(*(Target_Setting_Details*)r.details);
			break;
		case 22:
			details = new Status_Operation_Details(*(Status_Operation_Details*)r.details);
			break;
		case 23:
			details = new Status_Operation_2_Details(*(Status_Operation_2_Details*)r.details);
			break;
		case 24:
			details = new Disappearance_Details(*(Disappearance_Details*)r.details);
			break;
		case 25:
			details = new Item_Acquisition_Details(*(Item_Acquisition_Details*)r.details);
			break;
		case 26:
			details = new Graphic_Change_Details(*(Graphic_Change_Details*)r.details);
			break;
		case 27:
			details = new Basic_Animation_Set_Change_Details(*(Basic_Animation_Set_Change_Details*)r.details);
			break;
		case 28:
			details = new Animation_Execution_Details(*(Animation_Execution_Details*)r.details);
			break;
		case 29:
			details = new Effect_Execution_Details(*(Effect_Execution_Details*)r.details);
			break;
		case 30:
			details = new Character_Effect_Execution_Details(*(Character_Effect_Execution_Details*)r.details);
			break;
		case 31:
			details = new Screen_Effect_Execution_Details(*(Screen_Effect_Execution_Details*)r.details);
			break;
		case 32:
			details = new Picture_Display_Details(*(Picture_Display_Details*)r.details);
			break;
		case 33:
			details = new Screen_Color_Change_Details(*(Screen_Color_Change_Details*)r.details);
			break;
		case 34:
			details = new Background_Change_Details(*(Background_Change_Details*)r.details);
			break;
		case 35:
			details = new Sound_Effect_Playback_Details(*(Sound_Effect_Playback_Details*)r.details);
			break;
		case 36:
			details = new BGM_Playback_Details(*(BGM_Playback_Details*)r.details);
			break;
		case 37:
			details = new Code_Execution_Details(*(Code_Execution_Details*)r.details);
			break;
		case 38:
			details = new Arrangement_Details(*(Arrangement_Details*)r.details);
			break;
		case 39:
			details = new Loop_Details(*(Loop_Details*)r.details);
			break;
		}
	}
	return *this;
}

void Read_Command_Data(struct Command* command_data, FILE* read_file) {
	fread(&command_data->start, sizeof(int), 1, read_file);
	fread(&command_data->byte5, sizeof(char), 1, read_file);
	fread(&command_data->type, sizeof(char), 1, read_file);
	switch(command_data->type) {
	case 1:
		command_data->details = new Wait_Details;
		Read_Wait_Details((struct Wait_Details*)command_data->details, read_file);
		break;
	case 2:
		command_data->details = new Linear_Movement_Details;
		Read_Linear_Movement_Details((struct Linear_Movement_Details*)command_data->details, read_file);
		break;
	case 3:
		command_data->details = new Ground_Movement_Details;
		Read_Ground_Movement_Details((struct Ground_Movement_Details*)command_data->details, read_file);
		break;
	case 4:
		command_data->details = new Circular_Movement_Details;
		Read_Circular_Movement_Details((struct Circular_Movement_Details*)command_data->details, read_file);
		break;
	case 5:
		command_data->details = new Charge_Movement_Details;
		Read_Charge_Movement_Details((struct Charge_Movement_Details*)command_data->details, read_file);
		break;
	case 6:
		command_data->details = new Guided_Movement_Details;
		Read_Guided_Movement_Details((struct Guided_Movement_Details*)command_data->details, read_file);
		break;
	case 7:
		command_data->details = new Screen_Outside_Avoidance_Movement_Details;
		Read_Screen_Outside_Avoidance_Movement_Details((struct Screen_Outside_Avoidance_Movement_Details*)command_data->details, read_file);
		break;
	case 8:
		command_data->details = new Movement_Invalidation_Details;
		Read_Movement_Invalidation_Details((struct Movement_Invalidation_Details*)command_data->details, read_file);
		break;
	case 9:
		command_data->details = new Direction_Change_Details;
		Read_Direction_Change_Details((struct Direction_Change_Details*)command_data->details, read_file);
		break;
	case 10:
		command_data->details = new Jump_Details;
		Read_Jump_Details((struct Jump_Details*)command_data->details, read_file);
		break;
	case 11:
		command_data->details = new Shot_Details;
		Read_Shot_Details((struct Shot_Details*)command_data->details, read_file);
		break;
	case 12:
		command_data->details = new Sword_Details;
		Read_Sword_Details((struct Sword_Details*)command_data->details, read_file);
		break;
	case 13:
		command_data->details = new Block_Summon_Details;
		Read_Block_Summon_Details((struct Block_Summon_Details*)command_data->details, read_file);
		break;
	case 14:
		command_data->details = new Character_Summon_Details;
		Read_Character_Summon_Details((struct Character_Summon_Details*)command_data->details, read_file);
		break;
	case 15:
		command_data->details = new Item_Summon_Details;
		Read_Item_Summon_Details((struct Item_Summon_Details*)command_data->details, read_file);
		break;
	case 16:
		command_data->details = new Flow_Operation_Details;
		Read_Flow_Operation_Details((struct Flow_Operation_Details*)command_data->details, read_file);
		break;
	case 17:
		command_data->details = new Stage_Clear_Details;
		Read_Stage_Clear_Details((struct Stage_Clear_Details*)command_data->details, read_file);
		break;
	case 18:
		command_data->details = new Game_Wait_Details;
		Read_Game_Wait_Details((struct Game_Wait_Details*)command_data->details, read_file);
		break;
	case 19:
		command_data->details = new Message_Details;
		Read_Message_Details((struct Message_Details*)command_data->details, read_file);
		break;
	case 20:
		command_data->details = new Warp_Details;
		Read_Warp_Details((struct Warp_Details*)command_data->details, read_file);
		break;
	case 21:
		command_data->details = new Target_Setting_Details;
		Read_Target_Setting_Details((struct Target_Setting_Details*)command_data->details, read_file);
		break;
	case 22:
		command_data->details = new Status_Operation_Details;
		Read_Status_Operation_Details((struct Status_Operation_Details*)command_data->details, read_file);
		break;
	case 23:
		command_data->details = new Status_Operation_2_Details;
		Read_Status_Operation_2_Details((struct Status_Operation_2_Details*)command_data->details, read_file);
		break;
	case 24:
		command_data->details = new Disappearance_Details;
		Read_Disappearance_Details((struct Disappearance_Details*)command_data->details, read_file);
		break;
	case 25:
		command_data->details = new Item_Acquisition_Details;
		Read_Item_Acquisition_Details((struct Item_Acquisition_Details*)command_data->details, read_file);
		break;
	case 26:
		command_data->details = new Graphic_Change_Details;
		Read_Graphic_Change_Details((struct Graphic_Change_Details*)command_data->details, read_file);
		break;
	case 27:
		command_data->details = new Basic_Animation_Set_Change_Details;
		Read_Basic_Animation_Set_Change_Details((struct Basic_Animation_Set_Change_Details*)command_data->details, read_file);
		break;
	case 28:
		command_data->details = new Animation_Execution_Details;
		Read_Animation_Execution_Details((struct Animation_Execution_Details*)command_data->details, read_file);
		break;
	case 29:
		command_data->details = new Effect_Execution_Details;
		Read_Effect_Execution_Details((struct Effect_Execution_Details*)command_data->details, read_file);
		break;
	case 30:
		command_data->details = new Character_Effect_Execution_Details;
		Read_Character_Effect_Execution_Details((struct Character_Effect_Execution_Details*)command_data->details, read_file);
		break;
	case 31:
		command_data->details = new Screen_Effect_Execution_Details;
		Read_Screen_Effect_Execution_Details((struct Screen_Effect_Execution_Details*)command_data->details, read_file);
		break;
	case 32:
		command_data->details = new Picture_Display_Details;
		Read_Picture_Display_Details((struct Picture_Display_Details*)command_data->details, read_file);
		break;
	case 33:
		command_data->details = new Screen_Color_Change_Details;
		Read_Screen_Color_Change_Details((struct Screen_Color_Change_Details*)command_data->details, read_file);
		break;
	case 34:
		command_data->details = new Background_Change_Details;
		Read_Background_Change_Details((struct Background_Change_Details*)command_data->details, read_file);
		break;
	case 35:
		command_data->details = new Sound_Effect_Playback_Details;
		Read_Sound_Effect_Playback_Details((struct Sound_Effect_Playback_Details*)command_data->details, read_file);
		break;
	case 36:
		command_data->details = new BGM_Playback_Details;
		Read_BGM_Playback_Details((struct BGM_Playback_Details*)command_data->details, read_file);
		break;
	case 37:
		command_data->details = new Code_Execution_Details;
		Read_Code_Execution_Details((struct Code_Execution_Details*)command_data->details, read_file);
		break;
	case 38:
		command_data->details = new Arrangement_Details;
		Read_Arrangement_Details((struct Arrangement_Details*)command_data->details, read_file);
		break;
	case 39:
		command_data->details = new Loop_Details;
		Read_Loop_Details((struct Loop_Details*)command_data->details, read_file);
		break;
	default:
		printf("Unsupported command number specified. %d\n", command_data->type);
	}
}

void Write_Command_Data(struct Command* command_data, FILE* write_file) {
	fwrite(&command_data->start, sizeof(int), 1, write_file);
	fwrite(&command_data->byte5, sizeof(char), 1, write_file);
	fwrite(&command_data->type, sizeof(char), 1, write_file);
	switch(command_data->type) {
	case 1:
		Write_Wait_Details((struct Wait_Details*)command_data->details, write_file);
		break;
	case 2:
		Write_Linear_Movement_Details((struct Linear_Movement_Details*)command_data->details, write_file);
		break;
	case 3:
		Write_Ground_Movement_Details((struct Ground_Movement_Details*)command_data->details, write_file);
		break;
	case 4:
		Write_Circular_Movement_Details((struct Circular_Movement_Details*)command_data->details, write_file);
		break;
	case 5:
		Write_Charge_Movement_Details((struct Charge_Movement_Details*)command_data->details, write_file);
		break;
	case 6:
		Write_Guided_Movement_Details((struct Guided_Movement_Details*)command_data->details, write_file);
		break;
	case 7:
		Write_Screen_Outside_Avoidance_Movement_Details((struct Screen_Outside_Avoidance_Movement_Details*)command_data->details, write_file);
		break;
	case 8:
		Write_Movement_Invalidation_Details((struct Movement_Invalidation_Details*)command_data->details, write_file);
		break;
	case 9:
		Write_Direction_Change_Details((struct Direction_Change_Details*)command_data->details, write_file);
		break;
	case 10:
		Write_Jump_Details((struct Jump_Details*)command_data->details, write_file);
		break;
	case 11:
		Write_Shot_Details((struct Shot_Details*)command_data->details, write_file);
		break;
	case 12:
		Write_Sword_Details((struct Sword_Details*)command_data->details, write_file);
		break;
	case 13:
		Write_Block_Summon_Details((struct Block_Summon_Details*)command_data->details, write_file);
		break;
	case 14:
		Write_Character_Summon_Details((struct Character_Summon_Details*)command_data->details, write_file);
		break;
	case 15:
		Write_Item_Summon_Details((struct Item_Summon_Details*)command_data->details, write_file);
		break;
	case 16:
		Write_Flow_Operation_Details((struct Flow_Operation_Details*)command_data->details, write_file);
		break;
	case 17:
		Write_Stage_Clear_Details((struct Stage_Clear_Details*)command_data->details, write_file);
		break;
	case 18:
		Write_Game_Wait_Details((struct Game_Wait_Details*)command_data->details, write_file);
		break;
	case 19:
		Write_Message_Details((struct Message_Details*)command_data->details, write_file);
		break;
	case 20:
		Write_Warp_Details((struct Warp_Details*)command_data->details, write_file);
		break;
	case 21:
		Write_Target_Setting_Details((struct Target_Setting_Details*)command_data->details, write_file);
		break;
	case 22:
		Write_Status_Operation_Details((struct Status_Operation_Details*)command_data->details, write_file);
		break;
	case 23:
		Write_Status_Operation_2_Details((struct Status_Operation_2_Details*)command_data->details, write_file);
		break;
	case 24:
		Write_Disappearance_Details((struct Disappearance_Details*)command_data->details, write_file);
		break;
	case 25:
		Write_Item_Acquisition_Details((struct Item_Acquisition_Details*)command_data->details, write_file);
		break;
	case 26:
		Write_Graphic_Change_Details((struct Graphic_Change_Details*)command_data->details, write_file);
		break;
	case 27:
		Write_Basic_Animation_Set_Change_Details((struct Basic_Animation_Set_Change_Details*)command_data->details, write_file);
		break;
	case 28:
		Write_Animation_Execution_Details((struct Animation_Execution_Details*)command_data->details, write_file);
		break;
	case 29:
		Write_Effect_Execution_Details((struct Effect_Execution_Details*)command_data->details, write_file);
		break;
	case 30:
		Write_Character_Effect_Execution_Details((struct Character_Effect_Execution_Details*)command_data->details, write_file);
		break;
	case 31:
		Write_Screen_Effect_Execution_Details((struct Screen_Effect_Execution_Details*)command_data->details, write_file);
		break;
	case 32:
		Write_Picture_Display_Details((struct Picture_Display_Details*)command_data->details, write_file);
		break;
	case 33:
		Write_Screen_Color_Change_Details((struct Screen_Color_Change_Details*)command_data->details, write_file);
		break;
	case 34:
		Write_Background_Change_Details((struct Background_Change_Details*)command_data->details, write_file);
		break;
	case 35:
		Write_Sound_Effect_Playback_Details((struct Sound_Effect_Playback_Details*)command_data->details, write_file);
		break;
	case 36:
		Write_BGM_Playback_Details((struct BGM_Playback_Details*)command_data->details, write_file);
		break;
	case 37:
		Write_Code_Execution_Details((struct Code_Execution_Details*)command_data->details, write_file);
		break;
	case 38:
		Write_Arrangement_Details((struct Arrangement_Details*)command_data->details, write_file);
		break;
	case 39:
		Write_Loop_Details((struct Loop_Details*)command_data->details, write_file);
		break;
	default:
		printf("Unsupported command number specified.\n");
	}
}

```

```cpp
#pragma once

struct Command {
	Command();
	~Command();
	Command(const Command& r);
	Command& operator=(const Command& r);
	int start; //08 00 00 00
	char byte5;
	char type;
	void* details;
};

void Read_Command_Data(struct Command* command_data, FILE* read_file);
void Write_Command_Data(struct Command* command_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Block.h"
#include "Character.h"
#include "Item.h"
#include "Common_Palette.h"

void Read_Common_Palette(struct Common_Palette* palette, FILE* read_file) {
	fread(&palette->version, sizeof(int), 1, read_file);
	fread(&palette->unknown1, sizeof(int), 1, read_file);
	fread(&palette->unknown2, sizeof(int), 1, read_file);
	fread(&palette->number_of_block_data, sizeof(int), 1, read_file);
	palette->block_data.resize(palette->number_of_block_data);
	for(int i = 0; i < palette->number_of_block_data; ++i) {
		Read_Block_Data(&palette->block_data[i], read_file);
	}

	fread(&palette->number_of_character_data, sizeof(int), 1, read_file);
	palette->character_data.resize(palette->number_of_character_data);
	for(int i = 0; i < palette->number_of_character_data; ++i) {
		Read_Character_Data(&palette->character_data[i], read_file);
	}

	fread(&palette->number_of_item_data, sizeof(int), 1, read_file);
	palette->item_data.resize(palette->number_of_item_data);
	for(int i = 0; i < palette->number_of_item_data; ++i) {
		Read_Item_Data(&palette->item_data[i], read_file);
	}
}

void Write_Common_Palette(struct Common_Palette* palette, FILE* write_file) {
	fwrite(&palette->version, sizeof(int), 1, write_file);
	fwrite(&palette->unknown1, sizeof(int), 1, write_file);
	fwrite(&palette->unknown2, sizeof(int), 1, write_file);
	fwrite(&palette->number_of_block_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_block_data; ++i) {
		Write_Block_Data(&palette->block_data[i], write_file);
	}

	fwrite(&palette->number_of_character_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_character_data; ++i) {
		Write_Character_Data(&palette->character_data[i], write_file);
	}

	fwrite(&palette->number_of_item_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_item_data; ++i) {
		Write_Item_Data(&palette->item_data[i], write_file);
	}
}

```

```cpp
#pragma once
#include "Block.h"
#include "Character.h"
#include "Item.h"

struct Common_Palette {
	int version;
	int unknown1;
	int unknown2;
	int number_of_block_data;
	std::vector<Block> block_data;
	int number_of_character_data;
	std::vector<Character> character_data;
	int number_of_item_data;
	std::vector<Item> item_data;
};

void Read_Common_Palette(struct Common_Palette* palette, FILE* read_file);
void Write_Common_Palette(struct Common_Palette* palette, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Code_Execution_Details.h"

void Read_Code_Execution_Details(struct Code_Execution_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_14, sizeof(char), 9, read_file);

	char* temp_str;
	int size;
	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		details->code = temp_str;
		delete[] temp_str;
	}

	fread(&details->bytes19_38, sizeof(char), 20, read_file);
}

void Write_Code_Execution_Details(struct Code_Execution_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_14, sizeof(char), 9, write_file);
	
	int temp_size = details->code.size() + 1;
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 1) {
		fwrite(details->code.c_str(), sizeof(char), temp_size, write_file);
	}
	
	fwrite(&details->bytes19_38, sizeof(char), 20, write_file);
}




```

```cpp
#pragma once
#include <string>

struct Code_Execution_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_14[9];
	std::string code;
	char bytes19_38[20];

};

void Read_Code_Execution_Details(struct Code_Execution_Details* details, FILE* read_file);
void Write_Code_Execution_Details(struct Code_Execution_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Shot_Details.h"

void Read_Shot_Details(struct Shot_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(short int), 1, read_file);
	fread(&details->bytes11_30, sizeof(char), 20, read_file);
	fread(&details->number_of_shots_fired, sizeof(char), 1, read_file);
	fread(&details->formation, sizeof(char), 1, read_file);
	fread(&details->firing_parameter1, sizeof(short int), 1, read_file);
	fread(&details->firing_parameter2, sizeof(short int), 1, read_file);
	fread(&details->firing_parameter3, sizeof(short int), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->direction, sizeof(char), 1, read_file);
	fread(&details->set_angle_to_target, sizeof(char), 1, read_file);
	fread(&details->firing_target, sizeof(char), 1, read_file);
	fread(&details->angle_offset, sizeof(short int), 1, read_file);
	fread(&details->angle_offset_double, sizeof(short int), 1, read_file);
	fread(&details->angle_offset_reverse_rotation_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->angle_dispersion, sizeof(short int), 1, read_file);
	fread(&details->change_firing_position_according_to_angle, sizeof(char), 1, read_file);
	fread(&details->number_of_doubles, sizeof(char), 1, read_file);
	fread(&details->firing_position_offset_x, sizeof(short int), 1, read_file);
	fread(&details->firing_position_offset_x_double, sizeof(short int), 1, read_file);
	fread(&details->firing_position_offset_y, sizeof(short int), 1, read_file);
	fread(&details->firing_position_offset_y_double, sizeof(short int), 1, read_file);
	fread(&details->firing_position_offset_x_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->firing_position_offset_y_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->graphic, sizeof(short int), 1, read_file);
	fread(&details->z_coordinate, sizeof(char), 1, read_file);
	fread(&details->transparency, sizeof(char), 1, read_file);
	fread(&details->faction_same_as_user, sizeof(char), 1, read_file);
	fread(&details->faction, sizeof(short int), 1, read_file);
	fread(&details->gigantic, sizeof(short int), 1, read_file);
	fread(&details->movement_type, sizeof(char), 1, read_file);
	fread(&details->movement_type_parameter1, sizeof(short int), 1, read_file);
	fread(&details->movement_type_parameter2, sizeof(short int), 1, read_file);
	fread(&details->movement_type_parameter3, sizeof(short int), 1, read_file);
	fread(&details->movement_target, sizeof(char), 1, read_file);
	fread(&details->synchronize_with_auto_scroll, sizeof(char), 1, read_file);
	fread(&details->speed, sizeof(short int), 1, read_file);
	fread(&details->speed_double, sizeof(short int), 1, read_file);
	fread(&details->acceleration_enabled, sizeof(char), 1, read_file);
	fread(&details->acceleration, sizeof(short int), 1, read_file);
	fread(&details->acceleration_double, sizeof(short int), 1, read_file);
	fread(&details->flight_distance, sizeof(short int), 1, read_file);
	fread(&details->flight_distance_valid, sizeof(char), 1, read_file);
	fread(&details->flight_distance_double, sizeof(short int), 1, read_file);
	fread(&details->flight_distance_does_not_disappear_at_end, sizeof(char), 1, read_file);
	fread(&details->disappearance_time_valid, sizeof(char), 1, read_file);
	fread(&details->disappearance_time, sizeof(short int), 1, read_file);
	fread(&details->disappearance_time_double, sizeof(short int), 1, read_file);
	fread(&details->penetrate_blocks, sizeof(char), 1, read_file);
	fread(&details->penetrate_characters, sizeof(char), 1, read_file);
	fread(&details->penetrate_block_characters, sizeof(char), 1, read_file);
	fread(&details->disappear_on_hitting_shot, sizeof(char), 1, read_file);
	fread(&details->value_for_disappearing_on_hitting_shot, sizeof(char), 1, read_file);
	fread(&details->power, sizeof(int), 1, read_file);
	fread(&details->bytes109_110, sizeof(char), 2, read_file);
	fread(&details->impact, sizeof(char), 1, read_file);
	fread(&details->effect, sizeof(short int), 1, read_file);
	fread(&details->acquired_item_palette_type, sizeof(char), 1, read_file);
	fread(&details->acquired_item_palette_number, sizeof(short int), 1, read_file);
	fread(&details->bytes117_125, sizeof(char), 9, read_file);
	fread(&details->attack, sizeof(char), 1, read_file);
	fread(&details->attack_id, sizeof(char), 1, read_file);
	fread(&details->bytes128_143, sizeof(char), 16, read_file);
}

void Write_Shot_Details(struct Shot_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(short int), 1, write_file);
	fwrite(&details->bytes11_30, sizeof(char), 20, write_file);
	fwrite(&details->number_of_shots_fired, sizeof(char), 1, write_file);
	fwrite(&details->formation, sizeof(char), 1, write_file);
	fwrite(&details->firing_parameter1, sizeof(short int), 1, write_file);
	fwrite(&details->firing_parameter2, sizeof(short int), 1, write_file);
	fwrite(&details->firing_parameter3, sizeof(short int), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->direction, sizeof(char), 1, write_file);
	fwrite(&details->set_angle_to_target, sizeof(char), 1, write_file);
	fwrite(&details->firing_target, sizeof(char), 1, write_file);
	fwrite(&details->angle_offset, sizeof(short int), 1, write_file);
	fwrite(&details->angle_offset_double, sizeof(short int), 1, write_file);
	fwrite(&details->angle_offset_reverse_rotation_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->angle_dispersion, sizeof(short int), 1, write_file);
	fwrite(&details->change_firing_position_according_to_angle, sizeof(char), 1, write_file);
	fwrite(&details->number_of_doubles, sizeof(char), 1, write_file);
	fwrite(&details->firing_position_offset_x, sizeof(short int), 1, write_file);
	fwrite(&details->firing_position_offset_x_double, sizeof(short int), 1, write_file);
	fwrite(&details->firing_position_offset_y, sizeof(short int), 1, write_file);
	fwrite(&details->firing_position_offset_y_double, sizeof(short int), 1, write_file);
	fwrite(&details->firing_position_offset_x_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->firing_position_offset_y_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->graphic, sizeof(short int), 1, write_file);
	fwrite(&details->z_coordinate, sizeof(char), 1, write_file);
	fwrite(&details->transparency, sizeof(char), 1, write_file);
	fwrite(&details->faction_same_as_user, sizeof(char), 1, write_file);
	fwrite(&details->faction, sizeof(short int), 1, write_file);
	fwrite(&details->gigantic, sizeof(short int), 1, write_file);
	fwrite(&details->movement_type, sizeof(char), 1, write_file);
	fwrite(&details->movement_type_parameter1, sizeof(short int), 1, write_file);
	fwrite(&details->movement_type_parameter2, sizeof(short int), 1, write_file);
	fwrite(&details->movement_type_parameter3, sizeof(short int), 1, write_file);
	fwrite(&details->movement_target, sizeof(char), 1, write_file);
	fwrite(&details->synchronize_with_auto_scroll, sizeof(char), 1, write_file);
	fwrite(&details->speed, sizeof(short int), 1, write_file);
	fwrite(&details->speed_double, sizeof(short int), 1, write_file);
	fwrite(&details->acceleration_enabled, sizeof(char), 1, write_file);
	fwrite(&details->acceleration, sizeof(short int), 1, write_file);
	fwrite(&details->acceleration_double, sizeof(short int), 1, write_file);
	fwrite(&details->flight_distance, sizeof(short int), 1, write_file);
	fwrite(&details->flight_distance_valid, sizeof(char), 1, write_file);
	fwrite(&details->flight_distance_double, sizeof(short int), 1, write_file);
	fwrite(&details->flight_distance_does_not_disappear_at_end, sizeof(char), 1, write_file);
	fwrite(&details->disappearance_time_valid, sizeof(char), 1, write_file);
	fwrite(&details->disappearance_time, sizeof(short int), 1, write_file);
	fwrite(&details->disappearance_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->penetrate_blocks, sizeof(char), 1, write_file);
	fwrite(&details->penetrate_characters, sizeof(char), 1, write_file);
	fwrite(&details->penetrate_block_characters, sizeof(char), 1, write_file);
	fwrite(&details->disappear_on_hitting_shot, sizeof(char), 1, write_file);
	fwrite(&details->value_for_disappearing_on_hitting_shot, sizeof(char), 1, write_file);
	fwrite(&details->power, sizeof(int), 1, write_file);
	fwrite(&details->bytes109_110, sizeof(char), 2, write_file);
	fwrite(&details->impact, sizeof(char), 1, write_file);
	fwrite(&details->effect, sizeof(short int), 1, write_file);
	fwrite(&details->acquired_item_palette_type, sizeof(char), 1, write_file);
	fwrite(&details->acquired_item_palette_number, sizeof(short int), 1, write_file);
	fwrite(&details->bytes117_125, sizeof(char), 9, write_file);
	fwrite(&details->attack, sizeof(char), 1, write_file);
	fwrite(&details->attack_id, sizeof(char), 1, write_file);
	fwrite(&details->bytes128_143, sizeof(char), 16, write_file);
}
```

```cpp
#pragma once

struct Shot_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	short int sound_effect;
	char play_if_outside_screen;
	short int animation;
	char bytes11_30[20];
	char number_of_shots_fired;
	char formation;
	short int firing_parameter1;//interval angle in scatter distance in encircle (hbl);
	short int firing_parameter2;//number of lightning strike columns;
	short int firing_parameter3;//interval between lightning strike columns;
	char target;
	char direction;
	char set_angle_to_target;
	char firing_target;
	short int angle_offset;
	short int angle_offset_double;
	char angle_offset_reverse_rotation_if_facing_right;
	short int angle_dispersion;
	char change_firing_position_according_to_angle;
	char number_of_doubles;
	short int firing_position_offset_x;
	short int firing_position_offset_x_double;
	short int firing_position_offset_y;
	short int firing_position_offset_y_double;
	char firing_position_offset_x_flip_if_facing_right;
	char firing_position_offset_y_flip_if_facing_right;
	short int graphic;
	char z_coordinate;
	char transparency;
	char faction_same_as_user;
	short int faction;
	short int gigantic;
	char movement_type;
	short int movement_type_parameter1;
	short int movement_type_parameter2;
	short int movement_type_parameter3;
	char movement_target;
	char synchronize_with_auto_scroll;
	short int speed;
	short int speed_double;
	char acceleration_enabled;
	short int acceleration;
	short int acceleration_double;
	short int flight_distance;
	char flight_distance_valid;
	short int flight_distance_double;
	char flight_distance_does_not_disappear_at_end;
	char disappearance_time_valid;
	short int disappearance_time;
	short int disappearance_time_double;
	char penetrate_blocks;
	char penetrate_characters;
	char penetrate_block_characters;
	char disappear_on_hitting_shot;
	char value_for_disappearing_on_hitting_shot;
	int power;
	char bytes109_110[2];
	char impact;
	short int effect;
	char acquired_item_palette_type;
	short int acquired_item_palette_number;
	char bytes117_125[9];
	char attack;
	char attack_id;
	char bytes128_143[16];
};

void Read_Shot_Details(struct Shot_Details* details, FILE* read_file);
void Write_Shot_Details(struct Shot_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Jump_Details.h"

void Read_Jump_Details(struct Jump_Details* details, FILE* read_file) {
	fread(&details->bytes1_5, sizeof(char), 5, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(short int), 1, read_file);
	fread(&details->bytes11_38, sizeof(char), 28, read_file);
	fread(&details->jump_type, sizeof(int), 1, read_file);
	fread(&details->max_jump_inertial_movement_speed, sizeof(int), 1, read_file);
	fread(&details->max_jump_height, sizeof(int), 1, read_file);
	fread(&details->min_jump_inertial_movement_speed, sizeof(int), 1, read_file);
	fread(&details->min_jump_height, sizeof(int), 1, read_file);
}

void Write_Jump_Details(struct Jump_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_5, sizeof(char), 5, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(short int), 1, write_file);
	fwrite(&details->bytes11_38, sizeof(char), 28, write_file);
	fwrite(&details->jump_type, sizeof(int), 1, write_file);
	fwrite(&details->max_jump_inertial_movement_speed, sizeof(int), 1, write_file);
	fwrite(&details->max_jump_height, sizeof(int), 1, write_file);
	fwrite(&details->min_jump_inertial_movement_speed, sizeof(int), 1, write_file);
	fwrite(&details->min_jump_height, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Jump_Details {
	char bytes1_5[5];
	short int sound_effect;
	char play_if_outside_screen;
	short int animation;
	char bytes11_38[28];
	int jump_type;
	int max_jump_inertial_movement_speed;
	int max_jump_height;
	int min_jump_inertial_movement_speed;
	int min_jump_height;
};

void Read_Jump_Details(struct Jump_Details* details, FILE* read_file);
void Write_Jump_Details(struct Jump_Details* details, FILE* write_file);
```

```cpp
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
```

```cpp
#pragma once
#include <string>
#include <vector>
#include "Stage_Block.h"
#include "Stage_Character.h"
#include "Stage_Item.h"
#include "Background.h"
#include "Stage_Palette.h"

struct Stage {
	int version;
	int unknown1;
	int horizontal_width;
	int vertical_movement_change_amount;//how much the position value changes when moving vertically
	int vertical_movement_change_amount_exponent;
	int vertical_width;
	int horizontal_scroll_minimum_value_enabled;
	int horizontal_scroll_maximum_value_enabled;
	int vertical_scroll_minimum_value_enabled;
	int vertical_scroll_maximum_value_enabled;
	int horizontal_scroll_minimum_value;
	int horizontal_scroll_maximum_value;
	int vertical_scroll_minimum_value;
	int vertical_scroll_maximum_value;
	int frame_rate;
	int time_limit_enabled;
	int time_limit;
	int warning_sound_start_time;
	int horizontal_auto_scroll_enabled;
	int vertical_auto_scroll_enabled;
	int horizontal_auto_scroll_speed;
	int vertical_auto_scroll_speed;
	double gravity;
	int collision_detection_level;
	int character_vs_shot_collision_detection_accuracy;
	int bgm_number;
	int bgm_loop;
	int do_not_replay_same_bgm;
	int z_coordinate_enabled;
	int inherit_status_from_stock;
	int store_status_to_stock;
	int status_window_display;
	int switch_scene_immediately_on_clear;
	int allow_replay_saving;
	int stage_display;
	int ready_display;
	int clear_display;
	int gameover_display;
	int collision_detection_main_character_walking_vs_block_horizontal_width;
	int collision_detection_main_character_walking_vs_block_vertical_width;
	int collision_detection_main_character_flying_vs_block_horizontal_width;
	int collision_detection_main_character_flying_vs_block_vertical_width;
	int collision_detection_main_character_walking_vs_character_horizontal_width;
	int collision_detection_main_character_walking_vs_character_vertical_width;
	int collision_detection_main_character_flying_vs_character_horizontal_width;
	int collision_detection_main_character_flying_vs_character_vertical_width;
	int collision_detection_main_character_vs_shot_horizontal_width;
	int collision_detection_main_character_vs_shot_vertical_width;
	int collision_detection_main_character_vs_item_horizontal_width;
	int collision_detection_main_character_vs_item_vertical_width;
	int collision_detection_main_character_walking_vs_block_position;
	int collision_detection_main_character_flying_vs_block_position;
	int collision_detection_main_character_walking_vs_character_position;
	int collision_detection_main_character_flying_vs_character_position;
	int collision_detection_main_character_vs_block_display;
	int collision_detection_main_character_vs_character_display;
	int collision_detection_main_character_vs_shot_display;
	int collision_detection_main_character_vs_item_display;
	int collision_detection_main_character_vs_block_display_color;
	int collision_detection_main_character_vs_character_display_color;
	int collision_detection_main_character_vs_shot_display_color;
	int collision_detection_main_character_vs_item_display_color;
	int collision_detection_enemy_walking_vs_block_horizontal_width;
	int collision_detection_enemy_walking_vs_block_vertical_width;
	int collision_detection_enemy_flying_vs_block_horizontal_width;
	int collision_detection_enemy_flying_vs_block_vertical_width;
	int collision_detection_enemy_walking_vs_character_horizontal_width;
	int collision_detection_enemy_walking_vs_character_vertical_width;
	int collision_detection_enemy_flying_vs_character_horizontal_width;
	int collision_detection_enemy_flying_vs_character_vertical_width;
	int collision_detection_enemy_vs_shot_horizontal_width;
	int collision_detection_enemy_vs_shot_vertical_width;
	int collision_detection_enemy_walking_vs_block_position;
	int collision_detection_enemy_flying_vs_block_position;
	int collision_detection_enemy_walking_vs_character_position;
	int collision_detection_enemy_flying_vs_character_position;
	int collision_detection_item_vs_character_horizontal_width;
	int collision_detection_item_vs_character_vertical_width;
	int collision_detection_main_character_shots_vs_character_horizontal_width;
	int collision_detection_main_character_shots_vs_character_vertical_width;
	int collision_detection_main_character_shots_vs_shot_horizontal_width;
	int collision_detection_main_character_shots_vs_shot_vertical_width;
	int collision_detection_enemy_shots_vs_character_horizontal_width;
	int collision_detection_enemy_shots_vs_character_vertical_width;
	int collision_detection_enemy_shots_vs_shot_horizontal_width;
	int collision_detection_enemy_shots_vs_shot_vertical_width;
	int unknown2;
	int x_coordinate_upper_limit;
	int y_coordinate_upper_limit;
	char bytes361_408[48];
	int do_not_take_damage_outside_screen;
	int main_character_same_character_continuous_damage_invalidation_time;
	int main_character_continuous_damage_invalidation_time;
	int enemy_same_character_continuous_damage_invalidation_time;
	int enemy_continuous_damage_invalidation_time;
	int unknown3;
	int stage_name_length;
	std::string stage_name;
	int number_of_ranking_items;//5 items
	int ranking_score;
	int ranking_remaining_time;
	int ranking_clear_time;
	int ranking_remaining_hp;
	int ranking_remaining_sp;
	int automatic_disappearance_non_block_characters_number_of_items;// 8 items
	int automatic_disappearance_non_block_characters_left_enabled;
	int automatic_disappearance_non_block_characters_right_enabled;
	int automatic_disappearance_non_block_characters_up_enabled;
	int automatic_disappearance_non_block_characters_down_enabled;
	int automatic_disappearance_non_block_characters_left_range;
	int automatic_disappearance_non_block_characters_right_range;
	int automatic_disappearance_non_block_characters_up_range;
	int automatic_disappearance_non_block_characters_down_range;
	int automatic_disappearance_non_block_characters_end;// 0
	int automatic_disappearance_block_characters_number_of_items;// 8 items
	int automatic_disappearance_block_characters_left_enabled;
	int automatic_disappearance_block_characters_right_enabled;
	int automatic_disappearance_block_characters_up_enabled;
	int automatic_disappearance_block_characters_down_enabled;
	int automatic_disappearance_block_characters_left_range;
	int automatic_disappearance_block_characters_right_range;
	int automatic_disappearance_block_characters_up_range;
	int automatic_disappearance_block_characters_down_range;
	int automatic_disappearance_block_characters_end;// 0
	int automatic_disappearance_items_number_of_items;// 8 items
	int automatic_disappearance_items_left_enabled;
	int automatic_disappearance_items_right_enabled;
	int automatic_disappearance_items_up_enabled;
	int automatic_disappearance_items_down_enabled;
	int automatic_disappearance_items_left_range;
	int automatic_disappearance_items_right_range;
	int automatic_disappearance_items_up_range;
	int automatic_disappearance_items_down_range;
	int automatic_disappearance_items_end;// 0
	int automatic_disappearance_main_character_shots_number_of_items;// 8 items
	int automatic_disappearance_main_character_shots_left_enabled;
	int automatic_disappearance_main_character_shots_right_enabled;
	int automatic_disappearance_main_character_shots_up_enabled;
	int automatic_disappearance_main_character_shots_down_enabled;
	int automatic_disappearance_main_character_shots_left_range;
	int automatic_disappearance_main_character_shots_right_range;
	int automatic_disappearance_main_character_shots_up_range;
	int automatic_disappearance_main_character_shots_down_range;
	int automatic_disappearance_main_character_shots_end;// 0
	int automatic_disappearance_enemy_shots_number_of_items;// 8 items
	int automatic_disappearance_enemy_shots_left_enabled;
	int automatic_disappearance_enemy_shots_right_enabled;
	int automatic_disappearance_enemy_shots_up_enabled;
	int automatic_disappearance_enemy_shots_down_enabled;
	int automatic_disappearance_enemy_shots_left_range;
	int automatic_disappearance_enemy_shots_right_range;
	int automatic_disappearance_enemy_shots_up_range;
	int automatic_disappearance_enemy_shots_down_range;
	int automatic_disappearance_enemy_shots_end;// 0
	struct Stage_Palette stage_palette;
	int number_of_block_data;
	std::vector<Stage_Block> block_data;
	int number_of_character_data;
	std::vector<Stage_Character> character_data;
	int number_of_item_data;
	std::vector<Stage_Item> item_data;
	int number_of_background_data;
	std::vector<Background> background_data;
	int number_of_stage_variables;//currently 1000
	int stage_variable_name_unknown1[1000];//always 0
	int stage_variable_name_unknown2[1000];//always 1
	int stage_variable_name_length[1000];
	char stage_variable_name[1000][100];
	int end;// value is 123456789
};

void Read_Stage(struct Stage* stage, FILE* read_file);
void Write_Stage(struct Stage* stage, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Stage_Item.h"

void Read_Stage_Item_Data(struct Stage_Item* item_data, FILE* read_file) {
	fread(&item_data->position, sizeof(int), 1, read_file);
	Read_Item_Data(&item_data->item, read_file);
}

void Write_Stage_Item_Data(struct Stage_Item* item_data, FILE* write_file) {
	fwrite(&item_data->position, sizeof(int), 1, write_file);
	Write_Item_Data(&item_data->item, write_file);
}
```

```cpp
#pragma once
#include "Item.h"

struct Stage_Item {
	int position;
	struct Item item;
};

void Read_Stage_Item_Data(struct Stage_Item* item_data, FILE* read_file);
void Write_Stage_Item_Data(struct Stage_Item* item_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Stage_Character.h"

void Read_Stage_Character_Data(struct Stage_Character* character_data, FILE* read_file) {
	fread(&character_data->position, sizeof(int), 1, read_file);
	Read_Character_Data(&character_data->character, read_file);
}

void Write_Stage_Character_Data(struct Stage_Character* character_data, FILE* write_file) {
	fwrite(&character_data->position, sizeof(int), 1, write_file);
	Write_Character_Data(&character_data->character, write_file);
}
```

```cpp
#pragma once
#include "Character.h"

struct Stage_Character {
	int position;
	struct Character character;
};

void Read_Stage_Character_Data(struct Stage_Character* character_data, FILE* read_file);
void Write_Stage_Character_Data(struct Stage_Character* character_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Stage_Clear_Details.h"

void Read_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* read_file) {
	char* temp_str;
	fread(&details->bytes1_14, sizeof(char), 14, read_file);
	fread(&details->path_length, sizeof(int), 1, read_file);
	if (details->path_length > 1) {
		temp_str = new char[details->path_length];
		fread(temp_str, sizeof(char), details->path_length, read_file);
		details->path = temp_str;
		delete[] temp_str;
	}
	fread(&details->bytes19_38, sizeof(char), 20, read_file);
	fread(&details->stage_transition, sizeof(int), 1, read_file);
	fread(&details->number, sizeof(int), 1, read_file);
	fread(&details->change_world_map_position, sizeof(int), 1, read_file);
	fread(&details->world_map_position_x, sizeof(int), 1, read_file);
	fread(&details->world_map_position_y, sizeof(int), 1, read_file);
	fread(&details->change_initial_position, sizeof(int), 1, read_file);
	fread(&details->initial_position_x, sizeof(int), 1, read_file);
	fread(&details->initial_position_y, sizeof(int), 1, read_file);
	fread(&details->initial_position_main_character_direction, sizeof(int), 1, read_file);
	fread(&details->execute_autosave, sizeof(int), 1, read_file);
	fread(&details->add_clear_text_to_replay, sizeof(int), 1, read_file);
}

void Write_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_14, sizeof(char), 14, write_file);
	fwrite(&details->path_length, sizeof(int), 1, write_file);
	if (details->path_length > 1) {
		fwrite(details->path.c_str(), sizeof(char), details->path_length, write_file);
	}
	fwrite(&details->bytes19_38, sizeof(char), 20, write_file);
	fwrite(&details->stage_transition, sizeof(int), 1, write_file);
	fwrite(&details->number, sizeof(int), 1, write_file);
	fwrite(&details->change_world_map_position, sizeof(int), 1, write_file);
	fwrite(&details->world_map_position_x, sizeof(int), 1, write_file);
	fwrite(&details->world_map_position_y, sizeof(int), 1, write_file);
	fwrite(&details->change_initial_position, sizeof(int), 1, write_file);
	fwrite(&details->initial_position_x, sizeof(int), 1, write_file);
	fwrite(&details->initial_position_y, sizeof(int), 1, write_file);
	fwrite(&details->initial_position_main_character_direction, sizeof(int), 1, write_file);
	fwrite(&details->execute_autosave, sizeof(int), 1, write_file);
	fwrite(&details->add_clear_text_to_replay, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once
#include <string>

struct Stage_Clear_Details {
	char bytes1_14[14];
	int path_length;
	std::string path;
	char bytes19_38[20];
	int stage_transition;
	int number;
	int change_world_map_position;
	int world_map_position_x;
	int world_map_position_y;
	int change_initial_position;
	int initial_position_x;
	int initial_position_y;
	int initial_position_main_character_direction;
	int execute_autosave;
	int add_clear_text_to_replay;
};

void Read_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* read_file);
void Write_Stage_Clear_Details(struct Stage_Clear_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Block.h"
#include "Character.h"
#include "Item.h"
#include "Stage_Palette.h"

void Read_Stage_Palette(struct Stage_Palette* palette, FILE* read_file, int read_version) {
	if(read_version) {
		fread(&palette->version, sizeof(int), 1, read_file);
	}
	fread(&palette->number_of_block_data, sizeof(int), 1, read_file);
	palette->block_data.resize(palette->number_of_block_data);
	for(int i = 0; i < palette->number_of_block_data; ++i) {
		Read_Block_Data(&palette->block_data[i], read_file);
	}

	fread(&palette->number_of_character_data, sizeof(int), 1, read_file);
	palette->character_data.resize(palette->number_of_character_data);
	for(int i = 0; i < palette->number_of_character_data; ++i) {
		Read_Character_Data(&palette->character_data[i], read_file);
	}

	fread(&palette->number_of_item_data, sizeof(int), 1, read_file);
	palette->item_data.resize(palette->number_of_item_data);
	for(int i = 0; i < palette->number_of_item_data; ++i) {
		Read_Item_Data(&palette->item_data[i], read_file);
	}
}

void Write_Stage_Palette(struct Stage_Palette* palette, FILE* write_file, int write_version) {
	if(write_version) {
		fwrite(&palette->version, sizeof(int), 1, write_file);
	}
	fwrite(&palette->number_of_block_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_block_data; ++i) {
		Write_Block_Data(&palette->block_data[i], write_file);
	}

	fwrite(&palette->number_of_character_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_character_data; ++i) {
		Write_Character_Data(&palette->character_data[i], write_file);
	}

	fwrite(&palette->number_of_item_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_item_data; ++i) {
		Write_Item_Data(&palette->item_data[i], write_file);
	}
}

```

```cpp
#pragma once
#include "Block.h"
#include "Character.h"
#include "Item.h"

struct Stage_Palette {
	int version;
	int number_of_block_data;
	std::vector<Block> block_data;
	int number_of_character_data;
	std::vector<Character> character_data;
	int number_of_item_data;
	std::vector<Item> item_data;
};

void Read_Stage_Palette(struct Stage_Palette* palette, FILE* read_file, int read_version);
void Write_Stage_Palette(struct Stage_Palette* palette, FILE* write_file, int write_version);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Stage_Block.h"

void Read_Stage_Block_Data(struct Stage_Block* block_data, FILE* read_file) {
	fread(&block_data->position, sizeof(int), 1, read_file);
	Read_Block_Data(&block_data->block, read_file);
}

void Write_Stage_Block_Data(struct Stage_Block* block_data, FILE* write_file) {
	fwrite(&block_data->position, sizeof(int), 1, write_file);
	Write_Block_Data(&block_data->block, write_file);
}
```

```cpp
#pragma once
#include "Block.h"

struct Stage_Block {
	int position;
	struct Block block;
};

void Read_Stage_Block_Data(struct Stage_Block* block_data, FILE* read_file);
void Write_Stage_Block_Data(struct Stage_Block* block_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Status_Operation_2_Details.h"

void Read_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->target, sizeof(int), 1, read_file);
	fread(&details->status, sizeof(int), 1, read_file);
	fread(&details->on, sizeof(int), 1, read_file);
	fread(&details->bytes51_62, sizeof(char), 12, read_file);
}

void Write_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->target, sizeof(int), 1, write_file);
	fwrite(&details->status, sizeof(int), 1, write_file);
	fwrite(&details->on, sizeof(int), 1, write_file);
	fwrite(&details->bytes51_62, sizeof(char), 12, write_file);
}
```

```cpp
#pragma once

struct Status_Operation_2_Details {
	char bytes1_38[38];
	int target;
	int status;
	int on;
	char bytes51_62[12];
};

void Read_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* read_file);
void Write_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Status_Operation_Details.h"

void Read_Status_Operation_Details(struct Status_Operation_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->operation_target_type, sizeof(char), 1, read_file);
	fread(&details->bytes40_43, sizeof(char), 4, read_file);
	fread(&details->operation_target_variable_type, sizeof(char), 1, read_file);
	fread(&details->bytes45_46, sizeof(char), 2, read_file);
	fread(&details->operation_target_variable_number, sizeof(short int), 1, read_file);
	fread(&details->bytes49_52, sizeof(char), 4, read_file);
	fread(&details->operation_target_target, sizeof(char), 1, read_file);
	fread(&details->bytes54_56, sizeof(char), 3, read_file);
	fread(&details->operation_target_status, sizeof(char), 1, read_file);
	fread(&details->byte58, sizeof(char), 1, read_file);
	fread(&details->operation_target_flow_variable_number, sizeof(char), 1, read_file);
	fread(&details->bytes60_62, sizeof(char), 3, read_file);
	fread(&details->operator_type, sizeof(char), 1, read_file);
	fread(&details->bytes64_66, sizeof(char), 3, read_file);
	fread(&details->calculation_content_type, sizeof(int), 1, read_file);
	fread(&details->calculation_content_constant, sizeof(int), 1, read_file);
	fread(&details->calculation_content_random_lower_limit, sizeof(int), 1, read_file);
	fread(&details->calculation_content_random_upper_limit, sizeof(int), 1, read_file);
	fread(&details->calculation_content_variable_type, sizeof(int), 1, read_file);
	fread(&details->calculation_content_variable_number, sizeof(int), 1, read_file);
	fread(&details->calculation_content_target, sizeof(int), 1, read_file);
	fread(&details->calculation_content_status, sizeof(int), 1, read_file);
	fread(&details->calculation_content_flow_variable_number, sizeof(int), 1, read_file);
	fread(&details->bytes103_138, sizeof(char), 36, read_file);
}

void Write_Status_Operation_Details(struct Status_Operation_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->operation_target_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes40_43, sizeof(char), 4, write_file);
	fwrite(&details->operation_target_variable_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes45_46, sizeof(char), 2, write_file);
	fwrite(&details->operation_target_variable_number, sizeof(short int), 1, write_file);
	fwrite(&details->bytes49_52, sizeof(char), 4, write_file);
	fwrite(&details->operation_target_target, sizeof(char), 1, write_file);
	fwrite(&details->bytes54_56, sizeof(char), 3, write_file);
	fwrite(&details->operation_target_status, sizeof(char), 1, write_file);
	fwrite(&details->byte58, sizeof(char), 1, write_file);
	fwrite(&details->operation_target_flow_variable_number, sizeof(char), 1, write_file);
	fwrite(&details->bytes60_62, sizeof(char), 3, write_file);
	fwrite(&details->operator_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes64_66, sizeof(char), 3, write_file);
	fwrite(&details->calculation_content_type, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_constant, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_random_lower_limit, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_random_upper_limit, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_variable_type, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_variable_number, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_target, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_status, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_flow_variable_number, sizeof(int), 1, write_file);
	fwrite(&details->bytes103_138, sizeof(char), 36, write_file);
}
```

```cpp
#pragma once

struct Status_Operation_Details {
	char bytes1_38[38];
	char operation_target_type;
	char bytes40_43[4];
	char operation_target_variable_type;
	char bytes45_46[2];
	short int operation_target_variable_number;
	char bytes49_52[4];
	char operation_target_target;
	char bytes54_56[3];
	char operation_target_status;
	char byte58;
	char operation_target_flow_variable_number;
	char bytes60_62[3];
	char operator_type;
	char bytes64_66[3];
	int calculation_content_type;
	int calculation_content_constant;
	int calculation_content_random_lower_limit;
	int calculation_content_random_upper_limit;
	int calculation_content_variable_type;
	int calculation_content_variable_number;
	int calculation_content_target;
	int calculation_content_status;
	int calculation_content_flow_variable_number;
	char bytes103_138[36];
};

void Read_Status_Operation_Details(struct Status_Operation_Details* details, FILE* read_file);
void Write_Status_Operation_Details(struct Status_Operation_Details* details, FILE* write_file);
```

```cpp
#include "Sword_Type_Database.h"

void Read_Sword_Type_Database(struct Sword_Type_Database* database) {
	int temp_size;
	char* temp_str;
	Sword_Position* temp_position;

	FILE* read_file = fopen("data/database/SwordType.dat", "rb");
	if (read_file != NULL) {
		fread(&database->version, sizeof(int), 1, read_file);
		fread(&database->number_of_records, sizeof(int), 1, read_file);
		if (database->number_of_records > 0) {
			database->records.resize(database->number_of_records);
			for (int i = 0; i < database->records.size(); ++i) {
				fread(&database->records[i].start, sizeof(int), 1, read_file);
				fread(&database->records[i].same_as_file_name, sizeof(int), 1, read_file);
				fread(&database->records[i].number_of_strings, sizeof(int), 1, read_file);
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].name = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].left_facing_bitmap = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].right_facing_bitmap = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 0) {
					for (int j = 0; j < temp_size; ++j) {
						temp_position = new Sword_Position();
						fread(&temp_position->start, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_x, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_y, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_x_flip_if_facing_right, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_y_flip_if_facing_right, sizeof(int), 1, read_file);
						fread(&temp_position->direction, sizeof(int), 1, read_file);
						fread(&temp_position->display_source_coordinate_x, sizeof(int), 1, read_file);
						fread(&temp_position->display_source_coordinate_y, sizeof(int), 1, read_file);
						fread(&temp_position->horizontal_width, sizeof(int), 1, read_file);
						fread(&temp_position->vertical_width, sizeof(int), 1, read_file);
						fread(&temp_position->display_time, sizeof(int), 1, read_file);
						fread(&temp_position->end, sizeof(int), 1, read_file);
						database->records[i].sword_positions.push_back(*temp_position);
						delete temp_position;
					}
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Sword_Type_Database(struct Sword_Type_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/SwordType.dat", "wb");
	if (write_file != NULL) {
		fwrite(&database->version, sizeof(int), 1, write_file);
		fwrite(&database->number_of_records, sizeof(int), 1, write_file);
		if (database->number_of_records > 0) {
			for (int i = 0; i < database->records.size(); ++i) {
				fwrite(&database->records[i].start, sizeof(int), 1, write_file);
				fwrite(&database->records[i].same_as_file_name, sizeof(int), 1, write_file);
				fwrite(&database->records[i].number_of_strings, sizeof(int), 1, write_file);
				temp_size = database->records[i].name.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].name.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].left_facing_bitmap.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].left_facing_bitmap.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].right_facing_bitmap.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].right_facing_bitmap.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].sword_positions.size();
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 0) {
					for (int j = 0; j < temp_size; ++j) {
						fwrite(&database->records[i].sword_positions[j].start, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_x, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_y, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_x_flip_if_facing_right, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_y_flip_if_facing_right, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].direction, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].display_source_coordinate_x, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].display_source_coordinate_y, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].horizontal_width, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].vertical_width, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].display_time, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].end, sizeof(int), 1, write_file);
					}
				}
			}
		}
		fclose(write_file);
	}
}
```

```cpp
#pragma once

#include <vector>
#include <string>

struct Sword_Position {
	int start; //10
	int position_offset_x;
	int position_offset_y;
	int position_offset_x_flip_if_facing_right;
	int position_offset_y_flip_if_facing_right;
	int direction;
	int display_source_coordinate_x;
	int display_source_coordinate_y;
	int horizontal_width;
	int vertical_width;
	int display_time;
	int end; //0
};

struct Sword_Type_Record {
	int start; //1
	int same_as_file_name;
	int number_of_strings; //3
	std::string name;
	std::string left_facing_bitmap;
	std::string right_facing_bitmap;
	std::vector<Sword_Position> sword_positions;
};

struct Sword_Type_Database {
	int version;
	int number_of_records;
	std::vector<Sword_Type_Record> records;//[0] is not used
};

void Read_Sword_Type_Database(struct Sword_Type_Database* database);
void Write_Sword_Type_Database(struct Sword_Type_Database* database);
```

```cpp
#include <stdio.h>
#include "Sword_Details.h"

void Read_Sword_Details(struct Sword_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(short int), 1, read_file);
	fread(&details->bytes11_63, sizeof(char), 53, read_file);
	fread(&details->z_coordinate, sizeof(char), 1, read_file);
	fread(&details->transparency, sizeof(char), 1, read_file);
	fread(&details->faction_same_as_user, sizeof(char), 1, read_file);
	fread(&details->faction, sizeof(short int), 1, read_file);
	fread(&details->gigantic, sizeof(short int), 1, read_file);
	fread(&details->sword_type, sizeof(int), 1, read_file);
	fread(&details->bytes75_104, sizeof(char), 30, read_file);
	fread(&details->power, sizeof(int), 1, read_file);
	fread(&details->bytes109_110, sizeof(char), 2, read_file);
	fread(&details->impact, sizeof(char), 1, read_file);
	fread(&details->effect, sizeof(short int), 1, read_file);
	fread(&details->acquired_item_palette_type, sizeof(char), 1, read_file);
	fread(&details->acquired_item_palette_number, sizeof(short int), 1, read_file);
	fread(&details->bytes117_125, sizeof(char), 9, read_file);
	fread(&details->attack, sizeof(char), 1, read_file);
	fread(&details->attack_id, sizeof(char), 1, read_file);
	fread(&details->bytes128_143, sizeof(char), 16, read_file);
}

void Write_Sword_Details(struct Sword_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(short int), 1, write_file);
	fwrite(&details->bytes11_63, sizeof(char), 53, write_file);
	fwrite(&details->z_coordinate, sizeof(char), 1, write_file);
	fwrite(&details->transparency, sizeof(char), 1, write_file);
	fwrite(&details->faction_same_as_user, sizeof(char), 1, write_file);
	fwrite(&details->faction, sizeof(short int), 1, write_file);
	fwrite(&details->gigantic, sizeof(short int), 1, write_file);
	fwrite(&details->sword_type, sizeof(int), 1, write_file);
	fwrite(&details->bytes75_104, sizeof(char), 30, write_file);
	fwrite(&details->power, sizeof(int), 1, write_file);
	fwrite(&details->bytes109_110, sizeof(char), 2, write_file);
	fwrite(&details->impact, sizeof(char), 1, write_file);
	fwrite(&details->effect, sizeof(short int), 1, write_file);
	fwrite(&details->acquired_item_palette_type, sizeof(char), 1, write_file);
	fwrite(&details->acquired_item_palette_number, sizeof(short int), 1, write_file);
	fwrite(&details->bytes117_125, sizeof(char), 9, write_file);
	fwrite(&details->attack, sizeof(char), 1, write_file);
	fwrite(&details->attack_id, sizeof(char), 1, write_file);
	fwrite(&details->bytes128_143, sizeof(char), 16, write_file);
}
```

```cpp
#pragma once

struct Sword_Details {
	int execution_time;
	char parallel_execution;
	short int sound_effect;
	char play_if_outside_screen;
	short int animation;
	char bytes11_63[53];
	char z_coordinate;
	char transparency;
	char faction_same_as_user;
	short int faction;
	short int gigantic;
	int sword_type;
	char bytes75_104[30];
	int power;
	char bytes109_110[2];
	char impact;
	short int effect;
	char acquired_item_palette_type;
	short int acquired_item_palette_number;
	char bytes117_125[9];
	char attack;
	char attack_id;
	char bytes128_143[16];
};

void Read_Sword_Details(struct Sword_Details* details, FILE* read_file);
void Write_Sword_Details(struct Sword_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Target_Setting_Details.h"

void Read_Target_Setting_Details(struct Target_Setting_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->bytes39_106, sizeof(char), 68, read_file);
}

void Write_Target_Setting_Details(struct Target_Setting_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->bytes39_106, sizeof(char), 68, write_file);
}
```

```cpp
#pragma once

struct Target_Setting_Details {
	char bytes1_38[38];
	char bytes39_106[68];
};

void Read_Target_Setting_Details(struct Target_Setting_Details* details, FILE* read_file);
void Write_Target_Setting_Details(struct Target_Setting_Details* details, FILE* write_file);
```



















































```cpp
#include <stdio.h>
#include "Picture_Display_Details.h"

void Read_Picture_Display_Details(struct Picture_Display_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 113, read_file);
}

void Write_Picture_Display_Details(struct Picture_Display_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char),113, write_file);
}
```

```cpp
#pragma once

struct Picture_Display_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[113];
};

void Read_Picture_Display_Details(struct Picture_Display_Details* details, FILE* read_file);
void Write_Picture_Display_Details(struct Picture_Display_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Basic_Condition.h"
#include "Key_Condition.h"
#include "Flow.h"

void Read_Flow_Data(struct Flow* flow_data, FILE* read_file) {
	char* temp_str;
	int size;

	fread(&flow_data->start, sizeof(int), 1, read_file);
	fread(&flow_data->id, sizeof(char), 1, read_file);
	fread(&flow_data->group, sizeof(char), 1, read_file);
	fread(&flow_data->test_play_only, sizeof(char), 1, read_file);
	fread(&flow_data->basic_condition_judgment_type, sizeof(char), 1, read_file);
	fread(&flow_data->basic_condition_once_met_always_met, sizeof(char), 1, read_file);
	fread(&flow_data->timing, sizeof(char), 1, read_file);
	fread(&flow_data->target_character_involved_in_timing, sizeof(char), 1, read_file);
	fread(&flow_data->target_number_of_character_involved_in_timing, sizeof(char), 1, read_file);
	fread(&flow_data->ease_of_input_with_multiple_key_conditions, sizeof(char), 1, read_file);
	fread(&flow_data->allow_continuous_execution_by_holding_key, sizeof(char), 1, read_file);

	fread(&flow_data->unknown2, sizeof(int), 1, read_file);

	fread(&flow_data->memo_length, sizeof(int), 1, read_file);
	if(flow_data->memo_length > 1) {
		temp_str = new char[flow_data->memo_length];
		fread(temp_str, sizeof(char), flow_data->memo_length, read_file);
		flow_data->memo = temp_str;
		delete[] temp_str;
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		flow_data->basic_condition_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Basic_Condition_Data(&flow_data->basic_condition_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		flow_data->key_condition_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Key_Condition_Data(&flow_data->key_condition_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		flow_data->command_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Command_Data(&flow_data->command_data[i], read_file);
		}
	}
}

void Write_Flow_Data(struct Flow* flow_data, FILE* write_file) {
	int temp_size;

	fwrite(&flow_data->start, sizeof(int), 1, write_file);
	fwrite(&flow_data->id, sizeof(char), 1, write_file);
	fwrite(&flow_data->group, sizeof(char), 1, write_file);
	fwrite(&flow_data->test_play_only, sizeof(char), 1, write_file);
	fwrite(&flow_data->basic_condition_judgment_type, sizeof(char), 1, write_file);
	fwrite(&flow_data->basic_condition_once_met_always_met, sizeof(char), 1, write_file);
	fwrite(&flow_data->timing, sizeof(char), 1, write_file);
	fwrite(&flow_data->target_character_involved_in_timing, sizeof(char), 1, write_file);
	fwrite(&flow_data->target_number_of_character_involved_in_timing, sizeof(char), 1, write_file);
	fwrite(&flow_data->ease_of_input_with_multiple_key_conditions, sizeof(char), 1, write_file);
	fwrite(&flow_data->allow_continuous_execution_by_holding_key, sizeof(char), 1, write_file);

	fwrite(&flow_data->unknown2, sizeof(int), 1, write_file);

	fwrite(&flow_data->memo_length, sizeof(int), 1, write_file);
	if(flow_data->memo_length > 1) {
		fwrite(flow_data->memo.c_str(), sizeof(char), flow_data->memo_length, write_file);
	}

	temp_size = flow_data->basic_condition_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Basic_Condition_Data(&flow_data->basic_condition_data[i], write_file);
		}
	}

	temp_size = flow_data->key_condition_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Key_Condition_Data(&flow_data->key_condition_data[i], write_file);
		}
	}

	temp_size = flow_data->command_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Command_Data(&flow_data->command_data[i], write_file);
		}
	}
}
```

```cpp
#pragma once
#include <string>
#include <vector>
#include "Basic_Condition.h"
#include "Key_Condition.h"
#include "Command.h"

struct Flow {
	int start;
	char id;
	char group;
	char test_play_only;
	char basic_condition_judgment_type;
	char basic_condition_once_met_always_met;
	char timing;
	char target_character_involved_in_timing;
	char target_number_of_character_involved_in_timing;
	char ease_of_input_with_multiple_key_conditions;
	char allow_continuous_execution_by_holding_key;

	int unknown2;

	int memo_length;
	std::string memo;
	std::vector<Basic_Condition> basic_condition_data;
	std::vector<Key_Condition> key_condition_data;
	std::vector<Command> command_data;
};

void Read_Flow_Data(struct Flow* flow_data, FILE* read_file);
void Write_Flow_Data(struct Flow* flow_data, FILE* write_file);
```

```cpp
#include "Flow_Change_Details.h"

void Read_Flow_Change_Details(struct Flow_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_30, sizeof(char), 30, read_file);

	int size;
	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		details->flow_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Flow_Data(&details->flow_data[i], read_file);
		}
	}
	fread(&details->bytes69_72, sizeof(char), 4, read_file);
	fread(&details->operation, sizeof(int), 1, read_file);
	fread(&details->bytes77_80, sizeof(char), 4, read_file);
}

void Write_Flow_Change_Details(struct Flow_Change_Details* details, FILE * write_file) {
	fwrite(&details->bytes1_30, sizeof(char), 30, write_file);

	int temp_size = details->flow_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Flow_Data(&details->flow_data[i], write_file);
		}
	}
	fwrite(&details->bytes69_72, sizeof(char), 4, write_file);
	fwrite(&details->operation, sizeof(int), 1, write_file);
	fwrite(&details->bytes77_80, sizeof(char), 4, write_file);
}
```

```cpp
#pragma once
#include <vector>
#include "Flow.h"

struct Flow_Change_Details {
	char bytes1_30[30];
	std::vector<Flow> flow_data;
	char bytes69_72[4];
	int operation;
	char bytes77_80[4];
};

void Read_Flow_Change_Details(struct Flow_Change_Details* details, FILE* read_file);
void Write_Flow_Change_Details(struct Flow_Change_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include <stdlib.h>
#include "Flow_Operation_Details.h"

void Read_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* read_file) {
	fread(&details->bytes1_34, sizeof(char), 34, read_file);
	fread(&details->condition_present, sizeof(char), 1, read_file);
	fread(&details->judgment_type, sizeof(char), 1, read_file);
	fread(&details->bytes37_40, sizeof(char), 4, read_file);
	fread(&details->number_of_condition_data, sizeof(int), 1, read_file);
	if (details->number_of_condition_data > 0) {
		details->condition_data.resize(details->number_of_condition_data);
		for (int i = 0; i < details->number_of_condition_data; ++i) {
			Read_Basic_Condition_Data(&details->condition_data[i], read_file);
		}
	}
	fread(&details->bytes45_52, sizeof(char), 8, read_file);
	fread(&details->operation, sizeof(int), 1, read_file);
	fread(&details->target_flow, sizeof(int), 1, read_file);
	fread(&details->id, sizeof(int), 1, read_file);
	fread(&details->target_character, sizeof(int), 1, read_file);
	fread(&details->assign_return_value_to_flow_variable, sizeof(int), 1, read_file);
}

void Write_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_34, sizeof(char), 34, write_file);
	fwrite(&details->condition_present, sizeof(char), 1, write_file);
	fwrite(&details->judgment_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes37_40, sizeof(char), 4, write_file);
	fwrite(&details->number_of_condition_data, sizeof(int), 1, write_file);
	if (details->number_of_condition_data > 0) {
		for (int i = 0; i < details->number_of_condition_data; ++i) {
			Write_Basic_Condition_Data(&details->condition_data[i], write_file);
		}
	}
	fwrite(&details->bytes45_52, sizeof(char), 8, write_file);
	fwrite(&details->operation, sizeof(int), 1, write_file);
	fwrite(&details->target_flow, sizeof(int), 1, write_file);
	fwrite(&details->id, sizeof(int), 1, write_file);
	fwrite(&details->target_character, sizeof(int), 1, write_file);
	fwrite(&details->assign_return_value_to_flow_variable, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once
#include <vector>
#include"Basic_Condition.h"

struct Flow_Operation_Details {
	char bytes1_34[34];
	char condition_present;
	char judgment_type;
	char bytes37_40[4];
	int number_of_condition_data;
	std::vector<Basic_Condition> condition_data;
	char bytes45_52[8];
	int operation;
	int target_flow;
	int id;
	int target_character;
	int assign_return_value_to_flow_variable;
};

void Read_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* read_file);
void Write_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* write_file);
```

```cpp
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
```

```cpp
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
```

```cpp
#include <stdio.h>
#include "Block_Summon_Details.h"

void Read_Block_Summon_Details(struct Block_Summon_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(char), 1, read_file);
	fread(&details->bytes10_30, sizeof(char), 21, read_file);
	fread(&details->count, sizeof(char), 1, read_file);
	fread(&details->formation, sizeof(char), 1, read_file);
	fread(&details->interval, sizeof(short int), 1, read_file);
	fread(&details->number_of_columns, sizeof(short int), 1, read_file);
	fread(&details->column_interval, sizeof(short int), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->direction, sizeof(char), 1, read_file);
	fread(&details->byte41, sizeof(char), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->bytes43_51, sizeof(char), 9, read_file);
	fread(&details->summon_position_offset_x, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_y, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_x_flip, sizeof(char), 1, read_file);
	fread(&details->summon_position_offset_y_flip, sizeof(char), 1, read_file);
	fread(&details->bytes62_66, sizeof(char), 5, read_file);
	fread(&details->faction, sizeof(char), 1, read_file);
	fread(&details->bytes68_88, sizeof(char), 21, read_file);
	fread(&details->existence_time, sizeof(short int), 1, read_file);
	fread(&details->existence_time_present, sizeof(char), 1, read_file);
	fread(&details->bytes92_119, sizeof(char), 28, read_file);
	fread(&details->palette_type, sizeof(char), 1, read_file);
	fread(&details->palette_data_number, sizeof(short int), 1, read_file);
	fread(&details->faction_specification_method, sizeof(char), 1, read_file);
	fread(&details->set_acquired_score_to_0, sizeof(char), 1, read_file);
	fread(&details->direction_flip, sizeof(char), 1, read_file);
	fread(&details->attack, sizeof(char), 1, read_file);
	fread(&details->attack_flow, sizeof(char), 1, read_file);
	fread(&details->bytes128_143, sizeof(char), 16, read_file);
	fread(&details->return_value_to_flow_variable, sizeof(char), 1, read_file);
	fread(&details->bytes145_147, sizeof(char), 3, read_file);
}

void Write_Block_Summon_Details(struct Block_Summon_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(char), 1, write_file);
	fwrite(&details->bytes10_30, sizeof(char), 21, write_file);
	fwrite(&details->count, sizeof(char), 1, write_file);
	fwrite(&details->formation, sizeof(char), 1, write_file);
	fwrite(&details->interval, sizeof(short int), 1, write_file);
	fwrite(&details->number_of_columns, sizeof(short int), 1, write_file);
	fwrite(&details->column_interval, sizeof(short int), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->direction, sizeof(char), 1, write_file);
	fwrite(&details->byte41, sizeof(char), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->bytes43_51, sizeof(char), 9, write_file);
	fwrite(&details->summon_position_offset_x, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_y, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_x_flip, sizeof(char), 1, write_file);
	fwrite(&details->summon_position_offset_y_flip, sizeof(char), 1, write_file);
	fwrite(&details->bytes62_66, sizeof(char), 5, write_file);
	fwrite(&details->faction, sizeof(char), 1, write_file);
	fwrite(&details->bytes68_88, sizeof(char), 21, write_file);
	fwrite(&details->existence_time, sizeof(short int), 1, write_file);
	fwrite(&details->existence_time_present, sizeof(char), 1, write_file);
	fwrite(&details->bytes92_119, sizeof(char), 28, write_file);
	fwrite(&details->palette_type, sizeof(char), 1, write_file);
	fwrite(&details->palette_data_number, sizeof(short int), 1, write_file);
	fwrite(&details->faction_specification_method, sizeof(char), 1, write_file);
	fwrite(&details->set_acquired_score_to_0, sizeof(char), 1, write_file);
	fwrite(&details->direction_flip, sizeof(char), 1, write_file);
	fwrite(&details->attack, sizeof(char), 1, write_file);
	fwrite(&details->attack_flow, sizeof(char), 1, write_file);
	fwrite(&details->bytes128_143, sizeof(char), 16, write_file);
	fwrite(&details->return_value_to_flow_variable, sizeof(char), 1, write_file);
	fwrite(&details->bytes145_147, sizeof(char), 3, write_file);
}
```

```cpp
#pragma once

// same size as character summon, so character summon is used as is
struct Block_Summon_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	short int sound_effect;
	char play_sound_effect_if_outside_screen;
	char animation;
	char bytes10_30[21];
	char count;
	char formation;
	short int interval;
	short int number_of_columns;
	short int column_interval;
	char target;
	char direction;
	char byte41;
	char target;
	char bytes43_51[9];
	int summon_position_offset_x;
	int summon_position_offset_y;
	char summon_position_offset_x_flip;
	char summon_position_offset_y_flip;
	char bytes62_66[5];
	char faction;
	char bytes68_88[21];
	short int existence_time;
	char existence_time_present;
	char bytes92_119[28];
	char palette_type;
	short int palette_data_number;
	char faction_specification_method;
	char set_acquired_score_to_0;
	char direction_flip;
	char attack;
	char attack_flow;
	char bytes128_143[16];
	char return_value_to_flow_variable;
	char bytes145_147[3];
};

void Read_Block_Summon_Details(struct Block_Summon_Details* details, FILE* read_file);
void Write_Block_Summon_Details(struct Block_Summon_Details* details, FILE* write_file);
```

```cpp
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

```

```cpp
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
```

```cpp
#include <stdio.h>
#include "Loop_Details.h"

void Read_Loop_Details(struct Loop_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->repeat_count, sizeof(int), 1, read_file);
	fread(&details->command_count, sizeof(int), 1, read_file);
}

void Write_Loop_Details(struct Loop_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->repeat_count, sizeof(int), 1, write_file);
	fwrite(&details->command_count, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Loop_Details {
	char bytes1_38[38];
	int repeat_count;
	int command_count;
};

void Read_Loop_Details(struct Loop_Details* details, FILE* read_file);
void Write_Loop_Details(struct Loop_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Warp_Details.h"

void Read_Warp_Details(struct Warp_Details* details, FILE* read_file) {
	fread(&details->bytes1_26, sizeof(char), 26, read_file);
	fread(&details->setting_type, sizeof(char), 1, read_file);
	fread(&details->direction, sizeof(char), 1, read_file);
	fread(&details->bytes29_33, sizeof(char), 5, read_file);
	fread(&details->target_x_present, sizeof(char), 1, read_file);
	fread(&details->target_y_present, sizeof(char), 1, read_file);
	fread(&details->target_x_bl, sizeof(short int), 1, read_file);
	fread(&details->target_y_bl, sizeof(short int), 1, read_file);
	fread(&details->target_x_dot, sizeof(short int), 1, read_file);
	fread(&details->target_y_dot, sizeof(short int), 1, read_file);
	fread(&details->target_type, sizeof(char), 1, read_file);
	fread(&details->target_unit, sizeof(char), 1, read_file);
	fread(&details->gigantic_character_coordinate_position, sizeof(char), 1, read_file);
	fread(&details->bytes47_49, sizeof(char), 3, read_file);
	fread(&details->target_x_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->target_y_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->bytes52_59, sizeof(char), 8, read_file);
	fread(&details->distance, sizeof(short int), 1, read_file);
	fread(&details->distance_double, sizeof(short int), 1, read_file);
	fread(&details->bytes64_101, sizeof(char), 38, read_file);
	fread(&details->assign_return_value_to_flow, sizeof(int), 1, read_file);
}

void Write_Warp_Details(struct Warp_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_26, sizeof(char), 26, write_file);
	fwrite(&details->setting_type, sizeof(char), 1, write_file);
	fwrite(&details->direction, sizeof(char), 1, write_file);
	fwrite(&details->bytes29_33, sizeof(char), 5, write_file);
	fwrite(&details->target_x_present, sizeof(char), 1, write_file);
	fwrite(&details->target_y_present, sizeof(char), 1, write_file);
	fwrite(&details->target_x_bl, sizeof(short int), 1, write_file);
	fwrite(&details->target_y_bl, sizeof(short int), 1, write_file);
	fwrite(&details->target_x_dot, sizeof(short int), 1, write_file);
	fwrite(&details->target_y_dot, sizeof(short int), 1, write_file);
	fwrite(&details->target_type, sizeof(char), 1, write_file);
	fwrite(&details->target_unit, sizeof(char), 1, write_file);
	fwrite(&details->gigantic_character_coordinate_position, sizeof(char), 1, write_file);
	fwrite(&details->bytes47_49, sizeof(char), 3, write_file);
	fwrite(&details->target_x_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->target_y_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->bytes52_59, sizeof(char), 8, write_file);
	fwrite(&details->distance, sizeof(short int), 1, write_file);
	fwrite(&details->distance_double, sizeof(short int), 1, write_file);
	fwrite(&details->bytes64_101, sizeof(char), 38, write_file);
	fwrite(&details->assign_return_value_to_flow, sizeof(int), 1, write_file);
}

```

```cpp
#pragma once

struct Warp_Details {
	char bytes1_26[26];
	char setting_type;
	char direction;
	char bytes29_33[5];
	char target_x_present;
	char target_y_present;
	short int target_x_bl;
	short int target_y_bl;
	short int target_x_dot;
	short int target_y_dot;
	char target_type;
	char target_unit;
	char gigantic_character_coordinate_position;
	char bytes47_49[3];
	char target_x_flip_if_facing_right;
	char target_y_flip_if_facing_right;
	char bytes52_59[8];
	short int distance;
	short int distance_double;
	char bytes64_101[38];
	int assign_return_value_to_flow;
};

void Read_Warp_Details(struct Warp_Details* details, FILE* read_file);
void Write_Warp_Details(struct Warp_Details* details, FILE* write_file);
```

```cpp
#include "stdio.h"
#include "World_Chip.h"

void Read_World_Chip(struct World_Chip* world_chip_data, FILE* read_file) {
	int size;
	char *temp_str;
	fread(&world_chip_data->version, sizeof(int), 1, read_file);
	fread(&world_chip_data->graphic, sizeof(int), 1, read_file);
	fread(&world_chip_data->movement_unavailable, sizeof(int), 1, read_file);
	fread(&world_chip_data->unknown1, sizeof(int), 1, read_file);
	fread(&world_chip_data->unknown2, sizeof(int), 1, read_file);
	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		world_chip_data->name = temp_str;
		delete[] temp_str;
	}
	fread(&world_chip_data->unknown3, sizeof(int), 1, read_file);
}

void Write_World_Chip(struct World_Chip* world_chip_data, FILE* write_file) {
	int size;
	fwrite(&world_chip_data->version, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->graphic, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->movement_unavailable, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->unknown1, sizeof(int), 1, write_file);
	fwrite(&world_chip_data->unknown2, sizeof(int), 1, write_file);

	size = world_chip_data->name.size() + 1;
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 1) {
		fwrite(world_chip_data->name.c_str(), sizeof(char), size, write_file);
	}

	fwrite(&world_chip_data->unknown3, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once
#include <string>

struct World_Chip {
	int version;
	int graphic;
	int movement_unavailable;
	int unknown1;
	int unknown2;//fixed at 2?
	std::string name;
	int unknown3;//fixed at 1? (for unused strings?)

};

void Read_World_Chip(struct World_Chip* world_chip_data, FILE* read_file);
void Write_World_Chip(struct World_Chip* world_chip_data, FILE* write_file);
```

```cpp
#include "stdio.h"
#include "World_Map.h"

void Read_World_Map(struct World_Map* world_map_data, FILE* read_file) {
	int size;
	char* temp_str;

	fread(&world_map_data->version, sizeof(int), 1, read_file);
	fread(&world_map_data->unknown1, sizeof(int), 1, read_file);
	fread(&world_map_data->horizontal_width, sizeof(int), 1, read_file);
	fread(&world_map_data->vertical_width, sizeof(int), 1, read_file);
	fread(&world_map_data->vertical_movement_change_amount, sizeof(int), 1, read_file);
	fread(&world_map_data->vertical_movement_change_amount_exponent, sizeof(int), 1, read_file);
	fread(&world_map_data->initial_position_x, sizeof(int), 1, read_file);
	fread(&world_map_data->initial_position_y, sizeof(int), 1, read_file);
	fread(&world_map_data->background_color, sizeof(int), 1, read_file);
	fread(&world_map_data->unknown2, sizeof(int), 1, read_file);
	fread(&world_map_data->unknown3, sizeof(int), 1, read_file);

	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		world_map_data->unknown4 = temp_str;
		delete[] temp_str;
	}

	fread(&world_map_data->unknown5, sizeof(int), 1, read_file);

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->world_chip_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_World_Chip(&world_map_data->world_chip_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->map_chip_data.resize(size);
		for (int i = 0; i < size; ++i) {
			fread(&world_map_data->map_chip_data[i], sizeof(int), 1, read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->event_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Event(&world_map_data->event_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		world_map_data->event_template_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Event(&world_map_data->event_template_data[i], read_file);
		}
	}

}

void Write_World_Map(struct World_Map* world_map_data, FILE* write_file) {
	int size;

	fwrite(&world_map_data->version, sizeof(int), 1, write_file);
	fwrite(&world_map_data->unknown1, sizeof(int), 1, write_file);
	fwrite(&world_map_data->horizontal_width, sizeof(int), 1, write_file);
	fwrite(&world_map_data->vertical_width, sizeof(int), 1, write_file);
	fwrite(&world_map_data->vertical_movement_change_amount, sizeof(int), 1, write_file);
	fwrite(&world_map_data->vertical_movement_change_amount_exponent, sizeof(int), 1, write_file);
	fwrite(&world_map_data->initial_position_x, sizeof(int), 1, write_file);
	fwrite(&world_map_data->initial_position_y, sizeof(int), 1, write_file);
	fwrite(&world_map_data->background_color, sizeof(int), 1, write_file);
	fwrite(&world_map_data->unknown2, sizeof(int), 1, write_file);
	fwrite(&world_map_data->unknown3, sizeof(int), 1, write_file);

	size = world_map_data->unknown4.size() + 1;
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 1) {
		fwrite(world_map_data->unknown4.c_str(), sizeof(char), size, write_file);
	}

	fwrite(&world_map_data->unknown5, sizeof(int), 1, write_file);

	size = world_map_data->world_chip_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_World_Chip(&world_map_data->world_chip_data[i], write_file);
		}
	}

	size = world_map_data->map_chip_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			fwrite(&world_map_data->map_chip_data[i], sizeof(int), 1, write_file);
		}
	}

	size = world_map_data->event_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_Event(&world_map_data->event_data[i], write_file);
		}
	}

	size = world_map_data->event_template_data.size();
	fwrite(&size, sizeof(int), 1, write_file);
	if (size > 0) {
		for (int i = 0; i < size; ++i) {
			Write_Event(&world_map_data->event_template_data[i], write_file);
		}
	}

}
```

```cpp
#pragma once
#include <vector>
#include "World_Chip.h"
#include "Event.h"

struct World_Map {
	int version;
	int unknown1;
	int horizontal_width;
	int vertical_width;
	int vertical_movement_change_amount;//how much the position value changes when moving vertically
	int vertical_movement_change_amount_exponent;
	int initial_position_x;
	int initial_position_y;
	int background_color;
	int unknown2;//background image and path specification (4 bytes if none)
	int unknown3;//fixed at 2. number of strings?
	std::string unknown4;
	int unknown5;//fixed at 1?
	std::vector<World_Chip> world_chip_data;
	std::vector<int> map_chip_data;
	std::vector<Event> event_data;
	std::vector<Event> event_template_data;
};

void Read_World_Map(struct World_Map* world_map_data, FILE* read_file);
void Write_World_Map(struct World_Map* world_map_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Circular_Movement_Details.h"

void Read_Circular_Movement_Details(struct Circular_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_101, sizeof(char), 96, read_file);
}

void Write_Circular_Movement_Details(struct Circular_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_101, sizeof(char), 96, write_file);
}
```

```cpp
#pragma once

struct Circular_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Circular_Movement_Details(struct Circular_Movement_Details* details, FILE* read_file);
void Write_Circular_Movement_Details(struct Circular_Movement_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Sound_Effect_Playback_Details.h"

void Read_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* read_file) {
	fread(&details->bytes1_7, sizeof(char), 7, read_file);
	fread(&details->play_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->bytes9_38, sizeof(char), 30, read_file);
	fread(&details->sound_effect, sizeof(int), 1, read_file);
}

void Write_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_7, sizeof(char), 7, write_file);
	fwrite(&details->play_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->bytes9_38, sizeof(char), 30, write_file);
	fwrite(&details->sound_effect, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Sound_Effect_Playback_Details {
	char bytes1_7[7];
	char play_if_outside_screen;
	char bytes9_38[30];
	int sound_effect;
};

void Read_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* read_file);
void Write_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* write_file);
```

```cpp
#include "Sound_Effect_Database.h"

void Read_Sound_Effect_Database(struct Sound_Effect_Database* database) {
	int temp_size;
	char* temp_str;

	FILE* read_file = fopen("data/database/Sound.dat", "rb");
	if (read_file != NULL) {
		fread(&database->version, sizeof(int), 1, read_file);
		fread(&database->number_of_records, sizeof(int), 1, read_file);
		if (database->number_of_records > 0) {
			database->records.resize(database->number_of_records);
			for (int i = 0; i < database->records.size(); ++i) {
				fread(&database->records[i].start, sizeof(int), 1, read_file);
				fread(&database->records[i].same_as_file_name, sizeof(int), 1, read_file);
				fread(&database->records[i].number_of_strings, sizeof(int), 1, read_file);
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].name = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].path = temp_str;
					delete[] temp_str;
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Sound_Effect_Database(struct Sound_Effect_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/Sound.dat", "wb");
	if (write_file != NULL) {
		fwrite(&database->version, sizeof(int), 1, write_file);
		fwrite(&database->number_of_records, sizeof(int), 1, write_file);
		if (database->number_of_records > 0) {
			for (int i = 0; i < database->records.size(); ++i) {
				fwrite(&database->records[i].start, sizeof(int), 1, write_file);
				fwrite(&database->records[i].same_as_file_name, sizeof(int), 1, write_file);
				fwrite(&database->records[i].number_of_strings, sizeof(int), 1, write_file);
				temp_size = database->records[i].name.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].name.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].path.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].path.c_str(), sizeof(char), temp_size, write_file);
				}
			}
		}
		fclose(write_file);
	}
}
```

```cpp
#pragma once

#include <vector>
#include <string>

struct Sound_Effect_Record {
	int start; //1
	int same_as_file_name;
	int number_of_strings;//2 for name and path
	std::string name;
	std::string path;
};

struct Sound_Effect_Database {
	int version;
	int number_of_records;
	std::vector<Sound_Effect_Record> records;//[0] is not used
};

void Read_Sound_Effect_Database(struct Sound_Effect_Database* database);
void Write_Sound_Effect_Database(struct Sound_Effect_Database* database);
```

```cpp
#include <stdio.h>
#include "Direction_Change_Details.h"

void Read_Direction_Change_Details(struct Direction_Change_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes6_42, sizeof(char), 37, read_file);
}

void Write_Direction_Change_Details(struct Direction_Change_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes6_42, sizeof(char), 37, write_file);
}
```

```cpp
#pragma once

struct Direction_Change_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_42[37];
};

void Read_Direction_Change_Details(struct Direction_Change_Details* details, FILE* read_file);
void Write_Direction_Change_Details(struct Direction_Change_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Ground_Movement_Details.h"

void Read_Ground_Movement_Details(struct Ground_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_101, sizeof(char), 96, read_file);
}

void Write_Ground_Movement_Details(struct Ground_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_101, sizeof(char), 96, write_file);
}
```

```cpp
#pragma once

struct Ground_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Ground_Movement_Details(struct Ground_Movement_Details* details, FILE* read_file);
void Write_Ground_Movement_Details(struct Ground_Movement_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Basic_Animation_Set_Change_Details.h"

void Read_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->animation_set, sizeof(int), 1, read_file);
}

void Write_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->animation_set, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Basic_Animation_Set_Change_Details {
	char bytes1_38[38];
	int animation_set;
};

void Read_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* read_file);
void Write_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Basic_Condition.h"

void Read_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* read_file) {
	fread(&basic_condition_data->start, sizeof(int), 1, read_file);
	fread(&basic_condition_data->type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_constant, sizeof(int), 1, read_file);
	fread(&basic_condition_data->right_side_random_lower_limit, sizeof(int), 1, read_file);
	fread(&basic_condition_data->right_side_random_upper_limit, sizeof(int), 1, read_file);
	fread(&basic_condition_data->left_side_status_target, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_status_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_common_variable_or_stage_variable, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_variable_number, sizeof(short int), 1, read_file);
	fread(&basic_condition_data->left_side_flow_variable_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_status_target, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_status_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_common_variable_or_stage_variable, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_variable_number, sizeof(short int), 1, read_file);
	fread(&basic_condition_data->right_side_flow_variable_number, sizeof(char), 1, read_file);
	fread(&basic_condition_data->how_to_compare, sizeof(char), 1, read_file);
	fread(&basic_condition_data->specify_in_percent, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_coordinate_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_coordinate_type, sizeof(char), 1, read_file);
	fread(&basic_condition_data->left_side_gigantic_character_coordinate_position, sizeof(char), 1, read_file);
	fread(&basic_condition_data->right_side_gigantic_character_coordinate_position, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte38, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte39, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte40, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte41, sizeof(char), 1, read_file);
	fread(&basic_condition_data->byte42, sizeof(char), 1, read_file);
}

void Write_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* write_file) {
	fwrite(&basic_condition_data->start, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_constant, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->right_side_random_lower_limit, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->right_side_random_upper_limit, sizeof(int), 1, write_file);
	fwrite(&basic_condition_data->left_side_status_target, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_status_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_common_variable_or_stage_variable, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_variable_number, sizeof(short int), 1, write_file);
	fwrite(&basic_condition_data->left_side_flow_variable_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_status_target, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_status_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_common_variable_or_stage_variable, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_variable_number, sizeof(short int), 1, write_file);
	fwrite(&basic_condition_data->right_side_flow_variable_number, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->how_to_compare, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->specify_in_percent, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_coordinate_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_coordinate_type, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->left_side_gigantic_character_coordinate_position, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->right_side_gigantic_character_coordinate_position, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte38, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte39, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte40, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte41, sizeof(char), 1, write_file);
	fwrite(&basic_condition_data->byte42, sizeof(char), 1, write_file);
}
```

```cpp
#pragma once

struct Basic_Condition {
	int start;//17 00 00 00
	char type;
	int right_side_constant;
	int right_side_random_lower_limit;
	int right_side_random_upper_limit;
	char left_side_status_target;
	char left_side_status_number;//range display color for distance condition
	char left_side_type;//range display presence/absence for distance condition
	char left_side_common_variable_or_stage_variable;
	short int left_side_variable_number;
	char left_side_flow_variable_number;
	char right_side_type;//display even if self not present for distance condition
	char right_side_status_target;//display even if self transparent for distance condition
	char right_side_status_number;
	char right_side_common_variable_or_stage_variable;
	short int right_side_variable_number;//distance in dot for distance condition
	char right_side_flow_variable_number;
	char how_to_compare;
	char specify_in_percent;
	char left_side_coordinate_type;
	char right_side_coordinate_type;
	char left_side_gigantic_character_coordinate_position;
	char right_side_gigantic_character_coordinate_position;
	char byte38;
	char byte39;
	char byte40;
	char byte41;
	char byte42;
};

void Read_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* read_file);
void Write_Basic_Condition_Data(struct Basic_Condition* basic_condition_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Disappearance_Details.h"

void Read_Disappearance_Details(struct Disappearance_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->target, sizeof(int), 1, read_file);
	fread(&details->faction, sizeof(int), 1, read_file);
	fread(&details->range, sizeof(int), 1, read_file);
	fread(&details->assign_return_value_to_flow_variable, sizeof(int), 1, read_file);
}

void Write_Disappearance_Details(struct Disappearance_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->target, sizeof(int), 1, write_file);
	fwrite(&details->faction, sizeof(int), 1, write_file);
	fwrite(&details->range, sizeof(int), 1, write_file);
	fwrite(&details->assign_return_value_to_flow_variable, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Disappearance_Details {
	char bytes1_38[38];
	int target;
	int faction;
	int range;
	int assign_return_value_to_flow_variable;
};

void Read_Disappearance_Details(struct Disappearance_Details* details, FILE* read_file);
void Write_Disappearance_Details(struct Disappearance_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Screen_Color_Change_Details.h"

void Read_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->r, sizeof(int), 1, read_file);
	fread(&details->g, sizeof(int), 1, read_file);
	fread(&details->b, sizeof(int), 1, read_file);
	fread(&details->percent, sizeof(int), 1, read_file);
	fread(&details->restore_to_original_color, sizeof(int), 1, read_file);
	fread(&details->time_required_for_change, sizeof(int), 1, read_file);
	fread(&details->instant_display, sizeof(int), 1, read_file);
	fread(&details->instant_display_count, sizeof(int), 1, read_file);
}

void Write_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->r, sizeof(int), 1, write_file);
	fwrite(&details->g, sizeof(int), 1, write_file);
	fwrite(&details->b, sizeof(int), 1, write_file);
	fwrite(&details->percent, sizeof(int), 1, write_file);
	fwrite(&details->restore_to_original_color, sizeof(int), 1, write_file);
	fwrite(&details->time_required_for_change, sizeof(int), 1, write_file);
	fwrite(&details->instant_display, sizeof(int), 1, write_file);
	fwrite(&details->instant_display_count, sizeof(int), 1, write_file);
}

```

```cpp
#pragma once

struct Screen_Color_Change_Details {
	char bytes1_38[38];
	int r;
	int g;
	int b;
	int percent;
	int restore_to_original_color;
	int time_required_for_change;
	int instant_display;
	int instant_display_count;
};

void Read_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* read_file);
void Write_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Screen_Effect_Execution_Details.h"

void Read_Screen_Effect_Execution_Details(struct Screen_Effect_Execution_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->effect, sizeof(int), 1, read_file);
	fread(&details->execution_type, sizeof(int), 1, read_file);
	fread(&details->loop_execution, sizeof(int), 1, read_file);
}

void Write_Screen_Effect_Execution_Details(struct Screen_Effect_Execution_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->effect, sizeof(int), 1, write_file);
	fwrite(&details->execution_type, sizeof(int), 1, write_file);
	fwrite(&details->loop_execution, sizeof(int), 1, write_file);
}
```

```cpp
#pragma once

struct Screen_Effect_Execution_Details {
	char bytes1_38[38];
	int effect;
	int execution_type;
	int loop_execution;
};

void Read_Screen_Effect_Execution_Details(struct Screen_Effect_Execution_Details* details, FILE* read_file);
void Write_Screen_Effect_Execution_Details(struct Screen_Effect_Execution_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Screen_Outside_Avoidance_Movement_Details.h"

void Read_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_101, sizeof(char), 96, read_file);
}

void Write_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_101, sizeof(char), 96, write_file);
}
```

```cpp
#pragma once

struct Screen_Outside_Avoidance_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* read_file);
void Write_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Linear_Movement_Details.h"

void Read_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_8, sizeof(char), 3, read_file);
	fread(&details->animation_and_other_type, sizeof(short int), 1, read_file);
	fread(&details->bytes11_26, sizeof(char), 16, read_file);
	fread(&details->movement_direction_setting_type, sizeof(char), 1, read_file);
	fread(&details->movement_direction_direction, sizeof(char), 1, read_file);
	fread(&details->movement_direction_angle, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_angle_double, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_angle_reverse_rotation_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_x_present, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_y_present, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_x, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_y, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_x_dot, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_y_dot, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_type, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_coordinate_unit, sizeof(char), 1, read_file);
	fread(&details->byte46, sizeof(char), 1, read_file);
	fread(&details->movement_direction_execute_until_target_coordinate_reached, sizeof(char), 1, read_file);
	fread(&details->movement_direction_invalidate_horizontal_movement, sizeof(char), 1, read_file);
	fread(&details->movement_direction_invalidate_vertical_movement, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_x_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_y_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->movement_direction_reverse_speed_if_direction_changes, sizeof(char), 1, read_file);
	fread(&details->movement_direction_prevent_blur, sizeof(char), 1, read_file);
	fread(&details->movement_direction_dont_change_character_direction, sizeof(char), 1, read_file);
	fread(&details->time_speed_distance_setting_type, sizeof(char), 1, read_file);
	fread(&details->time_speed_distance_speed, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_speed_double, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_distance, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_distance_double, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_distance_unit, sizeof(char), 1, read_file);
	fread(&details->bytes65_68, sizeof(char), 4, read_file);
	fread(&details->inertia_present, sizeof(char), 1, read_file);
	fread(&details->inertia_max_speed, sizeof(short int), 1, read_file);
	fread(&details->inertia_speed_correction_on_direction_change, sizeof(double), 1, read_file);
	fread(&details->animation_type, sizeof(char), 1, read_file);
	fread(&details->bytes81_101, sizeof(char), 21, read_file);
}

void Write_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_8, sizeof(char), 3, write_file);
	fwrite(&details->animation_and_other_type, sizeof(short int), 1, write_file);
	fwrite(&details->bytes11_26, sizeof(char), 16, write_file);
	fwrite(&details->movement_direction_setting_type, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_direction, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_angle, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_angle_double, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_angle_reverse_rotation_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_x_present, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_y_present, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_x, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_y, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_x_dot, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_y_dot, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_type, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_coordinate_unit, sizeof(char), 1, write_file);
	fwrite(&details->byte46, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_execute_until_target_coordinate_reached, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_invalidate_horizontal_movement, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_invalidate_vertical_movement, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_x_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_y_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_reverse_speed_if_direction_changes, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_prevent_blur, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_dont_change_character_direction, sizeof(char), 1, write_file);
	fwrite(&details->time_speed_distance_setting_type, sizeof(char), 1, write_file);
	fwrite(&details->time_speed_distance_speed, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_speed_double, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_distance, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_distance_double, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_distance_unit, sizeof(char), 1, write_file);
	fwrite(&details->bytes65_68, sizeof(char), 4, write_file);
	fwrite(&details->inertia_present, sizeof(char), 1, write_file);
	fwrite(&details->inertia_max_speed, sizeof(short int), 1, write_file);
	fwrite(&details->inertia_speed_correction_on_direction_change, sizeof(double), 1, write_file);
	fwrite(&details->animation_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes81_101, sizeof(char), 21, write_file);
}
```

```cpp
#pragma once

struct Linear_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_8[3];
	short int animation_and_other_type;
	char bytes11_26[16];
	char movement_direction_setting_type;
	char movement_direction_direction;
	short int movement_direction_angle;
	short int movement_direction_angle_double;
	char movement_direction_angle_reverse_rotation_if_facing_right;
	char movement_direction_target_x_present;
	char movement_direction_target_y_present;
	short int movement_direction_target_x;
	short int movement_direction_target_y;
	short int movement_direction_target_x_dot;
	short int movement_direction_target_y_dot;
	char movement_direction_target_type;
	char movement_direction_target_coordinate_unit; //0: bl 1: dot
	char byte46;
	char movement_direction_execute_until_target_coordinate_reached;
	char movement_direction_invalidate_horizontal_movement;
	char movement_direction_invalidate_vertical_movement;
	char movement_direction_target_x_flip_if_facing_right;
	char movement_direction_target_y_flip_if_facing_right;
	char movement_direction_reverse_speed_if_direction_changes;
	char movement_direction_prevent_blur;
	char movement_direction_dont_change_character_direction;
	char time_speed_distance_setting_type;
	short int time_speed_distance_speed;
	short int time_speed_distance_speed_double;
	short int time_speed_distance_distance;
	short int time_speed_distance_distance_double;
	char time_speed_distance_distance_unit;
	char bytes65_68[4];
	char inertia_present;
	short int inertia_max_speed;
	double inertia_speed_correction_on_direction_change;
	char animation_type;
	char bytes81_101[21];
};

void Read_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* read_file);
void Write_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Movement_Invalidation_Details.h"

void Read_Movement_Invalidation_Details(struct Movement_Invalidation_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_101, sizeof(char), 96, read_file);
}

void Write_Movement_Invalidation_Details(struct Movement_Invalidation_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_101, sizeof(char), 96, write_file);
}
```

```cpp
#pragma once

struct Movement_Invalidation_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Movement_Invalidation_Details(struct Movement_Invalidation_Details* details, FILE* read_file);
void Write_Movement_Invalidation_Details(struct Movement_Invalidation_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Charge_Movement_Details.h"

void Read_Charge_Movement_Details(struct Charge_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_101, sizeof(char), 96, read_file);
}

void Write_Charge_Movement_Details(struct Charge_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_101, sizeof(char), 96, write_file);
}
```

```cpp
#pragma once

struct Charge_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Charge_Movement_Details(struct Charge_Movement_Details* details, FILE* read_file);
void Write_Charge_Movement_Details(struct Charge_Movement_Details* details, FILE* write_file);
```

```cpp
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
```

```cpp
#pragma once
#include "stdio.h"
#include <string>

struct Background {
	int start;
	int display_from_start;
	int specified_by_color;
	int color_number;
	int display_in_front_of_character;
	double horizontal_scroll_speed;
	double vertical_scroll_speed;
	int horizontal_auto_scroll;
	int vertical_auto_scroll;
	double horizontal_auto_scroll_speed;
	double vertical_auto_scroll_speed;
	char bytes61_80[20];
	int image_path_length;
	std::string image_path;
};

void Read_Background(struct Background* background_data, FILE* read_file);
void Write_Background(struct Background* background_data, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Background_Change_Details.h"

void Read_Background_Change_Details(struct Background_Change_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 41, read_file);
}

void Write_Background_Change_Details(struct Background_Change_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char), 41, write_file);
}
```

```cpp
#pragma once

struct Background_Change_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[41];
};

void Read_Background_Change_Details(struct Background_Change_Details* details, FILE* read_file);
void Write_Background_Change_Details(struct Background_Change_Details* details, FILE* write_file);
```

```cpp
#include <stdio.h>
#include "Guided_Movement_Details.h"

void Read_Guided_Movement_Details(struct Guided_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_101, sizeof(char), 96, read_file);
}

void Write_Guided_Movement_Details(struct Guided_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_101, sizeof(char), 96, write_file);
}
```

```cpp
#pragma once

struct Guided_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Guided_Movement_Details(struct Guided_Movement_Details* details, FILE* read_file);
void Write_Guided_Movement_Details(struct Guided_Movement_Details* details, FILE* write_file);
```