// search box value
// append api information to table
let comedianName = document.getElementById(whateveridwedecidetouse)
let postalCode = document.getElementById(whateveridwedecidetouse)

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


var querylUrl = "https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vA71.json?countryCode=US&keyword=" + comedianName + 
"classificationName=comedy&postalCode=" + postalCode + "apikey={0Dxr1ahmvB1MnD2htrHAWLPBmNAXIbmc}"

$.ajax({
  type: 'GET',
  url: querylUrl
  async: true,
  dataType: 'json',
  success: function (json) {
    console.log(json)
    // Parse the response.
    // Do other things.
  },
  error: function (xhr, status, err) {
    // This time, we do not end up here!
  }
})
