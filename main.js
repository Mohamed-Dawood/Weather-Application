const apiKey = "07042fab0934060209dab53d01a8434b";
// const apiUrl =
//   "https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=07042fab0934060209dab53d01a8434b&units=metric";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let inputSearch = document.querySelector(".search input");
let submitBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");
let weather = document.querySelector(".weather");
let error = document.querySelector(".error");

async function checkWether(city) {
  const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (res.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
    inputSearch.value = "";
  } else {
    var data = await res.json();
    // console.log(data);

    document.querySelector(".weather .city").innerHTML = data.name;
    document.querySelector(".weather .temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".weather .humidity").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".weather .wind").innerHTML =
      data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    }
    weather.style.display = "block";
    error.style.display = "none";
  }
}

submitBtn.addEventListener("click", () => {
  checkWether(inputSearch.value);
});
