import { Camera } from "../entity";
import { pipelineMat4 } from "../lib/matrix";
import { buildProjectionMatrix, buildScaleMatrix, buildTranslationMatrix } from "../lib/projection";
import type { AppSystemParams } from "./types";

function renderStats({ useResource, getEntityById }: AppSystemParams) {
    const { ctx } = useResource("canvas");
    const mouse = useResource("mouse");

    const boardCam = getEntityById("boardCam") as Camera;

    const projectionMatrix = pipelineMat4([
        buildProjectionMatrix(boardCam.components.camera.projection),
        // buildTranslationMatrix()
        buildScaleMatrix(boardCam.components.camera.projection.scale),
    ]);

    // const 

    const scale = Math.round(
        boardCam.components.camera.projection.scale * 100
    ) / 100;

    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(
        `mouse.canvasX: ${mouse.position.canvasX}`,
        40,
        window.innerHeight - 130
    );
    ctx.fillText(
        `mouse.canvasY: ${mouse.position.canvasY}`,
        40,
        window.innerHeight - 100
    );
    ctx.fillText(
        `mouse.state: ${mouse.state}`,
        40,
        window.innerHeight - 70
    );
    ctx.fillText(
        `scale: ${scale}`,
        40,
        window.innerHeight - 40
    );
    ctx.restore();

}

export { renderStats };
