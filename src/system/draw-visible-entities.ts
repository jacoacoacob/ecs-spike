import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, Sprite, Tile } from "../entity";
import type { Circle, Rect } from "../component/geometry";
import { EntityWith, withComponent } from "../lib/entity";
import type { Transform } from "../component/transform";

function drawVisibleEntities({ getResource, query }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");
    const sprites = query(entity => entity.kind === "sprite") as Sprite[];
    const tiles = query(entity => entity.kind === "tile") as Tile[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < tiles.length; i++) {
        const {
            components: {
                style: {
                    fillStyle,
                    strokeStyle
                },
                rectSize,
                transform
            }
        } = tiles[i];
        const { w, h } = rectSize;
        const { x, y }= transform.translation;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    for (let i = 0; i < sprites.length; i++) {
        const {
            components: {
                style: {
                    fillStyle,
                    strokeStyle
                },
                transform,
                radius
            }
        } = sprites[i];
        const { x, y } = transform.translation;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

export { drawVisibleEntities };
