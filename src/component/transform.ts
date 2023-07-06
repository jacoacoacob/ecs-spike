import { Component } from "../lib/component";

type Transform = Component<"transform", {
    translation: {
        x: number;
        y: number;
        z: number;
    };
    scale: number;
}>;

function transform(x?: number, y?: number, z?: number): Transform {
    return {
        kind: "transform",
        value: {
            translation: {
                x: x ?? 0,
                y: y ?? 0,
                z: z ?? 0,
            },
            scale: 1,
        },
    }
}

export { transform };
export type { Transform };
