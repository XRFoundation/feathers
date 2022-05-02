"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.Schema = exports.AJV = void 0;
const ajv_1 = __importDefault(require("ajv"));
exports.AJV = new ajv_1.default({
    coerceTypes: true
});
class Schema {
    constructor(definition, ajv = exports.AJV) {
        this.ajv = ajv;
        this.definition = definition;
        this.propertyNames = Object.keys(this.definition.properties);
        this.validate = this.ajv.compile({
            $async: true,
            ...this.definition
        });
    }
    extend(definition) {
        const def = definition;
        const extended = {
            ...this.definition,
            ...def,
            properties: {
                ...this.definition.properties,
                ...def.properties
            }
        };
        return new Schema(extended, this.ajv);
    }
    toJSON() {
        return this.definition;
    }
}
exports.Schema = Schema;
function schema(definition) {
    return new Schema(definition);
}
exports.schema = schema;
//# sourceMappingURL=schema.js.map