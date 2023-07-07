import { type EntityWith, hasComponent } from "../lib/entity";
import type { Children } from "../component/children";
import type { Transform } from "../component/transform";
import type { AppEntity } from "../entity";
import type { AppSystemParams } from "./types";

function propagateTransforms({ getResource, getEntityById }: AppSystemParams) {
    const { items } = getResource("transformation-manager");

    const transformations = items();

    for (let i = 0; i < transformations.length; i++) {
        const { entityId, translation } = transformations[i];

        const entity = getEntityById(entityId) as EntityWith<Transform>;

        const diffX = translation.x - entity.components.transform.translation.x;
        const diffY = translation.y - entity.components.transform.translation.y;

        entity.components.transform.translation.x += diffX;
        entity.components.transform.translation.y += diffY;

        if (hasComponent<Children>(entity, ["children"])) {
            let stack = entity.components.children;

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


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////



// function propagateTransforms({ query, getResource, getEntityById }: AppSystemParams) {
//     const transformations = getResource("transformation-manager");

//     const transformedEntities: AppEntity[] = [];

//     function propagate(x: number, y: number, entities: AppEntity[]) {
        
//     }



//     transformations.items().forEach(({ entityId }) => {
//         const entity = getEntityById(entityId) as AppEntity;
//         if (hasComponent<Children>(entity, ["children"])) {
//             entity.components.children.forEach((childId) => {
//                 const childEntity = getEntityById(childId) as AppEntity;
//                 if (hasComponent<Transform>(childEntity, ["transform"])) {

//                 }

//             })
//         }
//     })

//     // const entities = query((entity) =>
//     //     entity.kind === "boardSquare" ||
//     //     entity.kind === "sprite" ||
//     //     entity.kind === "world"
//     // ).reduce((accum: Record<string, AppEntity>, entity) => {
//     //     accum[entity.id] = entity;
//     //     return accum;
//     // }, {});

//     // const graph = transformations.items().reduce(
//     //     (accum: Record<string, string[]>, { translation, entityId }) => {
//     //         const entity = entities[entityId];
//     //         if (hasComponent<Parent | Children>(entity, ["children", "parent"])) {
//     //             entity.components.parent
//     //         }
//     //         else if (hasComponent<Parent>(entity, ["parent"])) {
//     //             entity.components
//     //         }
//     //         else if (hasComponent<Children>(entity, ["children"])) {

//     //         }
//     //         return accum;
//     //     },
//     //     {}
//     // );
// }

// export { propagateTransforms };
