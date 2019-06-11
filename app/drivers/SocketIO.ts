import { Driver, Payload, Collection, User } from '../classes'
import { DriversManager } from '../core'
import * as socketio from 'socket.io'
import * as http from 'http'

/**
 * Represents the SocketIO linked at System User
 */
class SocketUser {
  /**
   * Link an user identification with a socket instance
   * @param uid User identification
   * @param socket SocketIO user instance
   * @param disconnectFn Disconnect function trigger
   */
  constructor (public uid: string, public socket: any, private receiveFn: Function, private disconnectFn: Function) {
    socket.on('disconnect', () => this.disconnectFn(this))
    socket.on('LLping', (data: any) => this.receiveFn(this, data)) // TODO - Ping event for tests
  }
}

export class SocketIODriver extends Driver {

  /**
   * HTTP instance
   */
  private http: any

  /**
   * SocketIO instance
   */
  private io: any

  /**
   * Collection of connected and active users
   */
  private connectedUsers: Collection<SocketUser>

  /**
   * Initilize HTTP and SocketIO instances
   */
  public initialize (): void {
    this.http = http.createServer(this.handleHttpConnection.bind(this))
    this.io = socketio(this.http)
    this.connectedUsers = new Collection<SocketUser>('uid')
    this.io.on('connection', this.handleNewConnection.bind(this))
  }

  /**
   * Listen for new connection through HTTP and Websockets over SocketIO
   * @param port Port to listen HTTP
   */
  public listen (port: string): void {
    this.http.listen(port)
  }

  /**
   * Send a data from system to client
   * @param payload Client data to send
   */
  public send (payload: Payload): void {
    let userSocket = this.connectedUsers.find(payload.user.identification)
    if (userSocket) userSocket.socket.emit('LLpong', payload.data)
    else console.warn(`user not found in socket ${payload.user.identification}`)
  }

  /**
   * Close connection from system to client
   * @param user User to be disconnected
   */
  public close (user: User): void {
    let userSocket = this.connectedUsers.find(user.identification)
    if (userSocket) userSocket.socket.disconnect()
    else console.warn(`user not found in socket ${user.identification}`)
  }

  /**
   * Handle HTTP connections. SocketIO requires an http instance from
   * NodeJS.
   * @param request HTTP Resquest
   * @param response HTTP Response to client
   */
  private handleHttpConnection (request: any, response: any): void {
    response.writeHead(401)
    response.end()
  }

  /**
   * Handle and create events from new SocketIO connections.
   * @param socket Socket that SocketIO created to communicate between system and client
   */
  private handleNewConnection (socket: any): void {
    let userIdentification = DriversManager.onConnectFn()
    let socketUser: SocketUser = new SocketUser(userIdentification, socket,
      (socketUser: SocketUser, data: any) => {
        this.handleReceive(socketUser, data)
      },
      (socketUser: SocketUser) => {
        this.handleDisconnect(socketUser)
      })
    this.connectedUsers.add(socketUser)
    this.assignEventsOnNewConnection(socket)
    socket.emit('connection-accepted')
    console.log(`new user connection: ${socketUser.uid}`)
  }

  /**
   * Handle disconnection from client
   * @param socket Socket instance from SocketIO
   */
  private handleDisconnect (socketUser: SocketUser): void {
    console.log(`user disconnected: ${socketUser.uid}`)
    DriversManager.onCloseFn(socketUser.uid)
  }

  /**
   * Handle client events
   * @param socket Socket instance
   * @param data Data received from event
   */
  private handleReceive (socketUser: SocketUser, data: any) {
    // TODO - Mockup event 'ping' and response 'pong'
    DriversManager.onReceiveFn(socketUser.uid, 'LLping', data)
    console.log(socketUser.uid, data)
  }

  /**
   * Register new connection on all server events
   * @param socket Socket instance
   */
  private assignEventsOnNewConnection (socket: any) {
    this.events.forEach(eventName => {
      socket.on(eventName, this.handleReceive)
    })
  }
}
