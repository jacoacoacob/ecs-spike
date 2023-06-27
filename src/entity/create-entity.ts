import type { Component } from "../component";

interface IEntity<Kind extends string, Comp extends Component> {
    kind: Kind;
    id: string;
    components: {
        [C in Comp as C["kind"]]: C["value"];
    };
}

interface EntityOptions<Kind extends string, Comp extends Component> {
    kind: Kind;
    id: string;
    components: Comp[];
}

function createEntity<Kind extends string, Comp extends Component>({
    kind,
    id,
    components
}: EntityOptions<Kind, Comp>): IEntity<Kind, Comp> {
    return {
        kind,
        id,
        components: components.reduce(
            (accum: IEntity<Kind, Comp>["components"], component) => {
                (accum as any)[component.kind] = component.value;
                return accum;
            },
            {} as IEntity<Kind, Comp>["components"]
        ),
    };
}

export { createEntity };