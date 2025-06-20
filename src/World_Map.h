#pragma once
#include <vector>
#include "World_Chip.h"
#include "Event.h"

struct World_Map {
	int version;
	int unknown1;
	int horizontal_width;
	int vertical_width;
	int vertical_movement_change_amount;//how much the position value changes when moving vertically
	int vertical_movement_change_amount_exponent;
	int initial_position_x;
	int initial_position_y;
	int background_color;
	int unknown2;//background image and path specification (4 bytes if none)
	int unknown3;//fixed at 2. number of strings?
	std::string unknown4; // name_length
	int unknown5;//fixed at 1? - NO: std::string bg_path
	std::vector<World_Chip> world_chip_data;
	std::vector<int> map_chip_data;
	std::vector<Event> event_data;
	std::vector<Event> event_template_data;
};

void Read_World_Map(struct World_Map* world_map_data, FILE* read_file);
void Write_World_Map(struct World_Map* world_map_data, FILE* write_file);
