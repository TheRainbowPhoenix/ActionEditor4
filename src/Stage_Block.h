#pragma once
#include "Block.h"

struct Stage_Block {
	int position;
	struct Block block;
};

void Read_Stage_Block_Data(struct Stage_Block* block_data, FILE* read_file);
void Write_Stage_Block_Data(struct Stage_Block* block_data, FILE* write_file);
