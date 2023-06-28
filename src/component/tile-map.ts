import { IComponent } from "./types";

type TileMap = IComponent<"tileMap", {
    rows: number;
    cols: number;
    tileSize: number;
}>;

function tileMap(value?: TileMap["value"]): TileMap {
    return {
        kind: "tileMap",
        value: {
            rows: value?.rows ?? 0,
            cols: value?.cols ?? 0,
            tileSize: value?.tileSize ?? 0,
        },
    };
}

export { tileMap };
export type { TileMap };
