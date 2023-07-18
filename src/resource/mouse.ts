import { createResource } from "../lib/resource";

type MouseState = "just_pressed" | "just_released" | "released" | "pressed";

function mouseResource() {
    return createResource({
        name: "mouse",
        setup() {
            let _state: MouseState = "released";
            let _bufferState: MouseState = "released";

            const position = {
                x: 0,
                y: 0,
            };

            return {
                position,
                get state() {
                    return _state;
                },
                press() {
                    _bufferState = "just_pressed";
                },
                release() {
                    _bufferState = "just_released";
                },
                update() {
                    if (_bufferState === "just_pressed") {
                        _state = "just_pressed";
                        _bufferState = "pressed";
                    }
                    else if (_bufferState === "pressed") {
                        _state = "pressed";
                    }
                    else if (_bufferState === "just_released") {
                        _state = "just_released";
                        _bufferState = "released";
                    }
                    else if (_bufferState === "released") {
                        _state = "released";
                    }
                },
            };
        },
    });
}

type MouseResource = ReturnType<typeof mouseResource>;

export { mouseResource };
export type { MouseResource };
