import type { Component } from "../lib/component";
import { Size } from "./size";
import { Translation } from "./transform";

interface Viewport {
    position: {
        x: number;
        y: number;
    };
    size: Size["value"];
}

type Camera = Component<"camera", {
    viewport?: Viewport;
    order: number;
    isActive: boolean;
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
            isActive: value?.isActive ?? false,
            order: value?.order ?? 0,
            viewport: value?.viewport
                ? {
                    size: {
                        w: value.viewport.size?.w ?? 0,
                        h: value.viewport.size?.h ?? 0,
                    },
                    position: {
                        x: value.viewport.position?.x ?? 0,
                        y: value.viewport.position?.y ?? 0,
                    },
                }
                : undefined,
        },
    };
}

export { camera };
export type { Camera };

// type Camera = Component<"camera", {
//     translation: Translation;
//     viewport: {
//         translation: Translation;
//         size: {
//             w: number;
//             h: number;
//         }
//     };
//     visibleEntities: string[];
// }>;

// type CameraOptions = Partial<{
//     translation: Partial<Translation>;
//     viewport: Partial<{
//         translation: Partial<Translation>;
//         size: Partial<{
//             w: number;
//             h: number;
//         }>;
//     }>;
// }>

// function camera(value?: CameraOptions): Camera {
//     return {
//         kind: "camera",
//         value: {
//             translation: {
//                 x: value?.translation?.x ?? 0,
//                 y: value?.translation?.y ?? 0,
//                 z: value?.translation?.z ?? 0,
//             },
//             viewport: {
//                 translation: {
//                     x: value?.viewport?.translation?.x ?? 0,
//                     y: value?.viewport?.translation?.y ?? 0,
//                     z: value?.translation?.z ?? 0,
//                 },
//                 size: {
//                     w: value?.viewport?.size?.w ?? 0,
//                     h: value?.viewport?.size?.h ?? 0,
//                 }
//             },
//             visibleEntities: [],
//         },
//     };
// }

// export { camera };
// export type { Camera };
