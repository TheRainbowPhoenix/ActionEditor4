#pragma once

struct Sound_Effect_Playback_Details {
	char bytes1_7[7];
	char play_if_outside_screen;
	char bytes9_38[30];
	int sound_effect;
};

void Read_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* read_file);
void Write_Sound_Effect_Playback_Details(struct Sound_Effect_Playback_Details* details, FILE* write_file);
