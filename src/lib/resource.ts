
interface Resource<Name extends string, Data extends any> {
    name: Name;
    data: Data;
}

interface ResourceParams<Name extends string, Data> {
    name: Name;
    setup: () => Data;
}

function createResource<
    Name extends string,
    Data extends any
>(params: ResourceParams<Name, Data>): Resource<Name, Data> {
    const { name, setup } = params;

    const data = setup();
    
    return { name, data };
}

export { createResource };
export type { Resource, ResourceParams };
