#pragma once
#include "Item.h"

struct Stage_Item {
	int position;
	struct Item item;
};

void Read_Stage_Item_Data(struct Stage_Item* item_data, FILE* read_file);
void Write_Stage_Item_Data(struct Stage_Item* item_data, FILE* write_file);
