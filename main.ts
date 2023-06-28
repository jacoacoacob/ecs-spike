import { createApp } from "./src/create-app";
import { createSprite, createTile, createWorld } from "./src/entity";
import { drawVisibleEntities } from "./src/system/draw-visible-entities";
import { setupCanvasResize } from "./src/system/setup-canvas-resize";
import { updateVisibleEntities } from "./src/system/update-visible-entities";
import { setupDragAndDrop } from "./src/systems";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

canvas.style.backgroundColor = "#efefef";

const app = createApp(canvas);

app.addStartupSystem(setupCanvasResize);
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

app.addSystem(updateVisibleEntities);
app.addSystem(drawVisibleEntities);

app.run();
