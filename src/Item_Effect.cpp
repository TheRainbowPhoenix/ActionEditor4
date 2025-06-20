#include <stdio.h>
#include <stdlib.h>

#include "Flow_Change_Details.h"
#include "Stage_Clear_Details.h"
#include "Game_Wait_Details.h"
#include "Message_Details.h"
#include "Warp_Details.h"
#include "Target_Setting_Details.h"
#include "Status_Operation_Details.h"
#include "Status_Operation_2_Details.h"
#include "Disappearance_Details.h"
#include "Item_Acquisition_Details.h"
#include "Graphic_Change_Details.h"
#include "Basic_Animation_Set_Change_Details.h"
#include "Animation_Execution_Details.h"
#include "Effect_Execution_Details.h"
#include "Character_Effect_Execution_Details.h"
#include "Screen_Effect_Execution_Details.h"
#include "Picture_Display_Details.h"
#include "Screen_Color_Change_Details.h"
#include "Background_Change_Details.h"
#include "Sound_Effect_Playback_Details.h"
#include "BGM_Playback_Details.h"
#include "Code_Execution_Details.h"
#include "Arrangement_Details.h"
#include "Loop_Details.h"
#include "Item_Effect.h"

Item_Effect::Item_Effect() {
	details = nullptr;
}

Item_Effect::~Item_Effect(){
	if (details != nullptr) {
		switch (type) {
		case 1:
			delete (Flow_Change_Details*)details;
			break;
		case 2:
			delete (Stage_Clear_Details*)details;
			break;
		case 3:
			delete (Game_Wait_Details*)details;
			break;
		case 4:
			delete (Message_Details*)details;
			break;
		case 5:
			delete (Warp_Details*)details;
			break;
		case 6:
			delete (Target_Setting_Details*)details;
			break;
		case 7:
			delete (Status_Operation_Details*)details;
			break;
		case 8:
			delete (Status_Operation_2_Details*)details;
			break;
		case 9:
			delete (Disappearance_Details*)details;
			break;
		case 10:
			delete (Item_Acquisition_Details*)details;
			break;
		case 11:
			delete (Graphic_Change_Details*)details;
			break;
		case 12:
			delete (Basic_Animation_Set_Change_Details*)details;
			break;
		case 13:
			delete (Animation_Execution_Details*)details;
			break;
		case 14:
			delete (Effect_Execution_Details*)details;
			break;
		case 15:
			delete (Character_Effect_Execution_Details*)details;
			break;
		case 16:
			delete (Screen_Effect_Execution_Details*)details;
			break;
		case 17:
			delete (Picture_Display_Details*)details;
			break;
		case 18:
			delete (Screen_Color_Change_Details*)details;
			break;
		case 19:
			delete (Background_Change_Details*)details;
			break;
		case 20:
			delete (Sound_Effect_Playback_Details*)details;
			break;
		case 21:
			delete (BGM_Playback_Details*)details;
			break;
		case 22:
			delete (Code_Execution_Details*)details;
			break;
		case 23:
			delete (Arrangement_Details*)details;
			break;
		case 24:
			delete (Loop_Details*)details;
			break;
		}
	}
}

