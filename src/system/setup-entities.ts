import { createSprite, createBoardSquare, createWorld, BoardSquare } from "../entity";
import { AppSystemParams } from "./types";

function setupEntities({ spawn, queryFirst }: AppSystemParams) {
    const world = createWorld();

    world.components.camera.translation.x = 100;
    world.components.camera.translation.y = 100;

    spawn(world);

    const { rows, cols } = world.components.tileMap;

    for (let i = 0; i < rows * cols; i++) {
        const square = createBoardSquare(i);
        spawn(square);
    }

    const square = queryFirst<BoardSquare>((entity) =>
        entity.kind === "boardSquare" &&
        entity.components.ordering === 14
    );

    if (square) {
        const player = createSprite(square.id);
        spawn(player);
    }
}

export { setupEntities };