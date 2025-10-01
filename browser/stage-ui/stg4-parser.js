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
      `Array size ${count} exceeds maximum of ${CONFIG.MAX_ARRAY_SIZE} at offset ${reader.offset - 4}`
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

// Helper functions for parsing
/** @param {DataReader} reader stream reader */
function readStdString(reader) {
  const length = reader.readUint32();
  if (length > 1) {
    const bytes = new Uint8Array(reader.view.buffer, reader.position, length);
    reader.position += length;
    return new TextDecoder().decode(bytes);
    }  else {
        return "";
    }  
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

/** @param {DataReader} reader stream reader */
function readIntVector(reader) {
  const count = reader.readUint32();
  const ints = [];
  for (let i = 0; i < count; i++) {
    ints.push(reader.readUint32());
  }
  return ints;
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

// Parse ActorHitbox structure
function readActorHitbox(reader) {
  return {
    shot_width: reader.readUint32(),
    shot_height: reader.readUint32(),
    character_width: reader.readUint32(),
    character_height: reader.readUint32()
  };
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

// Parse StagePalette structure
function readStagePalette(reader) {
    let blocks = readArray(reader, readBlock);
    let characters = readArray(reader, readCharacter);
    let items = readArray(reader, readItem);
    return {
        blocks, characters, items    
    }
  return {
    blocks: readArray(reader, readBlock),
    characters: readArray(reader, readCharacter),
    items: readArray(reader, readItem)
  };
}

// Parse StageBlock structure
function readStageBlock(reader) {
  return {
    position: reader.readUint32(),
    block: readBlock(reader)
  };
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

/** @param {DataReader} reader stream reader */
function readFlow(reader) {
  const header = reader.readUint32();
  if (header !== 10) {
    throw new Error(
      `Invalid Flow header: expected 10, got ${header} at offset ${reader.offset - 4}`
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
    item_name: reader.readString(),
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

/** @param {DataReader} reader stream reader */
function readItemEffect(reader) {
    const effect = {
    header: reader.readUint32(),
    unk1: reader.readInt8(),
    type: reader.readUint8()
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


/** @param {DataReader} reader stream reader */
function readCommand(reader) {
    const command = {
        header: reader.readUint32(),
        unk1: reader.readUint8(),
        type: reader.readUint8(),
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
        `Unknown command type: ${command.type} at offset ${reader.offset - 1}`
      );
  }
  return command;
}

// Parse StageCharacter structure
function readStageCharacter(reader) {
  return {
    position: reader.readUint32(),
    character: readCharacter(reader)
  };
}

// Parse StageItem structure
function readStageItem(reader) {
  return {
    position: reader.readUint32(),
    item: readItem(reader)
  };
}

// Parse Background structure
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
    image_path: parseStdString(reader)
  };
}

// Parse StageVar structure
function readStageVar(reader) {
  return {
    some_count: reader.readUint32(),
    some_count_too: reader.readUint32(),
    variable_name: parseStdString(reader)
  };
}

// Parse the complete StagePaletteFile
function parseStagePaletteFile(reader) {
  // Read the main header fields
  const magic = reader.readUint32(); // Should be 0x000003FC (1020)
  
  if (magic !== 1020) {
    throw new Error(`Invalid STG4 magic: ${magic}, expected 1020`);
  }
  

    let some_count = reader.readUint32(); // 99 - std::vector<int>
    
    let item_width = reader.readUint32();
    
    let chunk_width = reader.readUint32(); // 32
    let chunk_pow = reader.readUint32(); // 5
   
    let height = reader.readUint32();
    
    let enable_horizontal_scroll_minimum = reader.readUint32();
    let enable_horizontal_scroll_maximum = reader.readUint32();
    let enable_vertical_scroll_minimum = reader.readUint32(); // top left
    let enable_vertical_scroll_maximum = reader.readUint32(); // bottom
    
    let horizontal_scroll_minimum_value = reader.readUint32();
    let horizontal_scroll_maximum_value = reader.readUint32();
    let vertical_scroll_minimum_value = reader.readUint32();
    let vertical_scroll_maximum_value = reader.readUint32();
    
    // Page 2
    let frame_rate = reader.readUint32();
    
    let enable_time_limit = reader.readUint32();
    let time_limit_duration = reader.readUint32();  // seconds
    let warning_sound_start_time = reader.readUint32();
    
    let enable_side_scroll = reader.readUint32();
    let enable_vertical_scroll = reader.readUint32();
    let autoscroll_speed = reader.readUint32();
    let vertical_scroll_speed = reader.readUint32();
    
    let gravity = reader.readFloat64();
    
    let hit_detection_level = reader.readUint32();
    let character_shot_collision_detection_accuracy = reader.readUint32();
    
    let bgm_number = reader.readUint32();
    let bgm_loop_playback = reader.readUint32();
    let dont_restart_bgm_if_no_change = reader.readUint32();
    
    let enable_z_coordinate = reader.readUint32();
    
    let inherit_status_from_stock = reader.readUint32();
    let store_status_to_stock = reader.readUint32();
    let show_status_window = reader.readUint32();
    
    let switch_scene_immediately_on_clear = reader.readUint32();
    let allow_replay_save = reader.readUint32();
    
    // show text images
    let show_stage = reader.readUint32();
    let show_ready = reader.readUint32();
    let show_clear = reader.readUint32();
    let show_gameover = reader.readUint32();
    
    let player_collide = readPlayerCollision(reader);
    
    let enemy_collide = readEnemyCollision(reader);
    
    let item_collision_width = reader.readUint32();
    let item_collision_height = reader.readUint32();   

    let player_hitbox = readActorHitbox(reader);
    let enemy_hitbox = readActorHitbox(reader);
    
    // Okay this is original, but this limit the number of "ctrl-z"
    let undo_max_times = reader.readUint32();

    let x_coordinate_upper_limit = reader.readUint32();
    let y_coordinate_upper_limit = reader.readUint32();

    let unk75 = reader.readUint32();
    let unk76 = reader.readUint32();
    let unk77 = reader.readUint32();
    let unk78 = reader.readUint32();
    let unk79 = reader.readUint32();

    let unk80 = reader.readUint32();
    let unk81 = reader.readUint32();
    let unk82 = reader.readUint32();
    let unk83 = reader.readUint32();
    let unk84 = reader.readUint32();
    let unk85 = reader.readUint32();
    let unk86 = reader.readUint32();
    
    let disable_damage_outside_screen = reader.readUint32();

    let player_invincibility_from_same_enemy_duration = reader.readUint32();
    let player_invincibility_duration = reader.readUint32();

    let enemy_invincibility_from_same_player_duration = reader.readUint32();
    let enemy_invincibility_duration = reader.readUint32();
    
    let stage_names = reader.readUint32(); // 1 -  std::vector<std::string>
    let stage_name = readStdString(reader);
    
    let ranking_size = reader.readUint32(); // 5  - std::vector<int>
    // Ranking
    let ranking_score = reader.readUint32();
    let ranking_remaining_time = reader.readUint32();
    let ranking_clear_time = reader.readUint32();
    let ranking_remaining_hp = reader.readUint32();
    let ranking_remaining_sp = reader.readUint32();

    // let DeathFade  = fade animation on death
    let nonblock_enemy_death = readDeathFade(reader);
    let block_enemy_death = readDeathFade(reader);
    let item_death = readDeathFade(reader);
    let player_death = readDeathFade(reader);
    let enemy_death = readDeathFade(reader);

    // Stage Palette - add the header  FC 03 00 00 and it's a  plt4 file !
    let palette = readStagePalette(reader);

    // std::vector<StageBlock>
    let blocks = readArray(reader, readStageBlock);

    // std::vector<StageCharacter>
    let characters = readArray(reader, readStageCharacter);

    // std::vector<Item>
    let items = readArray(reader, readStageItem);

    // std::vector<Background>
    let backgrounds = readArray(reader, readBackground);

    //currently fixed 1000
    let stage_vars = readArray(reader, readStageVar);
    
    let end = (() => {
      let e = reader.readUint32() // value should be 123456789
      if (e !== 123456789) {
        console.warn(`Unexpected end marker: expected 123456789, got ${file.end}`);
      }
      return e;
    })();
  
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
  }

  /**
   * Parse the entire STG4 file when all data is available
   */
  parseFile() {
    if (this.fileBuffer.length === 0) return;
    
    try {
      const reader = new DataReader(this.fileBuffer.buffer);
      const parsedFile = parseStagePaletteFile(reader);
      
      if (this.onChunk) {
        this.onChunk(parsedFile);
      }
      
      if (this.onClose) {
        this.onClose();
      }
    } catch (error) {
      console.error('Error parsing STG4 file:', error);
      if (this.onChunk) {
        this.onChunk({ error: error.message });
      }
    }
  }
}

/**
 * Transform stream for parsing STG4 files
 */
class STG4TransformStream {
  constructor() {
    const unpacker = new STG4Unpacker();

    this.readable = new ReadableStream({
      start(controller) {
        unpacker.onChunk = chunk => controller.enqueue(chunk);
        unpacker.onClose = () => controller.close();
      },
      pull(controller) {
        // When all data is received, parse the file
        unpacker.parseFile();
      }
    });

    this.writable = new WritableStream({
      write(chunk, controller) {
        unpacker.addBinaryData(chunk);
      },
      close(controller) {
        // File is complete, trigger parsing
        unpacker.parseFile();
      }
    });
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
  const readableStream = stream.pipeThrough(transformStream);
  
  const reader = new SampleSTG4StreamReader();
  const chunks = await reader.read(readableStream);
  
  // Return the parsed file structure
  return chunks[0] || {};
}

/**
 * Serialize STG4 to a stream
 */
function serializeStage(data) {
  const writableStream = new WritableStream({
    write(chunk, controller) {
      // Write chunk to output stream
      // This is a simplified implementation
      console.log('Writing chunk:', chunk);
    },
    close() {
      console.log('Serialization complete');
    }
  });

  const readableStream = new ReadableStream({
    start(controller) {
      // Write header
      const writer = new DataWriter();
      
      // Write all the fields in the correct order
      writer.writeUint32(data.magic || 1020);
      writer.writeUint32(data.some_count || 99);
      
      writer.writeUint32(data.item_width || 0);
      
      writer.writeUint32(data.chunk_width || 32);
      writer.writeUint32(data.chunk_pow || 5);
      
      writer.writeUint32(data.height || 0);
      
      writer.writeUint32(data.enable_horizontal_scroll_minimum || 0);
      writer.writeUint32(data.enable_horizontal_scroll_maximum || 0);
      writer.writeUint32(data.enable_vertical_scroll_minimum || 0);
      writer.writeUint32(data.enable_vertical_scroll_maximum || 0);
      
      writer.writeUint32(data.horizontal_scroll_minimum_value || 0);
      writer.writeUint32(data.horizontal_scroll_maximum_value || 0);
      writer.writeUint32(data.vertical_scroll_minimum_value || 0);
      writer.writeUint32(data.vertical_scroll_maximum_value || 0);
      
      // Page 2
      writer.writeUint32(data.frame_rate || 60);
      
      writer.writeUint32(data.enable_time_limit || 0);
      writer.writeUint32(data.time_limit_duration || 0);
      writer.writeUint32(data.warning_sound_start_time || 0);
      
      writer.writeUint32(data.enable_side_scroll || 0);
      writer.writeUint32(data.enable_vertical_scroll || 0);
      writer.writeUint32(data.autoscroll_speed || 0);
      writer.writeUint32(data.vertical_scroll_speed || 0);
      
      writer.writeFloat32(data.gravity || 0.0);
      
      writer.writeUint32(data.hit_detection_level || 0);
      writer.writeUint32(data.character_shot_collision_detection_accuracy || 0);
      
      writer.writeUint32(data.bgm_number || 0);
      writer.writeUint32(data.bgm_loop_playback || 0);
      writer.writeUint32(data.dont_restart_bgm_if_no_change || 0);
      
      writer.writeUint32(data.enable_z_coordinate || 0);
      
      writer.writeUint32(data.inherit_status_from_stock || 0);
      writer.writeUint32(data.store_status_to_stock || 0);
      writer.writeUint32(data.show_status_window || 0);
      
      writer.writeUint32(data.switch_scene_immediately_on_clear || 0);
      writer.writeUint32(data.allow_replay_save || 0);
      
      // show text images
      writer.writeUint32(data.show_stage || 1);
      writer.writeUint32(data.show_ready || 1);
      writer.writeUint32(data.show_clear || 1);
      writer.writeUint32(data.show_gameover || 1);
      
      // Write PlayerCollision
      const playerCollide = data.player_collide || {};
      writer.writeUint32(playerCollide.width || 0);
      writer.writeUint32(playerCollide.height || 0);
      writer.writeUint32(playerCollide.attack_width || 0);
      writer.writeUint32(playerCollide.attack_height || 0);
      writer.writeUint32(playerCollide.attack_offset_x || 0);
      writer.writeUint32(playerCollide.attack_offset_y || 0);
      
      // Write EnemyCollision
      const enemyCollide = data.enemy_collide || {};
      writer.writeUint32(enemyCollide.width || 0);
      writer.writeUint32(enemyCollide.height || 0);
      writer.writeUint32(enemyCollide.attack_width || 0);
      writer.writeUint32(enemyCollide.attack_height || 0);
      writer.writeUint32(enemyCollide.attack_offset_x || 0);
      writer.writeUint32(enemyCollide.attack_offset_y || 0);
      
      writer.writeUint32(data.item_collision_width || 0);
      writer.writeUint32(data.item_collision_height || 0);
      
      // Write PlayerHitbox
      const playerHitbox = data.player_hitbox || {};
      writer.writeUint32(playerHitbox.width || 0);
      writer.writeUint32(playerHitbox.height || 0);
      writer.writeUint32(playerHitbox.offset_x || 0);
      writer.writeUint32(playerHitbox.offset_y || 0);
      
      // Write EnemyHitbox
      const enemyHitbox = data.enemy_hitbox || {};
      writer.writeUint32(enemyHitbox.width || 0);
      writer.writeUint32(enemyHitbox.height || 0);
      writer.writeUint32(enemyHitbox.offset_x || 0);
      writer.writeUint32(enemyHitbox.offset_y || 0);
      
      writer.writeUint32(data.undo_max_times || 0);
      
      writer.writeUint32(data.x_coordinate_upper_limit || 0);
      writer.writeUint32(data.y_coordinate_upper_limit || 0);
      
      writer.writeUint32(data.unk75 || 0);
      writer.writeUint32(data.unk76 || 0);
      writer.writeUint32(data.unk77 || 0);
      writer.writeUint32(data.unk78 || 0);
      writer.writeUint32(data.unk79 || 0);
      
      writer.writeUint32(data.unk80 || 0);
      writer.writeUint32(data.unk81 || 0);
      writer.writeUint32(data.unk82 || 0);
      writer.writeUint32(data.unk83 || 0);
      writer.writeUint32(data.unk84 || 0);
      writer.writeUint32(data.unk85 || 0);
      writer.writeUint32(data.unk86 || 0);
      
      writer.writeUint32(data.disable_damage_outside_screen || 0);
      
      writer.writeUint32(data.player_invincibility_from_same_enemy_duration || 0);
      writer.writeUint32(data.player_invincibility_duration || 0);
      
      writer.writeUint32(data.enemy_invincibility_from_same_player_duration || 0);
      writer.writeUint32(data.enemy_invincibility_duration || 0);
      
      // Write stage names vector
      const stageNames = data.stage_names || [];
      writer.writeUint32(stageNames.length);
      for (const name of stageNames) {
        writer.writeString(name);
      }
      
      // Write stage name
      writer.writeString(data.stage_name || "");
      
      writer.writeUint32(data.ranking_size || 5);
      
      // Ranking
      writer.writeUint32(data.ranking_score || 0);
      writer.writeUint32(data.ranking_remaining_time || 0);
      writer.writeUint32(data.ranking_clear_time || 0);
      writer.writeUint32(data.ranking_remaining_hp || 0);
      writer.writeUint32(data.ranking_remaining_sp || 0);
      
      // Write DeathFade structures
      const nonblockEnemyDeath = data.nonblock_enemy_death || {};
      writer.writeUint32(nonblockEnemyDeath.fade_type || 0);
      writer.writeUint32(nonblockEnemyDeath.fade_time || 0);
      writer.writeUint32(nonblockEnemyDeath.fade_alpha || 0);
      
      const blockEnemyDeath = data.block_enemy_death || {};
      writer.writeUint32(blockEnemyDeath.fade_type || 0);
      writer.writeUint32(blockEnemyDeath.fade_time || 0);
      writer.writeUint32(blockEnemyDeath.fade_alpha || 0);
      
      const itemDeath = data.item_death || {};
      writer.writeUint32(itemDeath.fade_type || 0);
      writer.writeUint32(itemDeath.fade_time || 0);
      writer.writeUint32(itemDeath.fade_alpha || 0);
      
      const playerDeath = data.player_death || {};
      writer.writeUint32(playerDeath.fade_type || 0);
      writer.writeUint32(playerDeath.fade_time || 0);
      writer.writeUint32(playerDeath.fade_alpha || 0);
      
      const enemyDeath = data.enemy_death || {};
      writer.writeUint32(enemyDeath.fade_type || 0);
      writer.writeUint32(enemyDeath.fade_time || 0);
      writer.writeUint32(enemyDeath.fade_alpha || 0);
      
      // Write palette
      const palette = data.palette || { colors: [] };
      writer.writeUint32(palette.magic || 0x000003FC); // FC 03 00 00
      writer.writeUint32(palette.colorCount || palette.colors.length);
      for (const color of palette.colors || []) {
        writer.writeUint8(color.r || 0);
        writer.writeUint8(color.g || 0);
        writer.writeUint8(color.b || 0);
        writer.writeUint8(color.a || 255);
      }
      
      // Write blocks
      const blocks = data.blocks || [];
      writer.writeUint32(blocks.length);
      for (const block of blocks) {
        writer.writeUint32(block.id || 0);
        writer.writeUint32(block.x || 0);
        writer.writeUint32(block.y || 0);
        writer.writeUint32(block.width || 0);
        writer.writeUint32(block.height || 0);
        writer.writeUint32(block.block_type || 0);
        writer.writeUint32(block.collision_type || 0);
        writer.writeString(block.properties || "");
      }
      
      // Write characters
      const characters = data.characters || [];
      writer.writeUint32(characters.length);
      for (const character of characters) {
        writer.writeUint32(character.id || 0);
        writer.writeFloat32(character.x || 0);
        writer.writeFloat32(character.y || 0);
        writer.writeFloat32(character.z || 0);
        writer.writeUint32(character.character_type || 0);
        writer.writeUint32(character.direction || 0);
        writer.writeUint32(character.initial_state || 0);
        writer.writeString(character.properties || "");
      }
      
      // Write items
      const items = data.items || [];
      writer.writeUint32(items.length);
      for (const item of items) {
        writer.writeUint32(item.id || 0);
        writer.writeFloat32(item.x || 0);
        writer.writeFloat32(item.y || 0);
        writer.writeFloat32(item.z || 0);
        writer.writeUint32(item.item_type || 0);
        writer.writeString(item.properties || "");
      }
      
      // Write backgrounds
      const backgrounds = data.backgrounds || [];
      writer.writeUint32(backgrounds.length);
      for (const background of backgrounds) {
        writer.writeUint32(background.id || 0);
        writer.writeFloat32(background.x || 0);
        writer.writeFloat32(background.y || 0);
        writer.writeFloat32(background.z || 0);
        writer.writeUint32(background.background_type || 0);
        writer.writeString(background.properties || "");
      }
      
      // Write stage variables
      const stageVars = data.stage_vars || [];
      writer.writeUint32(stageVars.length);
      for (const varData of stageVars) {
        writer.writeUint32(varData.index || 0);
        writer.writeInt32(varData.value || 0);
      }
      
      // Write end marker
      writer.writeUint32(data.end || 123456789);
      
      controller.enqueue(new Uint8Array(writer.toBuffer()));
      controller.close();
    }
  });

  return new TransformStream({
    start(controller) {
      // This is where we'd pipe the readable stream through any transforms
    }
  });
}

export { STG4TransformStream, SampleSTG4StreamReader, parseStage, serializeStage };