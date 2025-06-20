#include <stdio.h>
#include <stdlib.h>
#include "Stage_Block.h"

void Read_Stage_Block_Data(struct Stage_Block* block_data, FILE* read_file) {
	fread(&block_data->position, sizeof(int), 1, read_file);
	Read_Block_Data(&block_data->block, read_file);
}

void Write_Stage_Block_Data(struct Stage_Block* block_data, FILE* write_file) {
	fwrite(&block_data->position, sizeof(int), 1, write_file);
	Write_Block_Data(&block_data->block, write_file);
}
