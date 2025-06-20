#include "Character_Effect_Database.h"

void Read_Character_Effect_Database(struct Character_Effect_Database* database) {
	int temp_size;
	char* temp_str;

	FILE* read_file = fopen("data/database/CharaEffect.dat", "rb");
	if (read_file != NULL) {
		fread(&database->version, sizeof(int), 1, read_file);
		fread(&database->number_of_records, sizeof(int), 1, read_file);
		if (database->number_of_records > 0) {
			database->records.resize(database->number_of_records);
			for (int i = 0; i < database->number_of_records; ++i) {
				fread(&database->records[i].start, sizeof(int), 1, read_file);
				fread(&database->records[i].effect, sizeof(int), 1, read_file);
				fread(&database->records[i].execution_time, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter1, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter2, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter3, sizeof(int), 1, read_file);
				fread(&database->records[i].parameter4, sizeof(int), 1, read_file);
				fread(&database->records[i].number_of_strings, sizeof(int), 1, read_file);
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].name = temp_str;
					delete[] temp_str;
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Character_Effect_Database(struct Character_Effect_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/CharaEffect.dat", "wb");
	if (write_file != NULL) {
		fwrite(&database->version, sizeof(int), 1, write_file);
		fwrite(&database->number_of_records, sizeof(int), 1, write_file);
		if (database->number_of_records > 0) {
			for (int i = 0; i < database->number_of_records; ++i) {
				fwrite(&database->records[i].start, sizeof(int), 1, write_file);
				fwrite(&database->records[i].effect, sizeof(int), 1, write_file);
				fwrite(&database->records[i].execution_time, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter1, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter2, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter3, sizeof(int), 1, write_file);
				fwrite(&database->records[i].parameter4, sizeof(int), 1, write_file);
				fwrite(&database->records[i].number_of_strings, sizeof(int), 1, write_file);
				temp_size = database->records[i].name.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].name.c_str(), sizeof(char), temp_size, write_file);
				}
			}
		}
		fclose(write_file);
	}
}
