#include <stdio.h>
#include "Background_Change_Details.h"

void Read_Background_Change_Details(struct Background_Change_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 41, read_file);
}

void Write_Background_Change_Details(struct Background_Change_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char), 41, write_file);
}
