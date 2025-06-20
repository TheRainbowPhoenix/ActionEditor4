#pragma once

#include <vector>
#include <string>

struct Effect_Animation {
	int start; //2
	int frame;
	int display_time;
	int end; //0
};

struct Effect_Record {
	int start; //4
	int same_as_file_name;
	int horizontal_width;
	int vertical_width;
	int allow_gigantic_size;
	int number_of_strings;//2 for name and path
	std::string name;
	std::string path;
	std::vector<Effect_Animation> effect_animations;
};

struct Effect_Database {
	int version;
	int number_of_records;
	std::vector<Effect_Record> records;//[0] is not used
};


void Read_Effect_Database(struct Effect_Database* database);
void Write_Effect_Database(struct Effect_Database* database);
