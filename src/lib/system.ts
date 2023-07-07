import { App } from "./app";

interface SystemParams<A extends App<any, any>> {
    getResource: A["getResource"];
    spawn: A["spawn"];
    query: A["query"];
    queryFirst: A["queryFirst"];
    getEntityById: A["getEntityById"];
}

type System<A extends App<any, any>> = (params: SystemParams<A>) => void;

export type { System, SystemParams };
