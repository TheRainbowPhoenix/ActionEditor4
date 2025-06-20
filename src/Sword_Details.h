#pragma once

struct Sword_Details {
	int execution_time;
	char parallel_execution;
	short int sound_effect;
	char play_if_outside_screen;
	short int animation;
	char bytes11_63[53];
	char z_coordinate;
	char transparency;
	char faction_same_as_user;
	short int faction;
	short int gigantic;
	int sword_type;
	char bytes75_104[30];
	int power;
	char bytes109_110[2];
	char impact;
	short int effect;
	char acquired_item_palette_type;
	short int acquired_item_palette_number;
	char bytes117_125[9];
	char attack;
	char attack_id;
	char bytes128_143[16];
};

void Read_Sword_Details(struct Sword_Details* details, FILE* read_file);
void Write_Sword_Details(struct Sword_Details* details, FILE* write_file);
