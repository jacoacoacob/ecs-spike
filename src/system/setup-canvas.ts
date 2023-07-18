import type { AppSystemParams } from "./types";

function setupCanvas({ useResource }: AppSystemParams) {
    const { ctx } = useResource("canvas");
    const screen = useResource("screen");
    const mouse = useResource("mouse");
    
    screen.onResize(onResize);

    onResize();

    function onResize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    ctx.canvas.addEventListener("mousedown", (ev) => {
        mouse.press();
    });

    ctx.canvas.addEventListener("mousemove", (ev) => {

    });

    ctx.canvas.addEventListener("mouseup", (ev) => {
        mouse.release();
    });
}

export { setupCanvas };
