import { App } from "./src/lib/app";
import type { AppResource } from "./src/resource";
import type { AppEntity } from "./src/entity";
import { keyboard } from "./src/resource/keyboard";
import { canvas } from "./src/resource/canvas";
import { setupKeyboardListeners } from "./src/system/setup-keyboard-listeners";
import { setupCanvasResize } from "./src/system/setup-canvas-resize";
import { drawVisibleEntities } from "./src/system/draw-visible-entities";
import { respondToKeyboardInput } from "./src/system/respond-to-keyboard-input";
import { updateEntityPositions } from "./src/system/update-entity-positions";
import { setupEntities } from "./src/system/setup-entities";

const app = new App<AppResource, AppEntity>({
    resources: [
        keyboard,
        canvas,
    ],
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
app.addSystem(drawVisibleEntities);

app.run();


















interface Thing<Name extends string, Data extends any> {
    name: Name;
    data: Data;
}

function makeThing<Name extends string, Data extends any>(name: Name, data: Data): Thing<Name, Data> {
    return { name, data };
}

type Things<T extends Thing<string, any>> = {
    [P in T as P["name"]]: P["data"] 
}


function stuff<T extends Thing<string, any>>(things: T[]) {
    return things.reduce((accum: Things<T>, thing) => ({
        ...accum,
        [thing.name]: thing.data,
    }), {} as Things<T>)
}


const x1 = makeThing("age", {
    sport: "tennis",
    play() {
        console.log("Thwop!")
    }
});

const x2 = makeThing("dog", {
    kind: "big",
});

const s = stuff([
    x1,
    x2
]);
