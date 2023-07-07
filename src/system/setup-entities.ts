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

        const square = createBoardSquare(i);

        square.components.parent = world.id;

        square.components.size.w = tileSize;
        square.components.size.h = tileSize;

        transformations.add({
            entityId: square.id,
            translation: {
                x: 20 + col * tileSize + col * 8,
                y: 20 + row * tileSize + row * 8,
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

        const c1 = createSprite();
        const c2 = createSprite();

        c1.components.parent = player.id;
        c1.components.size.w = 40;
        c1.components.size.h = 40;

        // c2.components.parent = player.id;
        c2.components.size.w = 40;
        c2.components.size.h = 40;

        // player.components.children = [c1.id, c2.id];
        player.components.children = [c1.id];
        player.components.parent = square.id;

        player.components.size.w = 200;
        player.components.size.h = 200;

        transformations.add({
            entityId: player.id,
            translation: {
                x: 40,
                y: 40,
                z: 0,
            }
        });

        transformations.add({
            entityId: c1.id,
            translation: {
                x: 50,
                y: 50,
                z: 0,
            },
        });

        transformations.add({
            entityId: c2.id,
            translation: {
                x: 150,
                y: 150,
                z: 0,
            },
        });

        spawn(player);
        spawn(c1);
        spawn(c2);
    }
}

export { setupEntities };