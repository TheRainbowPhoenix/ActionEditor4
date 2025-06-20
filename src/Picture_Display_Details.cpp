#include <stdio.h>
#include "Picture_Display_Details.h"

void Read_Picture_Display_Details(struct Picture_Display_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes, sizeof(char), 113, read_file);
}

void Write_Picture_Display_Details(struct Picture_Display_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes, sizeof(char),113, write_file);
}
