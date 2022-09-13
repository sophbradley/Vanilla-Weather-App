function formattedDate(timestamp) {
  let dateTime = new Date(timestamp);
  let hours = dateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateTime.getMinutes();
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

  let date = dateTime.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[dateTime.getMonth()];

  let day = days[dateTime.getDay()];
  return `${day} ${date} ${month} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperature = response.data.main.temp;
  let currentTemperature = document.querySelector("#current-temp");
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  let clouds = response.data.clouds.all;
  let currentCloudCover = document.querySelector("#cloudiness");
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#wind-speed");
  let cityName = response.data.name;
  let currentCity = document.querySelector("#city");

  celsiusTemp = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  currentTemperature.innerHTML = Math.round(temperature);
  currentDescription.innerHTML = `${description}`;
  currentHumidity.innerHTML = Math.round(humidity);
  currentCloudCover.innerHTML = Math.round(clouds);
  currentWindSpeed.innerHTML = Math.round(windSpeed);
  currentCity.innerHTML = cityName;

  let timeUpdated = document.querySelector("#last-update");
  timeUpdated.innerHTML = formattedDate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "b54ec3dabea4bd11fa9edcf4789c4202";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 31;
  let tempElement = document.querySelector("#current-temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function forecastData() {
  let forecastDataElement = document.querySelector("#forecast-data");
  let forecastHTML = `<div class="row justify-content-center forecast-data">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 "><span class="forecast-day">${day}</span>
  <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt=""/>
  <span class="forecast-max">19°</span>|<span class="forecast-min">14°</span>
</div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastDataElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("London");
forecastData();
