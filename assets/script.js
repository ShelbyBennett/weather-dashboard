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

let searchHistory=JSON.parse(localStorage.getItem("history"))|| []
console.log(searchHistory)
for(let i=0; i<searchHistory.length;i++){
    getHistory(searchHistory[i])
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
        card.setAttribute("class", "card forecast-card")

        //header for city name
        const cardHeader=document.createElement("div")
        cardHeader.setAttribute("class", "card-header has-text-centered")
        const cardHeaderTitle= document.createElement("h5")
        cardHeaderTitle.setAttribute("class", "card-title ")

        //converting the time
        const day= new Date(data[forIn].dt*1000).toDateString()
      cardHeaderTitle.textContent=day
      const span = document.createElement("span")
      const icon= document.createElement("img")
      icon.setAttribute("src","https://openweathermap.org/img/w/" + data[forIn].weather[0].icon + ".png" )
  
      //card body rest of infor
      const cardBody=document.createElement("div")
      cardBody.setAttribute("class","card-body")
      const span1=document.createElement("span")
      span1.setAttribute("class","labels")
      const span2=document.createElement("span")
      span2.setAttribute("class","labels")
      const span3=document.createElement("span")
      span3.setAttribute("class","labels")
      span1.textContent="Temperature: "
      const temp= document.createElement("p")
      span2.textContent="Humidity: "
      const humidity= document.createElement("p")
      span3.textContent="Wind Speed: "
      const wind =document.createElement("p")
      temp.textContent=` ${data[forIn].main.temp} F`
      humidity.textContent= ` ${data[forIn].main.humidity} %`
      wind.textContent= ` ${data[forIn].wind.speed} MPH`

      //all elements
      span.append(icon)
      cardHeaderTitle.append(span)
      cardHeader.append(cardHeaderTitle)
      temp.prepend(span1)
      humidity.prepend(span2)
      wind.prepend(span3)
      cardBody.append(temp,humidity,wind)
      card.append(cardHeader,cardBody)
      forecastEL.append(card)
    }
}
//allow searched citites to be saved in local storage
const storage=(city)=>{ 
    searchHistory=JSON.parse(localStorage.getItem("history"))||[]
    if(!cityArray.includes(city) && !searchHistory.includes(city)){
        console.log(cityArray);
        cityArray.push(city)
        // console.log(cityArray, "before get item")
        localStorage.setItem("history",JSON.stringify(cityArray))
        getHistory(city)
        
    } 
}



searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = searchInput.value;
    console.log(city);
    getWeather(city)

    storage(city)
   
})
//event listener for btns
historyContainer.addEventListener("click",(e)=>{
    e.preventDefault()
    currentWeather.innerHTML=""
    forecastEL.innerHTML=""
    const cityClick= this.event.target.value
    console.log(cityClick);
    getWeather(cityClick)
})