import type { AppSystemParams } from "./types";

function updateResources({ useResource }: AppSystemParams) {
    const keyboard = useResource("keyboard");    
    const mouse = useResource("mouse");

    keyboard.update();
    mouse.update();
}

export { updateResources };
