// search box value
// append api information to table

const select = id => document.getElementById(id)
const createEl = el => document.createElement(el)
const setEl = (el, text) => {
  const element = document.createElement(el)
  element.innerHTML = text
  return element
}

const tableEntry = response => {
  const row = createEl('tr')
  const venue = setEl('td', 'The Beachland Ballroom')
  const city = setEl('td', 'Cleveland')
  const price = setEl('td', '$100')
  row.append(venue, city, price)
  select('tbody').append(row)
}

const videoData = response => {
  const video = createEl('video')
  video.setAttribute('src', response.data.url)
}

tableEntry()
