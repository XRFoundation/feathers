import { JSONSchema } from 'json-schema-to-ts';
export declare const queryProperty: <T extends JSONSchema>(definition: T) => {
    readonly oneOf: readonly [T, {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly $gt: T;
            readonly $gte: T;
            readonly $lt: T;
            readonly $lte: T;
            readonly $ne: T;
            readonly $in: {
                readonly type: "array";
                readonly items: T;
            };
            readonly $nin: {
                readonly type: "array";
                readonly items: T;
            };
        };
    }];
};
export declare const queryArray: <T extends readonly string[]>(fields: T) => {
    readonly type: "array";
    readonly items: {
        readonly type: "string";
        readonly enum: T;
    };
};
