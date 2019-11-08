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
$('.dataset-date').html(dateFormat(new Date(),"dddd, mmmm dS")); // set the current date //https://www.npmjs.com/package/dateformat
$('.dataset-icon').html('<i class="fas fa-umbrella"></i>');// set the icon
$('.dataset-description').html('Rain');// set the description
$('.dataset-temperature').html('<i class="fas fa-temperature-high"></i>'+'30.5&#8451;'); // set the t(icon) + temp + celsius(sign)
$('.dataset-feeling').html('real feel 30.5&#8451;'); // set the windchill effect // https://goodcalculators.com/wind-chill-calculator/
$('.dataset-wind').html('<i class="fas fa-wind"></i>'+'100m/s');

//today-current-dayduration
$('.dayduration-sunrise').html(dateFormat(new Date(),"shortTime"));
$('.dayduration-time').html(dateFormat(new Date(),"shortTime"));
$('.dayduration-sunset').html(dateFormat(new Date(),"shortTime"));


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