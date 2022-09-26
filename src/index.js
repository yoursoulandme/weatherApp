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

///Geolocation
function displayWeatherCond(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let cityElement = document.querySelector("#city");
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  CelsiusTemp = Math.round(response.data.main.temp);
}
////API connect
function searchCity(cityName) {
  if (cityName.preventDefault) {
    cityName.preventDefault();
  }
  let city = document.querySelector("#city-input").value;
  let apiKey = "1a1c6a43fe9af535f0dca97c61c7d6a7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(displayWeatherCond);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  searchCity(cityName);
}
// C to F
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("acive");
  fahrenheitLink.classList.add("active");
  let FahrenheitTemp = (CelsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(FahrenheitTemp);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("acive");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(CelsiusTemp);
}
let CelsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let iconElement = document.querySelector("#icon");
////API Connect
function retrievePosition(position) {
  let apiKey = "1a1c6a43fe9af535f0dca97c61c7d6a7";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(displayWeatherCond);
}

function getCurrentLocation(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let searchFormat = document.querySelector("#search-form");
searchFormat.addEventListener("submit", handleSubmit);

let buttonCurrentLocation = document.querySelector("#button-location");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

searchCity("New York");
