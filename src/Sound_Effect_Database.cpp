#include "Sound_Effect_Database.h"

void Read_Sound_Effect_Database(struct Sound_Effect_Database* database) {
	int temp_size;
	char* temp_str;

	FILE* read_file = fopen("data/database/Sound.dat", "rb");
	if (read_file != NULL) {
		fread(&database->version, sizeof(int), 1, read_file);
		fread(&database->number_of_records, sizeof(int), 1, read_file);
		if (database->number_of_records > 0) {
			database->records.resize(database->number_of_records);
			for (int i = 0; i < database->records.size(); ++i) {
				fread(&database->records[i].start, sizeof(int), 1, read_file);
				fread(&database->records[i].same_as_file_name, sizeof(int), 1, read_file);
				fread(&database->records[i].number_of_strings, sizeof(int), 1, read_file);
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].name = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].path = temp_str;
					delete[] temp_str;
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Sound_Effect_Database(struct Sound_Effect_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/Sound.dat", "wb");
	if (write_file != NULL) {
		fwrite(&database->version, sizeof(int), 1, write_file);
		fwrite(&database->number_of_records, sizeof(int), 1, write_file);
		if (database->number_of_records > 0) {
			for (int i = 0; i < database->records.size(); ++i) {
				fwrite(&database->records[i].start, sizeof(int), 1, write_file);
				fwrite(&database->records[i].same_as_file_name, sizeof(int), 1, write_file);
				fwrite(&database->records[i].number_of_strings, sizeof(int), 1, write_file);
				temp_size = database->records[i].name.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].name.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].path.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].path.c_str(), sizeof(char), temp_size, write_file);
				}
			}
		}
		fclose(write_file);
	}
}
