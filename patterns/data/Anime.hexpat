#pragma description "AnimeSet Binary Format"
#pragma MIME application/x-imhex-pattern

import std.io;
import std.mem;


// Frame structure definition
struct AnimationFrame {
    // vector<dword> -- can be mixed size !!
    u32 binary_field_count [[color("00143C")]];
    u32 frame_index;
    u32 display_time;
    u32 exec_commands;

    // vector<string> - 0
    u32 strings_count;
};

struct Animation {
    // vector<dword> -- can be mixed size !!
    u32 binary_field_count [[color("00143C")]]; 

    u16 sample_list_index [[color("00BFFF")]];
    u8 sample_index [[color("4682B4")]];
    u16 frame_start [[color("FFDAB9")]];

    // vector<string> - 1
    u32 strings_count [[color("CD5C5C")]];

    // Pattern name
    u32 animation_name_length [[color("32CD32")]];
    char animation_name[animation_name_length] [[color("8A2BE2"), encoding("shift-jis")]];


    // vector<AnimationFrame>
    u32 anim_frame_count;
    AnimationFrame anim_frames[anim_frame_count];
};


struct AnimationsFile {
    // Header with magic and count
    u32 magic;

    // vector<Animation>
    u32 anim_count;
    Animation anims[anim_count]; // anim_set_count];

};

AnimationsFile animations @ 0x0;