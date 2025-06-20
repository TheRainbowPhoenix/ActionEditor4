#pragma once
#include "Character.h"

struct Stage_Character {
	int position;
	struct Character character;
};

void Read_Stage_Character_Data(struct Stage_Character* character_data, FILE* read_file);
void Write_Stage_Character_Data(struct Stage_Character* character_data, FILE* write_file);
