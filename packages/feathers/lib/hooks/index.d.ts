import { HookContextData, HookManager, Middleware } from '../dependencies';
import { Service, ServiceOptions, HookContext, FeathersService, Application } from '../declarations';
import { fromAfterHook, fromBeforeHook, fromErrorHooks } from './legacy';
export { fromAfterHook, fromBeforeHook, fromErrorHooks };
export declare function createContext(service: Service<any>, method: string, data?: HookContextData): HookContext<Application<any, any>, any>;
export declare class FeathersHookManager<A> extends HookManager {
    app: A;
    method: string;
    constructor(app: A, method: string);
    collectMiddleware(self: any, args: any[]): Middleware[];
    initializeContext(self: any, args: any[], context: HookContext): import("@feathersjs/hooks/lib/base").HookContext<any, any>;
    middleware(mw: Middleware[]): this;
}
export declare function hookMixin<A>(this: A, service: FeathersService<A>, path: string, options: ServiceOptions): FeathersService<A, Service<any, Partial<any>>>;
