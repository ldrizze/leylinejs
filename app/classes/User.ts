export abstract class User {

  protected _identification: string

  get identification (): string {
    return this._identification
  }
}
