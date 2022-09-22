function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return ` ${day}, ${month} ${date} - ${hour}:${minute}`;
}
///Current Time
let nowElement = document.querySelector("#now");
let currentTime = new Date();
nowElement.innerHTML = formatDate(currentTime);

/// C to F
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "..";
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "..";
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
let iconElement = document.querySelector("#icon");
///Geolocation
function displayWeatherCond(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchTab(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  let city = document.querySelector("#city-input").value;
  let apiKey = "1a1c6a43fe9af535f0dca97c61c7d6a7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCond);
}

function retrievePosition(position) {
  let apiKey = "1a1c6a43fe9af535f0dca97c61c7d6a7";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCond);
}

function getCurrentLocation(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let searchFormat = document.querySelector("#search-form");
searchFormat.addEventListener("submit", searchTab);

let buttonCurrentLocation = document.querySelector("#button-location");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);
