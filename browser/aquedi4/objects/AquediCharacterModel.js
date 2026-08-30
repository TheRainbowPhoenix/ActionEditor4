const CHARACTER_INHERIT_GROUPS = [
    ['inherit_character_name', ['character_name']],
    ['inherit_operation', ['operation']],
    ['inherit_faction', ['faction']],
    ['inherit_character_id', ['character_id']],
    ['inherit_appearance_condition', ['any_of_appearance_conditions_true', 'appearance_condition_once_met_always_true', 'conditions']],
    ['inherit_facing_right', ['facing_right']],
    ['inherit_number_of_doubles', ['number_of_doubles']],
    ['inherit_initial_position_offset_x', [
        'appearance_position_offset_x_bl',
        'appearance_position_offset_x_dot',
        'appearance_position_offset_x_flip_if_facing_right'
    ]],
    ['inherit_initial_position_offset_y', [
        'appearance_position_offset_y_bl',
        'appearance_position_offset_y_dot',
        'appearance_position_offset_y_flip_if_facing_right'
    ]],
    ['inherit_image', ['image_number', 'image_type', 'image_offset']],
    ['inherit_animation_set', ['animation_set']],
    ['inherit_z_coordinate', ['z_coordinate']],
    ['inherit_transparency', ['transparency']],
    ['inherit_initial_character_effect', [
        'initial_character_effect',
        'initial_character_effect_execution_type',
        'initial_character_effect_loop_execution'
    ]],
    ['inherit_character_effect_on_death', ['character_effect_on_death', 'character_effect_on_death_execution_type']],
    ['inherit_mark', ['mark_display', 'mark_number']],
    ['inherit_direction_fixed', ['direction_fixed']],
    ['inherit_flying', ['flying']],
    ['inherit_invincible', ['invincible', 'invincible_effect']],
    ['inherit_block', ['block']],
    ['inherit_gigantic', ['gigantic']],
    ['inherit_synchronize_with_auto_scroll', ['synchronize_with_auto_scroll']],
    ['inherit_line_of_sight', ['line_of_sight', 'line_of_sight_range']],
    ['inherit_hp', ['hp']],
    ['inherit_sp', ['sp']],
    ['inherit_body_hit_detection_range', ['body_hit_detection_range']],
    ['inherit_body_hit_power', ['body_hit_power']],
    ['inherit_body_hit_impact', ['body_hit_impact']],
    ['inherit_body_hit_effect', ['body_hit_effect']],
    ['inherit_defense', ['defense']],
    ['inherit_impact_resistance', ['impact_resistance']],
    ['inherit_stopping_ease_during_inertial_movement', ['stopping_ease_during_inertial_movement']],
    ['inherit_action_condition', ['action_condition_range', 'action_condition_judgment_type']],
    ['inherit_group', ['has_group', 'group_number']],
    ['inherit_score', ['score']],
    ['inherit_holds_item_at_same_position', ['holds_item_at_same_position']],
    ['inherit_action', ['flows']]
];

export const AQUEDI_FLOW_TIMING = Object.freeze({
    ALWAYS: 0,
    DAMAGE_TAKEN_POWER_NONZERO: 1,
    DAMAGE_TAKEN_ANY: 2,
    SHOCK_TAKEN_STRENGTH_NONZERO: 3,
    SHOCK_TAKEN_ANY_DIRECTION: 4,
    ON_DEATH: 5,
    HIT_CHARACTER: 6,
    HIT_BLOCK_CHARACTER: 7,
    RIDING_BLOCK: 8,
    HIT_SHOT: 9,
    HIT_ITEM: 10,
    HIT_BLOCK: 11,
    BLOCK_HIT_LR: 12,
    BLOCK_HIT_LEFT: 13,
    BLOCK_HIT_RIGHT: 14,
    BLOCK_HIT_UD: 15,
    BLOCK_HIT_UP: 16,
    BLOCK_HIT_DOWN: 17,
    HERO_RIDING: 18,
    CHARACTER_RIDING: 19
});

