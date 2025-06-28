import std.string;
import std.mem;
import std.sys;


struct StdString {
    u32 length  [[color("9370DB")]];
    if (length > 1) { // A length of 1 means an empty string "" with a null char.
        char data[length] [[color("9370DB")]];
    }
};

struct DeathFade {
    u32 list_size; // std::vector<int>
    // List items :
    
    // Checkboxes
    u32 auto_dissapear_left;
    u32 auto_dissapear_right;
    u32 auto_dissapear_top;
    u32 auto_dissapear_bottom;
    
    // Values, like 10 or 5
    u32 disappear_left_range;
    u32 disappear_right_range;
    u32 disappear_top_range;
    u32 disappear_bottom_range;
    // Null terminator
    u32 block_end;
};

struct PlayerCollision {
    u32 walking_block_width         [[color("B28080")]];
    u32 walking_block_height        [[color("B28080")]];
    
    u32 flying_block_width          [[color("B28080")]];
    u32 flying_block_height         [[color("B28080")]];
    
    u32 walking_character_width     [[color("B28080")]];
    u32 walking_character_height    [[color("B28080")]];
    
    u32 flying_character_width      [[color("B28080")]];
    u32 flying_character_height     [[color("B28080")]];
    
    // In the two following are inverted
    u32 shot_width                  [[color("B28080")]];
    u32 shot_height                 [[color("B28080")]];
    
    u32 item_width                  [[color("B28080")]];
    u32 item_height                 [[color("B28080")]];
    
    // Positions modes
    u32 walking_block_position      [[color("B28080")]];
    u32 flying_block_position       [[color("B28080")]];
    u32 walking_character_position  [[color("B28080")]];
    u32 flying_character_position   [[color("B28080")]];
    
    // Dropdown - show, hide, border_only
    u32 block_display               [[color("B28080")]];
    u32 character_display           [[color("B28080")]];
    u32 shot_display                [[color("B28080")]];
    u32 item_display                [[color("B28080")]];
    
    // Colors  - blue_purple, red_green, blue_yellow, purple, blue, black_rainbow
    u32 block_display_color         [[color("B28080")]];
    u32 character_display_color     [[color("B28080")]];
    u32 shot_display_color          [[color("B28080")]];
    u32 item_display_color          [[color("B28080")]];
};

struct EnemyCollision {
    u32 walking_block_width         [[color("B2A040")]];
    u32 walking_block_height        [[color("B2A040")]];
    
    u32 flying_block_width          [[color("B2A040")]];
    u32 flying_block_height         [[color("B2A040")]];
    
    u32 walking_character_width     [[color("B2A040")]];
    u32 walking_character_height    [[color("B2A040")]];
    
    u32 flying_character_width      [[color("B2A040")]];
    u32 flying_character_height     [[color("B2A040")]];
    
    u32 shot_width                  [[color("B2A040")]];
    u32 shot_height                 [[color("B2A040")]];
    
    // Dropdown - bottom, center
    u32 walking_block_position      [[color("B2A040")]];
    u32 flying_block_position       [[color("B2A040")]];
    u32 walking_character_position  [[color("B2A040")]];
    u32 flying_character_position   [[color("B2A040")]];
};

struct ActorHitbox {
    // Actors have special hitbox for enemies and bullets (shot)
    u32 shot_width          [[color("B2A0A0")]];
    u32 shot_height         [[color("B2A0A0")]];
    
    u32 character_width     [[color("B2A0A0")]];
    u32 character_height    [[color("B2A0A0")]];
};


struct BasicCondition {
    u32 header                        [[color("207090")]]; // 17
    u8 type                           [[color("207090")]];
    
    u32 right_side_constant                                                        [[color("207090")]];
    u32 right_side_random_lower_limit                                              [[color("207090")]];
    u32 right_side_random_upper_limit                                              [[color("207090")]];
    u8 left_side_status_target                                                     [[color("207090")]];
    u8 left_side_status_number                                                     [[color("207090")]]; //range display color for distance condition
    u8 left_side_type                                                              [[color("207090")]]; //range display presence/absence for distance condition
    u8 left_side_common_variable_or_stage_variable                                 [[color("207090")]];
    u16 left_side_variable_number                                                  [[color("207090")]];
    u8 left_side_flow_variable_number                                              [[color("207090")]];
    u8 right_side_type                                                             [[color("207090")]]; //display even if self not present for distance condition
    u8 right_side_status_target                                                    [[color("207090")]]; //display even if self transparent for distance condition
    u8 right_side_status_number                                                    [[color("207090")]];
    u8 right_side_common_variable_or_stage_variable                                [[color("207090")]];
    u16 right_side_variable_number                                                 [[color("207090")]]; //distance in dot for distance condition
    u8 right_side_flow_variable_number                                             [[color("207090")]];
    u8 how_to_compare                                                              [[color("207090")]];
    u8 specify_in_percent                                                          [[color("207090")]];
    u8 left_side_coordinate_type                                                   [[color("207090")]];
    u8 right_side_coordinate_type                                                  [[color("207090")]];
    u8 left_side_gigantic_character_coordinate_position                            [[color("207090")]];
    u8 right_side_gigantic_character_coordinate_position                           [[color("207090")]];
    
    u8 unk1                                                                        [[color("207090")]];
    u8 unk2                                                                        [[color("207090")]];
    u8 unk3                                                                        [[color("207090")]];
    u8 unk4                                                                        [[color("207090")]];
    u8 unk5                                                                        [[color("207090")]];  
    
};

struct KeyCondition {
    u32 header; // 5
    u8 right_and_left_to_front_and_back                                   [[color("702090")]];
    u16 minimum_input_time                                                [[color("702090")]];
    u16 maximum_input_time                                                [[color("702090")]];
    u8 input_time_1_to_infinity                                           [[color("702090")]];
    u8 judgment_type                                                      [[color("702090")]];
    u32 unknown                                                           [[color("702090")]];
    u32 number_of_key_data                                                [[color("702090")]];
    u8 direction_key_neutral                                              [[color("702090")]];
    u8 left_key                                                           [[color("702090")]];
    u8 right_key                                                          [[color("702090")]];
    u8 up_key                                                             [[color("702090")]];
    u8 down_key                                                           [[color("702090")]];
    u8 up_left_key                                                        [[color("702090")]];
    u8 down_left_key                                                      [[color("702090")]];
    u8 up_right_key                                                       [[color("702090")]];
    u8 down_right_key                                                     [[color("702090")]];
    u8 any_direction_key                                                  [[color("702090")]];
    u8 action_key_neutral                                                 [[color("702090")]];
    u8 z_key                                                              [[color("702090")]];
    u8 x_key                                                              [[color("702090")]];
    u8 c_key                                                              [[color("702090")]];
    u8 v_key                                                              [[color("702090")]];
    u8 a_key                                                              [[color("702090")]];
    u8 s_key                                                              [[color("702090")]];
    u8 d_key                                                              [[color("702090")]];
    u8 f_key                                                              [[color("702090")]];
};

