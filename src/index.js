function getWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city");

  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "dfc8b6f54adt4d38bbe0o47364a63d82";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function changeCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector(" #search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCityName);

searchCity("Cape Town");
