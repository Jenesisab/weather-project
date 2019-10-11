//After Hard coding the HTML
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={d134b892e56243aa696d32a18a01d01e}
//d134b892e56243aa696d32a18a01d01e

// CODE: Query API
$('#search').on('click', function () {
    console.log("click");

    let city = $("#search-query").val();


    fetchCurrentWeather(city)
    fetchForecast(city)
    renderCurrentWeather();
});

// hardcode view
var currentWeather = {
    icon: null,
    temp: null,
    location: null,
    currentConditions: null
};


// var arrayForecast = [add looped through every 8th object in list];

// GET DATA BACK 
// var currentConditions
// WHAT DO I WANT THE DATA TO LOOK LIKE
// TRANSPOSE
//EVENT: click search, render weather data

var fetchCurrentWeather = function (query) {
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=d134b892e56243aa696d32a18a01d01e&units=imperial",
        dataType: "JSON",
        success: function (data) {
            console.log(data.name);
            currentWeather.temp = data.main.temp;
            currentWeather.location = data.name;
            currentWeather.currentConditions = data.weather[0].main;
            renderCurrentWeather();
        },
        error: function (unknownError, timeOut) {
            console.log(unknownError);
        }
    });
};
//VIEW: 5-day forcast 
// day, icon, temp, cond descrip
"https://api.openweathermap.org/data/2.5/forecast?q=durham,us&APPID=d134b892e56243aa696d32a18a01d01e&units=imperial",
var fetchForecast = function (query) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&APPID=d134b892e56243aa696d32a18a01d01e&units=imperial",
        dataType: "JSON",
        success: function (data) {
            let forecastData = {
                day: null,
                icon: null,
                temp: null,
                conditions: null,
            }
            forecastData.day = data.



            console.log(data);
            renderForecastCard(data);
        },
        error: function (unknownError, timeOut) {
            console.log(unknownError);
        }
    });
};

let renderCurrentWeather = function () {
    console.log(currentWeather);

}

//USE HANDLEBARS TEMPLATE
//VIEW: temp in farenhiet
//VIEW: Conditions description (cloudy,raining)

//VIEW: New conditions on new seach (will need to empty something)

// endpoint
// {
//     "id": 4464374,
//     "name": "Durham County",
//     "country": "US",
//     "coord": {
//         "lon": -78.866402,
//         "lat": 36.033482
//     }