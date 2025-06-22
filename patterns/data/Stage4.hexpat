struct StdString {
    u32 length;
    if (length > 1) { // A length of 1 means an empty string "" with a null char.
        char data[length] [[color("9370DB")]];
    }
};

struct DeathFade {
    u32 list_size; // std::vector<int>
    // List items :
    
    // Checkboxes
    u32 auto_dissapear_left;
    u32 auto_dissapear_right;
    u32 auto_dissapear_top;
    u32 auto_dissapear_bottom;
    
    // Values, like 10 or 5
    u32 disappear_left_range;
    u32 disappear_right_range;
    u32 disappear_top_range;
    u32 disappear_bottom_range;
    // Null terminator
    u32 block_end;
};

struct PlayerCollision {
    u32 walking_block_width;
    u32 walking_block_height;
    
    u32 flying_block_width;
    u32 flying_block_height;
    
    u32 walking_character_width;
    u32 walking_character_height;
    
    u32 flying_character_width;
    u32 flying_character_height;
    
    // In the two following are inverted
    u32 shot_width;
    u32 shot_height;
    
    u32 item_width;
    u32 item_height;
    
    // Positions modes
    u32 walking_block_position;
    u32 flying_block_position;
    u32 walking_character_position;
    u32 flying_character_position;
    
    // Dropdown - show, hide, border_only
    u32 block_display;
    u32 character_display;
    u32 shot_display;
    u32 item_display;
    
    // Colors  - blue_purple, red_green, blue_yellow, purple, blue, black_rainbow
    u32 block_display_color;
    u32 character_display_color;
    u32 shot_display_color;
    u32 item_display_color;
};

struct EnemyCollision {
    u32 walking_block_width;
    u32 walking_block_height;
    
    u32 flying_block_width;
    u32 flying_block_height;
    
    u32 walking_character_width;
    u32 walking_character_height;
    
    u32 flying_character_width;
    u32 flying_character_height;
    
    u32 shot_width;
    u32 shot_height;
    
    // Dropdown - bottom, center
    u32 walking_block_position;
    u32 flying_block_position;
    u32 walking_character_position;
    u32 flying_character_position;
};

struct ActorHitbox {
    // Actors have special hitbox for enemies and bullets (shot)
    u32 shot_width;
    u32 shot_height;
    
    u32 character_width;
    u32 character_height;
};


struct BasicCondition {
    u32 header; // 17
    u8 type;
    
    u32 right_side_constant;
	u32 right_side_random_lower_limit;
	u32 right_side_random_upper_limit;
	u8 left_side_status_target;
	u8 left_side_status_number;//range display color for distance condition
	u8 left_side_type;//range display presence/absence for distance condition
	u8 left_side_common_variable_or_stage_variable;
	u16 left_side_variable_number;
	u8 left_side_flow_variable_number;
	u8 right_side_type;//display even if self not present for distance condition
	u8 right_side_status_target;//display even if self transparent for distance condition
	u8 right_side_status_number;
	u8 right_side_common_variable_or_stage_variable;
	u16 right_side_variable_number;//distance in dot for distance condition
	u8 right_side_flow_variable_number;
	u8 how_to_compare;
	u8 specify_in_percent;
	u8 left_side_coordinate_type;
	u8 right_side_coordinate_type;
	u8 left_side_gigantic_character_coordinate_position;
	u8 right_side_gigantic_character_coordinate_position;
	
    u8 unk1;
	u8 unk2;
	u8 unk3;
	u8 unk4;
	u8 unk5;  
    
};

struct KeyCondition {
    u32 header; // 5
	u8 right_and_left_to_front_and_back;
	u16 minimum_input_time;
	u16 maximum_input_time;
	u8 input_time_1_to_infinity;
	u8 judgment_type;
	u8 unknown;
	u8 number_of_key_data;
	u8 direction_key_neutral;
	u8 left_key;
	u8 right_key;
	u8 up_key;
	u8 down_key;
	u8 up_left_key;
	u8 down_left_key;
	u8 up_right_key;
	u8 down_right_key;
	u8 any_direction_key;
	u8 action_key_neutral;
	u8 z_key;
	u8 x_key;
	u8 c_key;
	u8 v_key;
	u8 a_key;
	u8 s_key;
	u8 d_key;
	u8 f_key;
};

