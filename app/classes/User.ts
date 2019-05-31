export abstract class User {

  constructor (protected _identification: string) {}

  get identification (): string {
    return this._identification
  }
}
