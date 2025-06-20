#pragma once

struct Graphic_Change_Details {
	char bytes1_38[38];
	int image_type;
	int image_number;
	int offset;
};

void Read_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* read_file);
void Write_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* write_file);
