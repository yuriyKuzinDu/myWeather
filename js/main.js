
$('.nav-controls-today').click( ( event ) => {
    document.querySelector('.main-section-today').scrollIntoView();
    $('.nav-controls-selected').removeClass('nav-controls-selected');
    $('.nav-controls-today').addClass('nav-controls-selected');
});
$('.nav-controls-forecast').click( ( event ) => {
    document.querySelector('.main-section-forecast').scrollIntoView();
    $('.nav-controls-selected').removeClass('nav-controls-selected');
    $('.nav-controls-forecast').addClass('nav-controls-selected');
});

//today-current-dataset 
$('.today-current-date').html(dateFormat(new Date(),"dddd, mmmm dS")); // set the current date //https://www.npmjs.com/package/dateformat
$('.today-current-icon').html('<i class="fas fa-umbrella"></i>');// set the icon
$('.today-current-description').html('Rain');// set the description
$('.today-current-temperature').html('<i class="fas fa-temperature-high"></i>'+'30.5&#8451;'); // set the t(icon) + temp + celsius(sign)
$('.today-current-feeling').html('real feel 30.5&#8451;'); // set the windchill effect // https://goodcalculators.com/wind-chill-calculator/
$('.today-current-wind').html('<i class="fas fa-wind"></i>'+'100m/s');

//today-current-dayduration
$('.today-duration-sunrise').html("Sunrise: "+(dateFormat(new Date(),"shortTime")));
$('.today-duration-time').html("Duration: "+(dateFormat(new Date(),"shortTime")));
$('.today-duration-sunset').html("Sunset: "+(dateFormat(new Date(),"shortTime")));


//hourly-fill
function createHourlyColumn(){
    let time = $("<div></div>").addClass("hourly-info-time").html(dateFormat(new Date(),"shortTime"));
    let icon = $("<div></div>").addClass("hourly-info-icon-whitespace").html('<i class="fas fa-cloud-meatball"></i>');
    let forecast = $("<div></div>").addClass("hourly-info-forecast").html('wind');
    let temperature = $("<div></div>").addClass("hourly-info-temperature").html('22.5&#8451;');
    let realfeel = $("<div></div>").addClass("hourly-info-realfeel").html('12.5&#8451;');
    let wind = $("<div></div>").addClass("hourly-info-wind").html('wind');
    let newCol = $("<div></div>").addClass("today-hourly-info").append(time,icon,forecast,temperature,realfeel,wind);
    $(".today-hourly").append(newCol);
};

createHourlyColumn();
createHourlyColumn();
createHourlyColumn();
createHourlyColumn();

createHourlyColumn();
createHourlyColumn();
createHourlyColumn();
createHourlyColumn();


function createNearbyContainer(name){
    let cityName = $("<div></div>").addClass("nearby-container-cityname").html(name);
    let cityIcon = $("<div></div>").addClass("nearby-container-cityicon").html('<i class="fas fa-cloud-meatball"></i>');
    let cityTemp = $("<div></div>").addClass("nearby-container-citytemp").html('12.5&#8451;');
    let newContainer = $("<div></div>").addClass("today-nearby-container").append(cityName, cityIcon, cityTemp);
    $(".today-nearby").append(newContainer);
};


createNearbyContainer("Krakow");
createNearbyContainer("Zaporozhie");
createNearbyContainer("Bachchisaray");
createNearbyContainer("Kiev");

$('.nav-search-button').click(e=>{
    console.log('clicked');
    document.querySelector('.main-section-error').scrollIntoView();
});



function createForecastListItem(index){
    let day = $('<div></div>').addClass('list-item-day').html(dateFormat(new Date(),"ddd"));
    let date =  $('<div></div>').addClass('list-item-date').html(dateFormat(new Date(),"mmm dS"));
    let icon = $('<div></div>').addClass('list-item-icon').html('<i class="fas fa-poo-storm"></i>');
    let temperature = $('<div></div>').addClass('list-item-temperature').html('<i class="fas fa-temperature-high"></i>'+'30.5&#8451;');
    let description = $('<div></div>').addClass('list-item-description').html('Warm ooze');
    let newListItem = $('<div></div>').addClass('forecast-list-item').addClass(index).append(day,date,icon,temperature,description);
    $(".forecast-list").append(newListItem);
}

createForecastListItem('index1');
createForecastListItem('index2');
createForecastListItem('index3');
createForecastListItem('index4');
createForecastListItem('index5');




function createSelectedListInfo(index){
    let time = $("<div></div>").addClass("list-info-time").html(dateFormat(new Date(),"hh TT"));
    let icon = $("<div></div>").addClass("list-info-icon").html('<i class="fas fa-cloud-sun"></i>');
    let forecast = $("<div></div>").addClass("list-info-forecast").html('sandstorm');
    let temperature = $("<div></div>").addClass("list-info-temperature").html('22.5&#8451;');
    let realfeel = $("<div></div>").addClass("list-info-realfeel").html('12.5&#8451;');
    let wind = $("<div></div>").addClass("list-info-wind").html('wind');
    let newListInfo = $("<div></div>").addClass("selected-list-info").append(time,icon,forecast,temperature,realfeel,wind);
    $(index).append(newListInfo);
};

