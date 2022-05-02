import { Params } from '@feathersjs/feathers';
import { Base } from './base';
export declare class FetchClient extends Base {
    request(options: any, params: Params): any;
    checkStatus(response: any): any;
}
