import { OrthographicProjection } from "../component/camera";

type Vec4 = [number, number, number, number];

interface Mat4 {
    xAxis: Vec4;
    yAxis: Vec4;
    zAxis: Vec4;
    wAxis: Vec4;
}

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

function createMat4(row1?: number, row2?: number) {
    const isFloat32Array = typeof Float32Array !== "undefined";
    const value = isFloat32Array ? new Float32Array(16) : new Array<number>(16);
    if (!isFloat32Array) {
        value[1] = 0;
        value[2] = 0;
        value[3] = 0;
        value[4] = 0;
        value[6] = 0;
        value[8] = 0;
        value[9] = 0;
        value[11] = 0;
        value[12] = 0;
        value[13] = 0;
        value[14] = 0;
    }
    value[0] = row1 ?? 1;
    value[5] = row2 ?? 1;
    value[10] = 1;
    value[15] = 1;
    return value;
}

function mat4Multiply() {

}


function buildScaleMatrix(deltaW: number, deltaH: number) {
    const mat4 = createMat4(deltaW, deltaH);

    
}

export { buildProjectionMatrix, matMultiply };

