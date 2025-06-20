#pragma once

struct Key_Config {
	int left = 37;
	int right = 39;
	int up = 38;
	int down = 40;
	int z = 90;
	int x = 88;
	int c = 67;
	int v = 86;
	int a = 65;
	int s = 83;
	int d = 68;
	int f = 70;
	int number_of_keys = 12;
	int unknown = 1;
	int play_with_this_setting = 0;
};

void Read_Key_Config(struct Key_Config* key_config);
void Write_Key_Config(struct Key_Config* key_config);
