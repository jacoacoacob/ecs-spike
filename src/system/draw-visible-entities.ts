import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Camera, Sprite } from "../entity";
import { isRectCollision } from "../util/collision";
import { Rect, Slim } from "../component/geometry";

function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

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

        const squareDimensions = { x, y, w, h };

        if (isRectCollision(squareDimensions, viewportRect)) {
            const { fillStyle, strokeStyle } = square.components.style;

            const rect = getOverlap(squareDimensions, viewportRect);

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

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        
        const { x, y } = sprite.components.transform.translationGlobal;
        const { w, h } = sprite.components.size;

        const spriteDimensions = { x, y, w, h };
        
        if (isRectCollision(spriteDimensions, viewportRect)) {
            const { fillStyle, strokeStyle } = sprite.components.style;
            
            const rect = getOverlap(spriteDimensions, viewportRect);

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

function boundingRect(rect: Slim<Rect>) {
    return {
        top: rect.y,
        left: rect.x,
        bottom: rect.y + rect.h,
        right: rect.x + rect.w,
    };
}

/**
 * Assuming `r1` and `r2` overlap, return a rect representing the parts of `r1` that overlap `r2`
 */
function getOverlap(r1: Slim<Rect>, r2: Slim<Rect>) {
    const rv = {
        x: Math.max(r1.x, r2.x),
        y: Math.max(r1.y, r2.y),
        w: r1.w,
        h: r1.h
    };

    const br1 = boundingRect(r1);
    const br2 = boundingRect(r2);

    if (br1.top < br2.top) {
        rv.h -= br2.top - br1.top;
    }

    if (br1.left < br2.left) {
        rv.w -= br2.left - br1.left;
    }

    if (br1.bottom > br2.bottom) {
        rv.h -= br1.bottom - br2.bottom;
    }

    if (br1.right > br2.right) {
        rv.w -= br1.right - br2.right;
    }

    return rv;
}

export { drawVisibleEntities };
