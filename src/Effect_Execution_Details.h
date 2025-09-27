#pragma once

struct Effect_Execution_Details {
	char bytes1_38[38];
	char bytes39_78[40];
};

void Read_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* read_file);
void Write_Effect_Execution_Details(struct Effect_Execution_Details* details, FILE* write_file);
