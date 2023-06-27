import { Entity, Sprite, Tile } from "./entities";
import { Circle, Rect } from "./lib/component/geometry";
import { selectByCoords, selectSprites, selectTiles } from "./selectors";
import type { SystemParams } from "./lib/types";


function setupDragAndDrop({ canvasCtx, query }: SystemParams) {
    const canvas = canvasCtx.canvas;

    let clickedEntities: Entity[] = [];

    canvas.addEventListener("mousedown", onMousedown);
    canvas.addEventListener("mouseup", onMouseup);

    function onMousemove(ev: MouseEvent) {
        for (let i = 0; i < clickedEntities.length; i++) {
            const entity = clickedEntities[i];
            entity.components.geometry.x = ev.offsetX;
            entity.components.geometry.y = ev.offsetY;
        }
    }

    function onMousedown(ev: MouseEvent) {
        clickedEntities = query(selectByCoords(ev.offsetX, ev.offsetY));
        canvas.addEventListener("mousemove", onMousemove);
    }

    function onMouseup(ev: MouseEvent) {
        clickedEntities = [];
        canvas.removeEventListener("mousemove", onMousemove);
    }
}


function drawEntities({ canvasCtx, query }: SystemParams) {
    const sprites = query(selectSprites) as Sprite[];
    const tiles = query(selectTiles) as Tile[];

    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

    tiles.forEach((tile) => {
        const { x, y, w, h } = tile.components.geometry as Rect;
        const { strokeStyle, fillStyle } = tile.components.style;
        canvasCtx.beginPath();
        canvasCtx.strokeStyle = strokeStyle;
        canvasCtx.fillStyle = fillStyle;
        canvasCtx.rect(x, y, w, h);
        canvasCtx.fill();
        canvasCtx.stroke();
        canvasCtx.closePath();
    });

    sprites.forEach((sprite) => {
        const { x, y, r } = sprite.components.geometry as Circle;
        const { strokeStyle, fillStyle } = sprite.components.style;
        canvasCtx.beginPath();
        canvasCtx.strokeStyle = strokeStyle;
        canvasCtx.fillStyle = fillStyle;
        canvasCtx.arc(x, y, r, 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.stroke();
        canvasCtx.closePath();
    });
}

export { drawEntities, setupDragAndDrop };
