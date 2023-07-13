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


interface KeyPressInfo {
    timestamp: number;
}

function isKey(data: string): data is Key {
    return KEYS.includes(data as Key);
}

function whichDirection(dirNeg: KeyPressInfo, dirPos: KeyPressInfo, value: number) {
    if (dirPos.timestamp > dirNeg.timestamp) {
        return value;
    }
    if (dirPos.timestamp < dirNeg.timestamp) {
        return -value;
    }
    return 0;
}
    
function keyboard() {
    return createResource({
        name: "keyboard",
        setup() {
            const _justPressed = Object.fromEntries(KEYS.map((key) => [key, false])) as Record<Key, boolean>;
            const _pressed = Object.fromEntries(KEYS.map((key) => [key, { timestamp: 0 }])) as Record<Key, KeyPressInfo> 
            const _justReleased = Object.fromEntries(KEYS.map((key) => [key, false])) as Record<Key, boolean>;

            const _qJustPressed: Key[] = [];
            const _qJustReleased: Key[] = [];

            function press(key: Key) {
                if (pressed(key).timestamp === 0) {
                    _qJustPressed.push(key);
                }
            }

            function release(key: Key) {
                _qJustReleased.push(key);
            }

            function pressed(key: Key): KeyPressInfo {
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
                        _pressed[key].timestamp = Date.now();
                    }
                    _justReleased[key] = false;
                }

                while (_qJustPressed.length) {
                    const key = _qJustPressed.shift() as Key;
                    _justPressed[key] = true;
                }

                while (_qJustReleased.length) {
                    const key = _qJustReleased.shift() as Key;
                    _pressed[key].timestamp = 0;
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

export { keyboard, isKey, whichDirection };
export type { Keyboard };
