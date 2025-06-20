#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "Wait_Details.h"
#include "Linear_Movement_Details.h"
#include "Ground_Movement_Details.h"
#include "Charge_Movement_Details.h"
#include "Circular_Movement_Details.h"
#include "Guided_Movement_Details.h"
#include "Screen_Outside_Avoidance_Movement_Details.h"
#include "Movement_Invalidation_Details.h"
#include "Direction_Change_Details.h"
#include "Jump_Details.h"
#include "Shot_Details.h"
#include "Sword_Details.h"
#include "Block_Summon_Details.h"
#include "Character_Summon_Details.h"
#include "Item_Summon_Details.h"
#include "Flow_Operation_Details.h"
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
#include "Command.h"


Command::Command() {
	details = nullptr;
}

Command::~Command() {
	if (details != nullptr) {
		switch (type) {
		case 1:
			delete (Wait_Details*)details;
			break;
		case 2:
			delete (Linear_Movement_Details*)details;
			break;
		case 3:
			delete (Ground_Movement_Details*)details;
			break;
		case 4:
			delete (Circular_Movement_Details*)details;
			break;
		case 5:
			delete (Charge_Movement_Details*)details;
			break;
		case 6:
			delete (Guided_Movement_Details*)details;
			break;
		case 7:
			delete (Screen_Outside_Avoidance_Movement_Details*)details;
			break;
		case 8:
			delete (Movement_Invalidation_Details*)details;
			break;
		case 9:
			delete (Direction_Change_Details*)details;
			break;
		case 10:
			delete (Jump_Details*)details;
			break;
		case 11:
			delete (Shot_Details*)details;
			break;
		case 12:
			delete (Sword_Details*)details;
			break;
		case 13:
			delete (Block_Summon_Details*)details;
			break;
		case 14:
			delete (Character_Summon_Details*)details;
			break;
		case 15:
			delete (Item_Summon_Details*)details;
			break;
		case 16:
			delete (Flow_Operation_Details*)details;
			break;
		case 17:
			delete (Stage_Clear_Details*)details;
			break;
		case 18:
			delete (Game_Wait_Details*)details;
			break;
		case 19:
			delete (Message_Details*)details;
			break;
		case 20:
			delete (Warp_Details*)details;
			break;
		case 21:
			delete (Target_Setting_Details*)details;
			break;
		case 22:
			delete (Status_Operation_Details*)details;
			break;
		case 23:
			delete (Status_Operation_2_Details*)details;
			break;
		case 24:
			delete (Disappearance_Details*)details;
			break;
		case 25:
			delete (Item_Acquisition_Details*)details;
			break;
		case 26:
			delete (Graphic_Change_Details*)details;
			break;
		case 27:
			delete (Basic_Animation_Set_Change_Details*)details;
			break;
		case 28:
			delete (Animation_Execution_Details*)details;
			break;
		case 29:
			delete (Effect_Execution_Details*)details;
			break;
		case 30:
			delete (Character_Effect_Execution_Details*)details;
			break;
		case 31:
			delete (Screen_Effect_Execution_Details*)details;
			break;
		case 32:
			delete (Picture_Display_Details*)details;
			break;
		case 33:
			delete (Screen_Color_Change_Details*)details;
			break;
		case 34:
			delete (Background_Change_Details*)details;
			break;
		case 35:
			delete (Sound_Effect_Playback_Details*)details;
			break;
		case 36:
			delete (BGM_Playback_Details*)details;
			break;
		case 37:
			delete (Code_Execution_Details*)details;
			break;
		case 38:
			delete (Arrangement_Details*)details;
			break;
		case 39:
			delete (Loop_Details*)details;
			break;
		}
	}
}

