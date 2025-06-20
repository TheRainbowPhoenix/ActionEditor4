#pragma once

struct Disappearance_Details {
	char bytes1_38[38];
	int target;
	int faction;
	int range;
	int assign_return_value_to_flow_variable;
};

void Read_Disappearance_Details(struct Disappearance_Details* details, FILE* read_file);
void Write_Disappearance_Details(struct Disappearance_Details* details, FILE* write_file);
