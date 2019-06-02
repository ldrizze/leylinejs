import { User } from './User'

/**
 * Base class to compose user's payload
 * to be interpreted by system
 */
export class Payload {

  /**
   * Compose payload based on user identification and the data received from driver
   * @param user User instance from main user collections
   * @param data Data received from respective driver
   */
  constructor (protected _user: User, public data: string) {}

  get user () {
    return this._user
  }

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
