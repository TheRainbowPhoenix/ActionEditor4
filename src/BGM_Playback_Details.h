#pragma once

struct BGM_Playback_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes[41];
};

void Read_BGM_Playback_Details(struct BGM_Playback_Details* details, FILE* read_file);
void Write_BGM_Playback_Details(struct BGM_Playback_Details* details, FILE* write_file);
