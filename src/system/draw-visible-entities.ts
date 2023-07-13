import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Camera, Sprite } from "../entity";
import { Rect, boundingRect, getOverlap } from "../util/rect";
import { buildProjectionMatrix, matMultiply } from "../util/proejction";

let count = 0;

function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    const boardCam = getEntityById("boardCam") as Camera;

    const SCALE = boardCam.components.camera.projection.scale;
    const projection = boardCam.components.camera.projection; 
    const viewport = boardCam.components.camera.viewport;

    projection.area = boundingRect({
        // x: boardCam.components.transform.translationGlobal.x * .5,
        // y: boardCam.components.transform.translationGlobal.y * .5,
        // w: boardCam.components.camera.viewport.size.w,
        // h: boardCam.components.camera.viewport.size.h,

        x: Math.round(boardCam.components.transform.translationGlobal.x * SCALE),
        y: Math.round(boardCam.components.transform.translationGlobal.y * SCALE),
        w: Math.round(boardCam.components.camera.viewport.size.w * SCALE),
        h: Math.round(boardCam.components.camera.viewport.size.h * SCALE),
    })

    const projectionMatrix = buildProjectionMatrix(projection);

    const sprites = query((entity) =>
        entity.kind === "boardSquare" ||
        entity.kind === "sprite"
    ) as (Sprite | BoardSquare)[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        
        const { x, y } = sprite.components.transform.translationGlobal;
        const { w, h } = sprite.components.size;

        const [viewLeft, viewTop] = matMultiply(projectionMatrix, [
            x,
            y,
            1,
            1,
        ]);

        const [viewRight, viewBottom] = matMultiply(projectionMatrix, [
            (x + w),
            (y + h),
            1,
            1 
        ]);
        
        const projX = Math.round((viewLeft - -1) * (viewport.size.w / 2));
        const projY = Math.round((1 - viewTop) * (viewport.size.h / 2));
        const projW = Math.round((viewRight - viewLeft) * (viewport.size.w / 2));
        const projH = Math.round((viewTop - viewBottom) * (viewport.size.h / 2));

        const projectedRect = {
            x: Math.max(0, projX),
            y: Math.max(0, projY),
            w: projX < 0
                ? projW + projX
                : projX + projW > viewport.size.w
                    ? projW - (projX + projW - viewport.size.w)
                    : projW,
            h: projY < 0
                ? projH + projY
                : projY + projH > viewport.size.h
                    ? projH - (projY + projH - viewport.size.h)
                    : projH,
        };


        // if (sprite.id === "p1" && count > 10000) {
        //     // console.log({
        //     //     viewLeft,
        //     //     viewBottom,
        //     //     viewRight,
        //     //     viewTop,
        //     //     ...projectedRect
        //     // })
        //     count = 0;
        // }
        // count += 1;

        const isVisible = projectedRect.w > 0 && projectedRect.h > 0;

        if (isVisible) {
            const { fillStyle, strokeStyle } = sprite.components.style;
            const { x, y, w, h } = projectedRect;
            ctx.beginPath();
            ctx.rect(
                x + viewport.position.x,
                y + viewport.position.y,
                w,
                h,
            );
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
}

export { drawVisibleEntities };
