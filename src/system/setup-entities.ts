
import { OrthographicProjection } from "../component/camera";
import { type BoardSquare, setParentChild } from "../entity";
import { AppSystemParams } from "./types";

function createScaleInput(projection: OrthographicProjection) {
    const scaleInput = document.createElement("input");

    scaleInput.type = "number";
    scaleInput.style.position = "absolute";
    scaleInput.style.top = "8px";
    scaleInput.style.right = "8px";
    scaleInput.style.width = "50px"

    scaleInput.setAttribute("step", "0.1")
    
    scaleInput.value = projection.scale.toString();

    scaleInput.addEventListener("input", (ev) => {
        projection.scale = Number.parseFloat((ev.target as HTMLInputElement).value);
    });

    document.body.append(scaleInput);
}


function setupEntities({ spawn, queryFirst, getResource }: AppSystemParams) {
    const transformations = getResource("transformations");

    const world = spawn("world", "world");

    world.components.tileMap = {
        tileSize: 200,
        rows: 18,
        cols: 27,
    };

    const boardCam = spawn("camera", "boardCam");
    const miniMap = spawn("camera", "miniMap");

    setParentChild(boardCam, miniMap)

    boardCam.components.camera.viewport.position = {
        x: 20,
        y: 20,
    };

    boardCam.components.camera.viewport.size = {
        w: 900,
        h: 600,
    };

    boardCam.components.camera.projection.scale = 1;
    
    
    miniMap.components.camera.viewport.position = {
        x: 940,
        y: 20
    };
    
    miniMap.components.camera.viewport.size = {
        w: 300,
        h: 200
    }
    
    miniMap.components.camera.projection.scale = 1;

    createScaleInput(boardCam.components.camera.projection);

    const { rows, cols, tileSize } = world.components.tileMap;

    for (let i = 0; i < rows * cols; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;

        const square = spawn("boardSquare");
        
        square.components.ordering = i;

        square.components.size.w = tileSize;
        square.components.size.h = tileSize;

        transformations.push({
            entityId: square.id,
            translation: {
                x: col * tileSize,
                y: row * tileSize,
                z: 0,
            }
        });
    }

    const square = queryFirst<BoardSquare>((entity) =>
        entity.kind === "boardSquare" &&
        entity.components.ordering === 29
        // entity.components.ordering === 86
    );

    if (square) {
        const player = spawn("sprite", "p1");

        player.components.transform.translationGlobal.z = 10

        setParentChild(square, player);

        const c1 = spawn("sprite", "c1");
        const c2 = spawn("sprite", "c2");

        const c1_1 = spawn("sprite", "c1_1");

        c1_1.components.size.w = 40;
        c1_1.components.size.h = 40;

        setParentChild(c1, c1_1);
        // setParentChild(player, c1)
        // setParentChild(player, c2);

        c1.components.size.w = 80;
        c1.components.size.h = 80;

        c2.components.size.w = 60;
        c2.components.size.h = 60;

        player.components.size.w = 200;
        player.components.size.h = 200;

        transformations.push({
            entityId: c1.id,
            translation: {
                x: 50,
                y: 50,
                z: 0,
            },
        });

        transformations.push({
            entityId: c2.id,
            translation: {
                x: player.components.size.w + 50,
                y: 150,
                z: 0,
            },
        });

    }
}

export { setupEntities };