struct Background {
    u32 start                                   [[color("15093F")]];
    u32 display_from_start                      [[color("15093F")]];
    u32 specified_by_color                      [[color("15093F")]];
    u32 color_number                            [[color("15093F")]];
    u32 display_in_front_of_character           [[color("15093F")]];
    double horizontal_scroll_speed              [[color("15093F")]];
    double vertical_scroll_speed                [[color("15093F")]];
    u32 horizontal_auto_scroll                  [[color("15093F")]];
    u32 vertical_auto_scroll                    [[color("15093F")]];
    double horizontal_auto_scroll_speed         [[color("15093F")]];
    double vertical_auto_scroll_speed           [[color("15093F")]];
    char bytes61_80[20]                         [[color("15093F")]];
    StdString image_path                        [[color("15093F")]];
};

struct WaitDetails {
    u16 execution_time                      [[color("907060")]];
    u16 execution_time_double               [[color("907060")]];
    u8 parallel_execution                   [[color("907060")]];
    char bytes[33]                          [[color("907060")]];
};

struct LinearMovementDetails {
    u16 execution_time                                                  [[color("907060")]];
    u16 execution_time_double                                           [[color("907060")]];
    u8 parallel_execution                                               [[color("907060")]];
    char bytes6_8[3]                                                    [[color("907060")]];
    u16 animation_and_other_type                                        [[color("907060")]];
    char bytes11_26[16]                                                 [[color("907060")]];
    u8 movement_direction_setting_type                                  [[color("907060")]];
    u8 movement_direction_direction                                     [[color("907060")]];
    u16 movement_direction_angle                                        [[color("907060")]];
    u16 movement_direction_angle_double                                 [[color("907060")]];
    u8 movement_direction_angle_reverse_rotation_if_facing_right        [[color("907060")]];
    u8 movement_direction_target_x_present                              [[color("907060")]];
    u8 movement_direction_target_y_present                              [[color("907060")]];
    u16 movement_direction_target_x                                     [[color("907060")]];
    u16 movement_direction_target_y                                     [[color("907060")]];
    u16 movement_direction_target_x_dot                                 [[color("907060")]];
    u16 movement_direction_target_y_dot                                 [[color("907060")]];
    u8 movement_direction_target_type                                   [[color("907060")]];
    u8 movement_direction_target_coordinate_unit                        [[color("907060")]]; //0: bl 1: dot
    char byte46                                                         [[color("907060")]];
    u8 movement_direction_execute_until_target_coordinate_reached       [[color("907060")]];
    u8 movement_direction_invalidate_horizontal_movement                [[color("907060")]];
    u8 movement_direction_invalidate_vertical_movement                  [[color("907060")]];
    u8 movement_direction_target_x_flip_if_facing_right                 [[color("907060")]];
    u8 movement_direction_target_y_flip_if_facing_right                 [[color("907060")]];
    u8 movement_direction_reverse_speed_if_direction_changes            [[color("907060")]];
    u8 movement_direction_prevent_blur                                  [[color("907060")]];
    u8 movement_direction_dont_change_character_direction               [[color("907060")]];
    u8 time_speed_distance_setting_type                                 [[color("907060")]];
    u16 time_speed_distance_speed                                       [[color("907060")]];
    u16 time_speed_distance_speed_double                                [[color("907060")]];
    u16 time_speed_distance_distance                                    [[color("907060")]];
    u16 time_speed_distance_distance_double                             [[color("907060")]];
    u8 time_speed_distance_distance_unit                                [[color("907060")]];
    char bytes65_68[4]                                                  [[color("907060")]];
    u8 inertia_present                                                  [[color("907060")]];
    u16 inertia_max_speed                                               [[color("907060")]];
    double inertia_speed_correction_on_direction_change                 [[color("907060")]];
    u8 animation_type                                                   [[color("907060")]];
    char bytes81_101[21]                                                [[color("907060")]];
};

struct GroundMovementDetails {
	u16 execution_time          [[color("907060")]];
	u16 execution_time_double   [[color("907060")]];
	u8 parallel_execution       [[color("907060")]];
	char bytes6_101[96]         [[color("907060")]];

};

struct CircularMovementDetails {
	u16 execution_time          [[color("907060")]];
	u16 execution_time_double   [[color("907060")]];
	u8 parallel_execution       [[color("907060")]];
	char bytes6_101[96]         [[color("907060")]];
};

struct ChargeMovementDetails {
	u16 execution_time          [[color("907060")]];
	u16 execution_time_double   [[color("907060")]];
	u8 parallel_execution       [[color("907060")]];
	char bytes6_101[96]         [[color("907060")]];
};

struct GuidedMovementDetails {
	u16 execution_time          [[color("907060")]];
	u16 execution_time_double   [[color("907060")]];
	u8 parallel_execution       [[color("907060")]];
	char bytes6_101[96]         [[color("907060")]];
};

struct JumpDetails {
    char bytes1_5[5];
    u16 sound_effect;
    u8 play_if_outside_screen;
    u16 animation;
    char bytes11_38[28];
    u32 jump_type;
    u32 max_jump_inertial_movement_speed;
    u32 max_jump_height;
    u32 min_jump_inertial_movement_speed;
    u32 min_jump_height;
};

struct ShotDetails {
    u16 execution_time                                    [[color("907060")]];
    u16 execution_time_double                             [[color("907060")]];
    u8 parallel_execution                                 [[color("907060")]];
    u16 sound_effect                                      [[color("907060")]];
    u8 play_if_outside_screen                             [[color("907060")]];
    u16 animation                                         [[color("907060")]];
    char bytes11_30[20]                                   [[color("907060")]];
    u8 number_of_shots_fired                              [[color("907060")]];
    u8 formation                                          [[color("907060")]];
    u16 firing_parameter1                                 [[color("907060")]]; //interval angle in scatter distance in encircle (hbl)
    u16 firing_parameter2                                 [[color("907060")]]; //number of lightning strike columns
    u16 firing_parameter3                                 [[color("907060")]]; //interval between lightning strike columns
    u8 target                                             [[color("907060")]];
    u8 direction                                          [[color("907060")]];
    u8 set_angle_to_target                                [[color("907060")]];
    u8 firing_target                                      [[color("907060")]];
    u16 angle_offset                                      [[color("907060")]];
    u16 angle_offset_double                               [[color("907060")]];
    u8 angle_offset_reverse_rotation_if_facing_right      [[color("907060")]];
    u16 angle_dispersion                                  [[color("907060")]];
    u8 change_firing_position_according_to_angle          [[color("907060")]];
    u8 number_of_doubles                                  [[color("907060")]];
    u16 firing_position_offset_x                          [[color("907060")]];
    u16 firing_position_offset_x_double                   [[color("907060")]];
    u16 firing_position_offset_y                          [[color("907060")]];
    u16 firing_position_offset_y_double                   [[color("907060")]];
    u8 firing_position_offset_x_flip_if_facing_right      [[color("907060")]];
    u8 firing_position_offset_y_flip_if_facing_right      [[color("907060")]];
    u16 graphic                                           [[color("907060")]];
    u8 z_coordinate                                       [[color("907060")]];
    u8 transparency                                       [[color("907060")]];
    u8 faction_same_as_user                               [[color("907060")]];
    u16 faction                                           [[color("907060")]];
    u16 gigantic                                          [[color("907060")]];
    u8 movement_type                                      [[color("907060")]];
    u16 movement_type_parameter1                          [[color("907060")]];
    u16 movement_type_parameter2                          [[color("907060")]];
    u16 movement_type_parameter3                          [[color("907060")]];
    u8 movement_target                                    [[color("907060")]];
    u8 synchronize_with_auto_scroll                       [[color("907060")]];
    u16 speed                                             [[color("907060")]];
    u16 speed_double                                      [[color("907060")]];
    u8 acceleration_enabled                               [[color("907060")]];
    u16 acceleration                                      [[color("907060")]];
    u16 acceleration_double                               [[color("907060")]];
    u16 flight_distance                                   [[color("907060")]];
    u8 flight_distance_valid                              [[color("907060")]];
    u16 flight_distance_double                            [[color("907060")]];
    u8 flight_distance_does_not_disappear_at_end          [[color("907060")]];
    u8 disappearance_time_valid                           [[color("907060")]];
    u16 disappearance_time                                [[color("907060")]];
    u16 disappearance_time_double                         [[color("907060")]];
    u8 penetrate_blocks                                   [[color("907060")]];
    u8 penetrate_u8acters                                 [[color("907060")]];
    u8 penetrate_block_u8acters                           [[color("907060")]];
    u8 disappear_on_hitting_shot                          [[color("907060")]];
    u8 value_for_disappearing_on_hitting_shot             [[color("907060")]];
    u32 power                                             [[color("907060")]];
    char bytes109_110[2]                                  [[color("907060")]];
    u8 impact                                             [[color("907060")]];
    u16 effect                                            [[color("907060")]];
    u8 acquired_item_palette_type                         [[color("907060")]];
    u16 acquired_item_palette_number                      [[color("907060")]];
    char bytes117_125[9]                                  [[color("907060")]];
    u8 attack                                             [[color("907060")]];
    u8 attack_id                                          [[color("907060")]];
    char bytes128_143[16]                                 [[color("907060")]];
};