Command::Command(const Command& r) {
	start = r.start;
	byte5 = r.byte5;
	type = r.type;
	if (r.details != nullptr) {
		switch (r.type) {
		case 1:
			details = new Wait_Details(*(Wait_Details*)r.details);
			break;
		case 2:
			details = new Linear_Movement_Details(*(Linear_Movement_Details*)r.details);
			break;
		case 3:
			details = new Ground_Movement_Details(*(Ground_Movement_Details*)r.details);
			break;
		case 4:
			details = new Circular_Movement_Details(*(Circular_Movement_Details*)r.details);
			break;
		case 5:
			details = new Charge_Movement_Details(*(Charge_Movement_Details*)r.details);
			break;
		case 6:
			details = new Guided_Movement_Details(*(Guided_Movement_Details*)r.details);
			break;
		case 7:
			details = new Screen_Outside_Avoidance_Movement_Details(*(Screen_Outside_Avoidance_Movement_Details*)r.details);
			break;
		case 8:
			details = new Movement_Invalidation_Details(*(Movement_Invalidation_Details*)r.details);
			break;
		case 9:
			details = new Direction_Change_Details(*(Direction_Change_Details*)r.details);
			break;
		case 10:
			details = new Jump_Details(*(Jump_Details*)r.details);
			break;
		case 11:
			details = new Shot_Details(*(Shot_Details*)r.details);
			break;
		case 12:
			details = new Sword_Details(*(Sword_Details*)r.details);
			break;
		case 13:
			details = new Block_Summon_Details(*(Block_Summon_Details*)r.details);
			break;
		case 14:
			details = new Character_Summon_Details(*(Character_Summon_Details*)r.details);
			break;
		case 15:
			details = new Item_Summon_Details(*(Item_Summon_Details*)r.details);
			break;
		case 16:
			details = new Flow_Operation_Details(*(Flow_Operation_Details*)r.details);
			break;
		case 17:
			details = new Stage_Clear_Details(*(Stage_Clear_Details*)r.details);
			break;
		case 18:
			details = new Game_Wait_Details(*(Game_Wait_Details*)r.details);
			break;
		case 19:
			details = new Message_Details(*(Message_Details*)r.details);
			break;
		case 20:
			details = new Warp_Details(*(Warp_Details*)r.details);
			break;
		case 21:
			details = new Target_Setting_Details(*(Target_Setting_Details*)r.details);
			break;
		case 22:
			details = new Status_Operation_Details(*(Status_Operation_Details*)r.details);
			break;
		case 23:
			details = new Status_Operation_2_Details(*(Status_Operation_2_Details*)r.details);
			break;
		case 24:
			details = new Disappearance_Details(*(Disappearance_Details*)r.details);
			break;
		case 25:
			details = new Item_Acquisition_Details(*(Item_Acquisition_Details*)r.details);
			break;
		case 26:
			details = new Graphic_Change_Details(*(Graphic_Change_Details*)r.details);
			break;
		case 27:
			details = new Basic_Animation_Set_Change_Details(*(Basic_Animation_Set_Change_Details*)r.details);
			break;
		case 28:
			details = new Animation_Execution_Details(*(Animation_Execution_Details*)r.details);
			break;
		case 29:
			details = new Effect_Execution_Details(*(Effect_Execution_Details*)r.details);
			break;
		case 30:
			details = new Character_Effect_Execution_Details(*(Character_Effect_Execution_Details*)r.details);
			break;
		case 31:
			details = new Screen_Effect_Execution_Details(*(Screen_Effect_Execution_Details*)r.details);
			break;
		case 32:
			details = new Picture_Display_Details(*(Picture_Display_Details*)r.details);
			break;
		case 33:
			details = new Screen_Color_Change_Details(*(Screen_Color_Change_Details*)r.details);
			break;
		case 34:
			details = new Background_Change_Details(*(Background_Change_Details*)r.details);
			break;
		case 35:
			details = new Sound_Effect_Playback_Details(*(Sound_Effect_Playback_Details*)r.details);
			break;
		case 36:
			details = new BGM_Playback_Details(*(BGM_Playback_Details*)r.details);
			break;
		case 37:
			details = new Code_Execution_Details(*(Code_Execution_Details*)r.details);
			break;
		case 38:
			details = new Arrangement_Details(*(Arrangement_Details*)r.details);
			break;
		case 39:
			details = new Loop_Details(*(Loop_Details*)r.details);
			break;
		}
	}
	return *this;
}

