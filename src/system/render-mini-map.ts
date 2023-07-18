import { boundingRect } from "../util/rect";
import type { Camera, World, Sprite, BoardSquare } from "../entity";
import type { AppSystemParams } from "./types";
import { invertMat4, pipelineMat4 } from "../lib/matrix";
import { projectRect } from "../lib/clip-to-screen";
import { buildProjectionMatrix, buildScaleMatrix, buildTranslationMatrix } from "../lib/projection";

function renderMiniMap({ getEntityById, useResource, query }: AppSystemParams) {
    const { ctx } = useResource("canvas");
    const mouse = useResource("mouse");

    const world = getEntityById("world") as World;
    const boardCam = getEntityById("boardCam") as Camera;
    const miniMap = getEntityById("miniMap") as Camera;

    const viewport = miniMap.components.camera.viewport;

    miniMap.components.camera.projection.area = boundingRect({
        x: 0,
        y: 0,
        w: world.components.tileMap.tileSize * world.components.tileMap.cols,
        h: world.components.tileMap.tileSize * world.components.tileMap.rows,
    });

    const projectionMatrix = buildProjectionMatrix(miniMap.components.camera.projection);

    const sprites = query((entity) =>
        entity.kind === "boardSquare" ||
        entity.kind === "sprite"
    ) as (Sprite | BoardSquare)[];

    ctx.clearRect(
        miniMap.components.camera.viewport.position.x,
        miniMap.components.camera.viewport.position.y,
        miniMap.components.camera.viewport.size.w,
        miniMap.components.camera.viewport.size.h,
    )

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];

        const { x, y } = sprite.components.transform.translationGlobal;
        const { w, h } = sprite.components.size;

        const projectedRect = projectRect(
            viewport,
            projectionMatrix,
            {
                x,
                y,
                w,
                h
            }
        )

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


    const boardCamViewRect = {
        x: boardCam.components.camera.projection.area.left,
        y: boardCam.components.camera.projection.area.top,
        w: boardCam.components.camera.projection.area.right - boardCam.components.camera.projection.area.left,
        h: boardCam.components.camera.projection.area.bottom - boardCam.components.camera.projection.area.top,
    }

    const scaledMatrix = pipelineMat4([
        projectionMatrix,
        buildTranslationMatrix(
            boardCamViewRect.x + boardCamViewRect.w / 2,
            boardCamViewRect.y + boardCamViewRect.h / 2,
        ),
        invertMat4(
            buildScaleMatrix(
                boardCam.components.camera.projection.scale
            )
        ),
        buildTranslationMatrix(
            -(boardCamViewRect.x + boardCamViewRect.w / 2),
            -(boardCamViewRect.y + boardCamViewRect.h / 2),
        ),
    ]);

    const cameraRect = projectRect(viewport, scaledMatrix, boardCamViewRect);

    ctx.beginPath();
    ctx.strokeRect(
        cameraRect.x + viewport.position.x,
        cameraRect.y + viewport.position.y,
        cameraRect.w,
        cameraRect.h,
    )
    ctx.closePath();

    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.strokeRect(
        miniMap.components.camera.viewport.position.x,
        miniMap.components.camera.viewport.position.y,
        miniMap.components.camera.viewport.size.w,
        miniMap.components.camera.viewport.size.h,
    );
    ctx.restore();
    ctx.closePath();
}

export { renderMiniMap };
