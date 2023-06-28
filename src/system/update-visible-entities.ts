import { World, Tile, Sprite } from "../entity";
import { selectWorld, selectTiles, selectSprites } from "../selector";
import { SystemParams } from "./types";

function updateVisibleEntities({ query }: SystemParams) {
    const [world] = query(selectWorld) as [World];
    const tiles = query(selectTiles) as Tile[];
    const sprites = query(selectSprites) as Sprite[];

    const { camera, tileMap } = world.components;

    const offsetX = camera.position.x + camera.viewport.x;
    const offsetY = camera.position.y + camera.viewport.y;

    // console.log(offsetX, offsetY)

    for (let i = 0; i < tiles.length; i++) {
        
    }

    for (let i = 0; i < sprites.length; i++) {

    }

}

export { updateVisibleEntities };
