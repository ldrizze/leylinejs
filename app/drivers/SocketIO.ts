import { Driver, Payload } from '../classes'

export class SocketIODriver extends Driver {
  public initialize (): void {}
  public listen (port: number): void {}
  public send (payload: Payload): void {}
  public close (socket: any): void {}
}
