import { boundingRect } from "../util/rect";
import type { Camera } from "../entity";
import type { AppSystemParams } from "./types";

function renderMiniMap({ getEntityById, getResource }: AppSystemParams) {
    const { ctx } = getResource("canvas");

    const boardCam = getEntityById("boardCam") as Camera;
    const miniMap = getEntityById("miniMap") as Camera;

    miniMap.components.camera.projection.area = boundingRect({
        x: miniMap.components.transform.translationGlobal.x,
        y: miniMap.components.transform.translationGlobal.y,
        w: miniMap.components.camera.viewport.size.w,
        h: miniMap.components.camera.viewport.size.h,
    });

    // const boardViewport = {
    //     x: boardCam.components.camera.projection.area.left,
    //     y: boardCam.components.camera.projection.area.top,
    //     w: boardCam.components.camera.projection.area.right - boardCam.components.camera.projection.area.left,
    //     h: boardCam.components.camera.projection.area.bottom - boardCam.components.camera.projection.area.top,
    // };



    ctx.beginPath();

    ctx.closePath();

    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 4;
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
