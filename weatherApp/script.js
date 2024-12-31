const searchBar = document.querySelector('#searchBar');
const searchIcon = document.querySelector('#searchIcon');

const temp = document.querySelector('#temperatur');
const loc = document.querySelector('#location');
const humid = document.querySelector('#showHumidity');
const wSpeed = document.querySelector('#showWindSpeed');
const img = document.querySelector('#img');
const error = document.querySelector('#errorBox');

function displayError(){
    error.style.display = "flex";
}

function start(){
    error.style.display = "none";
}

function showWeather(temperatur, wind, humidity,location){
    start();
    temp.innerHTML = `${temperatur} &#176; C`;
    wSpeed.innerHTML = `${wind} k/m`;
    humid.innerHTML = `${humidity} %`
    loc.innerHTML = `${location.toUpperCase()}`
}

function showIcon(weather, time, sunrise, sunset){
    if (time >= sunrise && time <= sunset) {
        if(weather === "Snow"){
            img.src = "snowy.png";
        }
        else if(weather === "Cloud" || weather === "Mist"){
            img.src = "suncloud.png";
        }
        else if(weather === "Rain"){
            img.src = "sunRain.png";
        }
        else{
            img.src = "sun.png";
        }
    } 
    else {
        if(weather === "Snow"){
            img.src = "snowy.png";
        }
        else if(weather === "Cloud" || weather === "Mist"){
            img.src = "cloudNight.png";
        }
        else if(weather === "Rain"){
            img.src = "rainNight.png";
        }
        else{
            img.src = "night.png";
        }
    }
}

async function checkWeather(location) {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=893bf38664cd271d3b171ec5dbd310c1`;

    let promise = await fetch(url);

    if(promise.status === 404){
        displayError();
        return;
    }
    let data = await promise.json();

    showIcon(data.weather[0].main, data.dt, data.sys.sunrise, data.sys.sunset);

    let temperatur = Math.round((data.main.temp)-273);
    let wind = data.wind.speed;
    let humidity = data.main.humidity;

    showWeather(temperatur, wind, humidity, location);
}

searchIcon.addEventListener('click', (e) =>{
    e.preventDefault();
    let location = searchBar.value;
    checkWeather(location.toLowerCase());
})

window.addEventListener('load', (e) => {
    e.preventDefault();
    checkWeather("delhi");
})