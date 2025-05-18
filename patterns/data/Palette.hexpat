struct TileConfig {
    u32 unk5    [[color("4e4e4e")]];
    u32 unk6    [[color("4e4e4e")]];
    u32 unk7    [[color("4e4e4e")]];
    u32 unk8    [[color("4e4e4e")]];
    u16 unk9    [[color("4e4e4e")]];
    u8 unk9_2    [[color("4e4e4e")]];
    
    u32 some_size    [[color("4e4e4e")]]; // 12
    u8 inherint_palette; // bool ?
    u16 inherit_data_id;
   
    u8 opt1;
    u8 opt2;
    u16 opt3;
    u32 opt4;
    u8 opt5;
    u8 opt6;
    u16 opt9; // 2E 00
    
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
    
    u8 unk17;    
    
    
    u32 unk18    [[color("4e4e4e")]];
    
    u32 block_name_size;
    if (block_name_size > 1) {
        char block_name[item_name_size];
    }
    
    u32 unk19    [[color("4e4e4e")]];

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

    TileConfig tiles_config[palette_size-1];
    
    u32 unk20    [[color("4e4e4e")]];
    u32 unk21    [[color("4e4e4e")]];
    u32 unk22    [[color("4e4e4e")]];
    u32 unk23    [[color("4e4e4e")]];
    u32 unk24    [[color("4e4e4e")]];
    u32 unk25    [[color("4e4e4e")]];

    u32 unk26    [[color("4e4e4e")]];
    u32 unk35    [[color("4e4e4e")]];
    u32 unk36    [[color("4e4e4e")]];
};

struct StagePaletteFile {
    // Header with magic and count
    u32 magic_file_version;

    StagePalette palette;
};

StagePaletteFile stage_pal_file @ 0x0;