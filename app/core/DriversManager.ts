import { Driver, Payload, User } from '../classes'
import { UsersManager } from './UsersManager'

export class DriversManager {
  private static driver: Driver

  /**
   * Attach the main driver to communicate
   * @param driver Main driver
   */
  public static attachDriver (driverInstance: new (onConnectFn: Function, onReceiveFn: Function, onCloseFn: Function, events: []) => Driver) {
    this.driver = new driverInstance(this.onConnectFn, this.onReceiveFn, this.onCloseFn, [])
    this.driver.initialize()
  }

  /**
   * Start driver listening
   * @param listenPort Port to be listened
   */
  public static start (listenPort: string | undefined) {
    console.log('Starting the main driver')
    if (listenPort === undefined) {
      console.error('process.env.PORT wont be undefined')
    } else {
      console.log(`Listening on port: ${listenPort}`)
      this.driver.listen(listenPort)
    }
  }

  /**
   * Driver callback when new connection is established
   */
  private static onConnectFn () {
    return UsersManager.createUser().identification
  }

  /**
   * Driver callback when new event data is received
   * @param userIdentification User identification received from onConnectFn
   * @param event Event to trigger
   * @param data Payload data
   */
  private static onReceiveFn (userIdentification: string, event: string, data: string) {
    let user = UsersManager.getUser(userIdentification)

    if (user) { // Make payload
      let payload = new Payload(user, data)

      // TODO - TRIGGER EVENTS ON EVENT SYSTEM
      console.log('Received event: ', payload)

      // SEND EVENT PONG EVENT BACK
      payload.data = 'pong'
      this.driver.send(payload)
    }
  }

  /**
   * Driver callback when an active connection is closed
   * @param userIdentification User identification received from onConnectFn
   */
  private static onCloseFn (userIdentification: string) {
    return UsersManager.removeUser(userIdentification)
  }
}
