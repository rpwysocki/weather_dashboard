//  
var searchHistory = $("#searchHistory")
var searchBtn = $("#submitBtn");
var searchInput = $('#searchInput');
var currentWeatherInfo = $('#currentWeatherInfo')
var forecastInfo = $('#forecastInfo')
var fiveDayData = $('#fiveDayData')
var apiKey = '97f65a91531e68a7336607ccfa001f7f'

if (localStorage.getItem('cities')) {
    displayHistory();
}

function getLocalStorage() {
    var rawData = localStorage.getItem('cities');
    var parsed = JSON.parse(rawData);
    return parsed || [];
}

function getForecast(cityName) {
    var URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(URL).then(function (response) {
        return response.json()
    }).then(function (currentData) {
        console.log(currentData)
        currentWeatherInfo.html(`${currentData.name} ${dayjs.unix(currentData.dt).format("MM/DD/YYYY")}<img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png">`)
        forecastInfo.html(`<p><span class = "is-bold">Temp: </span> ${currentData.main.temp}</p>
        <p><span class = "is-bold">Wind: </span> ${currentData.wind.speed}</p>
        <p><span class = "is-bold">Humidity: </span> ${currentData.main.humidity}</p>`)
    })
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(fiveDayURL).then(function (res) {
        return res.json()
    }).then(function (forecastData) {
        console.log(forecastData)
        fiveDayData.empty()
        for (var i = 4; i < forecastData.list.length; i += 8) {
            console.log(forecastData.list[i])
            fiveDayData.append(`<div class ="card col weather-card p-2 mx-1">
            <h4>${dayjs.unix(forecastData.list[i].dt).format("MM/DD/YYYY")}</h4>
            <img src="https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png">
            <p>Temp: ${forecastData.list[i].main.temp}</p>
            <p>Wind: ${forecastData.list[i].wind.speed}</p>
            <p>Humidity: ${forecastData.list[i].main.humidity}</p>
        </div>`)
        }
    })
}

function saveSearch() {
    var searchHistory = getLocalStorage();
    if (searchInput.val()) {
        var city = searchInput.val();
        searchHistory.push(city)
        localStorage.setItem('cities', JSON.stringify(searchHistory));
        getForecast(city);
        displayHistory();
    }
    else {

    }
}

function fetchWeather(event) {
    var clicked = event.target
    getForecast(clicked.innerText)
}

function displayHistory() {
    var parsed = JSON.parse(localStorage.getItem('cities'));
    searchHistory.text('')
    for (var items of parsed) {
        searchHistory.prepend(`<button class ="btn btn-light my-1">${items}</button>`);
    }
    searchHistory.on('click', fetchWeather)
}

searchBtn.on("click", saveSearch);











// var apiKey = '97f65a91531e68a7336607ccfa001f7f';
// var city = '#input';
// var baseURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
// var geoBaseURL = 'https://api.api-ninjas.com/v1/geocoding?city=' & `city`;
// var geoAPIKey { 'aZk/79cE8/r4p/53F6F1Lw==0w56rREOzv57wtP1'};

// function displayInput(event) {
//     event.preventDefault();


// $(document).ready(function(){
//     $("#button").click(function(){
//         var cityEntered = $("input[name=name]").val();
//         $("ul").append("<li>" + cityEntered + "<li>");
//         $("input[name=name]").val("");
//     })
//     $("ul").on("dblclick","li", function(){
//         //recall search here
//     })
// })



