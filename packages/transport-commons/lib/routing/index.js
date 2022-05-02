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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routing = void 0;
const router_1 = require("./router");
__exportStar(require("./router"), exports);
const routing = () => (app) => {
    if (typeof app.lookup === 'function') {
        return;
    }
    const routes = new router_1.Router();
    Object.assign(app, {
        routes,
        lookup(path) {
            const result = this.routes.lookup(path);
            if (result !== null) {
                const { params, data: service } = result;
                return { params, service };
            }
            return result;
        }
    });
    // Add a mixin that registers a service on the router
    app.mixins.push((service, path) => {
        app.routes.insert(path, service);
        app.routes.insert(`${path}/:__id`, service);
    });
};
exports.routing = routing;
//# sourceMappingURL=index.js.map