import express, { Express, static as _static, json, raw, text, urlencoded, query } from 'express';
import { Application as FeathersApplication } from '@feathersjs/feathers';
import { Application } from './declarations';
import { errorHandler, notFound } from './handlers';
import { parseAuthentication, authenticate } from './authentication';
export { _static as static, json, raw, text, urlencoded, query, errorHandler, notFound, express as original, authenticate, parseAuthentication };
export * from './rest';
export * from './declarations';
export default function feathersExpress<S = any, C = any>(feathersApp?: FeathersApplication<S, C>, expressApp?: Express): Application<S, C>;
