"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.Resolver = void 0;
const errors_1 = require("@feathersjs/errors");
class Resolver {
    constructor(options) {
        this.options = options;
    }
    async resolveProperty(name, data, context, status = {}) {
        const resolver = this.options.properties[name];
        const value = data[name];
        const { path = [], stack = [] } = status || {};
        // This prevents circular dependencies
        if (stack.includes(resolver)) {
            return undefined;
        }
        const resolverStatus = {
            ...status,
            path: [...path, name],
            stack: [...stack, resolver]
        };
        return resolver(value, data, context, resolverStatus);
    }
    async resolve(data, context, status) {
        const { properties: resolvers } = this.options;
        const propertyList = (Array.isArray(status === null || status === void 0 ? void 0 : status.properties)
            ? status === null || status === void 0 ? void 0 : status.properties
            // By default get all data and resolver keys but remove duplicates
            : [...new Set(Object.keys(data).concat(Object.keys(resolvers)))]);
        const result = {};
        const errors = {};
        let hasErrors = false;
        // Not the most elegant but better performance
        await Promise.all(propertyList.map(async (name) => {
            const value = data[name];
            if (resolvers[name]) {
                try {
                    const resolved = await this.resolveProperty(name, data, context, status);
                    if (resolved !== undefined) {
                        result[name] = resolved;
                    }
                }
                catch (error) {
                    // TODO add error stacks
                    const convertedError = typeof error.toJSON === 'function'
                        ? error.toJSON()
                        : { message: error.message || error };
                    errors[name] = convertedError;
                    hasErrors = true;
                }
            }
            else if (value !== undefined) {
                result[name] = value;
            }
        }));
        if (hasErrors) {
            throw new errors_1.BadRequest(`Error resolving data ${status === null || status === void 0 ? void 0 : status.properties.join('.')}`, errors);
        }
        return result;
    }
}
exports.Resolver = Resolver;
function resolve(options) {
    return new Resolver(options);
}
exports.resolve = resolve;
//# sourceMappingURL=resolver.js.map