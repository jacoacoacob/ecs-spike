import { AppEntity } from "../entity";
import { App } from "../lib/app";
import { SystemParams } from "../lib/system";
import { AppResource } from "../resource";

type AppSystemParams = SystemParams<App<AppResource, AppEntity>>;

export type { AppSystemParams };
