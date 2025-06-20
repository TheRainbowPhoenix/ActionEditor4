#pragma once

struct Guided_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Guided_Movement_Details(struct Guided_Movement_Details* details, FILE* read_file);
void Write_Guided_Movement_Details(struct Guided_Movement_Details* details, FILE* write_file);