function cloneValue(value) {
    if (Array.isArray(value)) return value.map(cloneValue);
    if (value && typeof value === 'object') return { ...value };
    return value;
}

function paletteCharacters(paletteData) {
    return paletteData?.palette?.characters || paletteData?.characters || [];
}

export class AquediCharacterDefinition {
    constructor(raw, source = 'stage') {
        this.raw = raw || {};
        this.source = source;
    }

    get name() { return this.raw.character_name || ''; }
    get isPlayerControlled() { return this.raw.faction === 0 && this.raw.operation === 0; }
    get isActor() { return !this.isPlayerControlled; }
}

export class CharacterInheritanceResolver {
    constructor({ stagePalette = null, commonPalette = null } = {}) {
        this.stagePalette = stagePalette;
        this.commonPalette = commonPalette;
    }

    resolve(rawCharacter) {
        const local = rawCharacter || {};
        const parent = this._findParent(local);
        const resolved = { ...local };

        if (parent) {
            for (const [flag, fields] of CHARACTER_INHERIT_GROUPS) {
                if (!local[flag]) continue;
                for (const field of fields) {
                    if (Object.prototype.hasOwnProperty.call(parent, field)) {
                        resolved[field] = cloneValue(parent[field]);
                    }
                }
            }
        }

        resolved.rawCharacter = local;
        resolved.parentCharacter = parent || null;
        resolved.paletteSource = parent ? this._paletteSourceName(local) : 'stage';
        return new AquediCharacterDefinition(resolved, resolved.paletteSource);
    }

    _findParent(local) {
        if (!local.inherit_palette) return null;

        const chars = this._paletteCharsFor(local.inherit_palette);
        if (!chars.length) return null;

        const index = local.inherit_palette_data_number || 0;
        return chars[index] || null;
    }

    _paletteCharsFor(kind) {
        if (kind === 1) return paletteCharacters(this.commonPalette);
        if (kind === 2) return paletteCharacters(this.stagePalette);
        return [];
    }

    _paletteSourceName(local) {
        if (local.inherit_palette === 1) return 'common';
        if (local.inherit_palette === 2) return 'stage-palette';
        return 'stage';
    }
}

export function normalizeActorCommandDetails(command) {
    const details = command?.details || {};
    if (command?.type !== 3 || !details.bytes6_101) return details;

    const bytes = details.bytes6_101;
    const u8 = (i) => bytes[i] || 0;
    const u16 = (i) => u8(i) | (u8(i + 1) << 8);

    return {
        ...details,
        animation_and_other_type: u16(3),
        movement_direction_setting_type: u8(20),
        movement_direction_direction: u8(21),
        movement_direction_angle_reverse_rotation_if_facing_right: u8(26),
        movement_direction_target_x_present: u8(27),
        movement_direction_target_y_present: u8(28),
        movement_direction_execute_until_target_coordinate_reached: u8(41),
        movement_direction_invalidate_horizontal_movement: u8(42),
        movement_direction_invalidate_vertical_movement: u8(43),
        movement_direction_target_x_flip_if_facing_right: u8(44),
        movement_direction_target_y_flip_if_facing_right: u8(45),
        movement_direction_reverse_speed_if_direction_changes: u8(46),
        movement_direction_prevent_blur: u8(47),
        movement_direction_dont_change_character_direction: u8(48),
        time_speed_distance_setting_type: u8(49),
        time_speed_distance_speed: u16(50),
        time_speed_distance_speed_double: u16(52),
        time_speed_distance_distance: u16(54),
        time_speed_distance_distance_double: u16(56),
        time_speed_distance_distance_unit: u8(58),
        inertia_present: u8(63),
        inertia_max_speed: u16(64),
        animation_type: u8(74)
    };
}
