#include <stdio.h>
#include "Character_Effect_Execution_Details.h"

void Read_Character_Effect_Execution_Details(struct Character_Effect_Execution_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->effect, sizeof(int), 1, read_file);
	fread(&details->execution_type, sizeof(int), 1, read_file);
	fread(&details->loop_execution, sizeof(int), 1, read_file);
}

void Write_Character_Effect_Execution_Details(struct Character_Effect_Execution_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->effect, sizeof(int), 1, write_file);
	fwrite(&details->execution_type, sizeof(int), 1, write_file);
	fwrite(&details->loop_execution, sizeof(int), 1, write_file);
}
