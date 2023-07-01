
interface Resource<Name extends string, Data> {
    name: Name;
    data: Data;
}

interface ResourceParams<Name extends string, Data> {
    name: Name;
    // data: Data;
    setup: () => Data;
}

export type { Resource, ResourceParams };
