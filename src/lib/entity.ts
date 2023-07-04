import type { Component } from "./component";

interface Entity<Kind extends string, Comp extends Component<string, any>> {
    kind: Kind;
    id: string;
    components: {
        [C in Comp as C["kind"]]: C["value"];
    };
}

interface EntityOptions<Kind extends string, Comp extends Component<string, any>> {
    kind: Kind;
    id: string;
    components: Comp[];
}

function createEntity<Kind extends string, Comp extends Component<string, any>>({
    kind,
    id,
    components
}: EntityOptions<Kind, Comp>) {
    return {
        kind,
        id,
        components: components.reduce(
            (accum: Entity<Kind, Comp>["components"], component) => {
                accum[component.kind] = component.value;
                return accum;
            },
            {} as Entity<Kind, Comp>["components"]
        )
    }
}

export { createEntity };
