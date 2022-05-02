import { ServiceMethods, Params, Id, NullableId, Paginated } from '@feathersjs/feathers';
export interface ServiceOptions {
    events?: string[];
    multi: boolean | string[];
    id: string;
    paginate: {
        default?: number;
        max?: number;
    };
    whitelist?: string[];
    allow: string[];
    filters: string[];
}
export interface AdapterOptions<M = any> extends Pick<ServiceOptions, 'multi' | 'allow' | 'paginate'> {
    Model?: M;
}
export interface AdapterParams<M = any> extends Params {
    adapter?: Partial<AdapterOptions<M>>;
}
/**
 * Hook-less (internal) service methods. Directly call database adapter service methods
 * without running any service-level hooks. This can be useful if you need the raw data
 * from the service and don't want to trigger any of its hooks.
 *
 * Important: These methods are only available internally on the server, not on the client
 * side and only for the Feathers database adapters.
 *
 * These methods do not trigger events.
 *
 * @see {@link https://docs.feathersjs.com/guides/migrating.html#hook-less-service-methods}
 */
export interface InternalServiceMethods<T = any, D = Partial<T>> {
    /**
     * Retrieve all resources from this service, skipping any service-level hooks.
     *
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#find-params|Feathers API Documentation: .find(params)}
     */
    _find(params?: AdapterParams): Promise<T | T[] | Paginated<T>>;
    /**
     * Retrieve a single resource matching the given ID, skipping any service-level hooks.
     *
     * @param id - ID of the resource to locate
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#get-id-params|Feathers API Documentation: .get(id, params)}
     */
    _get(id: Id, params?: AdapterParams): Promise<T>;
    /**
     * Create a new resource for this service, skipping any service-level hooks.
     *
     * @param data - Data to insert into this service.
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#create-data-params|Feathers API Documentation: .create(data, params)}
     */
    _create(data: D | D[], params?: AdapterParams): Promise<T | T[]>;
    /**
     * Replace any resources matching the given ID with the given data, skipping any service-level hooks.
     *
     * @param id - ID of the resource to be updated
     * @param data - Data to be put in place of the current resource.
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#update-id-data-params|Feathers API Documentation: .update(id, data, params)}
     */
    _update(id: Id, data: D, params?: AdapterParams): Promise<T>;
    /**
     * Merge any resources matching the given ID with the given data, skipping any service-level hooks.
     *
     * @param id - ID of the resource to be patched
     * @param data - Data to merge with the current resource.
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#patch-id-data-params|Feathers API Documentation: .patch(id, data, params)}
     */
    _patch(id: NullableId, data: D, params?: AdapterParams): Promise<T | T[]>;
    /**
     * Remove resources matching the given ID from the this service, skipping any service-level hooks.
     *
     * @param id - ID of the resource to be removed
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#remove-id-params|Feathers API Documentation: .remove(id, params)}
     */
    _remove(id: NullableId, params?: AdapterParams): Promise<T | T[]>;
}
export declare class AdapterService<T = any, D = Partial<T>, O extends Partial<ServiceOptions> = Partial<ServiceOptions>> implements ServiceMethods<T | Paginated<T>, D> {
    options: ServiceOptions & O;
    constructor(options: O);
    get id(): string;
    get events(): string[];
    filterQuery(params?: AdapterParams, opts?: any): {
        [key: string]: any;
    } & {
        paginate: any;
    };
    allowsMulti(method: string, params?: AdapterParams): boolean;
    getOptions(params: AdapterParams): ServiceOptions & {
        model?: any;
    };
    find(params?: AdapterParams): Promise<T[] | Paginated<T>>;
    get(id: Id, params?: AdapterParams): Promise<T>;
    create(data: Partial<T>, params?: AdapterParams): Promise<T>;
    create(data: Partial<T>[], params?: AdapterParams): Promise<T[]>;
    update(id: Id, data: D, params?: AdapterParams): Promise<T>;
    patch(id: Id, data: Partial<T>, params?: AdapterParams): Promise<T>;
    patch(id: null, data: Partial<T>, params?: AdapterParams): Promise<T[]>;
    patch(id: NullableId, data: Partial<T>, params?: AdapterParams): Promise<T | T[]>;
    remove(id: Id, params?: AdapterParams): Promise<T>;
    remove(id: null, params?: AdapterParams): Promise<T[]>;
    remove(id: NullableId, params?: AdapterParams): Promise<T | T[]>;
    setup(): Promise<void>;
}
