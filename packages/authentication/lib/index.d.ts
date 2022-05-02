import * as hooks from './hooks';
declare const authenticate: (originalSettings: string | import("./hooks/authenticate").AuthenticateHookSettings, ...originalStrategies: string[]) => (context: import("@feathersjs/feathers/lib").HookContext<any, any>, _next?: import("@feathersjs/hooks/lib").NextFunction) => Promise<any>;
export { hooks };
export { authenticate };
export { AuthenticationBase, AuthenticationRequest, AuthenticationResult, AuthenticationStrategy, ConnectionEvent } from './core';
export { AuthenticationBaseStrategy } from './strategy';
export { AuthenticationService } from './service';
export { JWTStrategy } from './jwt';
