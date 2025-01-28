function getWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity-data");
  let speedElement = document.querySelector("#speed-data");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-app-icon");

  city.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = ` ${response.data.temperature.humidity}% `;
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url} "
      class="weather-app-icon"
    />`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  return ` ${day} ${hours}:${minutes}`;
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

function getForecast(city) {
  let apiKey2 = "dfc8b6f54adt4d38bbe0o47364a63d82";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey2}units=metric`;
  axios.get(apiUrl2).then(displayForecast);
}
function displayForecast(response) {
  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";

  forecastDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌤️</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>30° </strong>
      </div>
      <div class="weather-forecast-temperature">17°</div>
    </div>
  </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCityName);
searchCity("Cape Town");
getForecast("Cape Town");
displayForecast();
