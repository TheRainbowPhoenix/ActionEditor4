#include <stdio.h>
#include "Status_Operation_Details.h"

void Read_Status_Operation_Details(struct Status_Operation_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->operation_target_type, sizeof(char), 1, read_file);
	fread(&details->bytes40_43, sizeof(char), 4, read_file);
	fread(&details->operation_target_variable_type, sizeof(char), 1, read_file);
	fread(&details->bytes45_46, sizeof(char), 2, read_file);
	fread(&details->operation_target_variable_number, sizeof(short int), 1, read_file);
	fread(&details->bytes49_52, sizeof(char), 4, read_file);
	fread(&details->operation_target_target, sizeof(char), 1, read_file);
	fread(&details->bytes54_56, sizeof(char), 3, read_file);
	fread(&details->operation_target_status, sizeof(char), 1, read_file);
	fread(&details->byte58, sizeof(char), 1, read_file);
	fread(&details->operation_target_flow_variable_number, sizeof(char), 1, read_file);
	fread(&details->bytes60_62, sizeof(char), 3, read_file);
	fread(&details->operator_type, sizeof(char), 1, read_file);
	fread(&details->bytes64_66, sizeof(char), 3, read_file);
	fread(&details->calculation_content_type, sizeof(int), 1, read_file);
	fread(&details->calculation_content_constant, sizeof(int), 1, read_file);
	fread(&details->calculation_content_random_lower_limit, sizeof(int), 1, read_file);
	fread(&details->calculation_content_random_upper_limit, sizeof(int), 1, read_file);
	fread(&details->calculation_content_variable_type, sizeof(int), 1, read_file);
	fread(&details->calculation_content_variable_number, sizeof(int), 1, read_file);
	fread(&details->calculation_content_target, sizeof(int), 1, read_file);
	fread(&details->calculation_content_status, sizeof(int), 1, read_file);
	fread(&details->calculation_content_flow_variable_number, sizeof(int), 1, read_file);
	fread(&details->bytes103_138, sizeof(char), 36, read_file);
}

void Write_Status_Operation_Details(struct Status_Operation_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->operation_target_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes40_43, sizeof(char), 4, write_file);
	fwrite(&details->operation_target_variable_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes45_46, sizeof(char), 2, write_file);
	fwrite(&details->operation_target_variable_number, sizeof(short int), 1, write_file);
	fwrite(&details->bytes49_52, sizeof(char), 4, write_file);
	fwrite(&details->operation_target_target, sizeof(char), 1, write_file);
	fwrite(&details->bytes54_56, sizeof(char), 3, write_file);
	fwrite(&details->operation_target_status, sizeof(char), 1, write_file);
	fwrite(&details->byte58, sizeof(char), 1, write_file);
	fwrite(&details->operation_target_flow_variable_number, sizeof(char), 1, write_file);
	fwrite(&details->bytes60_62, sizeof(char), 3, write_file);
	fwrite(&details->operator_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes64_66, sizeof(char), 3, write_file);
	fwrite(&details->calculation_content_type, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_constant, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_random_lower_limit, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_random_upper_limit, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_variable_type, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_variable_number, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_target, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_status, sizeof(int), 1, write_file);
	fwrite(&details->calculation_content_flow_variable_number, sizeof(int), 1, write_file);
	fwrite(&details->bytes103_138, sizeof(char), 36, write_file);
}
