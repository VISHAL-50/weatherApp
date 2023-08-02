
let body =document.body;
let togglebtn = document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
    togglebtn.classList.replace('fa-sun','fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode','enabled');

}
const disableDarkMode =()=>{
    togglebtn.classList.replace('fa-moon','fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode','disabled'); //noice :)
}
if(darkMode === 'enabled'){
    enableDarkMode();
}
togglebtn.onclick =(e)=>{
let darkMode = localStorage.getItem('dark-mode');
if(darkMode === 'disabled'){
    enableDarkMode();
}
else{
    disableDarkMode();
}
}

const inputBox =document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description  = document.querySelector('.description');
const wind_speed  = document.querySelector('#wind-speed');
const humidity  = document.querySelector('#humidity');
const location_a  = document.querySelector('.location');



const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather_main');


async function checkWeather(city){
    const api_key = "a20cef27dbc7f9c60b336eb54d39258e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data)

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

  
    location_not_found.style.display = "none";
    weather_body.style.display = "block";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    const now = new Date();
  
    
    location_a.innerHTML = `${city} `;
    


    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    const sunriseUTC = new Date(weather_data.sys.sunrise * 1000);
    const sunsetUTC = new Date(weather_data.sys.sunset * 1000);

    // Get the current time in the local timezone
   

    // Check if it's day or night
    const isNight = now < sunriseUTC || now > sunsetUTC;
    console.log(isNight)


    

switch (weather_data.weather[0].main) {
  case 'Clouds':
    weather_img.src = isNight ? "images/m_cloud.png" : "images/cloud.png";
    break;
  case 'Clear':
    weather_img.src = isNight ? "images/m_clear.png" : "images/clear.png";
    break;
  case 'Rain':
    weather_img.src = isNight ? "images/m_rain.png" : "images/rain.png";
    break;
  case 'Mist':
    weather_img.src = isNight ? "images/m_mist.png" : "images/mist.png";
    break;
  case 'Snow':
    weather_img.src = isNight ? "images/m_snow.png" : "images/snow.png";
    break;
}

}

    


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});







