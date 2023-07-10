interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

function boundingRect(r: Rect) {
    return {
        top: r.y,
        right: r.x + r.w,
        bottom: r.y + r.h,
        left: r.x,
    };
}

type BoundingRect = ReturnType<typeof boundingRect>;

function isCollision(r1: Rect, r2: Rect): boolean {
    return (
        r1.x + r1.w >= r2.x &&
        r1.x <= r2.x + r2.w &&
        r1.y + r1.h >= r2.y &&
        r1.y <= r2.y + r2.h
    );
}

/**
 * Assuming `r1` and `r2` overlap, return a rect representing the parts of `r1` that overlap `r2`
 */
function getOverlap(r1: Rect, r2: Rect): Rect | null {
    if (isCollision(r1, r2)) {
        const overlap = {
            x: Math.max(r1.x, r2.x),
            y: Math.max(r1.y, r2.y),
            w: r1.w,
            h: r1.h,
        };

        const br1 = boundingRect(r1);
        const br2 = boundingRect(r2);

        if (br1.top < br2.top) {
            overlap.h -= br2.top - br1.top;
        }

        if (br1.left < br2.left) {
            overlap.w -= br2.left - br1.left;
        }

        if (br1.bottom > br2.bottom) {
            overlap.h -= br1.bottom - br2.bottom;
        }

        if (br1.right > br2.right) {
            overlap.w -= br1.right - br2.right;
        }

        return overlap;
    }

    return null;
}

export { isCollision, getOverlap, boundingRect };
export type { Rect, BoundingRect };
