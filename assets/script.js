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
   cardHeaderTitle.setAttribute("class","card-title")
   cardHeaderTitle.textContent=data.cityName
   const span = document.createElement("span")
   const icon = document.createElement("img")
   icon.setAttribute("src","https://openweathermap.org/img/w/" + data.weather[0].icon + ".png" )

   //card body
   const cardBody=document.createElement("div")
   cardBody.setAttribute("class", "card-body main-body")
   const temp= document.createElement("p")
      const humidity= document.createElement("p")
      const wind =document.createElement("p")
      const span1=document.createElement("span")
      span1.setAttribute("class","labels")
      const span2=document.createElement("span")
      span2.setAttribute("class","labels")
      const span3=document.createElement("span")
      span3.setAttribute("class","labels")
      span1.textContent="Temperature"
      temp.textContent=`${data.main.temp} F`
      span2.textContent="Humidity: "
      humidity.textContent= `${data.main.humidity} %`
      span3.textContent="Wind Speed: "
      wind.textContent= `${data.wind.speed} MPH`

      //ELEMENTS
      span.append(icon)
      cardHeaderTitle.append(span)
      cardHeader.append(cardHeaderTitle)
      temp.prepend(span1)
      humidity.prepend(span2)
      wind.prepend(span3)
      cardBody.append(cardHeader,cardBody)
      currentWeather.append(card)
}

function displayForecast(data){

    forecastEL.innerHTML=""

    for (let i= 0; i< 5; i++) {

        const card= document.createElement("div")
        
    }
}






searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = searchInput.value;
    console.log(city);
    getWeather(city)
   
})