import type { Camera, World } from "../entity";
import { type Vec2, multiplyPoint, pipelineMat4 } from "../lib/matrix";
import { buildProjectionMatrix, buildScaleMatrix } from "../lib/projection";
import type { AppSystemParams } from "./types";
import type { OrthographicProjection } from "../component/camera";


function cameraToWorld(
    camera: Camera,
    world: World,
    scale: number,
): Vec2 {
    const worldProjection: OrthographicProjection = {
        scale,
        area: {
            left: 0,
            top: 0,
            right: world.components.tileMap.cols * world.components.tileMap.tileSize,
            bottom: world.components.tileMap.rows * world.components.tileMap.tileSize,
        },
        viewportOrigin: {
            x: 0.5,
            y: 0.5, 
        },
        near: 0,
        far: 1000,
    };

    
    const matrix = pipelineMat4([
        buildProjectionMatrix(worldProjection),
        buildScaleMatrix(scale),
    ]);

    const [clipX, clipY] = multiplyPoint(matrix, [
        camera.components.transform.translationGlobal.x,
        camera.components.transform.translationGlobal.y,
        1,
        1
    ]);

    return [
        Math.round((clipX - -1) * (worldProjection.area.right / 2)),
        Math.round((1 - clipY) * (worldProjection.area.bottom / 2)),
    ]
}


function renderStats({ useResource, getEntityById }: AppSystemParams) {
    const { ctx } = useResource("canvas");
    const mouse = useResource("mouse");

    const world = getEntityById("world") as World;
    const boardCam = getEntityById("boardCam") as Camera;

    const { viewport, projection } = boardCam.components.camera;

    const { canvasX, canvasY } = mouse.position;

    const roundedScale = Math.round(projection.scale * 100) / 100;

    const [transformedCameraX, transformedCameraY] = cameraToWorld(
        boardCam,
        world,
        projection.scale,
    );

    const worldX = canvasX + transformedCameraX - viewport.position.x;
    const worldY = canvasY + transformedCameraY - viewport.position.y;

    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(
        JSON.stringify({
            worldX,
            worldY,
        }),
        40,
        window.innerHeight - 160
    )
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
        `scale: ${roundedScale}`,
        40,
        window.innerHeight - 40
    );
    ctx.restore();

}

export { renderStats };
