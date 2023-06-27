import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "./create-entity";

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

type Sprite = ReturnType<typeof createSprite>;

export { createSprite };
export type { Sprite };
