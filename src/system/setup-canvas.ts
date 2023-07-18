import type { Camera } from "../entity";
import type { AppSystemParams } from "./types";

function setupCanvas({ getEntityById, useResource }: AppSystemParams) {
    const { ctx } = useResource("canvas");
    const screen = useResource("screen");
    const mouse = useResource("mouse");

    const boardCam = getEntityById<Camera>("boardCam");

    if (!boardCam) {
        throw new Error("Couldn't get entity 'boardCam'");
    }
    
    screen.onResize(onResize);

    onResize();

    function onResize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    ctx.canvas.addEventListener("mousedown", (ev) => {
        mouse.press(ev);
    });

    ctx.canvas.addEventListener("mousemove", (ev) => {
        mouse.move(ev);
    });

    ctx.canvas.addEventListener("mouseup", (ev) => {
        mouse.release(ev);
    });

    ctx.canvas.addEventListener("mouseleave", () => {
        mouse.position.canvasX = -1;
        mouse.position.canvasY = -1;
    });
}

export { setupCanvas };
