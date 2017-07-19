import Trie from './Trie'
import words from './words'

const completeMe = new Trie()

$(document).ready(populateDictionary)

$('.input-field').on('input', filterThroughList)

$('.search-btn').on('click', appendList)


function populateDictionary () {
  completeMe.populate(words)
}

function filterThroughList () {
  
  let suggestionsArray = completeMe.suggest(userInput.value)


}

function appendList () {
  console.log('clicked')
}

console.log(words[455])
