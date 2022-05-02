/// <reference types="node" />
import { Application } from '@feathersjs/feathers';
import { Channel, RealTimeConnection } from './channel/base';
import { keys, Event, Publisher } from './mixins';
import EventEmitter from 'events';
declare module '@feathersjs/feathers/lib/declarations' {
    interface ServiceAddons<A, S> extends EventEmitter {
        publish(publisher: Publisher<ServiceGenericType<S>>): this;
        publish(event: Event, publisher: Publisher<ServiceGenericType<S>>): this;
        registerPublisher(publisher: Publisher<ServiceGenericType<S>>): this;
        registerPublisher(event: Event, publisher: Publisher<ServiceGenericType<S>>): this;
    }
    interface Application<ServiceTypes, AppSettings> {
        channels: string[];
        channel(name: string[]): Channel;
        channel(...names: string[]): Channel;
        publish<T>(publisher: Publisher<T>): this;
        publish<T>(event: Event, publisher: Publisher<T>): this;
        registerPublisher<T>(publisher: Publisher<T>): this;
        registerPublisher<T>(event: Event, publisher: Publisher<T>): this;
    }
    interface Params {
        connection?: RealTimeConnection;
    }
}
export { keys };
export declare function channels(): (app: Application) => void;
