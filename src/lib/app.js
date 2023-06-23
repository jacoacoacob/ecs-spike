
function createApp() {
    const _schedule = [];
    const _entities = {};

    function addSystem(system) {
        _schedule.push(() => system(_entities));
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
        for (let i = 0; i < _schedule.length; i++) {
            _schedule[i]();
        }
        _animationHandle = window.requestAnimationFrame(run);
    }

    function stop() {
        window.cancelAnimationFrame(_animationHandle);
    }

    return {
        addSystem,
        addEntity,
        query,
        run,
        stop,
    };
}

export { createApp };
