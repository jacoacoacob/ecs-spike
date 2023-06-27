import type { Component } from "../types";

interface Rect {
    kind: "rect";
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Circle {
    kind: "circle";
    x: number;
    y: number;
    r: number;
}

type Shape = Component<"shape", Rect | Circle>;

type ShapeOptions<Kind extends "circle" | "rect"> = Kind extends "circle"
    ? Pick<Circle, "kind"> & Partial<Omit<Circle, "kind">>
    : Pick<Rect, "kind"> & Partial<Omit<Rect, "kind">>

function shape<Kind extends "circle" | "rect">(value: ShapeOptions<Kind>): Shape {
    if (value.kind === "circle") {
        return {
            kind: "shape",
            value: {
                kind: "circle",
                x: value.x ?? 0,
                y: value.y ?? 0,
                r: value.r ?? 0,
            },
        };
    }

    return {
        kind: "shape",
        value: {
            kind: "rect",
            x: value.x ?? 0,
            y: value.y ?? 0,
            w: value.w ?? 0,
            h: value.h ?? 0,
        }
    }
}

export { shape };
export type { Shape, Circle, Rect };
