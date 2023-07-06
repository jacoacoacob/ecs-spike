import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createSprite(x: number, y: number, r: number) {
    return createEntity({
        kind: "sprite",
        id: randId(6),
        components: [
            component.transform(x, y),
            component.radius(r),
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
