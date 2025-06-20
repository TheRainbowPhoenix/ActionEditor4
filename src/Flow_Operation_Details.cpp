#include <stdio.h>
#include <stdlib.h>
#include "Flow_Operation_Details.h"

void Read_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* read_file) {
	fread(&details->bytes1_34, sizeof(char), 34, read_file);
	fread(&details->condition_present, sizeof(char), 1, read_file);
	fread(&details->judgment_type, sizeof(char), 1, read_file);
	fread(&details->bytes37_40, sizeof(char), 4, read_file);
	fread(&details->number_of_condition_data, sizeof(int), 1, read_file);
	if (details->number_of_condition_data > 0) {
		details->condition_data.resize(details->number_of_condition_data);
		for (int i = 0; i < details->number_of_condition_data; ++i) {
			Read_Basic_Condition_Data(&details->condition_data[i], read_file);
		}
	}
	fread(&details->bytes45_52, sizeof(char), 8, read_file);
	fread(&details->operation, sizeof(int), 1, read_file);
	fread(&details->target_flow, sizeof(int), 1, read_file);
	fread(&details->id, sizeof(int), 1, read_file);
	fread(&details->target_character, sizeof(int), 1, read_file);
	fread(&details->assign_return_value_to_flow_variable, sizeof(int), 1, read_file);
}

void Write_Flow_Operation_Details(struct Flow_Operation_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_34, sizeof(char), 34, write_file);
	fwrite(&details->condition_present, sizeof(char), 1, write_file);
	fwrite(&details->judgment_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes37_40, sizeof(char), 4, write_file);
	fwrite(&details->number_of_condition_data, sizeof(int), 1, write_file);
	if (details->number_of_condition_data > 0) {
		for (int i = 0; i < details->number_of_condition_data; ++i) {
			Write_Basic_Condition_Data(&details->condition_data[i], write_file);
		}
	}
	fwrite(&details->bytes45_52, sizeof(char), 8, write_file);
	fwrite(&details->operation, sizeof(int), 1, write_file);
	fwrite(&details->target_flow, sizeof(int), 1, write_file);
	fwrite(&details->id, sizeof(int), 1, write_file);
	fwrite(&details->target_character, sizeof(int), 1, write_file);
	fwrite(&details->assign_return_value_to_flow_variable, sizeof(int), 1, write_file);
}
