#include <stdio.h>
#include "Basic_Animation_Set_Change_Details.h"

void Read_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->animation_set, sizeof(int), 1, read_file);
}

void Write_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->animation_set, sizeof(int), 1, write_file);
}
