#include <stdio.h>
#include "Screen_Color_Change_Details.h"

void Read_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->r, sizeof(int), 1, read_file);
	fread(&details->g, sizeof(int), 1, read_file);
	fread(&details->b, sizeof(int), 1, read_file);
	fread(&details->percent, sizeof(int), 1, read_file);
	fread(&details->restore_to_original_color, sizeof(int), 1, read_file);
	fread(&details->time_required_for_change, sizeof(int), 1, read_file);
	fread(&details->instant_display, sizeof(int), 1, read_file);
	fread(&details->instant_display_count, sizeof(int), 1, read_file);
}

void Write_Screen_Color_Change_Details(struct Screen_Color_Change_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->r, sizeof(int), 1, write_file);
	fwrite(&details->g, sizeof(int), 1, write_file);
	fwrite(&details->b, sizeof(int), 1, write_file);
	fwrite(&details->percent, sizeof(int), 1, write_file);
	fwrite(&details->restore_to_original_color, sizeof(int), 1, write_file);
	fwrite(&details->time_required_for_change, sizeof(int), 1, write_file);
	fwrite(&details->instant_display, sizeof(int), 1, write_file);
	fwrite(&details->instant_display_count, sizeof(int), 1, write_file);
}

