import { World, Tile, Sprite } from "../entity";
import { selectWorld, selectTiles, selectSprites } from "../selector";
import { SystemParams } from "./types";

function updateVisibleEntities({ query }: SystemParams) {
    const [world] = query(selectWorld) as [World];
    const tiles = query(selectTiles) as Tile[];
    const sprites = query(selectSprites) as Sprite[];

    const { camera, tileMap } = world.components;

    for (let i = 0; i < tiles.length; i++) {
        
    }

    for (let i = 0; i < sprites.length; i++) {

    }

}

export { updateVisibleEntities };
