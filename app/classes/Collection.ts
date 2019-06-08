export class Collection<T> {

  protected list: Array<any>

  constructor (protected key: string) {
    this.list = new Array<any>()
  }

  /**
   * Add an item to the internal list
   * @param item Item to be added to internal list
   */
  public add (item: T): Collection<T> {
    this.list.push(item)
    return this
  }

  /**
   * Remove an item from the internal list
   * @param key Key to remove an item from internal list
   */
  public remove (key: string): boolean {
    let i = -1
    this.list.forEach((item, index) => {
      if (item[this.key] === key) i = index
    })

    if (i !== -1) {
      this.list.splice(i, 1)
      return true
    }

    return false
  }

  /**
   * Search and return an item from the internal list
   * @param key Key to compare
   */
  public find (key: string): T | null {
    for (let i in this.list) {
      if (this.list[i][this.key] === key) return this.list[i]
    }

    return null
  }

  /**
   * Return true if the item with respective given key was found
   * @param key Key to compare
   */
  public exists (key: string): boolean {
    return this.find(key) !== null
  }

}
