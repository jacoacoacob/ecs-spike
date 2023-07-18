import { createResource } from "../lib/resource";

function mouseResource() {
    return createResource({
        name: "mouse",
        setup() {
            // const _cursorState
        },
    });
}

type MouseResource = ReturnType<typeof mouseResource>;

export { mouseResource };
export type { MouseResource };
