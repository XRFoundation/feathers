import { Params } from '@feathersjs/feathers';
import { Base } from './base';
export declare class SuperagentClient extends Base {
    request(options: any, params: Params): Promise<unknown>;
}
