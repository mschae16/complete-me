export default class Node {
  constructor (letter = null) {
    this.letter = letter
    this.isWord = false
    this.children = {}
    this.frequency = 0
    this.lastSelected = new Date(1986, 1, 1)
  }
}
