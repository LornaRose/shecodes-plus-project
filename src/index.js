let now = new Date();
let minutes = now.getMinutes();
let hours = now.getHours();
let date = now.getDate();
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
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let h5 = document.querySelector(".datestamp");
h5.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;

let apiKey = "2b6fdad0cbd018949c50c70f72250726";

function displayWeather(response) {
  let locationDiv = document.querySelector("#location");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let cityInput = document.querySelector("#city");
  let city = cityInput.value;

  locationDiv.textContent = city;

  locationDiv.innerHTML = `It is ${temperature} degrees in ${city}`;
  console.log(locationDiv.innerHTML);
}

function getWeatherByCity(city) {
  if (!city) {
    let cityInput = document.querySelector("#city");
    city = cityInput.value;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let reverseGeocodeApiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

        axios.get(reverseGeocodeApiUrl).then(function (response) {
          let city = response.data[0].name;

          getWeatherByCity(city);
        });
      },
      function (error) {
        console.log(error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function getWeather(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city");
  let city = cityInput.value;

  getWeatherByCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", getWeather);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);
