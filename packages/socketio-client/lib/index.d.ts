import { Service, SocketService } from '@feathersjs/transport-commons/client';
import { Socket } from 'socket.io-client';
export { SocketService };
export default function socketioClient(connection: Socket, options?: any): {
    (app: any): void;
    Service: typeof Service;
    service: (this: any, name: string) => Service<any, Partial<any>>;
};
