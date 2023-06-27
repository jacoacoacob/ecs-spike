import { createApp } from "./src/create-app";
import { createSprite, createTile, createWorld } from "./src/entity";
import { updateVisibleEntities } from "./src/system/update-visible-entities";
import { drawEntities, setupDragAndDrop } from "./src/systems";

const canvas = document.querySelector("canvas");

if (canvas) {
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.backgroundColor = "#efefef";
    
    const app = createApp(canvas);
    
    app.addStartupSystem(setupDragAndDrop);
    app.addStartupSystem(({ spawn }) => {
        spawn(createWorld());
        spawn(createSprite(50, 30, 20));
        spawn(createSprite(600, 440, 30));
        spawn(createTile(40, 60, 20, 20));
        spawn(createTile(90, 60, 20, 20));
        spawn(createTile(140, 60, 20, 20));
        spawn(createTile(190, 60, 20, 20));
        spawn(createTile(240, 60, 20, 20));
        spawn(createTile(240, 90, 20, 20));
        spawn(createTile(240, 140, 20, 20));
        spawn(createTile(240, 190, 20, 20));
        spawn(createTile(240, 240, 20, 20));
        spawn(createTile(240, 290, 20, 20));
    });
    
    app.addSystem(drawEntities);
    app.addSystem(updateVisibleEntities);
    
    app.run();
}

