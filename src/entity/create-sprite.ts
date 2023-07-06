import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createSprite(parentId: string) {
    return createEntity({
        kind: "sprite",
        id: randId(6),
        components: [
            component.parent(parentId),
            component.transform(),
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
