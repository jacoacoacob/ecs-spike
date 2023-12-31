import { createEntity } from "../lib/entity";
import { randId } from "../util/rand-id";
import * as component from "../component";

function createCamera(id?: string) {
    return createEntity({
        kind: "camera",
        id: id ?? randId(6),
        components: [
            component.transform(),
            component.camera(),
            component.velocity(),
            component.parent(),
            component.children(),
        ],
    });
}

type Camera = ReturnType<typeof createCamera>;

export { createCamera };
export type { Camera };
