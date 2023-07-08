export { createBoardSquare } from "./create-board-square";
export { createCamera } from "./create-camera";
export { createSprite } from "./create-sprite";
export { createWorld } from "./create-world";
export { setParentChild, unsetParentChild } from "./parent-child";

import type { BoardSquare } from "./create-board-square";
import type { Camera } from "./create-camera";
import type { Sprite } from "./create-sprite";
import type { World } from "./create-world";

type AppEntity = BoardSquare | Camera | Sprite | World;

export type { AppEntity, Sprite, BoardSquare, World, Camera };