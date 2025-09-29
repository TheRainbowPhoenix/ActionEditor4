import DataReader from './DataReader.js';
import DataWriter from './DataWriter.js';

function ensureReader(source) {
  if (source instanceof DataReader) {
    return source;
  }
  return new DataReader(source);
}

function normalisePayload(payload) {
  if (!payload) {
    return new Uint8Array(0);
  }
  if (payload instanceof Uint8Array) {
    return payload;
  }
  if (ArrayBuffer.isView(payload)) {
    const { buffer, byteOffset, byteLength } = payload;
    return new Uint8Array(buffer, byteOffset, byteLength);
  }
  if (Array.isArray(payload)) {
    const result = new Uint8Array(payload.length);
    for (let index = 0; index < payload.length; index += 1) {
      const value = payload[index];
      result[index] = typeof value === 'number' ? value & 0xFF : 0;
    }
    return result;
  }
  throw new TypeError('Unsupported payload type.');
}

function readStdString(reader) {
  return reader.readStdString();
}

function writeStdString(writer, value) {
  const stringValue = value ?? '';
  if (!stringValue) {
    writer.writeUint32(0);
    return;
  }
  writer.writeLengthPrefixedString(stringValue);
}

function parseDeathFade(reader) {
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
    block_end: reader.readUint32(),
  };
}

function writeDeathFade(writer, fade) {
  writer.writeUint32(fade?.list_size ?? 0);
  writer.writeUint32(fade?.auto_disappear_left ?? 0);
  writer.writeUint32(fade?.auto_disappear_right ?? 0);
  writer.writeUint32(fade?.auto_disappear_top ?? 0);
  writer.writeUint32(fade?.auto_disappear_bottom ?? 0);
  writer.writeUint32(fade?.disappear_left_range ?? 0);
  writer.writeUint32(fade?.disappear_right_range ?? 0);
  writer.writeUint32(fade?.disappear_top_range ?? 0);
  writer.writeUint32(fade?.disappear_bottom_range ?? 0);
  writer.writeUint32(fade?.block_end ?? 0);
}

function parsePlayerCollision(reader) {
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
    item_display_color: reader.readUint32(),
  };
}

function writePlayerCollision(writer, collision) {
  writer.writeUint32(collision?.walking_block_width ?? 0);
  writer.writeUint32(collision?.walking_block_height ?? 0);
  writer.writeUint32(collision?.flying_block_width ?? 0);
  writer.writeUint32(collision?.flying_block_height ?? 0);
  writer.writeUint32(collision?.walking_character_width ?? 0);
  writer.writeUint32(collision?.walking_character_height ?? 0);
  writer.writeUint32(collision?.flying_character_width ?? 0);
  writer.writeUint32(collision?.flying_character_height ?? 0);
  writer.writeUint32(collision?.shot_width ?? 0);
  writer.writeUint32(collision?.shot_height ?? 0);
  writer.writeUint32(collision?.item_width ?? 0);
  writer.writeUint32(collision?.item_height ?? 0);
  writer.writeUint32(collision?.walking_block_position ?? 0);
  writer.writeUint32(collision?.flying_block_position ?? 0);
  writer.writeUint32(collision?.walking_character_position ?? 0);
  writer.writeUint32(collision?.flying_character_position ?? 0);
  writer.writeUint32(collision?.block_display ?? 0);
  writer.writeUint32(collision?.character_display ?? 0);
  writer.writeUint32(collision?.shot_display ?? 0);
  writer.writeUint32(collision?.item_display ?? 0);
  writer.writeUint32(collision?.block_display_color ?? 0);
  writer.writeUint32(collision?.character_display_color ?? 0);
  writer.writeUint32(collision?.shot_display_color ?? 0);
  writer.writeUint32(collision?.item_display_color ?? 0);
}

function parseEnemyCollision(reader) {
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
    flying_character_position: reader.readUint32(),
  };
}

function writeEnemyCollision(writer, collision) {
  writer.writeUint32(collision?.walking_block_width ?? 0);
  writer.writeUint32(collision?.walking_block_height ?? 0);
  writer.writeUint32(collision?.flying_block_width ?? 0);
  writer.writeUint32(collision?.flying_block_height ?? 0);
  writer.writeUint32(collision?.walking_character_width ?? 0);
  writer.writeUint32(collision?.walking_character_height ?? 0);
  writer.writeUint32(collision?.flying_character_width ?? 0);
  writer.writeUint32(collision?.flying_character_height ?? 0);
  writer.writeUint32(collision?.shot_width ?? 0);
  writer.writeUint32(collision?.shot_height ?? 0);
  writer.writeUint32(collision?.walking_block_position ?? 0);
  writer.writeUint32(collision?.flying_block_position ?? 0);
  writer.writeUint32(collision?.walking_character_position ?? 0);
  writer.writeUint32(collision?.flying_character_position ?? 0);
}

