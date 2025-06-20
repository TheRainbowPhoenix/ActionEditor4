#pragma once

struct Screen_Outside_Avoidance_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_101[96];
};

void Read_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* read_file);
void Write_Screen_Outside_Avoidance_Movement_Details(struct Screen_Outside_Avoidance_Movement_Details* details, FILE* write_file);
