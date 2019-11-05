//After Hard coding the HTML
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={d134b892e56243aa696d32a18a01d01e}
//d134b892e56243aa696d32a18a01d01e

//EVENT: Query API
//EVENT: click search, render weather data
$('#search').on('click', function () {
    console.log("click");

    let city = $("#search-query").val();


    fetchCurrentWeather(city)
    fetchForecast(city)
    renderCurrentWeather();
});

// hardcode view// constructor function
var currentWeather = function(data) {
    var attributes = {
        icon: "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png",
        temp: data.main.temp,
        location: data.name,
        currentConditions: data.weather[0].description
    }
 return {
    attributes: attributes
}
};

let arrayForecast = []; //made of every 8th object in list

var fetchCurrentWeather = function (query) {
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=d134b892e56243aa696d32a18a01d01e&units=imperial",
        dataType: "JSON",
        success: function (data) {
            console.log(data.name);
            // currentWeather.temp = data.main.temp;
            // currentWeather.location = data.name;
            // currentWeather.currentConditions = data.weather[0].main;
            var returnedCurrentWeather = currentWeather(data);
            console.log(returnedCurrentWeather);
            renderCurrentWeather(currentWeather);
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
                console.log(data.list[i])
                let forecastData = {
                    day: moment(data.list[i].dt_txt).format('dddd'),
                    icon: null,
                    temp: data.list[i].main.temp,
                    conditions: data.list[i].weather[0].main
                }

                arrayForecast.push(forecastData);
                console.log(arrayForecast)

                //create daily forecast objects and push them to the forecast array

            };


            // console.log(data)
            // renderForecastCard();
            // for (let i = 0; i < arrayForecast.length;i++)
        },
        error: function (unknownError, timeOut) {
            console.log(unknownError);
        }
    });
};

// let createWeatherCard = function (data) {
//     var cloud = {
//         conditions: data.weather[0].main,
//         description: data.weather[0].description,
//         icon: "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png",
//         temp: data.main.temp,
//         city: data.name
//     };
//     console.log(weather.icon);
//     currentWeather.push(cloud);
//     console.log(currentWeather);
//     renderCurrentWeather(cloud);
// }



let renderCurrentWeather = function () {
        $(".current-weather").empty();
        var source = $('#card-template-current').html();
        var template = Handlebars.compile(source);
        var newHTML = template(cloud);
        console.log(newHTML);
        $('.current-weather').append(newHTML);
};
    //current weather one object - handlebars tenplate(html)
    // console.log(currentWeather);


//USE HANDLEBARS TEMPLATE
//VIEW: temp in farenhiet
//VIEW: Conditions description (cloudy,raining)
//VIEW: New conditions on new seach (will need to empty something)