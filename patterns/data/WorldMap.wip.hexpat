struct WorldTile {
    u32 header [[color("00143C")]];
    u32 tile_index;
    u32 locked;
    u32 graphic;
    u32 unk1; // 2 ?
    
    u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    u32 unk2; // 1 ?

};

struct WorldEventBase {
    u32 header [[color("00143C")]];
    u32 unk1;
    u32 unk2;
    
    u32 unk3;
    u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    u32 unk4;
    u32 unk5;
    u32 event_type;
    u32 graphic;
    
    u32 wold_clear;
    u32 pass_without_clear;
    u32 play_after_clear;
    u32 on_game_clear;
    u32 unk14; // 1
    u32 spawn_event_id; // dropdown
    u32 spawn_cond_val; // spinner
    u32 spawn_cond_type; // small dropdown
    u32 total_score;
    u32 unk19;
    
    u32 variation_id;
    u32 variation_val;
    
    
    
    u32 unk96; // 2 ??
    
    u32 world_name_length             [[color("00020A")]];
    if (world_name_length > 1) {
        char world_name[world_name_length]      [[color("9370DB")]];
    }
    
    
    u32 start_stage_length             [[color("00020A")]];
    if (start_stage_length > 1) {
        char start_stage[start_stage_length]      [[color("9370DB")]];
    }
};


struct WorldEvent {
    u32 header [[color("00143C")]];

};

struct WorldMapFile {
    u32 magic;
    u32 some_count;
    u32 width;
    u32 height;
    
    u32 unk1; // 32
    u32 unk2; // 5
    
    u32 init_x;
    u32 init_y;
    
    u32 background_index;
    u32 use_background;
    
    u32 unk3; // 2 ??
    
    u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    
    u32 bg_path_length             [[color("00020A")]];
    if (bg_path_length > 1) {
        char bg_path[bg_path_length]      [[color("9370DB")]];
    }
    
    u32 tiles_types_count;
    WorldTile tiles_types[tiles_types_count];
    
    u32 tiles_count;
    u32 tiles[tiles_count];
    
    u32 events_count;
    WorldEventBase events[events_count]; // events_count
    
    u32 events_pal_count;
    WorldEventBase events_pal[events_pal_count];
    
};

// WorldTile test1 @ 0x41;
// WorldTile test2 @ 0x1F9;

WorldMapFile file @ 0x0;