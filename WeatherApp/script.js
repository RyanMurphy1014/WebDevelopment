//Coords for given cities
const RockyMount = cityObjectBuilder(36.99764, -79.892);
const Radford = cityObjectBuilder(37.1231, -80.5683);
const NewYork = cityObjectBuilder(40.7128, -74.006);

displayWeather(RockyMount); //deafault location

function cityObjectBuilder(lat, long) {
  const city = new Object();
  city.lat = lat;
  city.long = long;
  return city;
}

function displayWeather(city) {
  apiCallAddress = `https://api.openweathermap.org/data/2.5/weather?lat=` + city.lat + `&lon=` + city.long + `&appid=9325c456d1a7c56efd172c150812407f&units=imperial`;

  fetch(apiCallAddress)
    .then((response) => response.json())
    .then((rawWeatherData) => {
      // Handle the response rawWeatherData
      console.log(rawWeatherData); //Output rawWeatherrawWeatherData
      updateText(rawWeatherData);
      updateImages(rawWeatherData);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

//Writes initial text on screen
function updateText(rawWeatherData) {
  document.getElementById("temp").textContent = "The current temperature is: " + Math.round(rawWeatherData.main.temp) + "\u00B0 \nin " + rawWeatherData.name;
  document.getElementById("desc").textContent = "The weather is: " + rawWeatherData.weather[0].description;
}
//Changes background and icon
function updateImages(rawWeatherData) {
  switch (rawWeatherData.weather[0].main) {
    case "Clouds":
      changeBackgroundImage("Cloudy");
      changeIcon("04d");
      break;

    case "Clear":
      changeIcon("01d");
      changeBackgroundImage("Clear");
      break;

    case "Atmosphere":
      changeIcon("50d");
      break;

    case "Snow":
      changeIcon("13d");
      changeBackgroundImage("Cloudy");
      break;

    case "Rain":
      changeBackgroundImage("Cloudy");
      changeIcon("10d");
      break;

    case "Drizzle":
      changeIcon("09d");
      changeBackgroundImage("Cloudy");
      break;

    case "Thunderstorm":
      changeIcon("11d");
      changeBackgroundImage("Cloudy");
      break;
  }
}

//Helper function for updateImages(rawWeatherData)
function changeBackgroundImage(weatherType) {
  switch (weatherType) {
    case "Cloudy":
      document.getElementById("background").style.backgroundImage = "url(css/cloudy.png)";
      break;
    case "Clear":
      document.getElementById("background").style.backgroundImage = "url(css/clear-weather.png)";
  }
}
//Helper function for updateImages(rawWeatherData)
function changeIcon(idNum) {
  document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + idNum + "@4x.png";
}
