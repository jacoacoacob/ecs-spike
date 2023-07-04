
import { animationLoop } from "./animation-loop";
import type { Resource } from "./resource";
import type { System } from "./system";

type Plugin<App> = (app: App) => void;

interface AppParams<AppResource extends Resource<string, any>> {
    resources: (() => AppResource)[];
    plugins?: Plugin<App<AppResource>>[];
}

type Resources<R extends Resource<string, any>> = {
    [X in R as X["name"]]: X["data"];
};


class App<AppResource extends Resource<string, any>> {
    private _loop = animationLoop();
    private _startupSystems: (() => void)[] = [];
    private _systems: (() => void)[] = [];
    private _resources: Resources<AppResource> = {} as Resources<AppResource>;

    private get _systemParams() {
        return {
            getResource: this.getResource.bind(this),
        };
    }

    constructor(params: AppParams<AppResource>) {
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


    addStartupSystem(system: System<App<AppResource>>) {
        this._startupSystems.push(() => system(this._systemParams));
    }

    addSystem(system: System<App<AppResource>>) {
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
