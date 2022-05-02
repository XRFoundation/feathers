import { NextFunction } from './dependencies';
import { HookContext, FeathersService } from './declarations';
export declare function eventHook(context: HookContext, next: NextFunction): Promise<void>;
export declare function eventMixin<A>(service: FeathersService<A>): FeathersService<A, import("./declarations").Service<any, Partial<any>>>;
