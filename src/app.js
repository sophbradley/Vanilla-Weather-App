function formattedDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperature = response.data.main.temp;
  let currentTemperature = document.querySelector("#current-temp");
  let clouds = response.data.clouds.all;
  let currentCloudCover = document.querySelector("#cloudiness");
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#wind-speed");

  currentTemperature.innerHTML = Math.round(temperature);
  currentHumidity.innerHTML = Math.round(humidity);
  currentCloudCover.innerHTML = Math.round(clouds);
  currentWindSpeed.innerHTML = Math.round(windSpeed);

  let timeUpdated = document.querySelector("#last-update");
  timeUpdated.innerHTML = formattedDate(response.data.dt * 1000);
}

let apiKey = "b54ec3dabea4bd11fa9edcf4789c4202";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
