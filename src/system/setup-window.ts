import { isKey } from "../resource/keyboard";
import type { AppSystemParams } from "./types";

function setupWindow({ useResource }: AppSystemParams) {
    const keyboard = useResource("keyboard");
    const screen = useResource("screen");

    window.addEventListener("resize", screen.handleResize);

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

export { setupWindow };
