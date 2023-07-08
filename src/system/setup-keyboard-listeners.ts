import { App } from "../lib/app";
import { isKey } from "../resource/keyboard";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity } from "../entity";

function setupKeyboardListeners(params: SystemParams<App<AppResource, AppEntity>>) {
    const keyboard = params.getResource("keyboard");

    window.addEventListener("keydown", (ev) => {
        let key = ev.key;
        if (/^\w$/.test(key)) {
            key = key.toLowerCase();
        }
        if (isKey(key)) {
            keyboard.press(key);
        }
    });

    window.addEventListener("keyup", (ev) => {
        let key = ev.key;
        if (/^\w$/.test(key)) {
            key = key.toLowerCase();
        }
        if (isKey(key)) {
            keyboard.release(key);
        }
    });
}

export { setupKeyboardListeners };
