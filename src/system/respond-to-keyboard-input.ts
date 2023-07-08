import type { EntityWith } from "../lib/entity";
import type { Sprite, World, Camera } from "../entity";
import type { Velocity } from "../component/velocity";
import type { AppSystemParams } from "./types";
import { Keyboard, whichDirection } from "../resource/keyboard";
import { Size } from "../component/size";

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

const MAX_CAMERA_SPEED = 10;

function moveCamera(world: World, camera: Camera, keyboard: Keyboard["data"]) {
    const up = keyboard.pressed("w");
    const down = keyboard.pressed("s");
    const left = keyboard.pressed("a");
    const right = keyboard.pressed("d");

    const dy = whichDirection(up, down, MAX_CAMERA_SPEED);
    const dx = whichDirection(right, left, MAX_CAMERA_SPEED);

    // TODO: Move below logic to a physics system or something.
    // This system should not need to be so 'world-aware'
    const { cols, rows, tileSize } = world.components.tileMap;
    const { translation } = camera.components.transform;
    const { w: viewportWidth, h: viewportHeight } = camera.components.size;

    const maxTranslationX = cols * tileSize - viewportWidth;
    const maxTranslationY = rows * tileSize - viewportHeight;

    if (translation.x + dx > 0 && translation.x + dx <= maxTranslationX) {
        camera.components.velocity.dx = dx;
    }
    else {
        camera.components.velocity.dx = 0;
    }

    if (translation.y + dy >= 0 && translation.y + dy <= maxTranslationY) {
        camera.components.velocity.dy = dy;
    }
    else {
        camera.components.velocity.dy = 0;
    }
}

// function moveCamera(world: World, keyboard: Keyboard["data"]) {
//     const up = keyboard.pressed("w");
//     const down = keyboard.pressed("s");
//     const left = keyboard.pressed("a");
//     const right = keyboard.pressed("d");

//     const { rows, cols, tileSize } = world.components.tileMap;

//     const camera = world.components.camera;

//     const maxOffsetX = cols * tileSize - camera.viewport.size.w;
//     const maxOffsetY = rows * tileSize - camera.viewport.size.h;

//     const CAMERA_SPEED = 10;

//     const dirX = left.timestamp > right.timestamp
//         ? -CAMERA_SPEED
//         : left.timestamp < right.timestamp
//             ? CAMERA_SPEED
//             : 0;

//     const dirY = up.timestamp > down.timestamp
//         ? -CAMERA_SPEED
//         : up.timestamp < down.timestamp
//             ? CAMERA_SPEED
//             : 0;
    
//     const newOffsetX = Math.max(0, Math.min(camera.offsetX + dirX, maxOffsetX));
//     const newOffsetY = Math.max(0, Math.min(camera.offsetY + dirY, maxOffsetY));

//     let isUpdated = false;

//     if (newOffsetX !== camera.offsetX) {
//         isUpdated = true;
//         camera.offsetX = newOffsetX;
//     }

//     if (newOffsetY !== camera.offsetY) {
//         isUpdated = true;
//         camera.offsetY = newOffsetY;
//     }

//     if (isUpdated) {
//         console.log(camera)
//     }
// }

function respondToKeyboardInput({ getResource, getEntityById }: AppSystemParams) {
    const keyboard = getResource("keyboard");
    const p1 = getEntityById("p1") as Sprite;
    const world = getEntityById("world") as World;
    const boardCam = getEntityById("boardCam") as Camera;
    
    accelerateSprite(p1, keyboard);
    moveCamera(world, boardCam, keyboard);
}

export { respondToKeyboardInput };
