import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createSprite(id?: string) {
    return createEntity({
        kind: "sprite",
        id: id ?? randId(6),
        components: [
            component.parent(),
            component.transform(),
            component.children(),
            component.size(),
            component.velocity(),
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
