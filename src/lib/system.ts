import { App } from "./app";

interface SystemParams<A extends App<any>> {
    getResource: A["getResource"];
}

type System<A extends App<any>> = (params: SystemParams<A>) => void;

export type { System, SystemParams };
