#pragma once

struct Background_Change_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[41];
};

void Read_Background_Change_Details(struct Background_Change_Details* details, FILE* read_file);
void Write_Background_Change_Details(struct Background_Change_Details* details, FILE* write_file);
