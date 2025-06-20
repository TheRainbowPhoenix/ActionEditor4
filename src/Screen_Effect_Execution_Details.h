#pragma once

struct Screen_Effect_Execution_Details {
	char bytes1_38[38];
	int effect;
	int execution_type;
	int loop_execution;
};

void Read_Screen_Effect_Execution_Details(struct Screen_Effect_Execution_Details* details, FILE* read_file);
void Write_Screen_Effect_Execution_Details(struct Screen_Effect_Execution_Details* details, FILE* write_file);
