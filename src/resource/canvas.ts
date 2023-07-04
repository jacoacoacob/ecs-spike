import { createResource } from "../lib/resource";

function canvas() {
    return createResource({
        name: "canvas",
        setup() {
            const canvas = document.querySelector("canvas") as HTMLCanvasElement;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

            return { ctx };
        },
    });
}

type Canvas = ReturnType<typeof canvas>;

export { canvas };
export type { Canvas };
