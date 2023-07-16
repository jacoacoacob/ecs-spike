import type { Canvas } from "./canvas";
import type { Keyboard } from "./keyboard";
import type { Transformations } from "./transformations";
import type { MessagesResource } from "./messages";

type AppResource = Canvas | Keyboard | MessagesResource | Transformations;

export type { AppResource };
