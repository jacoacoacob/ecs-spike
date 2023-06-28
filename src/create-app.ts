import type { Entity } from "./entity";
import type { Selector } from "./selector";
import type { System } from "./system/types";

function createApp(canvas: HTMLCanvasElement) {
    const _onLoad: (() => void)[] = [];
    const _schedule: (() => void)[] = [];
    const _entities: Record<string, Entity> = {};
    const _plugins: Record<string, Plugin> = {};

    const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;

    function _spawn(entity: Entity) {
        _entities[entity.id] = entity;
    }

    function _query(selector: Selector) {
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

    function addStartupSystem(system: System) {
        _onLoad.push(() => system({
            canvasCtx,
            query: _query,
            spawn: _spawn,
        }));
    }

    function addSystem(system: System) {
        _schedule.push(() => system({
            canvasCtx,
            query: _query,
            spawn: _spawn,
        }));
    }

    let _animationHandle: number;

    function run() {
        while (_onLoad.length) {
            const system = _onLoad.shift() as System;
            system({
                canvasCtx,
                query: _query,
                spawn: _spawn,
            });
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
