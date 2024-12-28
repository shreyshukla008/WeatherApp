const APIkey = "ae8fb4012189aa8e6b86120e1ec58305";

const currentWeather = document.body.querySelector('#your-weather-button');
const searchWeather = document.body.querySelector('#search-weather-button');

const currentLocationButton = document.body.querySelector('#grant-location-access');

const layoutCurrent = document.body.querySelector('.layout1');
const layoutSearch = document.body.querySelector('.layout2');

const layoutOneDefault = document.body.querySelector('#layout1-default');

const layoutTwoReport = document.body.querySelector('#layout2-report');

const inputButton = document.getElementById('locationSearchButton');
const inputField = document.getElementById('locationIP');

//dummy template
const layoutTwoDummy = document.body.querySelector('#layout2-dummy');

const loaderIcon = document.body.querySelector("#loader");

const currentWeatherButton = document.body.querySelector("#your-weather-button");

const searchWeatherButton = document.body.querySelector("#search-weather-button");

//layout2 variables
const layoutTwoLocationName = document.body.querySelector('#location-name-layout2');
const layoutTwoLocationIcon = document.body.querySelector('#location-icon-layout2');    
const layoutTwoWeatherStatus = document.body.querySelector('#weather-status-layout2');
const layoutTwoWeatherIcon = document.body.querySelector('#weather-icon-layout2');
const layoutTwoLocationTemperature = document.body.querySelector('#location-temperature-layout2');
const layoutTwoWeatherCards = document.body.querySelector('#weather-cards-layout2');
const layoutTwoWindSpeedPara = document.body.querySelector('#wind-speed-para-layout2');
const layoutTwoWindSpeedIcon = document.body.querySelector('#wind-speed-icon-layout2');
const layoutTwoHumidity = document.body.querySelector('#humidity-layout2');
const layoutTwoHumidityIcon = document.body.querySelector('#humidity-icon-layout2');
const layoutTwoHumidityPara = document.body.querySelector('#humidity-para-layout2');
const layoutTwoCloudsIcon = document.body.querySelector('#clouds-icon-layout2');
const layoutTwoColoudsPara = document.body.querySelector('#clouds-para-layout2');

const errorMsg = document.body.querySelector("#layout2-error");



let classCurrent = layoutCurrent.classList;
let classSearch = layoutSearch.classList;



currentWeather.addEventListener('click', () => {

    classSearch.add('hidden');
    classSearch.remove('visible');

    searchWeatherButton.classList.remove('active-button');
    currentWeatherButton.classList.remove('active-button');
    currentWeatherButton.classList.add('active-button');

    loaderIcon.classList.add('visible');
    loaderIcon.classList.remove('hidden');


    layoutTwoDummy.classList.remove('visible');
    layoutTwoDummy.classList.add('hidden');

    layoutTwoReport.classList.remove('visible');
    layoutTwoReport.classList.add('hidden');

    layoutOneDefault.classList.add('visible');
    layoutOneDefault.classList.remove('hidden');

    loaderIcon.classList.remove('visible');
    loaderIcon.classList.add('hidden');

    classCurrent.remove('hidden');
    classCurrent.add('visible');


});


searchWeather.addEventListener('click', () => {

    classCurrent.add('hidden');
    classCurrent.remove('visible');

    searchWeatherButton.classList.remove('active-button');
    searchWeatherButton.classList.add('active-button');
    currentWeatherButton.classList.remove('active-button');
    
    loaderIcon.classList.add('visible');
    loaderIcon.classList.remove('hidden');

    

    layoutTwoDummy.classList.add('visible');
    layoutTwoDummy.classList.remove('hidden');

    layoutTwoReport.classList.remove('visible');
    layoutTwoReport.classList.add('hidden');

    layoutOneDefault.classList.remove('visible');
    layoutOneDefault.classList.add('hidden');

    loaderIcon.classList.remove('visible');
    loaderIcon.classList.add('hidden');

    classSearch.remove('hidden');
    classSearch.add('visible');

    

});



