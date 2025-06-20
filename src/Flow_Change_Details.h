#pragma once
#include <vector>
#include "Flow.h"

struct Flow_Change_Details {
	char bytes1_30[30];
	std::vector<Flow> flow_data;
	char bytes69_72[4];
	int operation;
	char bytes77_80[4];
};

void Read_Flow_Change_Details(struct Flow_Change_Details* details, FILE* read_file);
void Write_Flow_Change_Details(struct Flow_Change_Details* details, FILE* write_file);
