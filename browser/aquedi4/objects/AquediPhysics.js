// Player/entity physics mirrored from ActionEditor4 v1.020 blackbox traces.
// This module is intentionally Phaser-free so it can be tested against Frida captures.

export const AQUEDI_PHYSICS = Object.freeze({
    TILE: 32,
    FIXED_DT: 1 / 60,
    SUBSTEPS: 10,
    GRAVITY: 0.004,
    MAX_ENTITY_SPEED: 6,
    SCALAR_FRICTION: 10,
    DEFAULT_DECAY_STEP: 0.0081,
    PLAYER_WALK_SPEED: 0.4,
    PLAYER_JUMP_SPEED: -0.75
});

export function physicsScalarPerFrame60(value, scalarFriction = AQUEDI_PHYSICS.SCALAR_FRICTION) {
    return value / scalarFriction / 60;
}

export function decayTowardZero(value, step, enabled) {
    if (!enabled || value === 0) return value;
    if (value < 0) return Math.min(0, value + step);
    return Math.max(0, value - step);
}

export class PlayerEntity {
    constructor(options = {}) {
        this.xmin = options.xmin ?? options.xMin ?? 0;
        this.ymin = options.ymin ?? options.yMin ?? 0;
        this.width = options.width ?? 16;
        this.height = options.height ?? 24;
        this.refreshBounds();

        this.speedX = options.speedX ?? options.velX ?? 0;
        this.speedY = options.speedY ?? options.velY ?? 0;
        this.accelX = options.accelX ?? 0;
        this.accelY = options.accelY ?? 0;
        this.impactX = options.impactX ?? 0;
        this.impactY = options.impactY ?? 0;
        this.previousImpactY = options.previousImpactY ?? options.prevImpactY ?? 0;
        this.accelDecayStep = options.accelDecayStep ?? options.decay ?? AQUEDI_PHYSICS.DEFAULT_DECAY_STEP;
        this.enableDecayX = options.enableDecayX ?? options.decayX ?? 1;
        this.enableDecayY = options.enableDecayY ?? options.decayY ?? 1;

        this.movementAxisMode = options.movementAxisMode ?? options.mode ?? 0;
        this.gravitySuppress = options.gravitySuppress ?? 0;
        this.standingParent = options.standingParent ?? 0;
        this.floorState = options.floorState ?? options.floor ?? 0;

        this.speedScalar = options.speedScalar ?? AQUEDI_PHYSICS.PLAYER_WALK_SPEED;
        this.moveXModifierEnabled = options.moveXModifierEnabled ?? options.modEnabled ?? 0;
        this.moveXModifierMode = options.moveXModifierMode ?? options.modMode ?? 0;
        this.moveXModifierFactor = options.moveXModifierFactor ?? options.modFactor ?? 1;

        this.collLayer = options.collLayer ?? 0;
        this.flying = !!options.flying;
        this.onGround = !!options.onGround;
        this.airTime = options.airTime ?? 0;
        this.walkSpeed = options.walkSpeed ?? AQUEDI_PHYSICS.PLAYER_WALK_SPEED;
        this.jumpSpeed = options.jumpSpeed ?? AQUEDI_PHYSICS.PLAYER_JUMP_SPEED;

        this.contactL = false;
        this.contactR = false;
        this.contactT = false;
        this.contactB = false;
        this.sprite = options.sprite ?? null;
        this.active = options.active ?? true;
    }

    static atTile(tileX, tileY, width, height, collLayer, scroll = 10, tile = AQUEDI_PHYSICS.TILE, options = {}) {
        const centerX = (tileX + scroll) * tile + tile / 2;
        const bottomY = (tileY + scroll + 1) * tile - 1;
        return new PlayerEntity({
            ...options,
            xmin: centerX - (width - 1) * 0.5,
            ymin: bottomY - height + 1,
            width,
            height,
            collLayer
        });
    }

    get velX() { return this.speedX; }
    set velX(value) { this.speedX = value; }

    get velY() { return this.speedY; }
    set velY(value) { this.speedY = value; }

    get prevImpactY() { return this.previousImpactY; }
    set prevImpactY(value) { this.previousImpactY = value; }

    refreshPositionX() {
        this.xmax = this.xmin + this.width - 1;
    }

    refreshPositionY() {
        this.ymax = this.ymin + this.height - 1;
    }

    refreshBounds() {
        this.refreshPositionX();
        this.refreshPositionY();
    }

    translateX(delta) {
        this.xmin += delta;
        this.xmax += delta;
    }

    translateY(delta) {
        this.ymin += delta;
        this.ymax += delta;
    }

    clearContacts() {
        this.contactL = false;
        this.contactR = false;
        this.contactT = false;
        this.contactB = false;
    }

    applyGravity(constants = AQUEDI_PHYSICS) {
        if (this.movementAxisMode !== 0) return 1;
        if (this.standingParent) return 1;
        if (this.gravitySuppress) return 1;
        if (this.impactY < 0) return 1;
        this.speedY += constants.GRAVITY;
        return 0;
    }

    moveX(constants = AQUEDI_PHYSICS) {
        if (this.impactX !== 0) {
            this.speedX = this.impactX;
        } else if (this.accelX !== 0) {
            this.accelX = decayTowardZero(this.accelX, this.accelDecayStep, this.enableDecayX);
            if (this.moveXModifierEnabled && this.moveXModifierMode === 3) {
                const modifier = physicsScalarPerFrame60(this.speedScalar, constants.SCALAR_FRICTION) *
                    (this.moveXModifierFactor - 1);
                if (this.accelX <= 0) {
                    this.accelX -= modifier;
                    if (this.accelX > 0) this.accelX = 0;
                } else {
                    this.accelX += modifier;
                    if (this.accelX < 0) this.accelX = 0;
                }
            }
            this.speedX += this.accelX;
        }

        this.speedX = clamp(this.speedX, -constants.MAX_ENTITY_SPEED, constants.MAX_ENTITY_SPEED);
        this.xmin += this.speedX;
        this.refreshPositionX();
        return 0;
    }

    moveY(constants = AQUEDI_PHYSICS) {
        if (this.impactY !== 0 || this.previousImpactY !== 0) {
            this.speedY = this.speedY - this.previousImpactY + this.impactY;
            this.previousImpactY = this.impactY;
        } else if (this.movementAxisMode !== 0 && this.accelY !== 0) {
            this.accelY = decayTowardZero(this.accelY, this.accelDecayStep, this.enableDecayY);
            this.speedY += this.accelY;
        }

        this.speedY = clamp(this.speedY, -constants.MAX_ENTITY_SPEED, constants.MAX_ENTITY_SPEED);
        this.ymin += this.speedY;
        this.refreshPositionY();
        return 0;
    }

    setHorizontalInput(direction) {
        this.speedX = direction * this.walkSpeed;
    }

    jump() {
        this.speedY = this.jumpSpeed;
        this.onGround = false;
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
