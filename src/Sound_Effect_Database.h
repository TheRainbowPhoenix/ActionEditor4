#pragma once

#include <vector>
#include <string>

struct Sound_Effect_Record {
	int start; //1
	int same_as_file_name;
	int number_of_strings;//2 for name and path
	std::string name;
	std::string path;
};

struct Sound_Effect_Database {
	int version;
	int number_of_records;
	std::vector<Sound_Effect_Record> records;//[0] is not used
};

void Read_Sound_Effect_Database(struct Sound_Effect_Database* database);
void Write_Sound_Effect_Database(struct Sound_Effect_Database* database);
