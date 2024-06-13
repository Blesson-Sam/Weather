const selectBtn1=document.querySelector('.your-head');
const selectBtn2=document.querySelector('.search-head');
const selection1=document.querySelector('.your-weather');
const selection2=document.querySelector('.search-weather');
const city=document.querySelector("[current-location]");
const cCloud=document.querySelector("[current-cloud]");
const temp=document.querySelector("[temp]");
const wind=document.querySelector("[wind]");
const humi=document.querySelector("[humi]");
const cloud=document.querySelector("[cloud]");

// search 

const scity=document.querySelector("[s-current-location]");
const scCloud=document.querySelector("[s-current-cloud]");
const stemp=document.querySelector("[s-temp]");
const swind=document.querySelector("[s-wind]");
const shumi=document.querySelector("[s-humi]");
const scloud=document.querySelector("[s-cloud]");

const searchCity=document.querySelector(".searchbar");
const searchBtn=document.querySelector(".searchBtn");

const smoreDetail=document.querySelector(".s-more-detail");



selectBtn1.addEventListener("click", () =>{
    yourWeather();
})

selectBtn2.addEventListener("click", () =>{
    selectWeather();
    clearSearchResults();
})

function yourWeather()
{
    selection2.classList.remove('active2');
    selection2.classList.add('hidden');
    selection1.classList.remove('hidden');
    selection1.classList.add('active1');
    smoreDetail.classList.remove('detail');
    smoreDetail.classList.add('hidden');

}

function selectWeather()
{
    selection1.classList.remove('active1');
    selection1.classList.add('hidden');
    selection2.classList.remove('hidden');
    selection2.classList.add('active2');

}


window.addEventListener("load", (event) => {
    selection1.classList.add('active1');
    // selection2.classList.add('active2');
    getLocation();
 });
 
 function getLocation() {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition);
     } else { 
         alert("Geolocation is not supported by this browser.");
     }
 }
 function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
 
 let latitude;
 let longitude;
 function showPosition(position) {
    latitude=position.coords.latitude;
    longitude=position.coords.longitude
    showWeather();

}


function clearSearchResults() {
    searchCity.value="";
    scity.innerText = "";
    scCloud.innerText = "";
    stemp.innerText = "";
    swind.innerText = "";
    shumi.innerText = "";
    scloud.innerText = "";
}


const API_KEY = "9d1fca36bdb4e82d766cbe7d0a528690";
 
async function showWeather() {
    

 
     const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
     const data = await response.json();
     console.log(data);
     render(data);
}

function render(data)
{
    console.log(data.name);
    city.innerText=data.name;
    cCloud.innerText=data.weather[0].description;
    temp.innerText=`${(data.main.temp - 273.15).toFixed(2)}°C`;
    wind.innerText="Wind : "+data.wind.speed+"m/s";
    humi.innerText="Humidity : "+data.main.humidity+"%";
    cloud.innerText="Cloud : "+data.clouds.all+"%";

}

let getCity;
searchBtn.addEventListener("click", () =>{
    
    smoreDetail.classList.remove('hidden');
    smoreDetail.classList.add('detail');
    getCity=searchCity.value;
    fetchCity();
})

async function fetchCity() {
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getCity}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    setData(data);
}
function setData(data)
{
    console.log(data.coord.lon);
    scity.innerText=data.name;
    scCloud.innerText=data.weather[0].description;
    stemp.innerText=`${(data.main.temp - 273.15).toFixed(2)}°C`;
    swind.innerText="Wind = "+data.wind.speed+"m/s";
    shumi.innerText="Humidity : "+data.main.humidity+"%";
    scloud.innerText="Cloud : "+data.clouds.all+"%";
}

