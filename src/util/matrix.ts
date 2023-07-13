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

function mat4Get(mat4: Mat4, row: number, col: number) {
    return mat4[row * 4 + col];
}

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
    return [
        a(0, 0) * b(0, 0) + a(0, 1) * b(1, 0) + a(0, 2) * b(2, 0) + a(0, 3) * b(3, 0),
        a(0, 0) * b(0, 1) + a(0, 1) * b(1, 1) + a(0, 2) * b(2, 1) + a(0, 3) * b(3, 1),
        a(0, 0) * b(0, 2) + a(0, 1) * b(1, 2) + a(0, 2) * b(2, 2) + a(0, 3) * b(3, 2),
        a(0, 0) * b(0, 3) + a(0, 1) * b(1, 3) + a(0, 2) * b(2, 3) + a(0, 3) * b(3, 3),
        a(1, 0) * b(0, 0) + 
    ];
}

const m1 = createMat4([
    1, 2, 1, 1,
    0, 1, 0, 1,
    2, 3, 4, 1,
    1, 1, 1, 1,
]);

const m2 = createMat4([
    2, 1, 1, 1,
    6, 1, 1, 1,
    1, 2, 1, 1,
    1, 1, 1, 1,
]);

console.log(multiplyMat4(m1, m2));
// console.log(multiplyPoint(m1, [2, 6, 1, 1]));
