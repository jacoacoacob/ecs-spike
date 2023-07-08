import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Sprite, World } from "../entity";

function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    const world = getEntityById("world") as World;

    const { cols, rows } = world.components.tileMap;
    const { offsetX, offsetY, viewport } = world.components.camera;

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
        ctx.rect(
            x - offsetX + viewport.position.x,
            y - offsetY + viewport.position.y,
            w,
            h
        );
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
        ctx.rect(
            x - offsetX + viewport.position.x,
            y - offsetY + viewport.position.y,
            size.w,
            size.h
        );
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    
    ctx.clearRect(
        0,
        0,
        ctx.canvas.width,
        viewport.position.y + 10
    );
    ctx.clearRect(
        0,
        viewport.position.y + viewport.size.h + 20 + 8 * rows,
        ctx.canvas.width,
        ctx.canvas.height - viewport.position.y + viewport.size.h
    );
    ctx.clearRect(
        viewport.position.x + viewport.size.w + 20 + 8 * cols,
        0,
        ctx.canvas.width - viewport.position.x + viewport.size.w,
        ctx.canvas.height + 10
    );
    ctx.clearRect(
        0,
        0,
        viewport.position.x + 10,
        ctx.canvas.height
    );

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 4
    ctx.strokeStyle = "limegreen";
    ctx.strokeRect(
        viewport.position.x + 10,
        viewport.position.y + 10,
        viewport.size.w + 10 + 8 * cols,
        viewport.size.h + 10 + 8 * rows
    );
    ctx.closePath();
    ctx.restore()
}

export { drawVisibleEntities };
