import { Params, Id, Query, NullableId, ServiceInterface } from '@feathersjs/feathers';
interface RestClientSettings {
    name: string;
    base: string;
    connection: any;
    options: any;
}
export declare abstract class Base<T = any, D = Partial<T>> implements ServiceInterface<T, D> {
    name: string;
    base: string;
    connection: any;
    options: any;
    constructor(settings: RestClientSettings);
    makeUrl(query: Query, id?: string | number | null): string;
    getQuery(query: Query): string;
    abstract request(options: any, params: Params): any;
    methods(this: any, ...names: string[]): any;
    find(params?: Params): any;
    get(id: Id, params?: Params): any;
    create(body: D, params?: Params): any;
    update(id: NullableId, body: D, params?: Params): any;
    patch(id: NullableId, body: D, params?: Params): any;
    remove(id: NullableId, params?: Params): any;
}
export {};
