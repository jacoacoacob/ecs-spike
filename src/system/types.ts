import type { Selector } from "../selector";
import type { Entity } from "../entity";

interface SystemParams {
    canvasCtx: CanvasRenderingContext2D;
    query: (selector: Selector) => Entity[];
    spawn: (entity: Entity) => void;
}

type System<App> = (app: App) => void;

export type { System, SystemParams };
