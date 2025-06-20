#include <stdio.h>
#include <stdlib.h>
#include "Basic_Condition.h"
#include "Key_Condition.h"
#include "Flow.h"

void Read_Flow_Data(struct Flow* flow_data, FILE* read_file) {
	char* temp_str;
	int size;

	fread(&flow_data->start, sizeof(int), 1, read_file);
	fread(&flow_data->id, sizeof(char), 1, read_file);
	fread(&flow_data->group, sizeof(char), 1, read_file);
	fread(&flow_data->test_play_only, sizeof(char), 1, read_file);
	fread(&flow_data->basic_condition_judgment_type, sizeof(char), 1, read_file);
	fread(&flow_data->basic_condition_once_met_always_met, sizeof(char), 1, read_file);
	fread(&flow_data->timing, sizeof(char), 1, read_file);
	fread(&flow_data->target_character_involved_in_timing, sizeof(char), 1, read_file);
	fread(&flow_data->target_number_of_character_involved_in_timing, sizeof(char), 1, read_file);
	fread(&flow_data->ease_of_input_with_multiple_key_conditions, sizeof(char), 1, read_file);
	fread(&flow_data->allow_continuous_execution_by_holding_key, sizeof(char), 1, read_file);

	fread(&flow_data->unknown2, sizeof(int), 1, read_file);

	fread(&flow_data->memo_length, sizeof(int), 1, read_file);
	if(flow_data->memo_length > 1) {
		temp_str = new char[flow_data->memo_length];
		fread(temp_str, sizeof(char), flow_data->memo_length, read_file);
		flow_data->memo = temp_str;
		delete[] temp_str;
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		flow_data->basic_condition_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Basic_Condition_Data(&flow_data->basic_condition_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		flow_data->key_condition_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Key_Condition_Data(&flow_data->key_condition_data[i], read_file);
		}
	}

	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		flow_data->command_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Command_Data(&flow_data->command_data[i], read_file);
		}
	}
}

void Write_Flow_Data(struct Flow* flow_data, FILE* write_file) {
	int temp_size;

	fwrite(&flow_data->start, sizeof(int), 1, write_file);
	fwrite(&flow_data->id, sizeof(char), 1, write_file);
	fwrite(&flow_data->group, sizeof(char), 1, write_file);
	fwrite(&flow_data->test_play_only, sizeof(char), 1, write_file);
	fwrite(&flow_data->basic_condition_judgment_type, sizeof(char), 1, write_file);
	fwrite(&flow_data->basic_condition_once_met_always_met, sizeof(char), 1, write_file);
	fwrite(&flow_data->timing, sizeof(char), 1, write_file);
	fwrite(&flow_data->target_character_involved_in_timing, sizeof(char), 1, write_file);
	fwrite(&flow_data->target_number_of_character_involved_in_timing, sizeof(char), 1, write_file);
	fwrite(&flow_data->ease_of_input_with_multiple_key_conditions, sizeof(char), 1, write_file);
	fwrite(&flow_data->allow_continuous_execution_by_holding_key, sizeof(char), 1, write_file);

	fwrite(&flow_data->unknown2, sizeof(int), 1, write_file);

	fwrite(&flow_data->memo_length, sizeof(int), 1, write_file);
	if(flow_data->memo_length > 1) {
		fwrite(flow_data->memo.c_str(), sizeof(char), flow_data->memo_length, write_file);
	}

	temp_size = flow_data->basic_condition_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Basic_Condition_Data(&flow_data->basic_condition_data[i], write_file);
		}
	}

	temp_size = flow_data->key_condition_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Key_Condition_Data(&flow_data->key_condition_data[i], write_file);
		}
	}

	temp_size = flow_data->command_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Command_Data(&flow_data->command_data[i], write_file);
		}
	}
}
