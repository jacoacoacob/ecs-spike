export { camera } from "./camera";
export { geometry } from "./geometry";
export { style } from "./style";
export { tileMap } from "./tile-map";

import type { Camera } from "./camera";
import type { Geometry } from "./geometry";
import type { Style } from "./style";
import type { TileMap } from "./tile-map";

type Component = (
    Camera |
    Geometry |
    Style |
    TileMap
);

export type { Component }