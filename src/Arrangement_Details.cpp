#include <stdio.h>
#include "Arrangement_Details.h"

void Read_Arrangement_Details(struct Arrangement_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->command, sizeof(int), 1, read_file);
	fread(&details->parameter, sizeof(int), 1, read_file);
	fread(&details->operator_type, sizeof(int), 1, read_file);
	fread(&details->variable_type, sizeof(int), 1, read_file);
	fread(&details->variable_number, sizeof(int), 1, read_file);
}

void Write_Arrangement_Details(struct Arrangement_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->command, sizeof(int), 1, write_file);
	fwrite(&details->parameter, sizeof(int), 1, write_file);
	fwrite(&details->operator_type, sizeof(int), 1, write_file);
	fwrite(&details->variable_type, sizeof(int), 1, write_file);
	fwrite(&details->variable_number, sizeof(int), 1, write_file);
}
