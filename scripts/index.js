import Trie from './Trie'
import words from './words'

const completeMe = new Trie()

$(document).ready(populateDictionary)

$('.input-field').on('input', manageListSection)

$('.list-items').on('click', '.word-item', starSelect)

function populateDictionary () {
  completeMe.populate(words)
}

function manageListSection () {
  if ($('.input-field').val() === '') {
    $('.word-item').remove()
  } else {
    filterList()
  }
}

function filterList () {
  let input = $('.input-field').val()
  let suggestions = (completeMe.suggest(input))

  $('.word-item').remove()

  for (let i = 0; i < 20; i++) {
    if (suggestions[i] !== undefined) {
      $('.list-items').append(`<button class="word-item">${suggestions[i]}</button>`)
    }
  }
}

function starSelect (e) {

  let selected = e.target.innerHTML
  completeMe.select(selected)
  console.log(selected)
  filterList()
}
