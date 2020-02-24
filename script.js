const apiKey = "3f250e6671872e4d7d4aa89b826d875d"
const cityId = 82 //Lisbon
const cuisineId = 83 //Seafood
const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`
const restaurantContainer = document.getElementById("restaurants")

fetch(url, { headers: { "user-key": apiKey } }
)
  .then(response => {
    return response.json()
  })
  .then(json => {
    json.restaurants.forEach(resto => {
      console.log(resto.restaurant.name)
      restaurantContainer.innerHTML +=
        `<a href= ${resto.restaurant.url} class="resturant-card"> 
      <h3>${resto.restaurant.name}</h3> 
      <p class="address">${resto.restaurant.location.address}</p>
      <p class="average-cost">${resto.restaurant.average_cost_for_two}</p>
      <p class="rating">${resto.restaurant.user_rating.aggregate_rating}</p>
      <img class="restaurant-image" src= ${resto.restaurant.photos[0].photo.thumb_url}>
      </a>`
    })
  })
  .catch((err) => {
    console.log(err)
  })