struct SwordDetails {
    u32 execution_time                                    [[color("907060")]];
    u8 parallel_execution                                 [[color("907060")]];
    u16 sound_effect                                      [[color("907060")]];
    u8 play_if_outside_screen                             [[color("907060")]];
    u16 animation                                         [[color("907060")]];
    char bytes11_63[53]                                   [[color("907060")]];
    u8 z_coordinate                                       [[color("907060")]];
    u8 transparency                                       [[color("907060")]];
    u8 faction_same_as_user                               [[color("907060")]];
    u16 faction                                           [[color("907060")]];
    u16 gigantic                                          [[color("907060")]];
    u32 sword_type                                        [[color("907060")]];
    char bytes75_104[30]                                  [[color("907060")]];
    u32 power                                             [[color("907060")]];
    char bytes109_110[2]                                  [[color("907060")]];
    u8 impact                                             [[color("907060")]];
    u16 effect                                            [[color("907060")]];
    u8 acquired_item_palette_type                         [[color("907060")]];
    u16 acquired_item_palette_number                      [[color("907060")]];
    char bytes117_125[9]                                  [[color("907060")]];
    u8 attack                                             [[color("907060")]];
    u8 attack_id                                          [[color("907060")]];
    char bytes128_143[16]                                 [[color("907060")]];
};

struct BlockSummonDetails {
    u16 execution_time                                     [[color("907060")]];
	u16 execution_time_double                              [[color("907060")]];
	u8 parallel_execution                                  [[color("907060")]];
	u16 sound_effect                                       [[color("907060")]];
	u8 play_sound_effect_if_outside_screen                 [[color("907060")]];
	u8 animation                                           [[color("907060")]];
	char bytes10_30[21]                                    [[color("907060")]];
	u8 count                                               [[color("907060")]];
	u8 formation                                           [[color("907060")]];
	u16 interval                                           [[color("907060")]];
	u16 number_of_columns                                  [[color("907060")]];
	u16 column_interval                                    [[color("907060")]];
	u8 target                                              [[color("907060")]];
	u8 direction                                           [[color("907060")]];
	char byte41                                            [[color("907060")]];
	u8 target2                                             [[color("907060")]];
	char bytes43_51[9]                                     [[color("907060")]];
	u32 summon_position_offset_x                           [[color("907060")]];
	u32 summon_position_offset_y                           [[color("907060")]];
	u8 summon_position_offset_x_flip                       [[color("907060")]];
	u8 summon_position_offset_y_flip                       [[color("907060")]];
	char bytes62_66[5]                                     [[color("907060")]];
	u8 faction                                             [[color("907060")]];
	char bytes68_88[21]                                    [[color("907060")]];
	u16 existence_time                                     [[color("907060")]];
	u8 existence_time_present                              [[color("907060")]];
	char bytes92_119[28]                                   [[color("907060")]];
	u8 palette_type                                        [[color("907060")]];
	u16 palette_data_number                                [[color("907060")]];
	u8 faction_specification_method                        [[color("907060")]];
	u8 set_acquired_score_to_0                             [[color("907060")]];
	u8 direction_flip                                      [[color("907060")]];
	u8 attack                                              [[color("907060")]];
	u8 attack_flow                                         [[color("907060")]];
	char bytes128_143[16]                                  [[color("907060")]];
	u8 return_value_to_flow_variable                       [[color("907060")]];
	char bytes145_147[3]                                   [[color("907060")]];
};

struct ScreenOutsideAvoidanceMovementDetails {
    u16 execution_time              [[color("907060")]];
    u16 execution_time_double       [[color("907060")]];
    u8 parallel_execution           [[color("907060")]];
    char bytes6_101[96]             [[color("907060")]];
};

struct MovementInvalidationDetails {
    u16 execution_time              [[color("907060")]];
    u16 execution_time_double       [[color("907060")]];
    u8 parallel_execution           [[color("907060")]];
    char bytes6_101[96]             [[color("907060")]];
};

struct DirectionChangeDetails {
    u16 execution_time              [[color("907060")]];
    u16 execution_time_double       [[color("907060")]];
    u8 parallel_execution           [[color("907060")]];
    char bytes6_42[37]              [[color("907060")]];
};

struct StatusOperationDetails {
    char bytes1_38[38]                                 [[color("907060")]];
    u8 operation_target_type                            [[color("907060")]];
    char bytes40_43[4]                                 [[color("907060")]];
    u8 operation_target_variable_type                   [[color("907060")]];
    char bytes45_46[2]                                 [[color("907060")]];
    u16 operation_target_variable_number                [[color("907060")]];
    char bytes49_52[4]                                 [[color("907060")]];
    u8 operation_target_target                         [[color("907060")]];
    char bytes54_56[3]                                 [[color("907060")]];
    u8 operation_target_status                         [[color("907060")]];
    char byte58                                         [[color("907060")]];
    u8 operation_target_flow_variable_number            [[color("907060")]];
    char bytes60_62[3]                                 [[color("907060")]];
    u8 operator_type                                    [[color("907060")]];
    char bytes64_66[3]                                 [[color("907060")]];
    u32 calculation_content_type                        [[color("907060")]];
    u32 calculation_content_constant                    [[color("907060")]];
    u32 calculation_content_random_lower_limit         [[color("907060")]];
    u32 calculation_content_random_upper_limit         [[color("907060")]];
    u32 calculation_content_variable_type               [[color("907060")]];
    u32 calculation_content_variable_number             [[color("907060")]];
    u32 calculation_content_target                     [[color("907060")]];
    u32 calculation_content_status                     [[color("907060")]];
    u32 calculation_content_flow_variable_number        [[color("907060")]];
    char bytes103_138[36]                               [[color("907060")]];
};

