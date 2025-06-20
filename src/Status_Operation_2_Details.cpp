#include <stdio.h>
#include "Status_Operation_2_Details.h"

void Read_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->target, sizeof(int), 1, read_file);
	fread(&details->status, sizeof(int), 1, read_file);
	fread(&details->on, sizeof(int), 1, read_file);
	fread(&details->bytes51_62, sizeof(char), 12, read_file);
}

void Write_Status_Operation_2_Details(struct Status_Operation_2_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->target, sizeof(int), 1, write_file);
	fwrite(&details->status, sizeof(int), 1, write_file);
	fwrite(&details->on, sizeof(int), 1, write_file);
	fwrite(&details->bytes51_62, sizeof(char), 12, write_file);
}
