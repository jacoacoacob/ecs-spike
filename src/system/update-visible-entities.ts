import { World, BoardSquare, Sprite } from "../entity";
import type { AppSystemParams } from "./types";

function updateVisibleEntities({ query, queryFirst }: AppSystemParams) {
    const world = queryFirst<World>((entity) => entity.kind === "world");

    if (world) {
        const { tileMap, camera } = world.components;
        
        const squares = query<BoardSquare>((entity) => entity.kind === "boardSquare");
        
        squares.sort((a, b) => a.components.ordering - b.components.ordering);

        const { rows, cols } = tileMap;

        for (let i = 0; i < rows * cols; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;

        }
    }

    // const squares = query((entity) => entity.kind === "boardSquare") as BoardSquare[];
    // const sprites = query((entity) => entity.kind === "sprite") as Sprite[];

    // const { camera, tileMap } = world.components;

    // const { rows, cols, tileSize } = tileMap;

    // const offsetX = camera.position.x + camera.viewport.x;
    // const offsetY = camera.position.y + camera.viewport.y;


}

export { updateVisibleEntities };
