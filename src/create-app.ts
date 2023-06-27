import { Entity } from "./entity";
import { Selector } from "./selector/types";
import type { System } from "./system/types";


function createApp(canvas: HTMLCanvasElement) {
    const _onLoad: (() => void)[] = [];
    const _schedule: (() => void)[] = [];
    const _entities: Record<string, Entity> = {};

    const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;

    function addStartupSystem(system: System) {
        _onLoad.push(() => system({
            query,
            canvasCtx,
            spawn,
        }));
    }

    function addSystem(system: System) {
        _schedule.push(() => system({
            query,
            canvasCtx,
            spawn,
        }));
    }

    function spawn(entity: Entity) {
        _entities[entity.id] = entity;
    }

    function query(selector: Selector) {
        const entityIds = Object.keys(_entities);
        const results: Entity[] = [];
        for (let i = 0; i < entityIds.length; i++) {
            const entity = _entities[entityIds[i]];
            if (selector(entity)) {
                results.push(entity);
            }
        }
        return results;
    }

    let _animationHandle: number;

    function run() {
        while (_onLoad.length) {
            const system = _onLoad.shift() as System;
            system({ canvasCtx, query, spawn });
        }
        for (let i = 0; i < _schedule.length; i++) {
            _schedule[i]();
        }
        _animationHandle = window.requestAnimationFrame(run);
    }

    function stop() {
        window.cancelAnimationFrame(_animationHandle);
    }

    return {
        addStartupSystem,
        addSystem,
        run,
        stop,
    };
}

export { createApp };