struct StatusOperation2Details {
	char bytes1_38[38]                             [[color("907060")]];
	u32 target                                     [[color("907060")]];
	u32 status                                     [[color("907060")]];
	u32 on                                         [[color("907060")]];
	char bytes51_62[12]                            [[color("907060")]];
};

struct DisappearanceDetails {
	char bytes1_38[38]                              [[color("907060")]];
	u32 target                                      [[color("907060")]];
	u32 faction                                     [[color("907060")]];
	u32 range                                       [[color("907060")]];
	u32 assign_return_value_to_flow_variable        [[color("907060")]];
};

struct FlowOperationDetails {
    char bytes1_34[34]                             [[color("907060")]];
	u8 condition_present                           [[color("907060")]];
	u8 judgment_type                               [[color("907060")]];
	char bytes37_40[4]                             [[color("907060")]];

	// std::vector<BasicCondition> condition_data;
    u32 condition_count                                    [[color("907060")]];
    if (condition_count > 0) {
        BasicCondition conditions[condition_count]         [[color("907060")]];
    }

	char bytes45_52[8]                                  [[color("907060")]];
	u32 operation                                       [[color("907060")]];
	u32 target_flow                                     [[color("907060")]];
	u32 id                                              [[color("907060")]];
	u32 target_character                                [[color("907060")]];
	u32 assign_return_value_to_flow_variable            [[color("907060")]];
};

struct StageClearDetails {
    char bytes1_14[14]                                  [[color("907060")]];
    // u32 path_length                                     [[color("907060")]];
    StdString path                                      [[color("907060")]];
    char bytes19_38[20]                                 [[color("907060")]];
    u32 stage_transition                                [[color("907060")]];
    u32 number                                          [[color("907060")]];
    u32 change_world_map_position                       [[color("907060")]];
    u32 world_map_position_x                            [[color("907060")]];
    u32 world_map_position_y                            [[color("907060")]];
    u32 change_initial_position                         [[color("907060")]];
    u32 initial_position_x                              [[color("907060")]];
    u32 initial_position_y                              [[color("907060")]];
    u32 initial_position_main_character_direction       [[color("907060")]];
    u32 execute_autosave                                [[color("907060")]];
    u32 add_clear_text_to_replay                        [[color("907060")]];
};

struct GameWaitDetails {
    u16 execution_time                                  [[color("907060")]];
    u16 execution_time_double                           [[color("907060")]];
    u8 parallel_execution                               [[color("907060")]];
    char bytes6_38[33]                                  [[color("907060")]];
    u32 game_wait_execution_time                        [[color("907060")]];
};

struct MessageDetails {
    char bytes1_14[14]                                [[color("907060")]];
	StdString message                                 [[color("907060")]];
	char bytes19_38[20]                               [[color("907060")]];
	u32 display_position_specification_method         [[color("907060")]];
	u32 coordinate_x                                  [[color("907060")]];
	u32 coordinate_y                                  [[color("907060")]];
	u32 display_position_offset_x                     [[color("907060")]];
	u32 display_position_offset_y                     [[color("907060")]];
	u32 auto_adjust_to_not_go_off_screen              [[color("907060")]];
	u32 display_time_specification_method             [[color("907060")]];
	u32 display_time                                  [[color("907060")]];
	u32 pause                                         [[color("907060")]];
	u32 display_variables                             [[color("907060")]];
	u32 follow_screen                                 [[color("907060")]];
	u32 auto_update                                   [[color("907060")]];
	u32 message_id_present                            [[color("907060")]];
	u32 message_id                                    [[color("907060")]];
	u32 window_display                                [[color("907060")]];
	u32 message_clear                                 [[color("907060")]];
	u32 update_interval                               [[color("907060")]];
	u32 instant_display                               [[color("907060")]];
	u32 coordinate_unit                               [[color("907060")]];
	u32 set_options                                   [[color("907060")]];
	u32 assign_return_value_to_flow_variable          [[color("907060")]];
};

struct WarpDetails {
	char bytes1_26[26]                                [[color("907060")]];
	u8 setting_type                                   [[color("907060")]];
	u8 direction                                      [[color("907060")]];
	char bytes29_33[5]                                [[color("907060")]];
	u8 target_x_present                               [[color("907060")]];
	u8 target_y_present                               [[color("907060")]];
	u16 target_x_bl                                   [[color("907060")]];
	u16 target_y_bl                                   [[color("907060")]];
	u16 target_x_dot                                  [[color("907060")]];
	u16 target_y_dot                                  [[color("907060")]];
	u8 target_type                                    [[color("907060")]];
	u8 target_unit                                    [[color("907060")]];
	u8 gigantic_character_coordinate_position         [[color("907060")]];
	char bytes47_49[3]                                [[color("907060")]];
	u8 target_x_flip_if_facing_right                  [[color("907060")]];
	u8 target_y_flip_if_facing_right                  [[color("907060")]];
	char bytes52_59[8]                                [[color("907060")]];
	u16 distance                                      [[color("907060")]];
	u16 distance_double                               [[color("907060")]];
	char bytes64_101[38]                              [[color("907060")]];
	u32 assign_return_value_to_flow                   [[color("907060")]];
};

struct CharacterSummonDetails {
    u16 execution_time                          [[color("907060")]];
	u16 execution_time_double                   [[color("907060")]];
	u8 parallel_execution                       [[color("907060")]];
	u16 sound_effect                            [[color("907060")]];
	u8 play_sound_effect_if_outside_screen      [[color("907060")]];
	u8 animation                                [[color("907060")]];
	char bytes10_30[21]                         [[color("907060")]];
	u8 count                                    [[color("907060")]];
	u8 formation                                [[color("907060")]];
	u16 interval                                [[color("907060")]];
	u16 number_of_columns                       [[color("907060")]];
	u16 column_interval                         [[color("907060")]];
	u8 target                                   [[color("907060")]];
	u8 direction                                [[color("907060")]];
	char byte41                                 [[color("907060")]];
	u8 target2                                  [[color("907060")]];
	char bytes43_51[9]                          [[color("907060")]];
	u32 summon_position_offset_x                [[color("907060")]];
	u32 summon_position_offset_y                [[color("907060")]];
	u8 summon_position_offset_x_flip            [[color("907060")]];
	u8 summon_position_offset_y_flip            [[color("907060")]];
	char bytes62_66[5]                          [[color("907060")]];
	u8 faction                                  [[color("907060")]];
	char bytes68_88[21]                         [[color("907060")]];
	u16 existence_time                          [[color("907060")]];
	u8 existence_time_present                   [[color("907060")]];
	char bytes92_119[28]                        [[color("907060")]];
	u8 palette_type                             [[color("907060")]];
	u16 palette_data_number                     [[color("907060")]];
	u8 faction_specification_method             [[color("907060")]];
	u8 set_acquired_score_to_0                  [[color("907060")]];
	u8 direction_flip                           [[color("907060")]];
	u8 attack                                   [[color("907060")]];
	u8 attack_flow                              [[color("907060")]];
	char bytes128_143[16]                       [[color("907060")]];
	u8 return_value_to_flow_variable            [[color("907060")]];
	char bytes145_147[3]                        [[color("907060")]];
};

