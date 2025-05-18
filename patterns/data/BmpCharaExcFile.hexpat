struct BmpCharaExcElement {
    u32 header [[color("00143C")]];
    u32 is_name_same_path;
    u32 is_giant;
    u32 scale_mode;
    u32 unk4;

    // Resource name dynamic size
    u32 name_length             [[color("20B2AA")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    u32 path_length              [[color("20B2AA")]];
    if (path_length > 1) {
        char path[path_length]      [[color("9370DB")]];
    }
   
};

struct BmpCharaExcFile {
    // Header with magic and count
    u32 magic;
    u32 anim_set_count;
    
    
    
    BmpCharaExcElement anim_sets[anim_set_count]; // anim_set_count];

};

BmpCharaExcFile animations_set @ 0x0;