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
      // console.log(JSON.stringify(this.root, null, 4))
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
    // currentNode now refers to the last letter in our word
    const traverseTrie = (data, currentNode) => {
      let keys = Object.keys(currentNode.children)

      for(let i = 0; i < keys.length; i++) {
        const child = currentNode.children[keys[i]]
        let newString = data + child.letter

        if (child.isWord) {
          suggestions.push(newString)
        }
        traverseTrie(newString, child)
      }
    }
    if (currentNode && currentNode.isWord) {
      suggestions.push(data)
    }
    if(currentNode) {
      traverseTrie(data, currentNode)
    }
    return suggestions
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word)
    })
  }


}
