import { Component } from "../lib/component";

type Children = Component<"children", string[]>;

function children(childIds?: string[]): Children {
    return {
        kind: "children",
        value: childIds ?? [],
    };
}

export { children };
export type { Children };
