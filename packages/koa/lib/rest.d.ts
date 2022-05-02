import { Next } from 'koa';
import { FeathersKoaContext } from './declarations';
export declare function rest(): (ctx: FeathersKoaContext, next: Next) => Promise<any>;
