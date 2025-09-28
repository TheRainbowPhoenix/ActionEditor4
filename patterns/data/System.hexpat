#pragma description "AnimeSet Binary Format"
#pragma MIME application/x-imhex-pattern

import std.io;
import std.mem;


struct StdString {
    u32 length;
    if (length > 1) { // A length of 1 means an empty string "" with a null char.
        char data[length] [[color("9370DB")]];
    }
};

struct StatusWindow {
    u32 header;
    u32 is_visible;
    u32 show_symbol;
    u32 max;
    
    u32 unk1;
    u32 color_change_condition;
    u32 change_operator; // rga color ?
    
    u32 strings_count;
    StdString text;
    
};

struct Ranking {
    u32 first_unk;
    u32 ranking_on;
    u32 second_unk;
    u32 ranking_count;
    u8 ranking_criteras[ranking_count];
};

struct MenuText {
    u32 unk1;
    u32 enabled;
    u32 unk2;
    StdString text;
};

struct IniConf {
    u32 unk1;
    u32 unk2;
    u32 default;
    u32 string_count;
    StdString id_string;
    StdString default_str;
    
};

struct SystemFile {
    // Header with magic and count
    u32 magic;
    u32 unk0;
    u32 up_process_on_stage_clear; 
    u32 score_per_1up; // def: 100, 1 - 999999
    
    u32 space_pause;
    u32 hide_obj_pause;
    u32 show_symbol_image;
    
    u32 font_index; // 0 -> 0x79
    u32 decoration; // 0 = none, 1 = shadow, 2 = green border
    u32 monospace;
    
    u32 min_damage_reduct_base;
    u32 min_damage_reduct_percent;
    
    u32 min_shock_reduct_base;
    u32 min_shock_reduct_percent;
    
     
    u32 enable_test_play_everywhere;
    u32 character_draw; // dropdown, 0=speed, 1=compatibility
    u32 allow_replay_save;
    u32 alow_manual_replay_save;
    u32 replay_file_format; // dropdown for file name format, 0=Stage Name, 1=Stage Filename
    u32 use_explorer_file_dialog_for_file_select;
    
    
    u32 show_image_on_title_screen; // checkbox on 4rd page
    u32 auto_save_default; // 2nd page
    u32 show_description; // checkbox on 4rd page
    
    // 2nd page    
    u32 share_lives_across_story; 
    u32 return_worldmap_on_death;
    u32 show_lives_on_worldmap;
    u32 multistage_autosave_after_each_stage;
    u32 challenge_mode_world;
    u32 all_worlds_selectable_on_start;
    u32 show_highscore;
    u32 show_totalscore;
    u32 always_reset_commonvar_on_worldmap;
    u32 retry_pause_menu_option_in_cleared_worlds;
    u32 challenge_show_highscore;
    u32 challenge_show_totalscore;   
    u32 challenge_death_reset_commonvar;
    u32 challenge_retry_pause_menu_option_in_cleared_worlds;
    u32 freemode_death_reset_commonvar;
    u32 testplay_death_reset_commonvar;
    
    // 3rd page
    u32 bitmap_color_mode; // 0=8bit, 1=24bit
    u8 transparent_color_r;
    u8 transparent_color_g;
    u8 transparent_color_b;
    
    // 7th page
    u32 compat_v2_12;
    u32 compat_v2_60;
    
    // 1rst page
    u32 play_death_for_stauts_and_code_exec;
    u32 play_invincibility_effect;
    u32 invincibility_effect_speed;
    u32 enable_color_invincible_anim;
    
    // 2nd page
    u32 return_to_map_pause_menu_option;
    
    // 7th page
    u32 compat_v5_23;
    u32 compat_v5_54;
    u32 compat_v6_16;
    u32 compat_v6_68;
    u32 compat_v6_76;
    u32 compat_v6_94;
    u32 unk_compat_alwayson;
    u32 compat_v6_96;
    u32 compat_v7_20;
    u32 compat_v7_22;
    u32 compat_v7_32;
    u32 compat_v7_34;
    u32 compat_v7_47;
    u32 compat_v7_51;
    u32 compat_v7_59;
    u32 compat_v7_47_nofx;
    // 8th page
    u32 compat_v7_47_linfx;
    u32 compat_v7_72;
    u32 compat_v7_80;
    u32 compat_v7_81;
    u32 compat_v7_82;
    u32 compat_v7_92;
    u32 compat_v8_04;
    u32 compat_v8_07;
    u32 compat_v8_16;
    u32 compat_v8_17;
    u32 compat_v8_18;
    u32 compat_v8_21;
    u32 compat_v8_25;
    u32 compat_v8_29;
    u32 compat_v8_32;
    // 9th page
    u32 compat_v8_36;
    u32 compat_v8_37;
    u32 compat_v8_40;
    u32 compat_v8_44_higherjump;
    u32 compat_v8_44_delayedjump;
    u32 compat_v8_44_lowerjump;
    u32 compat_v8_44_detach_riders;
    u32 compat_v8_60;
    u32 compat_v8_73;
    u32 compat_v8_90_wrap;
    u32 compat_v8_90_statuscode;
    u32 compat_v8_90_walkerY;
    u32 compat_v8_96;
    u32 compat_v9_03;
    u32 compat_v9_11;
    // 10th page
    u32 compat_v9_12;
    u32 compat_v9_80;
    u32 compat_v9_85;
    
