#include <stdio.h>
#include "Game_Wait_Details.h"

void Read_Game_Wait_Details(struct Game_Wait_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(details->bytes6_38, sizeof(char), 33, read_file);
	fread(&details->game_wait_execution_time, sizeof(int), 1, read_file);
}

void Write_Game_Wait_Details(struct Game_Wait_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(details->bytes6_38, sizeof(char), 33, write_file);
	fwrite(&details->game_wait_execution_time, sizeof(int), 1, write_file);
}
