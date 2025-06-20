#pragma once

struct Status_Operation_Details {
	char bytes1_38[38];
	char operation_target_type;
	char bytes40_43[4];
	char operation_target_variable_type;
	char bytes45_46[2];
	short int operation_target_variable_number;
	char bytes49_52[4];
	char operation_target_target;
	char bytes54_56[3];
	char operation_target_status;
	char byte58;
	char operation_target_flow_variable_number;
	char bytes60_62[3];
	char operator_type;
	char bytes64_66[3];
	int calculation_content_type;
	int calculation_content_constant;
	int calculation_content_random_lower_limit;
	int calculation_content_random_upper_limit;
	int calculation_content_variable_type;
	int calculation_content_variable_number;
	int calculation_content_target;
	int calculation_content_status;
	int calculation_content_flow_variable_number;
	char bytes103_138[36];
};

void Read_Status_Operation_Details(struct Status_Operation_Details* details, FILE* read_file);
void Write_Status_Operation_Details(struct Status_Operation_Details* details, FILE* write_file);