void Read_Command_Data(struct Command* command_data, FILE* read_file) {
	fread(&command_data->start, sizeof(int), 1, read_file);
	fread(&command_data->byte5, sizeof(char), 1, read_file);
	fread(&command_data->type, sizeof(char), 1, read_file);
	switch(command_data->type) {
	case 1:
		command_data->details = new Wait_Details;
		Read_Wait_Details((struct Wait_Details*)command_data->details, read_file);
		break;
	case 2:
		command_data->details = new Linear_Movement_Details;
		Read_Linear_Movement_Details((struct Linear_Movement_Details*)command_data->details, read_file);
		break;
	case 3:
		command_data->details = new Ground_Movement_Details;
		Read_Ground_Movement_Details((struct Ground_Movement_Details*)command_data->details, read_file);
		break;
	case 4:
		command_data->details = new Circular_Movement_Details;
		Read_Circular_Movement_Details((struct Circular_Movement_Details*)command_data->details, read_file);
		break;
	case 5:
		command_data->details = new Charge_Movement_Details;
		Read_Charge_Movement_Details((struct Charge_Movement_Details*)command_data->details, read_file);
		break;
	case 6:
		command_data->details = new Guided_Movement_Details;
		Read_Guided_Movement_Details((struct Guided_Movement_Details*)command_data->details, read_file);
		break;
	case 7:
		command_data->details = new Screen_Outside_Avoidance_Movement_Details;
		Read_Screen_Outside_Avoidance_Movement_Details((struct Screen_Outside_Avoidance_Movement_Details*)command_data->details, read_file);
		break;
	case 8:
		command_data->details = new Movement_Invalidation_Details;
		Read_Movement_Invalidation_Details((struct Movement_Invalidation_Details*)command_data->details, read_file);
		break;
	case 9:
		command_data->details = new Direction_Change_Details;
		Read_Direction_Change_Details((struct Direction_Change_Details*)command_data->details, read_file);
		break;
	case 10:
		command_data->details = new Jump_Details;
		Read_Jump_Details((struct Jump_Details*)command_data->details, read_file);
		break;
	case 11:
		command_data->details = new Shot_Details;
		Read_Shot_Details((struct Shot_Details*)command_data->details, read_file);
		break;
	case 12:
		command_data->details = new Sword_Details;
		Read_Sword_Details((struct Sword_Details*)command_data->details, read_file);
		break;
	case 13:
		command_data->details = new Block_Summon_Details;
		Read_Block_Summon_Details((struct Block_Summon_Details*)command_data->details, read_file);
		break;
	case 14:
		command_data->details = new Character_Summon_Details;
		Read_Character_Summon_Details((struct Character_Summon_Details*)command_data->details, read_file);
		break;
	case 15:
		command_data->details = new Item_Summon_Details;
		Read_Item_Summon_Details((struct Item_Summon_Details*)command_data->details, read_file);
		break;
	case 16:
		command_data->details = new Flow_Operation_Details;
		Read_Flow_Operation_Details((struct Flow_Operation_Details*)command_data->details, read_file);
		break;
	case 17:
		command_data->details = new Stage_Clear_Details;
		Read_Stage_Clear_Details((struct Stage_Clear_Details*)command_data->details, read_file);
		break;
	case 18:
		command_data->details = new Game_Wait_Details;
		Read_Game_Wait_Details((struct Game_Wait_Details*)command_data->details, read_file);
		break;
	case 19:
		command_data->details = new Message_Details;
		Read_Message_Details((struct Message_Details*)command_data->details, read_file);
		break;
	case 20:
		command_data->details = new Warp_Details;
		Read_Warp_Details((struct Warp_Details*)command_data->details, read_file);
		break;
	case 21:
		command_data->details = new Target_Setting_Details;
		Read_Target_Setting_Details((struct Target_Setting_Details*)command_data->details, read_file);
		break;
	case 22:
		command_data->details = new Status_Operation_Details;
		Read_Status_Operation_Details((struct Status_Operation_Details*)command_data->details, read_file);
		break;
	case 23:
		command_data->details = new Status_Operation_2_Details;
		Read_Status_Operation_2_Details((struct Status_Operation_2_Details*)command_data->details, read_file);
		break;
	case 24:
		command_data->details = new Disappearance_Details;
		Read_Disappearance_Details((struct Disappearance_Details*)command_data->details, read_file);
		break;
	case 25:
		command_data->details = new Item_Acquisition_Details;
		Read_Item_Acquisition_Details((struct Item_Acquisition_Details*)command_data->details, read_file);
		break;
	case 26:
		command_data->details = new Graphic_Change_Details;
		Read_Graphic_Change_Details((struct Graphic_Change_Details*)command_data->details, read_file);
		break;
	case 27:
		command_data->details = new Basic_Animation_Set_Change_Details;
		Read_Basic_Animation_Set_Change_Details((struct Basic_Animation_Set_Change_Details*)command_data->details, read_file);
		break;
	case 28:
		command_data->details = new Animation_Execution_Details;
		Read_Animation_Execution_Details((struct Animation_Execution_Details*)command_data->details, read_file);
		break;
	case 29:
		command_data->details = new Effect_Execution_Details;
		Read_Effect_Execution_Details((struct Effect_Execution_Details*)command_data->details, read_file);
		break;
	case 30:
		command_data->details = new Character_Effect_Execution_Details;
		Read_Character_Effect_Execution_Details((struct Character_Effect_Execution_Details*)command_data->details, read_file);
		break;
	case 31:
		command_data->details = new Screen_Effect_Execution_Details;
		Read_Screen_Effect_Execution_Details((struct Screen_Effect_Execution_Details*)command_data->details, read_file);
		break;
	case 32:
		command_data->details = new Picture_Display_Details;
		Read_Picture_Display_Details((struct Picture_Display_Details*)command_data->details, read_file);
		break;
	case 33:
		command_data->details = new Screen_Color_Change_Details;
		Read_Screen_Color_Change_Details((struct Screen_Color_Change_Details*)command_data->details, read_file);
		break;
	case 34:
		command_data->details = new Background_Change_Details;
		Read_Background_Change_Details((struct Background_Change_Details*)command_data->details, read_file);
		break;
	case 35:
		command_data->details = new Sound_Effect_Playback_Details;
		Read_Sound_Effect_Playback_Details((struct Sound_Effect_Playback_Details*)command_data->details, read_file);
		break;
	case 36:
		command_data->details = new BGM_Playback_Details;
		Read_BGM_Playback_Details((struct BGM_Playback_Details*)command_data->details, read_file);
		break;
	case 37:
		command_data->details = new Code_Execution_Details;
		Read_Code_Execution_Details((struct Code_Execution_Details*)command_data->details, read_file);
		break;
	case 38:
		command_data->details = new Arrangement_Details;
		Read_Arrangement_Details((struct Arrangement_Details*)command_data->details, read_file);
		break;
	case 39:
		command_data->details = new Loop_Details;
		Read_Loop_Details((struct Loop_Details*)command_data->details, read_file);
		break;
	default:
		printf("Unsupported command number specified. %d\n", command_data->type);
	}
}

