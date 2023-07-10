import { App } from "../lib/app";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity, BoardSquare, Camera, Sprite } from "../entity";
import { Rect, Slim } from "../component/geometry";
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

    const projMat = buildProjectionMatrix(projection);

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

    const scaledViewportRect = {
        x: viewportRect.x / SCALE,
        y: viewportRect.y / SCALE,
        w: viewportRect.w / SCALE,
        h: viewportRect.h / SCALE,
    }

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        
        const { x, y } = sprite.components.transform.translationGlobal;
        const { w, h } = sprite.components.size;

        const spriteRect = { x, y, w, h };

        if (sprite.id === "p1" && count > 10000) {

            console.log(
                { x, y },
                matMultiply(projMat, [
                    x,
                    y,
                    1,
                    1,
                ])
            )
            count = 0;
        }

        count++;


        const sr = {
            x: x / SCALE,
            y: y / SCALE,
            w: w / SCALE,
            h: h / SCALE,
        }

        const [viewX, viewY, _, viewW] = matMultiply(projMat, [
            x,
            y,
            1,
            1,
        ]);

        const overlap = getOverlap(sr, viewportRect);
        
        if (overlap) {
            const { fillStyle, strokeStyle } = sprite.components.style;
            ctx.beginPath();
            ctx.rect(
                sr.x - viewportRect.x + boardCam.components.camera.viewport.position.x,
                sr.y - viewportRect.y + boardCam.components.camera.viewport.position.y,
                sr.w,
                sr.h
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
        // }

    }
}



// function drawVisibleEntities({ getResource, query, getEntityById }: SystemParams<App<AppResource, AppEntity>>) {
//     const { ctx } = getResource("canvas");

//     const boardCam = getEntityById("boardCam") as Camera;

//     const SCALE = boardCam.components.camera.projection.scale;
//     const projection = boardCam.components.camera.projection; 

//     projection.area = boundingRect({
//         x: (boardCam.components.transform.translationGlobal.x * SCALE) * projection.viewportOrigin.x,
//         y: (boardCam.components.transform.translationGlobal.y * SCALE) * projection.viewportOrigin.y,
//         w: boardCam.components.camera.viewport.size.w * SCALE,
//         h: boardCam.components.camera.viewport.size.h * SCALE,
//     })

//     const projMat = buildProjectionMatrix(projection);

//     const sprites = query((entity) =>
//         entity.kind === "boardSquare" ||
//         entity.kind === "sprite"
//     ) as (Sprite | BoardSquare)[];

//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//     const viewportRect = {
//         x: boardCam.components.transform.translationGlobal.x,
//         y: boardCam.components.transform.translationGlobal.y,
//         w: boardCam.components.camera.viewport.size.w,
//         h: boardCam.components.camera.viewport.size.h,
//     };

//     // console.log(
//     //     matMultiply(
//     //         projMat,
//     //         [
//     //             viewportRect.x,
//     //             viewportRect.y,
//     //             1000,
//     //             1
//     //         ]
//     //     )
//     // )


//     for (let i = 0; i < sprites.length; i++) {
//         const sprite = sprites[i];
        
//         const { x, y } = sprite.components.transform.translationGlobal;
//         const { w, h } = sprite.components.size;

//         const spriteRect = { x, y, w, h };

//         // if (sprite.id === "p1" && count > 10000) {

//         //     console.log(
//         //         { x, y },
//         //         matMultiply(projMat, [
//         //             x,
//         //             y,
//         //             1,
//         //             1,
//         //         ])
//         //     )
//         //     count = 0;
//         // }

//         // count++;


//         const sr = {
//             x: x / (SCALE * projection.viewportOrigin.x),
//             y: y / (SCALE * projection.viewportOrigin.y),
//             w: w / SCALE,
//             h: h / SCALE,
//         }

//         const [viewX, viewY, _, viewW] = matMultiply(projMat, [
//             x,
//             y,
//             1,
//             1,
//         ]);

//         // if (viewX > -viewW && v)


//         const overlap = getOverlap(spriteRect, viewportRect);
        
//         if (overlap) {
//             const { fillStyle, strokeStyle } = sprite.components.style;

//             ctx.beginPath();
//             ctx.rect(
//                 overlap.x - viewportRect.x + boardCam.components.camera.viewport.position.x,
//                 overlap.y - viewportRect.y + boardCam.components.camera.viewport.position.y,
//                 overlap.w,
//                 overlap.h
//             );
//             if (sprite.kind === "boardSquare") {
//                 ctx.strokeText(
//                     sprite.components.ordering.toString(),
//                     overlap.x - viewportRect.x + boardCam.components.camera.viewport.position.x,
//                     overlap.y - viewportRect.y + boardCam.components.camera.viewport.position.y,
//                 )
//             }
//             ctx.fillStyle = fillStyle;
//             ctx.strokeStyle = strokeStyle;
//             ctx.fill();
//             ctx.stroke();
//             ctx.closePath();
//         }
//     }
// }

export { drawVisibleEntities };
