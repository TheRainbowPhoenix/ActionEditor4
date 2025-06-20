#pragma once

struct Animation_Execution_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[41];
};

void Read_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* read_file);
void Write_Animation_Execution_Details(struct Animation_Execution_Details* details, FILE* write_file);
