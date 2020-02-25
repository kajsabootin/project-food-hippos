const apiKey = "3f250e6671872e4d7d4aa89b826d875d"
const cityId = 82 //Lisbon
const cuisineId = 83 //Seafood
const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`
const restaurantContainer = document.getElementById("restaurants")
const ratingButton = document.getElementById("rating-button")


//Choosing smiley from rating
const smileIcon = (ratingScore) => {
  if (ratingScore <= 0.9) {
    iconPath = "smileyicons/1.svg"
  } else if (ratingScore <= 1.9) {
    iconPath = "smileyicons/2.svg"
  } else if (ratingScore <= 2.9) {
    iconPath = "smileyicons/3.svg"
  } else if (ratingScore <= 3.9) {
    iconPath = "smileyicons/4.svg"
  } else if (ratingScore <= 5) {
    iconPath = "smileyicons/5.svg"
  } else {
    iconPath = "smileyicons/cool.svg"
  }
  return iconPath
}

//Table booking or not
const bookTable = "<button class = 'booking-button'> Book Table </button>"
const noTableBooking = "No table reservation"

const tableBooking = (booking) => {
  if (booking === 1) {
    booking = bookTable
  } else {
    booking = noTableBooking
  }
  return booking
}

fetch(url, {
    headers: {
      "user-key": apiKey
    }
  })
  .then(response => {
    return response.json()
  })
  .then(json => {

    const sortByRating = () => {
      //sort by aggregated rating
      json.restaurants.sort((a, b) => b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating)
      console.log(json.restaurants)
    }

    ratingButton.addEventListener("click", sortByRating)
    // ratingButton.onclick = sortByRating()



    json.restaurants.forEach(resto => {

      restaurantContainer.innerHTML +=
        `<a href= ${resto.restaurant.url} class="resturant-card"> 
      <h3>${resto.restaurant.name}</h3> 
      <p class="address">${resto.restaurant.location.address}</p>
      <p class="average-cost">${resto.restaurant.average_cost_for_two}</p>
      <p class="rating"><img class="smiley" src="${smileIcon(resto.restaurant.user_rating.aggregate_rating)}" alt="smiley">${resto.restaurant.user_rating.aggregate_rating}</p>
      <p class="table-booking"> ${tableBooking(resto.restaurant.has_table_booking)} </p>
      <img class="restaurant-image" src= ${resto.restaurant.photos[0].photo.thumb_url}>
      </a>`

    })
  })
  .catch((err) => {
    console.log(err)
  })