import { Base } from './base';
import { AxiosClient } from './axios';
import { FetchClient } from './fetch';
import { SuperagentClient } from './superagent';
export { AxiosClient, FetchClient, SuperagentClient };
interface HandlerResult extends Function {
    /**
     * initialize service
     */
    (): void;
    /**
     * Transport Service
     */
    Service: any;
    /**
     * default Service
     */
    service: any;
}
export declare type Handler = (connection: any, options?: any, Service?: any) => HandlerResult;
export interface Transport {
    superagent: Handler;
    fetch: Handler;
    axios: Handler;
}
export declare type RestService<T = any, D = Partial<any>> = Base<T, D>;
export default function restClient(base?: string): Transport;
