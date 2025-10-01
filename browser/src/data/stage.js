import DataReader from './DataReader.js';
import DataWriter from './DataWriter.js';

// TODO: most of this file is based off an older pattern file and should be recreated.
const CONFIG = {
  /**
   * The maximum number of items allowed in any array read from the file.
   * This is a security measure to prevent errors from malformed files
   * that could lead to excessive memory allocation.
   * @type {number}
   */
  MAX_ARRAY_SIZE: 14096
};
function ensureReader(source) {
  if (source instanceof DataReader) {
    return source;
  }
  return new DataReader(source);
}
async function readArray(reader, parser) {
  const count = await reader.readUint32();
  if (count > CONFIG.MAX_ARRAY_SIZE) {
    throw new Error(
      `Array size ${count} exceeds maximum of ${CONFIG.MAX_ARRAY_SIZE} at offset ${reader.offset - 4}`
    );
  }
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(await parser(reader));
  }
  return arr;
}
function writeArray(writer, arr, serializer) {
  const items = arr || [];
  writer.writeUint32(items.length);
  for (const item of items) {
    serializer(writer, item);
  }
}
const parseStdString = (reader) => reader.readStdString();
const writeStdString = (writer, value) => writer.writeLengthPrefixedString(value);

async function parseDeathFade(reader) {
  return {
    list_size: await reader.readUint32(),
    auto_disappear_left: await reader.readUint32(),
    auto_disappear_right: await reader.readUint32(),
    auto_disappear_top: await reader.readUint32(),
    auto_disappear_bottom: await reader.readUint32(),
    disappear_left_range: await reader.readUint32(),
    disappear_right_range: await reader.readUint32(),
    disappear_top_range: await reader.readUint32(),
    disappear_bottom_range: await reader.readUint32(),
    block_end: await reader.readUint32()
  };
}
function writeDeathFade(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.list_size) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.auto_disappear_left) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.auto_disappear_right) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.auto_disappear_top) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.auto_disappear_bottom) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.disappear_left_range) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.disappear_right_range) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.disappear_top_range) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.disappear_bottom_range) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.block_end) ?? 0);
}
async function parsePlayerCollision(reader) {
  return {
    walking_block_width: await reader.readUint32(),
    walking_block_height: await reader.readUint32(),
    flying_block_width: await reader.readUint32(),
    flying_block_height: await reader.readUint32(),
    walking_character_width: await reader.readUint32(),
    walking_character_height: await reader.readUint32(),
    flying_character_width: await reader.readUint32(),
    flying_character_height: await reader.readUint32(),
    shot_width: await reader.readUint32(),
    shot_height: await reader.readUint32(),
    item_width: await reader.readUint32(),
    item_height: await reader.readUint32(),
    walking_block_position: await reader.readUint32(),
    flying_block_position: await reader.readUint32(),
    walking_character_position: await reader.readUint32(),
    flying_character_position: await reader.readUint32(),
    block_display: await reader.readUint32(),
    character_display: await reader.readUint32(),
    shot_display: await reader.readUint32(),
    item_display: await reader.readUint32(),
    block_display_color: await reader.readUint32(),
    character_display_color: await reader.readUint32(),
    shot_display_color: await reader.readUint32(),
    item_display_color: await reader.readUint32()
  };
}
function writePlayerCollision(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.walking_block_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_block_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_block_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_block_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_character_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_character_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_character_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_character_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.shot_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.shot_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.item_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.item_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_block_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_block_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_character_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_character_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.block_display) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.character_display) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.shot_display) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.item_display) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.block_display_color) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.character_display_color) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.shot_display_color) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.item_display_color) ?? 0);
}
async function parseEnemyCollision(reader) {
  return {
    walking_block_width: await reader.readUint32(),
    walking_block_height: await reader.readUint32(),
    flying_block_width: await reader.readUint32(),
    flying_block_height: await reader.readUint32(),
    walking_character_width: await reader.readUint32(),
    walking_character_height: await reader.readUint32(),
    flying_character_width: await reader.readUint32(),
    flying_character_height: await reader.readUint32(),
    shot_width: await reader.readUint32(),
    shot_height: await reader.readUint32(),
    walking_block_position: await reader.readUint32(),
    flying_block_position: await reader.readUint32(),
    walking_character_position: await reader.readUint32(),
    flying_character_position: await reader.readUint32()
  };
}
function writeEnemyCollision(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.walking_block_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_block_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_block_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_block_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_character_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_character_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_character_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_character_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.shot_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.shot_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_block_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_block_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.walking_character_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.flying_character_position) ?? 0);
}
async function parseActorHitbox(reader) {
  return {
    shot_width: await reader.readUint32(),
    shot_height: await reader.readUint32(),
    character_width: await reader.readUint32(),
    character_height: await reader.readUint32()
  };
}
function writeActorHitbox(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.shot_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.shot_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.character_width) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.character_height) ?? 0);
}
async function parseBasicCondition(reader) {
  return {
    header: await reader.readUint32(),
    type: await reader.readUint8(),
    right_side_constant: await reader.readUint32(),
    right_side_random_lower_limit: await reader.readUint32(),
    right_side_random_upper_limit: await reader.readUint32(),
    left_side_status_target: await reader.readUint8(),
    left_side_status_number: await reader.readUint8(),
    left_side_type: await reader.readUint8(),
    left_side_common_variable_or_stage_variable: await reader.readUint8(),
    left_side_variable_number: await reader.readUint16(),
    left_side_flow_variable_number: await reader.readUint8(),
    right_side_type: await reader.readUint8(),
    right_side_status_target: await reader.readUint8(),
    right_side_status_number: await reader.readUint8(),
    right_side_common_variable_or_stage_variable: await reader.readUint8(),
    right_side_variable_number: await reader.readUint16(),
    right_side_flow_variable_number: await reader.readUint8(),
    how_to_compare: await reader.readUint8(),
    specify_in_percent: await reader.readUint8(),
    left_side_coordinate_type: await reader.readUint8(),
    right_side_coordinate_type: await reader.readUint8(),
    left_side_gigantic_character_coordinate_position: await reader.readUint8(),
    right_side_gigantic_character_coordinate_position: await reader.readUint8(),
    unk1: await reader.readUint8(),
    unk2: await reader.readUint8(),
    unk3: await reader.readUint8(),
    unk4: await reader.readUint8(),
    unk5: await reader.readUint8()
  };
}
function writeBasicCondition(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.header) ?? 17);
  writer.writeUint8((data == null ? void 0 : data.type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.right_side_constant) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.right_side_random_lower_limit) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.right_side_random_upper_limit) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.left_side_status_target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.left_side_status_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.left_side_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.left_side_common_variable_or_stage_variable) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.left_side_variable_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.left_side_flow_variable_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.right_side_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.right_side_status_target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.right_side_status_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.right_side_common_variable_or_stage_variable) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.right_side_variable_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.right_side_flow_variable_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.how_to_compare) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.specify_in_percent) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.left_side_coordinate_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.right_side_coordinate_type) ?? 0);
  writer.writeUint8(
    (data == null ? void 0 : data.left_side_gigantic_character_coordinate_position) ?? 0
  );
  writer.writeUint8(
    (data == null ? void 0 : data.right_side_gigantic_character_coordinate_position) ?? 0
  );
  writer.writeUint8((data == null ? void 0 : data.unk1) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.unk2) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.unk3) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.unk4) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.unk5) ?? 0);
}
async function parseKeyCondition(reader) {
  return {
    header: await reader.readUint32(),
    right_and_left_to_front_and_back: await reader.readUint8(),
    minimum_input_time: await reader.readUint16(),
    maximum_input_time: await reader.readUint16(),
    input_time_1_to_infinity: await reader.readUint8(),
    judgment_type: await reader.readUint8(),
    unknown: await reader.readUint32(),
    number_of_key_data: await reader.readUint32(),
    direction_key_neutral: await reader.readUint8(),
    left_key: await reader.readUint8(),
    right_key: await reader.readUint8(),
    up_key: await reader.readUint8(),
    down_key: await reader.readUint8(),
    up_left_key: await reader.readUint8(),
    down_left_key: await reader.readUint8(),
    up_right_key: await reader.readUint8(),
    down_right_key: await reader.readUint8(),
    any_direction_key: await reader.readUint8(),
    action_key_neutral: await reader.readUint8(),
    z_key: await reader.readUint8(),
    x_key: await reader.readUint8(),
    c_key: await reader.readUint8(),
    v_key: await reader.readUint8(),
    a_key: await reader.readUint8(),
    s_key: await reader.readUint8(),
    d_key: await reader.readUint8(),
    f_key: await reader.readUint8()
  };
}
function writeKeyCondition(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.header) ?? 5);
  writer.writeUint8((data == null ? void 0 : data.right_and_left_to_front_and_back) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.minimum_input_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.maximum_input_time) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.input_time_1_to_infinity) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.judgment_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.unknown) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.number_of_key_data) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction_key_neutral) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.left_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.right_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.up_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.down_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.up_left_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.down_left_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.up_right_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.down_right_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.any_direction_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.action_key_neutral) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.z_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.x_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.c_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.v_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.a_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.s_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.d_key) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.f_key) ?? 0);
}
async function parseBackground(reader) {
  return {
    start: await reader.readUint32(),
    display_from_start: await reader.readUint32(),
    specified_by_color: await reader.readUint32(),
    color_number: await reader.readUint32(),
    display_in_front_of_character: await reader.readUint32(),
    horizontal_scroll_speed: await reader.readFloat64(),
    vertical_scroll_speed: await reader.readFloat64(),
    horizontal_auto_scroll: await reader.readUint32(),
    vertical_auto_scroll: await reader.readUint32(),
    horizontal_auto_scroll_speed: await reader.readFloat64(),
    vertical_auto_scroll_speed: await reader.readFloat64(),
    bytes61_80: await reader.readBytes(20),
    image_path: await parseStdString(reader)
  };
}
function writeBackground(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.start) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.display_from_start) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.specified_by_color) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.color_number) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.display_in_front_of_character) ?? 0);
  writer.writeFloat64((data == null ? void 0 : data.horizontal_scroll_speed) ?? 0);
  writer.writeFloat64((data == null ? void 0 : data.vertical_scroll_speed) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.horizontal_auto_scroll) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.vertical_auto_scroll) ?? 0);
  writer.writeFloat64((data == null ? void 0 : data.horizontal_auto_scroll_speed) ?? 0);
  writer.writeFloat64((data == null ? void 0 : data.vertical_auto_scroll_speed) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes61_80) ?? new Uint8Array(20));
  writeStdString(writer, data == null ? void 0 : data.image_path);
}
async function parseWaitDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes: await reader.readBytes(33)
  };
}
function writeWaitDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes) ?? new Uint8Array(33));
}
async function parseLinearMovementDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes6_8: await reader.readBytes(3),
    animation_and_other_type: await reader.readUint16(),
    bytes11_26: await reader.readBytes(16),
    movement_direction_setting_type: await reader.readUint8(),
    movement_direction_direction: await reader.readUint8(),
    movement_direction_angle: await reader.readUint16(),
    movement_direction_angle_double: await reader.readUint16(),
    movement_direction_angle_reverse_rotation_if_facing_right: await reader.readUint8(),
    movement_direction_target_x_present: await reader.readUint8(),
    movement_direction_target_y_present: await reader.readUint8(),
    movement_direction_target_x: await reader.readUint16(),
    movement_direction_target_y: await reader.readUint16(),
    movement_direction_target_x_dot: await reader.readUint16(),
    movement_direction_target_y_dot: await reader.readUint16(),
    movement_direction_target_type: await reader.readUint8(),
    movement_direction_target_coordinate_unit: await reader.readUint8(),
    byte46: await reader.readBytes(1),
    movement_direction_execute_until_target_coordinate_reached: await reader.readUint8(),
    movement_direction_invalidate_horizontal_movement: await reader.readUint8(),
    movement_direction_invalidate_vertical_movement: await reader.readUint8(),
    movement_direction_target_x_flip_if_facing_right: await reader.readUint8(),
    movement_direction_target_y_flip_if_facing_right: await reader.readUint8(),
    movement_direction_reverse_speed_if_direction_changes: await reader.readUint8(),
    movement_direction_prevent_blur: await reader.readUint8(),
    movement_direction_dont_change_character_direction: await reader.readUint8(),
    time_speed_distance_setting_type: await reader.readUint8(),
    time_speed_distance_speed: await reader.readUint16(),
    time_speed_distance_speed_double: await reader.readUint16(),
    time_speed_distance_distance: await reader.readUint16(),
    time_speed_distance_distance_double: await reader.readUint16(),
    time_speed_distance_distance_unit: await reader.readUint8(),
    bytes65_68: await reader.readBytes(4),
    inertia_present: await reader.readUint8(),
    inertia_max_speed: await reader.readUint16(),
    inertia_speed_correction_on_direction_change: await reader.readFloat64(),
    animation_type: await reader.readUint8(),
    bytes81_101: await reader.readBytes(21)
  };
}
function writeLinearMovementDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes6_8) ?? new Uint8Array(3));
  writer.writeUint16((data == null ? void 0 : data.animation_and_other_type) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes11_26) ?? new Uint8Array(16));
  writer.writeUint8((data == null ? void 0 : data.movement_direction_setting_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.movement_direction_direction) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_direction_angle) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_direction_angle_double) ?? 0);
  writer.writeUint8(
    (data == null ? void 0 : data.movement_direction_angle_reverse_rotation_if_facing_right) ?? 0
  );
  writer.writeUint8((data == null ? void 0 : data.movement_direction_target_x_present) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.movement_direction_target_y_present) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_direction_target_x) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_direction_target_y) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_direction_target_x_dot) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_direction_target_y_dot) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.movement_direction_target_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.movement_direction_target_coordinate_unit) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.byte46) ?? new Uint8Array(1));
  writer.writeUint8(
    (data == null ? void 0 : data.movement_direction_execute_until_target_coordinate_reached) ?? 0
  );
  writer.writeUint8(
    (data == null ? void 0 : data.movement_direction_invalidate_horizontal_movement) ?? 0
  );
  writer.writeUint8((data == null ? void 0 : data.movement_direction_invalidate_vertical_movement) ?? 0);
  writer.writeUint8(
    (data == null ? void 0 : data.movement_direction_target_x_flip_if_facing_right) ?? 0
  );
  writer.writeUint8(
    (data == null ? void 0 : data.movement_direction_target_y_flip_if_facing_right) ?? 0
  );
  writer.writeUint8(
    (data == null ? void 0 : data.movement_direction_reverse_speed_if_direction_changes) ?? 0
  );
  writer.writeUint8((data == null ? void 0 : data.movement_direction_prevent_blur) ?? 0);
  writer.writeUint8(
    (data == null ? void 0 : data.movement_direction_dont_change_character_direction) ?? 0
  );
  writer.writeUint8((data == null ? void 0 : data.time_speed_distance_setting_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.time_speed_distance_speed) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.time_speed_distance_speed_double) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.time_speed_distance_distance) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.time_speed_distance_distance_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.time_speed_distance_distance_unit) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes65_68) ?? new Uint8Array(4));
  writer.writeUint8((data == null ? void 0 : data.inertia_present) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.inertia_max_speed) ?? 0);
  writer.writeFloat64((data == null ? void 0 : data.inertia_speed_correction_on_direction_change) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.animation_type) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes81_101) ?? new Uint8Array(21));
}
async function parseGenericMovementDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes6_101: await reader.readBytes(96)
  };
}
function writeGenericMovementDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes6_101) ?? new Uint8Array(96));
}
const parseGroundMovementDetails = parseGenericMovementDetails;
const writeGroundMovementDetails = writeGenericMovementDetails;
const parseCircularMovementDetails = parseGenericMovementDetails;
const writeCircularMovementDetails = writeGenericMovementDetails;
const parseChargeMovementDetails = parseGenericMovementDetails;
const writeChargeMovementDetails = writeGenericMovementDetails;
const parseGuidedMovementDetails = parseGenericMovementDetails;
const writeGuidedMovementDetails = writeGenericMovementDetails;
const parseScreenOutsideAvoidanceMovementDetails = parseGenericMovementDetails;
const writeScreenOutsideAvoidanceMovementDetails = writeGenericMovementDetails;
const parseMovementInvalidationDetails = parseGenericMovementDetails;
const writeMovementInvalidationDetails = writeGenericMovementDetails;
async function parseDirectionChangeDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes6_42: await reader.readBytes(37)
  };
}
function writeDirectionChangeDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes6_42) ?? new Uint8Array(37));
}
async function parseJumpDetails(reader) {
  return {
    bytes1_5: await reader.readBytes(5),
    sound_effect: await reader.readUint16(),
    play_if_outside_screen: await reader.readUint8(),
    animation: await reader.readUint16(),
    bytes11_38: await reader.readBytes(28),
    jump_type: await reader.readUint32(),
    max_jump_inertial_movement_speed: await reader.readUint32(),
    max_jump_height: await reader.readUint32(),
    min_jump_inertial_movement_speed: await reader.readUint32(),
    min_jump_height: await reader.readUint32()
  };
}
function writeJumpDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_5) ?? new Uint8Array(5));
  writer.writeUint16((data == null ? void 0 : data.sound_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.play_if_outside_screen) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.animation) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes11_38) ?? new Uint8Array(28));
  writer.writeUint32((data == null ? void 0 : data.jump_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.max_jump_inertial_movement_speed) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.max_jump_height) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.min_jump_inertial_movement_speed) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.min_jump_height) ?? 0);
}
async function parseShotDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    sound_effect: await reader.readUint16(),
    play_if_outside_screen: await reader.readUint8(),
    animation: await reader.readUint16(),
    bytes11_30: await reader.readBytes(20),
    number_of_shots_fired: await reader.readUint8(),
    formation: await reader.readUint8(),
    firing_parameter1: await reader.readUint16(),
    firing_parameter2: await reader.readUint16(),
    firing_parameter3: await reader.readUint16(),
    target: await reader.readUint8(),
    direction: await reader.readUint8(),
    set_angle_to_target: await reader.readUint8(),
    firing_target: await reader.readUint8(),
    angle_offset: await reader.readUint16(),
    angle_offset_double: await reader.readUint16(),
    angle_offset_reverse_rotation_if_facing_right: await reader.readUint8(),
    angle_dispersion: await reader.readUint16(),
    change_firing_position_according_to_angle: await reader.readUint8(),
    number_of_doubles: await reader.readUint8(),
    firing_position_offset_x: await reader.readUint16(),
    firing_position_offset_x_double: await reader.readUint16(),
    firing_position_offset_y: await reader.readUint16(),
    firing_position_offset_y_double: await reader.readUint16(),
    firing_position_offset_x_flip_if_facing_right: await reader.readUint8(),
    firing_position_offset_y_flip_if_facing_right: await reader.readUint8(),
    graphic: await reader.readUint16(),
    z_coordinate: await reader.readUint8(),
    transparency: await reader.readUint8(),
    faction_same_as_user: await reader.readUint8(),
    faction: await reader.readUint16(),
    gigantic: await reader.readUint16(),
    movement_type: await reader.readUint8(),
    movement_type_parameter1: await reader.readUint16(),
    movement_type_parameter2: await reader.readUint16(),
    movement_type_parameter3: await reader.readUint16(),
    movement_target: await reader.readUint8(),
    synchronize_with_auto_scroll: await reader.readUint8(),
    speed: await reader.readUint16(),
    speed_double: await reader.readUint16(),
    acceleration_enabled: await reader.readUint8(),
    acceleration: await reader.readUint16(),
    acceleration_double: await reader.readUint16(),
    flight_distance: await reader.readUint16(),
    flight_distance_valid: await reader.readUint8(),
    flight_distance_double: await reader.readUint16(),
    flight_distance_does_not_disappear_at_end: await reader.readUint8(),
    disappearance_time_valid: await reader.readUint8(),
    disappearance_time: await reader.readUint16(),
    disappearance_time_double: await reader.readUint16(),
    penetrate_blocks: await reader.readUint8(),
    penetrate_actors: await reader.readUint8(),
    penetrate_block_actors: await reader.readUint8(),
    disappear_on_hitting_shot: await reader.readUint8(),
    value_for_disappearing_on_hitting_shot: await reader.readUint8(),
    power: await reader.readUint32(),
    bytes109_110: await reader.readBytes(2),
    impact: await reader.readUint8(),
    effect: await reader.readUint16(),
    acquired_item_palette_type: await reader.readUint8(),
    acquired_item_palette_number: await reader.readUint16(),
    bytes117_125: await reader.readBytes(9),
    attack: await reader.readUint8(),
    attack_id: await reader.readUint8(),
    bytes128_143: await reader.readBytes(16)
  };
}
function writeShotDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.sound_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.play_if_outside_screen) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.animation) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes11_30) ?? new Uint8Array(20));
  writer.writeUint8((data == null ? void 0 : data.number_of_shots_fired) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.formation) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.firing_parameter1) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.firing_parameter2) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.firing_parameter3) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.set_angle_to_target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.firing_target) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.angle_offset) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.angle_offset_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.angle_offset_reverse_rotation_if_facing_right) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.angle_dispersion) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.change_firing_position_according_to_angle) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.number_of_doubles) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.firing_position_offset_x) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.firing_position_offset_x_double) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.firing_position_offset_y) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.firing_position_offset_y_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.firing_position_offset_x_flip_if_facing_right) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.firing_position_offset_y_flip_if_facing_right) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.graphic) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.z_coordinate) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.transparency) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.faction_same_as_user) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.faction) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.gigantic) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.movement_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_type_parameter1) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_type_parameter2) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.movement_type_parameter3) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.movement_target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.synchronize_with_auto_scroll) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.speed) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.speed_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.acceleration_enabled) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.acceleration) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.acceleration_double) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.flight_distance) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.flight_distance_valid) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.flight_distance_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.flight_distance_does_not_disappear_at_end) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.disappearance_time_valid) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.disappearance_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.disappearance_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.penetrate_blocks) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.penetrate_actors) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.penetrate_block_actors) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.disappear_on_hitting_shot) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.value_for_disappearing_on_hitting_shot) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.power) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes109_110) ?? new Uint8Array(2));
  writer.writeUint8((data == null ? void 0 : data.impact) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.acquired_item_palette_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.acquired_item_palette_number) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes117_125) ?? new Uint8Array(9));
  writer.writeUint8((data == null ? void 0 : data.attack) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack_id) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes128_143) ?? new Uint8Array(16));
}
async function parseSwordDetails(reader) {
  return {
    execution_time: await reader.readUint32(),
    parallel_execution: await reader.readUint8(),
    sound_effect: await reader.readUint16(),
    play_if_outside_screen: await reader.readUint8(),
    animation: await reader.readUint16(),
    bytes11_63: await reader.readBytes(53),
    z_coordinate: await reader.readUint8(),
    transparency: await reader.readUint8(),
    faction_same_as_user: await reader.readUint8(),
    faction: await reader.readUint16(),
    gigantic: await reader.readUint16(),
    sword_type: await reader.readUint32(),
    bytes75_104: await reader.readBytes(30),
    power: await reader.readUint32(),
    bytes109_110: await reader.readBytes(2),
    impact: await reader.readUint8(),
    effect: await reader.readUint16(),
    acquired_item_palette_type: await reader.readUint8(),
    acquired_item_palette_number: await reader.readUint16(),
    bytes117_125: await reader.readBytes(9),
    attack: await reader.readUint8(),
    attack_id: await reader.readUint8(),
    bytes128_143: await reader.readBytes(16)
  };
}
function writeSwordDetails(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.sound_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.play_if_outside_screen) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.animation) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes11_63) ?? new Uint8Array(53));
  writer.writeUint8((data == null ? void 0 : data.z_coordinate) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.transparency) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.faction_same_as_user) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.faction) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.gigantic) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.sword_type) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes75_104) ?? new Uint8Array(30));
  writer.writeUint32((data == null ? void 0 : data.power) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes109_110) ?? new Uint8Array(2));
  writer.writeUint8((data == null ? void 0 : data.impact) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.acquired_item_palette_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.acquired_item_palette_number) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes117_125) ?? new Uint8Array(9));
  writer.writeUint8((data == null ? void 0 : data.attack) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack_id) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes128_143) ?? new Uint8Array(16));
}
async function parseBlockSummonDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    sound_effect: await reader.readUint16(),
    play_sound_effect_if_outside_screen: await reader.readUint8(),
    animation: await reader.readUint8(),
    bytes10_30: await reader.readBytes(21),
    count: await reader.readUint8(),
    formation: await reader.readUint8(),
    interval: await reader.readUint16(),
    number_of_columns: await reader.readUint16(),
    column_interval: await reader.readUint16(),
    target: await reader.readUint8(),
    direction: await reader.readUint8(),
    byte41: await reader.readBytes(1),
    target2: await reader.readUint8(),
    bytes43_51: await reader.readBytes(9),
    summon_position_offset_x: await reader.readUint32(),
    summon_position_offset_y: await reader.readUint32(),
    summon_position_offset_x_flip: await reader.readUint8(),
    summon_position_offset_y_flip: await reader.readUint8(),
    bytes62_66: await reader.readBytes(5),
    faction: await reader.readUint8(),
    bytes68_88: await reader.readBytes(21),
    existence_time: await reader.readUint16(),
    existence_time_present: await reader.readUint8(),
    bytes92_119: await reader.readBytes(28),
    palette_type: await reader.readUint8(),
    palette_data_number: await reader.readUint16(),
    faction_specification_method: await reader.readUint8(),
    set_acquired_score_to_0: await reader.readUint8(),
    direction_flip: await reader.readUint8(),
    attack: await reader.readUint8(),
    attack_flow: await reader.readUint8(),
    bytes128_143: await reader.readBytes(16),
    return_value_to_flow_variable: await reader.readUint8(),
    bytes145_147: await reader.readBytes(3)
  };
}
function writeBlockSummonDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.sound_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.play_sound_effect_if_outside_screen) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.animation) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes10_30) ?? new Uint8Array(21));
  writer.writeUint8((data == null ? void 0 : data.count) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.formation) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.interval) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.number_of_columns) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.column_interval) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.byte41) ?? new Uint8Array(1));
  writer.writeUint8((data == null ? void 0 : data.target2) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes43_51) ?? new Uint8Array(9));
  writer.writeUint32((data == null ? void 0 : data.summon_position_offset_x) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.summon_position_offset_y) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.summon_position_offset_x_flip) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.summon_position_offset_y_flip) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes62_66) ?? new Uint8Array(5));
  writer.writeUint8((data == null ? void 0 : data.faction) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes68_88) ?? new Uint8Array(21));
  writer.writeUint16((data == null ? void 0 : data.existence_time) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.existence_time_present) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes92_119) ?? new Uint8Array(28));
  writer.writeUint8((data == null ? void 0 : data.palette_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.palette_data_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.faction_specification_method) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.set_acquired_score_to_0) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction_flip) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack_flow) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes128_143) ?? new Uint8Array(16));
  writer.writeUint8((data == null ? void 0 : data.return_value_to_flow_variable) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes145_147) ?? new Uint8Array(3));
}
async function parseCharacterSummonDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    sound_effect: await reader.readUint16(),
    play_sound_effect_if_outside_screen: await reader.readUint8(),
    animation: await reader.readUint8(),
    bytes10_30: await reader.readBytes(21),
    count: await reader.readUint8(),
    formation: await reader.readUint8(),
    interval: await reader.readUint16(),
    number_of_columns: await reader.readUint16(),
    column_interval: await reader.readUint16(),
    target: await reader.readUint8(),
    direction: await reader.readUint8(),
    byte41: await reader.readBytes(1),
    target2: await reader.readUint8(),
    bytes43_51: await reader.readBytes(9),
    summon_position_offset_x: await reader.readUint32(),
    summon_position_offset_y: await reader.readUint32(),
    summon_position_offset_x_flip: await reader.readUint8(),
    summon_position_offset_y_flip: await reader.readUint8(),
    bytes62_66: await reader.readBytes(5),
    faction: await reader.readUint8(),
    bytes68_88: await reader.readBytes(21),
    existence_time: await reader.readUint16(),
    existence_time_present: await reader.readUint8(),
    bytes92_119: await reader.readBytes(28),
    palette_type: await reader.readUint8(),
    palette_data_number: await reader.readUint16(),
    faction_specification_method: await reader.readUint8(),
    set_acquired_score_to_0: await reader.readUint8(),
    direction_flip: await reader.readUint8(),
    attack: await reader.readUint8(),
    attack_flow: await reader.readUint8(),
    bytes128_143: await reader.readBytes(16),
    return_value_to_flow_variable: await reader.readUint8(),
    bytes145_147: await reader.readBytes(3)
  };
}
function writeCharacterSummonDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.sound_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.play_sound_effect_if_outside_screen) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.animation) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes10_30) ?? new Uint8Array(21));
  writer.writeUint8((data == null ? void 0 : data.count) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.formation) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.interval) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.number_of_columns) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.column_interval) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.byte41) ?? new Uint8Array(1));
  writer.writeUint8((data == null ? void 0 : data.target2) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes43_51) ?? new Uint8Array(9));
  writer.writeUint32((data == null ? void 0 : data.summon_position_offset_x) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.summon_position_offset_y) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.summon_position_offset_x_flip) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.summon_position_offset_y_flip) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes62_66) ?? new Uint8Array(5));
  writer.writeUint8((data == null ? void 0 : data.faction) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes68_88) ?? new Uint8Array(21));
  writer.writeUint16((data == null ? void 0 : data.existence_time) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.existence_time_present) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes92_119) ?? new Uint8Array(28));
  writer.writeUint8((data == null ? void 0 : data.palette_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.palette_data_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.faction_specification_method) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.set_acquired_score_to_0) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction_flip) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack_flow) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes128_143) ?? new Uint8Array(16));
  writer.writeUint8((data == null ? void 0 : data.return_value_to_flow_variable) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes145_147) ?? new Uint8Array(3));
}
async function parseItemSummonDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    sound_effect: await reader.readUint16(),
    play_sound_effect_if_outside_screen: await reader.readUint8(),
    animation: await reader.readUint8(),
    bytes10_30: await reader.readBytes(21),
    count: await reader.readUint8(),
    formation: await reader.readUint8(),
    interval: await reader.readUint16(),
    number_of_columns: await reader.readUint16(),
    column_interval: await reader.readUint16(),
    target: await reader.readUint8(),
    direction: await reader.readUint8(),
    byte41: await reader.readUint8(),
    target2: await reader.readUint8(),
    bytes43_51: await reader.readBytes(9),
    summon_position_offset_x: await reader.readUint32(),
    summon_position_offset_y: await reader.readUint32(),
    summon_position_offset_x_flip: await reader.readUint8(),
    summon_position_offset_y_flip: await reader.readUint8(),
    bytes62_66: await reader.readBytes(5),
    faction: await reader.readUint8(),
    bytes68_88: await reader.readBytes(21),
    existence_time: await reader.readUint16(),
    existence_time_present: await reader.readUint8(),
    bytes92_119: await reader.readBytes(28),
    palette_type: await reader.readUint8(),
    palette_data_number: await reader.readUint16(),
    faction_specification_method: await reader.readUint8(),
    set_acquired_score_to_0: await reader.readUint8(),
    direction_flip: await reader.readUint8(),
    attack: await reader.readUint8(),
    attack_flow: await reader.readUint8(),
    bytes128_143: await reader.readBytes(16)
  };
}
function writeItemSummonDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.sound_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.play_sound_effect_if_outside_screen) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.animation) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes10_30) ?? new Uint8Array(21));
  writer.writeUint8((data == null ? void 0 : data.count) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.formation) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.interval) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.number_of_columns) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.column_interval) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.byte41) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target2) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes43_51) ?? new Uint8Array(9));
  writer.writeUint32((data == null ? void 0 : data.summon_position_offset_x) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.summon_position_offset_y) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.summon_position_offset_x_flip) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.summon_position_offset_y_flip) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes62_66) ?? new Uint8Array(5));
  writer.writeUint8((data == null ? void 0 : data.faction) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes68_88) ?? new Uint8Array(21));
  writer.writeUint16((data == null ? void 0 : data.existence_time) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.existence_time_present) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes92_119) ?? new Uint8Array(28));
  writer.writeUint8((data == null ? void 0 : data.palette_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.palette_data_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.faction_specification_method) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.set_acquired_score_to_0) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction_flip) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.attack_flow) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes128_143) ?? new Uint8Array(16));
}
async function parseFlowOperationDetails(reader) {
  const data = {
    bytes1_34: await reader.readBytes(34),
    condition_present: await reader.readUint8(),
    judgment_type: await reader.readUint8(),
    bytes37_40: await reader.readBytes(4)
  };
  data.conditions = await readArray(reader, parseBasicCondition);
  data.bytes45_52 = await reader.readBytes(8);
  data.operation = await reader.readUint32();
  data.target_flow = await reader.readUint32();
  data.id = await reader.readUint32();
  data.target_character = await reader.readUint32();
  data.assign_return_value_to_flow_variable = await reader.readUint32();
  return data;
}
function writeFlowOperationDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_34) ?? new Uint8Array(34));
  writer.writeUint8((data == null ? void 0 : data.condition_present) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.judgment_type) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes37_40) ?? new Uint8Array(4));
  writeArray(writer, data == null ? void 0 : data.conditions, writeBasicCondition);
  writer.writeBytes((data == null ? void 0 : data.bytes45_52) ?? new Uint8Array(8));
  writer.writeUint32((data == null ? void 0 : data.operation) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.target_flow) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.id) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.target_character) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.assign_return_value_to_flow_variable) ?? 0);
}
async function parseStageClearDetails(reader) {
  const data = { bytes1_14: await reader.readBytes(14) };
  data.path = parseStdString(reader);
  Object.assign(data, {
    bytes19_38: await reader.readBytes(20),
    stage_transition: await reader.readUint32(),
    number: await reader.readUint32(),
    change_world_map_position: await reader.readUint32(),
    world_map_position_x: await reader.readUint32(),
    world_map_position_y: await reader.readUint32(),
    change_initial_position: await reader.readUint32(),
    initial_position_x: await reader.readUint32(),
    initial_position_y: await reader.readUint32(),
    initial_position_main_character_direction: await reader.readUint32(),
    execute_autosave: await reader.readUint32(),
    add_clear_text_to_replay: await reader.readUint32()
  });
  return data;
}
function writeStageClearDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_14) ?? new Uint8Array(14));
  writeStdString(writer, data == null ? void 0 : data.path);
  writer.writeBytes((data == null ? void 0 : data.bytes19_38) ?? new Uint8Array(20));
  writer.writeUint32((data == null ? void 0 : data.stage_transition) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.number) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.change_world_map_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.world_map_position_x) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.world_map_position_y) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.change_initial_position) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.initial_position_x) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.initial_position_y) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.initial_position_main_character_direction) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.execute_autosave) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.add_clear_text_to_replay) ?? 0);
}
async function parseGameWaitDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes6_38: await reader.readBytes(33),
    game_wait_execution_time: await reader.readUint32()
  };
}
function writeGameWaitDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes6_38) ?? new Uint8Array(33));
  writer.writeUint32((data == null ? void 0 : data.game_wait_execution_time) ?? 0);
}
async function parseMessageDetails(reader) {
  const data = { bytes1_14: await reader.readBytes(14) };
  data.message = parseStdString(reader);
  Object.assign(data, {
    bytes19_38: await reader.readBytes(20),
    display_position_specification_method: await reader.readUint32(),
    coordinate_x: await reader.readUint32(),
    coordinate_y: await reader.readUint32(),
    display_position_offset_x: await reader.readUint32(),
    display_position_offset_y: await reader.readUint32(),
    auto_adjust_to_not_go_off_screen: await reader.readUint32(),
    display_time_specification_method: await reader.readUint32(),
    display_time: await reader.readUint32(),
    pause: await reader.readUint32(),
    display_variables: await reader.readUint32(),
    follow_screen: await reader.readUint32(),
    auto_update: await reader.readUint32(),
    message_id_present: await reader.readUint32(),
    message_id: await reader.readUint32(),
    window_display: await reader.readUint32(),
    message_clear: await reader.readUint32(),
    update_interval: await reader.readUint32(),
    instant_display: await reader.readUint32(),
    coordinate_unit: await reader.readUint32(),
    set_options: await reader.readUint32(),
    assign_return_value_to_flow_variable: await reader.readUint32()
  });
  return data;
}
function writeMessageDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_14) ?? new Uint8Array(14));
  writeStdString(writer, data == null ? void 0 : data.message);
  writer.writeBytes((data == null ? void 0 : data.bytes19_38) ?? new Uint8Array(20));
  writer.writeUint32((data == null ? void 0 : data.display_position_specification_method) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.coordinate_x) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.coordinate_y) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.display_position_offset_x) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.display_position_offset_y) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.auto_adjust_to_not_go_off_screen) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.display_time_specification_method) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.display_time) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.pause) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.display_variables) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.follow_screen) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.auto_update) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.message_id_present) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.message_id) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.window_display) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.message_clear) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.update_interval) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.instant_display) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.coordinate_unit) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.set_options) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.assign_return_value_to_flow_variable) ?? 0);
}
async function parseWarpDetails(reader) {
  return {
    bytes1_26: await reader.readBytes(26),
    setting_type: await reader.readUint8(),
    direction: await reader.readUint8(),
    bytes29_33: await reader.readBytes(5),
    target_x_present: await reader.readUint8(),
    target_y_present: await reader.readUint8(),
    target_x_bl: await reader.readUint16(),
    target_y_bl: await reader.readUint16(),
    target_x_dot: await reader.readUint16(),
    target_y_dot: await reader.readUint16(),
    target_type: await reader.readUint8(),
    target_unit: await reader.readUint8(),
    gigantic_character_coordinate_position: await reader.readUint8(),
    bytes47_49: await reader.readBytes(3),
    target_x_flip_if_facing_right: await reader.readUint8(),
    target_y_flip_if_facing_right: await reader.readUint8(),
    bytes52_59: await reader.readBytes(8),
    distance: await reader.readUint16(),
    distance_double: await reader.readUint16(),
    bytes64_101: await reader.readBytes(38),
    assign_return_value_to_flow: await reader.readUint32()
  };
}
function writeWarpDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_26) ?? new Uint8Array(26));
  writer.writeUint8((data == null ? void 0 : data.setting_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes29_33) ?? new Uint8Array(5));
  writer.writeUint8((data == null ? void 0 : data.target_x_present) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target_y_present) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.target_x_bl) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.target_y_bl) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.target_x_dot) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.target_y_dot) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target_unit) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.gigantic_character_coordinate_position) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes47_49) ?? new Uint8Array(3));
  writer.writeUint8((data == null ? void 0 : data.target_x_flip_if_facing_right) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target_y_flip_if_facing_right) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes52_59) ?? new Uint8Array(8));
  writer.writeUint16((data == null ? void 0 : data.distance) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.distance_double) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes64_101) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.assign_return_value_to_flow) ?? 0);
}
async function parseTargetSettingDetails(reader) {
  return { bytes1_38: await reader.readBytes(38), bytes39_106: await reader.readBytes(68) };
}
function writeTargetSettingDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeBytes((data == null ? void 0 : data.bytes39_106) ?? new Uint8Array(68));
}
async function parseStatusOperationDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    operation_target_type: await reader.readUint8(),
    bytes40_43: await reader.readBytes(4),
    operation_target_variable_type: await reader.readUint8(),
    bytes45_46: await reader.readBytes(2),
    operation_target_variable_number: await reader.readUint16(),
    bytes49_52: await reader.readBytes(4),
    operation_target_target: await reader.readUint8(),
    bytes54_56: await reader.readBytes(3),
    operation_target_status: await reader.readUint8(),
    byte58: await reader.readBytes(1),
    operation_target_flow_variable_number: await reader.readUint8(),
    bytes60_62: await reader.readBytes(3),
    operator_type: await reader.readUint8(),
    bytes64_66: await reader.readBytes(3),
    calculation_content_type: await reader.readUint32(),
    calculation_content_constant: await reader.readUint32(),
    calculation_content_random_lower_limit: await reader.readUint32(),
    calculation_content_random_upper_limit: await reader.readUint32(),
    calculation_content_variable_type: await reader.readUint32(),
    calculation_content_variable_number: await reader.readUint32(),
    calculation_content_target: await reader.readUint32(),
    calculation_content_status: await reader.readUint32(),
    calculation_content_flow_variable_number: await reader.readUint32(),
    bytes103_138: await reader.readBytes(36)
  };
}
function writeStatusOperationDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint8((data == null ? void 0 : data.operation_target_type) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes40_43) ?? new Uint8Array(4));
  writer.writeUint8((data == null ? void 0 : data.operation_target_variable_type) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes45_46) ?? new Uint8Array(2));
  writer.writeUint16((data == null ? void 0 : data.operation_target_variable_number) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes49_52) ?? new Uint8Array(4));
  writer.writeUint8((data == null ? void 0 : data.operation_target_target) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes54_56) ?? new Uint8Array(3));
  writer.writeUint8((data == null ? void 0 : data.operation_target_status) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.byte58) ?? new Uint8Array(1));
  writer.writeUint8((data == null ? void 0 : data.operation_target_flow_variable_number) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes60_62) ?? new Uint8Array(3));
  writer.writeUint8((data == null ? void 0 : data.operator_type) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes64_66) ?? new Uint8Array(3));
  writer.writeUint32((data == null ? void 0 : data.calculation_content_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_constant) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_random_lower_limit) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_random_upper_limit) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_variable_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_variable_number) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_target) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_status) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.calculation_content_flow_variable_number) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes103_138) ?? new Uint8Array(36));
}
async function parseStatusOperation2Details(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    target: await reader.readUint32(),
    status: await reader.readUint32(),
    on: await reader.readUint32(),
    bytes51_62: await reader.readBytes(12)
  };
}
function writeStatusOperation2Details(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.target) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.status) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.on) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes51_62) ?? new Uint8Array(12));
}
async function parseDisappearanceDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    target: await reader.readUint32(),
    faction: await reader.readUint32(),
    range: await reader.readUint32(),
    assign_return_value_to_flow_variable: await reader.readUint32()
  };
}
function writeDisappearanceDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.target) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.faction) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.range) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.assign_return_value_to_flow_variable) ?? 0);
}
async function parseItemAcquisitionDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    palette_type: await reader.readUint32(),
    palette_data_number: await reader.readUint32()
  };
}
function writeItemAcquisitionDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.palette_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.palette_data_number) ?? 0);
}
async function parseGraphicChangeDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    image_type: await reader.readUint32(),
    image_number: await reader.readUint32(),
    offset: await reader.readUint32()
  };
}
function writeGraphicChangeDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.image_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.image_number) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.offset) ?? 0);
}
async function parseBasicAnimationSetChangeDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    animation_set: await reader.readUint32()
  };
}
function writeBasicAnimationSetChangeDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.animation_set) ?? 0);
}
async function parseAnimationExecutionDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes: await reader.readBytes(41)
  };
}
function writeAnimationExecutionDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes) ?? new Uint8Array(41));
}
async function parseEffectExecutionDetails(reader) {
  return { bytes1_38: await reader.readBytes(38), bytes: await reader.readBytes(40) };
}
function writeEffectExecutionDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeBytes((data == null ? void 0 : data.bytes) ?? new Uint8Array(40));
}
async function parseCharacterEffectExecutionDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    effect: await reader.readUint32(),
    execution_type: await reader.readUint32(),
    loop_execution: await reader.readUint32()
  };
}
function writeCharacterEffectExecutionDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.effect) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.execution_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.loop_execution) ?? 0);
}
async function parseScreenEffectExecutionDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    effect: await reader.readUint32(),
    execution_type: await reader.readUint32(),
    loop_execution: await reader.readUint32()
  };
}
function writeScreenEffectExecutionDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.effect) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.execution_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.loop_execution) ?? 0);
}
async function parsePictureDisplayDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes: await reader.readBytes(113)
  };
}
function writePictureDisplayDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes) ?? new Uint8Array(113));
}
async function parseBackgroundChangeDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes: await reader.readBytes(41)
  };
}
function writeBackgroundChangeDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes) ?? new Uint8Array(41));
}
async function parseSoundEffectPlaybackDetails(reader) {
  return {
    bytes1_7: await reader.readBytes(7),
    play_if_outside_screen: await reader.readUint8(),
    bytes9_38: await reader.readBytes(30),
    sound_effect: await reader.readUint32()
  };
}
function writeSoundEffectPlaybackDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_7) ?? new Uint8Array(7));
  writer.writeUint8((data == null ? void 0 : data.play_if_outside_screen) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes9_38) ?? new Uint8Array(30));
  writer.writeUint32((data == null ? void 0 : data.sound_effect) ?? 0);
}
async function parseBGMPlaybackDetails(reader) {
  return {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes: await reader.readBytes(41)
  };
}
function writeBGMPlaybackDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes) ?? new Uint8Array(41));
}
async function parseCodeExecutionDetails(reader) {
  const data = {
    execution_time: await reader.readUint16(),
    execution_time_double: await reader.readUint16(),
    parallel_execution: await reader.readUint8(),
    bytes6_14: await reader.readBytes(9)
  };
  data.code = parseStdString(reader);
  data.bytes19_38 = await reader.readBytes(20);
  return data;
}
function writeCodeExecutionDetails(writer, data) {
  writer.writeUint16((data == null ? void 0 : data.execution_time) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.execution_time_double) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.parallel_execution) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes6_14) ?? new Uint8Array(9));
  writeStdString(writer, data == null ? void 0 : data.code);
  writer.writeBytes((data == null ? void 0 : data.bytes19_38) ?? new Uint8Array(20));
}
async function parseArrangementDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    command: await reader.readUint32(),
    parameter: await reader.readUint32(),
    operator_type: await reader.readUint32(),
    variable_type: await reader.readUint32(),
    variable_number: await reader.readUint32()
  };
}
function writeArrangementDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.command) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.parameter) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.operator_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.variable_type) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.variable_number) ?? 0);
}
async function parseLoopDetails(reader) {
  return {
    bytes1_38: await reader.readBytes(38),
    repeat_count: await reader.readUint32(),
    command_count: await reader.readUint32()
  };
}
function writeLoopDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_38) ?? new Uint8Array(38));
  writer.writeUint32((data == null ? void 0 : data.repeat_count) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.command_count) ?? 0);
}
async function parseCommand(reader) {
  const command = {
        header: await reader.readUint32(),
        unk1: await reader.readUint8(),
        type: await reader.readUint8(),
    };
  if (command.header !== 8) {
    throw new Error(
      `Invalid command header: expected 8, got ${command.header} at offset ${reader.offset - 6}`
    );
  }
  switch (command.type) {
    case 1:
      command.details = parseWaitDetails(reader);
      break;
    case 2:
      command.details = parseLinearMovementDetails(reader);
      break;
    case 3:
      command.details = parseGroundMovementDetails(reader);
      break;
    case 4:
      command.details = parseCircularMovementDetails(reader);
      break;
    case 5:
      command.details = parseChargeMovementDetails(reader);
      break;
    case 6:
      command.details = parseGuidedMovementDetails(reader);
      break;
    case 7:
      command.details = parseScreenOutsideAvoidanceMovementDetails(reader);
      break;
    case 8:
      command.details = parseMovementInvalidationDetails(reader);
      break;
    case 9:
      command.details = parseDirectionChangeDetails(reader);
      break;
    case 10:
      command.details = parseJumpDetails(reader);
      break;
    case 11:
      command.details = parseShotDetails(reader);
      break;
    case 12:
      command.details = parseSwordDetails(reader);
      break;
    case 13:
      command.details = parseBlockSummonDetails(reader);
      break;
    case 14:
      command.details = parseCharacterSummonDetails(reader);
      break;
    case 15:
      command.details = parseItemSummonDetails(reader);
      break;
    case 16:
      command.details = parseFlowOperationDetails(reader);
      break;
    case 17:
      command.details = parseStageClearDetails(reader);
      break;
    case 18:
      command.details = parseGameWaitDetails(reader);
      break;
    case 19:
      command.details = parseMessageDetails(reader);
      break;
    case 20:
      command.details = parseWarpDetails(reader);
      break;
    case 21:
      command.details = parseTargetSettingDetails(reader);
      break;
    case 22:
      command.details = parseStatusOperationDetails(reader);
      break;
    case 23:
      command.details = parseStatusOperation2Details(reader);
      break;
    case 24:
      command.details = parseDisappearanceDetails(reader);
      break;
    case 25:
      command.details = parseItemAcquisitionDetails(reader);
      break;
    case 26:
      command.details = parseGraphicChangeDetails(reader);
      break;
    case 27:
      command.details = parseBasicAnimationSetChangeDetails(reader);
      break;
    case 28:
      command.details = parseAnimationExecutionDetails(reader);
      break;
    case 29:
      command.details = parseEffectExecutionDetails(reader);
      break;
    case 30:
      command.details = parseCharacterEffectExecutionDetails(reader);
      break;
    case 31:
      command.details = parseScreenEffectExecutionDetails(reader);
      break;
    case 32:
      command.details = parsePictureDisplayDetails(reader);
      break;
    case 34:
      command.details = parseBackgroundChangeDetails(reader);
      break;
    case 35:
      command.details = parseSoundEffectPlaybackDetails(reader);
      break;
    case 36:
      command.details = parseBGMPlaybackDetails(reader);
      break;
    case 37:
      command.details = parseCodeExecutionDetails(reader);
      break;
    case 38:
      command.details = parseArrangementDetails(reader);
      break;
    case 39:
      command.details = parseLoopDetails(reader);
      break;
    default:
      throw new Error(
        `Unknown command type: ${command.type} at offset ${reader.offset - 1}`
      );
  }
  return command;
}
function writeCommand(writer, command) {
  writer.writeUint32((command == null ? void 0 : command.header) ?? 8);
  writer.writeUint8((command == null ? void 0 : command.unk1) ?? 0);
  writer.writeUint8((command == null ? void 0 : command.type) ?? 0);
  if (((command == null ? void 0 : command.header) ?? 8) !== 8) {
    throw new Error(
      `Invalid command header for writing: expected 8, got ${command.header}`
    );
  }
  switch (command == null ? void 0 : command.type) {
    case 1:
      writeWaitDetails(writer, command.details);
      break;
    case 2:
      writeLinearMovementDetails(writer, command.details);
      break;
    case 3:
      writeGroundMovementDetails(writer, command.details);
      break;
    case 4:
      writeCircularMovementDetails(writer, command.details);
      break;
    case 5:
      writeChargeMovementDetails(writer, command.details);
      break;
    case 6:
      writeGuidedMovementDetails(writer, command.details);
      break;
    case 7:
      writeScreenOutsideAvoidanceMovementDetails(writer, command.details);
      break;
    case 8:
      writeMovementInvalidationDetails(writer, command.details);
      break;
    case 9:
      writeDirectionChangeDetails(writer, command.details);
      break;
    case 10:
      writeJumpDetails(writer, command.details);
      break;
    case 11:
      writeShotDetails(writer, command.details);
      break;
    case 12:
      writeSwordDetails(writer, command.details);
      break;
    case 13:
      writeBlockSummonDetails(writer, command.details);
      break;
    case 14:
      writeCharacterSummonDetails(writer, command.details);
      break;
    case 15:
      writeItemSummonDetails(writer, command.details);
      break;
    case 16:
      writeFlowOperationDetails(writer, command.details);
      break;
    case 17:
      writeStageClearDetails(writer, command.details);
      break;
    case 18:
      writeGameWaitDetails(writer, command.details);
      break;
    case 19:
      writeMessageDetails(writer, command.details);
      break;
    case 20:
      writeWarpDetails(writer, command.details);
      break;
    case 21:
      writeTargetSettingDetails(writer, command.details);
      break;
    case 22:
      writeStatusOperationDetails(writer, command.details);
      break;
    case 23:
      writeStatusOperation2Details(writer, command.details);
      break;
    case 24:
      writeDisappearanceDetails(writer, command.details);
      break;
    case 25:
      writeItemAcquisitionDetails(writer, command.details);
      break;
    case 26:
      writeGraphicChangeDetails(writer, command.details);
      break;
    case 27:
      writeBasicAnimationSetChangeDetails(writer, command.details);
      break;
    case 28:
      writeAnimationExecutionDetails(writer, command.details);
      break;
    case 29:
      writeEffectExecutionDetails(writer, command.details);
      break;
    case 30:
      writeCharacterEffectExecutionDetails(writer, command.details);
      break;
    case 31:
      writeScreenEffectExecutionDetails(writer, command.details);
      break;
    case 32:
      writePictureDisplayDetails(writer, command.details);
      break;
    case 34:
      writeBackgroundChangeDetails(writer, command.details);
      break;
    case 35:
      writeSoundEffectPlaybackDetails(writer, command.details);
      break;
    case 36:
      writeBGMPlaybackDetails(writer, command.details);
      break;
    case 37:
      writeCodeExecutionDetails(writer, command.details);
      break;
    case 38:
      writeArrangementDetails(writer, command.details);
      break;
    case 39:
      writeLoopDetails(writer, command.details);
      break;
    default:
      throw new Error(`Unknown command type for writing: ${command.type}`);
  }
}
async function parseFlow(reader) {
  const data = {
    header: await reader.readUint32(),
    id: await reader.readUint8(),
    group: await reader.readUint8(),
    test_play_only: await reader.readUint8(),
    basic_condition_judgment_type: await reader.readUint8(),
    basic_condition_once_met_always_met: await reader.readUint8(),
    timing: await reader.readUint8(),
    target_character_involved_in_timing: await reader.readUint8(),
    target_number_of_character_involved_in_timing: await reader.readUint8(),
    ease_of_input_with_multiple_key_conditions: await reader.readUint8(),
    allow_continuous_execution_by_holding_key: await reader.readUint8()
  };
  if (data.header !== 10) {
    throw new Error(
      `Invalid Flow header: expected 10, got ${data.header} at offset ${reader.offset - 15}`
    );
  }
  data.memo_length = await reader.readUint32();
  data.memo = parseStdString(reader);
  data.conditions = await readArray(reader, parseBasicCondition);
  data.key_conditions = await readArray(reader, parseKeyCondition);
  data.commands = await readArray(reader, parseCommand);
  return data;
}
function writeFlow(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.header) ?? 10);
  writer.writeUint8((data == null ? void 0 : data.id) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.group) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.test_play_only) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.basic_condition_judgment_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.basic_condition_once_met_always_met) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.timing) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target_character_involved_in_timing) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.target_number_of_character_involved_in_timing) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.ease_of_input_with_multiple_key_conditions) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.allow_continuous_execution_by_holding_key) ?? 0);
  writer.writeUint32(1);
  writeStdString(writer, data == null ? void 0 : data.memo);
  writeArray(writer, data == null ? void 0 : data.conditions, writeBasicCondition);
  writeArray(writer, data == null ? void 0 : data.key_conditions, writeKeyCondition);
  writeArray(writer, data == null ? void 0 : data.commands, writeCommand);
}
async function parseFlowChangeDetails(reader) {
  const data = {
    bytes1_30: await reader.readBytes(30)
  };
  data.flows = await readArray(reader, parseFlow);
  Object.assign(data, {
    bytes69_72: await reader.readBytes(4),
    operation: await reader.readUint32(),
    bytes77_80: await reader.readBytes(4)
  });
  return data;
}
function writeFlowChangeDetails(writer, data) {
  writer.writeBytes((data == null ? void 0 : data.bytes1_30) ?? new Uint8Array(30));
  writeArray(writer, data == null ? void 0 : data.flows, writeFlow);
  writer.writeBytes((data == null ? void 0 : data.bytes69_72) ?? new Uint8Array(4));
  writer.writeUint32((data == null ? void 0 : data.operation) ?? 0);
  writer.writeBytes((data == null ? void 0 : data.bytes77_80) ?? new Uint8Array(4));
}
async function parseItemEffect(reader) {
  const effect = {
    header: await reader.readUint32(),
    unk1: await reader.readInt8(),
    type: await reader.readUint8()
  };
  if (effect.header !== 8) {
    throw new Error(
      `Invalid item effect header: expected 8, got ${effect.header} at offset ${reader.offset - 6}`
    );
  }
  switch (effect.type) {
    case 1:
      effect.details = parseFlowChangeDetails(reader);
      break;
    case 2:
      effect.details = parseStageClearDetails(reader);
      break;
    case 3:
      effect.details = parseGameWaitDetails(reader);
      break;
    case 4:
      effect.details = parseMessageDetails(reader);
      break;
    case 5:
      effect.details = parseWarpDetails(reader);
      break;
    case 7:
      effect.details = parseStatusOperationDetails(reader);
      break;
    case 8:
      effect.details = parseStatusOperation2Details(reader);
      break;
    case 9:
      effect.details = parseDisappearanceDetails(reader);
      break;
    case 10:
      effect.details = parseItemAcquisitionDetails(reader);
      break;
    case 11:
      effect.details = parseGraphicChangeDetails(reader);
      break;
    case 12:
      effect.details = parseBasicAnimationSetChangeDetails(reader);
      break;
    case 13:
      effect.details = parseAnimationExecutionDetails(reader);
      break;
    case 14:
      effect.details = parseEffectExecutionDetails(reader);
      break;
    case 15:
      effect.details = parseCharacterEffectExecutionDetails(reader);
      break;
    case 16:
      effect.details = parseScreenEffectExecutionDetails(reader);
      break;
    case 17:
      effect.details = parsePictureDisplayDetails(reader);
      break;
    case 19:
      effect.details = parseBackgroundChangeDetails(reader);
      break;
    case 20:
      effect.details = parseSoundEffectPlaybackDetails(reader);
      break;
    case 21:
      effect.details = parseBGMPlaybackDetails(reader);
      break;
    case 22:
      effect.details = parseCodeExecutionDetails(reader);
      break;
    case 23:
      effect.details = parseArrangementDetails(reader);
      break;
    case 24:
      effect.details = parseLoopDetails(reader);
      break;
    default:
      throw new Error(
        `Unknown item effect type: ${effect.type} at offset ${reader.offset - 1}`
      );
  }
  return effect;
}
function writeItemEffect(writer, effect) {
  writer.writeUint32((effect == null ? void 0 : effect.header) ?? 8);
  writer.writeInt8((effect == null ? void 0 : effect.unk1) ?? 0);
  writer.writeUint8((effect == null ? void 0 : effect.type) ?? 0);
  switch (effect == null ? void 0 : effect.type) {
    case 1:
      writeFlowChangeDetails(writer, effect.details);
      break;
    case 2:
      writeStageClearDetails(writer, effect.details);
      break;
    case 3:
      writeGameWaitDetails(writer, effect.details);
      break;
    case 4:
      writeMessageDetails(writer, effect.details);
      break;
    case 5:
      writeWarpDetails(writer, effect.details);
      break;
    case 7:
      writeStatusOperationDetails(writer, effect.details);
      break;
    case 8:
      writeStatusOperation2Details(writer, effect.details);
      break;
    case 9:
      writeDisappearanceDetails(writer, effect.details);
      break;
    case 10:
      writeItemAcquisitionDetails(writer, effect.details);
      break;
    case 11:
      writeGraphicChangeDetails(writer, effect.details);
      break;
    case 12:
      writeBasicAnimationSetChangeDetails(writer, effect.details);
      break;
    case 13:
      writeAnimationExecutionDetails(writer, effect.details);
      break;
    case 14:
      writeEffectExecutionDetails(writer, effect.details);
      break;
    case 15:
      writeCharacterEffectExecutionDetails(writer, effect.details);
      break;
    case 16:
      writeScreenEffectExecutionDetails(writer, effect.details);
      break;
    case 17:
      writePictureDisplayDetails(writer, effect.details);
      break;
    case 19:
      writeBackgroundChangeDetails(writer, effect.details);
      break;
    case 20:
      writeSoundEffectPlaybackDetails(writer, effect.details);
      break;
    case 21:
      writeBGMPlaybackDetails(writer, effect.details);
      break;
    case 22:
      writeCodeExecutionDetails(writer, effect.details);
      break;
    case 23:
      writeArrangementDetails(writer, effect.details);
      break;
    case 24:
      writeLoopDetails(writer, effect.details);
      break;
    default:
      throw new Error(`Unknown item effect type for writing: ${effect.type}`);
  }
}
async function parseBlock(reader) {
  const data = {
    header: await reader.readUint32(),
    inherit_palette: await reader.readUint8(),
    inherit_palette_data: await reader.readUint16(),
    any_of_appearance_conditions_true: await reader.readUint8(),
    appearance_condition_once_met_always_true: await reader.readUint8(),
    image_number: await reader.readUint16(),
    image_type: await reader.readUint16(),
    unknown1: await reader.readUint8(),
    in_front_of_character: await reader.readUint8(),
    transparency: await reader.readUint8(),
    mark_display: await reader.readUint8(),
    mark_number: await reader.readUint8(),
    unknown2: await reader.readUint8(),
    block_type: await reader.readUint8(),
    invalid_faction: await reader.readUint8(),
    action: await reader.readUint8(),
    action_parameter: await reader.readUint32(),
    acquired_item_palette: await reader.readUint8(),
    acquired_item_palette_data_number: await reader.readUint16(),
    block_summon_invalid: await reader.readUint8()
  };
  const strings_count = await reader.readUint32();
  if (strings_count > 0) {
    data.name = parseStdString(reader);
  } else {
    data.name = "";
    throw new Error("Missing block name ??");
  }
  Object.assign(data, {
    position_x: await reader.readInt16(),
    position_y: await reader.readInt16(),
    inherited_data_count: await reader.readUint32(),
    inherit_block_name: await reader.readUint8(),
    inherit_appearance_condition: await reader.readUint8(),
    inherit_image: await reader.readUint8(),
    inherit_in_front_of_character: await reader.readUint8(),
    inherit_transparency: await reader.readUint8(),
    inherit_mark: await reader.readUint8(),
    inherit_block_type: await reader.readUint8(),
    inherit_invalid_faction: await reader.readUint8(),
    inherit_action: await reader.readUint8(),
    inherit_acquired_item: await reader.readUint8(),
    inherit_block_summon: await reader.readUint8()
  });
  data.display_conditions = await readArray(reader, parseBasicCondition);
  return data;
}
function writeBlock(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.header) ?? 12);
  writer.writeUint8((data == null ? void 0 : data.inherit_palette) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.inherit_palette_data) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.any_of_appearance_conditions_true) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.appearance_condition_once_met_always_true) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.image_number) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.image_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.unknown1) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.in_front_of_character) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.transparency) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.mark_display) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.mark_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.unknown2) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.block_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.invalid_faction) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.action) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.action_parameter) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.acquired_item_palette) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.acquired_item_palette_data_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.block_summon_invalid) ?? 0);
  writer.writeUint32(1);
  writeStdString(writer, data.name);
  writer.writeInt16((data == null ? void 0 : data.position_x) ?? 0);
  writer.writeInt16((data == null ? void 0 : data.position_y) ?? 0);
  writer.writeUint32(11);
  writer.writeUint8((data == null ? void 0 : data.inherit_block_name) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_appearance_condition) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_image) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_in_front_of_character) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_transparency) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_mark) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_block_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_invalid_faction) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_action) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_acquired_item) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_block_summon) ?? 0);
  writeArray(writer, data == null ? void 0 : data.display_conditions, writeBasicCondition);
}
async function parseCharacter(reader) {
  const data = {
    header: await reader.readUint32(),
    inherit_palette: await reader.readUint8(),
    inherit_palette_data_number: await reader.readUint16(),
    any_of_appearance_conditions_true: await reader.readUint8(),
    appearance_condition_once_met_always_true: await reader.readUint8(),
    facing_right: await reader.readUint8(),
    number_of_doubles: await reader.readUint8(),
    appearance_position_offset_x_bl: await reader.readUint16(),
    appearance_position_offset_x_dot: await reader.readUint16(),
    appearance_position_offset_y_bl: await reader.readUint16(),
    appearance_position_offset_y_dot: await reader.readUint16(),
    appearance_position_offset_x_flip_if_facing_right: await reader.readUint8(),
    appearance_position_offset_y_flip_if_facing_right: await reader.readUint8(),
    image_number: await reader.readUint16(),
    image_type: await reader.readUint8(),
    image_offset: await reader.readUint16(),
    animation_set: await reader.readUint16(),
    z_coordinate: await reader.readUint8(),
    transparency: await reader.readUint8(),
    initial_character_effect: await reader.readUint16(),
    initial_character_effect_execution_type: await reader.readUint8(),
    initial_character_effect_loop_execution: await reader.readUint8(),
    character_effect_on_death: await reader.readUint16(),
    character_effect_on_death_execution_type: await reader.readUint8(),
    mark_display: await reader.readUint8(),
    mark_number: await reader.readUint16(),
    operation: await reader.readUint16(),
    faction: await reader.readUint8(),
    character_id: await reader.readUint8(),
    flying: await reader.readUint8(),
    direction_fixed: await reader.readUint8(),
    invincible: await reader.readUint8(),
    invincible_effect: await reader.readUint8(),
    block: await reader.readUint8(),
    gigantic: await reader.readUint8(),
    synchronize_with_auto_scroll: await reader.readUint8(),
    line_of_sight: await reader.readUint8(),
    line_of_sight_range: await reader.readUint8(),
    hp: await reader.readUint32(),
    sp: await reader.readUint32(),
    stopping_ease_during_inertial_movement: await reader.readUint16(),
    body_hit_detection_range: await reader.readUint8(),
    body_hit_power: await reader.readUint32(),
    body_hit_impact: await reader.readUint8(),
    body_hit_effect: await reader.readUint16(),
    defense: await reader.readUint32(),
    impact_resistance: await reader.readUint8(),
    score: await reader.readUint32(),
    holds_item_at_same_position: await reader.readUint8(),
    has_group: await reader.readUint8(),
    group_number: await reader.readUint16(),
    action_condition_range: await reader.readUint8(),
    action_condition_judgment_type: await reader.readUint8()
  };
  const strings_count = await reader.readUint32();
  if (strings_count > 0) {
    data.character_name = parseStdString(reader);
  } else {
    data.character_name = "";
  }
  for (let i = 1; i < strings_count; i++) {
    reader.readStdString();
  }
  Object.assign(data, {
    position_x: await reader.readUint16(),
    position_y: await reader.readUint16(),
    some_count: await reader.readInt32(),
    inherited_data_count: await reader.readUint32(),
    inherit_character_name: await reader.readUint8(),
    inherit_operation: await reader.readUint8(),
    inherit_faction: await reader.readUint8(),
    inherit_character_id: await reader.readUint8(),
    inherit_appearance_condition: await reader.readUint8(),
    inherit_facing_right: await reader.readUint8(),
    inherit_number_of_doubles: await reader.readUint8(),
    inherit_initial_position_offset_x: await reader.readUint8(),
    inherit_initial_position_offset_y: await reader.readUint8(),
    inherit_image: await reader.readUint8(),
    inherit_animation_set: await reader.readUint8(),
    inherit_z_coordinate: await reader.readUint8(),
    inherit_transparency: await reader.readUint8(),
    inherit_initial_character_effect: await reader.readUint8(),
    inherit_character_effect_on_death: await reader.readUint8(),
    inherit_mark: await reader.readUint8(),
    inherit_direction_fixed: await reader.readUint8(),
    inherit_flying: await reader.readUint8(),
    inherit_invincible: await reader.readUint8(),
    inherit_block: await reader.readUint8(),
    inherit_gigantic: await reader.readUint8(),
    inherit_synchronize_with_auto_scroll: await reader.readUint8(),
    inherit_line_of_sight: await reader.readUint8(),
    inherit_hp: await reader.readUint8(),
    inherit_sp: await reader.readUint8(),
    inherit_body_hit_detection_range: await reader.readUint8(),
    inherit_body_hit_power: await reader.readUint8(),
    inherit_body_hit_impact: await reader.readUint8(),
    inherit_body_hit_effect: await reader.readUint8(),
    inherit_defense: await reader.readUint8(),
    inherit_impact_resistance: await reader.readUint8(),
    inherit_stopping_ease_during_inertial_movement: await reader.readUint8(),
    inherit_action_condition: await reader.readUint8(),
    inherit_group: await reader.readUint8(),
    inherit_score: await reader.readUint8(),
    inherit_holds_item_at_same_position: await reader.readUint8(),
    inherit_action: await reader.readUint8()
  });
  data.conditions = await readArray(reader, parseBasicCondition);
  data.flows = await readArray(reader, parseFlow);
  return data;
}
function writeCharacter(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.header) ?? 35);
  writer.writeUint8((data == null ? void 0 : data.inherit_palette) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.inherit_palette_data_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.any_of_appearance_conditions_true) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.appearance_condition_once_met_always_true) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.facing_right) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.number_of_doubles) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.appearance_position_offset_x_bl) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.appearance_position_offset_x_dot) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.appearance_position_offset_y_bl) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.appearance_position_offset_y_dot) ?? 0);
  writer.writeUint8(
    (data == null ? void 0 : data.appearance_position_offset_x_flip_if_facing_right) ?? 0
  );
  writer.writeUint8(
    (data == null ? void 0 : data.appearance_position_offset_y_flip_if_facing_right) ?? 0
  );
  writer.writeUint16((data == null ? void 0 : data.image_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.image_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.image_offset) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.animation_set) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.z_coordinate) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.transparency) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.initial_character_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.initial_character_effect_execution_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.initial_character_effect_loop_execution) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.character_effect_on_death) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.character_effect_on_death_execution_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.mark_display) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.mark_number) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.operation) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.faction) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.character_id) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.flying) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.direction_fixed) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.invincible) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.invincible_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.block) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.gigantic) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.synchronize_with_auto_scroll) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.line_of_sight) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.line_of_sight_range) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.hp) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.sp) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.stopping_ease_during_inertial_movement) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.body_hit_detection_range) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.body_hit_power) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.body_hit_impact) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.body_hit_effect) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.defense) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.impact_resistance) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.score) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.holds_item_at_same_position) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.has_group) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.group_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.action_condition_range) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.action_condition_judgment_type) ?? 0);
  writer.writeUint32(1);
  writeStdString(writer, data.character_name);
  writer.writeUint16((data == null ? void 0 : data.position_x) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.position_y) ?? 0);
  writer.writeInt32((data == null ? void 0 : data.some_count) ?? 0);
  writer.writeUint32(37);
  writer.writeUint8((data == null ? void 0 : data.inherit_character_name) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_operation) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_faction) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_character_id) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_appearance_condition) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_facing_right) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_number_of_doubles) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_initial_position_offset_x) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_initial_position_offset_y) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_image) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_animation_set) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_z_coordinate) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_transparency) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_initial_character_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_character_effect_on_death) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_mark) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_direction_fixed) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_flying) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_invincible) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_block) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_gigantic) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_synchronize_with_auto_scroll) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_line_of_sight) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_hp) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_sp) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_body_hit_detection_range) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_body_hit_power) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_body_hit_impact) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_body_hit_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_defense) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_impact_resistance) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_stopping_ease_during_inertial_movement) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_action_condition) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_group) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_score) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_holds_item_at_same_position) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_action) ?? 0);
  writeArray(writer, data == null ? void 0 : data.conditions, writeBasicCondition);
  writeArray(writer, data == null ? void 0 : data.flows, writeFlow);
}
async function parseItem(reader) {
  const data = {
    header: await reader.readUint32(),
    inherit_palette: await reader.readUint8(),
    inherit_palette_data_number: await reader.readUint16(),
    any_of_appearance_conditions_true: await reader.readUint8(),
    appearance_condition_once_met_always_true: await reader.readUint8(),
    appearance_position_offset_x_dot: await reader.readUint16(),
    appearance_position_offset_y_dot: await reader.readUint16(),
    image_number: await reader.readUint16(),
    image_type: await reader.readUint8(),
    frame: await reader.readUint16(),
    z_coordinate: await reader.readUint8(),
    transparency: await reader.readUint8(),
    mark_display: await reader.readUint8(),
    mark_number: await reader.readUint16(),
    display_above_head_on_acquisition: await reader.readUint8(),
    acquisition_type: await reader.readUint8(),
    gigantic: await reader.readUint8(),
    sound_effect: await reader.readUint16()
  };
  const item_name_length = await reader.readUint32();
  if (item_name_length > 0) {
    data.item_name = parseStdString(reader);
  } else {
    data.item_name = "";
  }
  for (let i = 1; i < item_name_length; i++) {
    reader.readStdString();
  }
  Object.assign(data, {
    position_x: await reader.readUint16(),
    position_y: await reader.readUint16(),
    number_of_inherited_data: await reader.readUint32(),
    inherit_item_name: await reader.readUint8(),
    inherit_appearance_condition: await reader.readUint8(),
    inherit_initial_position_offset_x: await reader.readUint8(),
    inherit_initial_position_offset_y: await reader.readUint8(),
    inherit_image: await reader.readUint8(),
    inherit_z_coordinate: await reader.readUint8(),
    inherit_transparency: await reader.readUint8(),
    inherit_mark: await reader.readUint8(),
    inherit_gigantic: await reader.readUint8(),
    inherit_acquisition_type: await reader.readUint8(),
    inherit_display_above_head_on_acquisition: await reader.readUint8(),
    inherit_sound_effect: await reader.readUint8(),
    inherit_effect: await reader.readUint8()
  });
  data.conditions = await readArray(reader, parseBasicCondition);
  data.item_effects = await readArray(reader, parseItemEffect);
  return data;
}
function writeItem(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.header) ?? 11);
  writer.writeUint8((data == null ? void 0 : data.inherit_palette) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.inherit_palette_data_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.any_of_appearance_conditions_true) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.appearance_condition_once_met_always_true) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.appearance_position_offset_x_dot) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.appearance_position_offset_y_dot) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.image_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.image_type) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.frame) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.z_coordinate) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.transparency) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.mark_display) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.mark_number) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.display_above_head_on_acquisition) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.acquisition_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.gigantic) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.sound_effect) ?? 0);
  writer.writeUint32(1);
  writeStdString(writer, data.item_name);
  writer.writeUint16((data == null ? void 0 : data.position_x) ?? 0);
  writer.writeUint16((data == null ? void 0 : data.position_y) ?? 0);
  writer.writeUint32(13);
  writer.writeUint8((data == null ? void 0 : data.inherit_item_name) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_appearance_condition) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_initial_position_offset_x) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_initial_position_offset_y) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_image) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_z_coordinate) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_transparency) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_mark) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_gigantic) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_acquisition_type) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_display_above_head_on_acquisition) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_sound_effect) ?? 0);
  writer.writeUint8((data == null ? void 0 : data.inherit_effect) ?? 0);
  writeArray(writer, data == null ? void 0 : data.conditions, writeBasicCondition);
  writeArray(writer, data == null ? void 0 : data.item_effects, writeItemEffect);
}
async function parseStagePaletteFile(reader) {
  const file = {
    magic: await reader.readUint32(),
    some_count: await reader.readUint32(),
    item_width: await reader.readUint32(),
    chunk_width: await reader.readUint32(),
    chunk_pow: await reader.readUint32(),
    height: await reader.readUint32(),
    enable_horizontal_scroll_minimum: await reader.readUint32(),
    enable_horizontal_scroll_maximum: await reader.readUint32(),
    enable_vertical_scroll_minimum: await reader.readUint32(),
    enable_vertical_scroll_maximum: await reader.readUint32(),
    horizontal_scroll_minimum_value: await reader.readUint32(),
    horizontal_scroll_maximum_value: await reader.readUint32(),
    vertical_scroll_minimum_value: await reader.readUint32(),
    vertical_scroll_maximum_value: await reader.readUint32(),

    frame_rate: await reader.readUint32(),
    enable_time_limit: await reader.readUint32(),
    time_limit_duration: await reader.readUint32(),
    warning_sound_start_time: await reader.readUint32(),

    enable_side_scroll: await reader.readUint32(),
    enable_vertical_scroll: await reader.readUint32(),
    autoscroll_speed: await reader.readUint32(),
    vertical_scroll_speed: await reader.readUint32(),
    gravity: await reader.readFloat64(),
    hit_detection_level: await reader.readUint32(),
    character_shot_collision_detection_accuracy: await reader.readUint32(),
    bgm_number: await reader.readUint32(),
    bgm_loop_playback: await reader.readUint32(),
    dont_restart_bgm_if_no_change: await reader.readUint32(),
    enable_z_coordinate: await reader.readUint32(),
    inherit_status_from_stock: await reader.readUint32(),
    store_status_to_stock: await reader.readUint32(),
    show_status_window: await reader.readUint32(),
    switch_scene_immediately_on_clear: await reader.readUint32(),
    allow_replay_save: await reader.readUint32(),
    show_stage: await reader.readUint32(),
    show_ready: await reader.readUint32(),
    show_clear: await reader.readUint32(),
    show_gameover: await reader.readUint32(),
    player_collide: await parsePlayerCollision(reader),
    enemy_collide: await parseEnemyCollision(reader),
    item_collision_width: await reader.readUint32(),
    item_collision_height: await reader.readUint32(),
    player_hitbox: await parseActorHitbox(reader),
    enemy_hitbox: await parseActorHitbox(reader),
    undo_max_times: await reader.readUint32(),
    x_coordinate_upper_limit: await reader.readUint32(),
    y_coordinate_upper_limit: await reader.readUint32(),
    unk75: await reader.readUint32(),
    unk76: await reader.readUint32(),
    unk77: await reader.readUint32(),
    unk78: await reader.readUint32(),
    unk79: await reader.readUint32(),
    unk80: await reader.readUint32(),
    unk81: await reader.readUint32(),
    unk82: await reader.readUint32(),
    unk83: await reader.readUint32(),
    unk84: await reader.readUint32(),
    unk85: await reader.readUint32(),
    unk86: await reader.readUint32(),
    disable_damage_outside_screen: await reader.readUint32(),
    player_invincibility_from_same_enemy_duration: await reader.readUint32(),
    player_invincibility_duration: await reader.readUint32(),
    enemy_invincibility_from_same_player_duration: await reader.readUint32(),
    enemy_invincibility_duration: await reader.readUint32(),
    stage_names: await reader.readUint32(),
    stage_name: await parseStdString(reader),
    ranking_size: await reader.readUint32(),
    ranking_score: await reader.readUint32(),
    ranking_remaining_time: await reader.readUint32(),
    ranking_clear_time: await reader.readUint32(),
    ranking_remaining_hp: await reader.readUint32(),
    ranking_remaining_sp: await reader.readUint32(),
    nonblock_enemy_death: await parseDeathFade(reader),
    block_enemy_death: await parseDeathFade(reader),
    item_death: await parseDeathFade(reader),
    player_death: await parseDeathFade(reader),
    enemy_death: await parseDeathFade(reader)
  };
  file.palette = parseStagePalette(reader);
  file.blocks = await readArray(reader, parseStageBlock);
  file.characters = await readArray(reader, parseStageCharacter);
  file.items = await readArray(reader, parseStageItem);
  file.backgrounds = await readArray(reader, parseBackground);
  file.stage_vars = await readArray(reader, parseStageVar);
  file.end = await reader.readUint32();
  if (file.end !== 123456789) {
    console.warn(`Unexpected end marker: expected 123456789, got ${file.end}`);
  }
  return file;
}
function writeStagePaletteFile(writer, file) {
  writer.writeUint32((file == null ? void 0 : file.magic) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.some_count) ?? 99);
  writer.writeUint32((file == null ? void 0 : file.item_width) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.chunk_width) ?? 32);
  writer.writeUint32((file == null ? void 0 : file.chunk_pow) ?? 5);
  writer.writeUint32((file == null ? void 0 : file.height) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_horizontal_scroll_minimum) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_horizontal_scroll_maximum) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_vertical_scroll_minimum) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_vertical_scroll_maximum) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.horizontal_scroll_minimum_value) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.horizontal_scroll_maximum_value) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.vertical_scroll_minimum_value) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.vertical_scroll_maximum_value) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.frame_rate) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_time_limit) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.time_limit_duration) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.warning_sound_start_time) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_side_scroll) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_vertical_scroll) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.autoscroll_speed) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.vertical_scroll_speed) ?? 0);
  writer.writeFloat64((file == null ? void 0 : file.gravity) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.hit_detection_level) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.character_shot_collision_detection_accuracy) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.bgm_number) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.bgm_loop_playback) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.dont_restart_bgm_if_no_change) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enable_z_coordinate) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.inherit_status_from_stock) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.store_status_to_stock) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.show_status_window) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.switch_scene_immediately_on_clear) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.allow_replay_save) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.show_stage) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.show_ready) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.show_clear) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.show_gameover) ?? 0);
  writePlayerCollision(writer, file == null ? void 0 : file.player_collide);
  writeEnemyCollision(writer, file == null ? void 0 : file.enemy_collide);
  writer.writeUint32((file == null ? void 0 : file.item_collision_width) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.item_collision_height) ?? 0);
  writeActorHitbox(writer, file == null ? void 0 : file.player_hitbox);
  writeActorHitbox(writer, file == null ? void 0 : file.enemy_hitbox);
  writer.writeUint32((file == null ? void 0 : file.undo_max_times) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.x_coordinate_upper_limit) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.y_coordinate_upper_limit) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk75) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk76) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk77) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk78) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk79) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk80) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk81) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk82) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk83) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk84) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk85) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.unk86) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.disable_damage_outside_screen) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.player_invincibility_from_same_enemy_duration) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.player_invincibility_duration) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enemy_invincibility_from_same_player_duration) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.enemy_invincibility_duration) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.stage_names) ?? 1);
  writeStdString(writer, file == null ? void 0 : file.stage_name);
  writer.writeUint32((file == null ? void 0 : file.ranking_size) ?? 5);
  writer.writeUint32((file == null ? void 0 : file.ranking_score) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.ranking_remaining_time) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.ranking_clear_time) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.ranking_remaining_hp) ?? 0);
  writer.writeUint32((file == null ? void 0 : file.ranking_remaining_sp) ?? 0);
  writeDeathFade(writer, file == null ? void 0 : file.nonblock_enemy_death);
  writeDeathFade(writer, file == null ? void 0 : file.block_enemy_death);
  writeDeathFade(writer, file == null ? void 0 : file.item_death);
  writeDeathFade(writer, file == null ? void 0 : file.player_death);
  writeDeathFade(writer, file == null ? void 0 : file.enemy_death);
  writeStagePalette(writer, file == null ? void 0 : file.palette);
  writeArray(writer, file == null ? void 0 : file.blocks, writeStageBlock);
  writeArray(writer, file == null ? void 0 : file.characters, writeStageCharacter);
  writeArray(writer, file == null ? void 0 : file.items, writeStageItem);
  writeArray(writer, file == null ? void 0 : file.backgrounds, writeBackground);
  writeArray(writer, file == null ? void 0 : file.stage_vars, writeStageVar);
  writer.writeUint32((file == null ? void 0 : file.end) ?? 123456789);
}
async function parseStagePalette(reader) {
  return {
    blocks: readArray(reader, parseBlock),
    characters: readArray(reader, parseCharacter),
    items: readArray(reader, parseItem)
  };
}
function writeStagePalette(writer, data) {
  writeArray(writer, data == null ? void 0 : data.blocks, writeBlock);
  writeArray(writer, data == null ? void 0 : data.characters, writeCharacter);
  writeArray(writer, data == null ? void 0 : data.items, writeItem);
}
async function parseStageBlock(reader) {
  return {
    position: await reader.readUint32(),
    block: await parseBlock(reader)
  };
}
function writeStageBlock(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.position) ?? 0);
  writeBlock(writer, data == null ? void 0 : data.block);
}
async function parseStageCharacter(reader) {
  return {
    position: await reader.readUint32(),
    character: await parseCharacter(reader)
  };
}
function writeStageCharacter(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.position) ?? 0);
  writeCharacter(writer, data == null ? void 0 : data.character);
}
async function parseStageItem(reader) {
  return {
    position: await reader.readUint32(),
    item: await parseItem(reader)
  };
}
function writeStageItem(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.position) ?? 0);
  writeItem(writer, data == null ? void 0 : data.item);
}
async function parseStageVar(reader) {
  return {
    some_count: await reader.readUint32(),
    some_count_too: await reader.readUint32(),
    variable_name: await parseStdString(reader)
  };
}
function writeStageVar(writer, data) {
  writer.writeUint32((data == null ? void 0 : data.some_count) ?? 0);
  writer.writeUint32((data == null ? void 0 : data.some_count_too) ?? 1);
  writeStdString(writer, data == null ? void 0 : data.variable_name);
}
export async function parseStage(stream) {
  
  const reader = new DataReader(stream);
  return await parseStagePaletteFile(reader);
  // const reader = ensureReader(source);
  // return parseStagePaletteFile(reader);
}
export function serializeStage(stage) {
    // This part remains synchronous and is handled by the TransformStream in main.js
    return new TransformStream({
        async start(controller) {
            const writer = new DataWriter(controller);
            writeStagePaletteFile(writer, stage); // This is your existing synchronous write function
            controller.close();
        }
    });
}

/* function serializeStage(stage) {
  if (!stage || typeof stage !== "object") {
    throw new TypeError("Stage data must be an object.");
  }
  const writer = new DataWriter();
  writeStagePaletteFile(writer, stage);
  return writer.toArrayBuffer();
} */
