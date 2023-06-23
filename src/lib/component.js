
function position(x = 0, y = 0) {
    return { kind: "position", value: { x, y } };
}

function radius(r = 0) {
    return { kind: "radius", value: r };
}

function dimensions(w = 0, h = 0) {
    return { kind: "dimensions", value: { w, h }};
}

function padding(value = 0) {
    return { kind: "padding", value };
}

function margin(value = 0) {
    return { kind: "margin", value };
}

function fillStyle(value = "") {
    return { kind: "fillStyle", value };
}

function strokeStyle(value = "") {
    return { kind: "strokeStyle", value };
}

export {
    margin,
    position,
    padding,
    radius,
    dimensions, 
    fillStyle,
    strokeStyle
};
