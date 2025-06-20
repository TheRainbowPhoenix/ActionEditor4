#include <stdio.h>
#include <stdlib.h>
#include "Block.h"
#include "Character.h"
#include "Item.h"
#include "Common_Palette.h"

void Read_Common_Palette(struct Common_Palette* palette, FILE* read_file) {
	fread(&palette->version, sizeof(int), 1, read_file);
	fread(&palette->unknown1, sizeof(int), 1, read_file);
	fread(&palette->unknown2, sizeof(int), 1, read_file);
	fread(&palette->number_of_block_data, sizeof(int), 1, read_file);
	palette->block_data.resize(palette->number_of_block_data);
	for(int i = 0; i < palette->number_of_block_data; ++i) {
		Read_Block_Data(&palette->block_data[i], read_file);
	}

	fread(&palette->number_of_character_data, sizeof(int), 1, read_file);
	palette->character_data.resize(palette->number_of_character_data);
	for(int i = 0; i < palette->number_of_character_data; ++i) {
		Read_Character_Data(&palette->character_data[i], read_file);
	}

	fread(&palette->number_of_item_data, sizeof(int), 1, read_file);
	palette->item_data.resize(palette->number_of_item_data);
	for(int i = 0; i < palette->number_of_item_data; ++i) {
		Read_Item_Data(&palette->item_data[i], read_file);
	}
}

void Write_Common_Palette(struct Common_Palette* palette, FILE* write_file) {
	fwrite(&palette->version, sizeof(int), 1, write_file);
	fwrite(&palette->unknown1, sizeof(int), 1, write_file);
	fwrite(&palette->unknown2, sizeof(int), 1, write_file);
	fwrite(&palette->number_of_block_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_block_data; ++i) {
		Write_Block_Data(&palette->block_data[i], write_file);
	}

	fwrite(&palette->number_of_character_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_character_data; ++i) {
		Write_Character_Data(&palette->character_data[i], write_file);
	}

	fwrite(&palette->number_of_item_data, sizeof(int), 1, write_file);
	for(int i = 0; i < palette->number_of_item_data; ++i) {
		Write_Item_Data(&palette->item_data[i], write_file);
	}
}

