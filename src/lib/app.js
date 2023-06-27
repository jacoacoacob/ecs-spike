/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
function createApp(canvas) {
    const _onLoad = [];
    const _schedule = [];
    const _entities = {};

    const _ctx = canvas.getContext("2d");

    function addStartupSystem(system) {
        _onLoad.push(() => system({
            query,
            entities: _entities,
            ctx: _ctx,
        }));
    }

    function addSystem(system) {
        _schedule.push(() => system({
            query,
            entities: _entities,
            ctx: _ctx,
        }));
    }

    function addEntity(entity) {
        _entities[entity.id] = entity;
    }

    function query(selector) {
        const entityIds = Object.keys(_entities);
        const results = [];
        for (let i = 0; i < entityIds.length; i++) {
            const entity = _entities[entityIds[i]];
            if (selector(entity)) {
                results.push(entity);
            }
        }
        return results;
    }

    let _animationHandle;

    function run() {
        while (_onLoad.length) {
            const system = _onLoad.shift();
            system();
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
        addEntity,
        query,
        run,
        stop,
    };
}

export { createApp };
