#pragma once

struct Basic_Animation_Set_Change_Details {
	char bytes1_38[38];
	int animation_set;
};

void Read_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* read_file);
void Write_Basic_Animation_Set_Change_Details(struct Basic_Animation_Set_Change_Details* details, FILE* write_file);
