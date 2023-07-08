import { Translation } from "../component/transform";
import { createResource } from "../lib/resource";

interface Transformation {
    entityId: string;
    translation: Translation;
}

function transformations() {
    return createResource({
        name: "transformations",
        setup() {
            const stackOrQueue_comma_WhateverYouWant: Transformation[] = [];

            return stackOrQueue_comma_WhateverYouWant;
        },
    });
}

type Transformations = ReturnType<typeof transformations>;

export { transformations };
export type { Transformations, Transformation };
