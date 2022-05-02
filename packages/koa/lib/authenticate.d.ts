import { Next } from 'koa';
import { FeathersKoaContext } from './declarations';
interface MiddlewareSettings {
    service?: string;
    strategies?: string[];
}
export declare function authentication(settings?: MiddlewareSettings): (ctx: FeathersKoaContext, next: Next) => Promise<any>;
export {};
