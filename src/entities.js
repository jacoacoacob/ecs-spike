import { createEntity } from "./lib/entity.js";
import * as component from "./lib/component.js";

function createSprite(x, y, r) {
    return createEntity({
        kind: "sprite",
        components: [
            component.position(x, y),
            component.radius(r),
            component.fillStyle(),
            component.strokeStyle(),
        ]
    });
}

function createTile(x, y, w, h) {
    return createEntity({
        kind: "tile",
        components: [
            component.position(x, y),
            component.dimensions(w, h),
            component.fillStyle(),
            component.strokeStyle(),
        ]
    });
}

export { createSprite, createTile };
