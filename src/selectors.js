import * as collision from "./lib/collision.js"

function selectSprites(entity) {
    return entity.kind === "sprite";
}

function selectTiles(entity) {
    return entity.kind === "tile";
}

function selectByCoords(x, y) {
    const point = { x, y, r: 1 };
    return (entity) => {
        if (entity.kind === "sprite") {
            return collision.isCircleCollision(
                point,
                {
                    x: entity.components.position.x,
                    y: entity.components.position.y,
                    r: entity.components.radius,
                }
            );
        }
        if (entity.kind === "tile") {
            return collision.isRectCircleCollsion(
                {
                    x: entity.components.position.x,
                    y: entity.components.position.y,
                    w: entity.components.dimensions.w,
                    h: entity.components.dimensions.h,
                },
                point
            );
        }
    }
}

export {
    selectSprites,
    selectTiles,
    selectByCoords
};