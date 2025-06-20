struct StdString {
    u32 length;
    if (length > 1) { // A length of 1 means an empty string "" with a null char.
        char data[length] [[color("9370DB")]];
    }
};

struct WorldChip {
    u32 header [[color("00143C")]];
    u32 tile_index;
    u32 locked;
    u32 graphic;
    u32 strings_count; // 2 - std::vector<std::string>
    
    // std::string
    StdString name;
    
    // std::string
    StdString unused_string;
};

struct EventPage {
    u32 start;
    u32 event_type;
    u32 graphic;
    
    u32 world_number;
    u32 pass_without_clear;
    u32 play_after_clear;
    u32 on_game_clear;
    
    u32 appearance_condition_world; // 1
    u32 appearance_condition_variable; // dropdown
    u32 appearance_condition_constant; // spinner
    u32 appearance_condition_comparison_content; // small dropdown
    u32 appearance_condition_total_score;

    u32 variation_setting_present;
    u32 variation_variable;
    u32 variation_constant;
    
    u32 strings_count; // 2 - std::vector<std::string>
    
    StdString world_name; // std::string
    StdString start_stage; // std::string
};

struct Event {
    u32 header [[color("00143C")]];
    u32 placement_x;
    u32 placement_y;
    
    u32 strings_count; // 1 - std::vector<std::string>

    StdString name; // std::string
    
    // std::vector<Event_Page> 
    u32 pages_count; 
    EventPage pages[pages_count];
};

struct WorldMapFile {
    u32 version;
    u32 settings_count; // 8 - std::vector<int>

    u32 horizontal_width;
    u32 vertical_width;

    u32 chunk_width; // 32
    u32 chunk_pow; // 5
    
    u32 initial_position_x;
    u32 initial_position_y;
    
    u32 background_index;
    u32 use_background;
    
    u32 strings_count; // 2 - std::vector<std::string>
    
    StdString name; // std::string
    StdString bg_path; // std::string
    
    // std::vector<World_Chip>
    u32 tiles_types_count;
    WorldChip world_chip_data[tiles_types_count];
    
    // std::vector<int>
    u32 tiles_count;
    u32 map_chip_data[tiles_count];
    
    // std::vector<Event>
    u32 events_count;
    Event event_data[events_count];
    
    // std::vector<Event>
    u32 events_pal_count;
    Event event_template_data[events_pal_count];
    
};

WorldMapFile file @ 0x0;