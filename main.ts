import { createApp } from "./src/lib/app.js";
import { createSprite, createTile } from "./src/entities.js";
import { drawEntities, setupDragAndDrop } from "./src/systems.js";

const canvas = document.querySelector("canvas");

if (canvas) {
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.backgroundColor = "#efefef";
    
    const app = createApp(canvas);
    
    app.addStartupSystem(setupDragAndDrop);
    
    app.addSystem(drawEntities);
    
    app.addEntity(createSprite(50, 30, 20));
    app.addEntity(createSprite(600, 440, 30));
    app.addEntity(createTile(40, 60, 20, 20));
    app.addEntity(createTile(90, 60, 20, 20));
    app.addEntity(createTile(140, 60, 20, 20));
    app.addEntity(createTile(190, 60, 20, 20));
    app.addEntity(createTile(240, 60, 20, 20));
    app.addEntity(createTile(240, 90, 20, 20));
    app.addEntity(createTile(240, 140, 20, 20));
    app.addEntity(createTile(240, 190, 20, 20));
    app.addEntity(createTile(240, 240, 20, 20));
    app.addEntity(createTile(240, 290, 20, 20));
    
    app.run();
}

