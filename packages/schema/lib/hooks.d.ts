import { HookContext, NextFunction } from '@feathersjs/feathers';
import { Resolver } from './resolver';
import { Schema } from './schema';
export declare const resolveQuery: <T>(resolver: Resolver<T, HookContext<import("@feathersjs/feathers").Application<any, any>, any>>) => (context: HookContext, next: NextFunction) => Promise<any>;
export declare const resolveData: <T>(resolver: Resolver<T, HookContext<import("@feathersjs/feathers").Application<any, any>, any>>) => (context: HookContext, next: NextFunction) => Promise<any>;
export declare const resolveResult: <T>(resolver: Resolver<T, HookContext<import("@feathersjs/feathers").Application<any, any>, any>>) => (context: HookContext, next: NextFunction) => Promise<void>;
export declare const validateQuery: (schema: Schema<any>) => (context: HookContext, next: NextFunction) => Promise<any>;
export declare const validateData: (schema: Schema<any>) => (context: HookContext, next: NextFunction) => Promise<any>;
