import type { Component } from "../lib/component";

type Camera = Component<"camera", {
    translation: {
        x: number;
        y: number;
    };
    viewport: {
        translation: {
            x: number;
            y: number;
        };
        size: {
            w: number;
            h: number;
        }
    };
    visibleEntities: string[];
}>;

type CameraOptions = Partial<{
    translation: Partial<{
        x: number;
        y: number;
    }>;
    viewport: Partial<{
        translation: Partial<{
            x: number;
            y: number;
        }>;
        size: Partial<{
            w: number;
            h: number;
        }>;
    }>;
}>

function camera(value?: CameraOptions): Camera {
    return {
        kind: "camera",
        value: {
            translation: {
                x: value?.translation?.x ?? 0,
                y: value?.translation?.y ?? 0,
            },
            viewport: {
                translation: {
                    x: value?.viewport?.translation?.x ?? 0,
                    y: value?.viewport?.translation?.y ?? 0,
                },
                size: {
                    w: value?.viewport?.size?.w ?? 0,
                    h: value?.viewport?.size?.h ?? 0,
                }
            },
            visibleEntities: [],
        },
    };
}

export { camera };
export type { Camera };
