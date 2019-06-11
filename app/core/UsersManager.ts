import { Collection, User } from '../classes'
import * as uuid from 'uuid'

export class UsersManager {

  /**
   * List of active users on server
   */
  private static users: Collection<User> = new Collection<User>('identification')

  /**
   * Create new User
   */
  public static createUser () {
    const user = new User(uuid())
    this.users.add(user)
    return user
  }

  /**
   * Remove user from active users list
   * @param identification User identification
   */
  public static removeUser (identification: string) {
    return this.users.remove(identification)
  }

  /**
   * Get an user from active users list
   * @param identification User identification
   */
  public static getUser (identification: string): User | null {
    return this.users.find(identification)
  }
}
