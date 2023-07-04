import { App } from "./src/app/create-app";
import { keyboard } from "./src/resource/keyboard";
import type { AppResource } from "./src/resource";
import { setupKeyboardListeners } from "./src/system/setup-keyboard-listeners";
import { canvas } from "./src/resource/canvas";


const app = new App<AppResource>({
    resources: [
        keyboard,
        canvas,
    ],
});

app.addStartupSystem(setupKeyboardListeners);

app.addSystem((app) => {
    // const { ctx } = app.getResource("canvas");
    // const keyboard = app.getResource("keyboard");
    // keyboard.tick();
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // if (keyboard.justPressed("ArrowDown")) {
    //     ctx.strokeText("JUST PRESSED ARROW_DOWN", 50, 50);
    // }
    // if (keyboard.justReleased("ArrowDown")) {
    //     ctx.strokeText("RELEASED ARROW_DOWN", 50, 50);
    // }
})

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
