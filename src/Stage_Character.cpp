#include <stdio.h>
#include <stdlib.h>
#include "Stage_Character.h"

void Read_Stage_Character_Data(struct Stage_Character* character_data, FILE* read_file) {
	fread(&character_data->position, sizeof(int), 1, read_file);
	Read_Character_Data(&character_data->character, read_file);
}

void Write_Stage_Character_Data(struct Stage_Character* character_data, FILE* write_file) {
	fwrite(&character_data->position, sizeof(int), 1, write_file);
	Write_Character_Data(&character_data->character, write_file);
}
