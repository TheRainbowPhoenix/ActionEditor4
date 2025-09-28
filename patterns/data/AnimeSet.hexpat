#pragma description "AnimeSet Binary Format"
#pragma MIME application/x-imhex-pattern

import std.io;
import std.mem;


// Frame structure definition
struct AnimationFrame {
    u32 header [[color("00143C")]];
    u32 u32 frame_index;
    u32 display_time;
    u32 exec_commands;
    u32 unknown2;
};

struct Animation {
    u32 header [[color("00143C")]];
    u16 sample_list_index [[color("00BFFF")]];
    u8 sample_index [[color("4682B4")]];
    u16 frame_start [[color("FFDAB9")]];
    u32 strings_count [[color("CD5C5C")]];

    // Pattern name
    u32 animation_name_length [[color("32CD32")]];
    char animation_name[animation_name_length] [[color("8A2BE2"), encoding("shift-jis")]];

    // Animation frames
    u32 anim_frame_count;
    AnimationFrame anim_frames[anim_frame_count];
};

struct AnimeSet {
    u32 header [[color("00143C")]];
    u32 invincibility_offset;
    u32 block_offset;
    u32 flying_offset;
    u32 strings_count;

    // Resource name dynamic size
    u32 name_length             [[color("20B2AA")]];
    char name[name_length]      [[color("9370DB")]];
    
    // Number of animations in the set
    u32 animation_count;
    Animation animations[animation_count]; // animation_count
   
};

struct AnimationsSetFile {
    // Header with magic and count
    u32 magic;
    u32 anim_set_count;
    
    AnimeSet anim_sets[anim_set_count]; // anim_set_count];

};

AnimationsSetFile animations_set @ 0x0;