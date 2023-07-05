import { App } from "../lib/app";
import { isKey } from "../resource/keyboard";
import type { SystemParams } from "../lib/system";
import type { AppResource } from "../resource";
import type { AppEntity } from "../entity";

function setupKeyboardListeners(params: SystemParams<App<AppResource, AppEntity>>) {
    const keyboard = params.getResource("keyboard");

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
