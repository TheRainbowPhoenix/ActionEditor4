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

struct StagePalette {
    u32 palette_size;
    
    u32 unk_len;
    char unk_text[unk_len];
    
    u32 unk1    [[color("4e4e4e")]];
    u32 unk2    [[color("4e4e4e")]];
    u32 unk3    [[color("4e4e4e")]];
    
    u32 unk4    [[color("4e4e4e")]];
    u32 pattern_cc;
    
    u32 unk5    [[color("4e4e4e")]];
    u32 unk6    [[color("4e4e4e")]];
    u32 unk7    [[color("4e4e4e")]];
    u32 unk8    [[color("4e4e4e")]];
    u32 unk9    [[color("4e4e4e")]]; // todo: maybe smaller
    u32 unk10    [[color("4e4e4e")]];
    u32 unk11    [[color("4e4e4e")]];
    u32 unk12    [[color("4e4e4e")]];
    u32 unk13    [[color("4e4e4e")]];
    u32 unk14    [[color("4e4e4e")]]; // todo: maybe other
    
    u32 unk15    [[color("4e4e4e")]];
    u32 unk16    [[color("4e4e4e")]];
    char unk17;    
    u32 unk18    [[color("4e4e4e")]];
    
    u32 item_name_size;
    char item_name[item_name_size];
    
    u32 unk19    [[color("4e4e4e")]];
    u32 unk20    [[color("4e4e4e")]];
    u32 unk21    [[color("4e4e4e")]];
    u32 unk22    [[color("4e4e4e")]];
    u32 unk23    [[color("4e4e4e")]];
    u32 unk24    [[color("4e4e4e")]];
    u32 unk25    [[color("4e4e4e")]];
    u32 unk26    [[color("4e4e4e")]];
    u32 unk27    [[color("4e4e4e")]];
    u32 unk28    [[color("4e4e4e")]];
    u32 unk29    [[color("4e4e4e")]]; // todo: maybe smaller
    u32 unk30    [[color("4e4e4e")]];
    u32 unk31    [[color("4e4e4e")]];
    u32 unk32    [[color("4e4e4e")]];
    
    // TODO: there is a repeating pattern 
    
    char unk33; 
    u32 item_name_size_2;
    char item_name_2[item_name_size_2];
    
    u32 unk34    [[color("4e4e4e")]];
    u32 unk35    [[color("4e4e4e")]];
    u32 unk36    [[color("4e4e4e")]];
};

struct StageFile {
    // Header with magic and count
    u32 magic_file_version;
    u32 some_count;
    
    u32 map_width;
    
    u32 unk_0; // 32, 256 ...?
    
    u32 unk1    [[color("4e4e4e")]]; // 5, 8 ?
    
    u32 height;
    u32 is_min_horizontal_scroll_left;
    u32 is_max_horizontal_scroll_right;
    u32 is_min_vertical_scroll_top;
    u32 is_max_vertical_scroll_bottom;
    
    u32 min_horizontal_scroll;
    u32 max_horizontal_scroll;
    u32 min_vertical_scroll;
    u32 max_vertical_scroll;
    
    u32 frame_rate;
    
    u32 enable_time_limit;
    u32 time_limit_duration;  // seconds
    u32 warning_sound_start_time;
    
    u32 horizontal_scroll_mode;
    u32 vertical_scroll_mode;
    
    u32 horizontal_scroll_speed;
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
    
    
    
    // disable_damage_outside_screen
    
    // AnimeSet anim_sets[anim_set_count]; // anim_set_count];

};

StageFile stage_4_file @ 0x0;

u32 bg_count @ 0x884; // TODO: this can change