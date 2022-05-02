"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = void 0;
const transport_commons_1 = require("@feathersjs/transport-commons");
const commons_1 = require("@feathersjs/commons");
const feathers_1 = require("@feathersjs/feathers");
const errors_1 = require("@feathersjs/errors");
const debug = (0, commons_1.createDebug)('@feathersjs/koa:rest');
function rest() {
    return async (ctx, next) => {
        const { app, request } = ctx;
        const { query: koaQuery, path, body: data, method: httpMethod } = request;
        const query = { ...koaQuery };
        const methodOverride = request.headers[transport_commons_1.http.METHOD_HEADER] ?
            request.headers[transport_commons_1.http.METHOD_HEADER] : null;
        const lookup = app.lookup(path);
        if (lookup !== null) {
            const { service, params: { __id: id = null, ...route } = {} } = lookup;
            const method = transport_commons_1.http.getServiceMethod(httpMethod, id, methodOverride);
            const { methods } = (0, feathers_1.getServiceOptions)(service);
            debug(`Found service for path ${path}, attempting to run '${method}' service method`);
            if (!methods.includes(method) || feathers_1.defaultServiceMethods.includes(methodOverride)) {
                ctx.response.status = transport_commons_1.http.statusCodes.methodNotAllowed;
                throw new errors_1.MethodNotAllowed(`Method \`${method}\` is not supported by this endpoint.`);
            }
            const createArguments = transport_commons_1.http.argumentsFor[method] || transport_commons_1.http.argumentsFor.default;
            const params = {
                ...ctx.feathers,
                query,
                route
            };
            const args = createArguments({ id, data, params });
            const hookContext = (0, feathers_1.createContext)(service, method);
            ctx.hook = hookContext;
            const result = await service[method](...args, hookContext);
            ctx.response.status = transport_commons_1.http.getStatusCode(result, {});
            ctx.body = transport_commons_1.http.getData(result);
        }
        return next();
    };
}
exports.rest = rest;
//# sourceMappingURL=rest.js.map