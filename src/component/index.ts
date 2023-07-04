export { camera } from "./camera";
export { dimension } from "./dimension";
export { geometry } from "./geometry";
export { style } from "./style";
export { tileMap } from "./tile-map";
export { velocity } from "./velocity";

import type { Camera } from "./camera";
import type { Dimension } from "./dimension";
import type { Geometry } from "./geometry";
import type { Style } from "./style";
import type { TileMap } from "./tile-map";
import type { Velocity } from "./velocity";

type AppComponent = 
    Camera |
    Dimension |
    Geometry |
    Style |
    TileMap |
    Velocity;

export type { AppComponent };
