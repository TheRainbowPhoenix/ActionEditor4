#pragma once

struct Movement_Invalidation_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Movement_Invalidation_Details(struct Movement_Invalidation_Details* details, FILE* read_file);
void Write_Movement_Invalidation_Details(struct Movement_Invalidation_Details* details, FILE* write_file);
