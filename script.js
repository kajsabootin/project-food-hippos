const apiKey = "3f250e6671872e4d7d4aa89b826d875d"
const cityId = 82 //Lisbon
const cuisineId = 83 //Seafood
const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`
const restaurantContainer = document.getElementById("restaurants")
const priceLow = document.getElementById("lowPrice")
const priceMedium = document.getElementById("mediumPrice")
const priceHigh = document.getElementById("highPrice")
const buttonFilter = document.getElementById("filterButton")

const priceSymbol = (cost) => {
  if (cost <= 35) {
    return "€"
  } else if (cost >= 60) {
    return "€€€"
  } else {
    return "€€"
  }
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
    let filteredList = json.restaurants

    const showRestaurants = () => {
      restaurantContainer.innerHTML = " "
      filteredList.forEach(resto => {
        restaurantContainer.innerHTML +=
          `<a href= ${resto.restaurant.url} class="resturant-card"> 
        <h3>${resto.restaurant.name}</h3> 
        <p class="address">${resto.restaurant.location.address}</p>
        <p class="average-cost">${priceSymbol(resto.restaurant.average_cost_for_two)}</p>
        <p class="rating">${resto.restaurant.user_rating.aggregate_rating}</p>
        <img class="restaurant-image" src= ${resto.restaurant.photos[0].photo.thumb_url}>
        </a>`

      })
    }

    const filterPrice = () => {
      if (priceLow.checked) {
        filteredList = json.restaurants.filter(item => item.restaurant.average_cost_for_two <= 35)
      } else if (priceMedium.checked) {
        filteredList = json.restaurants.filter(item => item.restaurant.average_cost_for_two > 35 && item.restaurant.average_cost_for_two < 60)
      } else if (priceHigh.checked) {
        filteredList = json.restaurants.filter(item => item.restaurant.average_cost_for_two >= 60)
      }
      showRestaurants()
    }

    buttonFilter.addEventListener("click", filterPrice)

    showRestaurants()
  })
  .catch((err) => {
    console.log(err)
  })
