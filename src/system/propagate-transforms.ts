import { type EntityWith, hasComponent } from "../lib/entity";
import type { Children } from "../component/children";
import type { Transform } from "../component/transform";
import type { Transformation } from "../resource/transformation-manager";
import type { AppEntity } from "../entity";
import type { AppSystemParams } from "./types";

function propagateTransforms({ getResource, getEntityById }: AppSystemParams) {
    const { items } = getResource("transformation-manager");

    const transformations = items();

    while (transformations.length) {
        const { entityId, translation } = transformations.shift() as Transformation;

        const entity = getEntityById(entityId) as EntityWith<Transform>;

        const diffX = translation.x - entity.components.transform.translation.x;
        const diffY = translation.y - entity.components.transform.translation.y;

        entity.components.transform.translation.x += diffX;
        entity.components.transform.translation.y += diffY;

        entity.components.transform.translationGlobal.x += diffX;
        entity.components.transform.translationGlobal.y += diffY;

        if (hasComponent<Children>(entity, ["children"])) {
            let stack = Array.from(entity.components.children);

            while (stack.length) {
                const childId = stack.pop() as string;

                const childEntity = getEntityById(childId) as AppEntity;

                if (hasComponent<Transform>(childEntity, ["transform"])) {
                    childEntity.components.transform.translationGlobal.x += diffX;
                    childEntity.components.transform.translationGlobal.y += diffY;
                }

                if (hasComponent<Children>(childEntity, ["children"])) {
                    stack = stack.concat(childEntity.components.children);
                }
            }
        }
    }
}

export { propagateTransforms };
