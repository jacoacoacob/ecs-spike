import { SystemParams } from "./types";

function setupCanvasResize({ canvasCtx }: SystemParams) {
    const { canvas } = canvasCtx;

    window.addEventListener("resize", onResize);

    onResize();

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

export { setupCanvasResize };
