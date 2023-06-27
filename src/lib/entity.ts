import type { Camera, Shape, Style } from "./component";

type Components = (
    Camera |
    Shape |
    Style
);

interface Entity<Kind extends string, Comp extends Components> {
    kind: Kind;
    id: string;
    components: {
        [C in Comp as C["kind"]]: C["value"];
    };
}

interface EntityOptions<Kind extends string, Comp extends Components> {
    kind: Kind;
    id: string;
    components: Comp[];
}

function createEntity<Kind extends string, Comp extends Components>({
    kind,
    id,
    components
}: EntityOptions<Kind, Comp>): Entity<Kind, Comp> {
    return {
        kind,
        id,
        components: components.reduce(
            (accum: Entity<Kind, Comp>["components"], component) => {
                (accum as any)[component.kind] = component.value;
                return accum;
            },
            {} as Entity<Kind, Comp>["components"]
        ),
    };
}

export { createEntity };
export type { Entity, Components };
