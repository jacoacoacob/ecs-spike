import type { Rect, Circle } from "./component/shape";

type Shape = Rect | Circle;

type Slim<S extends Shape> = Omit<S, "kind">;

function isCollision(o1: Shape, o2: Shape) {
    switch (o1.kind) {
        case "circle": switch (o2.kind) {
            case "circle": return isCircleCollision(o1, o2);
            case "rect": return isRectCircleCollsion(o2, o1);
        }
        case "rect": switch (o2.kind) {
            case "circle": return isRectCircleCollsion(o1, o2);
            case "rect": return isRectCollision(o1, o2);
        }
    }
}

function isRectCollision(r1: Slim<Rect>, r2: Slim<Rect>) {
    return (
        r1.x + r1.w >= r2.x &&
        r1.x <= r2.x + r2.w &&
        r1.y + r1.h >= r2.y &&
        r1.y <= r2.y + r2.h
    );
}

function isCircleCollision(c1: Slim<Circle>, c2: Slim<Circle>) {
    const distanceX = c1.x - c2.x;
    const distanceY = c1.y - c2.y;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    return distance <= c1.r + c2.r;
}

function isRectCircleCollsion(r: Slim<Rect>, c: Slim<Circle>) {
    let testX = c.x;
    let testY = c.y;

    if (c.x < r.x) {
        // The center of the circle is to the left of the left edge of the rectangle...
        testX = r.x;
    } else if (c.x > r.x + r.w) {
        // The center of the circle is to the right of the right edge...
        testX = r.x + r.w;
    }

    if (c.y < r.y) {
        testY = r.y;
    } else if (c.y > r.y + r.h) {
        testY = r.y + r.h;
    }

    const distX = c.x - testX;
    const distY = c.y - testY;
    const distance = Math.sqrt(distX ** 2 + distY ** 2);

    return c.r >= distance;
}

export { isCollision, isRectCircleCollsion, isRectCollision, isCircleCollision };
