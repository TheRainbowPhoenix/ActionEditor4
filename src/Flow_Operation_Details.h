#pragma once
#include <vector>
#include"Basic_Condition.h"

struct Flow_Operation_Details {
	char bytes1_34[34];
	char condition_present;
	char judgment_type;
	char bytes37_40[4];
	int number_of_condition_data;
	std::vector<Basic_Condition> condition_data;
	char bytes45_52[8];
	int operation;
	int target_flow;
	int id;
	int target_character;
	int assign_return_value_to_flow_variable;
};

void Read_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* read_file);
void Write_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* write_file);
