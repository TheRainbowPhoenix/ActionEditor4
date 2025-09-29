import DataReader from './DataReader.js';
import DataWriter from './DataWriter.js';

// Configuration for validation limits
const CONFIG = {
  MAX_ARRAY_SIZE: 2048,
  MAX_STRING_LENGTH: 10000,
};

export function setMaxArraySize(size) {
  CONFIG.MAX_ARRAY_SIZE = size;
}

export function setMaxStringLength(length) {
  CONFIG.MAX_STRING_LENGTH = length;
}

function ensureReader(source) {
  if (source instanceof DataReader) {
    return source;
  }
  return new DataReader(source);
}

function validateArraySize(size, name) {
  if (size < 0) {
    throw new Error(`Invalid array size for ${name}: ${size} (must be non-negative)`);
  }
  if (size > CONFIG.MAX_ARRAY_SIZE) {
    throw new Error(`Array size for ${name} exceeds maximum: ${size} > ${CONFIG.MAX_ARRAY_SIZE}`);
  }
}

function readStdString(reader) {
  const length = reader.readUint32();
  if (length > CONFIG.MAX_STRING_LENGTH) {
    throw new Error(`String length exceeds maximum: ${length} > ${CONFIG.MAX_STRING_LENGTH}`);
  }
  if (length <= 1) {
    return '';
  }
  return reader.readString(length);
}

function writeStdString(writer, value) {
  const stringValue = value ?? '';
  if (!stringValue) {
    writer.writeUint32(0);
    return;
  }
  writer.writeLengthPrefixedString(stringValue);
}

// BasicCondition
function parseBasicCondition(reader) {
  const header = reader.readUint32();
  if (header !== 17) {
    throw new Error(`Invalid BasicCondition header: expected 17, got ${header}`);
  }
  
  return {
    header,
    type: reader.readUint8(),
    right_side_constant: reader.readUint32(),
    right_side_random_lower_limit: reader.readUint32(),
    right_side_random_upper_limit: reader.readUint32(),
    left_side_status_target: reader.readUint8(),
    left_side_status_number: reader.readUint8(),
    left_side_type: reader.readUint8(),
    left_side_common_variable_or_stage_variable: reader.readUint8(),
    left_side_variable_number: reader.readUint16(),
    left_side_flow_variable_number: reader.readUint8(),
    right_side_type: reader.readUint8(),
    right_side_status_target: reader.readUint8(),
    right_side_status_number: reader.readUint8(),
    right_side_common_variable_or_stage_variable: reader.readUint8(),
    right_side_variable_number: reader.readUint16(),
    right_side_flow_variable_number: reader.readUint8(),
    how_to_compare: reader.readUint8(),
    specify_in_percent: reader.readUint8(),
    left_side_coordinate_type: reader.readUint8(),
    right_side_coordinate_type: reader.readUint8(),
    left_side_gigantic_character_coordinate_position: reader.readUint8(),
    right_side_gigantic_character_coordinate_position: reader.readUint8(),
    unk1: reader.readUint8(),
    unk2: reader.readUint8(),
    unk3: reader.readUint8(),
    unk4: reader.readUint8(),
    unk5: reader.readUint8(),
  };
}

function writeBasicCondition(writer, condition) {
  writer.writeUint32(condition?.header ?? 17);
  writer.writeUint8(condition?.type ?? 0);
  writer.writeUint32(condition?.right_side_constant ?? 0);
  writer.writeUint32(condition?.right_side_random_lower_limit ?? 0);
  writer.writeUint32(condition?.right_side_random_upper_limit ?? 0);
  writer.writeUint8(condition?.left_side_status_target ?? 0);
  writer.writeUint8(condition?.left_side_status_number ?? 0);
  writer.writeUint8(condition?.left_side_type ?? 0);
  writer.writeUint8(condition?.left_side_common_variable_or_stage_variable ?? 0);
  writer.writeUint16(condition?.left_side_variable_number ?? 0);
  writer.writeUint8(condition?.left_side_flow_variable_number ?? 0);
  writer.writeUint8(condition?.right_side_type ?? 0);
  writer.writeUint8(condition?.right_side_status_target ?? 0);
  writer.writeUint8(condition?.right_side_status_number ?? 0);
  writer.writeUint8(condition?.right_side_common_variable_or_stage_variable ?? 0);
  writer.writeUint16(condition?.right_side_variable_number ?? 0);
  writer.writeUint8(condition?.right_side_flow_variable_number ?? 0);
  writer.writeUint8(condition?.how_to_compare ?? 0);
  writer.writeUint8(condition?.specify_in_percent ?? 0);
  writer.writeUint8(condition?.left_side_coordinate_type ?? 0);
  writer.writeUint8(condition?.right_side_coordinate_type ?? 0);
  writer.writeUint8(condition?.left_side_gigantic_character_coordinate_position ?? 0);
  writer.writeUint8(condition?.right_side_gigantic_character_coordinate_position ?? 0);
  writer.writeUint8(condition?.unk1 ?? 0);
  writer.writeUint8(condition?.unk2 ?? 0);
  writer.writeUint8(condition?.unk3 ?? 0);
  writer.writeUint8(condition?.unk4 ?? 0);
  writer.writeUint8(condition?.unk5 ?? 0);
}

