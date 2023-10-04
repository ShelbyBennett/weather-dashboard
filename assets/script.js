const searchBtn= document.getElementById("search-btn")
const searchInput= document.getElementById("input-search")
const currentWeather= document.querySelector(".current-weather")
const forecastEL= document.querySelector(".forecast")
const todayDate= document.getElementById("today-date")
const historyContainer= document.querySelector(".search-history")

const today=dayjs().format("dddd, D MMMM YYYY")
todayDate.textContent=today

//for local storage
let cityArray=[]

// get the API Key
const apiKey ="d7104f28f24bae988a39232fd8b0d446"

const getHistory=(searchHistory)=>{
    const btn= document.createElement("button")
    btn.setAttribute("class", "btn history-btn")
    btn.setAttribute("value", searchHistory)
    btn.textContent=searchHistory
    historyContainer.append(btn)
}

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
        displayForecast(data.list)
    })
}

function displayWeather(data){
   currentWeather.innerHTML=""
   //main card
   const card= document.createElement("div")
   card.setAttribute("class", "card main-card")

   //header for city name and icon
   const cardHeader=document.createElement("div")
   cardHeader.setAttribute("class","card-header has-text-centered")
   const cardHeaderTitle= document.createElement("h2")
   
}







searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = searchInput.value;
    console.log(city);
    getWeather(city)
   
})