// search box value
// append api information to table
const youtubeApi = 'AIzaSyDdO6zQx64o6U30fQa4U_RDaRaepGAY - Uk'
// const player = videojs('vid1', {})
const select = id => document.getElementById(id)

// Whatever type of html element needs to be created in the ("")
const createEl = el => document.createElement(el)

// creates element and sets text to whatever value is passed
const setEl = (el, text) => {
  const element = createEl(el)
  element.innerHTML = text
  return element
}

// appends all the created elements to the row and inserts into table
const tableEntry = (response, i) => {
  const row = createEl('tr')
  const venue = setEl('td', response[i].venue.name)
  const city = setEl('td', response[i].venue.city)
  const price = setAttr(response, i)
  row.append(venue, city, price)
  select('tbody').append(row)
  console.log(setAttr)
}

const setAttr = (response, i) => {
  const btn = createEl('td')
  const btn1 = createEl('a')
  btn1.setAttribute('href', response[i].url)
  btn.append(btn1)
}

const ticketRequest = () => {
  const comedianName = select('searchComedian').value
  const postalCode = select('zipCode').value
  const querylUrl =
    'https://rest.bandsintown.com/artists/' +
    comedianName +
    '/events' +
    '?app_id=codingbootcamp'
  // `https://app.ticketmaster.com/discovery/v1/events.json?keyword=${comedianName}&apikey=0Dxr1ahmvB1MnD2htrHAWLPBmNAXIbmc`
  // 'https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vA71.json?countryCode=US&keyword=' +
  // comedianName +
  // 'classificationName=comedy&postalCode=' +
  // postalCode +
  // 'apikey=0Dxr1ahmvB1MnD2htrHAWLPBmNAXIbmc'
  console.log(comedianName)
  $.ajax({
    type: 'GET',
    url: querylUrl
  }).then(function (response) {
    for (let i = 0; i < 10; i++) {
      tableEntry(response, i)
    }
    console.log(response)
  })
}

// function displayComedianInfo (comedian) {
//  var queryURL = 'https://rest.bandsintown.com/artists/' + comedian + '?app_id=codingbootcamp'
//  $.ajax({
//    url: queryURL,
//    method: 'GET'

// const ticketRequest = $.ajax({
//   type: 'GET',
//   url: querylUrl,
//   async: true,
//   dataType: 'json',
//   success: function (json) {
//     console.log(json)
//     // Parse the response.
//     // Do other things.
//   },
//   error: function (xhr, status, err) {
//     // This time, we do not end up here!
//   }
// })

select('form').addEventListener('submit', function (event) {
  event.preventDefault()
  ticketRequest()
  // console.log(comedianName, postalCode)
  select('form').reset()
})
