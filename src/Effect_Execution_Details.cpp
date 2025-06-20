#include <stdio.h>
#include "Effect_Execution_Details.h"

void Read_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->bytes39_78, sizeof(char), 40, read_file);
}

void Write_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->bytes39_78, sizeof(char), 40, write_file);
}
