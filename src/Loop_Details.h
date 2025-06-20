#pragma once

struct Loop_Details {
	char bytes1_38[38];
	int repeat_count;
	int command_count;
};

void Read_Loop_Details(struct Loop_Details* details, FILE* read_file);
void Write_Loop_Details(struct Loop_Details* details, FILE* write_file);
