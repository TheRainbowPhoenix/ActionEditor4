#pragma once

struct Picture_Display_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[113];
};

void Read_Picture_Display_Details(struct Picture_Display_Details* details, FILE* read_file);
void Write_Picture_Display_Details(struct Picture_Display_Details* details, FILE* write_file);
