function changeCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector(" #search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCityName);
