import type { Canvas } from "./canvas";
import type { Keyboard } from "./keyboard";

import type { MessagesResource } from "./messages";

type AppResource = Canvas | Keyboard | MessagesResource;

export type { AppResource };
