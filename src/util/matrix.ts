function createMat4(value?: number[]) {
    const mat4 = typeof Float32Array !== "undefined"
        ? new Float32Array(16)
        : Array<number>(16).fill(0);

    if (value && value.length === 16) {
        for (let i = 0; i < 16; i++) {
            mat4[i] = value[i];
        }
    }

    return mat4;
}

type Vec4 = [number, number, number, number];

type Mat4 = ReturnType<typeof createMat4>;

function makeMat4Get(mat4: Mat4) {
    return (row: number, col: number) => mat4[row * 4 + col];
}

function multiplyPoint(mat4: Mat4, p: Vec4): Vec4 {
    const m = makeMat4Get(mat4);
    return [
        m(0, 0) * p[0] + m(0, 1) * p[1] + m(0, 2) * p[2] + m(0, 3),
        m(1, 0) * p[0] + m(1, 1) * p[1] + m(1, 2) * p[2] + m(1, 3),
        m(2, 0) * p[0] + m(2, 1) * p[1] + m(2, 2) * p[2] + m(2, 3),
        m(3, 0) * p[0] + m(3, 1) * p[1] + m(3, 2) * p[2] + m(3, 3),
    ];
}

function multiplyMat4(m1: Mat4, m2: Mat4): Mat4 {
    const a = makeMat4Get(m1);
    const b = makeMat4Get(m2);
    return createMat4([
        a(0, 0) * b(0, 0) + a(0, 1) * b(1, 0) + a(0, 2) * b(2, 0) + a(0, 3) * b(3, 0),
        a(0, 0) * b(0, 1) + a(0, 1) * b(1, 1) + a(0, 2) * b(2, 1) + a(0, 3) * b(3, 1),
        a(0, 0) * b(0, 2) + a(0, 1) * b(1, 2) + a(0, 2) * b(2, 2) + a(0, 3) * b(3, 2),
        a(0, 0) * b(0, 3) + a(0, 1) * b(1, 3) + a(0, 2) * b(2, 3) + a(0, 3) * b(3, 3),
        a(1, 0) * b(0, 0) + a(1, 1) * b(1, 0) + a(1, 2) * b(2, 0) + a(1, 3) * b(3, 0),
        a(1, 0) * b(0, 1) + a(1, 1) * b(1, 1) + a(1, 2) * b(2, 1) + a(1, 3) * b(3, 1),
        a(1, 0) * b(0, 2) + a(1, 1) * b(1, 2) + a(1, 2) * b(2, 2) + a(1, 3) * b(3, 2),
        a(1, 0) * b(0, 3) + a(1, 1) * b(1, 3) + a(1, 2) * b(2, 3) + a(1, 3) * b(3, 3),
        a(2, 0) * b(0, 0) + a(2, 1) * b(1, 0) + a(2, 2) * b(2, 0) + a(2, 3) * b(3, 0),
        a(2, 0) * b(0, 1) + a(2, 1) * b(1, 1) + a(2, 2) * b(2, 1) + a(2, 3) * b(3, 1),
        a(2, 0) * b(0, 2) + a(2, 1) * b(1, 2) + a(2, 2) * b(2, 2) + a(2, 3) * b(3, 2),
        a(2, 0) * b(0, 3) + a(2, 1) * b(1, 3) + a(2, 2) * b(2, 3) + a(2, 3) * b(3, 3),
        a(3, 0) * b(0, 0) + a(3, 1) * b(1, 0) + a(3, 2) * b(2, 0) + a(3, 3) * b(3, 0),
        a(3, 0) * b(0, 1) + a(3, 1) * b(1, 1) + a(3, 2) * b(2, 1) + a(3, 3) * b(3, 1),
        a(3, 0) * b(0, 2) + a(3, 1) * b(1, 2) + a(3, 2) * b(2, 2) + a(3, 3) * b(3, 2),
        a(3, 0) * b(0, 3) + a(3, 1) * b(1, 3) + a(3, 2) * b(2, 3) + a(3, 3) * b(3, 3),
    ]);
}

function pipelineMat4(matrices: Mat4[]) {
    let accum = matrices[0];

    for (let i = 1; i < matrices.length; i++) {
        accum = multiplyMat4(accum, matrices[i]);
    }

    return accum;
}

export { createMat4, multiplyMat4, multiplyPoint, pipelineMat4 };
export type { Mat4, Vec4 }
