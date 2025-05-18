struct EffectAnimation {
    u32 header [[color("00143C")]]; // 2 ?
    u32 start;
    u32 end;
    u32 unk;
};


struct EffectElement {
    u32 header [[color("00143C")]];
    u32 is_name_same_path;
    u32 width;
    u32 height;
    u32 is_giant;
    u32 unk; // always 2 ?

    // Resource name dynamic size
    u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    u32 path_length              [[color("00020A")]];
    if (path_length > 1) {
        char path[path_length]      [[color("9370DB")]];
    }
    u32 animation_count;
    
    EffectAnimation animations[animation_count];
   
};

struct EffectFile {
    // Header with magic and count
    u32 magic;
    u32 anim_set_count;
    
    
    
    EffectElement anim_sets[anim_set_count]; // anim_set_count];

};

EffectFile animations_set @ 0x0;
