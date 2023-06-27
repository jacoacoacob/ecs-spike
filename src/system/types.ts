import type { Selector } from "../selector/types";
import type { Entity } from "../entity";

interface SystemParams {
    canvasCtx: CanvasRenderingContext2D;
    query: (selector: Selector) => Entity[];
    spawn: (entity: Entity) => void;
}

type System = (params: SystemParams) => void;

export type { System, SystemParams };
