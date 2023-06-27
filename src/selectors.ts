import * as collision from "./lib/collision.js"
import { Circle } from "./lib/component/geometry";
import type { Entity } from "./entities.js";


function selectSprites(entity: Entity) {
    return entity.kind === "sprite";
}

function selectTiles(entity: Entity) {
    return entity.kind === "tile";
}

function selectByCoords(x: number, y: number) {
    const point: Circle = { x, y, r: 1, kind: "circle" };
    return (entity: Entity) => {
        if (entity.components.geometry) {
            return collision.isCollision(point, entity.components.geometry)
        }
        return false;
    }
}

export {
    selectSprites,
    selectTiles,
    selectByCoords
};