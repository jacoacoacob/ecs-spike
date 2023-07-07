import { Transform } from "../component/transform";
import { Velocity } from "../component/velocity";
import { EntityWith, hasComponent } from "../lib/entity";
import { AppSystemParams } from "./types";

function updateEntityPositions({ query, getResource }: AppSystemParams) {
    const transformationManager = getResource("transformation-manager");

    const moveable = query(
        (entity) => hasComponent<Transform | Velocity>(entity, ["transform", "velocity"])
    ) as EntityWith<Transform | Velocity>[];

    moveable.forEach((entity) => {
        transformationManager.add({
            entityId: entity.id,
            translation: {
                x: entity.components.transform.translation.x + entity.components.velocity.dx,
                y: entity.components.transform.translation.y + entity.components.velocity.dy,
                z: 0,
            },
        });
    });
}

export { updateEntityPositions };