async function getLatLon(cityName){

    try{
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`);
        const result = await response.json();

        if(!result[0].name){
            throw new Error("City Not Found!");
        }

        let latitude = result[0].lat;
        let longitude = result[0].lon;
        return {latitude, longitude};
        
    }

    catch(error){
        return "error found";
    }
    
}


async function getWeather(city) {

    city = city.toLowerCase();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    
        try{

            let info = await getLatLon(city);

            if(typeof info === 'string'){
               throw new Error("City Not Found!");
            }
            
            else{

                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${info.latitude}&lon=${info.longitude}&appid=${APIkey}&units=metric`);
                const data = await response.json();

                if(!data.weather[0].main){
                    throw new Error("City Not Found!");
                }
            
                layoutTwoLocationName.innerText = city;
                layoutTwoLocationIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
                layoutTwoWeatherStatus.innerText = data.weather[0].main;
                layoutTwoWeatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
                layoutTwoLocationTemperature.innerText = data.main.temp + " °C";
                layoutTwoWindSpeedPara.innerText = data.wind.speed + " M/S";
                layoutTwoHumidityPara.innerText = data.main.humidity + " %";
                layoutTwoColoudsPara.innerText = data.clouds.all + " %";
            
                let classLists = layoutTwoReport.classList;
                classLists.remove('hidden');
                classLists.add('visible');
                return true
                
            }

        }
        catch(error){
            return  false;
        }
        
}
    
let renderWeather = async function (){

    layoutTwoDummy.classList.remove('visible');
    layoutTwoDummy.classList.add('hidden');

    errorMsg.classList.remove('visible');
    errorMsg.classList.add('hidden');

    layoutTwoReport.classList.remove('visible');
    layoutTwoReport.classList.add('hidden');

    loaderIcon.classList.remove('hidden');
    loaderIcon.classList.add('visible');

    let cityName = inputField.value;
    inputField.value = null ; 

    let response = await getWeather(cityName);

    try{
        if(response){
            loaderIcon.classList.remove('visible');
            loaderIcon.classList.add('hidden');
        }

        else{

            throw new Error("City Not Found!");
        }
    }
    catch(error){
        
        loaderIcon.classList.remove('visible');
        loaderIcon.classList.add('hidden');

        errorMsg.classList.remove('hidden');
        errorMsg.classList.add('visible');
    }
}


 
////  IMPORTANT  porb in try catch   ////

inputButton.addEventListener('click', async(event) => {
     renderWeather();
});

inputField.addEventListener('keypress', async(event) => {
    if (event.key === 'Enter') {
        renderWeather();
    }
})



  
//// FUNCTION TO GIVE CURRENT LOCATION TEMP

  currentLocationButton.addEventListener('click', ()=>{

    

       if( window.confirm("Allow to share current location!")){

        //async function currentLocationAccess(){
            async function success_current_location_access(pos) {

                layoutOneDefault.classList.remove('visible');
                layoutOneDefault.classList.add('hidden');

                loaderIcon.classList.remove('hidden');
                loaderIcon.classList.add('visible');

                layoutCurrent.classList.remove('visible');
                layoutCurrent.classList.add('hidden');

                

                const crd = pos.coords;
                const lat = Math.round(crd.latitude*100) / 100;
                const lon = Math.round(crd.longitude*100) / 100;
                
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`);
                const data = await response.json();

                layoutTwoLocationName.innerText = data.name;
                layoutTwoLocationIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
                layoutTwoWeatherStatus.innerText = data.weather[0].main;
                layoutTwoWeatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
                layoutTwoLocationTemperature.innerText = data.main.temp + " °C";
                layoutTwoWindSpeedPara.innerText = data.wind.speed + " M/S";
                layoutTwoHumidityPara.innerText = data.main.humidity + " %";
                layoutTwoColoudsPara.innerText = data.clouds.all + " %";
            
                let classLists = layoutTwoReport.classList;

                loaderIcon.classList.add('hidden');
                loaderIcon.classList.remove('visible');

                classLists.remove('hidden');
                classLists.add('visible');
                
              }
              
              async function error_current_location_access(err) {
                window.alert(`ERROR(${err.code}): ${err.message}`);
              }
    
             navigator.geolocation.getCurrentPosition(success_current_location_access, error_current_location_access);
        //}

       }
       else{
        window.alert("Access denied");
       }
       
        
  });
