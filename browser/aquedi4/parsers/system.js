import { DataReader, DataWriter } from './data-reader-writer.js';

function readStdString(reader) {
    return reader.readStdString();
}

function writeStdString(writer, value) {
    writer.writeStdString(value || '');
}

function loadElements(reader, count, factory) {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(factory(reader));
    }
    return results;
}

function writeElements(writer, elements, callback) {
    for (const element of (elements || [])) {
        callback(writer, element);
    }
}

// --- Structure Parsers & Writers (internal) ---

const TARGET_KEYS = [
    'target_graphic', 'target_base_anim_set', 'target_z_coordinate', 'target_transparency',
    'target_character_fx', 'target_direction_fix', 'target_flight', 'target_invincibility',
    'target_giant_form', 'target_sync_autoscroll', 'target_fow', 'target_remain_hp',
    'target_remain_sp', 'target_max_hp', 'target_max_sp', 'target_col_hitbox', 'target_col_power',
    'target_col_shock', 'target_defense', 'target_shock_resist', 'target_inertia', 'target_action',
    'target_remain_time', 'target_player_count', 'target_bgm'
];

const TARGET_RESET_KEYS = [
    'target_graphic_reseted', 'target_base_anim_set_reseted', 'target_z_coordinate_reseted',
    'target_transparency_reseted', 'target_character_fx_reseted', 'target_direction_fix_reseted',
    'target_flight_reseted', 'target_invincibility_reseted', 'target_giant_form_reseted',
    'target_sync_autoscroll_reseted', 'target_fow_reseted', 'target_remain_hp_reseted',
    'target_remain_sp_reseted', 'target_max_hp_reseted', 'target_max_sp_reseted',
    'target_col_hitbox_reseted', 'target_col_power_reseted', 'target_col_shock_reseted',
    'target_defense_reseted', 'target_shock_resist_reseted', 'target_inertia_reseted',
    'target_action_reseted', 'target_remain_time_reseted', 'target_player_count_reseted',
    'target_bgm_reseted'
];

function parseStringArray(reader, count) {
    return loadElements(count, () => readStdString(reader));
}

function parseTargetFlags(reader, keys) {
    const flags = {};
    for (const key of keys) {
        flags[key] = reader.readUint8();
    }
    return flags;
}

function writeTargetFlags(writer, flags, keys) {
    for (const key of keys) {
        writer.writeUint8(flags?.[key] ?? 0);
    }
}


function parseStatusWindow(reader) {
    return {
        header: reader.readUint32(),
        is_visible: reader.readUint32(),
        show_symbol: reader.readUint32(),
        max: reader.readUint32(),
        unk1: reader.readUint32(),
        color_change_condition: reader.readUint32(),
        change_operator: reader.readUint32(),
        strings_count: reader.readUint32(),
        text: readStdString(reader)
    };
}

function writeStatusWindow(writer, window) {
    writer.writeUint32(window?.header ?? 0);
    writer.writeUint32(window?.is_visible ?? 0);
    writer.writeUint32(window?.show_symbol ?? 0);
    writer.writeUint32(window?.max ?? 0);
    writer.writeUint32(window?.unk1 ?? 0);
    writer.writeUint32(window?.color_change_condition ?? 0);
    writer.writeUint32(window?.change_operator ?? 0);
    writer.writeUint32(window?.strings_count ?? 0);
    writeStdString(writer, window?.text);
}
function parseRanking(reader) {
    const first_unk = reader.readUint32();
    const ranking_on = reader.readUint32();
    const second_unk = reader.readUint32();
    const ranking_count = reader.readUint32();
    const ranking_criterias = [];
    for (let index = 0; index < ranking_count; index += 1) {
        ranking_criterias.push(reader.readUint8());
    }
    return {
        first_unk,
        ranking_on,
        second_unk,
        ranking_count,
        ranking_criterias
    };
}

function writeRanking(writer, ranking) {
    writer.writeUint32(ranking?.first_unk ?? 0);
    writer.writeUint32(ranking?.ranking_on ?? 0);
    writer.writeUint32(ranking?.second_unk ?? 0);
    const criterias = Array.isArray(ranking?.ranking_criterias) ? ranking.ranking_criterias : [];
    const rankingCount = ranking?.ranking_count ?? criterias.length;
    writer.writeUint32(rankingCount);
    for (let index = 0; index < rankingCount; index += 1) {
        writer.writeUint8(criterias[index] ?? 0);
    }
}
function parseMenuText(reader) {
    return {
        unk1: reader.readUint32(),
        enabled: reader.readUint32(),
        unk2: reader.readUint32(),
        text: readStdString(reader)
    };
}

