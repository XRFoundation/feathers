"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterQuery = exports.OPERATORS = exports.FILTERS = void 0;
const commons_1 = require("@feathersjs/commons");
const errors_1 = require("@feathersjs/errors");
function parse(number) {
    if (typeof number !== 'undefined') {
        return Math.abs(parseInt(number, 10));
    }
    return undefined;
}
// Returns the pagination limit and will take into account the
// default and max pagination settings
function getLimit(limit, paginate) {
    if (paginate && (paginate.default || paginate.max)) {
        const base = paginate.default || 0;
        const lower = typeof limit === 'number' && !isNaN(limit) ? limit : base;
        const upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;
        return Math.min(lower, upper);
    }
    return limit;
}
// Makes sure that $sort order is always converted to an actual number
function convertSort(sort) {
    if (typeof sort !== 'object' || Array.isArray(sort)) {
        return sort;
    }
    return Object.keys(sort).reduce((result, key) => {
        result[key] = typeof sort[key] === 'object'
            ? sort[key] : parseInt(sort[key], 10);
        return result;
    }, {});
}
function cleanQuery(query, operators, filters) {
    if (Array.isArray(query)) {
        return query.map(value => cleanQuery(value, operators, filters));
    }
    else if (commons_1._.isObject(query) && query.constructor === {}.constructor) {
        const result = {};
        commons_1._.each(query, (value, key) => {
            if (key[0] === '$') {
                if (filters[key] !== undefined) {
                    return;
                }
                if (!operators.includes(key)) {
                    throw new errors_1.BadRequest(`Invalid query parameter ${key}`, query);
                }
            }
            result[key] = cleanQuery(value, operators, filters);
        });
        Object.getOwnPropertySymbols(query).forEach(symbol => {
            // @ts-ignore
            result[symbol] = query[symbol];
        });
        return result;
    }
    return query;
}
function assignFilters(object, query, filters, options) {
    if (Array.isArray(filters)) {
        commons_1._.each(filters, (key) => {
            if (query[key] !== undefined) {
                object[key] = query[key];
            }
        });
    }
    else {
        commons_1._.each(filters, (converter, key) => {
            const converted = converter(query[key], options);
            if (converted !== undefined) {
                object[key] = converted;
            }
        });
    }
    return object;
}
exports.FILTERS = {
    $sort: (value) => convertSort(value),
    $limit: (value, options) => getLimit(parse(value), options.paginate),
    $skip: (value) => parse(value),
    $select: (value) => value
};
exports.OPERATORS = ['$in', '$nin', '$lt', '$lte', '$gt', '$gte', '$ne', '$or'];
// Converts Feathers special query parameters and pagination settings
// and returns them separately a `filters` and the rest of the query
// as `query`
function filterQuery(query, options = {}) {
    const { filters: additionalFilters = {}, operators: additionalOperators = [] } = options;
    const result = {};
    result.filters = assignFilters({}, query, exports.FILTERS, options);
    result.filters = assignFilters(result.filters, query, additionalFilters, options);
    result.query = cleanQuery(query, exports.OPERATORS.concat(additionalOperators), result.filters);
    return result;
}
exports.filterQuery = filterQuery;
//# sourceMappingURL=filter-query.js.map