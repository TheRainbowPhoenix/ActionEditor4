#include <stdio.h>
#include "Loop_Details.h"

void Read_Loop_Details(struct Loop_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->repeat_count, sizeof(int), 1, read_file);
	fread(&details->command_count, sizeof(int), 1, read_file);
}

void Write_Loop_Details(struct Loop_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->repeat_count, sizeof(int), 1, write_file);
	fwrite(&details->command_count, sizeof(int), 1, write_file);
}
