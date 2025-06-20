#pragma once

struct Arrangement_Details {
	char bytes1_38[38];
	int command;
	int parameter;
	int operator_type;
	int variable_type;
	int variable_number;
};

void Read_Arrangement_Details(struct Arrangement_Details* details, FILE* read_file);
void Write_Arrangement_Details(struct Arrangement_Details* details, FILE* write_file);