Item_Effect::Item_Effect(const Item_Effect& r) {
	start = r.start;
	byte5 = r.byte5;
	type = r.type;
	if (r.details != nullptr) {
		switch (type) {
		case 1:
			details = new Flow_Change_Details(*(Flow_Change_Details*)r.details);
			break;
		case 2:
			details = new Stage_Clear_Details(*(Stage_Clear_Details*)r.details);
			break;
		case 3:
			details = new Game_Wait_Details(*(Game_Wait_Details*)r.details);
			break;
		case 4:
			details = new Message_Details(*(Message_Details*)r.details);
			break;
		case 5:
			details = new Warp_Details(*(Warp_Details*)r.details);
			break;
		case 6:
			details = new Target_Setting_Details(*(Target_Setting_Details*)r.details);
			break;
		case 7:
			details = new Status_Operation_Details(*(Status_Operation_Details*)r.details);
			break;
		case 8:
			details = new Status_Operation_2_Details(*(Status_Operation_2_Details*)r.details);
			break;
		case 9:
			details = new Disappearance_Details(*(Disappearance_Details*)r.details);
			break;
		case 10:
			details = new Item_Acquisition_Details(*(Item_Acquisition_Details*)r.details);
			break;
		case 11:
			details = new Graphic_Change_Details(*(Graphic_Change_Details*)r.details);
			break;
		case 12:
			details = new Basic_Animation_Set_Change_Details(*(Basic_Animation_Set_Change_Details*)r.details);
			break;
		case 13:
			details = new Animation_Execution_Details(*(Animation_Execution_Details*)r.details);
			break;
		case 14:
			details = new Effect_Execution_Details(*(Effect_Execution_Details*)r.details);
			break;
		case 15:
			details = new Character_Effect_Execution_Details(*(Character_Effect_Execution_Details*)r.details);
			break;
		case 16:
			details = new Screen_Effect_Execution_Details(*(Screen_Effect_Execution_Details*)r.details);
			break;
		case 17:
			details = new Picture_Display_Details(*(Picture_Display_Details*)r.details);
			break;
		case 18:
			details = new Screen_Color_Change_Details(*(Screen_Color_Change_Details*)r.details);
			break;
		case 19:
			details = new Background_Change_Details(*(Background_Change_Details*)r.details);
			break;
		case 20:
			details = new Sound_Effect_Playback_Details(*(Sound_Effect_Playback_Details*)r.details);
			break;
		case 21:
			details = new BGM_Playback_Details(*(BGM_Playback_Details*)r.details);
			break;
		case 22:
			details = new Code_Execution_Details(*(Code_Execution_Details*)r.details);
			break;
		case 23:
			details = new Arrangement_Details(*(Arrangement_Details*)r.details);
			break;
		case 24:
			details = new Loop_Details(*(Loop_Details*)r.details);
			break;
		}
	}
}

Item_Effect& Item_Effect::operator=(const Item_Effect& r) {
	start = r.start;
	byte5 = r.byte5;
	type = r.type;
	if (r.details != nullptr) {
		switch (type) {
		case 1:
			details = new Flow_Change_Details(*(Flow_Change_Details*)r.details);
			break;
		case 2:
			details = new Stage_Clear_Details(*(Stage_Clear_Details*)r.details);
			break;
		case 3:
			details = new Game_Wait_Details(*(Game_Wait_Details*)r.details);
			break;
		case 4:
			details = new Message_Details(*(Message_Details*)r.details);
			break;
		case 5:
			details = new Warp_Details(*(Warp_Details*)r.details);
			break;
		case 6:
			details = new Target_Setting_Details(*(Target_Setting_Details*)r.details);
			break;
		case 7:
			details = new Status_Operation_Details(*(Status_Operation_Details*)r.details);
			break;
		case 8:
			details = new Status_Operation_2_Details(*(Status_Operation_2_Details*)r.details);
			break;
		case 9:
			details = new Disappearance_Details(*(Disappearance_Details*)r.details);
			break;
		case 10:
			details = new Item_Acquisition_Details(*(Item_Acquisition_Details*)r.details);
			break;
		case 11:
			details = new Graphic_Change_Details(*(Graphic_Change_Details*)r.details);
			break;
		case 12:
			details = new Basic_Animation_Set_Change_Details(*(Basic_Animation_Set_Change_Details*)r.details);
			break;
		case 13:
			details = new Animation_Execution_Details(*(Animation_Execution_Details*)r.details);
			break;
		case 14:
			details = new Effect_Execution_Details(*(Effect_Execution_Details*)r.details);
			break;
		case 15:
			details = new Character_Effect_Execution_Details(*(Character_Effect_Execution_Details*)r.details);
			break;
		case 16:
			details = new Screen_Effect_Execution_Details(*(Screen_Effect_Execution_Details*)r.details);
			break;
		case 17:
			details = new Picture_Display_Details(*(Picture_Display_Details*)r.details);
			break;
		case 18:
			details = new Screen_Color_Change_Details(*(Screen_Color_Change_Details*)r.details);
			break;
		case 19:
			details = new Background_Change_Details(*(Background_Change_Details*)r.details);
			break;
		case 20:
			details = new Sound_Effect_Playback_Details(*(Sound_Effect_Playback_Details*)r.details);
			break;
		case 21:
			details = new BGM_Playback_Details(*(BGM_Playback_Details*)r.details);
			break;
		case 22:
			details = new Code_Execution_Details(*(Code_Execution_Details*)r.details);
			break;
		case 23:
			details = new Arrangement_Details(*(Arrangement_Details*)r.details);
			break;
		case 24:
			details = new Loop_Details(*(Loop_Details*)r.details);
			break;
		}
	}
	return *this;
}

