#pragma once
#include "Block.h"
#include "Character.h"
#include "Item.h"

struct Stage_Palette {
	int version;
	int number_of_block_data;
	std::vector<Block> block_data;
	int number_of_character_data;
	std::vector<Character> character_data;
	int number_of_item_data;
	std::vector<Item> item_data;
};

void Read_Stage_Palette(struct Stage_Palette* palette, FILE* read_file, int read_version);
void Write_Stage_Palette(struct Stage_Palette* palette, FILE* write_file, int write_version);
