import * as collision from "./lib/collision.js"
import { Circle, Rect } from "./lib/component/shape.js";
import { Entity, Components } from "./lib/entity";

type E = Entity<string, Components>;

function selectSprites(entity: Entity<string, Components>) {
    return entity.kind === "sprite";
}

function selectTiles(entity: E) {
    return entity.kind === "tile";
}

function selectByCoords(x: number, y: number) {
    const point: Circle = { x, y, r: 1, kind: "circle" };
    return (entity: E) => {
        if (entity.components.shape) {
            return collision.isCollision(point, entity.components.shape)
        }
        return false;
        // if (entity.kind === "sprite") {
        //     const { x, y, r } = entity.components.shape as Circle;
        //     return collision.isCircleCollision(
        //         point,
        //         { x, y, r }
        //     );
        // }
        // if (entity.kind === "tile") {
        //     const { x, y,  } = entity.components.shape as Rect;
        //     return collision.isRectCircleCollsion(
        //         {
        //             x: entity.components.position.x,
        //             y: entity.components.position.y,
        //             w: entity.components.dimensions.w,
        //             h: entity.components.dimensions.h,
        //         },
        //         point
        //     );
        // }
    }
}

export {
    selectSprites,
    selectTiles,
    selectByCoords
};