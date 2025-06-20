#pragma once

struct Target_Setting_Details {
	char bytes1_38[38];
	char bytes39_106[68];
};

void Read_Target_Setting_Details(struct Target_Setting_Details* details, FILE* read_file);
void Write_Target_Setting_Details(struct Target_Setting_Details* details, FILE* write_file);
