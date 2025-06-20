#include <stdio.h>
#include "Item_Summon_Details.h"

void Read_Item_Summon_Details(struct Item_Summon_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->sound_effect, sizeof(short int), 1, read_file);
	fread(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->animation, sizeof(char), 1, read_file);
	fread(&details->bytes10_30, sizeof(char), 21, read_file);
	fread(&details->count, sizeof(char), 1, read_file);
	fread(&details->formation, sizeof(char), 1, read_file);
	fread(&details->interval, sizeof(short int), 1, read_file);
	fread(&details->number_of_columns, sizeof(short int), 1, read_file);
	fread(&details->column_interval, sizeof(short int), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->direction, sizeof(char), 1, read_file);
	fread(&details->byte41, sizeof(char), 1, read_file);
	fread(&details->target, sizeof(char), 1, read_file);
	fread(&details->bytes43_51, sizeof(char), 9, read_file);
	fread(&details->summon_position_offset_x, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_y, sizeof(int), 1, read_file);
	fread(&details->summon_position_offset_x_flip, sizeof(char), 1, read_file);
	fread(&details->summon_position_offset_y_flip, sizeof(char), 1, read_file);
	fread(&details->bytes62_66, sizeof(char), 5, read_file);
	fread(&details->faction, sizeof(char), 1, read_file);
	fread(&details->bytes68_88, sizeof(char), 21, read_file);
	fread(&details->existence_time, sizeof(short int), 1, read_file);
	fread(&details->existence_time_present, sizeof(char), 1, read_file);
	fread(&details->bytes92_119, sizeof(char), 28, read_file);
	fread(&details->palette_type, sizeof(char), 1, read_file);
	fread(&details->palette_data_number, sizeof(short int), 1, read_file);
	fread(&details->faction_specification_method, sizeof(char), 1, read_file);
	fread(&details->set_acquired_score_to_0, sizeof(char), 1, read_file);
	fread(&details->direction_flip, sizeof(char), 1, read_file);
	fread(&details->attack, sizeof(char), 1, read_file);
	fread(&details->attack_flow, sizeof(char), 1, read_file);
	fread(&details->bytes128_143, sizeof(char), 16, read_file);
}

void Write_Item_Summon_Details(struct Item_Summon_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->sound_effect, sizeof(short int), 1, write_file);
	fwrite(&details->play_sound_effect_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->animation, sizeof(char), 1, write_file);
	fwrite(&details->bytes10_30, sizeof(char), 21, write_file);
	fwrite(&details->count, sizeof(char), 1, write_file);
	fwrite(&details->formation, sizeof(char), 1, write_file);
	fwrite(&details->interval, sizeof(short int), 1, write_file);
	fwrite(&details->number_of_columns, sizeof(short int), 1, write_file);
	fwrite(&details->column_interval, sizeof(short int), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->direction, sizeof(char), 1, write_file);
	fwrite(&details->byte41, sizeof(char), 1, write_file);
	fwrite(&details->target, sizeof(char), 1, write_file);
	fwrite(&details->bytes43_51, sizeof(char), 9, write_file);
	fwrite(&details->summon_position_offset_x, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_y, sizeof(int), 1, write_file);
	fwrite(&details->summon_position_offset_x_flip, sizeof(char), 1, write_file);
	fwrite(&details->summon_position_offset_y_flip, sizeof(char), 1, write_file);
	fwrite(&details->bytes62_66, sizeof(char), 5, write_file);
	fwrite(&details->faction, sizeof(char), 1, write_file);
	fwrite(&details->bytes68_88, sizeof(char), 21, write_file);
	fwrite(&details->existence_time, sizeof(short int), 1, write_file);
	fwrite(&details->existence_time_present, sizeof(char), 1, write_file);
	fwrite(&details->bytes92_119, sizeof(char), 28, write_file);
	fwrite(&details->palette_type, sizeof(char), 1, write_file);
	fwrite(&details->palette_data_number, sizeof(short int), 1, write_file);
	fwrite(&details->faction_specification_method, sizeof(char), 1, write_file);
	fwrite(&details->set_acquired_score_to_0, sizeof(char), 1, write_file);
	fwrite(&details->direction_flip, sizeof(char), 1, write_file);
	fwrite(&details->attack, sizeof(char), 1, write_file);
	fwrite(&details->attack_flow, sizeof(char), 1, write_file);
	fwrite(&details->bytes128_143, sizeof(char), 16, write_file);
}
