#include <stdio.h>
#include "Animation_Execution_Details.h"

void Read_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 41, read_file);
}

void Write_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char), 41, write_file);
}
