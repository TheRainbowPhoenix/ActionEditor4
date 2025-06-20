#pragma once
#include <string>

struct World_Chip {
	int version;
	int graphic;
	int movement_unavailable;
	int unknown1;
	int unknown2;//fixed at 2?
	std::string name;
	int unknown3;//fixed at 1? (for unused strings?)

};

void Read_World_Chip(struct World_Chip* world_chip_data, FILE* read_file);
void Write_World_Chip(struct World_Chip* world_chip_data, FILE* write_file);
