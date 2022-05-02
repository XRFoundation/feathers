import hashPassword from './hooks/hash-password';
export declare const hooks: {
    hashPassword: typeof hashPassword;
    protect: (...fields: string[]) => (context: import("@feathersjs/feathers/lib").HookContext<any, any>, next?: import("@feathersjs/hooks/lib").NextFunction) => Promise<void>;
};
export { LocalStrategy } from './strategy';