struct ItemSummonDetails {
    u16 execution_time                         [[color("907060")]];
	u16 execution_time_double                  [[color("907060")]];
	u8 parallel_execution                      [[color("907060")]];
	u16 sound_effect                           [[color("907060")]];
	u8 play_sound_effect_if_outside_screen     [[color("907060")]];
	u8 animation                               [[color("907060")]];
	char bytes10_30[21]                        [[color("907060")]];
	u8 count                                   [[color("907060")]];
	u8 formation                               [[color("907060")]];
	u16 interval                               [[color("907060")]];
	u16 number_of_columns                      [[color("907060")]];
	u16 column_interval                        [[color("907060")]];
	u8 target                                  [[color("907060")]];
	u8 direction                               [[color("907060")]];
	u8 byte41                                  [[color("907060")]];
	u8 target2                                 [[color("907060")]];
	char bytes43_51[9]                         [[color("907060")]];
	u32 summon_position_offset_x               [[color("907060")]];
	u32 summon_position_offset_y               [[color("907060")]];
	u8 summon_position_offset_x_flip           [[color("907060")]];
	u8 summon_position_offset_y_flip           [[color("907060")]];
	char bytes62_66[5]                         [[color("907060")]];
	u8 faction                                 [[color("907060")]];
	char bytes68_88[21]                        [[color("907060")]];
	u16 existence_time                         [[color("907060")]];
	u8 existence_time_present                  [[color("907060")]];
	char bytes92_119[28]                       [[color("907060")]];
	u8 palette_type                            [[color("907060")]];
	u16 palette_data_number                    [[color("907060")]];
	u8 faction_specification_method            [[color("907060")]];
	u8 set_acquired_score_to_0                 [[color("907060")]];
	u8 direction_flip                          [[color("907060")]];
	u8 attack                                  [[color("907060")]];
	u8 attack_flow                             [[color("907060")]];
	char bytes128_143[16]                      [[color("907060")]];
};

struct TargetSettingDetails {
	char bytes1_38[38]                          [[color("907060")]];
	char bytes39_106[68]                        [[color("907060")]];
};

struct ItemAcquisitionDetails {
	char bytes1_38[38]                          [[color("907060")]];
	u32 palette_type                            [[color("907060")]];;
	u32 palette_data_number                     [[color("907060")]];
};

struct GraphicChangeDetails {
	char bytes1_38[38]                          [[color("907060")]];
	u32 image_type                              [[color("907060")]];
	u32 image_number                            [[color("907060")]];
	u32 offset                                  [[color("907060")]];
};

struct BasicAnimationSetChangeDetails {
    char bytes1_38[38]                          [[color("907060")]];
	u32 animation_set                           [[color("907060")]];
};

struct AnimationExecutionDetails {
	u16 execution_time                          [[color("907060")]];
	u16 execution_time_double                   [[color("907060")]];
	u8 parallel_execution                       [[color("907060")]];
	char bytes[41]                              [[color("907060")]];
};

struct EffectExecutionDetails {
	char bytes1_38[38]                          [[color("907060")]];
	char bytes[40]                              [[color("907060")]];

};

struct CharacterEffectExecutionDetails {
	char bytes1_38[38]                          [[color("907060")]];
	u32 effect                                  [[color("907060")]];
	u32 execution_type                          [[color("907060")]];
	u32 loop_execution                          [[color("907060")]];
};

struct ScreenEffectExecutionDetails {
	char bytes1_38[38]                          [[color("907060")]];
	u32 effect                                  [[color("907060")]];
	u32 execution_type                          [[color("907060")]];
	u32 loop_execution                          [[color("907060")]];
};

struct PictureDisplayDetails {
	u16 execution_time                          [[color("907060")]];
	u16 execution_time_double                   [[color("907060")]];
	u8 parallel_execution                       [[color("907060")]];
	char bytes[113]                             [[color("907060")]];
};

struct BackgroundChangeDetails {
	u16 execution_time                          [[color("907060")]];
	u16 execution_time_double                   [[color("907060")]];
	u8 parallel_execution                       [[color("907060")]];
	char bytes[41]                              [[color("907060")]];

};

struct SoundEffectPlaybackDetails {
	char bytes1_7[7]                            [[color("907060")]];
	u8 play_if_outside_screen                   [[color("907060")]];
	char bytes9_38[30]                          [[color("907060")]];
	u32 sound_effect                            [[color("907060")]];
};

struct BGMPlaybackDetails {
	u16 execution_time                          [[color("907060")]];
	u16 execution_time_double                   [[color("907060")]];
	u8 parallel_execution                       [[color("907060")]];
	char bytes[41]                              [[color("907060")]];
};

struct CodeExecutionDetails {
	u16 execution_time                          [[color("907060")]];
	u16 execution_time_double                   [[color("907060")]];
	u8 parallel_execution                       [[color("907060")]];
	char bytes6_14[9]                           [[color("907060")]];
	StdString code                              [[color("907060")]];
	char bytes19_38[20]                         [[color("907060")]];
};

struct ArrangementDetails {
	char bytes1_38[38]                          [[color("907060")]];
	u32 command                                 [[color("907060")]];
	u32 parameter                               [[color("907060")]];
	u32 operator_type                           [[color("907060")]];
	u32 variable_type                           [[color("907060")]];
	u32 variable_number                         [[color("907060")]];
};

struct LoopDetails {
	char bytes1_38[38]      [[color("907060")]];
	u32 repeat_count        [[color("907060")]];
	u32 command_count       [[color("907060")]];
};

enum CommandType : u8 {
    Wait = 1,
    LinearMovement = 2,
    GroundMovement = 3,
    CircularMovement = 4,
    ScreenAvoidance = 7,
    MovementInvalidation = 8,
    DirectionChange = 9,
    Jump = 10,
    Shot = 11,
    Sword = 12,
    CharacterSummon = 14,
    ItemSummon = 15,
    FlowOperation = 16,
    StageClear = 17,
    GameWait = 18,
    Message = 19,
    Warp = 20,
    TargetSetting = 21,
    StatusOp = 22,
    StatusOp2 = 23,
    Disappearance = 24,
    ItemAcquisition = 25,
    GraphicChange = 26,
    BasicAnimChange = 27,
    CharEffectExec = 30,
    ScreenEffectExec = 31,
    PictureDisplay = 32,
    BackgroundChange = 34,
    SFXPlayback = 35,
    BGMPlayback = 36,
    CodeExec = 37,
    Arrangement = 38,
    Loop = 39,
};

struct Command {
    u32 header              [[color("AB7D32")]]; // 8
    u8 unk1                 [[color("AB7D32")]];
    u8 type        [[color("D04617")]]; // CommandType type 
    
    if (header != 8) std::error("Invalid header !!");

