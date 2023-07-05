export { createSprite } from "./create-sprite";
export { createTile } from "./create-tile";
export { createWorld } from "./create-world";

import type { Sprite } from "./create-sprite";
import type { Tile } from "./create-tile";
import type { World } from "./create-world";

type AppEntity = Sprite | Tile | World;

export type { AppEntity, Sprite, Tile, World };