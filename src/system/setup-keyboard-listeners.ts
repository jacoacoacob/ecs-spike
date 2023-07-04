import { App } from "../app/create-app";
import type { AppResource } from "../resource";
import { isKey } from "../resource/keyboard";

function setupKeyboardListeners(app: App<AppResource>) {
    const keyboard = app.getResource("keyboard");

    window.addEventListener("keydown", (ev) => {
        if (isKey(ev.key)) {
            keyboard.press(ev.key);
        }
    });

    window.addEventListener("keyup", (ev) => {
        if (isKey(ev.key)) {
            keyboard.release(ev.key);
        }
    });
}

export { setupKeyboardListeners };
