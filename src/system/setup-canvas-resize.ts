
import { App } from "../lib/app";
import { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity } from "../entity";

function setupCanvasResize({ getResource }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    window.addEventListener("resize", onResize);

    onResize();

    function onResize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
}

export { setupCanvasResize };