void Write_Command_Data(struct Command* command_data, FILE* write_file) {
	fwrite(&command_data->start, sizeof(int), 1, write_file);
	fwrite(&command_data->byte5, sizeof(char), 1, write_file);
	fwrite(&command_data->type, sizeof(char), 1, write_file);
	switch(command_data->type) {
	case 1:
		Write_Wait_Details((struct Wait_Details*)command_data->details, write_file);
		break;
	case 2:
		Write_Linear_Movement_Details((struct Linear_Movement_Details*)command_data->details, write_file);
		break;
	case 3:
		Write_Ground_Movement_Details((struct Ground_Movement_Details*)command_data->details, write_file);
		break;
	case 4:
		Write_Circular_Movement_Details((struct Circular_Movement_Details*)command_data->details, write_file);
		break;
	case 5:
		Write_Charge_Movement_Details((struct Charge_Movement_Details*)command_data->details, write_file);
		break;
	case 6:
		Write_Guided_Movement_Details((struct Guided_Movement_Details*)command_data->details, write_file);
		break;
	case 7:
		Write_Screen_Outside_Avoidance_Movement_Details((struct Screen_Outside_Avoidance_Movement_Details*)command_data->details, write_file);
		break;
	case 8:
		Write_Movement_Invalidation_Details((struct Movement_Invalidation_Details*)command_data->details, write_file);
		break;
	case 9:
		Write_Direction_Change_Details((struct Direction_Change_Details*)command_data->details, write_file);
		break;
	case 10:
		Write_Jump_Details((struct Jump_Details*)command_data->details, write_file);
		break;
	case 11:
		Write_Shot_Details((struct Shot_Details*)command_data->details, write_file);
		break;
	case 12:
		Write_Sword_Details((struct Sword_Details*)command_data->details, write_file);
		break;
	case 13:
		Write_Block_Summon_Details((struct Block_Summon_Details*)command_data->details, write_file);
		break;
	case 14:
		Write_Character_Summon_Details((struct Character_Summon_Details*)command_data->details, write_file);
		break;
	case 15:
		Write_Item_Summon_Details((struct Item_Summon_Details*)command_data->details, write_file);
		break;
	case 16:
		Write_Flow_Operation_Details((struct Flow_Operation_Details*)command_data->details, write_file);
		break;
	case 17:
		Write_Stage_Clear_Details((struct Stage_Clear_Details*)command_data->details, write_file);
		break;
	case 18:
		Write_Game_Wait_Details((struct Game_Wait_Details*)command_data->details, write_file);
		break;
	case 19:
		Write_Message_Details((struct Message_Details*)command_data->details, write_file);
		break;
	case 20:
		Write_Warp_Details((struct Warp_Details*)command_data->details, write_file);
		break;
	case 21:
		Write_Target_Setting_Details((struct Target_Setting_Details*)command_data->details, write_file);
		break;
	case 22:
		Write_Status_Operation_Details((struct Status_Operation_Details*)command_data->details, write_file);
		break;
	case 23:
		Write_Status_Operation_2_Details((struct Status_Operation_2_Details*)command_data->details, write_file);
		break;
	case 24:
		Write_Disappearance_Details((struct Disappearance_Details*)command_data->details, write_file);
		break;
	case 25:
		Write_Item_Acquisition_Details((struct Item_Acquisition_Details*)command_data->details, write_file);
		break;
	case 26:
		Write_Graphic_Change_Details((struct Graphic_Change_Details*)command_data->details, write_file);
		break;
	case 27:
		Write_Basic_Animation_Set_Change_Details((struct Basic_Animation_Set_Change_Details*)command_data->details, write_file);
		break;
	case 28:
		Write_Animation_Execution_Details((struct Animation_Execution_Details*)command_data->details, write_file);
		break;
	case 29:
		Write_Effect_Execution_Details((struct Effect_Execution_Details*)command_data->details, write_file);
		break;
	case 30:
		Write_Character_Effect_Execution_Details((struct Character_Effect_Execution_Details*)command_data->details, write_file);
		break;
	case 31:
		Write_Screen_Effect_Execution_Details((struct Screen_Effect_Execution_Details*)command_data->details, write_file);
		break;
	case 32:
		Write_Picture_Display_Details((struct Picture_Display_Details*)command_data->details, write_file);
		break;
	case 33:
		Write_Screen_Color_Change_Details((struct Screen_Color_Change_Details*)command_data->details, write_file);
		break;
	case 34:
		Write_Background_Change_Details((struct Background_Change_Details*)command_data->details, write_file);
		break;
	case 35:
		Write_Sound_Effect_Playback_Details((struct Sound_Effect_Playback_Details*)command_data->details, write_file);
		break;
	case 36:
		Write_BGM_Playback_Details((struct BGM_Playback_Details*)command_data->details, write_file);
		break;
	case 37:
		Write_Code_Execution_Details((struct Code_Execution_Details*)command_data->details, write_file);
		break;
	case 38:
		Write_Arrangement_Details((struct Arrangement_Details*)command_data->details, write_file);
		break;
	case 39:
		Write_Loop_Details((struct Loop_Details*)command_data->details, write_file);
		break;
	default:
		printf("Unsupported command number specified.\n");
	}
}

