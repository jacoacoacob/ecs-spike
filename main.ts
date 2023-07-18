import { App } from "./src/lib/app";
import type { AppResource } from "./src/resource";
import { createSprite, type AppEntity, createBoardSquare, createWorld, createCamera } from "./src/entity";
import { keyboard } from "./src/resource/keyboard";
import { canvas } from "./src/resource/canvas";
import { setupCanvas } from "./src/system/setup-canvas";
import { setupWindow } from "./src/system/setup-window";
import { renderBoardCam } from "./src/system/render-board-cam";
import { respondToKeyboardInput } from "./src/system/respond-to-keyboard-input";
import { updateEntityPositions } from "./src/system/update-entity-positions";
import { setupEntities } from "./src/system/setup-entities";
import { renderMiniMap } from "./src/system/render-mini-map";
import { messagesResource } from "./src/resource/messages";
import { propagateTransforms } from "./src/system/propagate-transforms";
import { screenResource } from "./src/resource/screen";
import { mouseResource } from "./src/resource/mouse";

const app = new App<AppResource, AppEntity>({
    resources: [
        keyboard,
        canvas,
        messagesResource,
        screenResource,
        mouseResource,
    ],
    entityFactories: {
        "boardSquare": createBoardSquare,
        "sprite": createSprite,
        "world": createWorld,
        "camera": createCamera,
    },
});

app.addStartupSystem(setupEntities);
app.addStartupSystem(setupCanvas);
app.addStartupSystem(setupWindow);

app.addSystem(({ useResource }) => {
    const keyboard = useResource("keyboard");    
    const mouse = useResource("mouse");

    keyboard.update();
    mouse.update();
});

app.addSystem(respondToKeyboardInput);
app.addSystem(updateEntityPositions);
app.addSystem(propagateTransforms)
app.addSystem(renderBoardCam);
app.addSystem(renderMiniMap);




app.run();
