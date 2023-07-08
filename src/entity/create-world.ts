import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createWorld(id?: string) {
    return createEntity({
        kind: "world",
        id: id ?? randId(6),
        components: [
            component.children(),
            component.tileMap({
                rows: 0,
                cols: 0,
                tileSize: 0,
            }),
            component.camera(),
        ],
    });
}

type World = ReturnType<typeof createWorld>;

export { createWorld };
export type { World };
