#pragma once

struct Circular_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Circular_Movement_Details(struct Circular_Movement_Details* details, FILE* read_file);
void Write_Circular_Movement_Details(struct Circular_Movement_Details* details, FILE* write_file);
