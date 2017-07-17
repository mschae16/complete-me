import { expect } from 'chai'
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'

describe('Trie functionality', () => {

  describe('insert', () => {
    let completeMe

    beforeEach(function () {
      completeMe = new Trie()
    })

    it('should have a root', () => {
      expect(completeMe.root).to.equal(null)
    })

    it('should be able to insert a word', () => {
      completeMe.insert('apple')

      expect(completeMe.root).to.be.instanceOf(Node)
    })

    it('should be able to insert a word and root should have children', () => {
      completeMe.insert('apple')

      expect(completeMe.root.children.a.letter).to.equal('a')
      expect(completeMe.root.children.a.children.p.letter).to.equal('p')
    })

    it('should be able to insert a word and the last letter should have an isWord property of true', () => {
      completeMe.insert('apple')

      expect(
        completeMe.root.children
        .a.children
        .p.children
        .p.children
        .l.children
        .e.letter
      ).to.equal('e')

      expect(
        completeMe.root.children
        .a.children
        .p.children
        .p.children
        .l.children
        .e.isWord
      ).to.equal(true)
    })

    it('should be able to insert multiple words and children objects should have multiple properties', () => {
      completeMe.insert('apple')
      completeMe.insert('ape')

      let childKeys = Object.keys(
        completeMe.root
        .children.a
        .children.p
        .children
      )

      expect(childKeys).to.deep.equal(['p', 'e'])
    })

    it('should have nodes which represent incomplete words where the isWord prop is false', () => {
      completeMe.insert('apple')

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .isWord
      ).to.equal(false)
    })

  })

  describe('count', () => {
    let completeMe = new Trie()

    it('should return number of words inserted', () => {
      expect(completeMe.count()).to.equal(0)
      completeMe.insert('ape')
      expect()
    })

    it('should return number of words inserted', () => {
      expect(completeMe.count()).to.equal(0)

      completeMe.insert('ape')
      expect(completeMe.count()).to.equal(1)

      completeMe.insert('ape')
      expect(completeMe.count()).to.equal(1)
    })
  })

  describe('suggest', () => {
    let completeMe

    beforeEach(function () {
      completeMe = new Trie()
    })
    it('should return all children words of suggestion', () => {
      completeMe.insert('apple')
      completeMe.insert('applesauce')
      completeMe.insert('apply')
      completeMe.insert('apt')
      completeMe.insert('cat')

      let suggestions = completeMe.suggest('app')

      expect(suggestions).to.deep.equal([ 'apple', 'applesauce', 'apply' ])
    })
  })

  describe('select', () => {
    let completeMe

    beforeEach(function () {
      completeMe = new Trie()
    })

    it('should be able to select order of words returned by suggest', () => {
      completeMe.insert('app')
      completeMe.insert('apple')
      completeMe.insert('applesauce')
      completeMe.insert('apply')

      let suggestions = completeMe.suggest('app')

      expect(suggestions).to.deep.equal([ 'apple', 'applesauce', 'apply' ])

      completeMe.select('apply')

      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])
    })
  })

})
