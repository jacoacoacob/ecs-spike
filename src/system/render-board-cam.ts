import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Camera, Sprite } from "../entity";
import { boundingRect } from "../util/rect";
import { buildProjectionMatrix, buildScaleMatrix } from "../lib/projection";
import { pipelineMat4 } from "../lib/matrix";
import { projectRect } from "../lib/clip-to-screen";


function renderBoardCam({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
    const { ctx } = getResource("canvas");

    const boardCam = getEntityById("boardCam") as Camera;

    const projection = boardCam.components.camera.projection; 
    const viewport = boardCam.components.camera.viewport;

    projection.area = boundingRect({
        x: boardCam.components.transform.translationGlobal.x,
        y: boardCam.components.transform.translationGlobal.y,
        w: boardCam.components.camera.viewport.size.w,
        h: boardCam.components.camera.viewport.size.h,
    })

    const projectionMatrix = pipelineMat4([
        buildScaleMatrix(projection.scale),
        buildProjectionMatrix(projection),
    ]);

    const sprites = query((entity) =>
        entity.kind === "boardSquare" ||
        entity.kind === "sprite"
    ) as (Sprite | BoardSquare)[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        
        const { x, y } = sprite.components.transform.translationGlobal;
        const { w, h } = sprite.components.size;

        const projectedRect = projectRect(viewport, projectionMatrix, {
            x,
            y,
            w,
            h
        });

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

    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "orange";
    ctx.strokeRect(
        viewport.position.x,
        viewport.position.y,
        viewport.size.w,
        viewport.size.h
    );
    ctx.restore();
    ctx.closePath();
}

export { renderBoardCam };