    // 6th page
    u32 direct3_color_depth; // 0 = 32bit, 1 = 16bit
    u32 directdraw_color_depth; // 0 = 32bit, 1 = 16bit, 2 = 8bit
    u32 go_title_after_stage_clear;
    
    // Now intersting stuff !
    u32 strings_count; // 1 - std::vector<std::string>
    StdString game_title;    // 1rst page
    StdString description;  // button on 4th page
    
    // Page 3 
    u32 targets_count; // 19
    u8 target_graphic;
    u8 target_base_anim_set;
    u8 target_Zcoordinate;
    u8 target_transparency;
    u8 target_charatcer_fx;
    u8 target_direction_fix;
    u8 target_flight;
    u8 target_invincibility;
    u8 target_giant_form;
    u8 target_sync_autoscroll;
    u8 target_fow;
    u8 target_remain_hp;
    u8 target_remain_sp;
    u8 target_max_hp;
    u8 target_max_sp;
    u8 target_col_hitbox;
    u8 target_col_power;
    u8 target_col_shock;
    u8 target_defense;
    u8 target_shock_resist;
    u8 target_inertia;
    u8 target_action;
    u8 target_remain_time;
    u8 target_player_count;
    u8 target_bgm;
    
    u32 targets_reseted_count; // 19
    u8 target_graphic_reseted;
    u8 target_base_anim_set_reseted;
    u8 target_Zcoordinate_reseted;
    u8 target_transparency_reseted;
    u8 target_charatcer_fx_reseted;
    u8 target_direction_fix_reseted;
    u8 target_flight_reseted;
    u8 target_invincibility_reseted;
    u8 target_giant_form_reseted;
    u8 target_sync_autoscroll_reseted;
    u8 target_fow_reseted;
    u8 target_remain_hp_reseted;
    u8 target_remain_sp_reseted;
    u8 target_max_hp_reseted;
    u8 target_max_sp_reseted;
    u8 target_col_hitbox_reseted;
    u8 target_col_power_reseted;
    u8 target_col_shock_reseted;
    u8 target_defense_reseted;
    u8 target_shock_resist_reseted;
    u8 target_inertia_reseted;
    u8 target_action_reseted;
    u8 target_remain_time_reseted;
    u8 target_player_count_reseted;
    u8 target_bgm_reseted;
    
    // page 4
    u32 status_window_count; // 5
    StatusWindow satus_windows[status_window_count];
    
    // page 2
    u32 header_initial; // 4
    u32 story_mode_initial;
    u32 challenge_mode_initial;
    u32 free_mode_initial;
    u32 free_mode_max;
    
    
    u32 header_infinite; // 4
    u32 story_mode_infinite;
    u32 challenge_mode_infinite;
    u32 free_mode_infinite;
    u32 free_mode_infini_max;
    
    u32 rankings_count;
    Ranking rankings[rankings_count]; // 3 used, 4th is dummy
    
    // page 5
    u32 terms_strings_count;
    StdString terms[terms_strings_count];
    
    // page 3
    u32 sound_effect_count;
    StdString sound_effect_paths[sound_effect_count];
    
    u32 bgm_count;
    u32 bgm_values[bgm_count];
    u32 bgm_loop_play_count;
    u8 bgm_loop_play[bgm_loop_play_count];
    
    // page 4
    u32 title_menu_texts_count;
    MenuText title_menu_texts[title_menu_texts_count];
    
    u32 worldmap_menu_count;
    MenuText worldmap_menu_texts[worldmap_menu_count];
    
    u32 option_menu_count;
    MenuText option_menu_texts[option_menu_count];
    
    u32 ranking_entry_count;
    StdString ranking_entry_texts[ranking_entry_count];
    
    u32 autoreplay_save_count;
    StdString autoreplay_save_texts[autoreplay_save_count];
    
    u32 replay_order_count;
    StdString replay_order_texts[replay_order_count];
    
    // page 6
    u32 settings_ini_count;
    IniConf setting_init[settings_ini_count];
};

SystemFile system @ 0x0;

