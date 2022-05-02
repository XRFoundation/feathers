import { HookContext } from '@feathersjs/hooks';
import { http } from '@feathersjs/transport-commons';
import { Request, Response, NextFunction, RequestHandler } from 'express';
export declare type ServiceCallback = (req: Request, res: Response, options: http.ServiceParams) => Promise<HookContext | any>;
export declare const feathersParams: (req: Request, _res: Response, next: NextFunction) => void;
export declare const formatter: (_req: Request, res: Response, next: NextFunction) => void;
export declare const serviceMiddleware: (callback: ServiceCallback) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const serviceMethodHandler: (service: any, methodName: string, getArgs: (opts: http.ServiceParams) => any[], headerOverride?: string) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare function rest(handler?: RequestHandler): (this: any, app: any) => void;
