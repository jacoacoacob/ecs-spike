import type { Component } from "../lib/component";

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

type CameraOptions = Partial<{
    position: Partial<{
        x: number;
        y: number;
    }>;
    viewport: Partial<{
        x: number;
        y: number;
        w: number;
        h: number;
    }>;
}>

function camera(value?: CameraOptions): Camera {
    return {
        kind: "camera",
        value: {
            position: {
                x: value?.position?.x ?? 0,
                y: value?.position?.y ?? 0,
            },
            viewport: {
                x: value?.viewport?.x ?? 0,
                y: value?.viewport?.y ?? 0,
                w: value?.viewport?.w ?? 0,
                h: value?.viewport?.h ?? 0,
            },
            visibleEntities: [],
        },
    };
}

export { camera };
export type { Camera };