struct WaitDetails {
    u16 execution_time;
	u16 execution_time_double;
	u8 parallel_execution;
	char bytes[33];
};

struct LinearMovementDetails {
    u16 execution_time;
	u16 execution_time_double;
	u8 parallel_execution;
	char bytes6_8[3];
	u16 animation_and_other_type;
	char bytes11_26[16];
	u8 movement_direction_setting_type;
	u8 movement_direction_direction;
	u16 movement_direction_angle;
	u16 movement_direction_angle_double;
	u8 movement_direction_angle_reverse_rotation_if_facing_right;
	u8 movement_direction_target_x_present;
	u8 movement_direction_target_y_present;
	u16 movement_direction_target_x;
	u16 movement_direction_target_y;
	u16 movement_direction_target_x_dot;
	u16 movement_direction_target_y_dot;
	u8 movement_direction_target_type;
	u8 movement_direction_target_coordinate_unit; //0: bl 1: dot
	char byte46;
	u8 movement_direction_execute_until_target_coordinate_reached;
	u8 movement_direction_invalidate_horizontal_movement;
	u8 movement_direction_invalidate_vertical_movement;
	u8 movement_direction_target_x_flip_if_facing_right;
	u8 movement_direction_target_y_flip_if_facing_right;
	u8 movement_direction_reverse_speed_if_direction_changes;
	u8 movement_direction_prevent_blur;
	u8 movement_direction_dont_change_character_direction;
	u8 time_speed_distance_setting_type;
	u16 time_speed_distance_speed;
	u16 time_speed_distance_speed_double;
	u16 time_speed_distance_distance;
	u16 time_speed_distance_distance_double;
	u8 time_speed_distance_distance_unit;
	char bytes65_68[4];
	u8 inertia_present;
	u16 inertia_max_speed;
	double inertia_speed_correction_on_direction_change;
	u8 animation_type;
	char bytes81_101[21];
};

struct JumpDetails {
	char bytes1_5[5];
	u16 sound_effect;
	u8 play_if_outside_screen;
	u16 animation;
	char bytes11_38[28];
	u32 jump_type;
	u32 max_jump_inertial_movement_speed;
	u32 max_jump_height;
	u32 min_jump_inertial_movement_speed;
	u32 min_jump_height;
};

struct SwordDetails {
	u32 execution_time;
	u8 parallel_execution;
	u16 sound_effect;
	u8 play_if_outside_screen;
	u16 animation;
	char bytes11_63[53];
	u8 z_coordinate;
	u8 transparency;
	u8 faction_same_as_user;
	u16 faction;
	u16 gigantic;
	u32 sword_type;
	char bytes75_104[30];
	u32 power;
	char bytes109_110[2];
	u8 impact;
	u16 effect;
	u8 acquired_item_palette_type;
	u16 acquired_item_palette_number;
	char bytes117_125[9];
	u8 attack;
	u8 attack_id;
	char bytes128_143[16];
};

struct Command {
    u32 header; // 8
    u8 unk1;
	u8 type;

