#include "Flow_Change_Details.h"

void Read_Flow_Change_Details(struct Flow_Change_Details* details, FILE* read_file) {
	fread(&details->bytes1_30, sizeof(char), 30, read_file);

	int size;
	fread(&size, sizeof(int), 1, read_file);
	if (size > 0) {
		details->flow_data.resize(size);
		for (int i = 0; i < size; ++i) {
			Read_Flow_Data(&details->flow_data[i], read_file);
		}
	}
	fread(&details->bytes69_72, sizeof(char), 4, read_file);
	fread(&details->operation, sizeof(int), 1, read_file);
	fread(&details->bytes77_80, sizeof(char), 4, read_file);
}

void Write_Flow_Change_Details(struct Flow_Change_Details* details, FILE * write_file) {
	fwrite(&details->bytes1_30, sizeof(char), 30, write_file);

	int temp_size = details->flow_data.size();
	fwrite(&temp_size, sizeof(int), 1, write_file);
	if (temp_size > 0) {
		for (int i = 0; i < temp_size; ++i) {
			Write_Flow_Data(&details->flow_data[i], write_file);
		}
	}
	fwrite(&details->bytes69_72, sizeof(char), 4, write_file);
	fwrite(&details->operation, sizeof(int), 1, write_file);
	fwrite(&details->bytes77_80, sizeof(char), 4, write_file);
}
