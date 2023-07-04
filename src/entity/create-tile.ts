import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

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

type Tile = ReturnType<typeof createTile>;

export { createTile };
export type { Tile };
