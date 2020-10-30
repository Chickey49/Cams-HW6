$(document).ready(function () {
    init();

});
var city;
function init() {
    var searchBtn = $(".searchBtn");
    buildCityList();

    searchBtn.on("click", function () {
        city = $("#searchBox").val();
        forecastAPI(city);
        addToCityData(city);
        buildCityList();
        callAPI(city);
    })


}
function checkIfCityExists(cityArr, city) {
    var exists = (cityArr.find(c => c.toLowerCase() === city.toLowerCase()) != null);
    console.log(exists);
    return exists;
}

function addToCityData(city) {
    var cityArr = getCityData();
    if (!checkIfCityExists(cityArr, city)) {
        cityArr.push(city);
        saveCityData(cityArr);
    }
}

function getCityData() {
    var cityArr = JSON.parse(localStorage.getItem("cities"));
    if (!cityArr) {
        cityArr = new Array();
    }
    return cityArr;
}

function saveCityData(cityArr) {
    localStorage.setItem("cities", JSON.stringify(cityArr));
}

function buildCityList() {
    var cityList = $("#cityList");
    cityList.empty();
    var cities = getCityData();

    cities.forEach(city => {
        var cityItem = $('<li>').text(city).addClass("cityItem");
        cityList.append(cityItem);
    });

    $(".cityItem").click(function () {
        var city = $(this).text();
        callAPI(city);

    });
}

function showCity(responseData) {
    var weatherIcon = responseData.weather[0].icon;
    console.log(responseData);
    var display = $("#displayContainer");
    display.empty();
    display.append($("<h1>").text(responseData.name));
    display.append($("<h2>").text("Temperature" + "=" + (Math.round((responseData.main.temp - 273.15) * 1.8 + 32))));
    display.append($("<h2>").text("Humidity" + "=" + responseData.main.humidity));
    display.append($("<h2>").text("Wind" + "=" + responseData.wind.deg + String.fromCharCode(176) + " @ " + responseData.wind.speed + " Gusting " + responseData.wind.gust));
    display.prepend($("<img>").attr("src", `https://openweathermap.org/img/w/${weatherIcon}.png`));

    var UV = $("<h2>");
    forecastAPI(responseData.coord);
}

function showForecast(data) {
    var forecastDiv = $("#forecastDiv");
    forecastDiv.empty();
    for (let i = 0; i < 5; i++) {
        var date = $("<p>").text(formatDate(data.daily[i].dt));
        var temp = $("<p>").text("Temperature" + "=" + (Math.round((data.daily[i].temp.day - 273.15) * 1.8 + 32)));
        var hum  = $("<p>").text("Humidity" + "=" + data.daily[i].humidity);
        
        var weatherIcon = data.daily[i].weather[0].icon;
        var icon = $("<img>").attr("src",`https://openweathermap.org/img/w/${weatherIcon}.png`);


        var card = $("<div>").attr("class", "card");
        var body = $("<div>").attr("class", "card-body");
        body.append(date).append(icon).append(temp).append(hum);        
        card.append(body);
        forecastDiv.append(card);
    }
}

function formatDate(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    return date.toLocaleDateString();
}

function forecastAPI(coord, data) {

    const APIkey = "55d64fc582cb0ffa7945ed98f95ee6c7";
    let endPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude={part}&appid=${APIkey}`
    console.log(endPoint)


    fetch(endPoint)
        .then(res => res.json())
        .then(data => {
            showForecast(data);
            console.log(data);
        });
}

function callAPI(city) {


    const APIkey = "55d64fc582cb0ffa7945ed98f95ee6c7";
    let endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
    console.log(endPoint)

    console.log("making calls!")
    fetch(endPoint)
        .then(res => res.json())
        .then(data => showCity(data));

}
