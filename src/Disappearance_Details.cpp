#include <stdio.h>
#include "Disappearance_Details.h"

void Read_Disappearance_Details(struct Disappearance_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->target, sizeof(int), 1, read_file);
	fread(&details->faction, sizeof(int), 1, read_file);
	fread(&details->range, sizeof(int), 1, read_file);
	fread(&details->assign_return_value_to_flow_variable, sizeof(int), 1, read_file);
}

void Write_Disappearance_Details(struct Disappearance_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->target, sizeof(int), 1, write_file);
	fwrite(&details->faction, sizeof(int), 1, write_file);
	fwrite(&details->range, sizeof(int), 1, write_file);
	fwrite(&details->assign_return_value_to_flow_variable, sizeof(int), 1, write_file);
}
