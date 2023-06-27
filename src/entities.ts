import { createEntity } from "./lib/entity";
import * as component from "./lib/component";
import { randId } from "./lib/utils";

function createSprite(x: number, y: number, r: number) {
    return createEntity({
        kind: "sprite",
        id: randId(6),
        components: [
            component.geometry({ kind: "circle", x, y, r }),
            component.style({
                fillStyle: "blue",
                strokeStyle: "pink",
            }),
        ],
    });
}

function createTile(x: number, y: number, w: number, h: number) {
    return createEntity({
        kind: "tile",
        id: randId(6),
        components: [
            component.geometry({ kind: "rect", x, y, w, h }),
            component.style({
                fillStyle: "orange",
            }),
        ],
    });
}

function createWorld() {
    return createEntity({
        kind: "world",
        id: randId(6),
        components: [
            component.tileMap({
                cols: 6,
                rows: 9,
                tileSize: 100,
            }),
        ],
    });
}

type Sprite = ReturnType<typeof createSprite>;
type Tile = ReturnType<typeof createTile>;


type Entity = Sprite | Tile;

export { createSprite, createTile };
export { Tile, Sprite, Entity };
