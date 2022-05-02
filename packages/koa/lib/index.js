"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.koa = exports.errorHandler = exports.bodyParser = exports.Koa = exports.rest = void 0;
const koa_1 = __importDefault(require("koa"));
exports.Koa = koa_1.default;
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
exports.bodyParser = koa_bodyparser_1.default;
const koa_qs_1 = __importDefault(require("koa-qs"));
const transport_commons_1 = require("@feathersjs/transport-commons");
const commons_1 = require("@feathersjs/commons");
const error_handler_1 = require("./error-handler");
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return error_handler_1.errorHandler; } });
const debug = (0, commons_1.createDebug)('@feathersjs/koa');
__exportStar(require("./declarations"), exports);
__exportStar(require("./authenticate"), exports);
var rest_1 = require("./rest");
Object.defineProperty(exports, "rest", { enumerable: true, get: function () { return rest_1.rest; } });
function koa(_app) {
    const koaApp = new koa_1.default();
    if (!_app) {
        return koaApp;
    }
    if (typeof _app.setup !== 'function') {
        throw new Error('@feathersjs/koa requires a valid Feathers application instance');
    }
    const app = _app;
    const { listen: koaListen, use: koaUse } = koaApp;
    const oldUse = app.use;
    Object.assign(app, {
        use(location, ...args) {
            if (typeof location === 'string') {
                return oldUse.call(this, location, ...args);
            }
            return koaUse.call(this, location);
        },
        async listen(port, ...args) {
            const server = koaListen.call(this, port, ...args);
            await this.setup(server);
            debug('Feathers application listening');
            return server;
        }
    });
    const feathersDescriptors = {
        ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(app)),
        ...Object.getOwnPropertyDescriptors(app)
    };
    const koaDescriptors = {
        ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(koaApp)),
        ...Object.getOwnPropertyDescriptors(koaApp)
    };
    // Copy all non-existing properties (including non-enumerables)
    // that don't already exist on the Express app
    Object.keys(koaDescriptors).forEach(prop => {
        const feathersProp = feathersDescriptors[prop];
        const koaProp = koaDescriptors[prop];
        if (koaProp !== undefined && feathersProp === undefined) {
            Object.defineProperty(app, prop, koaProp);
        }
    });
    (0, koa_qs_1.default)(app);
    app.configure((0, transport_commons_1.routing)());
    app.use((ctx, next) => {
        ctx.feathers = { provider: 'rest' };
        return next();
    });
    return app;
}
exports.koa = koa;
//# sourceMappingURL=index.js.map