import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Camera, Sprite } from "../entity";
import { boundingRect, getOverlap } from "../util/rect";
import { buildProjectionMatrix, matMultiply } from "../util/proejction";

let count = 0;

function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    const boardCam = getEntityById("boardCam") as Camera;

    const SCALE = boardCam.components.camera.projection.scale;
    const projection = boardCam.components.camera.projection; 

    projection.area = boundingRect({
        x: boardCam.components.transform.translationGlobal.x * SCALE,
        y: boardCam.components.transform.translationGlobal.y * SCALE,
        w: boardCam.components.camera.viewport.size.w * SCALE,
        h: boardCam.components.camera.viewport.size.h * SCALE,
    })

    // const projMat = buildProjectionMatrix(projection);

    const sprites = query((entity) =>
        entity.kind === "boardSquare" ||
        entity.kind === "sprite"
    ) as (Sprite | BoardSquare)[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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

        const sr = {
            x: x / SCALE,
            y: y / SCALE,
            w: w / SCALE,
            h: h / SCALE,
        }

        // const [viewLeft, viewTop] = matMultiply(projMat, [
        //     sr.x,
        //     sr.y,
        //     1,
        //     1,
        // ]);

        // const [viewRight, viewBottom] = matMultiply(projMat, [
        //     sr.x + sr.w,
        //     sr.y + sr.h,
        //     1,
        //     1
        // ]);

        const overlap = getOverlap(sr, viewportRect);
        
        if (overlap) {
            const { fillStyle, strokeStyle } = sprite.components.style;
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
                    sr.x - viewportRect.x + boardCam.components.camera.viewport.position.x,
                    sr.y - viewportRect.y + boardCam.components.camera.viewport.position.y,
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

export { drawVisibleEntities };
