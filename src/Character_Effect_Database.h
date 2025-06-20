#pragma once

#include <vector>
#include <string>

struct Character_Effect_Record {
	int start; //2
	int effect; //burst is 1
	int execution_time;
	int parameter1;
	int parameter2;
	int parameter3;
	int parameter4;
	int number_of_strings;//1 for name
	std::string name;
};

struct Character_Effect_Database {
	int version;
	int number_of_records;
	std::vector<Character_Effect_Record> records;//[0] is not used
};

void Read_Character_Effect_Database(struct Character_Effect_Database* database);
void Write_Character_Effect_Database(struct Character_Effect_Database* database);
