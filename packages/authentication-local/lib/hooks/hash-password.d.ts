import { HookContext, NextFunction } from '@feathersjs/feathers';
export interface HashPasswordOptions {
    authentication?: string;
    strategy?: string;
}
export default function hashPassword(field: string, options?: HashPasswordOptions): (context: HookContext<any, any>, next?: NextFunction) => Promise<void>;
