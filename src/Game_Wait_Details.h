#pragma once

struct Game_Wait_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_38[33];
	int game_wait_execution_time;
};

void Read_Game_Wait_Details(struct Game_Wait_Details* details, FILE* read_file);
void Write_Game_Wait_Details(struct Game_Wait_Details* details, FILE* write_file);
