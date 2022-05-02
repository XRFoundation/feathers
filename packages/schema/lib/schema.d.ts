import Ajv, { AsyncValidateFunction } from 'ajv';
import { JSONSchema6 } from 'json-schema';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
export declare const AJV: Ajv;
export declare type JSONSchemaDefinition = JSONSchema & {
    $id: string;
};
export declare class Schema<S extends JSONSchemaDefinition> {
    ajv: Ajv;
    validate: AsyncValidateFunction<FromSchema<S>>;
    definition: JSONSchema6;
    propertyNames: string[];
    readonly _type: FromSchema<S>;
    constructor(definition: S, ajv?: Ajv);
    extend<D extends JSONSchemaDefinition>(definition: D): Schema<D & S>;
    toJSON(): JSONSchema6;
}
export declare function schema<S extends JSONSchemaDefinition>(definition: S): Schema<S>;
