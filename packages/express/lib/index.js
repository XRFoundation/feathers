"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAuthentication = exports.authenticate = exports.original = exports.notFound = exports.errorHandler = exports.query = exports.urlencoded = exports.text = exports.raw = exports.json = exports.static = void 0;
const express_1 = __importStar(require("express"));
exports.original = express_1.default;
Object.defineProperty(exports, "static", { enumerable: true, get: function () { return express_1.static; } });
Object.defineProperty(exports, "json", { enumerable: true, get: function () { return express_1.json; } });
Object.defineProperty(exports, "raw", { enumerable: true, get: function () { return express_1.raw; } });
Object.defineProperty(exports, "text", { enumerable: true, get: function () { return express_1.text; } });
Object.defineProperty(exports, "urlencoded", { enumerable: true, get: function () { return express_1.urlencoded; } });
Object.defineProperty(exports, "query", { enumerable: true, get: function () { return express_1.query; } });
const feathers_1 = require("@feathersjs/feathers");
const commons_1 = require("@feathersjs/commons");
const handlers_1 = require("./handlers");
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return handlers_1.errorHandler; } });
Object.defineProperty(exports, "notFound", { enumerable: true, get: function () { return handlers_1.notFound; } });
const authentication_1 = require("./authentication");
Object.defineProperty(exports, "parseAuthentication", { enumerable: true, get: function () { return authentication_1.parseAuthentication; } });
Object.defineProperty(exports, "authenticate", { enumerable: true, get: function () { return authentication_1.authenticate; } });
__exportStar(require("./rest"), exports);
__exportStar(require("./declarations"), exports);
const debug = (0, commons_1.createDebug)('@feathersjs/express');
function feathersExpress(feathersApp, expressApp = (0, express_1.default)()) {
    if (!feathersApp) {
        return expressApp;
    }
    if (typeof feathersApp.setup !== 'function') {
        throw new Error('@feathersjs/express requires a valid Feathers application instance');
    }
    const { use, listen } = expressApp;
    // A mixin that provides the extended functionality
    const mixin = {
        use(location, ...rest) {
            let service;
            let options = {};
            const middleware = rest.reduce(function (middleware, arg) {
                if (typeof arg === 'function' || Array.isArray(arg)) {
                    middleware[service ? 'after' : 'before'].push(arg);
                }
                else if (!service) {
                    service = arg;
                }
                else if (arg.methods || arg.events) {
                    options = arg;
                }
                else {
                    throw new Error('Invalid options passed to app.use');
                }
                return middleware;
            }, {
                before: [],
                after: []
            });
            const hasMethod = (methods) => methods.some(name => (service && typeof service[name] === 'function'));
            // Check for service (any object with at least one service method)
            if (hasMethod(['handle', 'set']) || !hasMethod(feathers_1.defaultServiceMethods)) {
                debug('Passing app.use call to Express app');
                return use.call(this, location, ...rest);
            }
            debug('Registering service with middleware', middleware);
            // Since this is a service, call Feathers `.use`
            feathersApp.use.call(this, location, service, {
                ...options,
                middleware
            });
            return this;
        },
        async listen(...args) {
            const server = listen.call(this, ...args);
            await this.setup(server);
            debug('Feathers application listening');
            return server;
        }
    };
    const feathersDescriptors = {
        ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(feathersApp)),
        ...Object.getOwnPropertyDescriptors(feathersApp)
    };
    // Copy all non-existing properties (including non-enumerables)
    // that don't already exist on the Express app
    Object.keys(feathersDescriptors).forEach(prop => {
        const feathersProp = feathersDescriptors[prop];
        const expressProp = Object.getOwnPropertyDescriptor(expressApp, prop);
        if (expressProp === undefined && feathersProp !== undefined) {
            Object.defineProperty(expressApp, prop, feathersProp);
        }
    });
    return Object.assign(expressApp, mixin);
}
exports.default = feathersExpress;
if (typeof module !== 'undefined') {
    module.exports = Object.assign(feathersExpress, module.exports);
}
//# sourceMappingURL=index.js.map