function parseActorHitbox(reader) {
  return {
    shot_width: reader.readUint32(),
    shot_height: reader.readUint32(),
    character_width: reader.readUint32(),
    character_height: reader.readUint32(),
  };
}

function writeActorHitbox(writer, hitbox) {
  writer.writeUint32(hitbox?.shot_width ?? 0);
  writer.writeUint32(hitbox?.shot_height ?? 0);
  writer.writeUint32(hitbox?.character_width ?? 0);
  writer.writeUint32(hitbox?.character_height ?? 0);
}

function parseStageHeader(reader) {
  const header = {
    magic: reader.readUint32(),
    entry_count: reader.readUint32(),
    width: reader.readUint32(),
    chunk_width: reader.readUint32(),
    chunk_pow: reader.readUint32(),
    height: reader.readUint32(),
    enable_horizontal_scroll_minimum: reader.readUint32(),
    enable_horizontal_scroll_maximum: reader.readUint32(),
    enable_vertical_scroll_minimum: reader.readUint32(),
    enable_vertical_scroll_maximum: reader.readUint32(),
    horizontal_scroll_minimum_value: reader.readUint32(),
    horizontal_scroll_maximum_value: reader.readUint32(),
    vertical_scroll_minimum_value: reader.readUint32(),
    vertical_scroll_maximum_value: reader.readUint32(),
    frame_rate: reader.readUint32(),
    enable_time_limit: reader.readUint32(),
    time_limit_duration: reader.readUint32(),
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
    show_stage: reader.readUint32(),
    show_ready: reader.readUint32(),
    show_clear: reader.readUint32(),
    show_gameover: reader.readUint32(),
    player_collision: parsePlayerCollision(reader),
    enemy_collision: parseEnemyCollision(reader),
    item_collision_width: reader.readUint32(),
    item_collision_height: reader.readUint32(),
    player_hitbox: parseActorHitbox(reader),
    enemy_hitbox: parseActorHitbox(reader),
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
    stage_name_count: reader.readUint32(),
    stage_name: readStdString(reader),
    ranking_size: reader.readUint32(),
    ranking_score: reader.readUint32(),
    ranking_remaining_time: reader.readUint32(),
    ranking_clear_time: reader.readUint32(),
    ranking_remaining_hp: reader.readUint32(),
    ranking_remaining_sp: reader.readUint32(),
    nonblock_enemy_death: parseDeathFade(reader),
    block_enemy_death: parseDeathFade(reader),
    item_death: parseDeathFade(reader),
    player_death: parseDeathFade(reader),
    enemy_death: parseDeathFade(reader),
  };

  return header;
}

