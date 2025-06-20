#include <stdio.h>
#include "Linear_Movement_Details.h"

void Read_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* read_file) {
	fread(&details->execution_time, sizeof(short int), 1, read_file);
	fread(&details->execution_time_double, sizeof(short int), 1, read_file);
	fread(&details->parallel_execution, sizeof(char), 1, read_file);
	fread(&details->bytes6_8, sizeof(char), 3, read_file);
	fread(&details->animation_and_other_type, sizeof(short int), 1, read_file);
	fread(&details->bytes11_26, sizeof(char), 16, read_file);
	fread(&details->movement_direction_setting_type, sizeof(char), 1, read_file);
	fread(&details->movement_direction_direction, sizeof(char), 1, read_file);
	fread(&details->movement_direction_angle, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_angle_double, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_angle_reverse_rotation_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_x_present, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_y_present, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_x, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_y, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_x_dot, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_y_dot, sizeof(short int), 1, read_file);
	fread(&details->movement_direction_target_type, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_coordinate_unit, sizeof(char), 1, read_file);
	fread(&details->byte46, sizeof(char), 1, read_file);
	fread(&details->movement_direction_execute_until_target_coordinate_reached, sizeof(char), 1, read_file);
	fread(&details->movement_direction_invalidate_horizontal_movement, sizeof(char), 1, read_file);
	fread(&details->movement_direction_invalidate_vertical_movement, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_x_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->movement_direction_target_y_flip_if_facing_right, sizeof(char), 1, read_file);
	fread(&details->movement_direction_reverse_speed_if_direction_changes, sizeof(char), 1, read_file);
	fread(&details->movement_direction_prevent_blur, sizeof(char), 1, read_file);
	fread(&details->movement_direction_dont_change_character_direction, sizeof(char), 1, read_file);
	fread(&details->time_speed_distance_setting_type, sizeof(char), 1, read_file);
	fread(&details->time_speed_distance_speed, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_speed_double, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_distance, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_distance_double, sizeof(short int), 1, read_file);
	fread(&details->time_speed_distance_distance_unit, sizeof(char), 1, read_file);
	fread(&details->bytes65_68, sizeof(char), 4, read_file);
	fread(&details->inertia_present, sizeof(char), 1, read_file);
	fread(&details->inertia_max_speed, sizeof(short int), 1, read_file);
	fread(&details->inertia_speed_correction_on_direction_change, sizeof(double), 1, read_file);
	fread(&details->animation_type, sizeof(char), 1, read_file);
	fread(&details->bytes81_101, sizeof(char), 21, read_file);
}

void Write_Linear_Movement_Details(struct Linear_Movement_Details* details, FILE* write_file) {
	fwrite(&details->execution_time, sizeof(short int), 1, write_file);
	fwrite(&details->execution_time_double, sizeof(short int), 1, write_file);
	fwrite(&details->parallel_execution, sizeof(char), 1, write_file);
	fwrite(&details->bytes6_8, sizeof(char), 3, write_file);
	fwrite(&details->animation_and_other_type, sizeof(short int), 1, write_file);
	fwrite(&details->bytes11_26, sizeof(char), 16, write_file);
	fwrite(&details->movement_direction_setting_type, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_direction, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_angle, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_angle_double, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_angle_reverse_rotation_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_x_present, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_y_present, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_x, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_y, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_x_dot, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_y_dot, sizeof(short int), 1, write_file);
	fwrite(&details->movement_direction_target_type, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_coordinate_unit, sizeof(char), 1, write_file);
	fwrite(&details->byte46, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_execute_until_target_coordinate_reached, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_invalidate_horizontal_movement, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_invalidate_vertical_movement, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_x_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_target_y_flip_if_facing_right, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_reverse_speed_if_direction_changes, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_prevent_blur, sizeof(char), 1, write_file);
	fwrite(&details->movement_direction_dont_change_character_direction, sizeof(char), 1, write_file);
	fwrite(&details->time_speed_distance_setting_type, sizeof(char), 1, write_file);
	fwrite(&details->time_speed_distance_speed, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_speed_double, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_distance, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_distance_double, sizeof(short int), 1, write_file);
	fwrite(&details->time_speed_distance_distance_unit, sizeof(char), 1, write_file);
	fwrite(&details->bytes65_68, sizeof(char), 4, write_file);
	fwrite(&details->inertia_present, sizeof(char), 1, write_file);
	fwrite(&details->inertia_max_speed, sizeof(short int), 1, write_file);
	fwrite(&details->inertia_speed_correction_on_direction_change, sizeof(double), 1, write_file);
	fwrite(&details->animation_type, sizeof(char), 1, write_file);
	fwrite(&details->bytes81_101, sizeof(char), 21, write_file);
}
