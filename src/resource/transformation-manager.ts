import { Translation } from "../component/transform";
import { createResource } from "../lib/resource";

interface Transformation {
    entityId: string;
    translation: Translation;
}

function transformationManager() {
    return createResource({
        name: "transformation-manager",
        setup() {
            let transformations: Transformation[] = [];

            return {
                add(transformation: Transformation) {
                    transformations.push(transformation);
                },
                items() {
                    return transformations;
                },
                clear() {
                    transformations = [];
                }
            }
        },
    });
}

type TransformationManager = ReturnType<typeof transformationManager>;

export { transformationManager };
export type { TransformationManager, Transformation };
