#include <stdio.h>
#include "Code_Execution_Details.h"

void Read_Code_Execution_Details(struct Code_Execution_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_14, sizeof(char), 9, read_file);

	char* temp_str;
	int size;
	fread(&size, sizeof(int), 1, read_file);
	if (size > 1) {
		temp_str = new char[size];
		fread(temp_str, sizeof(char), size, read_file);
		details->code = temp_str;
		delete[] temp_str;
	}

	fread(&details->bytes19_38, sizeof(char), 20, read_file);
}

void Write_Code_Execution_Details(struct Code_Execution_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_14, sizeof(char), 9, write_file);
	
	int temp_size = details->code.size() + 1;
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 1) {
		fwrite(details->code.c_str(), sizeof(char), temp_size, write_file);
	}
	
	fwrite(&details->bytes19_38, sizeof(char), 20, write_file);
}




