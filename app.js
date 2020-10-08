$(document).ready(function() {
    callAPI();
});

function Init() {
    var searchBtn = $(".searchBtn")

    searchBtn.on("click", callAPI())


}
function callAPI() {

    // set up apikey

    // CALL
    const APIkey = "55d64fc582cb0ffa7945ed98f95ee6c7";
    let city = "Seattle";
    // let endPoint = url + city + "&appid=" + apiKey;
    // `api.openweathermap.org/data/2.5/forecast?q=${cityname},${statecode},${countrycode}&appid=${APIkey}`
    let endPoint = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`

    $.ajax({
        url: endPoint,
        method: "get"
    }).then(function (response) {
        console.log(response);
    })

}
// api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}



/*
user inputs a city
city forecast is generated
forecast is saved to local storage
a list is generated of previous searches



*/