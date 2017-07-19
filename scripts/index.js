import Trie from './Trie'

const userInput = document.querySelector('.input-field')
const searchBtn = document.querySelector('.search-btn')


userInput.addEventListener('input', filterThroughList)
searchBtn.addEventListener('click', appendList)

function filterThroughList () {
  console.log('working')
}

function appendList () {
  console.log('clicked')
}
