import { Entities, Sprite, Tile } from "./entities";
import { Circle, Rect } from "./lib/component/shape";
import type { Components, Entity } from "./lib/entity";
import { selectByCoords, selectSprites, selectTiles } from "./selectors";

interface SystemParams {
    ctx: CanvasRenderingContext2D;
    query: (selector: (entity: Entity<Entities["kind"], Components>) => boolean) => Entity<Entities["kind"], Components>[];
}

function setupDragAndDrop({ ctx, query }: SystemParams) {
    const canvas = ctx.canvas;

    let clickedEntities: Entity<Entities["kind"], Components>[] = [];

    canvas.addEventListener("mousedown", onMousedown);
    canvas.addEventListener("mouseup", onMouseup);

    function onMousemove(ev: MouseEvent) {
        for (let i = 0; i < clickedEntities.length; i++) {
            const entity = clickedEntities[i];
            entity.components.shape.x = ev.offsetX;
            entity.components.shape.y = ev.offsetY;
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


function drawEntities({ ctx, query }: SystemParams) {
    const sprites = query(selectSprites) as Sprite[];
    const tiles = query(selectTiles) as Tile[];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    tiles.forEach((tile) => {
        const { x, y, w, h } = tile.components.shape as Rect;
        const { strokeStyle, fillStyle } = tile.components.style;
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });

    sprites.forEach((sprite) => {
        const { x, y, r } = sprite.components.shape as Circle;
        const { strokeStyle, fillStyle } = sprite.components.style;
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
}

export { drawEntities, setupDragAndDrop };
