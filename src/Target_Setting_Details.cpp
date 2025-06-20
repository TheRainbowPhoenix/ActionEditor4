#include <stdio.h>
#include "Target_Setting_Details.h"

void Read_Target_Setting_Details(struct Target_Setting_Details* details, FILE* read_file) {
	fread(&details->bytes1_38, sizeof(char), 38, read_file);
	fread(&details->bytes39_106, sizeof(char), 68, read_file);
}

void Write_Target_Setting_Details(struct Target_Setting_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_38, sizeof(char), 38, write_file);
	fwrite(&details->bytes39_106, sizeof(char), 68, write_file);
}
