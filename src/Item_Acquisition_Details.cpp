#include <stdio.h>
#include "Item_Acquisition_Details.h"

void Read_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->palette_type, sizeof(int), 1, read_file);
	fread(&details->palette_data_number, sizeof(int), 1, read_file);
}

void Write_Item_Acquisition_Details(struct Item_Acquisition_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->palette_type, sizeof(int), 1, write_file);
	fwrite(&details->palette_data_number, sizeof(int), 1, write_file);
}
