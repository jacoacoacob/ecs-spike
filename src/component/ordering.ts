import { Component } from "../lib/component";

type Ordering = Component<"ordering", number>;

function ordering(value?: number): Ordering {
    return {
        kind: "ordering",
        value: value ?? 0,
    };
}

export { ordering };
export type { Ordering };