    if (type == 1) WaitDetails details;
    else if (type == 2) LinearMovementDetails details;
    else if (type == 3) GroundMovementDetails details;
    else if (type == 4) CircularMovementDetails details;
    else if (type == 5) ChargeMovementDetails details;
    else if (type == 6) GuidedMovementDetails details;
    else if (type == 7) ScreenOutsideAvoidanceMovementDetails details;
    else if (type == 8) MovementInvalidationDetails details;
    else if (type == 9) DirectionChangeDetails details;
    else if (type == 10) JumpDetails details;
    else if (type == 11) ShotDetails details;
    else if (type == 12) SwordDetails details;
    else if (type == 13) BlockSummonDetails details;
    else if (type == 14) CharacterSummonDetails details;
    else if (type == 15) ItemSummonDetails details;
    else if (type == 16) FlowOperationDetails details;
    else if (type == 17) StageClearDetails details;
    else if (type == 18) GameWaitDetails details;
    else if (type == 19) MessageDetails details;
    else if (type == 20) WarpDetails details;
    else if (type == 21) TargetSettingDetails details;
    else if (type == 22) StatusOperationDetails details;
    else if (type == 23) StatusOperation2Details details;
    else if (type == 24) DisappearanceDetails details;
    else if (type == 25) ItemAcquisitionDetails details;
    else if (type == 26) GraphicChangeDetails details;
    else if (type == 27) BasicAnimationSetChangeDetails details;
    else if (type == 28) AnimationExecutionDetails details;
    else if (type == 29) EffectExecutionDetails details;
    else if (type == 30) CharacterEffectExecutionDetails details;
    else if (type == 31) ScreenEffectExecutionDetails details;
    else if (type == 32) PictureDisplayDetails details;
    // else if (type == 33) ScreenColorChangeDetails details;
    else if (type == 34) BackgroundChangeDetails details;
    else if (type == 35) SoundEffectPlaybackDetails details;
    else if (type == 36) BGMPlaybackDetails details;
    else if (type == 37) CodeExecutionDetails details;
    else if (type == 38) ArrangementDetails details;
    else if (type == 39) LoopDetails details;
    else  std::error("Invalid type !!");
};

struct Block {
    u32 header                                          [[color("907060")]]; // 12
    u8 inherit_palette                                  [[color("907060")]];
    u16 inherit_palette_data                            [[color("907060")]];
    
    u8 any_of_appearance_conditions_true                [[color("907060")]];
    u8 appearance_condition_once_met_always_true        [[color("907060")]];
    
    u16 image_number                                    [[color("907060")]];
    u16 image_type                                      [[color("907060")]];
    
    u8 unknown1                                         [[color("907060")]];
    u8 in_front_of_character                            [[color("907060")]];

    u8 transparency                                     [[color("907060")]];
    u8 mark_display                                     [[color("907060")]]; //0:don't display 1:display 2:display only in editor
    u8 mark_number                                      [[color("907060")]];

    u8 unknown2                                         [[color("907060")]];

    u8 block_type                                       [[color("907060")]]; //0:no collision 1:collision 2:instant death on collision
    u8 invalid_faction                                  [[color("907060")]]; //255 if none, the faction number if present
    u8 action                                           [[color("907060")]];
    u32 action_parameter                                [[color("907060")]];
    u8 acquired_item_palette                            [[color("907060")]];
    u16 acquired_item_palette_data_number               [[color("907060")]];
    u8 block_summon_invalid                             [[color("907060")]];

    u32 strings_count; // 1 - std::vector<std::string>
    StdString name;
    
    s16 position_x                   [[color("907060")]];
    s16 position_y                   [[color("907060")]];
    
    u32 inherited_data_count; // 11 - std::vector<u8>
    u8 inherit_block_name            [[color("907060")]];
    u8 inherit_appearance_condition  [[color("907060")]];
    u8 inherit_image                 [[color("907060")]];
    u8 inherit_in_front_of_character [[color("907060")]];
    u8 inherit_transparency          [[color("907060")]];
    u8 inherit_mark                  [[color("907060")]];
    u8 inherit_block_type            [[color("907060")]];
    u8 inherit_invalid_faction       [[color("907060")]];
    u8 inherit_action                [[color("907060")]];
    u8 inherit_acquired_item         [[color("907060")]];
    u8 inherit_block_summon          [[color("907060")]];
    
    u32 display_conditions_count; // 2 - std::vector<BasicCondition>
    BasicCondition display_conditions[display_conditions_count];
    
};

struct Flow {
    u32 header                                                        [[color("200090")]]; // 0A - 10
    u8 id                                                             [[color("200090")]];
    u8 group                                                          [[color("200090")]];
    u8 test_play_only                                                 [[color("200090")]];
    u8 basic_condition_judgment_type                                  [[color("200090")]];
    u8 basic_condition_once_met_always_met                            [[color("200090")]];
    u8 timing                                                         [[color("200090")]];
    u8 target_character_involved_in_timing                            [[color("200090")]];
    u8 target_number_of_character_involved_in_timing                  [[color("200090")]];
    u8 ease_of_input_with_multiple_key_conditions                     [[color("200090")]];
    u8 allow_continuous_execution_by_holding_key                      [[color("200090")]];

    // u32 unknown2;
    
    if (header != 10) {
        std::error("Invalid header !!");
    }

    u32 memo_length                                                   [[color("200090")]];
    StdString memo;

    // std::vector<BasicCondition>
    u32 appearance_condition_count                                    [[color("200090")]];
    if (appearance_condition_count > 0) {
        BasicCondition conditions[appearance_condition_count];
    }

    // std::vector<KeyCondition>
    u32 key_condition_count                                           [[color("200090")]];
    if (key_condition_count > 0) {
        KeyCondition key_conditions[key_condition_count];
    }

    // std::vector<Command>
    u32 command_count                                                 [[color("200090")]];
    if (command_count > 0) {
        Command commands[command_count];
    }
};

struct FlowChangeDetails {
    char bytes1_30[30];

    // std::vector<Flow>
    u32 flow_count                                          [[color("125157")]];
    if (flow_count > 0) {
        Flow flows[flow_count];
    }

    char bytes69_72[4]                                      [[color("125157")]];
    u32 operation                                           [[color("125157")]];
    char bytes77_80[4]                                      [[color("125157")]];

};



struct Character {
    u32 header                                              [[color("207040")]]; // 35

    u8 inherit_palette                                      [[color("207040")]];
    u16 inherit_palette_data_number                         [[color("207040")]];

    u8 any_of_appearance_conditions_true                    [[color("207040")]];
    u8 appearance_condition_once_met_always_true            [[color("207040")]];
    u8 facing_right                                         [[color("207040")]];
    u8 number_of_doubles                                    [[color("207040")]];
    u16 appearance_position_offset_x_bl                     [[color("207040")]];
    u16 appearance_position_offset_x_dot                    [[color("207040")]];
    u16 appearance_position_offset_y_bl                     [[color("207040")]];
    u16 appearance_position_offset_y_dot                    [[color("207040")]];
    u8 appearance_position_offset_x_flip_if_facing_right    [[color("207040")]];
    u8 appearance_position_offset_y_flip_if_facing_right    [[color("207040")]];

    u16 image_number                                        [[color("207040")]];
    u8 image_type                                           [[color("207040")]];
    u16 image_offset                                        [[color("207040")]];
    u16 animation_set                                       [[color("207040")]];
    u8 z_coordinate                                         [[color("207040")]];
    u8 transparency                                         [[color("207040")]];
    u16 initial_character_effect                            [[color("207040")]];
    u8 initial_character_effect_execution_type              [[color("207040")]];
    u8 initial_character_effect_loop_execution              [[color("207040")]];
    u16 character_effect_on_death                           [[color("207040")]];
    u8 character_effect_on_death_execution_type             [[color("207040")]];
    u8 mark_display                                         [[color("207040")]]; //0:don't display 1:display 2:display only in editor
    u16 mark_number                                         [[color("207040")]];

    u16 operation                                           [[color("207040")]];
    u8 faction                                              [[color("207040")]];
    u8 character_id                                         [[color("207040")]];

