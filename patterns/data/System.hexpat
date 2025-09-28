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
    
};

SystemFile system @ 0x0;


struct PartialExp {
    u32 strings_count; // 1 - std::vector<std::string>
    StdString game_title;
};
PartialExp partialexp_at_0x18F @ 0x18F;