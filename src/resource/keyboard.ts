import { createResource } from "./create-resource";

const KEYS = [
    " ",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
] as const;

type Key = typeof KEYS[number];

function isKey(data: string): data is Key {
    return KEYS.includes(data as Key);
}
    
function keyboard() {
    return createResource({
        name: "keyboard",
        setup() {
            const _justPressed = Object.fromEntries(KEYS.map((key) => [key, false])) as Record<Key, boolean>;
            const _pressed = Object.fromEntries(KEYS.map((key) => [key, false])) as Record<Key, boolean>;
            const _justReleased = Object.fromEntries(KEYS.map((key) => [key, false])) as Record<Key, boolean>;

            const qJustPressed: Key[] = [];
            const qJustReleased: Key[] = [];

            function press(key: Key) {
                if (!pressed(key)) {
                    qJustPressed.push(key);
                }
            }

            function release(key: Key) {
                qJustReleased.push(key);
            }

            function pressed(key: Key) {
                return _pressed[key];
            }

            function justPressed(key: Key) {
                return _justPressed[key];
            }

            function justReleased(key: Key) {
                return _justReleased[key];
            }

            function tick() {
                for (let i = 0; i < KEYS.length; i++) {
                    const key = KEYS[i];
                    if (_justPressed[key]) {
                        _justPressed[key] = false;
                        _pressed[key] = true;
                    }
                    _justReleased[key] = false;
                }

                while (qJustPressed.length) {
                    const key = qJustPressed.shift() as Key;
                    _justPressed[key] = true;
                }

                while (qJustReleased.length) {
                    const key = qJustReleased.shift() as Key;
                    _pressed[key] = false;
                    _justReleased[key] = true;
                }
            }

            return {
                tick,
                press,
                release,
                pressed,
                justPressed,
                justReleased,
            };
        },
    });
}

type Keyboard = ReturnType<typeof keyboard>;

export { keyboard, isKey };
export type { Keyboard };
