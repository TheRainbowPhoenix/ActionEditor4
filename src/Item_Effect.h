#pragma once

struct Item_Effect {
	Item_Effect();
	~Item_Effect();
	Item_Effect(const Item_Effect& r);
	Item_Effect& operator=(const Item_Effect& r);
	int start; //08 00 00 00
	char byte5;
	char type;
	void* details;
};

void Read_Item_Effect(struct Item_Effect* effect, FILE* read_file);
void Write_Item_Effect(struct Item_Effect* effect, FILE* write_file);
