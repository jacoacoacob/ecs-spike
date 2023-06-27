import type { Component } from "../types";

type Camera = Component<"camera", {
    position: {
        x: number;
        y: number;
    };
    viewport: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    visibleEntities: string[];
}>;

type CameraOptions = Partial<Pick<Camera["value"], "position" | "viewport">>;

function camera(value?: CameraOptions): Camera {
    return {
        kind: "camera",
        value: {
            position: value?.position ?? {
                x: 0,
                y: 0,
            },
            viewport: value?.viewport ?? {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
            },
            visibleEntities: [],
        },
    };
}

export { camera };
export type { Camera };
