import type { EntityWith } from "../lib/entity";
import type { Children } from "../component/children";
import type { Parent } from "../component/parent";

function parentChild(parent: EntityWith<Children>, child: EntityWith<Parent>) {
    if (!parent.components.children.includes(child.id)) {
        parent.components.children.push(child.id);
    }
    child.components.parent = parent.id;
}

export { parentChild };
