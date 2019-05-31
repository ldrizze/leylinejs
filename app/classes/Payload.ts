import { User } from './User'

/**
 * Base class to compose user's payload
 * to be interpreted by system
 */
export abstract class Payload {

  /**
   * User instance from main user collections
   */
  public user: User

  /**
   * Compose payload based on user identification and the data received from driver
   * @param userIdentification User identification provided by driver
   * @param data Data received from respective driver
   */
  constructor (protected userIdentification: string, protected data: string) {}

  toString () {
    return this.data.toString()
  }

  toJson () {
    try {
      return JSON.parse(this.data)
    } catch (error) {
      console.error('error trying to parse json data', this.data)
      return this.data
    }
  }
}
