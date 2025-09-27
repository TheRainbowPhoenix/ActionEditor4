#pragma once

struct Wait_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[33];
};


void Read_Wait_Details(struct Wait_Details* details, FILE* read_file);
void Write_Wait_Details(struct Wait_Details* details, FILE* write_file);
