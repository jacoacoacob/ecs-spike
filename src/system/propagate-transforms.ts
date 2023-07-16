import { type EntityWith, hasComponent } from "../lib/entity";
import type { Children } from "../component/children";
import type { Transform } from "../component/transform";
import type { Transformation } from "../resource/transformations";
import type { AppEntity, Camera } from "../entity";
import type { AppSystemParams } from "./types";

function propagateTransforms({ useResource, getEntityById }: AppSystemParams) {
    const transformations = useResource("transformations");
    const events = useResource("events");

    const _transformations = events.select("transform");



    while (_transformations.length) {
        const { entityId, translation } = _transformations.shift() as Transformation;

        const entity = getEntityById(entityId) as EntityWith<Transform>;

        const deltaX = Math.round(translation.x - entity.components.transform.translation.x);
        const deltaY = Math.round(translation.y - entity.components.transform.translation.y)

        entity.components.transform.translation.x += deltaX;
        entity.components.transform.translation.y += deltaY;

        entity.components.transform.translationGlobal.x += deltaX;
        entity.components.transform.translationGlobal.y += deltaY;

        if (hasComponent<Children>(entity, ["children"])) {
            let stack = Array.from(entity.components.children);

            while (stack.length) {
                const childId = stack.pop() as string;

                const childEntity = getEntityById(childId) as AppEntity;

                if (hasComponent<Transform>(childEntity, ["transform"])) {
                    childEntity.components.transform.translationGlobal.x += deltaX;
                    childEntity.components.transform.translationGlobal.y += deltaY;
                }

                if (hasComponent<Children>(childEntity, ["children"])) {
                    stack = stack.concat(childEntity.components.children);
                }
            }
        }
    }
}

export { propagateTransforms };
