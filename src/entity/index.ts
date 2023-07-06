export { createSprite } from "./create-sprite";
export { createBoardSquare } from "./create-board-square";
export { createWorld } from "./create-world";

import type { Sprite } from "./create-sprite";
import type { BoardSquare } from "./create-board-square";
import type { World } from "./create-world";

type AppEntity = Sprite | BoardSquare | World;

export type { AppEntity, Sprite, BoardSquare, World };