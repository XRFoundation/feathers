import { HookContext, NullableId, Params } from '@feathersjs/feathers';
export declare const METHOD_HEADER = "x-service-method";
export interface ServiceParams {
    id: NullableId;
    data: any;
    params: Params;
}
export declare const statusCodes: {
    created: number;
    noContent: number;
    methodNotAllowed: number;
    success: number;
};
export declare const knownMethods: {
    [key: string]: any;
};
export declare function getServiceMethod(_httpMethod: string, id: unknown, headerOverride?: string): any;
export declare const argumentsFor: {
    get: ({ id, params }: ServiceParams) => (Params | NullableId)[];
    find: ({ params }: ServiceParams) => Params[];
    create: ({ data, params }: ServiceParams) => any[];
    update: ({ id, data, params }: ServiceParams) => any[];
    patch: ({ id, data, params }: ServiceParams) => any[];
    remove: ({ id, params }: ServiceParams) => (Params | NullableId)[];
    default: ({ data, params }: ServiceParams) => any[];
};
export declare function getData(context: HookContext | {
    [key: string]: any;
}): any;
export declare function getStatusCode(context: HookContext, data?: any): number;
