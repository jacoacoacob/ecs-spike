import { createResource } from "../lib/resource";
import type { Translation } from "../component/transform";

interface IMessage<T extends string, P extends any> {
    type: T;
    payload: P;
}

type MoveCamera = IMessage<"move_camera", {
    entityId: string;
}>;

type Transform = IMessage<"transform", {
    entityId: string
    translation: Translation;
}>;

type Message = MoveCamera | Transform;

type Messages = {
    [T in Message as T["type"]]: T["payload"];
}

function messagesResource() {
    return createResource({
        name: "messages",
        setup() {
            const messages: Message[] = [];

            return {
                enqueue<T extends keyof Messages>(type: T, payload: Messages[T]) {
                    messages.push({ type, payload } as Message);
                },
                dequeue() {
                    return messages.shift();
                },
                length() {
                    return messages.length;
                },
            };
        },
    });
}

type MessagesResource = ReturnType<typeof messagesResource>;

export { messagesResource };
export type { MessagesResource, Message };