    u8 flying                                               [[color("207040")]];
    u8 direction_fixed                                      [[color("207040")]];
    u8 invincible                                           [[color("207040")]];
    u8 invincible_effect                                    [[color("207040")]];
    u8 block                                                [[color("207040")]];
    u8 gigantic                                             [[color("207040")]];
    u8 synchronize_with_auto_scroll                         [[color("207040")]];
    u8 line_of_sight                                        [[color("207040")]];
    u8 line_of_sight_range                                  [[color("207040")]];

    u32 hp                                                  [[color("207040")]];
    u32 sp                                                  [[color("207040")]];
    u16 stopping_ease_during_inertial_movement              [[color("207040")]];
    u8 body_hit_detection_range                             [[color("207040")]];
    u32 body_hit_power                                      [[color("207040")]];
    u8 body_hit_impact                                      [[color("207040")]];
    u16 body_hit_effect                                     [[color("207040")]];
    u32 defense                                             [[color("207040")]];
    u8 impact_resistance                                    [[color("207040")]];

    u32 score                                               [[color("207040")]];
    u8 holds_item_at_same_position                          [[color("207040")]];

    u8 has_group                                            [[color("207040")]];
    u16 group_number                                        [[color("207040")]];
    u8 action_condition_range                               [[color("207040")]];
    u8 action_condition_judgment_type                       [[color("207040")]];

    // std::vector<stf::string>
    u32 strings_count                                       [[color("207040")]];
    StdString character_name;

    u16 position_x                                          [[color("207040")]]; //different from data position number in editor
    u16 position_y                                          [[color("207040")]];

    s32 some_count                                          [[color("207040")]]; // always 0 ??

    // std::vector<u8>
    u32 inherited_data_count                           [[color("207040")]]; // 37
    u8 inherit_character_name                          [[color("207040")]];
    u8 inherit_operation                               [[color("207040")]];
    u8 inherit_faction                                 [[color("207040")]];
    u8 inherit_character_id                            [[color("207040")]];
    u8 inherit_appearance_condition                    [[color("207040")]];
    u8 inherit_facing_right                            [[color("207040")]];
    u8 inherit_number_of_doubles                       [[color("207040")]];
    u8 inherit_initial_position_offset_x               [[color("207040")]];
    u8 inherit_initial_position_offset_y               [[color("207040")]];
    u8 inherit_image                                   [[color("207040")]];
    u8 inherit_animation_set                           [[color("207040")]];
    u8 inherit_z_coordinate                            [[color("207040")]];
    u8 inherit_transparency                            [[color("207040")]];
    u8 inherit_initial_character_effect                [[color("207040")]];
    u8 inherit_character_effect_on_death               [[color("207040")]];
    u8 inherit_mark                                    [[color("207040")]];
    u8 inherit_direction_fixed                         [[color("207040")]];
    u8 inherit_flying                                  [[color("207040")]];
    u8 inherit_invincible                              [[color("207040")]];
    u8 inherit_block                                   [[color("207040")]];
    u8 inherit_gigantic                                [[color("207040")]];
    u8 inherit_synchronize_with_auto_scroll            [[color("207040")]];
    u8 inherit_line_of_sight                           [[color("207040")]];
    u8 inherit_hp                                      [[color("207040")]];
    u8 inherit_sp                                      [[color("207040")]];
    u8 inherit_body_hit_detection_range                [[color("207040")]];
    u8 inherit_body_hit_power                          [[color("207040")]];
    u8 inherit_body_hit_impact                         [[color("207040")]];
    u8 inherit_body_hit_effect                         [[color("207040")]];
    u8 inherit_defense                                 [[color("207040")]];
    u8 inherit_impact_resistance                       [[color("207040")]];
    u8 inherit_stopping_ease_during_inertial_movement  [[color("207040")]];
    u8 inherit_action_condition                        [[color("207040")]];
    u8 inherit_group                                   [[color("207040")]];
    u8 inherit_score                                   [[color("207040")]];
    u8 inherit_holds_item_at_same_position             [[color("207040")]];
    u8 inherit_action                                  [[color("207040")]];

    // std::vector<BasicCondition>
    u32 appearance_condition_count                     [[color("209020")]];
    if (appearance_condition_count > 0) {
        BasicCondition conditions[appearance_condition_count];
    }

    // std::vector<Flow>
    u32 flow_count                                     [[color("200090")]];
    if (flow_count > 0) {
        Flow flows[flow_count];
    }
};


struct ItemEffect {
    u32 header; // 8
    char unk1;
    u8 type;

    if (type == 1) FlowChangeDetails details;
    if (type == 2) StageClearDetails details;
    if (type == 3) GameWaitDetails details;
    if (type == 4) MessageDetails details;
    if (type == 5) WarpDetails details;
    // if (type == 6) TargetSettingDetails details;
    if (type == 7) StatusOperationDetails details;
    if (type == 8) StatusOperation2Details details;
    if (type == 9) DisappearanceDetails details;
    if (type == 10) ItemAcquisitionDetails details;
    if (type == 11) GraphicChangeDetails details;
    if (type == 12) BasicAnimationSetChangeDetails details;
    if (type == 13) AnimationExecutionDetails details;
    if (type == 14) EffectExecutionDetails details;
    if (type == 15) CharacterEffectExecutionDetails details;
    if (type == 16) ScreenEffectExecutionDetails details;
    if (type == 17) PictureDisplayDetails details;
    // if (type == 18) ScreenColorChangeDetails details;
    if (type == 19) BackgroundChangeDetails details;
    if (type == 20) SoundEffectPlaybackDetails details;
    if (type == 21) BGMPlaybackDetails details;
    if (type == 22) CodeExecutionDetails details;
    if (type == 23) ArrangementDetails details;
    if (type == 24) LoopDetails details;

};

struct Item {
    u32 header                     [[color("403060")]]; // 11

    u8 inherit_palette                  [[color("403060")]];
    u16 inherit_palette_data_number     [[color("403060")]];

    u8 any_of_appearance_conditions_true                    [[color("403060")]];
    u8 appearance_condition_once_met_always_true            [[color("403060")]];
    u16 appearance_position_offset_x_dot                    [[color("403060")]];
    u16 appearance_position_offset_y_dot                    [[color("403060")]];

    u16 image_number                                        [[color("403060")]];
    u8 image_type                                           [[color("403060")]];
    u16 frame                                               [[color("403060")]];
    u8 z_coordinate                                         [[color("403060")]];
    u8 transparency                                         [[color("403060")]];
    u8 mark_display                                         [[color("403060")]]; //0:don't display 1:display 2:display only in editor
    u16 mark_number                                         [[color("403060")]];

    u8 display_above_head_on_acquisition                    [[color("403060")]];
    u8 acquisition_type                                     [[color("403060")]];
    u8 gigantic                                             [[color("403060")]];
    u16 sound_effect                                        [[color("403060")]];

    // u32 unknown;

    u32 item_name_length                                    [[color("403060")]];
    StdString item_name;

    u16 position_x                                          [[color("403060")]];
    u16 position_y                                          [[color("403060")]];

    u32 number_of_inherited_data                            [[color("403060")]];
    u8 inherit_item_name                                    [[color("403060")]];
    u8 inherit_appearance_condition                         [[color("403060")]];
    u8 inherit_initial_position_offset_x                    [[color("403060")]];
    u8 inherit_initial_position_offset_y                    [[color("403060")]];
    u8 inherit_image                                        [[color("403060")]];
    u8 inherit_z_coordinate                                 [[color("403060")]];
    u8 inherit_transparency                                 [[color("403060")]];
    u8 inherit_mark                                         [[color("403060")]];
    u8 inherit_gigantic                                     [[color("403060")]];
    u8 inherit_acquisition_type                             [[color("403060")]];
    u8 inherit_display_above_head_on_acquisition            [[color("403060")]];
    u8 inherit_sound_effect                                 [[color("403060")]];
    u8 inherit_effect                                       [[color("403060")]];

