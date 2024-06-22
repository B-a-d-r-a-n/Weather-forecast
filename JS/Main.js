var currWeather = document.querySelector(".curr-weather");
var forecastTomWeather = document.querySelector(".tom-weather");
var forecastDaTomWeather = document.querySelector(".daTom-weather");
var weatherSearchInp = document.getElementById("weatherSearchInp");
var searchBtn = document.getElementById("searchBtn");
var searchAlert = document.querySelector(".alert.text-center");
var home = "cairo";

(function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      geolocationSuccess,
      geolocationError
    );
  } else {
    weatherSearch(home);
    console.log("Geolocation is not available in this browser.");
  }
})();

async function geolocationSuccess(position) {
  try {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    url = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    var x = await url.json();
    home = x.address.city;
    weatherSearch(home);
  } catch (error) {
    console.log(error);
  }
}

function geolocationError(error) {
  weatherSearch(home);
  console.error("Error getting geolocation:", error);
}

async function weatherSearch(city) {
  try {
    var url = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=172969c504fe48edafd32910242106&q=${city}`
    );
    var x = await url.json();
    var searchResult = x[0] ? x[0].name : home;

    if (x.length == 0) {
      searchAlert.classList.remove("opacity-0");
    } else {
      searchAlert.classList.add("opacity-0");
      weather(searchResult);
    }
  } catch (error) {
    console.log(error);
  }
}

async function weather(city) {
  try {
    var url = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=172969c504fe48edafd32910242106&q=${city}&days=3`
    );
    var x = await url.json();
    displayCurr(x);
  } catch (error) {
    console.log(error);
  }
}

weatherSearchInp.addEventListener("keyup", function (e) {
  var x = e.target.value;
  if (x.length >= 3) {
    weatherSearch(x);
  } else weatherSearch(home);
});
searchBtn.addEventListener("click", function (e) {
  var x = weatherSearchInp.value;
  if (x.length >= 3) {
    weatherSearch(x);
  } else weatherSearch(home);
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
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

// console.log(
//   days[now.getDay()] +
//     " " +
//     months[now.getMonth()] +
//     " " +
//     now.getDate() +
//     " " +
//     now.getFullYear()
// ); //Tuesday February 12 2013

function displayCurr(x) {
  var now = new Date(`${x.forecast.forecastday[0].date}`);
  tom = new Date(`${x.forecast.forecastday[1].date}`);
  datom = new Date(`${x.forecast.forecastday[2].date}`);
  currWeather.innerHTML = `              <div
                class="card-header rounded-start-3 rounded-bottom-0 rounded-end-0 curr-weather-header d-flex justify-content-between"
              >
                <span>${days[now.getDay()]}</span>
                <span>${
                  `${now.getDate()} ` + ` ${months[now.getMonth()]}`
                }</span>
              </div>
              <div class="card-body curr-weather-body">
                <fut-h5 class="card-title mx-2">${x.location.name}</fut-h5>
                <div class="card-text">
                  <div class="curr-deg text-white h1">${
                    x.current.temp_c
                  }<sup>o</sup>C</div>
                  <div class="forecast-icon">
                    <img
                      src="${x.current.condition.icon}"
                      alt="Day status"
                      width="90"
                    />
                  </div>
                  <div class="status">${x.current.condition.text}</div>
                  <div class="details">
                    <span class="me-4"
                      ><img
                        src="images/icon-umberella.png"
                        class="img-fluid me-1"
                        alt="Humidity"
                      />${x.current.humidity}%</span
                    ><span class="me-4"
                      ><img
                        src="images/icon-wind.png"
                        class="img-fluid me-1"
                        alt="Wind speed"
                      />${x.current.wind_kph}km/h</span
                    >`;
  if (x.current.wind_dir == "W") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />West</span
                    >
                  </div>
                </div>
              </div>`;
  } else if (x.current.wind_dir == "E") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />East</span
                        >
                      </div>
                    </div>
                  </div>`;
  } else if (x.current.wind_dir == "N") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />North</span
                        >
                      </div>
                    </div>
                  </div>`;
  } else if (x.current.wind_dir == "S") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />South</span
                        >
                      </div>
                    </div>
                  </div>`;
  } else if (x.current.wind_dir == "NE") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />North-East</span
                        >
                      </div>
                    </div>
                  </div>`;
  } else if (x.current.wind_dir == "NW") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />North-West</span
                        >
                      </div>
                    </div>
                  </div>`;
  } else if (x.current.wind_dir == "SW") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />South-West</span
                        >
                      </div>
                    </div>
                  </div>`;
  } else if (x.current.wind_dir == "SE") {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="wind direction"
                      />South-East</span
                        >
                      </div>
                    </div>
                  </div>`;
  } else {
    currWeather.lastElementChild.lastElementChild.lastElementChild.innerHTML += `<span class="me-4"
                      ><img
                        src="images/icon-compass.png"
                        class="img-fluid me-1"
                        alt="Wind direction"
                      />East</span
                        >
                      </div>
                    </div>
                  </div>`;
  }

  forecastTomWeather.innerHTML = `              <div class="card-header rounded-top-0 tom-weather-header">
                <span>${days[tom.getDay()]}</span>
              </div>
              <div class="card-body tom-weather-body">
                <div class="forecast-content pt-5">
                  <div class="forecast-icon">
                    <img
                      src="${x.forecast.forecastday[1].day.condition.icon}"
                      alt="Day status"
                      width="48"
                    />
                  </div>
                  <div class="fut-deg">${
                    x.forecast.forecastday[1].day.maxtemp_c
                  }<sup>o</sup>C</div>
                  <small>${
                    x.forecast.forecastday[1].day.mintemp_c
                  }<sup>o</sup></small>
                  <div class="status">${
                    x.forecast.forecastday[1].day.condition.text
                  }</div>
                </div>
              </div>`;
  forecastDaTomWeather.innerHTML = `              <div
                class="card-header rounded-end-3 rounded-bottom-0 rounded-start-0 daTom-weather-header"
              >
                <span>${days[datom.getDay()]}</span>
              </div>
              <div class="card-body daTom-weather-body">
                <div class="forecast-content pt-5">
                  <div class="forecast-icon">
                    <img
                      src="${x.forecast.forecastday[2].day.condition.icon}"
                      alt="Day status"
                      width="48"
                    />
                  </div>
                  <div class="fut-deg">${
                    x.forecast.forecastday[2].day.maxtemp_c
                  }<sup>o</sup>C</div>
                  <small>${
                    x.forecast.forecastday[2].day.mintemp_c
                  }<sup>o</sup></small>
                  <div class="status">${
                    x.forecast.forecastday[2].day.condition.text
                  }</div>
                </div>
              </div>`;
}
