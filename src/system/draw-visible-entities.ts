import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Camera, Sprite, World } from "../entity";
import { isRectCollision } from "../util/collision";
import { Rect, Slim } from "../component/geometry";

function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    const world = getEntityById("world") as World;
    const boardCam = getEntityById("boardCam") as Camera;
    const squares = query((entity) => entity.kind === "boardSquare") as BoardSquare[];
    const sprites = query((entity) => entity.kind === "sprite") as Sprite[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const viewportRect = {
        x: boardCam.components.transform.translationGlobal.x,
        y: boardCam.components.transform.translationGlobal.y,
        w: boardCam.components.camera.viewport.size.w,
        h: boardCam.components.camera.viewport.size.h,
    };

    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        
        const { x, y } = square.components.transform.translationGlobal;
        const { w, h } = square.components.size;
        
        if (isRectCollision({ x, y, w, h }, viewportRect)) {
            const { fillStyle, strokeStyle } = square.components.style;
            const rect = getOverlap({
                x,
                y,
                w,
                h
            }, viewportRect);

            ctx.beginPath();
            ctx.rect(
                rect.x - viewportRect.x + boardCam.components.camera.viewport.position.x,
                rect.y - viewportRect.y + boardCam.components.camera.viewport.position.y,
                rect.w,
                rect.h
            );
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
}

/**
 * Assuming `r1` and `r2` overlap, return a rect representing the parts of `r1` that overlap `r2`
 */
function getOverlap(r1: Slim<Rect>, r2: Slim<Rect>) {
    let x = r1.x;
    let y = r1.y;
    let w = r1.w;
    let h = r1.h;

    const distLeftEdge = x - r2.x;
    const distTopEdge = y - r2.y;
    const distRightEdge = (x + w) - (r2.x + r2.w);
    const distBottomEdge = (y + h) - (r2.y + r2.h);

    // if the left edge of r1 is to the left of the left edge of r2
    if (distLeftEdge < 0) {
        // set the left edge of r1 equal to the left edge of r2
        x = r2.x;
    }

    // if the right edge of r1 is to the right of the right edge of r2
    if (distRightEdge > 0) {
        // set the right edge equal to the right edge of r2
        w = w - distRightEdge;
    }

    if (distBottomEdge > 0) {
        h = h - distBottomEdge;
    }

    if (distTopEdge < 0) {
        y = r2.y;
    }

    return { x, y, w, h };
}


























////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function drawVisibleEntitiesV1({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
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
