const weatherApiKey = "b07927612bb991a16b8b1bdd73781224";
const searchForm = document.getElementById('form-search');

function getCurrentWeatherApi(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;
    return fetch(url)
    .then(function(response) {
        return response.json();
    });
}

function getOneCallApi(lon, lat) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${weatherApiKey}`;
    return fetch(url)
    .then(function(response) {
        return response.json();
    });
}

function getForecastApi (lon, lat) {
    const url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    return fetch(url)
    .then(function(response) {
        return response.json();
    });
}

function getWeather(city) {
    return getCurrentWeatherApi(city)
    .then(function(data) {
        const lon = data.coord.lon;
        const lat = data.coord.lat;

        return getOneCallApi(lon, lat);
    });
}



function kelvinToCelcius(kelvin) {
    return kelvin - 273.15;
}

function iconCodeToPic(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
}

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('input-city').value;
    getWeather(userInput)
    .then(function(weatherData) {
        const tempToday = kelvinToCelcius(weatherData.current.temp);
        document.getElementById('span-today-temp').textContent = tempToday.toFixed(2);
        document.getElementById('img-today-icon').src = iconCodeToPic(weatherData.current.weather[0].icon);
        document.getElementById('span-city-date').textContent = userInput + ' ' + moment().format("ddd MMM Do, YYYY");
        document.getElementById('span-today-wind').textContent = weatherData.current.wind_speed;
        document.getElementById('span-today-humidity').textContent = weatherData.current.humidity;
        document.getElementById('span-today-uvi').textContent = weatherData.current.uvi;
    });
})