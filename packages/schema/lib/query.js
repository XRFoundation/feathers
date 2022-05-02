"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryArray = exports.queryProperty = void 0;
const queryProperty = (definition) => ({
    oneOf: [
        definition,
        {
            type: 'object',
            additionalProperties: false,
            properties: {
                $gt: definition,
                $gte: definition,
                $lt: definition,
                $lte: definition,
                $ne: definition,
                $in: {
                    type: 'array',
                    items: definition
                },
                $nin: {
                    type: 'array',
                    items: definition
                }
            }
        }
    ]
});
exports.queryProperty = queryProperty;
const queryArray = (fields) => ({
    type: 'array',
    items: {
        type: 'string',
        enum: fields
    }
});
exports.queryArray = queryArray;
//# sourceMappingURL=query.js.map