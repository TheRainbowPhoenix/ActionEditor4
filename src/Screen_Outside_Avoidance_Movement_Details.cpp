#include <stdio.h>
#include "Screen_Outside_Avoidance_Movement_Details.h"

void Read_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_101, sizeof(char), 96, read_file);
}

void Write_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_101, sizeof(char), 96, write_file);
}
