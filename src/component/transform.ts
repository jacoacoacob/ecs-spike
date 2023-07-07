import { Component } from "../lib/component";

interface Translation {
    x: number;
    y: number;
    z: number;
}

type Transform = Component<"transform", {
    translationGlobal: Translation;
    translation: Translation;
    scale: number;
}>;

function transform(): Transform {
    return {
        kind: "transform",
        value: {
            translationGlobal: {
                x: 0,
                y: 0,
                z: 0,
            },
            translation: {
                x: 0,
                y: 0,
                z: 0,
            },
            scale: 1,
        },
    }
}

export { transform };
export type { Transform, Translation };
