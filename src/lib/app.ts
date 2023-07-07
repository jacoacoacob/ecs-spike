import { animationLoop } from "./animation-loop";
import { Component } from "./component";
import { Entity } from "./entity";
import type { Resource } from "./resource";
import type { System } from "./system";

type Plugin<App> = (app: App) => void;

type EntityFactories<
    AppEntity extends Entity<string, Component<string, any>>
> = {
    [E in AppEntity as E["kind"]]: (id?: string) => E;
}

interface AppParams<
    AppResource extends Resource<string, any>,
    AppEntity extends Entity<string, Component<string, any>>
> {
    resources: (() => AppResource)[];
    entityFactories: EntityFactories<AppEntity>;
    plugins?: Plugin<App<AppResource, AppEntity>>[];
}

type Resources<R extends Resource<string, any>> = {
    [X in R as X["name"]]: X["data"];
};

type Entities<E extends Entity<string, Component<string, any>>> = {
    [X in E as X["id"]]: X;
}

class App<
    AppResource extends Resource<string, any>,
    AppEntity extends Entity<string, Component<string, any>>,
> {
    private _loop = animationLoop();
    private _startupSystems: (() => void)[] = [];
    private _systems: (() => void)[] = [];
    private _resources: Resources<AppResource> = {} as Resources<AppResource>;
    private _entities: Entities<AppEntity> = {} as Entities<AppEntity>;
    private _entityFactories = {} as EntityFactories<AppEntity>;

    private get _systemParams() {
        return {
            getEntityById: this.getEntityById.bind(this),
            getResource: this.getResource.bind(this),
            query: this.query.bind(this),
            queryFirst: this.queryFirst.bind(this),
            spawn: this.spawn.bind(this),
            unspawn: this.unspawn.bind(this),
        };
    }

    constructor(params: AppParams<AppResource, AppEntity>) {
        const { resources, plugins, entityFactories } = params;

        this._entityFactories = entityFactories;

        this._resources = resources.reduce(
            (accum: Resources<AppResource>, resource_) => {
                const resource = resource_();
                accum[resource.name] = resource.data;
                return accum;
            },
            {} as Resources<AppResource>
        );

        (plugins ?? []).forEach((plugin) => {
            plugin(this);
        });
    }

    spawn<Kind extends AppEntity["kind"]>(
        kind: Kind,
        id?: string
    ): ReturnType<EntityFactories<AppEntity>[Kind]>{
        const entity = this._entityFactories[kind](id);
        this._entities[entity.id] = entity;
        return entity;
    }

    unspawn(entityId: string) {
        delete this._entities[entityId];
    }

    getEntityById(entityId: string): AppEntity | undefined {
        return this._entities[entityId];
    }

    query<E extends AppEntity>(selector: (entity: E) => boolean): E[] {
        const entityIds = Object.keys(this._entities);
        const results: E[] = [];
        for (let i = 0; i < entityIds.length; i++) {
            if (selector(this._entities[entityIds[i]])) {
                results.push(this._entities[entityIds[i]]);
            }
        }
        return results;
    }

    queryFirst<E extends AppEntity>(selector: (entity: E) => boolean): E | undefined {
        const entityIds = Object.keys(this._entities);
        for (let i = 0; i < entityIds.length; i++) {
            if (selector(this._entities[entityIds[i]])) {
                return this._entities[entityIds[i]]
            }
        }
    }

    addStartupSystem(system: System<App<AppResource, AppEntity>>) {
        this._startupSystems.push(() => system(this._systemParams));
    }

    addSystem(system: System<App<AppResource, AppEntity>>) {
        this._systems.push(() => system(this._systemParams));
    }
    
    getResource<Name extends keyof Resources<AppResource>>(name: Name) {
        return this._resources[name];
    }

    run() {
        while (this._startupSystems.length) {
            const system = this._startupSystems.shift()!;
            system();
        }
        this._loop.run(this._systems);
    }

    stop() {
        this._loop.stop();
    }
}

export { App };
