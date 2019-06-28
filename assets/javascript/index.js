// const youtubeApi = 'AIzaSyDdO6zQx64o6U30fQa4U_RDaRaepGAY - Uk'
// const ticketMasterAPI = '0Dxr1ahmvB1MnD2htrHAWLPBmNAXIbmc'
let latLong = ''
let sort = 'distance'
const format = dateFns.format
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

// Used to empty the table before a new search
const empty = element => {
  const el = select(element)
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

// Uses html geolocation to filter search results based on closest
const geoLocate = () => {
  if (window.navigator && window.navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onGeolocateSuccess,
      onGeolocateError
    )
  }
}

const onGeolocateSuccess = coordinates => {
  latLong = coordinates.coords.latitude + ',' + coordinates.coords.longitude
  sort = 'distance'
}

const onGeolocateError = error => {
  sort = 'date'
  console.warn(error.code, error.message)
  if (error.code === 1) {
    // they said no
  } else if (error.code === 2) {
    // position unavailable
  } else if (error.code === 3) {
    // timeout
  }
}

// Gathers price range from API call if there is one else returns not available
// Also links to page to purchase tickets
const priceRange = (response, i) => {
  if (response._embedded.events[i].priceRanges) {
    const prices = createEl('td')
    const priceLink = createEl('a')
    priceLink.setAttribute('href', response._embedded.events[i].url)
    priceLink.setAttribute('target', 'blank')
    priceLink.innerHTML =
      '$' +
      response._embedded.events[i].priceRanges[0].min +
      ' - ' +
      '$' +
      response._embedded.events[i].priceRanges[0].max
    prices.append(priceLink)
    return prices
  } else {
    const prices = createEl('td')
    const priceLink = createEl('a')
    priceLink.setAttribute('href', response._embedded.events[i].url)
    priceLink.setAttribute('target', 'blank')
    priceLink.innerHTML = 'Price Unavailable'
    prices.append(priceLink)
    return prices
  }
}

// Appends all the created elements to the row and inserts into table
const tableEntry = (response, i) => {
  const row = createEl('tr')
  const venue = setEl(
    'td',
    response._embedded.events[i]._embedded.venues[0].name
  )
  const city = setEl(
    'td',
    response._embedded.events[i]._embedded.venues[0].city.name
  )
  const date = setEl(
    'td',
    format(response._embedded.events[i].dates.start.localDate, 'MMMM, Do YYYY')
  )
  const time = setEl(
    'td',
    format(response._embedded.events[i].dates.start.dateTime, 'h:mm aa')
  )
  const price = priceRange(response, i)
  row.append(venue, city, date, time, price)
  select('tbody').append(row)
}

// Ajax request and for loop to append data to the table
const ticketRequest = () => {
  const comedianName = select('searchComedian').value
  const querylUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${comedianName}&latlong=${latLong}&classificationName=comedy&size=10&sort=${sort},asc&apikey=0Dxr1ahmvB1MnD2htrHAWLPBmNAXIbmc`
  $.ajax({
    type: 'GET',
    url: querylUrl
  }).then(function (response) {
    console.log(response._embedded.events[0].name)
    if (response.page.totalElements === 0) {
      const na = setEl('td', 'Nothing Available')
      select('tbody').append(na)
    } else {
      for (let i = 0; i < response._embedded.events.length; i++) {
        // console.log(response._embedded.events[i].dates.start)
        tableEntry(response, i)
      }
      select('form').reset()
    }
  })
}

// Listens on form for submit runs ajax request and empties any data out of the table
select('form').addEventListener('submit', function (event) {
  event.preventDefault()
  empty('tbody')
  ticketRequest()
})

geoLocate()

// const videoAppend = () => {
//   const vid = createEl('video-js')
//   vid.setAttribute('src', 'https://youtu.be/C0DPdy98e4c')
//   select('video').append(vid)
// }
// videoAppend()
// console.log(response._embedded.events[i]._embedded.venues[0].name)
// console.log(response._embedded.events[i]._embedded.venues[0].city.name)
// console.log(response._embedded.events[i].dates.start.localDate)
// console.log(response._embedded.events[i].dates.start.localTime)
// console.log(response._embedded.events[i].priceRanges[0].min)
// console.log(response._embedded.events[i].priceRanges[0].max)

// const setAttr = (response, i) => {
//   const btn = createEl('td')
//   const btn1 = createEl('a')
//   btn1.setAttribute('href', response[i].url)
//   btn.append(btn1)
// }
