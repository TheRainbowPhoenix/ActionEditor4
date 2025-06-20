#pragma once

#include <vector>
#include <string>

struct Character_Exclusive_Bmp_Record {
	int start; //3
	int same_as_file_name;
	int is_gigantic_character;
	int size;
	int number_of_strings;//2 for name and path
	std::string name;
	std::string path;
};

struct Character_Exclusive_Bmp_Database {
	int version;
	int number_of_records;
	std::vector<Character_Exclusive_Bmp_Record> records;//[0] is not used
};

void Read_Character_Exclusive_Bmp_Database(struct Character_Exclusive_Bmp_Database* database);
void Write_Character_Exclusive_Bmp_Database(struct Character_Exclusive_Bmp_Database* database);
