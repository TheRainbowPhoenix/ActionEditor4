struct SwordPosition {
    u32 header [[color("00143C")]]; // 2 ?
    s32 x;
    s32 y;
    u32 unk;
    u32 unk2;
    u32 unk3;
    u32 unk4;
    u32 unk5;
    u32 width;
    u32 height;
    u32 s3;
    u32 unk6;
};


struct SwordType {
    u32 header [[color("00143C")]];
    u32 is_name_same_path;
    u32 strings_count; // always 3 ? -> "number of strings"

    // Resource name dynamic size
     u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    u32 path_left_length              [[color("20B2AA")]];
    if (path_left_length > 1) {
        char path_left[path_left_length]      [[color("9370DB")]];
    }
    
    u32 path_right_length              [[color("20B2AA")]];
    if (path_right_length > 1) {
        char path_right[path_right_length]      [[color("9370DB")]];
    }
    
    u32 pos_count;
    SwordPosition positions[pos_count];
   
};

struct SwordTypesFile {
    // Header with magic and count
    u32 magic;
    u32 swords_count;
    
    
    
    SwordType swords[swords_count]; // anim_set_count];

};

SwordTypesFile sword_types @ 0x0;