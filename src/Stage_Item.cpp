#include <stdio.h>
#include <stdlib.h>
#include "Stage_Item.h"

void Read_Stage_Item_Data(struct Stage_Item* item_data, FILE* read_file) {
	fread(&item_data->position, sizeof(int), 1, read_file);
	Read_Item_Data(&item_data->item, read_file);
}

void Write_Stage_Item_Data(struct Stage_Item* item_data, FILE* write_file) {
	fwrite(&item_data->position, sizeof(int), 1, write_file);
	Write_Item_Data(&item_data->item, write_file);
}
