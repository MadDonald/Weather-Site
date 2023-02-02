var apiKey = "4124af60ae75a9ff36da60e4a5442d55";
//lets us add data to the html file areas
var weatherContainer = document.querySelector(".weather-container");
var cityInput = document.querySelector("#city-input");
var cityName = document.querySelector("#city-name");
var weatherIcon = document.querySelector("#weather-icon");
var temperature = document.querySelector("#temperature");
var weatherDescription = document.querySelector("#weather-description");
var forecast = document.querySelector("#forecast");
var sidebar = document.querySelector(".sidebar");

weatherContainer.addEventListener("submit", function(event) {
  event.preventDefault();
  getWeather(cityInput.value);
});

//The function to retrieve weather information
async function getWeather(city) {
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  var response = await fetch(url);
  var data = await response.json();
  saveSearch(city);
  displayWeather(data);
}

//Functiin for the 5 day forcast
function displayWeather(data) {
  cityName.textContent = data.city.name;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", data.list[0].weather[0].description);
  temperature.textContent = `Temperature: ${data.list[0].main.temp}°C`;
  weatherDescription.textContent = data.list[0].weather[0].description;
  forecast.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    forecast.innerHTML += `
      <div class="forecast">
        <p>${data.list[i * 8].dt_txt.slice(0, 10)}</p>
        <img src="http://openweathermap.org/img/wn/${
          data.list[i * 8].weather[0].icon
        }@2x.png" alt="${data.list[i * 8].weather[0].description}">
        <p>${data.list[i * 8].main.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.list[i].main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.list[i].wind.speed}m/s</p>
        <p><strong>Description:</strong> ${data.list[i].weather[0].description}</p>
      </div>
    `;
  }
}

function saveSearch(city) {
  let searches;
  if (localStorage.getItem("searches") === null) {
    searches = [];
  } else {
    searches = JSON.parse(localStorage.getItem("searches"));
  }
  searches.unshift(city);
  localStorage.setItem("searches", JSON.stringify(searches));
  displaySearches();
}

function displaySearches() {
  sidebar.innerHTML = "";
  let pastSearches = [];
  if (localStorage.getItem("searches") !== null) {
    pastSearches = JSON.parse(
      localStorage.getItem("searches")
    );
  }
  pastSearches.forEach(search => {
    sidebar.innerHTML += `
      <p class="search" onClick="getWeather('${search}')">${search}</p>
    `;
  });
}

displaySearches();
Footer