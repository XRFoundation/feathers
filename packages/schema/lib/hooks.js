"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = exports.validateQuery = exports.resolveResult = exports.resolveData = exports.resolveQuery = void 0;
const lib_1 = require("../../errors/lib");
const getContext = (context) => {
    return {
        ...context,
        params: {
            ...context.params,
            query: {}
        }
    };
};
const resolveQuery = (resolver) => async (context, next) => {
    var _a;
    const ctx = getContext(context);
    const data = ((_a = context === null || context === void 0 ? void 0 : context.params) === null || _a === void 0 ? void 0 : _a.query) || {};
    const query = await resolver.resolve(data, ctx, {
        originalContext: context
    });
    context.params = {
        ...context.params,
        query
    };
    return next();
};
exports.resolveQuery = resolveQuery;
const resolveData = (resolver) => async (context, next) => {
    const ctx = getContext(context);
    const data = context.data;
    const status = {
        originalContext: context
    };
    if (Array.isArray(data)) {
        context.data = await Promise.all(data.map(current => resolver.resolve(current, ctx, status)));
    }
    else {
        context.data = await resolver.resolve(data, ctx, status);
    }
    return next();
};
exports.resolveData = resolveData;
const resolveResult = (resolver) => async (context, next) => {
    var _a;
    const { $resolve: properties, ...query } = ((_a = context.params) === null || _a === void 0 ? void 0 : _a.query) || {};
    const { resolve } = context.params;
    const status = {
        originalContext: context,
        ...resolve,
        properties
    };
    context.params = {
        ...context.params,
        query
    };
    await next();
    const ctx = getContext(context);
    const data = context.method === 'find' && context.result.data
        ? context.result.data
        : context.result;
    if (Array.isArray(data)) {
        context.result = await Promise.all(data.map(current => resolver.resolve(current, ctx, status)));
    }
    else {
        context.result = await resolver.resolve(data, ctx, status);
    }
};
exports.resolveResult = resolveResult;
const validateQuery = (schema) => async (context, next) => {
    var _a;
    const data = ((_a = context === null || context === void 0 ? void 0 : context.params) === null || _a === void 0 ? void 0 : _a.query) || {};
    try {
        const query = await schema.validate(data);
        context.params = {
            ...context.params,
            query
        };
        return next();
    }
    catch (error) {
        throw (error.ajv ? new lib_1.BadRequest(error.message, error.errors) : error);
    }
};
exports.validateQuery = validateQuery;
const validateData = (schema) => async (context, next) => {
    const data = context.data;
    try {
        if (Array.isArray(data)) {
            context.data = await Promise.all(data.map(current => schema.validate(current)));
        }
        else {
            context.data = await schema.validate(data);
        }
    }
    catch (error) {
        throw (error.ajv ? new lib_1.BadRequest(error.message, error.errors) : error);
    }
    return next();
};
exports.validateData = validateData;
//# sourceMappingURL=hooks.js.map