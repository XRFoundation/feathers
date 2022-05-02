import { AdapterService, ServiceOptions, InternalServiceMethods, AdapterParams } from '@feathersjs/adapter-commons';
import { NullableId, Id } from '@feathersjs/feathers';
export interface MemoryServiceStore<T> {
    [key: string]: T;
}
export interface MemoryServiceOptions<T = any> extends ServiceOptions {
    store: MemoryServiceStore<T>;
    startId: number;
    matcher?: (query: any) => any;
    sorter?: (sort: any) => any;
}
export declare class Service<T = any, D = Partial<T>> extends AdapterService<T, D> implements InternalServiceMethods<T> {
    options: MemoryServiceOptions;
    store: MemoryServiceStore<T>;
    _uId: number;
    constructor(options?: Partial<MemoryServiceOptions<T>>);
    getEntries(params?: {}): Promise<T[]>;
    _find(params?: AdapterParams): Promise<any[] | {
        total: number;
        limit: any;
        skip: any;
        data: any[];
    }>;
    _get(id: Id, params?: AdapterParams): Promise<any>;
    _create(data: Partial<T> | Partial<T>[], params?: AdapterParams): Promise<T | T[]>;
    _update(id: NullableId, data: T, params?: AdapterParams): Promise<any>;
    _patch(id: NullableId, data: Partial<T>, params?: AdapterParams): Promise<any>;
    _remove(id: NullableId, params?: AdapterParams): Promise<T | T[]>;
}
export declare function memory(options?: Partial<MemoryServiceOptions>): Service<any, Partial<any>>;
