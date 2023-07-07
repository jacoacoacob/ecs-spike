import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createWorld() {
    return createEntity({
        kind: "world",
        id: randId(6),
        components: [
            component.children(),
            component.tileMap({
                rows: 4,
                cols: 6,
                tileSize: 140,
            }),
            component.camera({
                viewport: {
                    size: {
                        w: 600,
                        h: 400,
                    },
                },
            }),
        ],
    });
}

type World = ReturnType<typeof createWorld>;

export { createWorld };
export type { World };
