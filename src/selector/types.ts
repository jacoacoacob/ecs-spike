import type { Entity } from "../entity";

type Selector = (entity: Entity) => boolean;

export type { Selector };
