#pragma once

struct Status_Operation_2_Details {
	char bytes1_38[38];
	int target;
	int status;
	int on;
	char bytes51_62[12];
};

void Read_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* read_file);
void Write_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* write_file);
