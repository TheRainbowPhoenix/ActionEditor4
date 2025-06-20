#include "stdio.h"

#include "Event_Page.h"



void Read_Event_Page(struct Event_Page* page, FILE* read_file) {

	int size;

	char* temp_str;



	fread(&page->start, sizeof(int), 1, read_file);

	fread(&page->event_type, sizeof(int), 1, read_file);

	fread(&page->graphic, sizeof(int), 1, read_file);

	fread(&page->world_number, sizeof(int), 1, read_file);

	fread(&page->passable_without_clearing, sizeof(int), 1, read_file);

	fread(&page->playable_after_clearing, sizeof(int), 1, read_file);

	fread(&page->game_clear, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_world, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_variable, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_constant, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_comparison_content, sizeof(int), 1, read_file);

	fread(&page->appearance_condition_total_score, sizeof(int), 1, read_file);

	fread(&page->variation_setting_present, sizeof(int), 1, read_file);

	fread(&page->variation_variable, sizeof(int), 1, read_file);

	fread(&page->variation_constant, sizeof(int), 1, read_file);

	fread(&page->string_count, sizeof(int), 1, read_file);



	fread(&size, sizeof(int), 1, read_file);

	if (size > 1) {

		temp_str = new char[size];

		fread(temp_str, sizeof(char), size, read_file);

		page->world_name = temp_str;

		delete[] temp_str;

	}



	fread(&size, sizeof(int), 1, read_file);

	if (size > 1) {

		temp_str = new char[size];

		fread(temp_str, sizeof(char), size, read_file);

		page->start_stage = temp_str;

		delete[] temp_str;

	}

}



void Write_Event_Page(struct Event_Page* page, FILE* write_file) {

	int size;



	fwrite(&page->start, sizeof(int), 1, write_file);

	fwrite(&page->event_type, sizeof(int), 1, write_file);

	fwrite(&page->graphic, sizeof(int), 1, write_file);

	fwrite(&page->world_number, sizeof(int), 1, write_file);

	fwrite(&page->passable_without_clearing, sizeof(int), 1, write_file);

	fwrite(&page->playable_after_clearing, sizeof(int), 1, write_file);

	fwrite(&page->game_clear, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_world, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_variable, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_constant, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_comparison_content, sizeof(int), 1, write_file);

	fwrite(&page->appearance_condition_total_score, sizeof(int), 1, write_file);

	fwrite(&page->variation_setting_present, sizeof(int), 1, write_file);

	fwrite(&page->variation_variable, sizeof(int), 1, write_file);

	fwrite(&page->variation_constant, sizeof(int), 1, write_file);

	fwrite(&page->string_count, sizeof(int), 1, write_file);



	size = page->world_name.size() + 1;

	fwrite(&size, sizeof(int), 1, write_file);

	if (size > 1) {

		fwrite(page->world_name.c_str(), sizeof(char), size, write_file);

	}



	size = page->start_stage.size() + 1;

	fwrite(&size, sizeof(int), 1, write_file);

	if (size > 1) {

		fwrite(page->start_stage.c_str(), sizeof(char), size, write_file);

	}

}