void Read_Item_Effect(struct Item_Effect* effect, FILE* read_file) {
	fread(&effect->start, sizeof(int), 1, read_file);
	fread(&effect->byte5, sizeof(char), 1, read_file);
	fread(&effect->type, sizeof(char), 1, read_file);
	switch(effect->type) {
	case 1:
		effect->details = new Flow_Change_Details;
		Read_Flow_Change_Details((Flow_Change_Details*)effect->details, read_file);
		break;
	case 2:
		effect->details = new Stage_Clear_Details;
		Read_Stage_Clear_Details((Stage_Clear_Details*)effect->details, read_file);
		break;
	case 3:
		effect->details = new Game_Wait_Details;
		Read_Game_Wait_Details((Game_Wait_Details*)effect->details, read_file);
		break;
	case 4:
		effect->details = new Message_Details;
		Read_Message_Details((Message_Details*)effect->details, read_file);
		break;
	case 5:
		effect->details = new Warp_Details;
		Read_Warp_Details((Warp_Details*)effect->details, read_file);
		break;
	case 6:
		effect->details = new Target_Setting_Details;
		Read_Target_Setting_Details((Target_Setting_Details*)effect->details, read_file);
		break;
	case 7:
		effect->details = new Status_Operation_Details;
		Read_Status_Operation_Details((Status_Operation_Details*)effect->details, read_file);
		break;
	case 8:
		effect->details = new Status_Operation_2_Details;
		Read_Status_Operation_2_Details((Status_Operation_2_Details*)effect->details, read_file);
		break;
	case 9:
		effect->details = new Disappearance_Details;
		Read_Disappearance_Details((Disappearance_Details*)effect->details, read_file);
		break;
	case 10:
		effect->details = new Item_Acquisition_Details;
		Read_Item_Acquisition_Details((Item_Acquisition_Details*)effect->details, read_file);
		break;
	case 11:
		effect->details = new Graphic_Change_Details;
		Read_Graphic_Change_Details((Graphic_Change_Details*)effect->details, read_file);
		break;
	case 12:
		effect->details = new Basic_Animation_Set_Change_Details;
		Read_Basic_Animation_Set_Change_Details((Basic_Animation_Set_Change_Details*)effect->details, read_file);
		break;
	case 13:
		effect->details = new Animation_Execution_Details;
		Read_Animation_Execution_Details((Animation_Execution_Details*)effect->details, read_file);
		break;
	case 14:
		effect->details = new Effect_Execution_Details;
		Read_Effect_Execution_Details((Effect_Execution_Details*)effect->details, read_file);
		break;
	case 15:
		effect->details = new Character_Effect_Execution_Details;
		Read_Character_Effect_Execution_Details((Character_Effect_Execution_Details*)effect->details, read_file);
		break;
	case 16:
		effect->details = new Screen_Effect_Execution_Details;
		Read_Screen_Effect_Execution_Details((Screen_Effect_Execution_Details*)effect->details, read_file);
		break;
	case 17:
		effect->details = new Picture_Display_Details;
		Read_Picture_Display_Details((Picture_Display_Details*)effect->details, read_file);
		break;
	case 18:
		effect->details = new Screen_Color_Change_Details;
		Read_Screen_Color_Change_Details((Screen_Color_Change_Details*)effect->details, read_file);
		break;
	case 19:
		effect->details = new Background_Change_Details;
		Read_Background_Change_Details((Background_Change_Details*)effect->details, read_file);
		break;
	case 20:
		effect->details = new Sound_Effect_Playback_Details;
		Read_Sound_Effect_Playback_Details((Sound_Effect_Playback_Details*)effect->details, read_file);
		break;
	case 21:
		effect->details = new BGM_Playback_Details;
		Read_BGM_Playback_Details((BGM_Playback_Details*)effect->details, read_file);
		break;
	case 22:
		effect->details = new Code_Execution_Details;
		Read_Code_Execution_Details((Code_Execution_Details*)effect->details, read_file);
		break;
	case 23:
		effect->details = new Arrangement_Details;
		Read_Arrangement_Details((Arrangement_Details*)effect->details, read_file);
		break;
	case 24:
		effect->details = new Loop_Details;
		Read_Loop_Details((Loop_Details*)effect->details, read_file);
		break;
	default:
		printf("Unsupported item effect number specified.\n");
	}
}

