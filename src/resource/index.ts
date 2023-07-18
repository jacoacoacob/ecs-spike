import type { Canvas } from "./canvas";
import type { Keyboard } from "./keyboard";
import type { ScreenResource } from "./screen";
import type { MessagesResource } from "./messages";
import type { MouseResource } from "./mouse";

type AppResource =
    Canvas |
    Keyboard |
    MessagesResource |
    MouseResource |
    ScreenResource;

export type { AppResource };
