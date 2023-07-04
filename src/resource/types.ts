
interface Resource<Name extends string, Data extends any> {
    name: Name;
    data: Data;
}

interface ResourceParams<Name extends string, Data> {
    name: Name;
    setup: () => Data;
}

export type { Resource, ResourceParams };
