import { randId } from "./utils.js";

function createEntity({ kind = "", components = [] } = {}) {
    return {
        kind,
        id: randId(6),
        components: components.reduce((accum, { kind, value }) => {
            accum[kind] = value;
            return accum;
        }, {}),
    }
}

export { createEntity };