    if (type == 1) WaitDetails details;
    if (type == 2) LinearMovementDetails details;
    // if (type == 3) GroundMovementDetails details;
	// if (type == 4) CircularMovementDetails details;
	// if (type == 5) ChargeMovementDetails details;
	// if (type == 6) GuidedMovementDetails details;
	// if (type == 7) ScreenOutsideAvoidanceMovementDetails details;
	// if (type == 8) MovementInvalidationDetails details;
	// if (type == 9) DirectionChangeDetails details;
	if (type == 10) JumpDetails details;
	// if (type == 11) ShotDetails details;
	if (type == 12) SwordDetails details;
	// if (type == 13) BlockSummonDetails details;
	// if (type == 14) CharacterSummonDetails details;
	// if (type == 15) ItemSummonDetails details;
	// if (type == 16) FlowOperationDetails details;
	// if (type == 17) StageClearDetails details;
	// if (type == 18) GameWaitDetails details;
	// if (type == 19) MessageDetails details;
	// if (type == 20) WarpDetails details;
	// if (type == 21) TargetSettingDetails details;
	// if (type == 22) StatusOperationDetails details;
	// if (type == 23) StatusOperation2Details details;
	// if (type == 24) DisappearanceDetails details;
	// if (type == 25) ItemAcquisitionDetails details;
	// if (type == 26) GraphicChangeDetails details;
	// if (type == 27) BasicAnimationSetChangeDetails details;
	// if (type == 28) AnimationExecutionDetails details;
	// if (type == 29) EffectExecutionDetails details;
	// if (type == 30) CharacterEffectExecutionDetails details;
	// if (type == 31) ScreenEffectExecutionDetails details;
	// if (type == 32) PictureDisplayDetails details;
	// if (type == 33) ScreenColorChangeDetails details;
	// if (type == 34) BackgroundChangeDetails details;
	// if (type == 35) SoundEffectPlaybackDetails details;
	// if (type == 36) BGMPlaybackDetails details;
	// if (type == 37) CodeExecutionDetails details;
	// if (type == 38) ArrangementDetails details;
	// if (type == 39) LoopDetails details;
};

struct ItemEffect {
    u32 header; // 8
    char unk1;
	u8 type;

    // if (type == 1) FlowChangeDetails details;
	// if (type == 2) StageClearDetails details;
	// if (type == 3) GameWaitDetails details;
	// if (type == 4) MessageDetails details;
	// if (type == 5) WarpDetails details;
	// if (type == 6) TargetSettingDetails details;
	// if (type == 7) StatusOperationDetails details;
	// if (type == 8) StatusOperation2Details details;
	// if (type == 9) DisappearanceDetails details;
	// if (type == 10) ItemAcquisitionDetails details;
	// if (type == 11) GraphicChangeDetails details;
	// if (type == 12) BasicAnimationSetChangeDetails details;
	// if (type == 13) AnimationExecutionDetails details;
	// if (type == 14) EffectExecutionDetails details;
	// if (type == 15) CharacterEffectExecutionDetails details;
	// if (type == 16) ScreenEffectExecutionDetails details;
	// if (type == 17) PictureDisplayDetails details;
	// if (type == 18) ScreenColorChangeDetails details;
	// if (type == 19) BackgroundChangeDetails details;
	// if (type == 20) SoundEffectPlaybackDetails details;
	// if (type == 21) BGMPlaybackDetails details;
	// if (type == 22) CodeExecutionDetails details;
	// if (type == 23) ArrangementDetails details;
	// if (type == 24) LoopDetails details;

};

struct Block {
    u32 header; // 12
    u8 inherit_palette;
    u16 inherit_palette_data;
    
	u8 any_of_appearance_conditions_true;
	u8 appearance_condition_once_met_always_true;
    
    u16 image_number;
    u16 image_type;
    
    u8 unknown1;
	u8 in_front_of_character;

    u8 transparency;
	u8 mark_display; //0:don't display 1:display 2:display only in editor
	u8 mark_number;

	u8 unknown2;

	u8 block_type; //0:no collision 1:collision 2:instant death on collision
	u8 invalid_faction; //255 if none, the faction number if present
	u8 action;
	u32 action_parameter;
	u8 acquired_item_palette;
	u16 acquired_item_palette_data_number;
	u8 block_summon_invalid;

    u32 strings_count; // 1 - std::vector<std::string>
    StdString name;
    
    s16 position_x;
    s16 position_y;
    
    u32 inherited_data_count; // 11 - std::vector<u8>
    u8 inherit_block_name            [[color("907060")]];
    u8 inherit_appearance_condition  [[color("907060")]];
    u8 inherit_image                 [[color("907060")]];
    u8 inherit_in_front_of_character [[color("907060")]];
    u8 inherit_transparency          [[color("907060")]];
    u8 inherit_mark                  [[color("907060")]];
    u8 inherit_block_type            [[color("907060")]];
    u8 inherit_invalid_faction       [[color("907060")]];
    u8 inherit_action                [[color("907060")]];
    u8 inherit_acquired_item         [[color("907060")]];
    u8 inherit_block_summon          [[color("907060")]];
    
