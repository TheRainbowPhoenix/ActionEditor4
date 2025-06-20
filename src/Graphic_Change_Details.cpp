#include <stdio.h>
#include "Graphic_Change_Details.h"

void Read_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->image_type, sizeof(int), 1, read_file);
	fread(&details->image_number, sizeof(int), 1, read_file);
	fread(&details->offset, sizeof(int), 1, read_file);
}

void Write_Graphic_Change_Details(struct Graphic_Change_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->image_type, sizeof(int), 1, write_file);
	fwrite(&details->image_number, sizeof(int), 1, write_file);
	fwrite(&details->offset, sizeof(int), 1, write_file);
}
