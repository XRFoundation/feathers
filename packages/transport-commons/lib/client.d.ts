import { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';
interface ServiceOptions {
    name: string;
    connection: any;
    method: string;
    events?: string[];
}
export declare type SocketService<T = any, D = Partial<any>> = Service<T, D>;
export declare class Service<T = any, D = Partial<T>> implements ServiceInterface<T, D> {
    events: string[];
    path: string;
    connection: any;
    method: string;
    constructor(options: ServiceOptions);
    send<X = any>(method: string, ...args: any[]): Promise<X>;
    methods(this: any, ...names: string[]): any;
    find(params?: Params): Promise<T | T[]>;
    get(id: Id, params?: Params): Promise<T>;
    create(data: any, params?: Params): Promise<T>;
    update(id: Id, data: any, params?: Params): Promise<T>;
    patch(id: NullableId, data: any, params?: Params): Promise<T | T[]>;
    remove(id: NullableId, params?: Params): Promise<T | T[]>;
    off(name: string, ...args: any[]): any;
}
export {};
