const cityValue = document.getElementById('city-value');
const cityName = document.getElementById('city-name');
const coords = document.getElementById('coords');
const temp = document.getElementById('temperature');
const tempMax = document.getElementById('max-temp');
const tempMin = document.getElementById('min-temp');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const gust = document.getElementById('gust');
const wind = document.getElementById('wind');
const weather = document.getElementById('weather');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const test = document.getElementById('test');
const weekDay = document.getElementById('weekDay');
const currentDate = document.getElementById('date');
const btn = document.getElementById('btn');

btn.addEventListener("click", function() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue.value}&units=metric&appid=38250cdc5565ac4a8ab3b76612a0768c`)
    .then(function(resp) {return resp.json()})
    .then (function(data) {
      cityName.innerText = data.name;
      coords.innerHTML = `<p>Lat: ${data.coord.lat}</br> Lon: ${data.coord.lon}</p>`;
      temp.innerHTML = `${data.main.temp}&deg;`;
      feelsLike.innerHTML = `Feels like: ${data.main.feels_like}&deg;`;
      tempMax.innerHTML = `<span class="temp-max">&#60;</span>${data.main.temp_max}&deg;`;
      tempMin.innerHTML = `<span class="temp-min">&#60;</span>${data.main.temp_min}&deg;`;
      humidity.innerHTML = `Humidity: ${data.main.humidity}d %`;
      pressure.innerHTML = `Pressure: ${data.main.pressure} hPa`;
      wind.innerHTML = `Wind: ${data.wind.speed} m/s`;

      let objWind = data.wind

      if (objWind.hasOwnProperty('gust')) {
        gust.innerHTML = `Gust: ${data.wind.gust} m/s`;
      } else {
        gust.innerHTML = '';
      }

      weather.innerHTML = data.weather[0].main;
      weatherDescription.innerHTML = data.weather[0].description;
      weatherIcon.innerHTML = `<img src = "https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png">`;

      getSunriseAndSunset()

      function getSunriseAndSunset() {
        let sunrise = new Date(data.sys.sunrise * 1000);
        let sunset = new Date(data.sys.sunset * 1000);

        return document.getElementById('sunrise-and-sunset').innerHTML = `<p>Sunrise: ${sunrise.toLocaleString().slice(11)} </p> <p>Sunset: ${sunset.toLocaleString().slice(11)}</p>`;
      }

      function getWeekDay(date) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return weekDay.innerHTML = days[date.getDay()];
      }

      let date = new Date(); 
      currentDate.innerHTML = date;
      getWeekDay(date);
      
      function getDate() {
        return currentDate.innerHTML = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"});
      }
      getDate();
      document.querySelector('header').style.display = "block"; 
      document.querySelector('main').style.display = "block";
  
})
  .catch(function() {
    document.querySelector('header').style.display = "none"; 
    document.querySelector('main').style.display = "none"; 
    cityValue.value = "";
    alert("Incorrect city name.");
  });
});

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue.value}&units=metric&appid=38250cdc5565ac4a8ab3b76612a0768c`)
  .then(function(resp) {return resp.json()})
  .then (function(data) {
    console.log(data);
    cityName.innerText = data.name;
    coords.innerHTML = `<p>Lat: ${data.coord.lat}</br> Lon: ${data.coord.lon}</p>`;
    temp.innerHTML = `${data.main.temp}&deg;`;
    feelsLike.innerHTML = `Feels like: ${data.main.feels_like}&deg;`;
    tempMax.innerHTML = `<span class="temp-max">&#60;</span>${data.main.temp_max}&deg;`;
    tempMin.innerHTML = `<span class="temp-min">&#60;</span>${data.main.temp_min}&deg;`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}d %`;
    pressure.innerHTML = `Pressure: ${data.main.pressure} hPa`;
    wind.innerHTML = `Wind: ${data.wind.speed} m/s`;

    let objWind = data.wind

    if (objWind.hasOwnProperty('gust')) {
      gust.innerHTML = `Gust: ${data.wind.gust} m/s`;
    } else {
      gust.innerHTML = '';
    }
    
    weather.innerHTML = data.weather[0].main;
    weatherDescription.innerHTML = data.weather[0].description;
    weatherIcon.innerHTML = `<img src = "https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png">`;

    getSunriseAndSunset()
    function getSunriseAndSunset() {
      let sunrise = new Date(data.sys.sunrise * 1000);
      let sunset = new Date(data.sys.sunset * 1000);

      return document.getElementById('sunrise-and-sunset').innerHTML = `<p>Sunrise: ${sunrise.toLocaleString().slice(11)} </p> <p>Sunset: ${sunset.toLocaleString().slice(11)}</p>`;
    }

    function getWeekDay(date) {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
      return weekDay.innerHTML = days[date.getDay()];
    }

    let date = new Date(); 
    currentDate.innerHTML = date;
    getWeekDay(date);
    
    function getDate() {
      return currentDate.innerHTML = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"});
    }
    getDate();
  })
  .catch(function() {
    alert("Incorrect city name.");
});