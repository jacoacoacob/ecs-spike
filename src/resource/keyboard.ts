import { createResource } from "./create-resource";

interface PressedKey {
    key: string;
    shiftKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    timestamp: number;
}

function keyboardInput() {
    return createResource({
        name: "keyboard-input",
        setup() {
            const pressedKeys: PressedKey[] = [];

            window.addEventListener("keydown", (ev) => {
                const { key, shiftKey, metaKey, ctrlKey, altKey } = ev;
                const timestamp = Date.now();
                pressedKeys.push({
                    key,
                    altKey,
                    shiftKey,
                    metaKey,
                    ctrlKey,
                    timestamp,
                })
            });
            
            window.addEventListener("keyup", (ev) => {
                const index = pressedKeys.findIndex((x) => x.key === ev.key);
                pressedKeys.splice(index, 1);
            })

            return {
                pressedKeys
            };
        },
    });
}

type KeyboardInput = ReturnType<typeof keyboardInput>;

export { keyboardInput };
export type { KeyboardInput };