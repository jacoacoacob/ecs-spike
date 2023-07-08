import type { EntityWith } from "../lib/entity";
import type { Sprite, World } from "../entity";
import type { Velocity } from "../component/velocity";
import type { AppSystemParams } from "./types";
import { Keyboard } from "../resource/keyboard";
import { Camera } from "../component/camera";

function accel(
    entity: EntityWith<Velocity>,
    direction: keyof Velocity["value"],
    force: number,
    limit: number
) {
    if (
        force > 0 &&
        entity.components.velocity[direction] + force >= limit
    ) {
        entity.components.velocity[direction] = limit;
    }
    else if (
        force < 0 &&
        entity.components.velocity[direction] + force <= limit
    ) {
        entity.components.velocity[direction] = limit;
    }
    else {
        entity.components.velocity[direction] += force;
    }
}

const ACCEL = 0.2;
const DECEL = 0.1;
const MAX_VELOCITY = 8;

function accelerateSprite(sprite: Sprite, keyboard: Keyboard["data"]) {
    const arrowDown = keyboard.pressed("ArrowDown");
    const arrowUp = keyboard.pressed("ArrowUp");

    if (arrowDown.timestamp > arrowUp.timestamp) {
        accel(sprite, "dy", ACCEL, MAX_VELOCITY);
    }
    else if (arrowDown.timestamp < arrowUp.timestamp) {
        accel(sprite, "dy", -ACCEL, -MAX_VELOCITY);
    }
    else if (sprite.components.velocity.dy > 0) {
        accel(sprite, "dy", -DECEL, 0);
    }
    else {
        accel(sprite, "dy", DECEL, 0);
    }

    const arrowLeft = keyboard.pressed("ArrowLeft");
    const arrowRight = keyboard.pressed("ArrowRight");

    if (arrowLeft.timestamp > arrowRight.timestamp) {
        accel(sprite, "dx", -ACCEL, -MAX_VELOCITY);
    }
    else if (arrowLeft.timestamp < arrowRight.timestamp) {
        accel(sprite, "dx", ACCEL, MAX_VELOCITY);
    }
    else if (sprite.components.velocity.dx > 0) {
        accel(sprite, "dx", -DECEL, 0);
    }
    else {
        accel(sprite, "dx", DECEL, 0);
    }
}

function moveCamera(world: World, keyboard: Keyboard["data"]) {
    const up = keyboard.pressed("w");
    const down = keyboard.pressed("s");
    const left = keyboard.pressed("a");
    const right = keyboard.pressed("d");

    const { rows, cols, tileSize } = world.components.tileMap;

    const camera = world.components.camera;

    const maxOffsetX = cols * tileSize - camera.viewport.size.w;
    const maxOffsetY = rows * tileSize - camera.viewport.size.h;

    const dirX = left.timestamp > right.timestamp
        ? -4
        : left.timestamp < right.timestamp
            ? 4
            : 0;

    const dirY = up.timestamp > down.timestamp
        ? -4
        : up.timestamp < down.timestamp
            ? 4
            : 0;
    
    const newOffsetX = Math.max(0, Math.min(camera.offsetX + dirX, maxOffsetX));
    const newOffsetY = Math.max(0, Math.min(camera.offsetY + dirY, maxOffsetY));

    let isUpdated = false;

    if (newOffsetX !== camera.offsetX) {
        isUpdated = true;
        camera.offsetX = newOffsetX;
    }

    if (newOffsetY !== camera.offsetY) {
        isUpdated = true;
        camera.offsetY = newOffsetY;
    }

    if (isUpdated) {
        console.log(camera)
    }
}

function respondToKeyboardInput({ getResource, getEntityById }: AppSystemParams) {
    const keyboard = getResource("keyboard");
    const p1 = getEntityById("p1") as Sprite;
    const world = getEntityById("world") as World;
    
    accelerateSprite(p1, keyboard);
    moveCamera(world, keyboard);
}

export { respondToKeyboardInput };