function writeStageHeader(writer, header) {
  writer.writeUint32(header?.magic ?? 0);
  writer.writeUint32(header?.entry_count ?? 0);
  writer.writeUint32(header?.width ?? 0);
  writer.writeUint32(header?.chunk_width ?? 0);
  writer.writeUint32(header?.chunk_pow ?? 0);
  writer.writeUint32(header?.height ?? 0);
  writer.writeUint32(header?.enable_horizontal_scroll_minimum ?? 0);
  writer.writeUint32(header?.enable_horizontal_scroll_maximum ?? 0);
  writer.writeUint32(header?.enable_vertical_scroll_minimum ?? 0);
  writer.writeUint32(header?.enable_vertical_scroll_maximum ?? 0);
  writer.writeUint32(header?.horizontal_scroll_minimum_value ?? 0);
  writer.writeUint32(header?.horizontal_scroll_maximum_value ?? 0);
  writer.writeUint32(header?.vertical_scroll_minimum_value ?? 0);
  writer.writeUint32(header?.vertical_scroll_maximum_value ?? 0);
  writer.writeUint32(header?.frame_rate ?? 0);
  writer.writeUint32(header?.enable_time_limit ?? 0);
  writer.writeUint32(header?.time_limit_duration ?? 0);
  writer.writeUint32(header?.warning_sound_start_time ?? 0);
  writer.writeUint32(header?.enable_side_scroll ?? 0);
  writer.writeUint32(header?.enable_vertical_scroll ?? 0);
  writer.writeUint32(header?.autoscroll_speed ?? 0);
  writer.writeUint32(header?.vertical_scroll_speed ?? 0);
  writer.writeFloat64(header?.gravity ?? 0);
  writer.writeUint32(header?.hit_detection_level ?? 0);
  writer.writeUint32(header?.character_shot_collision_detection_accuracy ?? 0);
  writer.writeUint32(header?.bgm_number ?? 0);
  writer.writeUint32(header?.bgm_loop_playback ?? 0);
  writer.writeUint32(header?.dont_restart_bgm_if_no_change ?? 0);
  writer.writeUint32(header?.enable_z_coordinate ?? 0);
  writer.writeUint32(header?.inherit_status_from_stock ?? 0);
  writer.writeUint32(header?.store_status_to_stock ?? 0);
  writer.writeUint32(header?.show_status_window ?? 0);
  writer.writeUint32(header?.switch_scene_immediately_on_clear ?? 0);
  writer.writeUint32(header?.allow_replay_save ?? 0);
  writer.writeUint32(header?.show_stage ?? 0);
  writer.writeUint32(header?.show_ready ?? 0);
  writer.writeUint32(header?.show_clear ?? 0);
  writer.writeUint32(header?.show_gameover ?? 0);
  writePlayerCollision(writer, header?.player_collision);
  writeEnemyCollision(writer, header?.enemy_collision);
  writer.writeUint32(header?.item_collision_width ?? 0);
  writer.writeUint32(header?.item_collision_height ?? 0);
  writeActorHitbox(writer, header?.player_hitbox);
  writeActorHitbox(writer, header?.enemy_hitbox);
  writer.writeUint32(header?.undo_max_times ?? 0);
  writer.writeUint32(header?.x_coordinate_upper_limit ?? 0);
  writer.writeUint32(header?.y_coordinate_upper_limit ?? 0);
  writer.writeUint32(header?.unk75 ?? 0);
  writer.writeUint32(header?.unk76 ?? 0);
  writer.writeUint32(header?.unk77 ?? 0);
  writer.writeUint32(header?.unk78 ?? 0);
  writer.writeUint32(header?.unk79 ?? 0);
  writer.writeUint32(header?.unk80 ?? 0);
  writer.writeUint32(header?.unk81 ?? 0);
  writer.writeUint32(header?.unk82 ?? 0);
  writer.writeUint32(header?.unk83 ?? 0);
  writer.writeUint32(header?.unk84 ?? 0);
  writer.writeUint32(header?.unk85 ?? 0);
  writer.writeUint32(header?.unk86 ?? 0);
  writer.writeUint32(header?.disable_damage_outside_screen ?? 0);
  writer.writeUint32(header?.player_invincibility_from_same_enemy_duration ?? 0);
  writer.writeUint32(header?.player_invincibility_duration ?? 0);
  writer.writeUint32(header?.enemy_invincibility_from_same_player_duration ?? 0);
  writer.writeUint32(header?.enemy_invincibility_duration ?? 0);
  writer.writeUint32(header?.stage_name_count ?? 0);
  writeStdString(writer, header?.stage_name);
  writer.writeUint32(header?.ranking_size ?? 0);
  writer.writeUint32(header?.ranking_score ?? 0);
  writer.writeUint32(header?.ranking_remaining_time ?? 0);
  writer.writeUint32(header?.ranking_clear_time ?? 0);
  writer.writeUint32(header?.ranking_remaining_hp ?? 0);
  writer.writeUint32(header?.ranking_remaining_sp ?? 0);
  writeDeathFade(writer, header?.nonblock_enemy_death);
  writeDeathFade(writer, header?.block_enemy_death);
  writeDeathFade(writer, header?.item_death);
  writeDeathFade(writer, header?.player_death);
  writeDeathFade(writer, header?.enemy_death);
}

export function parseStage(source) {
  const reader = ensureReader(source);
  if (reader.remaining < 4) {
    throw new Error('Stage file is too small to contain a version header.');
  }
  const version = reader.readUint32();

  try {
    const header = parseStageHeader(reader);
    const payloadBytes = Array.from(reader.readBytes(reader.remaining));
    return {
      version,
      header,
      palette_payload: payloadBytes,
      payload: payloadBytes,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      const fallbackReader = new DataReader(reader.buffer);
      fallbackReader.seek(4);
      const payloadBytes = Array.from(fallbackReader.readBytes(fallbackReader.remaining));
      return {
        version,
        palette_payload: payloadBytes,
        payload: payloadBytes,
      };
    }
    throw new Error(`Failed to parse stage header: ${error.message}`);
  }
}

export function serializeStage(stage) {
  if (!stage || typeof stage !== 'object') {
    throw new TypeError('Stage payload must be an object.');
  }
  const { version } = stage;
  if (typeof version !== 'number' || Number.isNaN(version)) {
    throw new TypeError('Stage payload is missing a numeric version field.');
  }

  const writer = new DataWriter();
  writer.writeUint32(version >>> 0);

  if (!stage.header) {
    const legacyBytes = normalisePayload(stage.payload ?? stage.palette_payload);
    if (legacyBytes.length > 0) {
      writer.writeBytes(legacyBytes);
    }
    return writer.toArrayBuffer();
  }

  writeStageHeader(writer, stage.header);
  const bodyBytes = normalisePayload(stage.palette_payload ?? stage.payload);
  if (bodyBytes.length > 0) {
    writer.writeBytes(bodyBytes);
  }
  return writer.toArrayBuffer();
}