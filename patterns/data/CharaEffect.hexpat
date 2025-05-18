struct CharaEffectElement {
    u32 header [[color("00143C")]];
    u32 effect;
    u32 param1;
    u32 param2;
    u32 param3;
    u32 param4;
    u32 param5;
    u32 unk; // always 1 ?

    // Resource name dynamic size
    u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
   
};

struct CharaEffectFile {
    // Header with magic and count
    u32 magic;
    u32 effect_set_count;
    
    
    
    CharaEffectElement effect_sets[effect_set_count];

};

CharaEffectFile animations_set @ 0x0;
