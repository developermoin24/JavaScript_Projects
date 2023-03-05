let tabsBtn = document.querySelectorAll('.tabs button');
let searchBtn = document.querySelector('.search-box button');
let currentDisplay = document.querySelector('.current-display');
let searchDisplay = document.querySelector('.search-display');
let loaderShow = document.querySelector('.loader');
let errorShow = document.querySelector('.error');
let withsearchShow = document.querySelector('.withsearch');
let cityShow = document.querySelector('[data-cityName]');
let citySShow = document.querySelector('[data-cityNameS]');
let weatherDecriptionShow = document.querySelector('[data-weatherDecription]');
let weatherDecriptionSShow = document.querySelector('[data-weatherDecriptionS]');
let weatherDecImgShow = document.querySelector('[data-weatherDecImg]');
let weatherDecImgSShow = document.querySelector('[data-weatherDecImgS]');
let tempShow = document.querySelector('[data-temp]');
let tempSShow = document.querySelector('[data-tempS]');
let speedShow = document.querySelector('[data-speed]');
let speedSShow = document.querySelector('[data-speedS]');
let humedityShow = document.querySelector('[data-humedity]');
let humeditySShow = document.querySelector('[data-humedityS]');
let cloudyShow = document.querySelector('[data-cloudy]');
let cloudySShow = document.querySelector('[data-cloudyS]');
let inputVal = document.querySelector('input[type="text"]');
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

function handleTabs(event){
    let targetElem = event.target;
    for(let element of tabsBtn){
        element.classList.remove('activeBtn');
    }
    targetElem.classList.add('activeBtn');
    if(targetElem.classList.contains('yourLoc')){
        currentDisplay.style.cssText = "display:flex";
        searchDisplay.style.cssText = "display:none";
    }else{
        searchDisplay.style.cssText = "display:block";
        currentDisplay.style.cssText = "display:none";
    }
}
tabsBtn.forEach(function(ele){
    ele.addEventListener('click' , handleTabs);
})
function renderWeatherInfo(data){
    cityShow.textContent = data.name;
    weatherDecriptionShow.textContent = data.weather[0].description;
    weatherDecImgShow.src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    tempShow.textContent = data.main.temp + "°C";
    speedShow.textContent = data.wind.speed + "m/s";
    humedityShow.textContent = data.main.humidity + "%";
    cloudyShow.textContent = data.clouds.all + "%";
    currentDisplay.style.cssText = "display:flex";
    console.log(data.weather[0].icon);

}
function renderWeatherInfoSearch(data){
    citySShow.textContent = data.name;
    weatherDecriptionSShow.textContent = data.weather[0].description;
    weatherDecImgSShow.src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    tempSShow.textContent = data.main.temp + "°C";
    speedSShow.textContent = data.wind.speed + "m/s";
    humeditySShow.textContent = data.main.humidity + "%";
    cloudySShow.textContent = data.clouds.all + "%";
    searchDisplay.style.cssText = "display:block";
    withsearchShow.style.cssText = "display:flex";

}
function error(){
    loaderShow.style.cssText = "display:none";
    errorShow.textContent = "City not found, Please give correct city name";
}
async function fetchWeatherDetails(lat,lon) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loaderShow.style.cssText = "display:none";
        renderWeatherInfo(data);
    }
    catch(err) {
        alert("data not found");
    }

}
async function fetchSearchWeather() {

    try {
        errorShow.textContent = "";
        withsearchShow.style.cssText = "display:none";
        loaderShow.style.cssText = "display:block";
        let city = inputVal.value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loaderShow.style.cssText = "display:none";

        renderWeatherInfoSearch(data);
    }
    catch(err) {
        error();
    }

}
function getLocation() {
    loaderShow.style.cssText = "display:block";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
     let lati =  position.coords.latitude;
     let longi =  position.coords.longitude;
     fetchWeatherDetails(lati,longi)
  }
  getLocation();
  searchBtn.addEventListener('click', fetchSearchWeather);