    // std::vector<BasicCondition>
    u32 appearance_condition_count                          [[color("403060")]];
    if (appearance_condition_count > 0) {
        BasicCondition conditions[appearance_condition_count];
    }

    // std::vector<ItemEffect>
    u32 item_effects_count                                  [[color("403060")]];
    if (item_effects_count > 0) {
        ItemEffect item_effects[item_effects_count];
    }
};



// Block stg2 @0x31c;

// Character chr2 @0x4B1;

/*Character chr3 @0x601;
Flow fl2 @0x469;
Flow fl3 @0x48D;*/


struct StagePalette {
    // std::vector<Block>
    u32 blocks_count;
    if (blocks_count > 0) {
        Block blocks[blocks_count];
    }
    
    // std::vector<Character>
    u32 character_count;
    if (character_count > 0) {
        Character characters[character_count];
    }

    // std::vector<Item>
    u32 item_count;
    if (item_count > 0) {
        Item items[item_count]          [[color("9370DB")]];
    }
    

    // std::vector<Background> ??
   
};

struct StageBlock {
    u32 position            [[color("413050")]];
    Block block             [[color("413050")]];
};

struct StageCharacter {
    u32 position;
    Character character;
};

struct StageItem {
    u32 position;
    Item item;
};

struct StagePaletteFile {
    u32 magic               [[color("A17020")]];
    u32 some_count          [[color("A17020")]]; // 99 - std::vector<int>
    
    u32 item_width          [[color("A17020")]];
    
    u32 chunk_width         [[color("A17020")]]; // 32
    u32 chunk_pow           [[color("A17020")]]; // 5
   
    u32 height              [[color("A17020")]];
    
    u32 enable_horizontal_scroll_minimum        [[color("A17020")]];
    u32 enable_horizontal_scroll_maximum        [[color("A17020")]];
    u32 enable_vertical_scroll_minimum          [[color("A17020")]]; // top left
    u32 enable_vertical_scroll_maximum          [[color("A17020")]]; // bottom
    
    u32 horizontal_scroll_minimum_value         [[color("A17020")]];
    u32 horizontal_scroll_maximum_value         [[color("A17020")]];
    u32 vertical_scroll_minimum_value           [[color("A17020")]];
    u32 vertical_scroll_maximum_value           [[color("A17020")]];
    
    // Page 2
    
    u32 frame_rate                  [[color("A17020")]];
    
    u32 enable_time_limit           [[color("A17020")]];
    u32 time_limit_duration         [[color("A17020")]];  // seconds
    u32 warning_sound_start_time    [[color("A17020")]];
    
    u32 enable_side_scroll         [[color("A17020")]];
    u32 enable_vertical_scroll     [[color("A17020")]];
    u32 autoscroll_speed           [[color("A17020")]];
    u32 vertical_scroll_speed      [[color("A17020")]];
    
    double gravity                 [[color("A17020")]];
    
    u32 hit_detection_level                                         [[color("A17020")]];
    u32 character_shot_collision_detection_accuracy                 [[color("A17020")]];
    
    u32 bgm_number                          [[color("A17020")]];
    u32 bgm_loop_playback                   [[color("A17020")]];
    u32 dont_restart_bgm_if_no_change       [[color("A17020")]];
    
    
    u32 enable_z_coordinate                 [[color("A17020")]];
    
    u32 inherit_status_from_stock           [[color("A17020")]];
    u32 store_status_to_stock               [[color("A17020")]];
    u32 show_status_window                  [[color("A17020")]];
    
    u32 switch_scene_immediately_on_clear   [[color("A17020")]];
    u32 allow_replay_save                   [[color("A17020")]];
    
    // show text images
    u32 show_stage                  [[color("A17020")]];
    u32 show_ready                  [[color("A17020")]];
    u32 show_clear                  [[color("A17020")]];
    u32 show_gameover               [[color("A17020")]];
    
    PlayerCollision player_collide;
    
    EnemyCollision enemy_collide;
    
    u32 item_collision_width        [[color("A17020")]];
    u32 item_collision_height       [[color("A17020")]];   

    ActorHitbox player_hitbox;
    ActorHitbox enemy_hitbox;
    
    // Okay this is original, but this limit the number of "ctrl-z"
    u32 undo_max_times              [[color("A17020")]];

    u32 x_coordinate_upper_limit    [[color("A17020")]];
    u32 y_coordinate_upper_limit    [[color("A17020")]];

    u32 unk75    [[color("A17020")]];
    u32 unk76    [[color("A17020")]];
    u32 unk77    [[color("A17020")]];
    u32 unk78    [[color("A17020")]];
    u32 unk79    [[color("A17020")]];

    u32 unk80    [[color("A17020")]];
    u32 unk81    [[color("A17020")]];
    u32 unk82    [[color("A17020")]];
    u32 unk83    [[color("A17020")]];
    u32 unk84    [[color("A17020")]];
    u32 unk85    [[color("A17020")]];
    u32 unk86    [[color("A17020")]];
    
    u32 disable_damage_outside_screen       [[color("A17020")]];

    u32 player_invincibility_from_same_enemy_duration       [[color("A17020")]];
    u32 player_invincibility_duration                       [[color("A17020")]];

    u32 enemy_invincibility_from_same_player_duration       [[color("A17020")]];
    u32 enemy_invincibility_duration                        [[color("A17020")]];
    
    u32 stage_names    [[color("A17020")]]; // std::vector<std::string>
    StdString stage_name;
    
    u32 ranking_size    [[color("A17020")]]; // 5  - std::vector<int>
    // Ranking
    u32 ranking_score                       [[color("A17020")]];
    u32 ranking_remaining_time              [[color("A17020")]];
    u32 ranking_clear_time                  [[color("A17020")]];
    u32 ranking_remaining_hp                [[color("A17020")]];
    u32 ranking_remaining_sp                [[color("A17020")]];

    // DeathFade : fade animation on death
    DeathFade nonblock_enemy_death          [[color("A17020")]];
    DeathFade block_enemy_death             [[color("A17020")]];
    DeathFade item_death                    [[color("A17020")]];
    DeathFade player_death                  [[color("A17020")]];
    DeathFade enemy_death                   [[color("A17020")]];

    // Stage Palette - add the header  FC 03 00 00 and it's a  plt4 file !
    StagePalette palette;

    // std::vector<StageBlock>
    u32 block_count                         [[color("413050")]];
    if (block_count > 0) {
        StageBlock blocks[block_count];
    }

    // std::vector<StageCharacter>
    u32 character_count;
    if (character_count > 0) {
        StageCharacter characters[character_count];
    }

    // std::vector<Item>
    u32 item_count;
    if (item_count > 0) {
        StageItem items[item_count]          [[color("9370DB")]];
    }
    

    // std::vector<Background>
    u32 background_count;
    if (background_count > 0) {
        Background backgrounds[background_count];
    }

};


#pragma pattern_limit 531072
StagePaletteFile stage_pal_file @ 0x0;