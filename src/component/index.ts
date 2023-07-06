export { camera } from "./camera";
export { radius } from "./radius";
export { rectSize } from "./rect-size";
export { dimension } from "./dimension";
export { geometry } from "./geometry";
export { style } from "./style";
export { tileMap } from "./tile-map";
export { transform } from "./transform";
export { velocity } from "./velocity";

import type { Camera } from "./camera";
import type { Radius } from "./radius";
import type { RectSize } from "./rect-size";
import type { Dimension } from "./dimension";
import type { Geometry } from "./geometry";
import type { Style } from "./style";
import type { TileMap } from "./tile-map";
import type { Transform } from "./transform";
import type { Velocity } from "./velocity";

type AppComponent = 
    Camera |
    Dimension |
    Geometry |
    Radius |
    RectSize |
    Style |
    TileMap |
    Transform |
    Velocity;

export type { AppComponent };
