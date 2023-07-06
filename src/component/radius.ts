import { Component } from "../lib/component";

type Radius = Component<"radius", number>;

function radius(value?: number): Radius {
    return {
        kind: "radius",
        value: value ?? 0,
    };
}

export { radius };
export type { Radius };
