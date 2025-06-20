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

Block stg2 @0x31c;

struct StagePalette {
    // std::vector<Block>
    u32 blocks_count;
    Block blocks[blocks_count];
    
    
   
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
};



StagePaletteFile stage_pal_file @ 0x0;