struct DisplayCondition {
    u32 cond_header    [[color("447e4e")]];
    u8 cond_type    [[color("4e4e4e")]];
    u32 cond_data    [[color("4e4e4e")]];
    u32 unk1    [[color("4e4e4e")]];
    u32 unk2    [[color("4e4e4e")]];
    u32 unk3    [[color("4e4e4e")]];
    u8 cond_type_2    [[color("4e4e4e")]];
    u32 unk_4    [[color("4e4e4e")]];
    u32 unk_5    [[color("4e4e4e")]];
    u8 unk_6    [[color("4e4e4e")]];
    u32 unk_7    [[color("4e4e4e")]];
    u32 unk_8    [[color("4e4e4e")]];
    u16 unk_9    [[color("4e4e4e")]];
    u8 unk_10    [[color("4e4e4e")]];
};


struct TileBlockRes {
    u32 some_size    [[color("4e4e4e")]]; // 12
    u8 inherint_palette; // bool ?
    u16 inherit_data_id;
   
    u8 opt1   [[color("4e4e4e")]];
    u8 opt2   [[color("4e4e4e")]];
    u16 opt3   [[color("4e4e4e")]];
    u32 opt4   [[color("4e4e4e")]];
    u8 opt5   [[color("4e4e4e")]];
    u8 opt6   [[color("4e4e4e")]];
    u16 opt9   [[color("4e4e4e")]]; // 2E 00
    
    u8 opt10 [[color("4e4e4e")]];
    u8 opt11 [[color("4e4e4e")]];
    u8 opt12 [[color("4e4e4e")]];
    u8 opt13 [[color("4e4e4e")]];
    u8 opt14 [[color("4e4e4e")]];
    u8 opt15 [[color("4e4e4e")]];
    u8 opt16 [[color("4e4e4e")]];
    u8 opt17 [[color("4e4e4e")]];
    u8 opt18 [[color("4e4e4e")]];
    u8 opt19 [[color("4e4e4e")]];
    
    u8 unk17   [[color("4e4e4e")]];    
    
    
    u32 unk18    [[color("4e4e4e")]];
    
    u32 block_name_size;
    if (block_name_size > 1) {
        char block_name[block_name_size];
    }
    
    u32 unk19    [[color("4e4e4e")]];
    u32 unk20    [[color("4e4e4e")]];
    u32 unk21    [[color("4e4e4e")]];
    u16 unk22    [[color("4e4e4e")]];
    u8 unk23    [[color("4e4e4e")]];
    u32 unk24    [[color("4e4e4e")]];    
    
    u32 display_condition_len; // 12 = block, 17 = event config
    
    DisplayCondition display_conditions[display_condition_len];
   
};


struct TileResource {
    u32 unk5    [[color("4e4e4e")]]; // 0B
    u32 unk6    [[color("4e4e4e")]];
    u32 unk7    [[color("4e4e4e")]];
    u16 unk8_0;
    u8 unk8_1;
    
    u32 unk_9 [[color("4e4e4e")]];
};



struct TilesFooter {
    u32 unk1    [[color("4e4e4e")]]; // 02
    u32 unk2    [[color("4e4e4e")]]; // 35
    u32 unk3    [[color("4e4e4e")]];
    u32 unk4    [[color("4e4e4e")]];
    u32 unk5    [[color("4e4e4e")]];
    u32 unk6    [[color("4e4e4e")]];
    
    u16 unk7_0;
    u8 unk7_1;
    
    u32 unk8    [[color("4e4e4e")]];
    u8 unk9_1   [[color("4e4e4e")]];
    u32 unk9    [[color("4e4e4e")]];
    u8 unk10_1   [[color("4e4e4e")]];
    u32 unk10    [[color("4e4e4e")]];
    u8 a;
    u16 b;
    u16 c;
    u16 d;
    u8 e;
    u32 unk18    [[color("4e4e4e")]];
    u32 unk19    [[color("4e4e4e")]];
    u32 unk20    [[color("4e4e4e")]];
    u32 unk21    [[color("4e4e4e")]];
    u32 unk22    [[color("4e4e4e")]];
    u16 unk23;
    u8 unk24;
    u32 unk25    [[color("4e4e4e")]];
    u32 unk26    [[color("4e4e4e")]];
    u32 unk27    [[color("4e4e4e")]];
    u16 unk28    [[color("4e4e4e")]];
    u32 unk29    [[color("4e4e4e")]];
    u32 unk30    [[color("4e4e4e")]];
    u32 unk31    [[color("4e4e4e")]];
};



struct StagePalette {
    u32 palette_size;
    
    u32 vect_len;
    char unk_text[vect_len];
    
    u32 unk1    [[color("4e4e4e")]];
    u32 unk2    [[color("4e4e4e")]];
    u32 unk3    [[color("4e4e4e")]];
    
    u32 unk4    [[color("4e4e4e")]];
    u32 pattern_cc;

    TileResource res;
    TileBlockRes tile_blocks[palette_size-1];
    TilesFooter tile_footer;
    
    u32 pattern_cc_2;
    
};

struct StagePaletteFile {
    // Header with magic and count
    u32 magic_file_version;

    StagePalette palette;
};

StagePaletteFile stage_pal_file @ 0x0;