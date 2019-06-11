import { Payload } from './Payload'
import { User } from './User'

export abstract class Driver {
  constructor (protected events: []) {}
  public abstract initialize (): void
  public abstract listen (port: string): void
  public abstract send (payload: Payload): void
  public abstract close (user: User): void
}
