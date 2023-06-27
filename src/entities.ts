import { createEntity } from "./lib/entity";
import * as component from "./lib/component";
import { randId } from "./lib/utils";

function createSprite(x: number, y: number, r: number) {
    return createEntity({
        kind: "sprite",
        id: randId(6),
        components: [
            component.shape({ kind: "circle", x, y, r }),
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
            component.shape({ kind: "rect", x, y, w, h }),
            component.style({
                fillStyle: "orange",
            }),
        ],
    });
}

type Tile = ReturnType<typeof createTile>;
type Sprite = ReturnType<typeof createSprite>;

type Entities = Tile | Sprite;

export { createSprite, createTile };
export { Tile, Sprite, Entities };