for(let i = 1; i <= 5; ++i){
    $(".forecast-selected").append($("<div></div>").addClass("forecast-selected-list").addClass("indexS"+i));
    for(let j = 1; j <= 8; ++j){
        createSelectedListInfo(".indexS"+i);
}
}

// $('.today-hourly').html('');
// $('.today-nearby').html('');
// $('.forecast-list').html('');
// $('.forecast-selected').html('');

// 'use strict;'

const API_KEY = '&appid=b9c2e6ae48b91eafc79b582a9919ec60';
const DEFAULT_CITY = 'Kharkiv';
const FORECAST = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const METRIC = '&units=metric';
const FORECAST_ = 'http://api.openweathermap.org/data/2.5/forecast?';

$(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(permissionGranted, permissionDenied);
      } else { 
        console.log("Geolocation is not supported by this browser.");
        loadDefaultCity();
      }
});

function permissionGranted(position){
    let lat = 'lat=' + (position.coords.latitude).toFixed(2);
    let lon = '&lon=' + (position.coords.longitude).toFixed(2);
    axios.get(FORECAST_ + lat + lon + METRIC + API_KEY)
        .then(function(response){
            console.log('User allowed the request for Geolocation');
            console.log(response);
            loadCurrentCityData(response.data);
        })
};
function permissionDenied(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
    loadDefaultCity();
};
function loadDefaultCity(){
    axios.get( FORECAST + DEFAULT_CITY + METRIC + API_KEY)
    .then(function(response){
        console.log('Loading default city');
        console.log(response.data);
        loadCurrentCityData(response.data);
    })
};

const _TODAY_CURRENT = '.today-current';
const TODAY_CURRENT_DATE = 'today-current-date';
const TODAY_CURRENT_ICON = 'today-current-icon'; 
const TODAY_CURRENT_DESCRIPTION = 'today-current-description';
const TODAY_CURRENT_TEMPERATURE = 'today-current-temperature';
const TODAY_CURRENT_WINDCHILL = 'today-current-feeling';
const TODAY_CURRENT_WIND = 'today-current-wind';
const CELSIUS = '&#8451;';
const DIV = '<div></div>';

const _TODAY_DURATION = '.today-duration';
const DURATION_SUNRISE = 'today-duration-sunrise';
const DURATION_SUNSET = 'today-duration-sunset';
const DURATION_TIME = 'today-duration-time';
function loadCurrentCityData(data){ // try to use response.data as parameter in code listed bellow

    let newDate = $(DIV).addClass(TODAY_CURRENT_DATE)
        .html(dateFormat(new Date(),"dddd, mmmm dS"));
    let newIcon = $(DIV).addClass(TODAY_CURRENT_ICON)
        .html(createWeatherIcon(data.list[0].weather[0].id,data.list[0].dt_txt));
    let newDesc = $(DIV).addClass(TODAY_CURRENT_DESCRIPTION)
        .html(data.list[0].weather[0].main);
    let newTemp = $(DIV).addClass(TODAY_CURRENT_TEMPERATURE)
        .html(createTemperatureIcon(data.list[0].main.temp)+ ' ' + Math.round(data.list[0].main.temp) + CELSIUS);
    let newFeel = $(DIV).addClass(TODAY_CURRENT_WINDCHILL)
        .html(Math.floor(windChill(data.list[0].main.temp,data.list[0].wind.speed)) + CELSIUS);
    let newWind = $(DIV).addClass(TODAY_CURRENT_WIND)
        .html(degToCard(data.list[0].wind.speed) + ' ' + data.list[0].wind.speed + 'm/s');
    $(_TODAY_CURRENT).html('');
    $(_TODAY_CURRENT).append(newDate,newIcon,newDesc,newTemp,newFeel,newWind);


    let sunriseTime = new Date(data.city.sunrise*1000);
    let sunsetTime = new Date(data.city.sunset*1000);
    console.log(sunriseTime);
    console.log(sunsetTime);
    
    let sunrise = $(DIV).addClass(DURATION_SUNRISE)
        .html('Sunrise: '+dateFormat(new Date(sunriseTime),"shortTime"));
    let sunset = $(DIV).addClass(DURATION_SUNSET)
        .html('Sunset: '+dateFormat(new Date(sunsetTime),"shortTime"));
    $(_TODAY_DURATION).html('');
    $(_TODAY_DURATION).append(sunrise,sunset);
    

}
// $('.today-duration-sunrise').html("Sunrise: "+(dateFormat(new Date(),"shortTime")));
// $('.today-duration-time').html("Duration: "+(dateFormat(new Date(),"shortTime")));
// $('.today-duration-sunset').html("Sunset: "+(dateFormat(new Date(),"shortTime")));


// const 
// function loadTodayHourlyData(){

// }