function writeMenuText(writer, text) {
    writer.writeUint32(text?.unk1 ?? 0);
    writer.writeUint32(text?.enabled ?? 0);
    writer.writeUint32(text?.unk2 ?? 0);
    writeStdString(writer, text?.text);
}
function parseIniConf(reader) {
    return {
        unk1: reader.readUint32(),
        unk2: reader.readUint32(),
        default_value: reader.readUint32(),
        string_count: reader.readUint32(),
        id_string: readStdString(reader),
        default_str: readStdString(reader)
    };
}

function writeIniConf(writer, conf) {
    writer.writeUint32(conf?.unk1 ?? 0);
    writer.writeUint32(conf?.unk2 ?? 0);
    writer.writeUint32(conf?.default_value ?? 0);
    writer.writeUint32(conf?.string_count ?? 0);
    writeStdString(writer, conf?.id_string);
    writeStdString(writer, conf?.default_str);
}

function parseSystemFile(buffer) {
    const reader = new DataReader(buffer);
    const magic = reader.readUint32();

    const data = {};
    const keysToRead = [
        'unk0', 'up_process_on_stage_clear', 'score_per_1up', 'space_pause', 'hide_obj_pause',
        'show_symbol_image', 'font_index', 'decoration', 'monospace', 'min_damage_reduct_base',
        'min_damage_reduct_percent', 'min_shock_reduct_base', 'min_shock_reduct_percent',
        'enable_test_play_everywhere', 'character_draw', 'allow_replay_save', 'alow_manual_replay_save',
        'replay_file_format', 'use_explorer_file_dialog_for_file_select', 'show_image_on_title_screen',
        'auto_save_default', 'show_description', 'share_lives_across_story', 'return_worldmap_on_death',
        'show_lives_on_worldmap', 'multistage_autosave_after_each_stage', 'challenge_mode_world',
        'all_worlds_selectable_on_start', 'show_highscore', 'show_totalscore',
        'always_reset_commonvar_on_worldmap', 'retry_pause_menu_option_in_cleared_worlds',
        'challenge_show_highscore', 'challenge_show_totalscore', 'challenge_death_reset_commonvar',
        'challenge_retry_pause_menu_option_in_cleared_worlds', 'freemode_death_reset_commonvar',
        'testplay_death_reset_commonvar', 'bitmap_color_mode'
    ];
    for (const key of keysToRead) {
        data[key] = reader.readUint32();
    }
    
    data.transparent_color_r = reader.readUint8();
    data.transparent_color_g = reader.readUint8();
    data.transparent_color_b = reader.readUint8();
    // reader.skip(1); // Padding byte often follows 3 uint8s

    const compatKeys = [
        'compat_v2_12', 'compat_v2_60', 'play_death_for_stauts_and_code_exec', 'play_invincibility_effect',
        'invincibility_effect_speed', 'enable_color_invincible_anim', 'return_to_map_pause_menu_option',
        'compat_v5_23', 'compat_v5_54', 'compat_v6_16', 'compat_v6_68', 'compat_v6_76', 'compat_v6_94',
        'unk_compat_alwayson', 'compat_v6_96', 'compat_v7_20', 'compat_v7_22', 'compat_v7_32', 'compat_v7_34',
        'compat_v7_47', 'compat_v7_51', 'compat_v7_59', 'compat_v7_47_nofx', 'compat_v7_47_linfx', 'compat_v7_72',
        'compat_v7_80', 'compat_v7_81', 'compat_v7_82', 'compat_v7_92', 'compat_v8_04', 'compat_v8_07', 'compat_v8_16',
        'compat_v8_17', 'compat_v8_18', 'compat_v8_21', 'compat_v8_25', 'compat_v8_29', 'compat_v8_32', 'compat_v8_36',
        'compat_v8_37', 'compat_v8_40', 'compat_v8_44_higherjump', 'compat_v8_44_delayedjump', 'compat_v8_44_lowerjump',
        'compat_v8_44_detach_riders', 'compat_v8_60', 'compat_v8_73', 'compat_v8_90_wrap', 'compat_v8_90_statuscode',
        'compat_v8_90_walkerY', 'compat_v8_96', 'compat_v9_03', 'compat_v9_11', 'compat_v9_12', 'compat_v9_80', 'compat_v9_85',
        'direct3_color_depth', 'directdraw_color_depth', 'go_title_after_stage_clear'
    ];
    for(const key of compatKeys) {
        data[key] = reader.readUint32();
    }

    data.strings_count = reader.readUint32();
    data.game_title = readStdString(reader);
    data.description = readStdString(reader);

    data.targets = { count: reader.readUint32(), ...parseTargetFlags(reader, TARGET_KEYS) };
    data.targets_reseted = { count: reader.readUint32(), ...parseTargetFlags(reader, TARGET_RESET_KEYS) };
    
    data.status_window_count = reader.readUint32();
    data.status_windows = loadElements(reader, data.status_window_count, parseStatusWindow);

    data.header_initial = reader.readUint32();
    data.story_mode_initial = reader.readUint32();
    data.challenge_mode_initial = reader.readUint32();
    data.free_mode_initial = reader.readUint32();
    data.free_mode_max = reader.readUint32();

    data.header_infinite = reader.readUint32();
    data.story_mode_infinite = reader.readUint32();
    data.challenge_mode_infinite = reader.readUint32();
    data.free_mode_infinite = reader.readUint32();
    data.free_mode_infini_max = reader.readUint32();

    const rankingsCount = reader.readUint32();
    data.rankings_count = rankingsCount;
    data.rankings = loadElements(rankingsCount, () => parseRanking(reader));

    const termsStringsCount = reader.readUint32();
    data.terms_strings_count = termsStringsCount;
    data.terms = parseStringArray(reader, termsStringsCount);

    const soundEffectCount = reader.readUint32();
    data.sound_effect_count = soundEffectCount;
    data.sound_effect_paths = parseStringArray(reader, soundEffectCount);

    const bgmCount = reader.readUint32();
    data.bgm_count = bgmCount;
    data.bgm_values = loadElements(bgmCount, () => reader.readUint32());

    const bgmLoopPlayCount = reader.readUint32();
    data.bgm_loop_play_count = bgmLoopPlayCount;
    data.bgm_loop_play = loadElements(bgmLoopPlayCount, () => reader.readUint8());

    const titleMenuCount = reader.readUint32();
    data.title_menu_texts_count = titleMenuCount;
    data.title_menu_texts = loadElements(titleMenuCount, () => parseMenuText(reader));

    const worldmapMenuCount = reader.readUint32();
    data.worldmap_menu_count = worldmapMenuCount;
    data.worldmap_menu_texts = loadElements(worldmapMenuCount, () => parseMenuText(reader));

    const optionMenuCount = reader.readUint32();
    data.option_menu_count = optionMenuCount;
    data.option_menu_texts = loadElements(optionMenuCount, () => parseMenuText(reader));

    const rankingEntryCount = reader.readUint32();
    data.ranking_entry_count = rankingEntryCount;
    data.ranking_entry_texts = parseStringArray(reader, rankingEntryCount);

    const autoreplaySaveCount = reader.readUint32();
    data.autoreplay_save_count = autoreplaySaveCount;
    data.autoreplay_save_texts = parseStringArray(reader, autoreplaySaveCount);

    const replayOrderCount = reader.readUint32();
    data.replay_order_count = replayOrderCount;
    data.replay_order_texts = parseStringArray(reader, replayOrderCount);

    const settingsIniCount = reader.readUint32();
    data.settings_ini_count = settingsIniCount;
    data.setting_init = loadElements(settingsIniCount, () => parseIniConf(reader));

    return { magic, data };
}

