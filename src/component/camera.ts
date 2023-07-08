import type { Component } from "../lib/component";
import { Size } from "./size";

interface Viewport {
    position: {
        x: number;
        y: number;
    };
    size: Size["value"];
}

type Camera = Component<"camera", {
    viewport: Viewport;
    offsetX: number;
    offsetY: number;
    order: number;
    isActive: boolean;
    visibleEntities: string[];
}>;

type CameraOptions = Partial<{
    viewport: Partial<Viewport>;
    offsetX: number;
    offsetY: number;
    order: number;
    isActive: boolean;
}>

function camera(value?: CameraOptions): Camera {
    return {
        kind: "camera",
        value: {
            visibleEntities: [],
            offsetX: value?.offsetX ?? 0,
            offsetY: value?.offsetY ?? 0,
            isActive: value?.isActive ?? false,
            order: value?.order ?? 0,
            viewport: {
                size: {
                    w: value?.viewport?.size?.w ?? 0,
                    h: value?.viewport?.size?.h ?? 0,
                },
                position: {
                    x: value?.viewport?.position?.x ?? 0,
                    y: value?.viewport?.position?.y ?? 0,
                },
            },
        },
    };
}

export { camera };
export type { Camera };
