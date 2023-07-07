import type { EntityWith } from "../lib/entity";
import type { Children } from "../component/children";
import type { Parent } from "../component/parent";

function setParentChild(parent: EntityWith<Children>, child: EntityWith<Parent>) {
    if (!parent.components.children.includes(child.id)) {
        parent.components.children.push(child.id);
    }
    child.components.parent = parent.id;
}

function unsetParentChild(parent: EntityWith<Children>, child: EntityWith<Parent>) {
    parent.components.children.splice(
        parent.components.children.indexOf(child.id),
        1
    );
    child.components.parent = null;
}

export { setParentChild, unsetParentChild };
