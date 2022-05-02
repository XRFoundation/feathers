import { NextFunction, RequestHandler } from 'express';
declare type StrategyOptions = {
    service?: string;
    strategies: string[];
};
export declare function parseAuthentication(settings?: any): RequestHandler;
export declare function authenticate(_settings: string | StrategyOptions, ..._strategies: string[]): (_req: Request, _res: Response, next: NextFunction) => void;
export {};