void Write_Item_Effect(struct Item_Effect* effect, FILE* write_file) {
	fwrite(&effect->start, sizeof(int), 1, write_file);
	fwrite(&effect->byte5, sizeof(char), 1, write_file);
	fwrite(&effect->type, sizeof(char), 1, write_file);
	switch(effect->type) {
	case 1:
		Write_Flow_Change_Details((Flow_Change_Details*)effect->details, write_file);
		break;
	case 2:
		Write_Stage_Clear_Details((Stage_Clear_Details*)effect->details, write_file);
		break;
	case 3:
		Write_Game_Wait_Details((Game_Wait_Details*)effect->details, write_file);
		break;
	case 4:
		Write_Message_Details((Message_Details*)effect->details, write_file);
		break;
	case 5:
		Write_Warp_Details((Warp_Details*)effect->details, write_file);
		break;
	case 6:
		Write_Target_Setting_Details((Target_Setting_Details*)effect->details, write_file);
		break;
	case 7:
		Write_Status_Operation_Details((Status_Operation_Details*)effect->details, write_file);
		break;
	case 8:
		Write_Status_Operation_2_Details((Status_Operation_2_Details*)effect->details, write_file);
		break;
	case 9:
		Write_Disappearance_Details((Disappearance_Details*)effect->details, write_file);
		break;
	case 10:
		Write_Item_Acquisition_Details((Item_Acquisition_Details*)effect->details, write_file);
		break;
	case 11:
		Write_Graphic_Change_Details((Graphic_Change_Details*)effect->details, write_file);
		break;
	case 12:
		Write_Basic_Animation_Set_Change_Details((Basic_Animation_Set_Change_Details*)effect->details, write_file);
		break;
	case 13:
		Write_Animation_Execution_Details((Animation_Execution_Details*)effect->details, write_file);
		break;
	case 14:
		Write_Effect_Execution_Details((Effect_Execution_Details*)effect->details, write_file);
		break;
	case 15:
		Write_Character_Effect_Execution_Details((Character_Effect_Execution_Details*)effect->details, write_file);
		break;
	case 16:
		Write_Screen_Effect_Execution_Details((Screen_Effect_Execution_Details*)effect->details, write_file);
		break;
	case 17:
		Write_Picture_Display_Details((Picture_Display_Details*)effect->details, write_file);
		break;
	case 18:
		Write_Screen_Color_Change_Details((Screen_Color_Change_Details*)effect->details, write_file);
		break;
	case 19:
		Write_Background_Change_Details((Background_Change_Details*)effect->details, write_file);
		break;
	case 20:
		Write_Sound_Effect_Playback_Details((Sound_Effect_Playback_Details*)effect->details, write_file);
		break;
	case 21:
		Write_BGM_Playback_Details((BGM_Playback_Details*)effect->details, write_file);
		break;
	case 22:
		Write_Code_Execution_Details((Code_Execution_Details*)effect->details, write_file);
		break;
	case 23:
		Write_Arrangement_Details((Arrangement_Details*)effect->details, write_file);
		break;
	case 24:
		Write_Loop_Details((Loop_Details*)effect->details, write_file);
		break;
	default:
		printf("Unsupported item effect number specified.\n");
	}
}
