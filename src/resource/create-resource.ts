import type { Resource, ResourceParams } from "./types";

function createResource<Name extends string, Data>(params: ResourceParams<Name, Data>): Resource<Name, Data> {
    const { name, setup } = params;

    const data = setup();
    
    return { name, data };
}

export { createResource };
