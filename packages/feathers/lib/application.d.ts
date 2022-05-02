/// <reference types="node" />
import { EventEmitter } from './dependencies';
import { FeathersApplication, ServiceMixin, Service, ServiceOptions, ServiceInterface, Application, HookOptions, FeathersService, HookMap } from './declarations';
export declare class Feathers<ServiceTypes, AppSettings> extends EventEmitter implements FeathersApplication<ServiceTypes, AppSettings> {
    services: ServiceTypes;
    settings: AppSettings;
    mixins: ServiceMixin<Application<ServiceTypes, AppSettings>>[];
    version: string;
    _isSetup: boolean;
    appHooks: HookMap<Application<ServiceTypes, AppSettings>, any>;
    private legacyHooks;
    constructor();
    get<L extends keyof AppSettings & string>(name: L): AppSettings[L];
    set<L extends keyof AppSettings & string>(name: L, value: AppSettings[L]): this;
    configure(callback: (this: this, app: this) => void): this;
    defaultService(location: string): ServiceInterface<any>;
    service<L extends keyof ServiceTypes & string>(location: L): FeathersService<this, keyof any extends keyof ServiceTypes ? Service<any> : ServiceTypes[L]>;
    use<L extends keyof ServiceTypes & string>(path: L, service: keyof any extends keyof ServiceTypes ? ServiceInterface<any> | Application : ServiceTypes[L], options?: ServiceOptions): this;
    hooks(hookMap: HookOptions<this, any>): any;
    setup(): Promise<this>;
}
