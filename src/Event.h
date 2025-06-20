#pragma once

#include <string>
#include <vector>
#include "Event_Page.h"

struct Event{
	int start;
	int placement_x;
	int placement_y;
	int unknown1;
	std::string event_name;
	std::vector<Event_Page> page_data;
};

void Read_Event(struct Event* event, FILE* read_file);
void Write_Event(struct Event* event, FILE* write_file);