    u32 display_conditions_count; // 2 - std::vector<BasicCondition>
    BasicCondition display_conditions[display_conditions_count];
    
};

struct Flow {
    u32 header;
	u8 id;
	u8 group;
	u8 test_play_only;
	u8 basic_condition_judgment_type;
	u8 basic_condition_once_met_always_met;
	u8 timing;
	u8 target_character_involved_in_timing;
	u8 target_number_of_character_involved_in_timing;
	u8 ease_of_input_with_multiple_key_conditions;
	u8 allow_continuous_execution_by_holding_key;

	// u32 unknown2;

	// u32 memo_length;
    StdString memo;

    // std::vector<BasicCondition>
    u32 appearance_condition_count;
    if (appearance_condition_count > 0) {
        BasicCondition conditions[appearance_condition_count];
    }

    // std::vector<KeyCondition>
    u32 key_condition_count;
    if (key_condition_count > 0) {
        KeyCondition key_conditions[key_condition_count];
    }

    // std::vector<Command>
    u32 command_count;
    if (command_count > 0) {
        Command commands[command_count];
    }
};


struct Character {
    u32 header; // 35

    u8 inherit_palette;
	u16 inherit_palette_data_number;

	u8 any_of_appearance_conditions_true;
	u8 appearance_condition_once_met_always_true;
	u8 facing_right;
	u8 number_of_doubles;
	u16 appearance_position_offset_x_bl;
	u16 appearance_position_offset_x_dot;
	u16 appearance_position_offset_y_bl;
	u16 appearance_position_offset_y_dot;
	u8 appearance_position_offset_x_flip_if_facing_right;
	u8 appearance_position_offset_y_flip_if_facing_right;

	u16 image_number;
	u8 image_type;
	u16 image_offset;
	u16 animation_set;
	u8 z_coordinate;
	u8 transparency;
	u16 initial_character_effect;
	u8 initial_character_effect_execution_type;
	u8 initial_character_effect_loop_execution;
	u16 character_effect_on_death;
	u8 character_effect_on_death_execution_type;
	u8 mark_display;//0:don't display 1:display 2:display only in editor
	u16 mark_number;

	u16 operation;
	u8 faction;
	u8 character_id;

	u8 flying;
	u8 direction_fixed;
	u8 invincible;
	u8 invincible_effect;
	u8 block;
	u8 gigantic;
	u8 synchronize_with_auto_scroll;
	u8 line_of_sight;
	u8 line_of_sight_range;

	u32 hp;
	u32 sp;
	u16 stopping_ease_during_inertial_movement;
	u8 body_hit_detection_range;
	u32 body_hit_power;
	u8 body_hit_impact;
	u16 body_hit_effect;
	u32 defense;
	u8 impact_resistance;

	u32 score;
	u8 holds_item_at_same_position;

	u8 has_group;
	u16 group_number;
	u8 action_condition_range;
	u8 action_condition_judgment_type;

    // std::vector<stf::string>
    u32 strings_count;
    StdString character_name;

    u16 position_x;//different from data position number in editor
	u16 position_y;

    s32 some_count; // always 0 ??

