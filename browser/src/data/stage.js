import { DataReader, DataWriter, StreamDataReader } from './data-reader-writer.js';

const CONFIG = {
  /**
   * The maximum number of items allowed in any array read from the file.
   * This is a security measure to prevent errors from malformed files
   * that could lead to excessive memory allocation.
   * @type {number}
   */
  MAX_ARRAY_SIZE: 14096
};

function readArray(reader, parser) {
  const count = reader.readUint32();
  if (count > CONFIG.MAX_ARRAY_SIZE) {
    throw new Error(
      `Array size ${count} exceeds maximum of ${CONFIG.MAX_ARRAY_SIZE} at offset ${reader.position - 4}`
    );
  }
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(parser(reader));
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

// Helper functions for parsing and writing
/** @param {DataReader} reader stream reader */
function readStdString(reader) {
  return reader.readStdString();
}

/** @param {DataWriter} writer stream writer */
function writeStdString(writer, str) {
  writer.writeStdString(str || '');
}

/** @param {DataReader} reader stream reader */
function readStdStringVector(reader) {
  const count = reader.readUint32();
  const strings = [];
  for (let i = 0; i < count; i++) {
    strings.push(readStdString(reader));
  }
  return strings;
}

/** @param {DataWriter} writer stream writer */
function writeStdStringVector(writer, arr) {
  const items = arr || [];
  writer.writeUint32(items.length);
  for (const item of items) {
    writeStdString(writer, item);
  }
}

/** @param {DataReader} reader stream reader */
function readIntVector(reader) {
  const count = reader.readUint32();
  const ints = [];
  for (let i = 0; i < count; i++) {
    ints.push(reader.readUint32());
  }
  return ints;
}

/** @param {DataWriter} writer stream writer */
function writeIntVector(writer, arr) {
  const items = arr || [];
  writer.writeUint32(items.length);
  for (const item of items) {
    writer.writeUint32(item);
  }
}

// Parse PlayerCollision structure
/** @param {DataReader} reader stream reader */
function readPlayerCollision(reader) {
  return {
    walking_block_width: reader.readUint32(),
    walking_block_height: reader.readUint32(),
    flying_block_width: reader.readUint32(),
    flying_block_height: reader.readUint32(),
    walking_character_width: reader.readUint32(),
    walking_character_height: reader.readUint32(),
    flying_character_width: reader.readUint32(),
    flying_character_height: reader.readUint32(),
    shot_width: reader.readUint32(),
    shot_height: reader.readUint32(),
    item_width: reader.readUint32(),
    item_height: reader.readUint32(),
    walking_block_position: reader.readUint32(),
    flying_block_position: reader.readUint32(),
    walking_character_position: reader.readUint32(),
    flying_character_position: reader.readUint32(),
    block_display: reader.readUint32(),
    character_display: reader.readUint32(),
    shot_display: reader.readUint32(),
    item_display: reader.readUint32(),
    block_display_color: reader.readUint32(),
    character_display_color: reader.readUint32(),
    shot_display_color: reader.readUint32(),
    item_display_color: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writePlayerCollision(writer, data) {
  writer.writeUint32(data.walking_block_width ?? 0);
  writer.writeUint32(data.walking_block_height ?? 0);
  writer.writeUint32(data.flying_block_width ?? 0);
  writer.writeUint32(data.flying_block_height ?? 0);
  writer.writeUint32(data.walking_character_width ?? 0);
  writer.writeUint32(data.walking_character_height ?? 0);
  writer.writeUint32(data.flying_character_width ?? 0);
  writer.writeUint32(data.flying_character_height ?? 0);
  writer.writeUint32(data.shot_width ?? 0);
  writer.writeUint32(data.shot_height ?? 0);
  writer.writeUint32(data.item_width ?? 0);
  writer.writeUint32(data.item_height ?? 0);
  writer.writeUint32(data.walking_block_position ?? 0);
  writer.writeUint32(data.flying_block_position ?? 0);
  writer.writeUint32(data.walking_character_position ?? 0);
  writer.writeUint32(data.flying_character_position ?? 0);
  writer.writeUint32(data.block_display ?? 0);
  writer.writeUint32(data.character_display ?? 0);
  writer.writeUint32(data.shot_display ?? 0);
  writer.writeUint32(data.item_display ?? 0);
  writer.writeUint32(data.block_display_color ?? 0);
  writer.writeUint32(data.character_display_color ?? 0);
  writer.writeUint32(data.shot_display_color ?? 0);
  writer.writeUint32(data.item_display_color ?? 0);
}

// Parse EnemyCollision structure
function readEnemyCollision(reader) {
  return {
    walking_block_width: reader.readUint32(),
    walking_block_height: reader.readUint32(),
    flying_block_width: reader.readUint32(),
    flying_block_height: reader.readUint32(),
    walking_character_width: reader.readUint32(),
    walking_character_height: reader.readUint32(),
    flying_character_width: reader.readUint32(),
    flying_character_height: reader.readUint32(),
    shot_width: reader.readUint32(),
    shot_height: reader.readUint32(),
    walking_block_position: reader.readUint32(),
    flying_block_position: reader.readUint32(),
    walking_character_position: reader.readUint32(),
    flying_character_position: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeEnemyCollision(writer, data) {
  writer.writeUint32(data.walking_block_width ?? 0);
  writer.writeUint32(data.walking_block_height ?? 0);
  writer.writeUint32(data.flying_block_width ?? 0);
  writer.writeUint32(data.flying_block_height ?? 0);
  writer.writeUint32(data.walking_character_width ?? 0);
  writer.writeUint32(data.walking_character_height ?? 0);
  writer.writeUint32(data.flying_character_width ?? 0);
  writer.writeUint32(data.flying_character_height ?? 0);
  writer.writeUint32(data.shot_width ?? 0);
  writer.writeUint32(data.shot_height ?? 0);
  writer.writeUint32(data.walking_block_position ?? 0);
  writer.writeUint32(data.flying_block_position ?? 0);
  writer.writeUint32(data.walking_character_position ?? 0);
  writer.writeUint32(data.flying_character_position ?? 0);
}

// Parse ActorHitbox structure
function readActorHitbox(reader) {
  return {
    shot_width: reader.readUint32(),
    shot_height: reader.readUint32(),
    character_width: reader.readUint32(),
    character_height: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeActorHitbox(writer, data) {
  writer.writeUint32(data.shot_width ?? 0);
  writer.writeUint32(data.shot_height ?? 0);
  writer.writeUint32(data.character_width ?? 0);
  writer.writeUint32(data.character_height ?? 0);
}

// Parse DeathFade structure
function readDeathFade(reader) {
  return {
    list_size: reader.readUint32(),
    auto_disappear_left: reader.readUint32(),
    auto_disappear_right: reader.readUint32(),
    auto_disappear_top: reader.readUint32(),
    auto_disappear_bottom: reader.readUint32(),
    disappear_left_range: reader.readUint32(),
    disappear_right_range: reader.readUint32(),
    disappear_top_range: reader.readUint32(),
    disappear_bottom_range: reader.readUint32(),
    block_end: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeDeathFade(writer, data) {
  writer.writeUint32(data.list_size ?? 0);
  writer.writeUint32(data.auto_disappear_left ?? 0);
  writer.writeUint32(data.auto_disappear_right ?? 0);
  writer.writeUint32(data.auto_disappear_top ?? 0);
  writer.writeUint32(data.auto_disappear_bottom ?? 0);
  writer.writeUint32(data.disappear_left_range ?? 0);
  writer.writeUint32(data.disappear_right_range ?? 0);
  writer.writeUint32(data.disappear_top_range ?? 0);
  writer.writeUint32(data.disappear_bottom_range ?? 0);
  writer.writeUint32(data.block_end ?? 0);
}

// Parse StagePalette structure
function readStagePalette(reader) {
  return {
    blocks: readArray(reader, readBlock),
    characters: readArray(reader, readCharacter),
    items: readArray(reader, readItem)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeStagePalette(writer, data) {
  writeArray(writer, data.blocks, writeBlock);
  writeArray(writer, data.characters, writeCharacter);
  writeArray(writer, data.items, writeItem);
}


// Parse StageBlock structure
function readStageBlock(reader) {
  return {
    position: reader.readUint32(),
    block: readBlock(reader)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeStageBlock(writer, data) {
  writer.writeUint32(data.position ?? 0);
  writeBlock(writer, data.block);
}

/** @param {DataReader} reader stream reader */
function readBlock(reader) {
  return {
    header: reader.readUint32(),
    inherit_palette: reader.readUint8(),
    inherit_palette_data: reader.readUint16(),
    any_of_appearance_conditions_true: reader.readUint8(),
    appearance_condition_once_met_always_true: reader.readUint8(),
    image_number: reader.readUint16(),
    image_type: reader.readUint16(),
    unknown1: reader.readUint8(),
    in_front_of_character: reader.readUint8(),
    transparency: reader.readUint8(),
    mark_display: reader.readUint8(),
    mark_number: reader.readUint8(),
    unknown2: reader.readUint8(),
    block_type: reader.readUint8(),
    invalid_faction: reader.readUint8(),
    action: reader.readUint8(),
    action_parameter: reader.readUint32(),
    acquired_item_palette: reader.readUint8(),
    acquired_item_palette_data_number: reader.readUint16(),
    block_summon_invalid: reader.readUint8(),
    name: (() => {
      const strings_count = reader.readUint32();
      return strings_count > 0 ? readStdString(reader) : (() => { throw new Error("Missing block name ??"); })();
    })(),
    position_x: reader.readInt16(),
    position_y: reader.readInt16(),
    inherited_data_count: reader.readUint32(),
    inherit_block_name: reader.readUint8(),
    inherit_appearance_condition: reader.readUint8(),
    inherit_image: reader.readUint8(),
    inherit_in_front_of_character: reader.readUint8(),
    inherit_transparency: reader.readUint8(),
    inherit_mark: reader.readUint8(),
    inherit_block_type: reader.readUint8(),
    inherit_invalid_faction: reader.readUint8(),
    inherit_action: reader.readUint8(),
    inherit_acquired_item: reader.readUint8(),
    inherit_block_summon: reader.readUint8(),
    display_conditions: readArray(reader, readBasicCondition)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeBlock(writer, data) {
  writer.writeUint32(data.header ?? 0);
  writer.writeUint8(data.inherit_palette ?? 0);
  writer.writeUint16(data.inherit_palette_data ?? 0);
  writer.writeUint8(data.any_of_appearance_conditions_true ?? 0);
  writer.writeUint8(data.appearance_condition_once_met_always_true ?? 0);
  writer.writeUint16(data.image_number ?? 0);
  writer.writeUint16(data.image_type ?? 0);
  writer.writeUint8(data.unknown1 ?? 0);
  writer.writeUint8(data.in_front_of_character ?? 0);
  writer.writeUint8(data.transparency ?? 0);
  writer.writeUint8(data.mark_display ?? 0);
  writer.writeUint8(data.mark_number ?? 0);
  writer.writeUint8(data.unknown2 ?? 0);
  writer.writeUint8(data.block_type ?? 0);
  writer.writeUint8(data.invalid_faction ?? 0);
  writer.writeUint8(data.action ?? 0);
  writer.writeUint32(data.action_parameter ?? 0);
  writer.writeUint8(data.acquired_item_palette ?? 0);
  writer.writeUint16(data.acquired_item_palette_data_number ?? 0);
  writer.writeUint8(data.block_summon_invalid ?? 0);
  writer.writeUint32(1); // strings_count, must be 1
  writer.writeStdString(data.name ?? "");
  writer.writeInt16(data.position_x ?? 0);
  writer.writeInt16(data.position_y ?? 0);
  writer.writeUint32(data.inherited_data_count ?? 0);
  writer.writeUint8(data.inherit_block_name ?? 0);
  writer.writeUint8(data.inherit_appearance_condition ?? 0);
  writer.writeUint8(data.inherit_image ?? 0);
  writer.writeUint8(data.inherit_in_front_of_character ?? 0);
  writer.writeUint8(data.inherit_transparency ?? 0);
  writer.writeUint8(data.inherit_mark ?? 0);
  writer.writeUint8(data.inherit_block_type ?? 0);
  writer.writeUint8(data.inherit_invalid_faction ?? 0);
  writer.writeUint8(data.inherit_action ?? 0);
  writer.writeUint8(data.inherit_acquired_item ?? 0);
  writer.writeUint8(data.inherit_block_summon ?? 0);
  writeArray(writer, data.display_conditions, writeBasicCondition);
}

/** @param {DataReader} reader stream reader */
function readBasicCondition(reader) {
return {
    header: reader.readUint32(),
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
    unk5: reader.readUint8()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeBasicCondition(writer, data) {
    writer.writeUint32(data.header ?? 0);
    writer.writeUint8(data.type ?? 0);
    writer.writeUint32(data.right_side_constant ?? 0);
    writer.writeUint32(data.right_side_random_lower_limit ?? 0);
    writer.writeUint32(data.right_side_random_upper_limit ?? 0);
    writer.writeUint8(data.left_side_status_target ?? 0);
    writer.writeUint8(data.left_side_status_number ?? 0);
    writer.writeUint8(data.left_side_type ?? 0);
    writer.writeUint8(data.left_side_common_variable_or_stage_variable ?? 0);
    writer.writeUint16(data.left_side_variable_number ?? 0);
    writer.writeUint8(data.left_side_flow_variable_number ?? 0);
    writer.writeUint8(data.right_side_type ?? 0);
    writer.writeUint8(data.right_side_status_target ?? 0);
    writer.writeUint8(data.right_side_status_number ?? 0);
    writer.writeUint8(data.right_side_common_variable_or_stage_variable ?? 0);
    writer.writeUint16(data.right_side_variable_number ?? 0);
    writer.writeUint8(data.right_side_flow_variable_number ?? 0);
    writer.writeUint8(data.how_to_compare ?? 0);
    writer.writeUint8(data.specify_in_percent ?? 0);
    writer.writeUint8(data.left_side_coordinate_type ?? 0);
    writer.writeUint8(data.right_side_coordinate_type ?? 0);
    writer.writeUint8(data.left_side_gigantic_character_coordinate_position ?? 0);
    writer.writeUint8(data.right_side_gigantic_character_coordinate_position ?? 0);
    writer.writeUint8(data.unk1 ?? 0);
    writer.writeUint8(data.unk2 ?? 0);
    writer.writeUint8(data.unk3 ?? 0);
    writer.writeUint8(data.unk4 ?? 0);
    writer.writeUint8(data.unk5 ?? 0);
}


/** @param {DataReader} reader stream reader */
function readCharacter(reader) {
  return {
    header: reader.readUint32(),
    inherit_palette: reader.readUint8(),
    inherit_palette_data_number: reader.readUint16(),
    any_of_appearance_conditions_true: reader.readUint8(),
    appearance_condition_once_met_always_true: reader.readUint8(),
    facing_right: reader.readUint8(),
    number_of_doubles: reader.readUint8(),
    appearance_position_offset_x_bl: reader.readUint16(),
    appearance_position_offset_x_dot: reader.readUint16(),
    appearance_position_offset_y_bl: reader.readUint16(),
    appearance_position_offset_y_dot: reader.readUint16(),
    appearance_position_offset_x_flip_if_facing_right: reader.readUint8(),
    appearance_position_offset_y_flip_if_facing_right: reader.readUint8(),
    image_number: reader.readUint16(),
    image_type: reader.readUint8(),
    image_offset: reader.readUint16(),
    animation_set: reader.readUint16(),
    z_coordinate: reader.readUint8(),
    transparency: reader.readUint8(),
    initial_character_effect: reader.readUint16(),
    initial_character_effect_execution_type: reader.readUint8(),
    initial_character_effect_loop_execution: reader.readUint8(),
    character_effect_on_death: reader.readUint16(),
    character_effect_on_death_execution_type: reader.readUint8(),
    mark_display: reader.readUint8(),
    mark_number: reader.readUint16(),
    operation: reader.readUint16(),
    faction: reader.readUint8(),
    character_id: reader.readUint8(),
    flying: reader.readUint8(),
    direction_fixed: reader.readUint8(),
    invincible: reader.readUint8(),
    invincible_effect: reader.readUint8(),
    block: reader.readUint8(),
    gigantic: reader.readUint8(),
    synchronize_with_auto_scroll: reader.readUint8(),
    line_of_sight: reader.readUint8(),
    line_of_sight_range: reader.readUint8(),
    hp: reader.readUint32(),
    sp: reader.readUint32(),
    stopping_ease_during_inertial_movement: reader.readUint16(),
    body_hit_detection_range: reader.readUint8(),
    body_hit_power: reader.readUint32(),
    body_hit_impact: reader.readUint8(),
    body_hit_effect: reader.readUint16(),
    defense: reader.readUint32(),
    impact_resistance: reader.readUint8(),
    score: reader.readUint32(),
    holds_item_at_same_position: reader.readUint8(),
    has_group: reader.readUint8(),
    group_number: reader.readUint16(),
    action_condition_range: reader.readUint8(),
    action_condition_judgment_type: reader.readUint8(),
    character_name: (() => {
      const strings_count = reader.readUint32();
      if (strings_count > 0) {
        const name = readStdString(reader);
        for (let i = 1; i < strings_count; i++) {
          reader.readStdString();
        }
        return name;
      } else {
        for (let i = 1; i < strings_count; i++) {
          reader.readStdString();
        }
        return "";
      }
    })(),
    position_x: reader.readUint16(),
    position_y: reader.readUint16(),
    some_count: reader.readInt32(),
    inherited_data_count: reader.readUint32(),
    inherit_character_name: reader.readUint8(),
    inherit_operation: reader.readUint8(),
    inherit_faction: reader.readUint8(),
    inherit_character_id: reader.readUint8(),
    inherit_appearance_condition: reader.readUint8(),
    inherit_facing_right: reader.readUint8(),
    inherit_number_of_doubles: reader.readUint8(),
    inherit_initial_position_offset_x: reader.readUint8(),
    inherit_initial_position_offset_y: reader.readUint8(),
    inherit_image: reader.readUint8(),
    inherit_animation_set: reader.readUint8(),
    inherit_z_coordinate: reader.readUint8(),
    inherit_transparency: reader.readUint8(),
    inherit_initial_character_effect: reader.readUint8(),
    inherit_character_effect_on_death: reader.readUint8(),
    inherit_mark: reader.readUint8(),
    inherit_direction_fixed: reader.readUint8(),
    inherit_flying: reader.readUint8(),
    inherit_invincible: reader.readUint8(),
    inherit_block: reader.readUint8(),
    inherit_gigantic: reader.readUint8(),
    inherit_synchronize_with_auto_scroll: reader.readUint8(),
    inherit_line_of_sight: reader.readUint8(),
    inherit_hp: reader.readUint8(),
    inherit_sp: reader.readUint8(),
    inherit_body_hit_detection_range: reader.readUint8(),
    inherit_body_hit_power: reader.readUint8(),
    inherit_body_hit_impact: reader.readUint8(),
    inherit_body_hit_effect: reader.readUint8(),
    inherit_defense: reader.readUint8(),
    inherit_impact_resistance: reader.readUint8(),
    inherit_stopping_ease_during_inertial_movement: reader.readUint8(),
    inherit_action_condition: reader.readUint8(),
    inherit_group: reader.readUint8(),
    inherit_score: reader.readUint8(),
    inherit_holds_item_at_same_position: reader.readUint8(),
    inherit_action: reader.readUint8(),
    conditions: readArray(reader, readBasicCondition),
    flows: readArray(reader, readFlow)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeCharacter(writer, data) {
    writer.writeUint32(data.header ?? 0);
    writer.writeUint8(data.inherit_palette ?? 0);
    writer.writeUint16(data.inherit_palette_data_number ?? 0);
    writer.writeUint8(data.any_of_appearance_conditions_true ?? 0);
    writer.writeUint8(data.appearance_condition_once_met_always_true ?? 0);
    writer.writeUint8(data.facing_right ?? 0);
    writer.writeUint8(data.number_of_doubles ?? 0);
    writer.writeUint16(data.appearance_position_offset_x_bl ?? 0);
    writer.writeUint16(data.appearance_position_offset_x_dot ?? 0);
    writer.writeUint16(data.appearance_position_offset_y_bl ?? 0);
    writer.writeUint16(data.appearance_position_offset_y_dot ?? 0);
    writer.writeUint8(data.appearance_position_offset_x_flip_if_facing_right ?? 0);
    writer.writeUint8(data.appearance_position_offset_y_flip_if_facing_right ?? 0);
    writer.writeUint16(data.image_number ?? 0);
    writer.writeUint8(data.image_type ?? 0);
    writer.writeUint16(data.image_offset ?? 0);
    writer.writeUint16(data.animation_set ?? 0);
    writer.writeUint8(data.z_coordinate ?? 0);
    writer.writeUint8(data.transparency ?? 0);
    writer.writeUint16(data.initial_character_effect ?? 0);
    writer.writeUint8(data.initial_character_effect_execution_type ?? 0);
    writer.writeUint8(data.initial_character_effect_loop_execution ?? 0);
    writer.writeUint16(data.character_effect_on_death ?? 0);
    writer.writeUint8(data.character_effect_on_death_execution_type ?? 0);
    writer.writeUint8(data.mark_display ?? 0);
    writer.writeUint16(data.mark_number ?? 0);
    writer.writeUint16(data.operation ?? 0);
    writer.writeUint8(data.faction ?? 0);
    writer.writeUint8(data.character_id ?? 0);
    writer.writeUint8(data.flying ?? 0);
    writer.writeUint8(data.direction_fixed ?? 0);
    writer.writeUint8(data.invincible ?? 0);
    writer.writeUint8(data.invincible_effect ?? 0);
    writer.writeUint8(data.block ?? 0);
    writer.writeUint8(data.gigantic ?? 0);
    writer.writeUint8(data.synchronize_with_auto_scroll ?? 0);
    writer.writeUint8(data.line_of_sight ?? 0);
    writer.writeUint8(data.line_of_sight_range ?? 0);
    writer.writeUint32(data.hp ?? 0);
    writer.writeUint32(data.sp ?? 0);
    writer.writeUint16(data.stopping_ease_during_inertial_movement ?? 0);
    writer.writeUint8(data.body_hit_detection_range ?? 0);
    writer.writeUint32(data.body_hit_power ?? 0);
    writer.writeUint8(data.body_hit_impact ?? 0);
    writer.writeUint16(data.body_hit_effect ?? 0);
    writer.writeUint32(data.defense ?? 0);
    writer.writeUint8(data.impact_resistance ?? 0);
    writer.writeUint32(data.score ?? 0);
    writer.writeUint8(data.holds_item_at_same_position ?? 0);
    writer.writeUint8(data.has_group ?? 0);
    writer.writeUint16(data.group_number ?? 0);
    writer.writeUint8(data.action_condition_range ?? 0);
    writer.writeUint8(data.action_condition_judgment_type ?? 0);
    
    if (data.character_name && data.character_name.length > 0) {
        writer.writeUint32(1);
        writer.writeStdString(data.character_name);
    } else {
        writer.writeUint32(0);
    }
    
    writer.writeUint16(data.position_x ?? 0);
    writer.writeUint16(data.position_y ?? 0);
    writer.writeInt32(data.some_count ?? 0);
    writer.writeUint32(data.inherited_data_count ?? 0);
    writer.writeUint8(data.inherit_character_name ?? 0);
    writer.writeUint8(data.inherit_operation ?? 0);
    writer.writeUint8(data.inherit_faction ?? 0);
    writer.writeUint8(data.inherit_character_id ?? 0);
    writer.writeUint8(data.inherit_appearance_condition ?? 0);
    writer.writeUint8(data.inherit_facing_right ?? 0);
    writer.writeUint8(data.inherit_number_of_doubles ?? 0);
    writer.writeUint8(data.inherit_initial_position_offset_x ?? 0);
    writer.writeUint8(data.inherit_initial_position_offset_y ?? 0);
    writer.writeUint8(data.inherit_image ?? 0);
    writer.writeUint8(data.inherit_animation_set ?? 0);
    writer.writeUint8(data.inherit_z_coordinate ?? 0);
    writer.writeUint8(data.inherit_transparency ?? 0);
    writer.writeUint8(data.inherit_initial_character_effect ?? 0);
    writer.writeUint8(data.inherit_character_effect_on_death ?? 0);
    writer.writeUint8(data.inherit_mark ?? 0);
    writer.writeUint8(data.inherit_direction_fixed ?? 0);
    writer.writeUint8(data.inherit_flying ?? 0);
    writer.writeUint8(data.inherit_invincible ?? 0);
    writer.writeUint8(data.inherit_block ?? 0);
    writer.writeUint8(data.inherit_gigantic ?? 0);
    writer.writeUint8(data.inherit_synchronize_with_auto_scroll ?? 0);
    writer.writeUint8(data.inherit_line_of_sight ?? 0);
    writer.writeUint8(data.inherit_hp ?? 0);
    writer.writeUint8(data.inherit_sp ?? 0);
    writer.writeUint8(data.inherit_body_hit_detection_range ?? 0);
    writer.writeUint8(data.inherit_body_hit_power ?? 0);
    writer.writeUint8(data.inherit_body_hit_impact ?? 0);
    writer.writeUint8(data.inherit_body_hit_effect ?? 0);
    writer.writeUint8(data.inherit_defense ?? 0);
    writer.writeUint8(data.inherit_impact_resistance ?? 0);
    writer.writeUint8(data.inherit_stopping_ease_during_inertial_movement ?? 0);
    writer.writeUint8(data.inherit_action_condition ?? 0);
    writer.writeUint8(data.inherit_group ?? 0);
    writer.writeUint8(data.inherit_score ?? 0);
    writer.writeUint8(data.inherit_holds_item_at_same_position ?? 0);
    writer.writeUint8(data.inherit_action ?? 0);
    writeArray(writer, data.conditions, writeBasicCondition);
    writeArray(writer, data.flows, writeFlow);
}

/** @param {DataReader} reader stream reader */
function readFlow(reader) {
  const header = reader.readUint32();
  if (header !== 10) {
    throw new Error(
      `Invalid Flow header: expected 10, got ${header} at offset ${reader.position - 4}`
    );
  }
  return {
    header: header,
    id: reader.readUint8(),
    group: reader.readUint8(),
    test_play_only: reader.readUint8(),
    basic_condition_judgment_type: reader.readUint8(),
    basic_condition_once_met_always_met: reader.readUint8(),
    timing: reader.readUint8(),
    target_character_involved_in_timing: reader.readUint8(),
    target_number_of_character_involved_in_timing: reader.readUint8(),
    ease_of_input_with_multiple_key_conditions: reader.readUint8(),
    allow_continuous_execution_by_holding_key: reader.readUint8(),
    memo_length: reader.readUint32(),
    memo: readStdString(reader),
    conditions: readArray(reader, readBasicCondition),
    key_conditions: readArray(reader, readKeyCondition),
    commands: readArray(reader, readCommand)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeFlow(writer, data) {
    writer.writeUint32(data.header ?? 10);
    writer.writeUint8(data.id ?? 0);
    writer.writeUint8(data.group ?? 0);
    writer.writeUint8(data.test_play_only ?? 0);
    writer.writeUint8(data.basic_condition_judgment_type ?? 0);
    writer.writeUint8(data.basic_condition_once_met_always_met ?? 0);
    writer.writeUint8(data.timing ?? 0);
    writer.writeUint8(data.target_character_involved_in_timing ?? 0);
    writer.writeUint8(data.target_number_of_character_involved_in_timing ?? 0);
    writer.writeUint8(data.ease_of_input_with_multiple_key_conditions ?? 0);
    writer.writeUint8(data.allow_continuous_execution_by_holding_key ?? 0);
    
    // memo_length is implicit in writeStdString
    const memo = data.memo || "";
    writer.writeUint32(memo.length);
    writer.writeStdString(memo);

    writeArray(writer, data.conditions, writeBasicCondition);
    writeArray(writer, data.key_conditions, writeKeyCondition);
    writeArray(writer, data.commands, writeCommand);
}

/** @param {DataReader} reader stream reader */
function readKeyCondition(reader) {
  return {
    header: reader.readUint32(),
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
    f_key: reader.readUint8()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeKeyCondition(writer, data) {
    writer.writeUint32(data.header ?? 0);
    writer.writeUint8(data.right_and_left_to_front_and_back ?? 0);
    writer.writeUint16(data.minimum_input_time ?? 0);
    writer.writeUint16(data.maximum_input_time ?? 0);
    writer.writeUint8(data.input_time_1_to_infinity ?? 0);
    writer.writeUint8(data.judgment_type ?? 0);
    writer.writeUint32(data.unknown ?? 0);
    writer.writeUint32(data.number_of_key_data ?? 0);
    writer.writeUint8(data.direction_key_neutral ?? 0);
    writer.writeUint8(data.left_key ?? 0);
    writer.writeUint8(data.right_key ?? 0);
    writer.writeUint8(data.up_key ?? 0);
    writer.writeUint8(data.down_key ?? 0);
    writer.writeUint8(data.up_left_key ?? 0);
    writer.writeUint8(data.down_left_key ?? 0);
    writer.writeUint8(data.up_right_key ?? 0);
    writer.writeUint8(data.down_right_key ?? 0);
    writer.writeUint8(data.any_direction_key ?? 0);
    writer.writeUint8(data.action_key_neutral ?? 0);
    writer.writeUint8(data.z_key ?? 0);
    writer.writeUint8(data.x_key ?? 0);
    writer.writeUint8(data.c_key ?? 0);
    writer.writeUint8(data.v_key ?? 0);
    writer.writeUint8(data.a_key ?? 0);
    writer.writeUint8(data.s_key ?? 0);
    writer.writeUint8(data.d_key ?? 0);
    writer.writeUint8(data.f_key ?? 0);
}


/** @param {DataReader} reader stream reader */
function readItem(reader) {
  return {
    header: reader.readUint32(),
    inherit_palette: reader.readUint8(),
    inherit_palette_data_number: reader.readUint16(),
    any_of_appearance_conditions_true: reader.readUint8(),
    appearance_condition_once_met_always_true: reader.readUint8(),
    appearance_position_offset_x_dot: reader.readUint16(),
    appearance_position_offset_y_dot: reader.readUint16(),
    image_number: reader.readUint16(),
    image_type: reader.readUint8(),
    frame: reader.readUint16(),
    z_coordinate: reader.readUint8(),
    transparency: reader.readUint8(),
    mark_display: reader.readUint8(),
    mark_number: reader.readUint16(),
    display_above_head_on_acquisition: reader.readUint8(),
    acquisition_type: reader.readUint8(),
    gigantic: reader.readUint8(),
    sound_effect: reader.readUint16(),
    item_name_length: reader.readUint32(), // always 1
    item_name: reader.readStdString(), // Assuming readString is an alias for readStdString
    position_x: reader.readUint16(),
    position_y: reader.readUint16(),
    number_of_inherited_data: reader.readUint32(),
    inherit_item_name: reader.readUint8(),
    inherit_appearance_condition: reader.readUint8(),
    inherit_initial_position_offset_x: reader.readUint8(),
    inherit_initial_position_offset_y: reader.readUint8(),
    inherit_image: reader.readUint8(),
    inherit_z_coordinate: reader.readUint8(),
    inherit_transparency: reader.readUint8(),
    inherit_mark: reader.readUint8(),
    inherit_gigantic: reader.readUint8(),
    inherit_acquisition_type: reader.readUint8(),
    inherit_display_above_head_on_acquisition: reader.readUint8(),
    inherit_sound_effect: reader.readUint8(),
    inherit_effect: reader.readUint8(),
    conditions: readArray(reader, readBasicCondition),
    item_effects: readArray(reader, readItemEffect)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeItem(writer, data) {
    writer.writeUint32(data.header ?? 0);
    writer.writeUint8(data.inherit_palette ?? 0);
    writer.writeUint16(data.inherit_palette_data_number ?? 0);
    writer.writeUint8(data.any_of_appearance_conditions_true ?? 0);
    writer.writeUint8(data.appearance_condition_once_met_always_true ?? 0);
    writer.writeUint16(data.appearance_position_offset_x_dot ?? 0);
    writer.writeUint16(data.appearance_position_offset_y_dot ?? 0);
    writer.writeUint16(data.image_number ?? 0);
    writer.writeUint8(data.image_type ?? 0);
    writer.writeUint16(data.frame ?? 0);
    writer.writeUint8(data.z_coordinate ?? 0);
    writer.writeUint8(data.transparency ?? 0);
    writer.writeUint8(data.mark_display ?? 0);
    writer.writeUint16(data.mark_number ?? 0);
    writer.writeUint8(data.display_above_head_on_acquisition ?? 0);
    writer.writeUint8(data.acquisition_type ?? 0);
    writer.writeUint8(data.gigantic ?? 0);
    writer.writeUint16(data.sound_effect ?? 0);
    writer.writeUint32(1); // item_name_length, always 1
    writer.writeStdString(data.item_name ?? "");
    writer.writeUint16(data.position_x ?? 0);
    writer.writeUint16(data.position_y ?? 0);
    writer.writeUint32(data.number_of_inherited_data ?? 0);
    writer.writeUint8(data.inherit_item_name ?? 0);
    writer.writeUint8(data.inherit_appearance_condition ?? 0);
    writer.writeUint8(data.inherit_initial_position_offset_x ?? 0);
    writer.writeUint8(data.inherit_initial_position_offset_y ?? 0);
    writer.writeUint8(data.inherit_image ?? 0);
    writer.writeUint8(data.inherit_z_coordinate ?? 0);
    writer.writeUint8(data.inherit_transparency ?? 0);
    writer.writeUint8(data.inherit_mark ?? 0);
    writer.writeUint8(data.inherit_gigantic ?? 0);
    writer.writeUint8(data.inherit_acquisition_type ?? 0);
    writer.writeUint8(data.inherit_display_above_head_on_acquisition ?? 0);
    writer.writeUint8(data.inherit_sound_effect ?? 0);
    writer.writeUint8(data.inherit_effect ?? 0);
    writeArray(writer, data.conditions, writeBasicCondition);
    writeArray(writer, data.item_effects, writeItemEffect);
}


// ---------------------------------------------------------------------------------
// MARK:ItemEffect

/** @param {DataReader} reader stream reader */
function readItemEffect(reader) {
    const effect = {
    header: reader.readUint32(),
    unk1: reader.readInt8(),
    type: reader.readUint8()
  };
  if (effect.header !== 8) {
    throw new Error(
      `Invalid item effect header: expected 8, got ${effect.header} at offset ${reader.position - 6}`
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
        `Unknown item effect type: ${effect.type} at offset ${reader.position - 1}`
      );
  }
  return effect;
}

/** @param {DataWriter} writer @param {object} effect */
function writeItemEffect(writer, effect) {
    writer.writeUint32(effect.header ?? 8);
    writer.writeInt8(effect.unk1 ?? 0);
    writer.writeUint8(effect.type ?? 0);

    const details = effect.details || {};
    switch (effect.type) {
        case 1:
            writeFlowChangeDetails(writer, details);
            break;
        case 2:
            writeStageClearDetails(writer, details);
            break;
        case 3:
            writeGameWaitDetails(writer, details);
            break;
        case 4:
            writeMessageDetails(writer, details);
            break;
        case 5:
            writeWarpDetails(writer, details);
            break;
        case 7:
            writeStatusOperationDetails(writer, details);
            break;
        case 8:
            writeStatusOperation2Details(writer, details);
            break;
        case 9:
            writeDisappearanceDetails(writer, details);
            break;
        case 10:
            writeItemAcquisitionDetails(writer, details);
            break;
        case 11:
            writeGraphicChangeDetails(writer, details);
            break;
        case 12:
            writeBasicAnimationSetChangeDetails(writer, details);
            break;
        case 13:
            writeAnimationExecutionDetails(writer, details);
            break;
        case 14:
            writeEffectExecutionDetails(writer, details);
            break;
        case 15:
            writeCharacterEffectExecutionDetails(writer, details);
            break;
        case 16:
            writeScreenEffectExecutionDetails(writer, details);
            break;
        case 17:
            writePictureDisplayDetails(writer, details);
            break;
        case 19:
            writeBackgroundChangeDetails(writer, details);
            break;
        case 20:
            writeSoundEffectPlaybackDetails(writer, details);
            break;
        case 21:
            writeBGMPlaybackDetails(writer, details);
            break;
        case 22:
            writeCodeExecutionDetails(writer, details);
            break;
        case 23:
            writeArrangementDetails(writer, details);
            break;
        case 24:
            writeLoopDetails(writer, details);
            break;
        default:
            throw new Error(`Unknown item effect type to write: ${effect.type}`);
    }
}


/** @param {DataReader} reader stream reader */
function parseFlowChangeDetails(reader) {
  const data = {
    bytes1_30: reader.readBytes(30)
  };
  data.flows = readArray(reader, readFlow);
  Object.assign(data, {
    bytes69_72: reader.readBytes(4),
    operation: reader.readUint32(),
    bytes77_80: reader.readBytes(4)
  });
  return data;
}

/** @param {DataWriter} writer @param {object} data */
function writeFlowChangeDetails(writer, data) {
    writer.writeBytes(data.bytes1_30 ?? new Uint8Array(30));
    writeArray(writer, data.flows, writeFlow);
    writer.writeBytes(data.bytes69_72 ?? new Uint8Array(4));
    writer.writeUint32(data.operation ?? 0);
    writer.writeBytes(data.bytes77_80 ?? new Uint8Array(4));
}

/** @param {DataReader} reader stream reader */
function parseStageClearDetails(reader) {
  return {
    bytes1_14: reader.readBytes(14),
    path: readStdString(reader),
    bytes19_38: reader.readBytes(20),
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
    add_clear_text_to_replay: reader.readUint32()
  }
}

/** @param {DataWriter} writer @param {object} data */
function writeStageClearDetails(writer, data) {
    writer.writeBytes(data.bytes1_14 ?? new Uint8Array(14));
    writer.writeStdString(data.path ?? "");
    writer.writeBytes(data.bytes19_38 ?? new Uint8Array(20));
    writer.writeUint32(data.stage_transition ?? 0);
    writer.writeUint32(data.number ?? 0);
    writer.writeUint32(data.change_world_map_position ?? 0);
    writer.writeUint32(data.world_map_position_x ?? 0);
    writer.writeUint32(data.world_map_position_y ?? 0);
    writer.writeUint32(data.change_initial_position ?? 0);
    writer.writeUint32(data.initial_position_x ?? 0);
    writer.writeUint32(data.initial_position_y ?? 0);
    writer.writeUint32(data.initial_position_main_character_direction ?? 0);
    writer.writeUint32(data.execute_autosave ?? 0);
    writer.writeUint32(data.add_clear_text_to_replay ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseGameWaitDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_38: reader.readBytes(33),
    game_wait_execution_time: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeGameWaitDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes6_38 ?? new Uint8Array(33));
    writer.writeUint32(data.game_wait_execution_time ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseMessageDetails(reader) {
  return {
    bytes1_14: reader.readBytes(14),
    message: readStdString(reader),
    bytes19_38: reader.readBytes(20),
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
    assign_return_value_to_flow_variable: reader.readUint32()
  }
}

/** @param {DataWriter} writer @param {object} data */
function writeMessageDetails(writer, data) {
    writer.writeBytes(data.bytes1_14 ?? new Uint8Array(14));
    writer.writeStdString(data.message ?? "");
    writer.writeBytes(data.bytes19_38 ?? new Uint8Array(20));
    writer.writeUint32(data.display_position_specification_method ?? 0);
    writer.writeUint32(data.coordinate_x ?? 0);
    writer.writeUint32(data.coordinate_y ?? 0);
    writer.writeUint32(data.display_position_offset_x ?? 0);
    writer.writeUint32(data.display_position_offset_y ?? 0);
    writer.writeUint32(data.auto_adjust_to_not_go_off_screen ?? 0);
    writer.writeUint32(data.display_time_specification_method ?? 0);
    writer.writeUint32(data.display_time ?? 0);
    writer.writeUint32(data.pause ?? 0);
    writer.writeUint32(data.display_variables ?? 0);
    writer.writeUint32(data.follow_screen ?? 0);
    writer.writeUint32(data.auto_update ?? 0);
    writer.writeUint32(data.message_id_present ?? 0);
    writer.writeUint32(data.message_id ?? 0);
    writer.writeUint32(data.window_display ?? 0);
    writer.writeUint32(data.message_clear ?? 0);
    writer.writeUint32(data.update_interval ?? 0);
    writer.writeUint32(data.instant_display ?? 0);
    writer.writeUint32(data.coordinate_unit ?? 0);
    writer.writeUint32(data.set_options ?? 0);
    writer.writeUint32(data.assign_return_value_to_flow_variable ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseWarpDetails(reader) {
  return {
    bytes1_26: reader.readBytes(26),
    setting_type: reader.readUint8(),
    direction: reader.readUint8(),
    bytes29_33: reader.readBytes(5),
    target_x_present: reader.readUint8(),
    target_y_present: reader.readUint8(),
    target_x_bl: reader.readUint16(),
    target_y_bl: reader.readUint16(),
    target_x_dot: reader.readUint16(),
    target_y_dot: reader.readUint16(),
    target_type: reader.readUint8(),
    target_unit: reader.readUint8(),
    gigantic_character_coordinate_position: reader.readUint8(),
    bytes47_49: reader.readBytes(3),
    target_x_flip_if_facing_right: reader.readUint8(),
    target_y_flip_if_facing_right: reader.readUint8(),
    bytes52_59: reader.readBytes(8),
    distance: reader.readUint16(),
    distance_double: reader.readUint16(),
    bytes64_101: reader.readBytes(38),
    assign_return_value_to_flow: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeWarpDetails(writer, data) {
    writer.writeBytes(data.bytes1_26 ?? new Uint8Array(26));
    writer.writeUint8(data.setting_type ?? 0);
    writer.writeUint8(data.direction ?? 0);
    writer.writeBytes(data.bytes29_33 ?? new Uint8Array(5));
    writer.writeUint8(data.target_x_present ?? 0);
    writer.writeUint8(data.target_y_present ?? 0);
    writer.writeUint16(data.target_x_bl ?? 0);
    writer.writeUint16(data.target_y_bl ?? 0);
    writer.writeUint16(data.target_x_dot ?? 0);
    writer.writeUint16(data.target_y_dot ?? 0);
    writer.writeUint8(data.target_type ?? 0);
    writer.writeUint8(data.target_unit ?? 0);
    writer.writeUint8(data.gigantic_character_coordinate_position ?? 0);
    writer.writeBytes(data.bytes47_49 ?? new Uint8Array(3));
    writer.writeUint8(data.target_x_flip_if_facing_right ?? 0);
    writer.writeUint8(data.target_y_flip_if_facing_right ?? 0);
    writer.writeBytes(data.bytes52_59 ?? new Uint8Array(8));
    writer.writeUint16(data.distance ?? 0);
    writer.writeUint16(data.distance_double ?? 0);
    writer.writeBytes(data.bytes64_101 ?? new Uint8Array(38));
    writer.writeUint32(data.assign_return_value_to_flow ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseStatusOperationDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    operation_target_type: reader.readUint8(),
    bytes40_43: reader.readBytes(4),
    operation_target_variable_type: reader.readUint8(),
    bytes45_46: reader.readBytes(2),
    operation_target_variable_number: reader.readUint16(),
    bytes49_52: reader.readBytes(4),
    operation_target_target: reader.readUint8(),
    bytes54_56: reader.readBytes(3),
    operation_target_status: reader.readUint8(),
    byte58: reader.readBytes(1),
    operation_target_flow_variable_number: reader.readUint8(),
    bytes60_62: reader.readBytes(3),
    operator_type: reader.readUint8(),
    bytes64_66: reader.readBytes(3),
    calculation_content_type: reader.readUint32(),
    calculation_content_constant: reader.readUint32(),
    calculation_content_random_lower_limit: reader.readUint32(),
    calculation_content_random_upper_limit: reader.readUint32(),
    calculation_content_variable_type: reader.readUint32(),
    calculation_content_variable_number: reader.readUint32(),
    calculation_content_target: reader.readUint32(),
    calculation_content_status: reader.readUint32(),
    calculation_content_flow_variable_number: reader.readUint32(),
    bytes103_138: reader.readBytes(36)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeStatusOperationDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint8(data.operation_target_type ?? 0);
    writer.writeBytes(data.bytes40_43 ?? new Uint8Array(4));
    writer.writeUint8(data.operation_target_variable_type ?? 0);
    writer.writeBytes(data.bytes45_46 ?? new Uint8Array(2));
    writer.writeUint16(data.operation_target_variable_number ?? 0);
    writer.writeBytes(data.bytes49_52 ?? new Uint8Array(4));
    writer.writeUint8(data.operation_target_target ?? 0);
    writer.writeBytes(data.bytes54_56 ?? new Uint8Array(3));
    writer.writeUint8(data.operation_target_status ?? 0);
    writer.writeBytes(data.byte58 ?? new Uint8Array(1));
    writer.writeUint8(data.operation_target_flow_variable_number ?? 0);
    writer.writeBytes(data.bytes60_62 ?? new Uint8Array(3));
    writer.writeUint8(data.operator_type ?? 0);
    writer.writeBytes(data.bytes64_66 ?? new Uint8Array(3));
    writer.writeUint32(data.calculation_content_type ?? 0);
    writer.writeUint32(data.calculation_content_constant ?? 0);
    writer.writeUint32(data.calculation_content_random_lower_limit ?? 0);
    writer.writeUint32(data.calculation_content_random_upper_limit ?? 0);
    writer.writeUint32(data.calculation_content_variable_type ?? 0);
    writer.writeUint32(data.calculation_content_variable_number ?? 0);
    writer.writeUint32(data.calculation_content_target ?? 0);
    writer.writeUint32(data.calculation_content_status ?? 0);
    writer.writeUint32(data.calculation_content_flow_variable_number ?? 0);
    writer.writeBytes(data.bytes103_138 ?? new Uint8Array(36));
}

/** @param {DataReader} reader stream reader */
function parseStatusOperation2Details(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    target: reader.readUint32(),
    status: reader.readUint32(),
    on: reader.readUint32(),
    bytes51_62: reader.readBytes(12)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeStatusOperation2Details(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.target ?? 0);
    writer.writeUint32(data.status ?? 0);
    writer.writeUint32(data.on ?? 0);
    writer.writeBytes(data.bytes51_62 ?? new Uint8Array(12));
}

/** @param {DataReader} reader stream reader */
function parseDisappearanceDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    target: reader.readUint32(),
    faction: reader.readUint32(),
    range: reader.readUint32(),
    assign_return_value_to_flow_variable: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeDisappearanceDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.target ?? 0);
    writer.writeUint32(data.faction ?? 0);
    writer.writeUint32(data.range ?? 0);
    writer.writeUint32(data.assign_return_value_to_flow_variable ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseItemAcquisitionDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    palette_type: reader.readUint32(),
    palette_data_number: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeItemAcquisitionDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.palette_type ?? 0);
    writer.writeUint32(data.palette_data_number ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseGraphicChangeDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    image_type: reader.readUint32(),
    image_number: reader.readUint32(),
    offset: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeGraphicChangeDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.image_type ?? 0);
    writer.writeUint32(data.image_number ?? 0);
    writer.writeUint32(data.offset ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseBasicAnimationSetChangeDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    animation_set: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeBasicAnimationSetChangeDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.animation_set ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseAnimationExecutionDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes: reader.readBytes(41)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeAnimationExecutionDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes ?? new Uint8Array(41));
}

/** @param {DataReader} reader stream reader */
function parseEffectExecutionDetails(reader) {
  return { bytes1_38: reader.readBytes(38), bytes: reader.readBytes(40) };
}

/** @param {DataWriter} writer @param {object} data */
function writeEffectExecutionDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeBytes(data.bytes ?? new Uint8Array(40));
}

/** @param {DataReader} reader stream reader */
function parseCharacterEffectExecutionDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    effect: reader.readUint32(),
    execution_type: reader.readUint32(),
    loop_execution: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeCharacterEffectExecutionDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.effect ?? 0);
    writer.writeUint32(data.execution_type ?? 0);
    writer.writeUint32(data.loop_execution ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseScreenEffectExecutionDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    effect: reader.readUint32(),
    execution_type: reader.readUint32(),
    loop_execution: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeScreenEffectExecutionDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.effect ?? 0);
    writer.writeUint32(data.execution_type ?? 0);
    writer.writeUint32(data.loop_execution ?? 0);
}

/** @param {DataReader} reader stream reader */
function parsePictureDisplayDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes: reader.readBytes(113)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writePictureDisplayDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes ?? new Uint8Array(113));
}

/** @param {DataReader} reader stream reader */
function parseBackgroundChangeDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes: reader.readBytes(41)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeBackgroundChangeDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes ?? new Uint8Array(41));
}

/** @param {DataReader} reader stream reader */
function parseSoundEffectPlaybackDetails(reader) {
  return {
    bytes1_7: reader.readBytes(7),
    play_if_outside_screen: reader.readUint8(),
    bytes9_38: reader.readBytes(30),
    sound_effect: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeSoundEffectPlaybackDetails(writer, data) {
    writer.writeBytes(data.bytes1_7 ?? new Uint8Array(7));
    writer.writeUint8(data.play_if_outside_screen ?? 0);
    writer.writeBytes(data.bytes9_38 ?? new Uint8Array(30));
    writer.writeUint32(data.sound_effect ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseBGMPlaybackDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes: reader.readBytes(41)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeBGMPlaybackDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes ?? new Uint8Array(41));
}

/** @param {DataReader} reader stream reader */
function parseCodeExecutionDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_14: reader.readBytes(9),
    code: readStdString(reader),
    bytes19_38: reader.readBytes(20)
  }
}

/** @param {DataWriter} writer @param {object} data */
function writeCodeExecutionDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes6_14 ?? new Uint8Array(9));
    writer.writeStdString(data.code ?? "");
    writer.writeBytes(data.bytes19_38 ?? new Uint8Array(20));
}

/** @param {DataReader} reader stream reader */
function parseArrangementDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    command: reader.readUint32(),
    parameter: reader.readUint32(),
    operator_type: reader.readUint32(),
    variable_type: reader.readUint32(),
    variable_number: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeArrangementDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.command ?? 0);
    writer.writeUint32(data.parameter ?? 0);
    writer.writeUint32(data.operator_type ?? 0);
    writer.writeUint32(data.variable_type ?? 0);
    writer.writeUint32(data.variable_number ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseLoopDetails(reader) {
  return {
    bytes1_38: reader.readBytes(38),
    repeat_count: reader.readUint32(),
    command_count: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeLoopDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeUint32(data.repeat_count ?? 0);
    writer.writeUint32(data.command_count ?? 0);
}
// ----------------------------------------------------------------------------------
// MARK:COMMANDS

/** @param {DataReader} reader stream reader */
function readCommand(reader) {
    const command = {
        header: reader.readUint32(),
        unk1: reader.readUint8(),
        type: reader.readUint8(),
    };
  if (command.header !== 8) {
    throw new Error(
      `Invalid command header: expected 8, got ${command.header} at offset ${reader.position - 6}`
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
    // TODO: command 33
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
        `Unknown command type: ${command.type} at offset ${reader.position - 1}`
      );
  }
  return command;
}

/** @param {DataWriter} writer @param {object} command */
function writeCommand(writer, command) {
    writer.writeUint32(command.header ?? 8);
    writer.writeUint8(command.unk1 ?? 0);
    writer.writeUint8(command.type ?? 0);

    const details = command.details || {};
    switch(command.type) {
        case 1:
            writeWaitDetails(writer, details);
            break;
        case 2:
            writeLinearMovementDetails(writer, details);
            break;
        case 3:
            writeGroundMovementDetails(writer, details);
            break;
        case 4:
            writeCircularMovementDetails(writer, details);
            break;
        case 5:
            writeChargeMovementDetails(writer, details);
            break;
        case 6:
            writeGuidedMovementDetails(writer, details);
            break;
        case 7:
            writeScreenOutsideAvoidanceMovementDetails(writer, details);
            break;
        case 8:
            writeMovementInvalidationDetails(writer, details);
            break;
        case 9:
            writeDirectionChangeDetails(writer, details);
            break;
        case 10:
            writeJumpDetails(writer, details);
            break;
        case 11:
            writeShotDetails(writer, details);
            break;
        case 12:
            writeSwordDetails(writer, details);
            break;
        case 13:
            writeBlockSummonDetails(writer, details);
            break;
        case 14:
            writeCharacterSummonDetails(writer, details);
            break;
        case 15:
            writeItemSummonDetails(writer, details);
            break;
        case 16:
            writeFlowOperationDetails(writer, details);
            break;
        case 17:
            writeStageClearDetails(writer, details);
            break;
        case 18:
            writeGameWaitDetails(writer, details);
            break;
        case 19:
            writeMessageDetails(writer, details);
            break;
        case 20:
            writeWarpDetails(writer, details);
            break;
        case 21:
            writeTargetSettingDetails(writer, details);
            break;
        case 22:
            writeStatusOperationDetails(writer, details);
            break;
        case 23:
            writeStatusOperation2Details(writer, details);
            break;
        case 24:
            writeDisappearanceDetails(writer, details);
            break;
        case 25:
            writeItemAcquisitionDetails(writer, details);
            break;
        case 26:
            writeGraphicChangeDetails(writer, details);
            break;
        case 27:
            writeBasicAnimationSetChangeDetails(writer, details);
            break;
        case 28:
            writeAnimationExecutionDetails(writer, details);
            break;
        case 29:
            writeEffectExecutionDetails(writer, details);
            break;
        case 30:
            writeCharacterEffectExecutionDetails(writer, details);
            break;
        case 31:
            writeScreenEffectExecutionDetails(writer, details);
            break;
        case 32:
            writePictureDisplayDetails(writer, details);
            break;
        // command 33
        case 34:
            writeBackgroundChangeDetails(writer, details);
            break;
        case 35:
            writeSoundEffectPlaybackDetails(writer, details);
            break;
        case 36:
            writeBGMPlaybackDetails(writer, details);
            break;
        case 37:
            writeCodeExecutionDetails(writer, details);
            break;
        case 38:
            writeArrangementDetails(writer, details);
            break;
        case 39:
            writeLoopDetails(writer, details);
            break;
        default:
            throw new Error(`Unknown command type to write: ${command.type}`);
    }
}

/** @param {DataReader} reader stream reader */
function parseWaitDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes: reader.readBytes(33)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeWaitDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes ?? new Uint8Array(33));
}

/** @param {DataReader} reader stream reader */
function parseLinearMovementDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_8: reader.readBytes(3),
    animation_and_other_type: reader.readUint16(),
    bytes11_26: reader.readBytes(16),
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
    byte46: reader.readBytes(1),
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
    bytes65_68: reader.readBytes(4),
    inertia_present: reader.readUint8(),
    inertia_max_speed: reader.readUint16(),
    inertia_speed_correction_on_direction_change: reader.readFloat64(),
    animation_type: reader.readUint8(),
    bytes81_101: reader.readBytes(21)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeLinearMovementDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes6_8 ?? new Uint8Array(3));
    writer.writeUint16(data.animation_and_other_type ?? 0);
    writer.writeBytes(data.bytes11_26 ?? new Uint8Array(16));
    writer.writeUint8(data.movement_direction_setting_type ?? 0);
    writer.writeUint8(data.movement_direction_direction ?? 0);
    writer.writeUint16(data.movement_direction_angle ?? 0);
    writer.writeUint16(data.movement_direction_angle_double ?? 0);
    writer.writeUint8(data.movement_direction_angle_reverse_rotation_if_facing_right ?? 0);
    writer.writeUint8(data.movement_direction_target_x_present ?? 0);
    writer.writeUint8(data.movement_direction_target_y_present ?? 0);
    writer.writeUint16(data.movement_direction_target_x ?? 0);
    writer.writeUint16(data.movement_direction_target_y ?? 0);
    writer.writeUint16(data.movement_direction_target_x_dot ?? 0);
    writer.writeUint16(data.movement_direction_target_y_dot ?? 0);
    writer.writeUint8(data.movement_direction_target_type ?? 0);
    writer.writeUint8(data.movement_direction_target_coordinate_unit ?? 0);
    writer.writeBytes(data.byte46 ?? new Uint8Array(1));
    writer.writeUint8(data.movement_direction_execute_until_target_coordinate_reached ?? 0);
    writer.writeUint8(data.movement_direction_invalidate_horizontal_movement ?? 0);
    writer.writeUint8(data.movement_direction_invalidate_vertical_movement ?? 0);
    writer.writeUint8(data.movement_direction_target_x_flip_if_facing_right ?? 0);
    writer.writeUint8(data.movement_direction_target_y_flip_if_facing_right ?? 0);
    writer.writeUint8(data.movement_direction_reverse_speed_if_direction_changes ?? 0);
    writer.writeUint8(data.movement_direction_prevent_blur ?? 0);
    writer.writeUint8(data.movement_direction_dont_change_character_direction ?? 0);
    writer.writeUint8(data.time_speed_distance_setting_type ?? 0);
    writer.writeUint16(data.time_speed_distance_speed ?? 0);
    writer.writeUint16(data.time_speed_distance_speed_double ?? 0);
    writer.writeUint16(data.time_speed_distance_distance ?? 0);
    writer.writeUint16(data.time_speed_distance_distance_double ?? 0);
    writer.writeUint8(data.time_speed_distance_distance_unit ?? 0);
    writer.writeBytes(data.bytes65_68 ?? new Uint8Array(4));
    writer.writeUint8(data.inertia_present ?? 0);
    writer.writeUint16(data.inertia_max_speed ?? 0);
    writer.writeFloat64(data.inertia_speed_correction_on_direction_change ?? 0.0);
    writer.writeUint8(data.animation_type ?? 0);
    writer.writeBytes(data.bytes81_101 ?? new Uint8Array(21));
}


/** @param {DataReader} reader stream reader */
function parseGenericMovementDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_101: reader.readBytes(96)
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

/** @param {DataReader} reader stream reader */
function parseDirectionChangeDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    bytes6_42: reader.readBytes(37)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeDirectionChangeDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeBytes(data.bytes6_42 ?? new Uint8Array(37));
}

/** @param {DataReader} reader stream reader */
function parseJumpDetails(reader) {
  return {
    bytes1_5: reader.readBytes(5),
    sound_effect: reader.readUint16(),
    play_if_outside_screen: reader.readUint8(),
    animation: reader.readUint16(),
    bytes11_38: reader.readBytes(28),
    jump_type: reader.readUint32(),
    max_jump_inertial_movement_speed: reader.readUint32(),
    max_jump_height: reader.readUint32(),
    min_jump_inertial_movement_speed: reader.readUint32(),
    min_jump_height: reader.readUint32()
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeJumpDetails(writer, data) {
    writer.writeBytes(data.bytes1_5 ?? new Uint8Array(5));
    writer.writeUint16(data.sound_effect ?? 0);
    writer.writeUint8(data.play_if_outside_screen ?? 0);
    writer.writeUint16(data.animation ?? 0);
    writer.writeBytes(data.bytes11_38 ?? new Uint8Array(28));
    writer.writeUint32(data.jump_type ?? 0);
    writer.writeUint32(data.max_jump_inertial_movement_speed ?? 0);
    writer.writeUint32(data.max_jump_height ?? 0);
    writer.writeUint32(data.min_jump_inertial_movement_speed ?? 0);
    writer.writeUint32(data.min_jump_height ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseShotDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_if_outside_screen: reader.readUint8(),
    animation: reader.readUint16(),
    bytes11_30: reader.readBytes(20),
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
    penetrate_actors: reader.readUint8(),
    penetrate_block_actors: reader.readUint8(),
    disappear_on_hitting_shot: reader.readUint8(),
    value_for_disappearing_on_hitting_shot: reader.readUint8(),
    power: reader.readUint32(),
    bytes109_110: reader.readBytes(2),
    impact: reader.readUint8(),
    effect: reader.readUint16(),
    acquired_item_palette_type: reader.readUint8(),
    acquired_item_palette_number: reader.readUint16(),
    bytes117_125: reader.readBytes(9),
    attack: reader.readUint8(),
    attack_id: reader.readUint8(),
    bytes128_143: reader.readBytes(16)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeShotDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeUint16(data.sound_effect ?? 0);
    writer.writeUint8(data.play_if_outside_screen ?? 0);
    writer.writeUint16(data.animation ?? 0);
    writer.writeBytes(data.bytes11_30 ?? new Uint8Array(20));
    writer.writeUint8(data.number_of_shots_fired ?? 0);
    writer.writeUint8(data.formation ?? 0);
    writer.writeUint16(data.firing_parameter1 ?? 0);
    writer.writeUint16(data.firing_parameter2 ?? 0);
    writer.writeUint16(data.firing_parameter3 ?? 0);
    writer.writeUint8(data.target ?? 0);
    writer.writeUint8(data.direction ?? 0);
    writer.writeUint8(data.set_angle_to_target ?? 0);
    writer.writeUint8(data.firing_target ?? 0);
    writer.writeUint16(data.angle_offset ?? 0);
    writer.writeUint16(data.angle_offset_double ?? 0);
    writer.writeUint8(data.angle_offset_reverse_rotation_if_facing_right ?? 0);
    writer.writeUint16(data.angle_dispersion ?? 0);
    writer.writeUint8(data.change_firing_position_according_to_angle ?? 0);
    writer.writeUint8(data.number_of_doubles ?? 0);
    writer.writeUint16(data.firing_position_offset_x ?? 0);
    writer.writeUint16(data.firing_position_offset_x_double ?? 0);
    writer.writeUint16(data.firing_position_offset_y ?? 0);
    writer.writeUint16(data.firing_position_offset_y_double ?? 0);
    writer.writeUint8(data.firing_position_offset_x_flip_if_facing_right ?? 0);
    writer.writeUint8(data.firing_position_offset_y_flip_if_facing_right ?? 0);
    writer.writeUint16(data.graphic ?? 0);
    writer.writeUint8(data.z_coordinate ?? 0);
    writer.writeUint8(data.transparency ?? 0);
    writer.writeUint8(data.faction_same_as_user ?? 0);
    writer.writeUint16(data.faction ?? 0);
    writer.writeUint16(data.gigantic ?? 0);
    writer.writeUint8(data.movement_type ?? 0);
    writer.writeUint16(data.movement_type_parameter1 ?? 0);
    writer.writeUint16(data.movement_type_parameter2 ?? 0);
    writer.writeUint16(data.movement_type_parameter3 ?? 0);
    writer.writeUint8(data.movement_target ?? 0);
    writer.writeUint8(data.synchronize_with_auto_scroll ?? 0);
    writer.writeUint16(data.speed ?? 0);
    writer.writeUint16(data.speed_double ?? 0);
    writer.writeUint8(data.acceleration_enabled ?? 0);
    writer.writeUint16(data.acceleration ?? 0);
    writer.writeUint16(data.acceleration_double ?? 0);
    writer.writeUint16(data.flight_distance ?? 0);
    writer.writeUint8(data.flight_distance_valid ?? 0);
    writer.writeUint16(data.flight_distance_double ?? 0);
    writer.writeUint8(data.flight_distance_does_not_disappear_at_end ?? 0);
    writer.writeUint8(data.disappearance_time_valid ?? 0);
    writer.writeUint16(data.disappearance_time ?? 0);
    writer.writeUint16(data.disappearance_time_double ?? 0);
    writer.writeUint8(data.penetrate_blocks ?? 0);
    writer.writeUint8(data.penetrate_actors ?? 0);
    writer.writeUint8(data.penetrate_block_actors ?? 0);
    writer.writeUint8(data.disappear_on_hitting_shot ?? 0);
    writer.writeUint8(data.value_for_disappearing_on_hitting_shot ?? 0);
    writer.writeUint32(data.power ?? 0);
    writer.writeBytes(data.bytes109_110 ?? new Uint8Array(2));
    writer.writeUint8(data.impact ?? 0);
    writer.writeUint16(data.effect ?? 0);
    writer.writeUint8(data.acquired_item_palette_type ?? 0);
    writer.writeUint16(data.acquired_item_palette_number ?? 0);
    writer.writeBytes(data.bytes117_125 ?? new Uint8Array(9));
    writer.writeUint8(data.attack ?? 0);
    writer.writeUint8(data.attack_id ?? 0);
    writer.writeBytes(data.bytes128_143 ?? new Uint8Array(16));
}

/** @param {DataReader} reader stream reader */
function parseSwordDetails(reader) {
  return {
    execution_time: reader.readUint32(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_if_outside_screen: reader.readUint8(),
    animation: reader.readUint16(),
    bytes11_63: reader.readBytes(53),
    z_coordinate: reader.readUint8(),
    transparency: reader.readUint8(),
    faction_same_as_user: reader.readUint8(),
    faction: reader.readUint16(),
    gigantic: reader.readUint16(),
    sword_type: reader.readUint32(),
    bytes75_104: reader.readBytes(30),
    power: reader.readUint32(),
    bytes109_110: reader.readBytes(2),
    impact: reader.readUint8(),
    effect: reader.readUint16(),
    acquired_item_palette_type: reader.readUint8(),
    acquired_item_palette_number: reader.readUint16(),
    bytes117_125: reader.readBytes(9),
    attack: reader.readUint8(),
    attack_id: reader.readUint8(),
    bytes128_143: reader.readBytes(16)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeSwordDetails(writer, data) {
    writer.writeUint32(data.execution_time ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeUint16(data.sound_effect ?? 0);
    writer.writeUint8(data.play_if_outside_screen ?? 0);
    writer.writeUint16(data.animation ?? 0);
    writer.writeBytes(data.bytes11_63 ?? new Uint8Array(53));
    writer.writeUint8(data.z_coordinate ?? 0);
    writer.writeUint8(data.transparency ?? 0);
    writer.writeUint8(data.faction_same_as_user ?? 0);
    writer.writeUint16(data.faction ?? 0);
    writer.writeUint16(data.gigantic ?? 0);
    writer.writeUint32(data.sword_type ?? 0);
    writer.writeBytes(data.bytes75_104 ?? new Uint8Array(30));
    writer.writeUint32(data.power ?? 0);
    writer.writeBytes(data.bytes109_110 ?? new Uint8Array(2));
    writer.writeUint8(data.impact ?? 0);
    writer.writeUint16(data.effect ?? 0);
    writer.writeUint8(data.acquired_item_palette_type ?? 0);
    writer.writeUint16(data.acquired_item_palette_number ?? 0);
    writer.writeBytes(data.bytes117_125 ?? new Uint8Array(9));
    writer.writeUint8(data.attack ?? 0);
    writer.writeUint8(data.attack_id ?? 0);
    writer.writeBytes(data.bytes128_143 ?? new Uint8Array(16));
}

/** @param {DataReader} reader stream reader */
function parseBlockSummonDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_sound_effect_if_outside_screen: reader.readUint8(),
    animation: reader.readUint8(),
    bytes10_30: reader.readBytes(21),
    count: reader.readUint8(),
    formation: reader.readUint8(),
    interval: reader.readUint16(),
    number_of_columns: reader.readUint16(),
    column_interval: reader.readUint16(),
    target: reader.readUint8(),
    direction: reader.readUint8(),
    byte41: reader.readBytes(1),
    target2: reader.readUint8(),
    bytes43_51: reader.readBytes(9),
    summon_position_offset_x: reader.readUint32(),
    summon_position_offset_y: reader.readUint32(),
    summon_position_offset_x_flip: reader.readUint8(),
    summon_position_offset_y_flip: reader.readUint8(),
    bytes62_66: reader.readBytes(5),
    faction: reader.readUint8(),
    bytes68_88: reader.readBytes(21),
    existence_time: reader.readUint16(),
    existence_time_present: reader.readUint8(),
    bytes92_119: reader.readBytes(28),
    palette_type: reader.readUint8(),
    palette_data_number: reader.readUint16(),
    faction_specification_method: reader.readUint8(),
    set_acquired_score_to_0: reader.readUint8(),
    direction_flip: reader.readUint8(),
    attack: reader.readUint8(),
    attack_flow: reader.readUint8(),
    bytes128_143: reader.readBytes(16),
    return_value_to_flow_variable: reader.readUint8(),
    bytes145_147: reader.readBytes(3)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeBlockSummonDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeUint16(data.sound_effect ?? 0);
    writer.writeUint8(data.play_sound_effect_if_outside_screen ?? 0);
    writer.writeUint8(data.animation ?? 0);
    writer.writeBytes(data.bytes10_30 ?? new Uint8Array(21));
    writer.writeUint8(data.count ?? 0);
    writer.writeUint8(data.formation ?? 0);
    writer.writeUint16(data.interval ?? 0);
    writer.writeUint16(data.number_of_columns ?? 0);
    writer.writeUint16(data.column_interval ?? 0);
    writer.writeUint8(data.target ?? 0);
    writer.writeUint8(data.direction ?? 0);
    writer.writeBytes(data.byte41 ?? new Uint8Array(1));
    writer.writeUint8(data.target2 ?? 0);
    writer.writeBytes(data.bytes43_51 ?? new Uint8Array(9));
    writer.writeUint32(data.summon_position_offset_x ?? 0);
    writer.writeUint32(data.summon_position_offset_y ?? 0);
    writer.writeUint8(data.summon_position_offset_x_flip ?? 0);
    writer.writeUint8(data.summon_position_offset_y_flip ?? 0);
    writer.writeBytes(data.bytes62_66 ?? new Uint8Array(5));
    writer.writeUint8(data.faction ?? 0);
    writer.writeBytes(data.bytes68_88 ?? new Uint8Array(21));
    writer.writeUint16(data.existence_time ?? 0);
    writer.writeUint8(data.existence_time_present ?? 0);
    writer.writeBytes(data.bytes92_119 ?? new Uint8Array(28));
    writer.writeUint8(data.palette_type ?? 0);
    writer.writeUint16(data.palette_data_number ?? 0);
    writer.writeUint8(data.faction_specification_method ?? 0);
    writer.writeUint8(data.set_acquired_score_to_0 ?? 0);
    writer.writeUint8(data.direction_flip ?? 0);
    writer.writeUint8(data.attack ?? 0);
    writer.writeUint8(data.attack_flow ?? 0);
    writer.writeBytes(data.bytes128_143 ?? new Uint8Array(16));
    writer.writeUint8(data.return_value_to_flow_variable ?? 0);
    writer.writeBytes(data.bytes145_147 ?? new Uint8Array(3));
}

/** @param {DataReader} reader stream reader */
function parseCharacterSummonDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_sound_effect_if_outside_screen: reader.readUint8(),
    animation: reader.readUint8(),
    bytes10_30: reader.readBytes(21),
    count: reader.readUint8(),
    formation: reader.readUint8(),
    interval: reader.readUint16(),
    number_of_columns: reader.readUint16(),
    column_interval: reader.readUint16(),
    target: reader.readUint8(),
    direction: reader.readUint8(),
    byte41: reader.readBytes(1),
    target2: reader.readUint8(),
    bytes43_51: reader.readBytes(9),
    summon_position_offset_x: reader.readUint32(),
    summon_position_offset_y: reader.readUint32(),
    summon_position_offset_x_flip: reader.readUint8(),
    summon_position_offset_y_flip: reader.readUint8(),
    bytes62_66: reader.readBytes(5),
    faction: reader.readUint8(),
    bytes68_88: reader.readBytes(21),
    existence_time: reader.readUint16(),
    existence_time_present: reader.readUint8(),
    bytes92_119: reader.readBytes(28),
    palette_type: reader.readUint8(),
    palette_data_number: reader.readUint16(),
    faction_specification_method: reader.readUint8(),
    set_acquired_score_to_0: reader.readUint8(),
    direction_flip: reader.readUint8(),
    attack: reader.readUint8(),
    attack_flow: reader.readUint8(),
    bytes128_143: reader.readBytes(16),
    return_value_to_flow_variable: reader.readUint8(),
    bytes145_147: reader.readBytes(3)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeCharacterSummonDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeUint16(data.sound_effect ?? 0);
    writer.writeUint8(data.play_sound_effect_if_outside_screen ?? 0);
    writer.writeUint8(data.animation ?? 0);
    writer.writeBytes(data.bytes10_30 ?? new Uint8Array(21));
    writer.writeUint8(data.count ?? 0);
    writer.writeUint8(data.formation ?? 0);
    writer.writeUint16(data.interval ?? 0);
    writer.writeUint16(data.number_of_columns ?? 0);
    writer.writeUint16(data.column_interval ?? 0);
    writer.writeUint8(data.target ?? 0);
    writer.writeUint8(data.direction ?? 0);
    writer.writeBytes(data.byte41 ?? new Uint8Array(1));
    writer.writeUint8(data.target2 ?? 0);
    writer.writeBytes(data.bytes43_51 ?? new Uint8Array(9));
    writer.writeUint32(data.summon_position_offset_x ?? 0);
    writer.writeUint32(data.summon_position_offset_y ?? 0);
    writer.writeUint8(data.summon_position_offset_x_flip ?? 0);
    writer.writeUint8(data.summon_position_offset_y_flip ?? 0);
    writer.writeBytes(data.bytes62_66 ?? new Uint8Array(5));
    writer.writeUint8(data.faction ?? 0);
    writer.writeBytes(data.bytes68_88 ?? new Uint8Array(21));
    writer.writeUint16(data.existence_time ?? 0);
    writer.writeUint8(data.existence_time_present ?? 0);
    writer.writeBytes(data.bytes92_119 ?? new Uint8Array(28));
    writer.writeUint8(data.palette_type ?? 0);
    writer.writeUint16(data.palette_data_number ?? 0);
    writer.writeUint8(data.faction_specification_method ?? 0);
    writer.writeUint8(data.set_acquired_score_to_0 ?? 0);
    writer.writeUint8(data.direction_flip ?? 0);
    writer.writeUint8(data.attack ?? 0);
    writer.writeUint8(data.attack_flow ?? 0);
    writer.writeBytes(data.bytes128_143 ?? new Uint8Array(16));
    writer.writeUint8(data.return_value_to_flow_variable ?? 0);
    writer.writeBytes(data.bytes145_147 ?? new Uint8Array(3));
}

/** @param {DataReader} reader stream reader */
function parseItemSummonDetails(reader) {
  return {
    execution_time: reader.readUint16(),
    execution_time_double: reader.readUint16(),
    parallel_execution: reader.readUint8(),
    sound_effect: reader.readUint16(),
    play_sound_effect_if_outside_screen: reader.readUint8(),
    animation: reader.readUint8(),
    bytes10_30: reader.readBytes(21),
    count: reader.readUint8(),
    formation: reader.readUint8(),
    interval: reader.readUint16(),
    number_of_columns: reader.readUint16(),
    column_interval: reader.readUint16(),
    target: reader.readUint8(),
    direction: reader.readUint8(),
    byte41: reader.readUint8(),
    target2: reader.readUint8(),
    bytes43_51: reader.readBytes(9),
    summon_position_offset_x: reader.readUint32(),
    summon_position_offset_y: reader.readUint32(),
    summon_position_offset_x_flip: reader.readUint8(),
    summon_position_offset_y_flip: reader.readUint8(),
    bytes62_66: reader.readBytes(5),
    faction: reader.readUint8(),
    bytes68_88: reader.readBytes(21),
    existence_time: reader.readUint16(),
    existence_time_present: reader.readUint8(),
    bytes92_119: reader.readBytes(28),
    palette_type: reader.readUint8(),
    palette_data_number: reader.readUint16(),
    faction_specification_method: reader.readUint8(),
    set_acquired_score_to_0: reader.readUint8(),
    direction_flip: reader.readUint8(),
    attack: reader.readUint8(),
    attack_flow: reader.readUint8(),
    bytes128_143: reader.readBytes(16)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeItemSummonDetails(writer, data) {
    writer.writeUint16(data.execution_time ?? 0);
    writer.writeUint16(data.execution_time_double ?? 0);
    writer.writeUint8(data.parallel_execution ?? 0);
    writer.writeUint16(data.sound_effect ?? 0);
    writer.writeUint8(data.play_sound_effect_if_outside_screen ?? 0);
    writer.writeUint8(data.animation ?? 0);
    writer.writeBytes(data.bytes10_30 ?? new Uint8Array(21));
    writer.writeUint8(data.count ?? 0);
    writer.writeUint8(data.formation ?? 0);
    writer.writeUint16(data.interval ?? 0);
    writer.writeUint16(data.number_of_columns ?? 0);
    writer.writeUint16(data.column_interval ?? 0);
    writer.writeUint8(data.target ?? 0);
    writer.writeUint8(data.direction ?? 0);
    writer.writeUint8(data.byte41 ?? 0);
    writer.writeUint8(data.target2 ?? 0);
    writer.writeBytes(data.bytes43_51 ?? new Uint8Array(9));
    writer.writeUint32(data.summon_position_offset_x ?? 0);
    writer.writeUint32(data.summon_position_offset_y ?? 0);
    writer.writeUint8(data.summon_position_offset_x_flip ?? 0);
    writer.writeUint8(data.summon_position_offset_y_flip ?? 0);
    writer.writeBytes(data.bytes62_66 ?? new Uint8Array(5));
    writer.writeUint8(data.faction ?? 0);
    writer.writeBytes(data.bytes68_88 ?? new Uint8Array(21));
    writer.writeUint16(data.existence_time ?? 0);
    writer.writeUint8(data.existence_time_present ?? 0);
    writer.writeBytes(data.bytes92_119 ?? new Uint8Array(28));
    writer.writeUint8(data.palette_type ?? 0);
    writer.writeUint16(data.palette_data_number ?? 0);
    writer.writeUint8(data.faction_specification_method ?? 0);
    writer.writeUint8(data.set_acquired_score_to_0 ?? 0);
    writer.writeUint8(data.direction_flip ?? 0);
    writer.writeUint8(data.attack ?? 0);
    writer.writeUint8(data.attack_flow ?? 0);
    writer.writeBytes(data.bytes128_143 ?? new Uint8Array(16));
}

/** @param {DataReader} reader stream reader */
function parseFlowOperationDetails(reader) {
  const data = {
    bytes1_34: reader.readBytes(34),
    condition_present: reader.readUint8(),
    judgment_type: reader.readUint8(),
    bytes37_40: reader.readBytes(4)
  };
  data.conditions = readArray(reader, readBasicCondition);
  data.bytes45_52 = reader.readBytes(8);
  data.operation = reader.readUint32();
  data.target_flow = reader.readUint32();
  data.id = reader.readUint32();
  data.target_character = reader.readUint32();
  data.assign_return_value_to_flow_variable = reader.readUint32();
  return data;
}

/** @param {DataWriter} writer @param {object} data */
function writeFlowOperationDetails(writer, data) {
    writer.writeBytes(data.bytes1_34 ?? new Uint8Array(34));
    writer.writeUint8(data.condition_present ?? 0);
    writer.writeUint8(data.judgment_type ?? 0);
    writer.writeBytes(data.bytes37_40 ?? new Uint8Array(4));
    writeArray(writer, data.conditions, writeBasicCondition);
    writer.writeBytes(data.bytes45_52 ?? new Uint8Array(8));
    writer.writeUint32(data.operation ?? 0);
    writer.writeUint32(data.target_flow ?? 0);
    writer.writeUint32(data.id ?? 0);
    writer.writeUint32(data.target_character ?? 0);
    writer.writeUint32(data.assign_return_value_to_flow_variable ?? 0);
}

/** @param {DataReader} reader stream reader */
function parseTargetSettingDetails(reader) {
  return { bytes1_38: reader.readBytes(38), bytes39_106: reader.readBytes(68) };
}

/** @param {DataWriter} writer @param {object} data */
function writeTargetSettingDetails(writer, data) {
    writer.writeBytes(data.bytes1_38 ?? new Uint8Array(38));
    writer.writeBytes(data.bytes39_106 ?? new Uint8Array(68));
}

// --------------------------------------------------------
// MARK:STAGE

// Parse StageCharacter structure

/** @param {DataReader} reader stream reader */
function readStageCharacter(reader) {
  return {
    position: reader.readUint32(),
    character: readCharacter(reader)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeStageCharacter(writer, data) {
    writer.writeUint32(data.position ?? 0);
    writeCharacter(writer, data.character);
}

// Parse StageItem structure

/** @param {DataReader} reader stream reader */
function readStageItem(reader) {
  return {
    position: reader.readUint32(),
    item: readItem(reader)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeStageItem(writer, data) {
    writer.writeUint32(data.position ?? 0);
    writeItem(writer, data.item);
}

// Parse Background structure

/** @param {DataReader} reader stream reader */
function readBackground(reader) {
  return {
    start: reader.readUint32(),
    display_from_start: reader.readUint32(),
    specified_by_color: reader.readUint32(),
    color_number: reader.readUint32(),
    display_in_front_of_character: reader.readUint32(),
    horizontal_scroll_speed: reader.readFloat64(),
    vertical_scroll_speed: reader.readFloat64(),
    horizontal_auto_scroll: reader.readUint32(),
    vertical_auto_scroll: reader.readUint32(),
    horizontal_auto_scroll_speed: reader.readFloat64(),
    vertical_auto_scroll_speed: reader.readFloat64(),
    bytes61_80: reader.readBytes(20),
    image_path: readStdString(reader)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeBackground(writer, data) {
    writer.writeUint32(data.start ?? 0);
    writer.writeUint32(data.display_from_start ?? 0);
    writer.writeUint32(data.specified_by_color ?? 0);
    writer.writeUint32(data.color_number ?? 0);
    writer.writeUint32(data.display_in_front_of_character ?? 0);
    writer.writeFloat64(data.horizontal_scroll_speed ?? 0.0);
    writer.writeFloat64(data.vertical_scroll_speed ?? 0.0);
    writer.writeUint32(data.horizontal_auto_scroll ?? 0);
    writer.writeUint32(data.vertical_auto_scroll ?? 0);
    writer.writeFloat64(data.horizontal_auto_scroll_speed ?? 0.0);
    writer.writeFloat64(data.vertical_auto_scroll_speed ?? 0.0);
    writer.writeBytes(data.bytes61_80 ?? new Uint8Array(20));
    writer.writeStdString(data.image_path ?? "");
}

// Parse StageVar structure
function readStageVar(reader) {
  return {
    some_count: reader.readUint32(),
    some_count_too: reader.readUint32(),
    variable_name: readStdString(reader)
  };
}

/** @param {DataWriter} writer @param {object} data */
function writeStageVar(writer, data) {
    writer.writeUint32(data.some_count ?? 0);
    writer.writeUint32(data.some_count_too ?? 0);
    writer.writeStdString(data.variable_name ?? "");
}

// Parse the complete StagePaletteFile
function parseStagePaletteFile(reader) {
  // Read the main header fields
  const magic = reader.readUint32(); // Should be 0x000003FC (1020)
  
  if (magic !== 1020) {
    throw new Error(`Invalid STG4 magic: ${magic}, expected 1020`);
  }
  
  return {
    some_count: reader.readUint32(), // 99 - std::vector<int>
    
    item_width: reader.readUint32(),
    
    chunk_width: reader.readUint32(), // 32
    chunk_pow: reader.readUint32(), // 5
   
    height: reader.readUint32(),
    
    enable_horizontal_scroll_minimum: reader.readUint32(),
    enable_horizontal_scroll_maximum: reader.readUint32(),
    enable_vertical_scroll_minimum: reader.readUint32(), // top left
    enable_vertical_scroll_maximum: reader.readUint32(), // bottom
    
    horizontal_scroll_minimum_value: reader.readUint32(),
    horizontal_scroll_maximum_value: reader.readUint32(),
    vertical_scroll_minimum_value: reader.readUint32(),
    vertical_scroll_maximum_value: reader.readUint32(),
    
    // Page 2
    frame_rate: reader.readUint32(),
    
    enable_time_limit: reader.readUint32(),
    time_limit_duration: reader.readUint32(),  // seconds
    warning_sound_start_time: reader.readUint32(),
    
    enable_side_scroll: reader.readUint32(),
    enable_vertical_scroll: reader.readUint32(),
    autoscroll_speed: reader.readUint32(),
    vertical_scroll_speed: reader.readUint32(),
    
    gravity: reader.readFloat64(),
    
    hit_detection_level: reader.readUint32(),
    character_shot_collision_detection_accuracy: reader.readUint32(),
    
    bgm_number: reader.readUint32(),
    bgm_loop_playback: reader.readUint32(),
    dont_restart_bgm_if_no_change: reader.readUint32(),
    
    enable_z_coordinate: reader.readUint32(),
    
    inherit_status_from_stock: reader.readUint32(),
    store_status_to_stock: reader.readUint32(),
    show_status_window: reader.readUint32(),
    
    switch_scene_immediately_on_clear: reader.readUint32(),
    allow_replay_save: reader.readUint32(),
    
    // show text images
    show_stage: reader.readUint32(),
    show_ready: reader.readUint32(),
    show_clear: reader.readUint32(),
    show_gameover: reader.readUint32(),
    
    player_collide: readPlayerCollision(reader),
    
    enemy_collide: readEnemyCollision(reader),
    
    item_collision_width: reader.readUint32(),
    item_collision_height: reader.readUint32(),   

    player_hitbox: readActorHitbox(reader),
    enemy_hitbox: readActorHitbox(reader),
    
    // Okay this is original, but this limit the number of "ctrl-z"
    undo_max_times: reader.readUint32(),

    x_coordinate_upper_limit: reader.readUint32(),
    y_coordinate_upper_limit: reader.readUint32(),

    unk75: reader.readUint32(),
    unk76: reader.readUint32(),
    unk77: reader.readUint32(),
    unk78: reader.readUint32(),
    unk79: reader.readUint32(),

    unk80: reader.readUint32(),
    unk81: reader.readUint32(),
    unk82: reader.readUint32(),
    unk83: reader.readUint32(),
    unk84: reader.readUint32(),
    unk85: reader.readUint32(),
    unk86: reader.readUint32(),
    
    disable_damage_outside_screen: reader.readUint32(),

    player_invincibility_from_same_enemy_duration: reader.readUint32(),
    player_invincibility_duration: reader.readUint32(),

    enemy_invincibility_from_same_player_duration: reader.readUint32(),
    enemy_invincibility_duration: reader.readUint32(),
    
    stage_names: reader.readUint32(), // 1 -  std::vector<std::string>
    stage_name: readStdString(reader),
    
    ranking_size: reader.readUint32(), // 5  - std::vector<int>
    // Ranking
    ranking_score: reader.readUint32(),
    ranking_remaining_time: reader.readUint32(),
    ranking_clear_time: reader.readUint32(),
    ranking_remaining_hp: reader.readUint32(),
    ranking_remaining_sp: reader.readUint32(),

    // DeathFade : fade animation on death
    nonblock_enemy_death: readDeathFade(reader),
    block_enemy_death: readDeathFade(reader),
    item_death: readDeathFade(reader),
    player_death: readDeathFade(reader),
    enemy_death: readDeathFade(reader),

    // Stage Palette - add the header  FC 03 00 00 and it's a  plt4 file !
    palette: readStagePalette(reader),

    // std::vector<StageBlock>
    blocks: readArray(reader, readStageBlock),

    // std::vector<StageCharacter>
    characters: readArray(reader, readStageCharacter),

    // std::vector<Item>
    items: readArray(reader, readStageItem),

    // std::vector<Background>
    backgrounds: readArray(reader, readBackground),

    //currently fixed 1000
    stage_vars: readArray(reader, readStageVar),
    
    end: (() => {
      let e = reader.readUint32() // value should be 123456789
      if (e !== 123456789) {
        console.warn(`Unexpected end marker: expected 123456789, got ${e}`);
      }
      return e;
    })()
  
  }
  
}

/**
 * @param {DataWriter} writer
 * @param {object} data
 */
function writeStagePaletteFile(writer, data) {
    writer.writeUint32(1020); // magic
    
    writer.writeUint32(data.some_count ?? 99);
    writer.writeUint32(data.item_width ?? 0);
    writer.writeUint32(data.chunk_width ?? 32);
    writer.writeUint32(data.chunk_pow ?? 5);
    writer.writeUint32(data.height ?? 0);
    writer.writeUint32(data.enable_horizontal_scroll_minimum ?? 0);
    writer.writeUint32(data.enable_horizontal_scroll_maximum ?? 0);
    writer.writeUint32(data.enable_vertical_scroll_minimum ?? 0);
    writer.writeUint32(data.enable_vertical_scroll_maximum ?? 0);
    writer.writeUint32(data.horizontal_scroll_minimum_value ?? 0);
    writer.writeUint32(data.horizontal_scroll_maximum_value ?? 0);
    writer.writeUint32(data.vertical_scroll_minimum_value ?? 0);
    writer.writeUint32(data.vertical_scroll_maximum_value ?? 0);

    // Page 2
    writer.writeUint32(data.frame_rate ?? 60);
    writer.writeUint32(data.enable_time_limit ?? 0);
    writer.writeUint32(data.time_limit_duration ?? 0);
    writer.writeUint32(data.warning_sound_start_time ?? 0);
    writer.writeUint32(data.enable_side_scroll ?? 0);
    writer.writeUint32(data.enable_vertical_scroll ?? 0);
    writer.writeUint32(data.autoscroll_speed ?? 0);
    writer.writeUint32(data.vertical_scroll_speed ?? 0);

    writer.writeFloat64(data.gravity ?? 0.0);

    writer.writeUint32(data.hit_detection_level ?? 0);
    writer.writeUint32(data.character_shot_collision_detection_accuracy ?? 0);
    writer.writeUint32(data.bgm_number ?? 0);
    writer.writeUint32(data.bgm_loop_playback ?? 0);
    writer.writeUint32(data.dont_restart_bgm_if_no_change ?? 0);
    writer.writeUint32(data.enable_z_coordinate ?? 0);
    writer.writeUint32(data.inherit_status_from_stock ?? 0);
    writer.writeUint32(data.store_status_to_stock ?? 0);
    writer.writeUint32(data.show_status_window ?? 0);
    writer.writeUint32(data.switch_scene_immediately_on_clear ?? 0);
    writer.writeUint32(data.allow_replay_save ?? 0);

    writer.writeUint32(data.show_stage ?? 1);
    writer.writeUint32(data.show_ready ?? 1);
    writer.writeUint32(data.show_clear ?? 1);
    writer.writeUint32(data.show_gameover ?? 1);

    writePlayerCollision(writer, data.player_collide || {});
    writeEnemyCollision(writer, data.enemy_collide || {});

    writer.writeUint32(data.item_collision_width ?? 0);
    writer.writeUint32(data.item_collision_height ?? 0);

    writeActorHitbox(writer, data.player_hitbox || {});
    writeActorHitbox(writer, data.enemy_hitbox || {});

    writer.writeUint32(data.undo_max_times ?? 0);
    writer.writeUint32(data.x_coordinate_upper_limit ?? 0);
    writer.writeUint32(data.y_coordinate_upper_limit ?? 0);

    writer.writeUint32(data.unk75 ?? 0);
    writer.writeUint32(data.unk76 ?? 0);
    writer.writeUint32(data.unk77 ?? 0);
    writer.writeUint32(data.unk78 ?? 0);
    writer.writeUint32(data.unk79 ?? 0);
    writer.writeUint32(data.unk80 ?? 0);
    writer.writeUint32(data.unk81 ?? 0);
    writer.writeUint32(data.unk82 ?? 0);
    writer.writeUint32(data.unk83 ?? 0);
    writer.writeUint32(data.unk84 ?? 0);
    writer.writeUint32(data.unk85 ?? 0);
    writer.writeUint32(data.unk86 ?? 0);

    writer.writeUint32(data.disable_damage_outside_screen ?? 0);
    writer.writeUint32(data.player_invincibility_from_same_enemy_duration ?? 0);
    writer.writeUint32(data.player_invincibility_duration ?? 0);
    writer.writeUint32(data.enemy_invincibility_from_same_player_duration ?? 0);
    writer.writeUint32(data.enemy_invincibility_duration ?? 0);

    writer.writeUint32(1); // stage_names count, always 1
    writer.writeStdString(data.stage_name ?? "");

    writer.writeUint32(data.ranking_size ?? 5);
    writer.writeUint32(data.ranking_score ?? 0);
    writer.writeUint32(data.ranking_remaining_time ?? 0);
    writer.writeUint32(data.ranking_clear_time ?? 0);
    writer.writeUint32(data.ranking_remaining_hp ?? 0);
    writer.writeUint32(data.ranking_remaining_sp ?? 0);

    writeDeathFade(writer, data.nonblock_enemy_death || {});
    writeDeathFade(writer, data.block_enemy_death || {});
    writeDeathFade(writer, data.item_death || {});
    writeDeathFade(writer, data.player_death || {});
    writeDeathFade(writer, data.enemy_death || {});

    writeStagePalette(writer, data.palette || {});

    writeArray(writer, data.blocks, writeStageBlock);
    writeArray(writer, data.characters, writeStageCharacter);
    writeArray(writer, data.items, writeStageItem);
    writeArray(writer, data.backgrounds, writeBackground);
    writeArray(writer, data.stage_vars, writeStageVar);

    writer.writeUint32(123456789); // end marker
}

/**
 * STG4 Transform Stream that parses STG4 chunks from binary data
 */
class STG4Unpacker {
  constructor() {
    this.dataReader = new StreamDataReader();
    this.onChunk = null;
    this.onClose = null;
    this.headerParsed = false;
    this.chunkCount = 0;
    this.fileBuffer = new Uint8Array(0);
  }

  /**
   * Adds more binary data to unpack
   * @param {Uint8Array} uint8Array The data to add
   */
  addBinaryData(uint8Array) {
    const newBuffer = new Uint8Array(this.fileBuffer.length + uint8Array.length);
    newBuffer.set(this.fileBuffer, 0);
    newBuffer.set(uint8Array, this.fileBuffer.length);
    this.fileBuffer = newBuffer;

    // this.dataReader.addData(uint8Array);
    // this.parseData();

    if (uint8Array.length != 4096) {
      this.parseFile();
    }

    // TODO: this is 4096 bytes chunk streaming, code should be adapted
    // this.parseFile();
    // this.checkForChunks();
  }

  /**
   * Parse the entire STG4 file when all data is available
   */
  parseFile() {
    if (this.fileBuffer.length === 0) return null;
    
    try {
      const reader = new DataReader(this.fileBuffer.buffer);
      return parseStagePaletteFile(reader); // Return the parsed result directly
    } catch (error) {
      console.error('Error parsing STG4 file:', error);
      return { error: error.message };
    }
  }
}

/**
 * Transform stream for parsing STG4 files
 */
class STG4TransformStream {
  constructor() {
    const unpacker = new STG4Unpacker();

    let bufferedData = [];
    let totalLength = 0;

    this.stream = new TransformStream({
      transform(chunk, controller) {
        // Buffer the incoming chunks
        bufferedData.push(chunk);
        totalLength += chunk.length;
      },
      
      flush(controller) {
        // This is called when the stream is closed
        // Combine all buffered data
        const combinedBuffer = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of bufferedData) {
          combinedBuffer.set(chunk, offset);
          offset += chunk.length;
        }
        
        // Now process the complete file
        unpacker.addBinaryData(combinedBuffer);
        const result = unpacker.parseFile(); // This will be called only when fully read
        
        // Enqueue the parsed result
        controller.enqueue(result);
      }
    });

    this.readable = this.stream.readable;
    this.writable = this.stream.writable;
  }
}

/**
 * Sample STG4 Stream Reader for demonstration
 */
class SampleSTG4StreamReader {
  constructor() {
    this.chunks = [];
    this.processed = 0;
  }

  async read(stream) {
    const reader = stream.getReader();
    let done = false;
    
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      
      if (value) {
        this.chunks.push(value);
        this.processed++;
        console.log(`Processed chunk ${this.processed}:`, Object.keys(value));
      }
    }
    
    return this.chunks;
  }
}

/**
 * Parse STG4 from a stream
 */
async function parseStage(stream) {
  const transformStream = new STG4TransformStream();
  const parsedStream = stream.pipeThrough(transformStream);
  
  const reader = parsedStream.getReader();
  const { value: parsedFile, done } = await reader.read();
  
  if (done) {
    console.log("DONE!");
    return parsedFile; // This should be your parsed JSON object
  }
  
  return parsedFile;
}

/**
 * Serialize STG4 object to a ReadableStream of bytes.
 * @param {object} data The STG4 data object.
 * @returns {ReadableStream<Uint8Array>} A readable stream of the binary data.
 */
function serializeStage(data) {
  return new ReadableStream({
    start(controller) {
      try {
        const writer = new DataWriter();
        writeStagePaletteFile(writer, data);
        const buffer = writer.toBuffer();
        controller.enqueue(new Uint8Array(buffer));
        controller.close();
      } catch (e) {
        console.error("Error during STG4 serialization:", e);
        controller.error(e);
      }
    }
  });
}

export { parseStage, serializeStage };