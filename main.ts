import { App } from "./src/lib/app";
import type { AppResource } from "./src/resource";
import { createSprite, type AppEntity, createBoardSquare, createWorld } from "./src/entity";
import { keyboard } from "./src/resource/keyboard";
import { canvas } from "./src/resource/canvas";
import { transformations } from "./src/resource/transformations";
import { setupKeyboardListeners } from "./src/system/setup-keyboard-listeners";
import { setupCanvasResize } from "./src/system/setup-canvas-resize";
import { drawVisibleEntities } from "./src/system/draw-visible-entities";
import { respondToKeyboardInput } from "./src/system/respond-to-keyboard-input";
import { updateEntityPositions } from "./src/system/update-entity-positions";
import { setupEntities } from "./src/system/setup-entities";
import { propagateTransforms } from "./src/system/propagate-transforms";

const app = new App<AppResource, AppEntity>({
    resources: [
        keyboard,
        canvas,
        transformations,
    ],
    entityFactories: {
        "boardSquare": createBoardSquare,
        "sprite": createSprite,
        "world": createWorld,
    },
});

app.addStartupSystem(setupCanvasResize);
app.addStartupSystem(setupKeyboardListeners);
app.addStartupSystem(setupEntities);

app.addSystem(({ getResource }) => {
    const keyboard = getResource("keyboard");
    keyboard.tick();
});
app.addSystem(respondToKeyboardInput);
app.addSystem(updateEntityPositions);
app.addSystem(propagateTransforms);
app.addSystem(drawVisibleEntities);

app.run();
