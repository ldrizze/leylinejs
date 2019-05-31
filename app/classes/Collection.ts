export class Collection<T> {

  public list: []

  constructor (protected key: string) {
    this.list = []
  }

  public remove (key: string): boolean {
    let i = -1
    this.list.forEach((item, index) => {
      if (item[this.key] === key) i = index
    })

    if (i !== -1) {
      this.list.splice(i, 1)
    }

    return false
  }

  public find (key: string): T {
    for (let i in this.list) {
      if (this.list[i][this.key] === key) return this.list[i]
    }

    return null
  }

  public exists (key: string): boolean {
    return this.find(key) !== null
  }

}
