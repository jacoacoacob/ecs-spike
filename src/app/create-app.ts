import { createLoop } from "./loop";
import type { Resource } from "../resource/types";
import type { System } from "../system/types";

type Plugin<App> = (app: App) => void;

interface AppParams<AppResource extends Resource<string, any>> {
    resources: (() => AppResource)[];
    plugins?: Plugin<App<AppResource>>[];
}

type Resources<AppResource extends Resource<string, any>> = Record<string, AppResource>;

class App<AppResource extends Resource<string, any>> {
    private _loop = createLoop();
    private _systems: (() => void)[] = []; 
    private _resources: Resources<AppResource> = {} as Resources<AppResource>;

    constructor(params: AppParams<AppResource>) {
        const { resources, plugins } = params;

        this._resources = resources.reduce(
            (accum: Resources<AppResource>, resource_) => {
                const resource = resource_();
                accum[resource.name] = resource;
                return accum;
            },
            {}
        );

        (plugins ?? []).forEach((plugin) => {
            plugin(this);
        });
    }

    addSystem(system: System<App<AppResource>>) {
        this._systems.push(() => system(this));
    }

    getResource<Name extends AppResource["name"]>(name: Name){
        return this._resources[name];
    }

    run() {
        this._loop.run(this._systems);
    }

    stop() {
        this._loop.stop();
    }
}

export { App };
