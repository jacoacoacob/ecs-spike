import { IComponent } from "../lib/types";

type Dimension = IComponent<"dimension", {
    w: number;
    h: number;
}>;

function dimension(value?: Partial<Dimension["value"]>): Dimension {
    return {
        kind: "dimension",
        value: {
            w: value?.w ?? 0,
            h: value?.h ?? 0,
        },
    };
}

export { dimension };
export type { Dimension };
