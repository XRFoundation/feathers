"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = exports.serviceMethodHandler = exports.serviceMiddleware = exports.formatter = exports.feathersParams = void 0;
const errors_1 = require("@feathersjs/errors");
const commons_1 = require("@feathersjs/commons");
const transport_commons_1 = require("@feathersjs/transport-commons");
const feathers_1 = require("@feathersjs/feathers");
const express_1 = require("express");
const authentication_1 = require("./authentication");
const debug = (0, commons_1.createDebug)('@feathersjs/express/rest');
const feathersParams = (req, _res, next) => {
    req.feathers = {
        ...req.feathers,
        provider: 'rest',
        headers: req.headers
    };
    next();
};
exports.feathersParams = feathersParams;
const formatter = (_req, res, next) => {
    if (res.data === undefined) {
        return next();
    }
    res.format({
        'application/json'() {
            res.json(res.data);
        }
    });
};
exports.formatter = formatter;
const serviceMiddleware = (callback) => async (req, res, next) => {
    debug(`Running service middleware for '${req.url}'`);
    try {
        const { query, body: data } = req;
        const { __feathersId: id = null, ...route } = req.params;
        const params = { query, route, ...req.feathers };
        const context = await callback(req, res, { id, data, params });
        const result = transport_commons_1.http.getData(context);
        res.data = result;
        res.status(transport_commons_1.http.getStatusCode(context, result));
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.serviceMiddleware = serviceMiddleware;
const serviceMethodHandler = (service, methodName, getArgs, headerOverride) => (0, exports.serviceMiddleware)(async (req, res, options) => {
    const methodOverride = typeof headerOverride === 'string' && req.headers[headerOverride];
    const method = methodOverride ? methodOverride : methodName;
    const { methods } = (0, feathers_1.getServiceOptions)(service);
    if (!methods.includes(method) || feathers_1.defaultServiceMethods.includes(methodOverride)) {
        res.status(transport_commons_1.http.statusCodes.methodNotAllowed);
        throw new errors_1.MethodNotAllowed(`Method \`${method}\` is not supported by this endpoint.`);
    }
    const args = getArgs(options);
    const context = (0, feathers_1.createContext)(service, method);
    res.hook = context;
    return service[method](...args, context);
});
exports.serviceMethodHandler = serviceMethodHandler;
function rest(handler = exports.formatter) {
    return function (app) {
        if (typeof app.route !== 'function') {
            throw new Error('@feathersjs/express/rest needs an Express compatible app.');
        }
        app.use(exports.feathersParams);
        app.use((0, authentication_1.parseAuthentication)());
        // Register the REST provider
        app.mixins.push(function (service, path, options) {
            const { middleware: { before = [] } } = options;
            let { middleware: { after = [] } } = options;
            if (typeof handler === 'function') {
                after = after.concat(handler);
            }
            const baseUri = `/${path}`;
            const find = (0, exports.serviceMethodHandler)(service, 'find', transport_commons_1.http.argumentsFor.find);
            const get = (0, exports.serviceMethodHandler)(service, 'get', transport_commons_1.http.argumentsFor.get);
            const create = (0, exports.serviceMethodHandler)(service, 'create', transport_commons_1.http.argumentsFor.create, transport_commons_1.http.METHOD_HEADER);
            const update = (0, exports.serviceMethodHandler)(service, 'update', transport_commons_1.http.argumentsFor.update);
            const patch = (0, exports.serviceMethodHandler)(service, 'patch', transport_commons_1.http.argumentsFor.patch);
            const remove = (0, exports.serviceMethodHandler)(service, 'remove', transport_commons_1.http.argumentsFor.remove);
            debug(`Adding REST provider for service \`${path}\` at base route \`${baseUri}\``);
            const idRoute = '/:__feathersId';
            const serviceRouter = (0, express_1.Router)({ mergeParams: true })
                .get('/', find)
                .post('/', create)
                .get(idRoute, get)
                .put('/', update)
                .put(idRoute, update)
                .patch('/', patch)
                .patch(idRoute, patch)
                .delete('/', remove)
                .delete(idRoute, remove);
            app.use(baseUri, ...before, serviceRouter, ...after);
        });
    };
}
exports.rest = rest;
//# sourceMappingURL=rest.js.map