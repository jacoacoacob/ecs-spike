import * as collision from "./util/collision"
import type { Circle } from "./component/geometry";
import type { Entity } from "./entity";

type Selector = (entity: Entity) => boolean;

const selectTiles: Selector = (entity) => entity.kind === "tile";
const selectSprites: Selector = (entity) => entity.kind === "sprite";
const selectWorld: Selector = (entity) => entity.kind === "world";

function selectByCoords(x: number, y: number) {
    const point: Circle = { x, y, r: 1, kind: "circle" };
    return (entity: Entity) => {
        if (entity.kind === "sprite" || entity.kind === "tile") {
            return collision.isCollision(point, entity.components.geometry);
        }
        return false;
    }
}

export { selectByCoords, selectSprites, selectTiles, selectWorld };
export type { Selector };