// KeyCondition
function parseKeyCondition(reader) {
  const header = reader.readUint32();
  if (header !== 5) {
    throw new Error(`Invalid KeyCondition header: expected 5, got ${header}`);
  }
  
  return {
    header,
    right_and_left_to_front_and_back: reader.readUint8(),
    minimum_input_time: reader.readUint16(),
    maximum_input_time: reader.readUint16(),
    input_time_1_to_infinity: reader.readUint8(),
    judgment_type: reader.readUint8(),
    unknown: reader.readUint32(),
    number_of_key_data: reader.readUint32(),
    direction_key_neutral: reader.readUint8(),
    left_key: reader.readUint8(),
    right_key: reader.readUint8(),
    up_key: reader.readUint8(),
    down_key: reader.readUint8(),
    up_left_key: reader.readUint8(),
    down_left_key: reader.readUint8(),
    up_right_key: reader.readUint8(),
    down_right_key: reader.readUint8(),
    any_direction_key: reader.readUint8(),
    action_key_neutral: reader.readUint8(),
    z_key: reader.readUint8(),
    x_key: reader.readUint8(),
    c_key: reader.readUint8(),
    v_key: reader.readUint8(),
    a_key: reader.readUint8(),
    s_key: reader.readUint8(),
    d_key: reader.readUint8(),
    f_key: reader.readUint8(),
  };
}

function writeKeyCondition(writer, condition) {
  writer.writeUint32(condition?.header ?? 5);
  writer.writeUint8(condition?.right_and_left_to_front_and_back ?? 0);
  writer.writeUint16(condition?.minimum_input_time ?? 0);
  writer.writeUint16(condition?.maximum_input_time ?? 0);
  writer.writeUint8(condition?.input_time_1_to_infinity ?? 0);
  writer.writeUint8(condition?.judgment_type ?? 0);
  writer.writeUint32(condition?.unknown ?? 0);
  writer.writeUint32(condition?.number_of_key_data ?? 0);
  writer.writeUint8(condition?.direction_key_neutral ?? 0);
  writer.writeUint8(condition?.left_key ?? 0);
  writer.writeUint8(condition?.right_key ?? 0);
  writer.writeUint8(condition?.up_key ?? 0);
  writer.writeUint8(condition?.down_key ?? 0);
  writer.writeUint8(condition?.up_left_key ?? 0);
  writer.writeUint8(condition?.down_left_key ?? 0);
  writer.writeUint8(condition?.up_right_key ?? 0);
  writer.writeUint8(condition?.down_right_key ?? 0);
  writer.writeUint8(condition?.any_direction_key ?? 0);
  writer.writeUint8(condition?.action_key_neutral ?? 0);
  writer.writeUint8(condition?.z_key ?? 0);
  writer.writeUint8(condition?.x_key ?? 0);
  writer.writeUint8(condition?.c_key ?? 0);
  writer.writeUint8(condition?.v_key ?? 0);
  writer.writeUint8(condition?.a_key ?? 0);
  writer.writeUint8(condition?.s_key ?? 0);
  writer.writeUint8(condition?.d_key ?? 0);
  writer.writeUint8(condition?.f_key ?? 0);
}

// Command Details structures
function parseWaitDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes: Array.from(reader.readBytes(33)),
  };
}

function writeWaitDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes ?? new Array(33).fill(0)));
}

function parseLinearMovementDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_8: Array.from(reader.readBytes(3)),
    animation_and_other_type: reader.readUint16(),
    bytes11_26: Array.from(reader.readBytes(16)),
    movement_direction_setting_type: reader.readUint8(),
    movement_direction_direction: reader.readUint8(),
    movement_direction_angle: reader.readUint16(),
    movement_direction_angle_double: reader.readUint16(),
    movement_direction_angle_reverse_rotation_if_facing_right: reader.readUint8(),
    movement_direction_target_x_present: reader.readUint8(),
    movement_direction_target_y_present: reader.readUint8(),
    movement_direction_target_x: reader.readUint16(),
    movement_direction_target_y: reader.readUint16(),
    movement_direction_target_x_dot: reader.readUint16(),
    movement_direction_target_y_dot: reader.readUint16(),
    movement_direction_target_type: reader.readUint8(),
    movement_direction_target_coordinate_unit: reader.readUint8(),
    byte46: reader.readChar(),
    movement_direction_execute_until_target_coordinate_reached: reader.readUint8(),
    movement_direction_invalidate_horizontal_movement: reader.readUint8(),
    movement_direction_invalidate_vertical_movement: reader.readUint8(),
    movement_direction_target_x_flip_if_facing_right: reader.readUint8(),
    movement_direction_target_y_flip_if_facing_right: reader.readUint8(),
    movement_direction_reverse_speed_if_direction_changes: reader.readUint8(),
    movement_direction_prevent_blur: reader.readUint8(),
    movement_direction_dont_change_character_direction: reader.readUint8(),
    time_speed_distance_setting_type: reader.readUint8(),
    time_speed_distance_speed: reader.readUint16(),
    time_speed_distance_speed_double: reader.readUint16(),
    time_speed_distance_distance: reader.readUint16(),
    time_speed_distance_distance_double: reader.readUint16(),
    time_speed_distance_distance_unit: reader.readUint8(),
    bytes65_68: Array.from(reader.readBytes(4)),
    inertia_present: reader.readUint8(),
    inertia_max_speed: reader.readUint16(),
    inertia_speed_correction_on_direction_change: reader.readFloat64(),
    animation_type: reader.readUint8(),
    bytes81_101: Array.from(reader.readBytes(21)),
  };
}

function writeLinearMovementDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes6_8 ?? new Array(3).fill(0)));
  writer.writeUint16(details?.animation_and_other_type ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes11_26 ?? new Array(16).fill(0)));
  writer.writeUint8(details?.movement_direction_setting_type ?? 0);
  writer.writeUint8(details?.movement_direction_direction ?? 0);
  writer.writeUint16(details?.movement_direction_angle ?? 0);
  writer.writeUint16(details?.movement_direction_angle_double ?? 0);
  writer.writeUint8(details?.movement_direction_angle_reverse_rotation_if_facing_right ?? 0);
  writer.writeUint8(details?.movement_direction_target_x_present ?? 0);
  writer.writeUint8(details?.movement_direction_target_y_present ?? 0);
  writer.writeUint16(details?.movement_direction_target_x ?? 0);
  writer.writeUint16(details?.movement_direction_target_y ?? 0);
  writer.writeUint16(details?.movement_direction_target_x_dot ?? 0);
  writer.writeUint16(details?.movement_direction_target_y_dot ?? 0);
  writer.writeUint8(details?.movement_direction_target_type ?? 0);
  writer.writeUint8(details?.movement_direction_target_coordinate_unit ?? 0);
  writer.writeInt8(details?.byte46 ?? 0);
  writer.writeUint8(details?.movement_direction_execute_until_target_coordinate_reached ?? 0);
  writer.writeUint8(details?.movement_direction_invalidate_horizontal_movement ?? 0);
  writer.writeUint8(details?.movement_direction_invalidate_vertical_movement ?? 0);
  writer.writeUint8(details?.movement_direction_target_x_flip_if_facing_right ?? 0);
  writer.writeUint8(details?.movement_direction_target_y_flip_if_facing_right ?? 0);
  writer.writeUint8(details?.movement_direction_reverse_speed_if_direction_changes ?? 0);
  writer.writeUint8(details?.movement_direction_prevent_blur ?? 0);
  writer.writeUint8(details?.movement_direction_dont_change_character_direction ?? 0);
  writer.writeUint8(details?.time_speed_distance_setting_type ?? 0);
  writer.writeUint16(details?.time_speed_distance_speed ?? 0);
  writer.writeUint16(details?.time_speed_distance_speed_double ?? 0);
  writer.writeUint16(details?.time_speed_distance_distance ?? 0);
  writer.writeUint16(details?.time_speed_distance_distance_double ?? 0);
  writer.writeUint8(details?.time_speed_distance_distance_unit ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes65_68 ?? new Array(4).fill(0)));
  writer.writeUint8(details?.inertia_present ?? 0);
  writer.writeUint16(details?.inertia_max_speed ?? 0);
  writer.writeFloat64(details?.inertia_speed_correction_on_direction_change ?? 0);
  writer.writeUint8(details?.animation_type ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes81_101 ?? new Array(21).fill(0)));
}

function parseGenericMovementDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_101: Array.from(reader.readBytes(96)),
  };
}

function writeGenericMovementDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes6_101 ?? new Array(96).fill(0)));
}

function parseJumpDetails(reader) {
  return {
    bytes1_5: Array.from(reader.readBytes(5)),
    sound_effect: reader.readUint16(),
    play_if_outside_screen: reader.readUint8(),
    animation: reader.readUint16(),
    bytes11_38: Array.from(reader.readBytes(28)),
    jump_type: reader.readUint32(),
    max_jump_inertial_movement_speed: reader.readUint32(),
    max_jump_height: reader.readUint32(),
    min_jump_inertial_movement_speed: reader.readUint32(),
    min_jump_height: reader.readUint32(),
  };
}

function writeJumpDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_5 ?? new Array(5).fill(0)));
  writer.writeUint16(details?.sound_effect ?? 0);
  writer.writeUint8(details?.play_if_outside_screen ?? 0);
  writer.writeUint16(details?.animation ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes11_38 ?? new Array(28).fill(0)));
  writer.writeUint32(details?.jump_type ?? 0);
  writer.writeUint32(details?.max_jump_inertial_movement_speed ?? 0);
  writer.writeUint32(details?.max_jump_height ?? 0);
  writer.writeUint32(details?.min_jump_inertial_movement_speed ?? 0);
  writer.writeUint32(details?.min_jump_height ?? 0);
}

function parseShotDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_if_outside_screen: reader.readUint8(),
    animation: reader.readUint16(),
    bytes11_30: Array.from(reader.readBytes(20)),
    number_of_shots_fired: reader.readUint8(),
    formation: reader.readUint8(),
    firing_parameter1: reader.readUint16(),
    firing_parameter2: reader.readUint16(),
    firing_parameter3: reader.readUint16(),
    target: reader.readUint8(),
    direction: reader.readUint8(),
    set_angle_to_target: reader.readUint8(),
    firing_target: reader.readUint8(),
    angle_offset: reader.readUint16(),
    angle_offset_double: reader.readUint16(),
    angle_offset_reverse_rotation_if_facing_right: reader.readUint8(),
    angle_dispersion: reader.readUint16(),
    change_firing_position_according_to_angle: reader.readUint8(),
    number_of_doubles: reader.readUint8(),
    firing_position_offset_x: reader.readUint16(),
    firing_position_offset_x_double: reader.readUint16(),
    firing_position_offset_y: reader.readUint16(),
    firing_position_offset_y_double: reader.readUint16(),
    firing_position_offset_x_flip_if_facing_right: reader.readUint8(),
    firing_position_offset_y_flip_if_facing_right: reader.readUint8(),
    graphic: reader.readUint16(),
    z_coordinate: reader.readUint8(),
    transparency: reader.readUint8(),
    faction_same_as_user: reader.readUint8(),
    faction: reader.readUint16(),
    gigantic: reader.readUint16(),
    movement_type: reader.readUint8(),
    movement_type_parameter1: reader.readUint16(),
    movement_type_parameter2: reader.readUint16(),
    movement_type_parameter3: reader.readUint16(),
    movement_target: reader.readUint8(),
    synchronize_with_auto_scroll: reader.readUint8(),
    speed: reader.readUint16(),
    speed_double: reader.readUint16(),
    acceleration_enabled: reader.readUint8(),
    acceleration: reader.readUint16(),
    acceleration_double: reader.readUint16(),
    flight_distance: reader.readUint16(),
    flight_distance_valid: reader.readUint8(),
    flight_distance_double: reader.readUint16(),
    flight_distance_does_not_disappear_at_end: reader.readUint8(),
    disappearance_time_valid: reader.readUint8(),
    disappearance_time: reader.readUint16(),
    disappearance_time_double: reader.readUint16(),
    penetrate_blocks: reader.readUint8(),
    penetrate_characters: reader.readUint8(),
    penetrate_block_characters: reader.readUint8(),
    disappear_on_hitting_shot: reader.readUint8(),
    value_for_disappearing_on_hitting_shot: reader.readUint8(),
    power: reader.readUint32(),
    bytes109_110: Array.from(reader.readBytes(2)),
    impact: reader.readUint8(),
    effect: reader.readUint16(),
    acquired_item_palette_type: reader.readUint8(),
    acquired_item_palette_number: reader.readUint16(),
    bytes117_125: Array.from(reader.readBytes(9)),
    attack: reader.readUint8(),
    attack_id: reader.readUint8(),
    bytes128_143: Array.from(reader.readBytes(16)),
  };
}

function writeShotDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeUint16(details?.sound_effect ?? 0);
  writer.writeUint8(details?.play_if_outside_screen ?? 0);
  writer.writeUint16(details?.animation ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes11_30 ?? new Array(20).fill(0)));
  writer.writeUint8(details?.number_of_shots_fired ?? 0);
  writer.writeUint8(details?.formation ?? 0);
  writer.writeUint16(details?.firing_parameter1 ?? 0);
  writer.writeUint16(details?.firing_parameter2 ?? 0);
  writer.writeUint16(details?.firing_parameter3 ?? 0);
  writer.writeUint8(details?.target ?? 0);
  writer.writeUint8(details?.direction ?? 0);
  writer.writeUint8(details?.set_angle_to_target ?? 0);
  writer.writeUint8(details?.firing_target ?? 0);
  writer.writeUint16(details?.angle_offset ?? 0);
  writer.writeUint16(details?.angle_offset_double ?? 0);
  writer.writeUint8(details?.angle_offset_reverse_rotation_if_facing_right ?? 0);
  writer.writeUint16(details?.angle_dispersion ?? 0);
  writer.writeUint8(details?.change_firing_position_according_to_angle ?? 0);
  writer.writeUint8(details?.number_of_doubles ?? 0);
  writer.writeUint16(details?.firing_position_offset_x ?? 0);
  writer.writeUint16(details?.firing_position_offset_x_double ?? 0);
  writer.writeUint16(details?.firing_position_offset_y ?? 0);
  writer.writeUint16(details?.firing_position_offset_y_double ?? 0);
  writer.writeUint8(details?.firing_position_offset_x_flip_if_facing_right ?? 0);
  writer.writeUint8(details?.firing_position_offset_y_flip_if_facing_right ?? 0);
  writer.writeUint16(details?.graphic ?? 0);
  writer.writeUint8(details?.z_coordinate ?? 0);
  writer.writeUint8(details?.transparency ?? 0);
  writer.writeUint8(details?.faction_same_as_user ?? 0);
  writer.writeUint16(details?.faction ?? 0);
  writer.writeUint16(details?.gigantic ?? 0);
  writer.writeUint32(details?.sword_type ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes75_104 ?? new Array(30).fill(0)));
  writer.writeUint32(details?.power ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes109_110 ?? new Array(2).fill(0)));
  writer.writeUint8(details?.impact ?? 0);
  writer.writeUint16(details?.effect ?? 0);
  writer.writeUint8(details?.acquired_item_palette_type ?? 0);
  writer.writeUint16(details?.acquired_item_palette_number ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes117_125 ?? new Array(9).fill(0)));
  writer.writeUint8(details?.attack ?? 0);
  writer.writeUint8(details?.attack_id ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes128_143 ?? new Array(16).fill(0)));
}

function parseSummonDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_sound_effect_if_outside_screen: reader.readUint8(),
    animation: reader.readUint8(),
    bytes10_30: Array.from(reader.readBytes(21)),
    count: reader.readUint8(),
    formation: reader.readUint8(),
    interval: reader.readUint16(),
    number_of_columns: reader.readUint16(),
    column_interval: reader.readUint16(),
    target: reader.readUint8(),
    direction: reader.readUint8(),
    byte41: reader.readChar(),
    target2: reader.readUint8(),
    bytes43_51: Array.from(reader.readBytes(9)),
    summon_position_offset_x: reader.readUint32(),
    summon_position_offset_y: reader.readUint32(),
    summon_position_offset_x_flip: reader.readUint8(),
    summon_position_offset_y_flip: reader.readUint8(),
    bytes62_66: Array.from(reader.readBytes(5)),
    faction: reader.readUint8(),
    bytes68_88: Array.from(reader.readBytes(21)),
    existence_time: reader.readUint16(),
    existence_time_present: reader.readUint8(),
    bytes92_119: Array.from(reader.readBytes(28)),
    palette_type: reader.readUint8(),
    palette_data_number: reader.readUint16(),
    faction_specification_method: reader.readUint8(),
    set_acquired_score_to_0: reader.readUint8(),
    direction_flip: reader.readUint8(),
    attack: reader.readUint8(),
    attack_flow: reader.readUint8(),
    bytes128_143: Array.from(reader.readBytes(16)),
    return_value_to_flow_variable: reader.readUint8(),
    bytes145_147: Array.from(reader.readBytes(3)),
  };
}

function writeSummonDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeUint16(details?.sound_effect ?? 0);
  writer.writeUint8(details?.play_sound_effect_if_outside_screen ?? 0);
  writer.writeUint8(details?.animation ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes10_30 ?? new Array(21).fill(0)));
  writer.writeUint8(details?.count ?? 0);
  writer.writeUint8(details?.formation ?? 0);
  writer.writeUint16(details?.interval ?? 0);
  writer.writeUint16(details?.number_of_columns ?? 0);
  writer.writeUint16(details?.column_interval ?? 0);
  writer.writeUint8(details?.target ?? 0);
  writer.writeUint8(details?.direction ?? 0);
  writer.writeInt8(details?.byte41 ?? 0);
  writer.writeUint8(details?.target2 ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes43_51 ?? new Array(9).fill(0)));
  writer.writeUint32(details?.summon_position_offset_x ?? 0);
  writer.writeUint32(details?.summon_position_offset_y ?? 0);
  writer.writeUint8(details?.summon_position_offset_x_flip ?? 0);
  writer.writeUint8(details?.summon_position_offset_y_flip ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes62_66 ?? new Array(5).fill(0)));
  writer.writeUint8(details?.faction ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes68_88 ?? new Array(21).fill(0)));
  writer.writeUint16(details?.existence_time ?? 0);
  writer.writeUint8(details?.existence_time_present ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes92_119 ?? new Array(28).fill(0)));
  writer.writeUint8(details?.palette_type ?? 0);
  writer.writeUint16(details?.palette_data_number ?? 0);
  writer.writeUint8(details?.faction_specification_method ?? 0);
  writer.writeUint8(details?.set_acquired_score_to_0 ?? 0);
  writer.writeUint8(details?.direction_flip ?? 0);
  writer.writeUint8(details?.attack ?? 0);
  writer.writeUint8(details?.attack_flow ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes128_143 ?? new Array(16).fill(0)));
  writer.writeUint8(details?.return_value_to_flow_variable ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes145_147 ?? new Array(3).fill(0)));
}

function parseItemSummonDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_sound_effect_if_outside_screen: reader.readUint8(),
    animation: reader.readUint8(),
    bytes10_30: Array.from(reader.readBytes(21)),
    count: reader.readUint8(),
    formation: reader.readUint8(),
    interval: reader.readUint16(),
    number_of_columns: reader.readUint16(),
    column_interval: reader.readUint16(),
    target: reader.readUint8(),
    direction: reader.readUint8(),
    byte41: reader.readUint8(),
    target2: reader.readUint8(),
    bytes43_51: Array.from(reader.readBytes(9)),
    summon_position_offset_x: reader.readUint32(),
    summon_position_offset_y: reader.readUint32(),
    summon_position_offset_x_flip: reader.readUint8(),
    summon_position_offset_y_flip: reader.readUint8(),
    bytes62_66: Array.from(reader.readBytes(5)),
    faction: reader.readUint8(),
    bytes68_88: Array.from(reader.readBytes(21)),
    existence_time: reader.readUint16(),
    existence_time_present: reader.readUint8(),
    bytes92_119: Array.from(reader.readBytes(28)),
    palette_type: reader.readUint8(),
    palette_data_number: reader.readUint16(),
    faction_specification_method: reader.readUint8(),
    set_acquired_score_to_0: reader.readUint8(),
    direction_flip: reader.readUint8(),
    attack: reader.readUint8(),
    attack_flow: reader.readUint8(),
    bytes128_143: Array.from(reader.readBytes(16)),
  };
}

function writeItemSummonDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeUint16(details?.sound_effect ?? 0);
  writer.writeUint8(details?.play_sound_effect_if_outside_screen ?? 0);
  writer.writeUint8(details?.animation ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes10_30 ?? new Array(21).fill(0)));
  writer.writeUint8(details?.count ?? 0);
  writer.writeUint8(details?.formation ?? 0);
  writer.writeUint16(details?.interval ?? 0);
  writer.writeUint16(details?.number_of_columns ?? 0);
  writer.writeUint16(details?.column_interval ?? 0);
  writer.writeUint8(details?.target ?? 0);
  writer.writeUint8(details?.direction ?? 0);
  writer.writeUint8(details?.byte41 ?? 0);
  writer.writeUint8(details?.target2 ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes43_51 ?? new Array(9).fill(0)));
  writer.writeUint32(details?.summon_position_offset_x ?? 0);
  writer.writeUint32(details?.summon_position_offset_y ?? 0);
  writer.writeUint8(details?.summon_position_offset_x_flip ?? 0);
  writer.writeUint8(details?.summon_position_offset_y_flip ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes62_66 ?? new Array(5).fill(0)));
  writer.writeUint8(details?.faction ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes68_88 ?? new Array(21).fill(0)));
  writer.writeUint16(details?.existence_time ?? 0);
  writer.writeUint8(details?.existence_time_present ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes92_119 ?? new Array(28).fill(0)));
  writer.writeUint8(details?.palette_type ?? 0);
  writer.writeUint16(details?.palette_data_number ?? 0);
  writer.writeUint8(details?.faction_specification_method ?? 0);
  writer.writeUint8(details?.set_acquired_score_to_0 ?? 0);
  writer.writeUint8(details?.direction_flip ?? 0);
  writer.writeUint8(details?.attack ?? 0);
  writer.writeUint8(details?.attack_flow ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes128_143 ?? new Array(16).fill(0)));
}

function parseDirectionChangeDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_42: Array.from(reader.readBytes(37)),
  };
}

function writeDirectionChangeDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes6_42 ?? new Array(37).fill(0)));
}

function parseStatusOperationDetails(reader) {
  return {
    bytes1_38: Array.from(reader.readBytes(38)),
    operation_target_type: reader.readUint8(),
    bytes40_43: Array.from(reader.readBytes(4)),
    operation_target_variable_type: reader.readUint8(),
    bytes45_46: Array.from(reader.readBytes(2)),
    operation_target_variable_number: reader.readUint16(),
    bytes49_52: Array.from(reader.readBytes(4)),
    operation_target_target: reader.readUint8(),
    bytes54_56: Array.from(reader.readBytes(3)),
    operation_target_status: reader.readUint8(),
    byte58: reader.readChar(),
    operation_target_flow_variable_number: reader.readUint8(),
    bytes60_62: Array.from(reader.readBytes(3)),
    operator_type: reader.readUint8(),
    bytes64_66: Array.from(reader.readBytes(3)),
    calculation_content_type: reader.readUint32(),
    calculation_content_constant: reader.readUint32(),
    calculation_content_random_lower_limit: reader.readUint32(),
    calculation_content_random_upper_limit: reader.readUint32(),
    calculation_content_variable_type: reader.readUint32(),
    calculation_content_variable_number: reader.readUint32(),
    calculation_content_target: reader.readUint32(),
    calculation_content_status: reader.readUint32(),
    calculation_content_flow_variable_number: reader.readUint32(),
    bytes103_138: Array.from(reader.readBytes(36)),
  };
}

function writeStatusOperationDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_38 ?? new Array(38).fill(0)));
  writer.writeUint8(details?.operation_target_type ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes40_43 ?? new Array(4).fill(0)));
  writer.writeUint8(details?.operation_target_variable_type ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes45_46 ?? new Array(2).fill(0)));
  writer.writeUint16(details?.operation_target_variable_number ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes49_52 ?? new Array(4).fill(0)));
  writer.writeUint8(details?.operation_target_target ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes54_56 ?? new Array(3).fill(0)));
  writer.writeUint8(details?.operation_target_status ?? 0);
  writer.writeInt8(details?.byte58 ?? 0);
  writer.writeUint8(details?.operation_target_flow_variable_number ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes60_62 ?? new Array(3).fill(0)));
  writer.writeUint8(details?.operator_type ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes64_66 ?? new Array(3).fill(0)));
  writer.writeUint32(details?.calculation_content_type ?? 0);
  writer.writeUint32(details?.calculation_content_constant ?? 0);
  writer.writeUint32(details?.calculation_content_random_lower_limit ?? 0);
  writer.writeUint32(details?.calculation_content_random_upper_limit ?? 0);
  writer.writeUint32(details?.calculation_content_variable_type ?? 0);
  writer.writeUint32(details?.calculation_content_variable_number ?? 0);
  writer.writeUint32(details?.calculation_content_target ?? 0);
  writer.writeUint32(details?.calculation_content_status ?? 0);
  writer.writeUint32(details?.calculation_content_flow_variable_number ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes103_138 ?? new Array(36).fill(0)));
}

function parseStatusOperation2Details(reader) {
  return {
    bytes1_38: Array.from(reader.readBytes(38)),
    target: reader.readUint32(),
    status: reader.readUint32(),
    on: reader.readUint32(),
    bytes51_62: Array.from(reader.readBytes(12)),
  };
}

function writeStatusOperation2Details(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_38 ?? new Array(38).fill(0)));
  writer.writeUint32(details?.target ?? 0);
  writer.writeUint32(details?.status ?? 0);
  writer.writeUint32(details?.on ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes51_62 ?? new Array(12).fill(0)));
}

function parseDisappearanceDetails(reader) {
  return {
    bytes1_38: Array.from(reader.readBytes(38)),
    target: reader.readUint32(),
    faction: reader.readUint32(),
    range: reader.readUint32(),
    assign_return_value_to_flow_variable: reader.readUint32(),
  };
}

function writeDisappearanceDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_38 ?? new Array(38).fill(0)));
  writer.writeUint32(details?.target ?? 0);
  writer.writeUint32(details?.faction ?? 0);
  writer.writeUint32(details?.range ?? 0);
  writer.writeUint32(details?.assign_return_value_to_flow_variable ?? 0);
}

function parseFlowOperationDetails(reader) {
  const details = {
    bytes1_34: Array.from(reader.readBytes(34)),
    condition_present: reader.readUint8(),
    judgment_type: reader.readUint8(),
    bytes37_40: Array.from(reader.readBytes(4)),
  };

  const condition_count = reader.readUint32();
  validateArraySize(condition_count, 'FlowOperationDetails.conditions');
  details.condition_count = condition_count;
  details.conditions = [];
  
  for (let i = 0; i < condition_count; i++) {
    details.conditions.push(parseBasicCondition(reader));
  }

  details.bytes45_52 = Array.from(reader.readBytes(8));
  details.operation = reader.readUint32();
  details.target_flow = reader.readUint32();
  details.id = reader.readUint32();
  details.target_character = reader.readUint32();
  details.assign_return_value_to_flow_variable = reader.readUint32();

  return details;
}

function writeFlowOperationDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_34 ?? new Array(34).fill(0)));
  writer.writeUint8(details?.condition_present ?? 0);
  writer.writeUint8(details?.judgment_type ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes37_40 ?? new Array(4).fill(0)));
  
  const conditions = details?.conditions ?? [];
  writer.writeUint32(conditions.length);
  for (const condition of conditions) {
    writeBasicCondition(writer, condition);
  }
  
  writer.writeBytes(new Uint8Array(details?.bytes45_52 ?? new Array(8).fill(0)));
  writer.writeUint32(details?.operation ?? 0);
  writer.writeUint32(details?.target_flow ?? 0);
  writer.writeUint32(details?.id ?? 0);
  writer.writeUint32(details?.target_character ?? 0);
  writer.writeUint32(details?.assign_return_value_to_flow_variable ?? 0);
}

function parseStageClearDetails(reader) {
  return {
    bytes1_14: Array.from(reader.readBytes(14)),
    path: readStdString(reader),
    bytes19_38: Array.from(reader.readBytes(20)),
    stage_transition: reader.readUint32(),
    number: reader.readUint32(),
    change_world_map_position: reader.readUint32(),
    world_map_position_x: reader.readUint32(),
    world_map_position_y: reader.readUint32(),
    change_initial_position: reader.readUint32(),
    initial_position_x: reader.readUint32(),
    initial_position_y: reader.readUint32(),
    initial_position_main_character_direction: reader.readUint32(),
    execute_autosave: reader.readUint32(),
    add_clear_text_to_replay: reader.readUint32(),
  };
}

function writeStageClearDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_14 ?? new Array(14).fill(0)));
  writeStdString(writer, details?.path);
  writer.writeBytes(new Uint8Array(details?.bytes19_38 ?? new Array(20).fill(0)));
  writer.writeUint32(details?.stage_transition ?? 0);
  writer.writeUint32(details?.number ?? 0);
  writer.writeUint32(details?.change_world_map_position ?? 0);
  writer.writeUint32(details?.world_map_position_x ?? 0);
  writer.writeUint32(details?.world_map_position_y ?? 0);
  writer.writeUint32(details?.change_initial_position ?? 0);
  writer.writeUint32(details?.initial_position_x ?? 0);
  writer.writeUint32(details?.initial_position_y ?? 0);
  writer.writeUint32(details?.initial_position_main_character_direction ?? 0);
  writer.writeUint32(details?.execute_autosave ?? 0);
  writer.writeUint32(details?.add_clear_text_to_replay ?? 0);
}

function parseGameWaitDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_38: Array.from(reader.readBytes(33)),
    game_wait_execution_time: reader.readUint32(),
  };
}

function writeGameWaitDetails(writer, details) {
  writer.writeUint16(details?.execution_time ?? 0);
  writer.writeUint16(details?.execution_time_double ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes6_38 ?? new Array(33).fill(0)));
  writer.writeUint32(details?.game_wait_execution_time ?? 0);
}

function parseMessageDetails(reader) {
  return {
    bytes1_14: Array.from(reader.readBytes(14)),
    message: readStdString(reader),
    bytes19_38: Array.from(reader.readBytes(20)),
    display_position_specification_method: reader.readUint32(),
    coordinate_x: reader.readUint32(),
    coordinate_y: reader.readUint32(),
    display_position_offset_x: reader.readUint32(),
    display_position_offset_y: reader.readUint32(),
    auto_adjust_to_not_go_off_screen: reader.readUint32(),
    display_time_specification_method: reader.readUint32(),
    display_time: reader.readUint32(),
    pause: reader.readUint32(),
    display_variables: reader.readUint32(),
    follow_screen: reader.readUint32(),
    auto_update: reader.readUint32(),
    message_id_present: reader.readUint32(),
    message_id: reader.readUint32(),
    window_display: reader.readUint32(),
    message_clear: reader.readUint32(),
    update_interval: reader.readUint32(),
    instant_display: reader.readUint32(),
    coordinate_unit: reader.readUint32(),
    set_options: reader.readUint32(),
    assign_return_value_to_flow_variable: reader.readUint32(),
  };
}

function writeMessageDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_14 ?? new Array(14).fill(0)));
  writeStdString(writer, details?.message);
  writer.writeBytes(new Uint8Array(details?.bytes19_38 ?? new Array(20).fill(0)));
  writer.writeUint32(details?.display_position_specification_method ?? 0);
  writer.writeUint32(details?.coordinate_x ?? 0);
  writer.writeUint32(details?.coordinate_y ?? 0);
  writer.writeUint32(details?.display_position_offset_x ?? 0);
  writer.writeUint32(details?.display_position_offset_y ?? 0);
  writer.writeUint32(details?.auto_adjust_to_not_go_off_screen ?? 0);
  writer.writeUint32(details?.display_time_specification_method ?? 0);
  writer.writeUint32(details?.display_time ?? 0);
  writer.writeUint32(details?.pause ?? 0);
  writer.writeUint32(details?.display_variables ?? 0);
  writer.writeUint32(details?.follow_screen ?? 0);
  writer.writeUint32(details?.auto_update ?? 0);
  writer.writeUint32(details?.message_id_present ?? 0);
  writer.writeUint32(details?.message_id ?? 0);
  writer.writeUint32(details?.window_display ?? 0);
  writer.writeUint32(details?.message_clear ?? 0);
  writer.writeUint32(details?.update_interval ?? 0);
  writer.writeUint32(details?.instant_display ?? 0);
  writer.writeUint32(details?.coordinate_unit ?? 0);
  writer.writeUint32(details?.set_options ?? 0);
  writer.writeUint32(details?.assign_return_value_to_flow_variable ?? 0);
}

function parseWarpDetails(reader) {
  return {
    bytes1_26: Array.from(reader.readBytes(26)),
    setting_type: reader.readUint8(),
    direction: reader.readUint8(),
    bytes29_33: Array.from(reader.readBytes(5)),
    target_x_present: reader.readUint8(),
    target_y_present: reader.readUint8(),
    target_x_bl: reader.readUint16(),
    target_y_bl: reader.readUint16(),
    target_x_dot: reader.readUint16(),
    target_y_dot: reader.readUint16(),
    target_type: reader.readUint8(),
    target_unit: reader.readUint8(),
    gigantic_character_coordinate_position: reader.readUint8(),
    bytes47_49: Array.from(reader.readBytes(3)),
    target_x_flip_if_facing_right: reader.readUint8(),
    target_y_flip_if_facing_right: reader.readUint8(),
    bytes52_59: Array.from(reader.readBytes(8)),
    distance: reader.readUint16(),
    distance_double: reader.readUint16(),
    bytes64_101: Array.from(reader.readBytes(38)),
    assign_return_value_to_flow: reader.readUint32(),
  };
}

function writeWarpDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_26 ?? new Array(26).fill(0)));
  writer.writeUint8(details?.setting_type ?? 0);
  writer.writeUint8(details?.direction ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes29_33 ?? new Array(5).fill(0)));
  writer.writeUint8(details?.target_x_present ?? 0);
  writer.writeUint8(details?.target_y_present ?? 0);
  writer.writeUint16(details?.target_x_bl ?? 0);
  writer.writeUint16(details?.target_y_bl ?? 0);
  writer.writeUint16(details?.target_x_dot ?? 0);
  writer.writeUint16(details?.target_y_dot ?? 0);
  writer.writeUint8(details?.target_type ?? 0);
  writer.writeUint8(details?.target_unit ?? 0);
  writer.writeUint8(details?.gigantic_character_coordinate_position ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes47_49 ?? new Array(3).fill(0)));
  writer.writeUint8(details?.target_x_flip_if_facing_right ?? 0);
  writer.writeUint8(details?.target_y_flip_if_facing_right ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes52_59 ?? new Array(8).fill(0)));
  writer.writeUint16(details?.distance ?? 0);
  writer.writeUint16(details?.distance_double ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes64_101 ?? new Array(38).fill(0)));
  writer.writeUint32(details?.assign_return_value_to_flow ?? 0);
}

function parseTargetSettingDetails(reader) {
  return {
    bytes1_38: Array.from(reader.readBytes(38)),
    bytes39_106: Array.from(reader.readBytes(68)),
  };
}

function writeTargetSettingDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_38 ?? new Array(38).fill(0)));
  writer.writeBytes(new Uint8Array(details?.bytes39_106 ?? new Array(68).fill(0)));
}

function parseItemAcquisitionDetails(reader) {
  return {
    bytes1_38: Array.from(reader.readBytes(38)),
    palette_type: reader.readUint32(),
    palette_data_number: reader.readUint32(),
  };
}

function writeItemAcquisitionDetails(writer, details) {
  writer.writeBytes(new Uint8Array(details?.bytes1_38 ?? new Array(38).fill(0)));
  writer.writeUint32(details?.palette_type ?? 0);
  writer.writeUint32(details?.palette_data_number ?? 0);
}

function parseGraphicChangeDetails(reader) {
  return {
    bytes1_38: Array.from(reader.readBytes(38)),
    image_type: reader.readUint32(),
    image_number: reader.readUint32(),
    offset: reader.readUint32(),
  };
}

function writeGraphicChangeDetails(writer, details) {writeUint16(details?.faction ?? 0);
  writer.writeUint16(details?.gigantic ?? 0);
  writer.writeUint8(details?.movement_type ?? 0);
  writer.writeUint16(details?.movement_type_parameter1 ?? 0);
  writer.writeUint16(details?.movement_type_parameter2 ?? 0);
  writer.writeUint16(details?.movement_type_parameter3 ?? 0);
  writer.writeUint8(details?.movement_target ?? 0);
  writer.writeUint8(details?.synchronize_with_auto_scroll ?? 0);
  writer.writeUint16(details?.speed ?? 0);
  writer.writeUint16(details?.speed_double ?? 0);
  writer.writeUint8(details?.acceleration_enabled ?? 0);
  writer.writeUint16(details?.acceleration ?? 0);
  writer.writeUint16(details?.acceleration_double ?? 0);
  writer.writeUint16(details?.flight_distance ?? 0);
  writer.writeUint8(details?.flight_distance_valid ?? 0);
  writer.writeUint16(details?.flight_distance_double ?? 0);
  writer.writeUint8(details?.flight_distance_does_not_disappear_at_end ?? 0);
  writer.writeUint8(details?.disappearance_time_valid ?? 0);
  writer.writeUint16(details?.disappearance_time ?? 0);
  writer.writeUint16(details?.disappearance_time_double ?? 0);
  writer.writeUint8(details?.penetrate_blocks ?? 0);
  writer.writeUint8(details?.penetrate_characters ?? 0);
  writer.writeUint8(details?.penetrate_block_characters ?? 0);
  writer.writeUint8(details?.disappear_on_hitting_shot ?? 0);
  writer.writeUint8(details?.value_for_disappearing_on_hitting_shot ?? 0);
  writer.writeUint32(details?.power ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes109_110 ?? new Array(2).fill(0)));
  writer.writeUint8(details?.impact ?? 0);
  writer.writeUint16(details?.effect ?? 0);
  writer.writeUint8(details?.acquired_item_palette_type ?? 0);
  writer.writeUint16(details?.acquired_item_palette_number ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes117_125 ?? new Array(9).fill(0)));
  writer.writeUint8(details?.attack ?? 0);
  writer.writeUint8(details?.attack_id ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes128_143 ?? new Array(16).fill(0)));
}

function parseSwordDetails(reader) {
  return {
    execution_time: reader.readUint32(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_if_outside_screen: reader.readUint8(),
    animation: reader.readUint16(),
    bytes11_63: Array.from(reader.readBytes(53)),
    z_coordinate: reader.readUint8(),
    transparency: reader.readUint8(),
    faction_same_as_user: reader.readUint8(),
    faction: reader.readUint16(),
    gigantic: reader.readUint16(),
    sword_type: reader.readUint32(),
    bytes75_104: Array.from(reader.readBytes(30)),
    power: reader.readUint32(),
    bytes109_110: Array.from(reader.readBytes(2)),
    impact: reader.readUint8(),
    effect: reader.readUint16(),
    acquired_item_palette_type: reader.readUint8(),
    acquired_item_palette_number: reader.readUint16(),
    bytes117_125: Array.from(reader.readBytes(9)),
    attack: reader.readUint8(),
    attack_id: reader.readUint8(),
    bytes128_143: Array.from(reader.readBytes(16)),
  };
}

function writeSwordDetails(writer, details) {
  writer.writeUint32(details?.execution_time ?? 0);
  writer.writeUint8(details?.parallel_execution ?? 0);
  writer.writeUint16(details?.sound_effect ?? 0);
  writer.writeUint8(details?.play_if_outside_screen ?? 0);
  writer.writeUint16(details?.animation ?? 0);
  writer.writeBytes(new Uint8Array(details?.bytes11_63 ?? new Array(53).fill(0)));
  writer.writeUint8(details?.z_coordinate ?? 0);
  writer.writeUint8(details?.transparency ?? 0);
  writer.writeUint8(details?.faction_same_as_user ?? 0);
  writer.