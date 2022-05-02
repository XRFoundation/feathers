/// <reference types="node" />
/// <reference types="koa-bodyparser" />
import Koa from 'koa';
import { Server } from 'http';
import { Application as FeathersApplication } from '@feathersjs/feathers';
import '@feathersjs/authentication';
export declare type ApplicationAddons = {
    listen(port?: number, ...args: any[]): Promise<Server>;
};
export declare type Application<T = any, C = any> = Omit<Koa, 'listen'> & FeathersApplication<T, C> & ApplicationAddons;
export declare type FeathersKoaContext<A = Application> = Koa.Context & {
    app: A;
};
