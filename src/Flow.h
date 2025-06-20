#pragma once
#include <string>
#include <vector>
#include "Basic_Condition.h"
#include "Key_Condition.h"
#include "Command.h"

struct Flow {
	int start;
	char id;
	char group;
	char test_play_only;
	char basic_condition_judgment_type;
	char basic_condition_once_met_always_met;
	char timing;
	char target_character_involved_in_timing;
	char target_number_of_character_involved_in_timing;
	char ease_of_input_with_multiple_key_conditions;
	char allow_continuous_execution_by_holding_key;

	int unknown2;

	int memo_length;
	std::string memo;
	std::vector<Basic_Condition> basic_condition_data;
	std::vector<Key_Condition> key_condition_data;
	std::vector<Command> command_data;
};

void Read_Flow_Data(struct Flow* flow_data, FILE* read_file);
void Write_Flow_Data(struct Flow* flow_data, FILE* write_file);
