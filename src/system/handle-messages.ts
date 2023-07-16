import type { Children } from "../component/children";
import type { Transform } from "../component/transform";
import type { AppEntity } from "../entity";
import { type EntityWith, hasComponent } from "../lib/entity";
import type { Message } from "../resource/messages";
import type { AppSystemParams } from "./types";

type MessageHandler<M extends Message> = (
    params: AppSystemParams,
    payload: M["payload"]
) => void;

type MessageHandlers = {
    [M in Message as M["type"]]: MessageHandler<M>;
}

function handleMessages(params: AppSystemParams) {
    const { useResource } = params;

    const messages = useResource("messages");

    const handlers: MessageHandlers = {
        transform: (params, { entityId, translation }) => {
            const entity = params.getEntityById(entityId) as EntityWith<Transform>;

            const deltaX = Math.round(translation.x - entity.components.transform.translation.x);
            const deltaY = Math.round(translation.y - entity.components.transform.translation.y);

            entity.components.transform.translation.x += deltaX;
            entity.components.transform.translation.y += deltaY;
            
            entity.components.transform.translationGlobal.x += deltaX;
            entity.components.transform.translationGlobal.y += deltaY;
            
            if (hasComponent<Children>(entity, ["children"])) {
                let stack = Array.from(entity.components.children);

                while (stack.length) {
                    const childId = stack.pop() as string;

                    const child = params.getEntityById(childId) as AppEntity;

                    if (hasComponent<Transform>(child, ["transform"])) {
                        child.components.transform.translationGlobal.x += deltaX;
                        child.components.transform.translationGlobal.y += deltaY;
                    }

                    if (hasComponent<Children>(child, ["children"])) {
                        stack = stack.concat(child.components.children);
                    }
                }
            }
        },
        move_camera: (params, { entityId }) => {

        },
    };

    while (messages.length()) {
        const message = messages.dequeue() as Message;

        handlers[message.type](params, message.payload as any);
    }
}

export { handleMessages };