import type { EntityWith } from "../lib/entity";
import type { Sprite } from "../entity";
import type { Velocity } from "../component/velocity";
import type { AppSystemParams } from "./types";

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
const DECEL = 0.2;

function respondToKeyboardInput({ getResource, query }: AppSystemParams) {
    const keyboard = getResource("keyboard");
    const [sprite] = query((entity) => entity.kind === "sprite") as Sprite[];
   
    const arrowDown = keyboard.pressed("ArrowDown");
    const arrowUp = keyboard.pressed("ArrowUp");

    if (arrowDown.timestamp > arrowUp.timestamp) {
        accel(sprite, "dy", ACCEL, 4);
    }
    else if (arrowDown.timestamp < arrowUp.timestamp) {
        accel(sprite, "dy", -ACCEL, -4);
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
        accel(sprite, "dx", -ACCEL, -4);
    }
    else if (arrowLeft.timestamp < arrowRight.timestamp) {
        accel(sprite, "dx", ACCEL, 4);
    }
    else if (sprite.components.velocity.dx > 0) {
        accel(sprite, "dx", -DECEL, 0);
    }
    else {
        accel(sprite, "dx", DECEL, 0);
    }
}

export { respondToKeyboardInput };
