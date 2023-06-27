import { IComponent } from "../lib/types";

type Velocity = IComponent<"velocity", {
    dx: number;
    dy: number;
}>;

function velocity(value?: Partial<Velocity["value"]>): Velocity {
    return {
        kind: "velocity",
        value: {
            dx: value?.dx ?? 0,
            dy: value?.dy ?? 0,
        },
    };
}

export { velocity };
export type { Velocity };
