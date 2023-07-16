import type { Component } from "../lib/component";
import { Mat4, createMat4 } from "../lib/matrix";
import { BoundingRect } from "../util/rect";
import { Size } from "./size";

interface Viewport {
    position: {
        x: number;
        y: number;
    };
    size: Size["value"];
}

/**
 * @see https://docs.rs/bevy/latest/bevy/render/camera/struct.OrthographicProjection.html
 */
interface OrthographicProjection {
    viewportOrigin: {
        x: number;
        y: number;
    };
    near: number;
    far: number;
    scale: number;
    area: BoundingRect;
}

type Camera = Component<"camera", {
    viewport: Viewport;
    projection: OrthographicProjection;
    computed: {
        projectionMatrix: Mat4;
    };
    order: number;
    isActive: boolean;
    visibleEntities: string[];
}>;

type CameraOptions = Partial<{
    viewport: Partial<Viewport>;
    order: number;
    isActive: boolean;
}>

function camera(value?: CameraOptions): Camera {
    return {
        kind: "camera",
        value: {
            visibleEntities: [],
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
            computed: {
                projectionMatrix: createMat4(),
            },
            projection: {
                near: 0,
                far: 1000,
                viewportOrigin: {
                    x: 0.5,
                    y: 0.5,
                },
                scale: 1,
                area: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }
            },
        },
    };
}

export { camera };
export type { Camera, OrthographicProjection, Viewport };
