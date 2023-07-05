import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, Sprite } from "../entity";
import type { Circle } from "../component/geometry";

function drawVisibleEntities({ getResource, query }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");
    const sprites = query(entity => entity.kind === "sprite") as Sprite[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < sprites.length; i++) {
        const {
            components: {
                style: {
                    fillStyle,
                    strokeStyle
                },
                geometry
            }
        } = sprites[i];
        const { x, y, r } = geometry as Circle;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

export { drawVisibleEntities };
