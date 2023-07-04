import type { IComponent } from "./types";

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

type Slim<Shape extends Rect | Circle> = Omit<Shape, "kind">;

type Geometry = IComponent<"geometry", Rect | Circle>;

type GeometryOptions<Kind extends "circle" | "rect"> = Kind extends "circle"
    ? Pick<Circle, "kind"> & Partial<Omit<Circle, "kind">>
    : Pick<Rect, "kind"> & Partial<Omit<Rect, "kind">>

function geometry<Kind extends "circle" | "rect">(value: GeometryOptions<Kind>): Geometry {
    if (value.kind === "circle") {
        return {
            kind: "geometry",
            value: {
                kind: "circle",
                x: value.x ?? 0,
                y: value.y ?? 0,
                r: value.r ?? 0,
            },
        };
    }

    return {
        kind: "geometry",
        value: {
            kind: "rect",
            x: value.x ?? 0,
            y: value.y ?? 0,
            w: value.w ?? 0,
            h: value.h ?? 0,
        }
    }
}

export { geometry };
export type { Geometry, Circle, Rect, Slim };
