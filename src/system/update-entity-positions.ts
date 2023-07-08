import { Transform } from "../component/transform";
import { Velocity } from "../component/velocity";
import { EntityWith, hasComponent } from "../lib/entity";
import { AppSystemParams } from "./types";

function updateEntityPositions({ query, getResource }: AppSystemParams) {
    const transformations = getResource("transformations");

    const moveable = query(
        (entity) => hasComponent<Transform | Velocity>(entity, ["transform", "velocity"])
    ) as EntityWith<Transform | Velocity>[];

    moveable.forEach((entity) => {
        if (
            entity.components.velocity.dx !== 0 ||
            entity.components.velocity.dy !== 0
        ) {
            transformations.push({
                entityId: entity.id,
                translation: {
                    x: entity.components.transform.translation.x + entity.components.velocity.dx,
                    y: entity.components.transform.translation.y + entity.components.velocity.dy,
                    z: 0,
                },
            });
        }
    });
}

export { updateEntityPositions };
