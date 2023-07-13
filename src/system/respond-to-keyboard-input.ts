import type { EntityWith } from "../lib/entity";
import type { Sprite, World, Camera } from "../entity";
import type { Velocity } from "../component/velocity";
import type { AppSystemParams } from "./types";
import { type Keyboard, whichDirection } from "../resource/keyboard";


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
const MAX_VELOCITY = 10;

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
    const dx = whichDirection(left, right, MAX_CAMERA_SPEED);

    // TODO: Move below logic to a physics system or something.
    // This system should not need to be so 'world-aware'
    const { cols, rows, tileSize } = world.components.tileMap;
    const { translation } = camera.components.transform;
    const { w: viewportWidth, h: viewportHeight } = camera.components.camera.viewport.size;

    const SCALE = camera.components.camera.projection.scale;

    const maxTranslationX = cols * (tileSize / SCALE) - viewportWidth;
    const maxTranslationY = rows * (tileSize / SCALE) - viewportHeight;

    if (translation.x + dx >= 0 && translation.x + dx <= maxTranslationX) {
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

function respondToKeyboardInput({ getResource, getEntityById }: AppSystemParams) {
    const keyboard = getResource("keyboard");
    const p1 = getEntityById("p1") as Sprite;
    const world = getEntityById("world") as World;
    const boardCam = getEntityById("boardCam") as Camera;
    
    accelerateSprite(p1, keyboard);
    moveCamera(world, boardCam, keyboard);

    if (keyboard.justPressed("z")) {
        boardCam.components.camera.projection.scale -= 0.1;
    }
    if (keyboard.justPressed("x")) {
        boardCam.components.camera.projection.scale += 0.1;

    }
}

export { respondToKeyboardInput };
