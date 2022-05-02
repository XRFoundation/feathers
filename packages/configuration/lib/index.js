"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const commons_1 = require("@feathersjs/commons");
const config_1 = __importDefault(require("config"));
const debug = (0, commons_1.createDebug)('@feathersjs/configuration');
module.exports = function init() {
    return (app) => {
        if (!app) {
            return config_1.default;
        }
        debug(`Initializing configuration for ${config_1.default.util.getEnv('NODE_ENV')} environment`);
        Object.keys(config_1.default).forEach(name => {
            const value = config_1.default[name];
            debug(`Setting ${name} configuration value to`, value);
            app.set(name, value);
        });
        return config_1.default;
    };
};
//# sourceMappingURL=index.js.map