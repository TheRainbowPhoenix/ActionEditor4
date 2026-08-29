// Player/entity physics mirrored from ActionEditor4 v1.020 blackbox traces.
// This module is intentionally Phaser-free so it can be tested against Frida captures.

export const AQUEDI_PHYSICS = Object.freeze({
    TILE: 32,
    HALF_TILE: 16,
    FIXED_DT: 1 / 60,
    SUBSTEPS: 10,
    GRAVITY: 0.004,
    MAX_ENTITY_SPEED: 6,
    FRAME_RATE_CONSTANT: 60,
    SCALAR_FRICTION: 10,
    DEFAULT_DECAY_STEP: 0.0081,
    PLAYER_WALK_SPEED: 0.4,
    PLAYER_JUMP_SPEED: -0.929603
});

export function physicsScalarPerFrame60(value, scalarFriction = AQUEDI_PHYSICS.SCALAR_FRICTION) {
    return value / scalarFriction / 60;
}

export function computeJumpInitialSpeed(heightPixels, gravity = AQUEDI_PHYSICS.GRAVITY) {
    return (-gravity - Math.sqrt((heightPixels * 8.0 + gravity) * gravity)) * 0.5;
}

export function computeModifiedJumpInitialSpeed(
    heightPixels,
    playerControlledFlag = 0,
    modifierEnabled = 1,
    modifierScalar = 0.4,
    gravity = AQUEDI_PHYSICS.GRAVITY
) {
    const base = computeJumpInitialSpeed(heightPixels, gravity);
    if (modifierEnabled && !playerControlledFlag) {
        return base * (0.99 - modifierScalar * 0.025);
    }
    return base;
}

export function computeJumpDurationFrames(
    speed,
    gravity = AQUEDI_PHYSICS.GRAVITY,
    frameRateConstant = AQUEDI_PHYSICS.FRAME_RATE_CONSTANT
) {
    return Math.trunc(frameRateConstant - speed / gravity);
}

export function computeJumpDurationTicks(
    speed,
    substeps = AQUEDI_PHYSICS.SUBSTEPS
) {
    return Math.trunc(computeJumpDurationFrames(speed) / substeps / 6) + 1;
}

export function commandSpeedToSubstepSpeed(speed, formSpeed = 0) {
    return (Number(speed || 0) + Number(formSpeed || 0)) * 0.01;
}

export function commandJumpHeightToPixels(height) {
    return Number(height || 0) * AQUEDI_PHYSICS.HALF_TILE;
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
        this.jumpLatch = options.jumpLatch ?? 0;
        this.jumpWindowCounter = options.jumpWindowCounter ?? 0;
        this.playerControlledFlag = options.playerControlledFlag ?? (options.isPlayer ? 0 : 1);
        this.walkSpeed = options.walkSpeed ?? AQUEDI_PHYSICS.PLAYER_WALK_SPEED;
        this.jumpSpeed = options.jumpSpeed ?? AQUEDI_PHYSICS.PLAYER_JUMP_SPEED;
        this.facingRight = options.facingRight ?? true;

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
        this.startJump(this.jumpSpeed);
    }

    startJump(speed = this.jumpSpeed) {
        this.speedY = speed;
        this.onGround = false;
        this.jumpLatch = 1;
        this.jumpWindowCounter = 1;
    }

    startJumpFromHeight(heightUnits, modifierEnabled = 1, modifierScalar = this.speedScalar) {
        const heightPixels = commandJumpHeightToPixels(heightUnits);
        this.startJump(computeModifiedJumpInitialSpeed(
            heightPixels,
            this.playerControlledFlag,
            modifierEnabled,
            modifierScalar
        ));
    }
}

export class ActorEntity extends PlayerEntity {
    constructor(options = {}) {
        super({
            ...options,
            playerControlledFlag: options.playerControlledFlag ?? 1
        });
        this.isActor = true;
        this.nodeByte1E2 = options.nodeByte1E2 ?? 0;
        this.removeFlag = options.removeFlag ?? 0;
        this.entityGate104 = options.entityGate104 ?? 1;
        this.entityGate4D4 = options.entityGate4D4 ?? 0;
        this.actions = options.actions ?? [];
        this.actionCursor = 0;
        this.actionTicks = 0;
        this.activationMargin = options.activationMargin ?? AQUEDI_PHYSICS.TILE * 4;
    }

    canRunPhysics() {
        return !this.nodeByte1E2 && !this.removeFlag && !!this.entityGate104 && !!this.entityGate4D4;
    }
}

export class ActorEntityList {
    constructor(items = []) {
        this.items = [];
        for (const item of items) this.push(item);
    }

    push(entity) {
        this.items.push({ entity });
        return entity;
    }

    remove(entity) {
        const idx = this.items.findIndex(node => node.entity === entity);
        if (idx >= 0) this.items.splice(idx, 1);
    }

    *entities() {
        for (const node of this.items) yield node.entity;
    }

    get count() {
        return this.items.length;
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
