import { Component } from "../lib/component";

type RectSize = Component<"rectSize", {
    w: number;
    h: number;
}>;

function rectSize(w?: number, h?: number): RectSize {
    return {
        kind: "rectSize",
        value: {
            w: w ?? 0,
            h: h ?? 0,
        },
    };
}

export { rectSize };
export type { RectSize };
