let comedianName = document.getElementById(whateveridwedecidetouse)
let postalCode = document.getElementById(whateveridwedecidetouse)


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
