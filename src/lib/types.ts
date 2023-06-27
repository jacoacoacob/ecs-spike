import { Entity } from "../entities";

interface IComponent<Kind extends string, Value> {
    kind: Kind;
    value: Value;
}

type Selector = (entity: Entity) => boolean;

interface SystemParams {
    canvasCtx: CanvasRenderingContext2D;
    query: (selector: Selector) => Entity[];
}

type System = (params: SystemParams) => void;

interface IAppState {

}

export type { IComponent, System, SystemParams, Selector, IAppState };
