import { App } from "./src/lib/app";
import { keyboard } from "./src/resource/keyboard";
import { canvas } from "./src/resource/canvas";
import type { AppResource } from "./src/resource";
import { createSprite, type AppEntity, Sprite } from "./src/entity";
import { setupKeyboardListeners } from "./src/system/setup-keyboard-listeners";
import { setupCanvasResize } from "./src/system/setup-canvas-resize";
import { drawVisibleEntities } from "./src/system/draw-visible-entities";

const app = new App<AppResource, AppEntity>({
    resources: [
        keyboard,
        canvas,
    ],
});

app.addStartupSystem(setupCanvasResize);
app.addStartupSystem(setupKeyboardListeners);
app.addStartupSystem(({ spawn }) => {
    spawn(createSprite(50, 50, 30))
})

app.addSystem(({ getResource }) => {
    const keyboard = app.getResource("keyboard");
    keyboard.tick();
});

app.addSystem((app) => {
    const keyboard = app.getResource("keyboard");
    const [sprite] = app.query((entity) => entity.kind === "sprite") as Sprite[];
    if (keyboard.pressed("ArrowDown")) {
        sprite.components.geometry.y += 4;
    }
    if (keyboard.pressed("ArrowUp")) {
        sprite.components.geometry.y -= 4;
    }
    if (keyboard.pressed("ArrowRight")) {
        sprite.components.geometry.x += 4;
    }
    if (keyboard.pressed("ArrowLeft")) {
        sprite.components.geometry.x -= 4;
    }
})

app.addSystem(drawVisibleEntities);

function delay(millis: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    });
}

(async () => {

    app.run();

})();

















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
