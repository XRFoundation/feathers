import { LegacyHookFunction } from '../declarations';
export declare function fromBeforeHook(hook: LegacyHookFunction): (context: any, next: any) => Promise<any>;
export declare function fromAfterHook(hook: LegacyHookFunction): (context: any, next: any) => any;
export declare function fromErrorHooks(hooks: LegacyHookFunction[]): (context: any, next: any) => any;
export declare function collectLegacyHooks(target: any, method: string): any[];
export declare function convertHookData(obj: any): any;
export declare function enableLegacyHooks(obj: any, methods?: string[], types?: string[]): (this: any, allHooks: any) => any;
