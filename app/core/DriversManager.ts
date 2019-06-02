import { Driver, Payload, User } from '../classes'
import { UsersManager } from './UsersManager'

export class DriversManager {
  private static driver: Driver

  /**
   * Attach the main driver to communicate
   * @param driver Main driver
   */
  public static attachDriver (driverInstance: any) {
    let driver = new driverInstance(this.onConnectFn, this.onReceiveFn, this.onCloseFn) as Driver
  }

  /**
   * Driver callback when new connection is established
   */
  public static onConnectFn () {
    return UsersManager.createUser().identification
  }

  /**
   * Driver callback when new event data is received
   * @param userIdentification User identification received from onConnectFn
   * @param event Event to trigger
   * @param data Payload data
   */
  public static onReceiveFn (userIdentification: string, event: string, data: string) {
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
  public static onCloseFn (userIdentification: string) {
    return UsersManager.removeUser(userIdentification)
  }
}
