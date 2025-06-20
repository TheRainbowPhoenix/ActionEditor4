#include <stdio.h>
#include "Sound_Effect_Playback_Details.h"

void Read_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* read_file) {
	fread(&details->bytes1_7, sizeof(char), 7, read_file);
	fread(&details->play_if_outside_screen, sizeof(char), 1, read_file);
	fread(&details->bytes9_38, sizeof(char), 30, read_file);
	fread(&details->sound_effect, sizeof(int), 1, read_file);
}

void Write_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* write_file) {
	fwrite(&details->bytes1_7, sizeof(char), 7, write_file);
	fwrite(&details->play_if_outside_screen, sizeof(char), 1, write_file);
	fwrite(&details->bytes9_38, sizeof(char), 30, write_file);
	fwrite(&details->sound_effect, sizeof(int), 1, write_file);
}
