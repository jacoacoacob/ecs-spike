import type { Component } from "../types";

type Style = Component<"style", {
    fillStyle: string;
    strokeStyle: string;
}>;

function style(value?: Partial<Style["value"]>): Style {
    return {
        kind: "style",
        value: {
            fillStyle: value?.fillStyle ?? "",
            strokeStyle: value?.strokeStyle ?? "",
        },
    };
}

export { style };
export type { Style };
