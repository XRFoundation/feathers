"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.parseAuthentication = void 0;
const commons_1 = require("@feathersjs/commons");
const lodash_1 = require("lodash");
const debug = (0, commons_1.createDebug)('@feathersjs/express/authentication');
const normalizeStrategy = (_settings, ..._strategies) => typeof _settings === 'string'
    ? { strategies: (0, lodash_1.flatten)([_settings, ..._strategies]) }
    : _settings;
function parseAuthentication(settings = {}) {
    return function (req, res, next) {
        const app = req.app;
        const service = app.defaultAuthentication ? app.defaultAuthentication(settings.service) : null;
        if (service === null) {
            return next();
        }
        const config = service.configuration;
        const authStrategies = config.parseStrategies || config.authStrategies || [];
        if (authStrategies.length === 0) {
            debug('No `authStrategies` or `parseStrategies` found in authentication configuration');
            return next();
        }
        service.parse(req, res, ...authStrategies)
            .then((authentication) => {
            if (authentication) {
                debug('Parsed authentication from HTTP header', authentication);
                (0, lodash_1.merge)(req, {
                    authentication,
                    feathers: { authentication }
                });
            }
            next();
        }).catch(next);
    };
}
exports.parseAuthentication = parseAuthentication;
function authenticate(_settings, ..._strategies) {
    const settings = normalizeStrategy(_settings, ..._strategies);
    if (!Array.isArray(settings.strategies) || settings.strategies.length === 0) {
        throw new Error('\'authenticate\' middleware requires at least one strategy name');
    }
    return (_req, _res, next) => {
        const req = _req;
        const { app, authentication } = req;
        const service = app.defaultAuthentication(settings.service);
        debug('Authenticating with Express middleware and strategies', settings.strategies);
        service.authenticate(authentication, req.feathers, ...settings.strategies)
            .then((authResult) => {
            debug('Merging request with', authResult);
            (0, lodash_1.merge)(req, authResult);
            next();
        }).catch(next);
    };
}
exports.authenticate = authenticate;
//# sourceMappingURL=authentication.js.map