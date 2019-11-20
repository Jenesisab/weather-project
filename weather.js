//After Hard coding the HTML
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={d134b892e56243aa696d32a18a01d01e}
//d134b892e56243aa696d32a18a01d01e

let renderCurrentWeather = function (weather) {
    $(".current-weather").empty();
    var source = $('#card-template-current').html();
    var template = Handlebars.compile(source);
    var newHTML = template(weather);
    // console.log(newHTML);
    $('.current-weather').append(newHTML);
};


let renderForecast = function () {
    $(".forecast").empty();
    for (var i = 0; i < arrayForecast.length; i++) {
    // console.log(arrayForecast[i])
    var source = $('#card-template-forecast').html();
    var template = Handlebars.compile(source);
    var newHTML = template(arrayForecast[i]);
    // console.log(newHTML);
    $('.forecast').append(newHTML);
 }
};
//EVENT: Query API
//EVENT: click search, render weather data
$('#search').on('click', function () {
    // console.log("click");
    let city = $("#search-query").val();
    fetchCurrentWeather(city)
    fetchForecast(city)
});
//constructor function
var currentWeather = function (data) {
    var attributes = {
        icon: "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png",
        temp: data.main.temp,
        city: data.name,
        description: data.weather[0].description
    }
    return attributes;
};
let arrayForecast = []; //made of every 8th object in list
var fetchCurrentWeather = function (query) {
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=d134b892e56243aa696d32a18a01d01e&units=imperial",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            // currentWeather.temp = data.main.temp;
            // currentWeather.location = data.name;
            // currentWeather.currentConditions = data.weather[0].main;
            var returnedCurrentWeather = currentWeather(data);
            // console.log(returnedCurrentWeather);
            renderCurrentWeather(returnedCurrentWeather);
        },
        error: function (unknownError, timeOut) {
            console.log(unknownError);
        }
    });
};
//VIEW: 5-day forcast 
// day, icon, temp, cond descrip 
let fetchForecast = function (query) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&APPID=d134b892e56243aa696d32a18a01d01e&units=imperial",
        dataType: "JSON",
        success: function (data) {
            // forecastData.day = data.main.dt_text
            // forecastData.temp = data.main.temp
            // forecastData.icon = data.weather.icon
            // forecastData.conditions = data.weather.description
            for (let i = 0; i < data.list.length; i += 8) {
                // console.log(data.list[i])
                let forecastData = {
                    day: moment(data.list[i].dt_txt).format('dddd'),
                    icon: null,
                    temp: data.list[i].main.temp,
                    conditions: data.list[i].weather[0].main,   
                }
                arrayForecast.push(forecastData);
                console.log(arrayForecast)
            };
            renderForecast();
            // console.log(data)
            // for (let i = 0; i < arrayForecast.length;i++)
        },
        error: function (unknownError, timeOut) {
            console.log(unknownError);
        }
    });
};






