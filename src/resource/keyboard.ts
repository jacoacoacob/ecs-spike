import { createResource } from "../lib/resource";

const KEYS = [
    " ",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "a",
    "s",
    "d",
    "w",
    "z",
    "x",
] as const;

type Key = typeof KEYS[number];

type Timestamp = number;

function isKey(data: string): data is Key {
    return KEYS.includes(data as Key);
}

function whichDirection(dirNeg: Timestamp, dirPos: Timestamp, velocity: number) {
    if (dirPos > dirNeg) {
        return velocity;
    }
    if (dirPos < dirNeg) {
        return -velocity;
    }
    return 0;
}
    
function keyboard() {
    return createResource({
        name: "keyboard",
        setup() {
            const _justPressed = Object.fromEntries(KEYS.map((key) => [key, false])) as Record<Key, boolean>;
            const _pressed = Object.fromEntries(KEYS.map((key) => [key, 0])) as Record<Key, Timestamp> 
            const _justReleased = Object.fromEntries(KEYS.map((key) => [key, false])) as Record<Key, boolean>;

            const _bufferJustPressed: Key[] = [];
            const _bufferJustReleased: Key[] = [];

            function press(key: Key) {
                if (pressed(key) === 0) {
                    _bufferJustPressed.push(key);
                }
            }

            function release(key: Key) {
                _bufferJustReleased.push(key);
            }

            function pressed(key: Key): Timestamp {
                return _pressed[key];
            }

            function justPressed(key: Key) {
                return _justPressed[key];
            }

            function justReleased(key: Key) {
                return _justReleased[key];
            }

            function update() {
                for (let i = 0; i < KEYS.length; i++) {
                    const key = KEYS[i];
                    if (_justPressed[key]) {
                        _justPressed[key] = false;
                        _pressed[key] = Date.now();
                    }
                    _justReleased[key] = false;
                }

                while (_bufferJustPressed.length) {
                    const key = _bufferJustPressed.shift() as Key;
                    _justPressed[key] = true;
                }

                while (_bufferJustReleased.length) {
                    const key = _bufferJustReleased.shift() as Key;
                    _pressed[key] = 0;
                    _justReleased[key] = true;
                }
            }

            return {
                update,
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

export { keyboard, isKey, whichDirection };
export type { Keyboard };

