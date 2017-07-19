import Trie from './Trie'
import words from './words'

const completeMe = new Trie()

$(document).ready(populateDictionary)

$('.input-field').on('input', filterList)

$('.search-btn').on('click', appendList)


function populateDictionary () {
  completeMe.populate(words)
}

function filterList () {
  
}

function appendList () {
  console.log('clicked')
}
