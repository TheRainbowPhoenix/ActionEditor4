#pragma once

#include <vector>
#include <string>

struct Sword_Position {
	int start; //10
	int position_offset_x;
	int position_offset_y;
	int position_offset_x_flip_if_facing_right;
	int position_offset_y_flip_if_facing_right;
	int direction;
	int display_source_coordinate_x;
	int display_source_coordinate_y;
	int horizontal_width;
	int vertical_width;
	int display_time;
	int end; //0
};

struct Sword_Type_Record {
	int start; //1
	int same_as_file_name;
	int number_of_strings; //3
	std::string name;
	std::string left_facing_bitmap;
	std::string right_facing_bitmap;
	std::vector<Sword_Position> sword_positions;
};

struct Sword_Type_Database {
	int version;
	int number_of_records;
	std::vector<Sword_Type_Record> records;//[0] is not used
};

void Read_Sword_Type_Database(struct Sword_Type_Database* database);
void Write_Sword_Type_Database(struct Sword_Type_Database* database);
