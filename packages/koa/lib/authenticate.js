"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const commons_1 = require("@feathersjs/commons");
const debug = (0, commons_1.createDebug)('@feathersjs/koa:authentication');
function authentication(settings = {}) {
    return async (ctx, next) => {
        const { app } = ctx;
        const service = app.defaultAuthentication ? app.defaultAuthentication(settings.service) : null;
        if (service === null) {
            return next();
        }
        const config = service.configuration;
        const authStrategies = settings.strategies || config.parseStrategies || config.authStrategies || [];
        if (authStrategies.length === 0) {
            debug('No `authStrategies` or `parseStrategies` found in authentication configuration');
            return next();
        }
        const { req, res } = ctx;
        const authentication = await service.parse(req, res, ...authStrategies);
        if (authentication) {
            debug('Parsed authentication from HTTP header', authentication);
            ctx.feathers.authentication = authentication;
        }
        return next();
    };
}
exports.authentication = authentication;
//# sourceMappingURL=authenticate.js.map