import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Camera, Sprite } from "../entity";
import { isRectCollision } from "../util/collision";
import { Rect, Slim } from "../component/geometry";
import { getOverlap, isCollision } from "../util/rect";

function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    const boardCam = getEntityById("boardCam") as Camera;

    const sprites = query((entity) =>
        entity.kind === "boardSquare" ||
        entity.kind === "sprite"
    ) as (Sprite | BoardSquare)[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const SCALE = boardCam.components.transform.scale;

    const viewportRect = {
        x: boardCam.components.transform.translationGlobal.x,
        y: boardCam.components.transform.translationGlobal.y,
        w: boardCam.components.camera.viewport.size.w,
        h: boardCam.components.camera.viewport.size.h,
    };

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        
        const { x, y } = sprite.components.transform.translationGlobal;
        const { w, h } = sprite.components.size;

        const spriteRect = { x, y, w, h };
        // const spriteRect = scaleRect({ x, y, w, h }, SCALE);

        const overlap = getOverlap(spriteRect, viewportRect);
        
        if (overlap) {
            const { fillStyle, strokeStyle } = sprite.components.style;
            
            // const rect = getOverlap(spriteRect, viewportRect);
            const rect = getOverlap(spriteRect, viewportRect);

            ctx.beginPath();
            ctx.rect(
                overlap.x - viewportRect.x + boardCam.components.camera.viewport.position.x,
                overlap.y - viewportRect.y + boardCam.components.camera.viewport.position.y,
                overlap.w,
                overlap.h
            );
            if (sprite.kind === "boardSquare") {
                ctx.strokeText(
                    sprite.components.ordering.toString(),
                    overlap.x - viewportRect.x + boardCam.components.camera.viewport.position.x,
                    overlap.y - viewportRect.y + boardCam.components.camera.viewport.position.y,
                )
            }
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function scaleRect(r: Slim<Rect>, scale: number) {
    const scaledWidth = Math.floor(r.w * scale);
    const scaledHeight = Math.floor(r.h * scale);

    return {
        x: Math.floor(r.x - (r.w - scaledWidth)) * scale,
        y: Math.floor(r.y - (r.h - scaledHeight)) * scale,

        // x: Math.floor(r.x - scaledWidth) * scale,
        // y: Math.floor(r.y - scaledHeight) * scale,

        // x: Math.floor(r.x - scaledWidth),
        // y: Math.floor(r.y - scaledHeight),

        w: scaledWidth,
        h: scaledHeight,
    };
}

type Mat4 = [number, number, number, number];

function multiplyMat4(m1: Mat4, m2: Mat4): Mat4 {
    return [
        m1[0] * m2[0] + m1[1] * m2[2],
        m1[0] * m2[1] + m1[1] * m2[3],
        m1[2] * m2[0] + m1[3] * m2[2],
        m1[2] * m2[1] + m1[3] * m2[3],
    ];
} 


export { drawVisibleEntities };
