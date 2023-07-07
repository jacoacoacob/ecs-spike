import { randId } from "../util/rand-id";
import * as component from "../component";
import { createEntity } from "../lib/entity";

function createBoardSquare(parentId: string, ordering: number) {
    return createEntity({
        kind: "boardSquare",
        id: randId(6),
        components: [
            component.ordering(ordering),
            component.parent(parentId),
            component.children(),
            component.transform(),
            component.size(),
            component.style({
                fillStyle: "purple",
                strokeStyle: "orange",
            }),
        ],
    });
}

type BoardSquare = ReturnType<typeof createBoardSquare>;

export { createBoardSquare };
export type { BoardSquare };