    // std::vector<u8>
    u32 inherited_data_count; // 37
    u8 inherit_character_name                          [[color("907060")]];
	u8 inherit_operation                               [[color("907060")]];
	u8 inherit_faction                                 [[color("907060")]];
	u8 inherit_character_id                            [[color("907060")]];
	u8 inherit_appearance_condition                    [[color("907060")]];
	u8 inherit_facing_right                            [[color("907060")]];
	u8 inherit_number_of_doubles                       [[color("907060")]];
	u8 inherit_initial_position_offset_x               [[color("907060")]];
	u8 inherit_initial_position_offset_y               [[color("907060")]];
	u8 inherit_image                                   [[color("907060")]];
	u8 inherit_animation_set                           [[color("907060")]];
	u8 inherit_z_coordinate                            [[color("907060")]];
	u8 inherit_transparency                            [[color("907060")]];
	u8 inherit_initial_character_effect                [[color("907060")]];
	u8 inherit_character_effect_on_death               [[color("907060")]];
	u8 inherit_mark                                    [[color("907060")]];
	u8 inherit_direction_fixed                         [[color("907060")]];
	u8 inherit_flying                                  [[color("907060")]];
    u8 inherit_invincible                              [[color("907060")]];
	u8 inherit_block                                   [[color("907060")]];
	u8 inherit_gigantic                                [[color("907060")]];
	u8 inherit_synchronize_with_auto_scroll            [[color("907060")]];
	u8 inherit_line_of_sight                           [[color("907060")]];
	u8 inherit_hp                                      [[color("907060")]];
	u8 inherit_sp                                      [[color("907060")]];
	u8 inherit_body_hit_detection_range                [[color("907060")]];
	u8 inherit_body_hit_power                          [[color("907060")]];
	u8 inherit_body_hit_impact                         [[color("907060")]];
	u8 inherit_body_hit_effect                         [[color("907060")]];
	u8 inherit_defense                                 [[color("907060")]];
	u8 inherit_impact_resistance                       [[color("907060")]];
	u8 inherit_stopping_ease_during_inertial_movement  [[color("907060")]];
	u8 inherit_action_condition                        [[color("907060")]];
	u8 inherit_group                                   [[color("907060")]];
	u8 inherit_score                                   [[color("907060")]];
	u8 inherit_holds_item_at_same_position             [[color("907060")]];
	u8 inherit_action                                  [[color("907060")]];

    // std::vector<BasicCondition>
    u32 appearance_condition_count;
    if (appearance_condition_count > 0) {
        BasicCondition conditions[appearance_condition_count];
    }

    // std::vector<Flow>
    u32 flow_count;
    if (flow_count > 0) {
        Flow flows[flow_count];
    }
};

struct Item {
    u32 header; // 11

    u8 inherit_palette;
	u16 inherit_palette_data_number;

	u8 any_of_appearance_conditions_true;
	u8 appearance_condition_once_met_always_true;
	u16 appearance_position_offset_x_dot;
	u16 appearance_position_offset_y_dot;

	u16 image_number;
	u8 image_type;
	u16 frame;
	u8 z_coordinate;
	u8 transparency;
	u8 mark_display;//0:don't display 1:display 2:display only in editor
	u16 mark_number;

	u8 display_above_head_on_acquisition;
	u8 acquisition_type;
	u8 gigantic;
	u16 sound_effect;

	// u32 unknown;

	u32 item_name_length;
	StdString item_name;

	u16 position_x;
	u16 position_y;

	u32 number_of_inherited_data;
	u8 inherit_item_name;
	u8 inherit_appearance_condition;
	u8 inherit_initial_position_offset_x;
	u8 inherit_initial_position_offset_y;
	u8 inherit_image;
	u8 inherit_z_coordinate;
	u8 inherit_transparency;
	u8 inherit_mark;
	u8 inherit_gigantic;
	u8 inherit_acquisition_type;
	u8 inherit_display_above_head_on_acquisition;
	u8 inherit_sound_effect;
	u8 inherit_effect;

    // std::vector<BasicCondition>
	u32 appearance_condition_count;
    if (appearance_condition_count > 0) {
        BasicCondition conditions[appearance_condition_count];
    }

    // std::vector<ItemEffect>
    u32 item_effects_count;
    if (item_effects_count > 0) {
        ItemEffect item_effects[item_effects_count];
    }
};

// Block stg2 @0x31c;
// Character chr2 @0x4D4;

struct StagePalette {
    // std::vector<Block>
    u32 blocks_count;
    Block blocks[blocks_count];
    
    // std::vector<Character>
    u32 character_count;
    Character characters[character_count];

    // std::vector<Item>
    u32 item_count;
    Item items[item_count];

    // std::vector<Background>
    // u32 background_count;
    // Background backgrounds[background_count];
   
};

struct StageBlock {
    u32 position;
    Block block;
};

