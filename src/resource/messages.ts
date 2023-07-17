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
    [T in Message as T["type"]]: T["payload"][];
}

function initMessages(): Messages {
    return {
        move_camera: [],
        transform: [],
    };
}

function messagesResource() {
    return createResource({
        name: "messages",
        setup() {
            let _messages = initMessages();

            return {
                send<T extends keyof Messages>(
                    type: T,
                    payload: Messages[T][number]
                ) {
                    _messages[type].push(payload as any);
                },
                select<T extends keyof Messages>(type: T) {
                    return _messages[type];
                },
                update() {
                    _messages = initMessages();
                },
            };
        },
    });
}

type MessagesResource = ReturnType<typeof messagesResource>;

export { messagesResource };
export type { MessagesResource, Message, Transform };
