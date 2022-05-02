"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grant_1 = __importDefault(require("grant"));
const express_session_1 = __importDefault(require("express-session"));
const commons_1 = require("@feathersjs/commons");
const express_1 = require("@feathersjs/express");
const grantInstance = grant_1.default.express();
const debug = (0, commons_1.createDebug)('@feathersjs/authentication-oauth/express');
exports.default = (options) => {
    return (feathersApp) => {
        const { authService, linkStrategy } = options;
        const app = feathersApp;
        const config = app.get('grant');
        if (!config) {
            debug('No grant configuration found, skipping Express oAuth setup');
            return;
        }
        const { prefix } = config.defaults;
        const expressSession = options.expressSession || (0, express_session_1.default)({
            secret: Math.random().toString(36).substring(7),
            saveUninitialized: true,
            resave: true
        });
        const grantApp = grantInstance(config);
        const authApp = (0, express_1.original)();
        authApp.use(expressSession);
        authApp.get('/:name', (req, _res, next) => {
            const { feathers_token, redirect, ...query } = req.query;
            if (feathers_token) {
                debug('Got feathers_token query parameter to link accounts', feathers_token);
                req.session.accessToken = feathers_token;
            }
            req.session.redirect = redirect;
            req.session.query = query;
            next();
        });
        authApp.get('/:name/authenticate', async (req, res, next) => {
            const { name } = req.params;
            const { accessToken, grant, query = {}, redirect } = req.session;
            const service = app.defaultAuthentication(authService);
            const [strategy] = service.getStrategies(name);
            const params = {
                ...req.feathers,
                authStrategies: [name],
                authentication: accessToken ? {
                    strategy: linkStrategy,
                    accessToken
                } : null,
                query,
                redirect
            };
            const sendResponse = async (data) => {
                try {
                    const redirect = await strategy.getRedirect(data, params);
                    if (redirect !== null) {
                        res.redirect(redirect);
                    }
                    else if (data instanceof Error) {
                        throw data;
                    }
                    else {
                        res.json(data);
                    }
                }
                catch (error) {
                    debug('oAuth error', error);
                    next(error);
                }
            };
            try {
                const payload = config.defaults.transport === 'session' ?
                    grant.response : req.query;
                const authentication = {
                    strategy: name,
                    ...payload
                };
                await new Promise((resolve, reject) => {
                    if (!req.session.destroy) {
                        req.session = null;
                        resolve();
                    }
                    req.session.destroy((err) => err ? reject(err) : resolve());
                });
                debug(`Calling ${authService}.create authentication with strategy ${name}`);
                const authResult = await service.create(authentication, params);
                debug('Successful oAuth authentication, sending response');
                await sendResponse(authResult);
            }
            catch (error) {
                debug('Received oAuth authentication error', error.stack);
                await sendResponse(error);
            }
        });
        authApp.use(grantApp);
        app.set('grant', grantApp.config);
        app.use(prefix, authApp);
    };
};
//# sourceMappingURL=express.js.map