const apiKey = "3f250e6671872e4d7d4aa89b826d875d";
const cityId = 82; //Lisbon
const cuisineId = 83; //Seafood
const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`;
const restaurantContainer = document.getElementById("restaurants");
const priceLow = document.getElementById("lowPrice");
const priceMedium = document.getElementById("mediumPrice");
const priceHigh = document.getElementById("highPrice");
const buttonFilter = document.getElementById("filterButton");
const ratingButton = document.getElementById("rating-button");

const priceSymbol = cost => {
  if (cost <= 35) {
    return "€";
  } else if (cost >= 60) {
    return "€€€";
  } else {
    return "€€";
  }
};

//Choosing smiley from rating
const smileIcon = ratingScore => {
  if (ratingScore <= 0.9) {
    iconPath = "smileyicons/1.svg";
  } else if (ratingScore <= 1.9) {
    iconPath = "smileyicons/2.svg";
  } else if (ratingScore <= 2.9) {
    iconPath = "smileyicons/3.svg";
  } else if (ratingScore <= 3.9) {
    iconPath = "smileyicons/4.svg";
  } else if (ratingScore <= 5) {
    iconPath = "smileyicons/5.svg";
  } else {
    iconPath = "smileyicons/cool.svg";
  }
  return iconPath;
};

//Table booking or not
const bookTable = "<button class = 'booking-button'> Book Table </button>";
const noTableBooking = "No table reservation";

const tableBooking = booking => {
  if (booking === 1) {
    booking = bookTable;
  } else {
    booking = noTableBooking;
  }
  return booking;
};

fetch(url, {
  headers: {
    "user-key": apiKey
  }
})
  .then(response => {
    return response.json();
  })
  .then(json => {
    let filteredList = json.restaurants;

    //show restaurant function
    const showRestaurants = () => {
      restaurantContainer.innerHTML = " ";
      filteredList.forEach(resto => {
        restaurantContainer.innerHTML += `<a href= ${
          resto.restaurant.url
        } class="resturant-card"> 
          <img class="restaurant-image" src= ${
            resto.restaurant.photos[0].photo.thumb_url
          }>
        <h3>${resto.restaurant.name}</h3> 
        <div class="b-a-container">
        <p class="address">${resto.restaurant.location.address}</p>
        <button class="booking-button">Book</button>
        </div>
        <br>
        <p class="average-cost">${priceSymbol(
          resto.restaurant.average_cost_for_two
        )} <img class="smiley" src="${smileIcon(
          resto.restaurant.user_rating.aggregate_rating
        )}" alt="smiley">${resto.restaurant.user_rating.aggregate_rating}</p>
        <p class="table-booking"> ${tableBooking(
          resto.restaurant.has_table_booking
        )} </p>
        </a>`;
      });
    };

    //filters price
    const filterPrice = () => {
      if (priceLow.checked) {
        filteredList = json.restaurants.filter(
          item => item.restaurant.average_cost_for_two <= 35
        );
      } else if (priceMedium.checked) {
        filteredList = json.restaurants.filter(
          item =>
            item.restaurant.average_cost_for_two > 35 &&
            item.restaurant.average_cost_for_two < 60
        );
      } else if (priceHigh.checked) {
        filteredList = json.restaurants.filter(
          item => item.restaurant.average_cost_for_two >= 60
        );
      }
      showRestaurants();
    };

    //sort by aggregated rating
    const sortByRating = () => {
      filteredList.sort(
        (a, b) =>
          b.restaurant.user_rating.aggregate_rating -
          a.restaurant.user_rating.aggregate_rating
      );
      showRestaurants();
    };

    buttonFilter.addEventListener("click", filterPrice);
    ratingButton.addEventListener("click", sortByRating);

    showRestaurants();
  });
