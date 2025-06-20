#pragma once

struct Direction_Change_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_42[37];
};

void Read_Direction_Change_Details(struct Direction_Change_Details* details, FILE* read_file);
void Write_Direction_Change_Details(struct Direction_Change_Details* details, FILE* write_file);
