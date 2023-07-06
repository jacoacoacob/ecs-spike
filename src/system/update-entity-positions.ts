import { Transform } from "../component/transform";
import { Velocity } from "../component/velocity";
import { EntityWith, withComponent } from "../lib/entity";
import { AppSystemParams } from "./types";

function updateEntityPositions({ query }: AppSystemParams) {
    const moveable = query(
        (entity) => withComponent<Transform | Velocity>(entity, ["transform", "velocity"])
    ) as EntityWith<Transform | Velocity>[];

    moveable.forEach((entity) => {
        entity.components.transform.translation.x += entity.components.velocity.dx;
        entity.components.transform.translation.y += entity.components.velocity.dy;
    });
}

export { updateEntityPositions };
