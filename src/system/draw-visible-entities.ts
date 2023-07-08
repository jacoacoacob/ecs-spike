import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Sprite, World } from "../entity";

function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    const sprites = query(entity => entity.kind === "sprite") as Sprite[];
    const squares = query(entity => entity.kind === "boardSquare") as BoardSquare[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < squares.length; i++) {
        const {
            components: {
                style: {
                    fillStyle,
                    strokeStyle
                },
                size,
                transform
            }
        } = squares[i];
        const { w, h } = size;
        const { x, y } = transform.translationGlobal;
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
                size
            }
        } = sprites[i];
        const { x, y } = transform.translationGlobal;
        ctx.beginPath();
        ctx.rect(x, y, size.w, size.h);
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

export { drawVisibleEntities };
