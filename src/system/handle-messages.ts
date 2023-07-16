import { Transform } from "../component/transform";
import { EntityWith } from "../lib/entity";
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

            const newX = entity.components.transform.translation.x + deltaX;
            const newY = entity.components.transform.translation.y + deltaY;

            
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