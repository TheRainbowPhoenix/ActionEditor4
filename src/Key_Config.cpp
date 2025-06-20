#include "stdio.h"

#include "Key_Config.h"



void Read_Key_Config(struct Key_Config* key_config) {

	FILE* read_file = fopen("user_data/KeyConfig.dat", "rb");

	int dummy_value;

	if (read_file != NULL) {

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->left, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->right, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->up, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->down, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->z, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->x, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->c, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->v, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->a, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->s, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->d, sizeof(int), 1, read_file);

		fread(&dummy_value, sizeof(int), 1, read_file);

		fread(&key_config->f, sizeof(int), 1, read_file);

		fread(&key_config->number_of_keys, sizeof(int), 1, read_file);

		fread(&key_config->unknown, sizeof(int), 1, read_file);

		fread(&key_config->play_with_this_setting, sizeof(int), 1, read_file);

		fclose(read_file);

	}

}



void Write_Key_Config(struct Key_Config* key_config) {

	FILE* write_file = fopen("user_data/KeyConfig.dat", "wb");

	int mysterious_number = 8;

	if (write_file != NULL) {

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->left, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->right, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->up, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->down, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->z, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->x, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->c, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->v, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->a, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->s, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->d, sizeof(int), 1, write_file);

		fread(&mysterious_number, sizeof(int), 1, write_file);

		fread(&key_config->f, sizeof(int), 1, write_file);

		fread(&key_config->number_of_keys, sizeof(int), 1, write_file);

		fread(&key_config->unknown, sizeof(int), 1, write_file);

		fread(&key_config->play_with_this_setting, sizeof(int), 1, write_file);

		fclose(write_file);

	}

}
