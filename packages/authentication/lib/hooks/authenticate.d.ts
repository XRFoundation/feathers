import { HookContext, NextFunction } from '@feathersjs/feathers';
export interface AuthenticateHookSettings {
    service?: string;
    strategies: string[];
}
declare const _default: (originalSettings: string | AuthenticateHookSettings, ...originalStrategies: string[]) => (context: HookContext<any, any>, _next?: NextFunction) => Promise<any>;
export default _default;
