#pragma once
#include <string>

struct Code_Execution_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_14[9];
	std::string code;
	char bytes19_38[20];

};

void Read_Code_Execution_Details(struct Code_Execution_Details* details, FILE* read_file);
void Write_Code_Execution_Details(struct Code_Execution_Details* details, FILE* write_file);
