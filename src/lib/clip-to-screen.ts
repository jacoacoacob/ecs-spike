import { multiplyPoint, type Mat4 } from "./matrix";
import type { Viewport } from "../component/camera";
import type { Rect } from "../util/rect";

function projectRect(viewport: Viewport, projectionMatrix: Mat4, rect: Rect): Rect {
    const [clipLeft, clipTop] = multiplyPoint(projectionMatrix, [
        rect.x,
        rect.y,
        1,
        1
    ]);

    const [clipRight, clipBottom] = multiplyPoint(projectionMatrix, [
        rect.x + rect.w,
        rect.y + rect.h,
        1,
        1
    ]);

    const projX = Math.round((clipLeft - -1) * (viewport.size.w / 2));
    const projY = Math.round((1 - clipTop) * (viewport.size.h / 2));
    const projW = Math.round((clipRight - clipLeft) * (viewport.size.w / 2));
    const projH = Math.round((clipTop - clipBottom) * (viewport.size.h / 2));

    const result = {
        x: Math.max(0, projX),
        y: Math.max(0, projY),
        w: projW,
        h: projH,
    };

    if (projX < 0) {
        result.w = projW + projX;
    }
    else if (projX + projW > viewport.size.w) {
        result.w = projW - (projX + projW - viewport.size.w);
    }

    if (projY < 0) {
        result.h = projH + projY;
    }
    else if (projY + projH > viewport.size.h) {
        result.h = projH - (projY + projH - viewport.size.h);
    }

    return result;
}

export { projectRect };