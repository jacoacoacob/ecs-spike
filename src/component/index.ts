export { camera } from "./camera";
export { children } from "./children";
export { size } from "./size";
export { dimension } from "./dimension";
export { geometry } from "./geometry";
export { ordering } from "./ordering";
export { parent } from "./parent";
export { style } from "./style";
export { tileMap } from "./tile-map";
export { transform } from "./transform";
export { velocity } from "./velocity";

import type { Camera } from "./camera";
import type { Children } from "./children";
import type { Size } from "./size";
import type { Dimension } from "./dimension";
import type { Geometry } from "./geometry";
import type { Ordering } from "./ordering";
import type { Parent } from "./parent";
import type { Style } from "./style";
import type { TileMap } from "./tile-map";
import type { Transform } from "./transform";
import type { Velocity } from "./velocity";

type AppComponent = 
    Camera |
    Children |
    Dimension |
    Geometry |
    Ordering |
    Parent |
    Size |
    Style |
    TileMap |
    Transform |
    Velocity;

export type { AppComponent };
