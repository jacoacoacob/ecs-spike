import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "./create-entity";

function createWorld() {
    return createEntity({
        kind: "world",
        id: randId(6),
        components: [
            component.tileMap({
                rows: 6,
                cols: 9,
                tileSize: 100,
            }),
            component.camera({
                viewport: {
                    w: 600,
                    h: 400,
                },
            }),
        ],
    });
}

type World = ReturnType<typeof createWorld>;

export { createWorld };
export type { World };
