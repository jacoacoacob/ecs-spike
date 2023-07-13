import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createBoardSquare(id?: string) {
    return createEntity({
        kind: "boardSquare",
        id: id ?? randId(6),
        components: [
            component.ordering(),
            component.parent(),
            component.children(),
            component.transform(),
            component.size(),
            component.style({
                fillStyle: "navy",
                strokeStyle: "orange",
            }),
        ],
    });
}

type BoardSquare = ReturnType<typeof createBoardSquare>;

export { createBoardSquare };
export type { BoardSquare };
