#include <stdio.h>
#include "Direction_Change_Details.h"

void Read_Direction_Change_Details(struct Direction_Change_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes6_42, sizeof(char), 37, read_file);
}

void Write_Direction_Change_Details(struct Direction_Change_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes6_42, sizeof(char), 37, write_file);
}
