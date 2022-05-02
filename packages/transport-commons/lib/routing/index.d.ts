import { Application } from '@feathersjs/feathers';
import { Router } from './router';
declare module '@feathersjs/feathers/lib/declarations' {
    interface RouteLookup {
        service: Service<any>;
        params: {
            [key: string]: string;
        };
    }
    interface Application<ServiceTypes, AppSettings> {
        routes: Router<any>;
        lookup(path: string): RouteLookup;
    }
}
export * from './router';
export declare const routing: () => (app: Application) => void;
