const searchBtn= document.getElementById("search-btn")
const searchInput= document.getElementById("input-search")
const currentWeather= document.querySelector(".current-weather")

// get the API Key
const apiKey ="d7104f28f24bae988a39232fd8b0d446"
let output;

function getWeather(cityName){
 const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
fetch(url)
.then((response)=>response.json())
.then((data)=>{
    console.log(data);
    const lat =data.coord.lat
    const lon=data.coord.lat
    getForecast(lat, lon)
    displayWeather(data)
})

}

function getForecast(lat, lon){
    const url= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
    })
}

function displayWeather(data){

     output+= `<div class="card" id="main-card">
     <div class="card-header">
      <h2 class="card-title">${data.name}<span></span></h2>
     </div>
     <div class="card-body">
       <p class="card-text"> Temperature: ${data.main.temp} F</p>
       <p class="card-text"> Humidity: ${data.main.humidity} %</p>
       <p class="card-text"> Wind Speed: ${data.wind.speed} MPH</p>
      
     </div>
   </div>`

   currentWeather.innerHTML= output;
}







searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = searchInput.value;
    console.log(city);
    getWeather(city)
   
})