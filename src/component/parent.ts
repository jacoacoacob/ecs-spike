import { Component } from "../lib/component";

type Parent = Component<"parent", string | null>;

function parent(parentId?: string): Parent {
    return {
        kind: "parent",
        value: parentId ?? null,
    };
}

export { parent };
export type { Parent };
