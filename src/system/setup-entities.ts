import { createSprite, createBoardSquare, createWorld, BoardSquare } from "../entity";
import { AppSystemParams } from "./types";

function setupEntities({ spawn, queryFirst, getResource }: AppSystemParams) {
    const transformations = getResource("transformation-manager");

    const world = createWorld();

    world.components.camera.translation.x = 100;
    world.components.camera.translation.y = 100;

    spawn(world);

    const { rows, cols, tileSize } = world.components.tileMap;

    for (let i = 0; i < rows * cols; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const square = createBoardSquare(world.id, i);

        square.components.size.w = tileSize;
        square.components.size.h = tileSize;

        transformations.add({
            entityId: square.id,
            translation: {
                x: col * tileSize,
                y: row * tileSize,
                z: 0,
            }
        })

        spawn(square);
    }

    const square = queryFirst<BoardSquare>((entity) =>
        entity.kind === "boardSquare" &&
        entity.components.ordering === 14
    );

    if (square) {
        const player = createSprite("p1");

        player.components.parent = square.id;

        spawn(player);
    }
}

export { setupEntities };