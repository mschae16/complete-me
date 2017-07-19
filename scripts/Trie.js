import Node from './Node'

export default class Trie {
  constructor () {
    this.root = null
    this.wordCount = 0
  }

  insert(word) {
    const node = new Node()

    if (!this.root) {
      this.root = node
    }

    let letters = [...word.toLowerCase()]
    let currentNode = this.root

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter)
      }
      currentNode = currentNode.children[letter]
    })

    if (!currentNode.isWord) {
      currentNode.isWord = true
      this.wordCount++
    }
  }

  count () {
    return this.wordCount
  }

  suggest (data) {
    let letters = [...data.toLowerCase()]
    let currentNode = this.root
    let suggestions = []

    letters.forEach(letter => {
      currentNode = currentNode.children[letter]
    })

    const traverseTrie = (data, currentNode) => {
      let keys = Object.keys(currentNode.children)

      for(let i = 0; i < keys.length; i++) {
        const child = currentNode.children[keys[i]]
        let newString = data + child.letter

        if (child.isWord) {
          suggestions.push({word: newString,
                            frequency: child.frequency,
                            lastSelected: child.lastSelected})
        }
        traverseTrie(newString, child)
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestions.push({word: data,
                        frequency: currentNode.frequency,
                        lastSelected: currentNode.lastSelected})
    }

    if(currentNode) {
      traverseTrie(data, currentNode)
    }

    console.log('suggestions before sort', suggestions)

    suggestions.sort((a, b) => {
      return b.frequency - a.frequency || b.lastSelected - a.lastSelected
    })

    console.log('suggestions after sort', suggestions)

    return suggestions.map(object => {
      return object.word
    })
  }

  select(word) {
    let wordsArray = [...word]
    let currentNode = this.root

    wordsArray.forEach(letter => {
      currentNode = currentNode.children[letter]
    })
    currentNode.frequency++
    currentNode.lastSelected = new Date()
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word)
    })
  }


}
