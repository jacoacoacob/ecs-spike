import type { OrthographicProjection } from "../component/camera";
import { createMat4 } from "./matrix";

function buildProjectionMatrix(projection: OrthographicProjection) {
    const {
        near,
        far,
        area: {
            top,
            left,
            bottom,
            right,
        },
    } = projection;
    
    return createMat4([
        2 / (right - left), 0,                  0,                -((right + left) / (right - left)),
        0,                  2 / (top - bottom), 0,                -((top + bottom) / (top - bottom)),
        0,                  0,                  2 / (near - far), -((far + near) / (far - near)),
        0,                  0,                  0,                1,
    ]);
}

function buildScaleMatrix(scale: number) {
    return createMat4([
        scale, 0,     0, 0,
        0,     scale, 0, 0,
        0,     0,     1, 0,
        0,     0,     0, 1,
    ])
}

function buildRotationMatrix(deltaRadians: number) {
    let a = Math.PI * deltaRadians;

    return createMat4([
        Math.cos(a),
        -Math.sin(a),
        0,
        0,
        Math.sin(a),
        Math.cos(a),
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
    ])
}

export { buildProjectionMatrix, buildScaleMatrix,buildRotationMatrix };

