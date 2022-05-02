"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusCode = exports.getData = exports.argumentsFor = exports.getServiceMethod = exports.knownMethods = exports.statusCodes = exports.METHOD_HEADER = void 0;
const lib_1 = require("@feathersjs/errors/lib");
const hooks_1 = require("@feathersjs/hooks");
exports.METHOD_HEADER = 'x-service-method';
exports.statusCodes = {
    created: 201,
    noContent: 204,
    methodNotAllowed: 405,
    success: 200
};
exports.knownMethods = {
    post: 'create',
    patch: 'patch',
    put: 'update',
    delete: 'remove'
};
function getServiceMethod(_httpMethod, id, headerOverride) {
    const httpMethod = _httpMethod.toLowerCase();
    if (httpMethod === 'post' && headerOverride) {
        return headerOverride;
    }
    const mappedMethod = exports.knownMethods[httpMethod];
    if (mappedMethod) {
        return mappedMethod;
    }
    if (httpMethod === 'get') {
        return id === null ? 'find' : 'get';
    }
    throw new lib_1.MethodNotAllowed(`Method ${_httpMethod} not allowed`);
}
exports.getServiceMethod = getServiceMethod;
exports.argumentsFor = {
    get: ({ id, params }) => [id, params],
    find: ({ params }) => [params],
    create: ({ data, params }) => [data, params],
    update: ({ id, data, params }) => [id, data, params],
    patch: ({ id, data, params }) => [id, data, params],
    remove: ({ id, params }) => [id, params],
    default: ({ data, params }) => [data, params]
};
function getData(context) {
    if (!(context instanceof hooks_1.BaseHookContext)) {
        return context;
    }
    return context.dispatch !== undefined
        ? context.dispatch
        : context.result;
}
exports.getData = getData;
function getStatusCode(context, data) {
    if (context instanceof hooks_1.BaseHookContext) {
        if (context.statusCode) {
            return context.statusCode;
        }
        if (context.method === 'create') {
            return exports.statusCodes.created;
        }
    }
    if (!data) {
        return exports.statusCodes.noContent;
    }
    return exports.statusCodes.success;
}
exports.getStatusCode = getStatusCode;
//# sourceMappingURL=http.js.map