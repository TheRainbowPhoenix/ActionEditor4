struct BGMTrack {
    // vector<dword> -- can be mixed size !!
    u32 binary_field_count [[color("00143C")]];
    u32 is_name_same_path;
    u32 volume;

    // vector<string> - 2
    u32 strings_count;

    // Resource name dynamic size
    u32 name_length             [[color("00020A")]];
    if (name_length > 1) {
        char name[name_length]      [[color("9370DB")]];
    }
    
    u32 path_length              [[color("20B2AA")]];
    if (path_length > 1) {
        char path[path_length]      [[color("9370DB")]];
    }
    
   
};

struct BGMFile {
    // Header with magic and count
    u32 magic;
    
    // vector<BGMTrack>
    u32 bgm_set_count;
    
    BGMTrack bgm_sets[bgm_set_count]; // bgm_set_count];

};

BGMFile bgm_file @ 0x0;