struct StageCharacter {
    u32 position;
    Character character;
};

struct StagePaletteFile {
    u32 magic;
    u32 some_count; // 99 - std::vector<int>
    
    u32 width;
    
    u32 chunk_width; // 32
    u32 chunk_pow; // 5
   
    u32 height;
    
    u32 enable_horizontal_scroll_minimum;
    u32 enable_horizontal_scroll_maximum;
    u32 enable_vertical_scroll_minimum; // top left
    u32 enable_vertical_scroll_maximum; // bottom
    
    u32 horizontal_scroll_minimum_value;
    u32 horizontal_scroll_maximum_value;
    u32 vertical_scroll_minimum_value;
    u32 vertical_scroll_maximum_value;
    
    // Page 2
    
    u32 frame_rate;
    
    u32 enable_time_limit;
    u32 time_limit_duration;  // seconds
    u32 warning_sound_start_time;
    
    u32 enable_side_scroll;
    u32 enable_vertical_scroll;
    u32 autoscroll_speed;
    u32 vertical_scroll_speed;
    
    double gravity;
    
    u32 hit_detection_level;
    u32 character_shot_collision_detection_accuracy;
    
    u32 bgm_number;
    u32 bgm_loop_playback;
    u32 dont_restart_bgm_if_no_change;
    
    
    u32 enable_z_coordinate;
    
    u32 inherit_status_from_stock;
    u32 store_status_to_stock;
    u32 show_status_window;
    
    u32 switch_scene_immediately_on_clear;
    u32 allow_replay_save;
    
    // show text images
    u32 show_stage;
    u32 show_ready;
    u32 show_clear;
    u32 show_gameover;
    
    PlayerCollision player_collide;
    
    EnemyCollision enemy_collide;
    
    u32 item_collision_width;
    u32 item_collision_height;   

    ActorHitbox player_hitbox;
    ActorHitbox enemy_hitbox;
    
    // Okay this is original, but this limit the number of "ctrl-z"
    u32 undo_max_times;

    u32 x_coordinate_upper_limit;
    u32 y_coordinate_upper_limit;

    u32 unk75    [[color("4e4e4e")]];
    u32 unk76    [[color("4e4e4e")]];
    u32 unk77    [[color("4e4e4e")]];
    u32 unk78    [[color("4e4e4e")]];
    u32 unk79    [[color("4e4e4e")]];

    u32 unk80    [[color("4e4e4e")]];
    u32 unk81    [[color("4e4e4e")]];
    u32 unk82    [[color("4e4e4e")]];
    u32 unk83    [[color("4e4e4e")]];
    u32 unk84    [[color("4e4e4e")]];
    u32 unk85    [[color("4e4e4e")]];
    u32 unk86    [[color("4e4e4e")]];
    
    u32 disable_damage_outside_screen;

    u32 player_invincibility_from_same_enemy_duration;
    u32 player_invincibility_duration;

    u32 enemy_invincibility_from_same_player_duration;
    u32 enemy_invincibility_duration;
    
    u32 stage_names    [[color("4e4e4e")]]; // std::vector<std::string>
    StdString stage_name;
    
    u32 ranking_size    [[color("4e4e4e")]]; // 5  - std::vector<int>
    // Ranking
    u32 ranking_score;
    u32 ranking_remaining_time;
    u32 ranking_clear_time;
    u32 ranking_remaining_hp;
    u32 ranking_remaining_sp;

    // DeathFade : fade animation on death
    DeathFade nonblock_enemy_death;
    DeathFade block_enemy_death;
    DeathFade item_death;
    DeathFade player_death;
    DeathFade enemy_death;

    // Stage Palette - add the header  FC 03 00 00 and it's a  plt4 file !
    StagePalette palette;

    // std::vector<StageBlock>
    u32 block_count;
    if (block_count > 0) {
        StageBlock blocks[block_count];
    }

    // std::vector<StageCharacter>
    u32 character_count;
    if (character_count > 0) {
        StageCharacter characters[character_count];
    }

};


Character test @0x71F;

StagePaletteFile stage_pal_file @ 0x0;