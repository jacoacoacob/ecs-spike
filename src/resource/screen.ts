import { createResource } from "../lib/resource";

type ResizeListener = (ev: UIEvent) => void;

function screenResource() {
    return createResource({
        name: "screen",
        setup() {
            const _resizeListeners: ResizeListener[]= [];
            
            return {
                handleResize(ev: UIEvent) {
                    for (let i = 0; i < _resizeListeners.length; i++) {
                        _resizeListeners[i](ev);
                    }
                },
                onResize(listener: ResizeListener) {
                    if (!_resizeListeners.includes(listener)) {
                        _resizeListeners.push(listener);
                    }
                },
                offResize(listner: ResizeListener) {
                    const listenerIndex = _resizeListeners.indexOf(listner);
                    if (listenerIndex > -1) {
                        _resizeListeners.splice(listenerIndex, 1);
                    }
                },
            };
        },
    });
}

type ScreenResource = ReturnType<typeof screenResource>;

export { screenResource };
export type { ScreenResource };
