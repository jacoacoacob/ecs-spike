import { App } from "../lib/app";
import type { AppEntity } from "../entity";
import type { AppResource } from "../resource";
import type { SystemParams } from "../lib/system";

type AppSystemParams = SystemParams<App<AppResource, AppEntity>>;

export type { AppSystemParams };
