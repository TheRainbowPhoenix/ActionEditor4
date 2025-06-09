struct DeathFade {
    u32 list_size; // normally should read only this size of items
    // List items :
    
    // Checkboxes
    u32 auto_dissapear;
    u32 auto_dissapear_right;
    u32 auto_dissapear_top;
    u32 auto_dissapear_bottom;
    
    // Values, like 10 or 5
    u32 disappear_left_bl;
    u32 disappear_right_bl;
    u32 disappear_top_bl;
    u32 disappear_bottom_bl;
    // Null terminator
    u32 void_padding;
};

struct PlayerCollision {
    u32 walk_block_w;
    u32 walk_block_h;
    
    u32 fly_block_w;
    u32 fly_block_h;
    
    u32 walk_character_w;
    u32 walk_character_h;
    
    u32 fly_character_w;
    u32 fly_character_h;
    
    // In the two following are inverted
    u32 shot_collision_w;
    u32 shot_collision_h;
    
    u32 item_collision_w;
    u32 item_collision_h;
    
    // Positions modes
    u32 walk_block_mode;
    u32 fly_block_mode;
    u32 walk_character_mode;
    u32 fly_character_mode;
    
    // Dropdown - show, hide, border_only
    u32 display_mode_1;
    u32 display_mode_2;
    u32 display_mode_item;
    u32 display_mode_shot;
    
    // Colors  - blue_purple, red_green, blue_yellow, purple, blue, black_rainbow
    u32 color_1;
    u32 color_2;
    u32 color_item;
    u32 color_shot;
};

struct EnemyCollision {
    u32 walk_block_w;
    u32 walk_block_h;
    
    u32 fly_block_w;
    u32 fly_block_h;
    
    u32 walk_character_w;
    u32 walk_character_h;
    
    u32 fly_character_w;
    u32 fly_character_h;
    
    u32 shot_collision_w;
    u32 shot_collision_h;
    
    // Dropdown - bottom, center
    u32 position_setting_walk;
    u32 position_setting_fly;
    u32 position_setting_walk_character;
    u32 position_setting_fly_character;
};

struct ActorHitbox {
    // Actors have special hitbox for enemies and bullets (shot)
    u32 shot_w;
    u32 shot_h;
    
    u32 character_w;
    u32 character_h;
};


struct StageBlockDisplayCondition {
    u32 header;
    u8 unk1;
    
    u32 unk11;
    u32 unk12;
    u32 unk13;     
    u32 unk14;    
    u32 unk15;
    u32 unk16; 
         
    u8 unkL[13];     
    
};

struct StageBlockElement {
    u32 header;
    u8 inherit_palette;
    u32 inherit_data;
    
    u32 unk1;
    u32 unk2;
    u16 unk3;
    u8 unk4;
    u8 unk5;
    
    u32 unk6;
    u32 unk7;
    
    
    u8 unk9;
    u32 unk10; // 1 ?
    
    u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    u32 unk11;
    u32 read_u8_len;
    
    u8 flags[read_u8_len];
    
    u32 display_conditions_count;
    
    StageBlockDisplayCondition display_conditions[display_conditions_count];
    
};

//StageBlockElement stg2 @0x31c;

struct StagePalette {
    u32 blocks_count;
    // StageBlockElement blocks[5];
    StageBlockElement blocks[blocks_count];
    
    
   
};

struct StagePaletteFile {
    u32 magic;
    u32 some_count;
    
    u32 width;
    
    u32 chunk_width; // 32
    u32 chunk_pow; // 5
   
    u32 height;
    
    u32 enable_left_min_h_scroll;
    u32 enable_left_max_h_scroll;
    u32 enable_min_v_scroll; // top left
    u32 enable_max_v_scroll; // bottom
    
    u32 left_min_h_scroll;
    u32 left_max_h_scroll;
    u32 min_v_scroll;
    u32 max_v_scroll;
    
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
    u32 character_shot_collision_accuracy;
    
    u32 unk11    [[color("4e4e4e")]]; // 5 ?

    // BGM
    u32 bgm_loop_playback;
    u32 dont_restart_bgm_if_no_change;
    
    
    u32 enable_z_coordinate;
    
    u32 inherit_status_on_start;
    u32 save_status_on_clear;
    
    u32 show_status_window;
    
    u32 skip_scene_switch_wait_after_clear;
    u32 allow_replay_save;
    
    // show text images
    u32 show_stage_x;
    u32 show_ready;
    u32 show_clear;
    u32 show_gameover;
    
    PlayerCollision player_collide;
    
    EnemyCollision enemy_collide;
    
    u32 item_collision_w;
    u32 item_collision_h;   

    ActorHitbox player_hitbox;
    ActorHitbox enemy_hitbox;
    
    // Okay this is original, but this limit the number of "ctrl-z"
    u32 undo_max_times;

    u32 unk73    [[color("4e4e4e")]];
    u32 unk74    [[color("4e4e4e")]];
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
    
    u32 unk92    [[color("4e4e4e")]];
    u32 name_length;
    char stage_name[name_length];
    

    u32 unk94    [[color("4e4e4e")]]; // 5 ?
    // Ranking
    u32 show_score;
    u32 show_remaining_time;
    u32 show_clear_time;
    u32 show_remaining_hp;
    u32 show_remaining_sp;

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