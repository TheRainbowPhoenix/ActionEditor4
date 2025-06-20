#pragma once

struct Linear_Movement_Details {
	short int execution_time;
	short int execution_time_double;
	char parallel_execution;
	char bytes6_8[3];
	short int animation_and_other_type;
	char bytes11_26[16];
	char movement_direction_setting_type;
	char movement_direction_direction;
	short int movement_direction_angle;
	short int movement_direction_angle_double;
	char movement_direction_angle_reverse_rotation_if_facing_right;
	char movement_direction_target_x_present;
	char movement_direction_target_y_present;
	short int movement_direction_target_x;
	short int movement_direction_target_y;
	short int movement_direction_target_x_dot;
	short int movement_direction_target_y_dot;
	char movement_direction_target_type;
	char movement_direction_target_coordinate_unit; //0: bl 1: dot
	char byte46;
	char movement_direction_execute_until_target_coordinate_reached;
	char movement_direction_invalidate_horizontal_movement;
	char movement_direction_invalidate_vertical_movement;
	char movement_direction_target_x_flip_if_facing_right;
	char movement_direction_target_y_flip_if_facing_right;
	char movement_direction_reverse_speed_if_direction_changes;
	char movement_direction_prevent_blur;
	char movement_direction_dont_change_character_direction;
	char time_speed_distance_setting_type;
	short int time_speed_distance_speed;
	short int time_speed_distance_speed_double;
	short int time_speed_distance_distance;
	short int time_speed_distance_distance_double;
	char time_speed_distance_distance_unit;
	char bytes65_68[4];
	char inertia_present;
	short int inertia_max_speed;
	double inertia_speed_correction_on_direction_change;
	char animation_type;
	char bytes81_101[21];
};

void Read_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* read_file);
void Write_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* write_file);
