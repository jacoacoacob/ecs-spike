import { OrthographicProjection } from "../component/camera";

type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];

interface Mat3 {
    xAxis: Vec3;
    yAxis: Vec3;
    zAxis: Vec3;
}

interface Mat4 {
    xAxis: Vec4;
    yAxis: Vec4;
    zAxis: Vec4;
    wAxis: Vec4;
}

const mat = buildProjectionMatrix({
    near: 0,
    far: 1000,
    viewportOrigin: {
        x: 0.5,
        y: 0.5,
    },
    scale: 1,
    area: {
        top: 0,
        right: 1000,
        bottom: 700,
        left: 0,
    },
});

// const x = 30;
// const y = 60;
// const z = 1;

// const spriteVec: Vec4 = [
//     x,
//     y,
//     z,
//     0
// ];

function matMultiply(pm: Mat4, spriteVec: Vec4): Vec4 {
    const matrixRows = [
        pm.xAxis,
        pm.yAxis,
        pm.yAxis,
        pm.wAxis,
    ];

    const rv: number[] = [];

    for (let i = 0; i < spriteVec.length; i++) {
        const row = matrixRows[i];
        let value = 0;
        for (let j = 0; j < row.length; j++) {
            value += row[j] * spriteVec[j];
        }
        rv.push(Math.round(value * 1000) / 1000);
    }

    return rv as Vec4;
}

function buildProjectionMatrix(p: OrthographicProjection): Mat4 {
    const {
        near,
        far,
        area: {
            top,
            left,
            bottom,
            right,
        },
    } = p;

    return {
        xAxis: [
            2 / (right - left),
            0,
            0,
            -((right + left) / (right - left)),
        ],
        yAxis: [
            0,
            2 / (top - bottom),
            0,
            -((top + bottom) / (top - bottom)),
        ],
        zAxis: [
            0,
            0,
            2 / (far - near),
            -((far + near) / (far - near)),
        ],
        wAxis: [
            0,
            0,
            0,
            1
        ]
    };
}

export { buildProjectionMatrix, matMultiply };

