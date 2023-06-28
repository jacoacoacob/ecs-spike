
interface IComponent<Kind extends string, Value> {
    kind: Kind;
    value: Value;
}

export { IComponent };
