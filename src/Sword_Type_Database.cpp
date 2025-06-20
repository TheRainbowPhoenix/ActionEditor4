#include "Sword_Type_Database.h"

void Read_Sword_Type_Database(struct Sword_Type_Database* database) {
	int temp_size;
	char* temp_str;
	Sword_Position* temp_position;

	FILE* read_file = fopen("data/database/SwordType.dat", "rb");
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
					database->records[i].left_facing_bitmap = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 1) {
					temp_str = new char[temp_size];
					fread(temp_str, sizeof(char), temp_size, read_file);
					database->records[i].right_facing_bitmap = temp_str;
					delete[] temp_str;
				}
				fread(&temp_size, sizeof(int), 1, read_file);
				if (temp_size > 0) {
					for (int j = 0; j < temp_size; ++j) {
						temp_position = new Sword_Position();
						fread(&temp_position->start, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_x, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_y, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_x_flip_if_facing_right, sizeof(int), 1, read_file);
						fread(&temp_position->position_offset_y_flip_if_facing_right, sizeof(int), 1, read_file);
						fread(&temp_position->direction, sizeof(int), 1, read_file);
						fread(&temp_position->display_source_coordinate_x, sizeof(int), 1, read_file);
						fread(&temp_position->display_source_coordinate_y, sizeof(int), 1, read_file);
						fread(&temp_position->horizontal_width, sizeof(int), 1, read_file);
						fread(&temp_position->vertical_width, sizeof(int), 1, read_file);
						fread(&temp_position->display_time, sizeof(int), 1, read_file);
						fread(&temp_position->end, sizeof(int), 1, read_file);
						database->records[i].sword_positions.push_back(*temp_position);
						delete temp_position;
					}
				}
			}
		}
		fclose(read_file);
	}
}

void Write_Sword_Type_Database(struct Sword_Type_Database* database) {
	int temp_size;

	FILE* write_file = fopen("data/database/SwordType.dat", "wb");
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
				temp_size = database->records[i].left_facing_bitmap.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].left_facing_bitmap.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].right_facing_bitmap.size() + 1;
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 1) {
					fwrite(database->records[i].right_facing_bitmap.c_str(), sizeof(char), temp_size, write_file);
				}
				temp_size = database->records[i].sword_positions.size();
				fwrite(&temp_size, sizeof(int), 1, write_file);
				if (temp_size > 0) {
					for (int j = 0; j < temp_size; ++j) {
						fwrite(&database->records[i].sword_positions[j].start, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_x, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_y, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_x_flip_if_facing_right, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].position_offset_y_flip_if_facing_right, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].direction, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].display_source_coordinate_x, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].display_source_coordinate_y, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].horizontal_width, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].vertical_width, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].display_time, sizeof(int), 1, write_file);
						fwrite(&database->records[i].sword_positions[j].end, sizeof(int), 1, write_file);
					}
				}
			}
		}
		fclose(write_file);
	}
}
