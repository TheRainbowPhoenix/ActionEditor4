#pragma once

struct Item_Acquisition_Details {
	char bytes1_38[38];
	int palette_type;
	int palette_data_number;
};

void Read_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* read_file);
void Write_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* write_file);
