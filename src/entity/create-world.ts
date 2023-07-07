import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createWorld(id?: string) {
    return createEntity({
        kind: "world",
        id: id ?? randId(6),
        components: [
            component.transform(),
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
