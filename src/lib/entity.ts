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

type EntityWith<Comp extends Component<string, any>> = Entity<string, Comp>;

function hasComponent<Comp extends Component<string, any>>(
    entity: EntityWith<any>,
    componentKinds: Comp["kind"][]
): entity is EntityWith<Comp> {
    for (let i = 0; i < componentKinds.length; i++) {
        if (Boolean((entity.components as any)[componentKinds[i]]) === false) {
            return false
        }
    }
    return true;
}

function createEntity<Kind extends string, Comp extends Component<string, any>>({
    kind,
    id,
    components
}: EntityOptions<Kind, Comp>): Entity<Kind, Comp> {
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

export { createEntity, hasComponent };
export type { Entity, EntityWith };
