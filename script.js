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
        `<section> 
      <p>${resto.restaurant.name}</p> 
      <p>${resto.restaurant.location.address}</p>
      <p>${resto.restaurant.average_cost_for_two}</p>
      <p>${resto.restaurant.user_rating.rating_text}</p>
      <img src= ${ resto.restaurant.photos[0].photo.thumb_url}>
      </section>`
    })
  })
  .catch((err) => {
    console.log(err)
  })


