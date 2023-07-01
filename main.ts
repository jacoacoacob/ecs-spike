import { createApp } from "./src/create-app";
import { App } from "./src/app/create-app";
import { createSprite, createTile, createWorld } from "./src/entity";
import { drawVisibleEntities } from "./src/system/draw-visible-entities";
import { setupCanvasResize } from "./src/system/setup-canvas-resize";
import { updateVisibleEntities } from "./src/system/update-visible-entities";
import { setupDragAndDrop } from "./src/systems";

import { keyboardInput, type KeyboardInput } from "./src/resource/keyboard";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

// canvas.style.backgroundColor = "#efefef";

// const app = createApp(canvas);

// app.addStartupSystem(setupCanvasResize);
// app.addStartupSystem(setupDragAndDrop);
// app.addStartupSystem(({ spawn }) => {
//     spawn(createWorld());
//     spawn(createSprite(50, 30, 20));
//     spawn(createSprite(600, 440, 30));
//     spawn(createTile(40, 60, 20, 20));
//     spawn(createTile(90, 60, 20, 20));
//     spawn(createTile(140, 60, 20, 20));
//     spawn(createTile(190, 60, 20, 20));
//     spawn(createTile(240, 60, 20, 20));
//     spawn(createTile(240, 90, 20, 20));
//     spawn(createTile(240, 140, 20, 20));
//     spawn(createTile(240, 190, 20, 20));
//     spawn(createTile(240, 240, 20, 20));
//     spawn(createTile(240, 290, 20, 20));
// });

// app.addSystem(updateVisibleEntities);
// app.addSystem(drawVisibleEntities);


// app.run();


type AppResource = KeyboardInput;


const app2 = new App<AppResource>({
    resources: [
        keyboardInput
    ],
});



app2.addSystem((app) => {
    console.log(app.getResource("keyboard-input").data.pressedKeys);

});


function delay(millis: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    });
}

(async () => {

    app2.run();

    await delay(100);

    app2.stop();

})();
