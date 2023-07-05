
import { animationLoop } from "./animation-loop";
import { Component } from "./component";
import { Entity } from "./entity";
import type { Resource } from "./resource";
import type { System } from "./system";

type Plugin<App> = (app: App) => void;

interface AppParams<
    AppResource extends Resource<string, any>,
    AppEntity extends Entity<string, Component<string, any>>
> {
    resources: (() => AppResource)[];
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

    private get _systemParams() {
        return {
            getResource: this.getResource.bind(this),
            spawn: this.spawn.bind(this),
            query: this.query.bind(this),
        };
    }

    constructor(params: AppParams<AppResource, AppEntity>) {
        const { resources, plugins } = params;

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

    spawn(entity: AppEntity) {
        this._entities[entity.id] = entity;
    }

    query(selector: (entity: AppEntity) => boolean) {
        const entityIds = Object.keys(this._entities);
        const results: AppEntity[] = [];
        for (let i = 0; i < entityIds.length; i++) {
            if (selector(this._entities[entityIds[i]])) {
                results.push(this._entities[entityIds[i]]);
            }
        }
        return results;
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
