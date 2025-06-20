#pragma once

struct Command {
	Command();
	~Command();
	Command(const Command& r);
	Command& operator=(const Command& r);
	int start; //08 00 00 00
	char byte5;
	char type;
	void* details;
};

void Read_Command_Data(struct Command* command_data, FILE* read_file);
void Write_Command_Data(struct Command* command_data, FILE* write_file);
