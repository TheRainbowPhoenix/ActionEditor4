#pragma once
#include "Block.h"
#include "Character.h"
#include "Item.h"

struct Common_Palette {
	int version;
	int unknown1;
	int unknown2;
	int number_of_block_data;
	std::vector<Block> block_data;
	int number_of_character_data;
	std::vector<Character> character_data;
	int number_of_item_data;
	std::vector<Item> item_data;
};

void Read_Common_Palette(struct Common_Palette* palette, FILE* read_file);
void Write_Common_Palette(struct Common_Palette* palette, FILE* write_file);