function writeSystemFile(writer, system) {
    if (!system || typeof system !== 'object') {
        throw new TypeError('System payload must be an object.');
    }
    const magic = system.magic ?? system.version;
    writeVersion(writer, magic, new Set([999]));
    
    const data = system.data ?? system;

    // TODO: refactor this with two array like in the read method
    writer.writeUint32(resolveNumeric(data, 'unk0'));
    writer.writeUint32(resolveNumeric(data, 'up_process_on_stage_clear'));
    writer.writeUint32(resolveNumeric(data, 'score_per_1up'));
    writer.writeUint32(resolveNumeric(data, 'space_pause'));
    writer.writeUint32(resolveNumeric(data, 'hide_obj_pause'));
    writer.writeUint32(resolveNumeric(data, 'show_symbol_image'));
    writer.writeUint32(resolveNumeric(data, 'font_index'));
    writer.writeUint32(resolveNumeric(data, 'decoration'));
    writer.writeUint32(resolveNumeric(data, 'monospace'));
    writer.writeUint32(resolveNumeric(data, 'min_damage_reduct_base'));
    writer.writeUint32(resolveNumeric(data, 'min_damage_reduct_percent'));
    writer.writeUint32(resolveNumeric(data, 'min_shock_reduct_base'));
    writer.writeUint32(resolveNumeric(data, 'min_shock_reduct_percent'));
    writer.writeUint32(resolveNumeric(data, 'enable_test_play_everywhere'));
    writer.writeUint32(resolveNumeric(data, 'character_draw'));
    writer.writeUint32(resolveNumeric(data, 'allow_replay_save'));
    writer.writeUint32(resolveNumeric(data, 'alow_manual_replay_save'));
    writer.writeUint32(resolveNumeric(data, 'replay_file_format'));
    writer.writeUint32(resolveNumeric(data, 'use_explorer_file_dialog_for_file_select'));
    writer.writeUint32(resolveNumeric(data, 'show_image_on_title_screen'));
    writer.writeUint32(resolveNumeric(data, 'auto_save_default'));
    writer.writeUint32(resolveNumeric(data, 'show_description'));
    writer.writeUint32(resolveNumeric(data, 'share_lives_across_story'));
    writer.writeUint32(resolveNumeric(data, 'return_worldmap_on_death'));
    writer.writeUint32(resolveNumeric(data, 'show_lives_on_worldmap'));
    writer.writeUint32(resolveNumeric(data, 'multistage_autosave_after_each_stage'));
    writer.writeUint32(resolveNumeric(data, 'challenge_mode_world'));
    writer.writeUint32(resolveNumeric(data, 'all_worlds_selectable_on_start'));
    writer.writeUint32(resolveNumeric(data, 'show_highscore'));
    writer.writeUint32(resolveNumeric(data, 'show_totalscore'));
    writer.writeUint32(resolveNumeric(data, 'always_reset_commonvar_on_worldmap'));
    writer.writeUint32(resolveNumeric(data, 'retry_pause_menu_option_in_cleared_worlds'));
    writer.writeUint32(resolveNumeric(data, 'challenge_show_highscore'));
    writer.writeUint32(resolveNumeric(data, 'challenge_show_totalscore'));
    writer.writeUint32(resolveNumeric(data, 'challenge_death_reset_commonvar'));
    writer.writeUint32(resolveNumeric(data, 'challenge_retry_pause_menu_option_in_cleared_worlds'));
    writer.writeUint32(resolveNumeric(data, 'freemode_death_reset_commonvar'));
    writer.writeUint32(resolveNumeric(data, 'testplay_death_reset_commonvar'));
    writer.writeUint32(resolveNumeric(data, 'bitmap_color_mode'));
    writer.writeUint8(resolveNumeric(data, 'transparent_color_r'));
    writer.writeUint8(resolveNumeric(data, 'transparent_color_g'));
    writer.writeUint8(resolveNumeric(data, 'transparent_color_b'));
    writer.writeUint32(resolveNumeric(data, 'compat_v2_12'));
    writer.writeUint32(resolveNumeric(data, 'compat_v2_60'));
    writer.writeUint32(resolveNumeric(data, 'play_death_for_stauts_and_code_exec'));
    writer.writeUint32(resolveNumeric(data, 'play_invincibility_effect'));
    writer.writeUint32(resolveNumeric(data, 'invincibility_effect_speed'));
    writer.writeUint32(resolveNumeric(data, 'enable_color_invincible_anim'));
    writer.writeUint32(resolveNumeric(data, 'return_to_map_pause_menu_option'));
    writer.writeUint32(resolveNumeric(data, 'compat_v5_23'));
    writer.writeUint32(resolveNumeric(data, 'compat_v5_54'));
    writer.writeUint32(resolveNumeric(data, 'compat_v6_16'));
    writer.writeUint32(resolveNumeric(data, 'compat_v6_68'));
    writer.writeUint32(resolveNumeric(data, 'compat_v6_76'));
    writer.writeUint32(resolveNumeric(data, 'compat_v6_94'));
    writer.writeUint32(resolveNumeric(data, 'unk_compat_alwayson'));
    writer.writeUint32(resolveNumeric(data, 'compat_v6_96'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_20'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_22'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_32'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_34'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_47'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_51'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_59'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_47_nofx'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_47_linfx'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_72'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_80'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_81'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_82'));
    writer.writeUint32(resolveNumeric(data, 'compat_v7_92'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_04'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_07'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_16'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_17'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_18'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_21'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_25'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_29'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_32'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_36'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_37'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_40'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_44_higherjump'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_44_delayedjump'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_44_lowerjump'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_44_detach_riders'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_60'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_73'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_90_wrap'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_90_statuscode'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_90_walkerY'));
    writer.writeUint32(resolveNumeric(data, 'compat_v8_96'));
    writer.writeUint32(resolveNumeric(data, 'compat_v9_03'));
    writer.writeUint32(resolveNumeric(data, 'compat_v9_11'));
    writer.writeUint32(resolveNumeric(data, 'compat_v9_12'));
    writer.writeUint32(resolveNumeric(data, 'compat_v9_80'));
    writer.writeUint32(resolveNumeric(data, 'compat_v9_85'));
    writer.writeUint32(resolveNumeric(data, 'direct3_color_depth'));
    writer.writeUint32(resolveNumeric(data, 'directdraw_color_depth'));
    writer.writeUint32(resolveNumeric(data, 'go_title_after_stage_clear'));

    const stringsCount = resolveNumeric(data, 'strings_count', 2);
    writer.writeUint32(stringsCount);
    writeStdString(writer, data.game_title ?? system.game_title);
    writeStdString(writer, data.description ?? system.description);

    const targets = data.targets ?? {};
    const targetsCount = resolveNumeric(targets, 'count', resolveNumeric(data, 'targets_count'));
    writer.writeUint32(targetsCount);
    writeTargetFlags(writer, targets, TARGET_KEYS);

    const targetsReseted = data.targets_reseted ?? {};
    const targetsResetedCount = resolveNumeric(targetsReseted, 'count', resolveNumeric(data, 'targets_reseted_count'));
    writer.writeUint32(targetsResetedCount);
    writeTargetFlags(writer, targetsReseted, TARGET_RESET_KEYS);

    const statusWindows = Array.isArray(data.status_windows) ? data.status_windows : [];
    const statusWindowCount = resolveNumeric(data, 'status_window_count', statusWindows.length);
    writer.writeUint32(statusWindowCount);
    writeElements(statusWindows.slice(0, statusWindowCount), (window) => writeStatusWindow(writer, window));

    writer.writeUint32(resolveNumeric(data, 'header_initial'));
    writer.writeUint32(resolveNumeric(data, 'story_mode_initial'));
    writer.writeUint32(resolveNumeric(data, 'challenge_mode_initial'));
    writer.writeUint32(resolveNumeric(data, 'free_mode_initial'));
    writer.writeUint32(resolveNumeric(data, 'free_mode_max'));

    writer.writeUint32(resolveNumeric(data, 'header_infinite'));
    writer.writeUint32(resolveNumeric(data, 'story_mode_infinite'));
    writer.writeUint32(resolveNumeric(data, 'challenge_mode_infinite'));
    writer.writeUint32(resolveNumeric(data, 'free_mode_infinite'));
    writer.writeUint32(resolveNumeric(data, 'free_mode_infini_max'));

    const rankings = Array.isArray(data.rankings) ? data.rankings : [];
    const rankingsCount = resolveNumeric(data, 'rankings_count', rankings.length);
    writer.writeUint32(rankingsCount);
    writeElements(rankings.slice(0, rankingsCount), (ranking) => writeRanking(writer, ranking));

    const terms = Array.isArray(data.terms) ? data.terms : [];
    const termsCount = resolveNumeric(data, 'terms_strings_count', terms.length);
    writer.writeUint32(termsCount);
    writeStringArray(writer, terms.slice(0, termsCount));

    const soundEffectPaths = Array.isArray(data.sound_effect_paths) ? data.sound_effect_paths : [];
    const soundEffectCount = resolveNumeric(data, 'sound_effect_count', soundEffectPaths.length);
    writer.writeUint32(soundEffectCount);
    writeStringArray(writer, soundEffectPaths.slice(0, soundEffectCount));

    const bgmValues = Array.isArray(data.bgm_values) ? data.bgm_values : [];
    const bgmCount = resolveNumeric(data, 'bgm_count', bgmValues.length);
    writer.writeUint32(bgmCount);
    for (let index = 0; index < bgmCount; index += 1) {
        writer.writeUint32(bgmValues[index] ?? 0);
    }

    const bgmLoop = Array.isArray(data.bgm_loop_play) ? data.bgm_loop_play : [];
    const bgmLoopCount = resolveNumeric(data, 'bgm_loop_play_count', bgmLoop.length);
    writer.writeUint32(bgmLoopCount);
    for (let index = 0; index < bgmLoopCount; index += 1) {
        writer.writeUint8(bgmLoop[index] ?? 0);
    }

    const titleMenuTexts = Array.isArray(data.title_menu_texts) ? data.title_menu_texts : [];
    const titleMenuCount = resolveNumeric(data, 'title_menu_texts_count', titleMenuTexts.length);
    writer.writeUint32(titleMenuCount);
    writeElements(titleMenuTexts.slice(0, titleMenuCount), (entry) => writeMenuText(writer, entry));

    const worldmapMenuTexts = Array.isArray(data.worldmap_menu_texts) ? data.worldmap_menu_texts : [];
    const worldmapMenuCount = resolveNumeric(data, 'worldmap_menu_count', worldmapMenuTexts.length);
    writer.writeUint32(worldmapMenuCount);
    writeElements(worldmapMenuTexts.slice(0, worldmapMenuCount), (entry) => writeMenuText(writer, entry));

    const optionMenuTexts = Array.isArray(data.option_menu_texts) ? data.option_menu_texts : [];
    const optionMenuCount = resolveNumeric(data, 'option_menu_count', optionMenuTexts.length);
    writer.writeUint32(optionMenuCount);
    writeElements(optionMenuTexts.slice(0, optionMenuCount), (entry) => writeMenuText(writer, entry));

    const rankingEntryTexts = Array.isArray(data.ranking_entry_texts) ? data.ranking_entry_texts : [];
    const rankingEntryCount = resolveNumeric(data, 'ranking_entry_count', rankingEntryTexts.length);
    writer.writeUint32(rankingEntryCount);
    writeStringArray(writer, rankingEntryTexts.slice(0, rankingEntryCount));

    const autoreplayTexts = Array.isArray(data.autoreplay_save_texts) ? data.autoreplay_save_texts : [];
    const autoreplayCount = resolveNumeric(data, 'autoreplay_save_count', autoreplayTexts.length);
    writer.writeUint32(autoreplayCount);
    writeStringArray(writer, autoreplayTexts.slice(0, autoreplayCount));

    const replayOrderTexts = Array.isArray(data.replay_order_texts) ? data.replay_order_texts : [];
    const replayOrderCount = resolveNumeric(data, 'replay_order_count', replayOrderTexts.length);
    writer.writeUint32(replayOrderCount);
    writeStringArray(writer, replayOrderTexts.slice(0, replayOrderCount));

    const settingsIni = Array.isArray(data.setting_init) ? data.setting_init : [];
    const settingsIniCount = resolveNumeric(data, 'settings_ini_count', settingsIni.length);
    writer.writeUint32(settingsIniCount);
    writeElements(settingsIni.slice(0, settingsIniCount), (conf) => writeIniConf(writer, conf));
    return writer.toArrayBuffer();
}


// --- Stream Handling ---

class SystemTransformStream {
    constructor() {
        let fileBuffer = new Uint8Array(0);
        this.stream = new TransformStream({
            transform(chunk, controller) {
                const newBuffer = new Uint8Array(fileBuffer.length + chunk.length);
                newBuffer.set(fileBuffer, 0);
                newBuffer.set(chunk, fileBuffer.length);
                fileBuffer = newBuffer;
            },
            flush(controller) {
                try {
                    const result = parseSystemFile(fileBuffer.buffer);
                    controller.enqueue(result);
                } catch (e) {
                    controller.error(e);
                }
            }
        });
        this.readable = this.stream.readable;
        this.writable = this.stream.writable;
    }
}

/**
 * Parses a System.dat file from a web stream.
 * @param {ReadableStream} stream - The stream of the file.
 * @returns {Promise<object>} A promise that resolves with the parsed system object.
 */
export async function parseSystem(stream) {
    const transformStream = new SystemTransformStream();
    const parsedStream = stream.pipeThrough(transformStream.stream);
    const reader = parsedStream.getReader();
    const { value } = await reader.read();
    return value;
}

/**
 * Serializes a system object to a ReadableStream of bytes.
 * @param {object} data - The system data object.
 * @returns {ReadableStream<Uint8Array>}
 */
export function serializeSystem(data) {
    return new ReadableStream({
        start(controller) {
            try {
                const writer = new DataWriter();
                writeSystemFile(writer, data);
                const buffer = writer.toBuffer();
                controller.enqueue(new Uint8Array(buffer));
                controller.close();
            } catch (e) {
                console.error("Error during System.dat serialization:", e);
                controller.error(e);
            }
        }
    });
}