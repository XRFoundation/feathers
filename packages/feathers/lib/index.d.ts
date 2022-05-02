import version from './version';
import { Feathers } from './application';
import { Application } from './declarations';
export declare function feathers<T = any, S = any>(): Application<T, S>;
export declare namespace feathers {
    var setDebug: typeof import("@feathersjs/commons/lib/debug").setDebug;
}
export { version, Feathers };
export * from './hooks/index';
export * from './declarations';
export * from './service';
