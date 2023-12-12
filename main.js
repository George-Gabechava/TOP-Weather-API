//Get Elements from page
const mySearchBar = document.getElementById("searchBarW");
const myButton = document.getElementById("findWeatherBtn");
myButton.addEventListener("click", getWeather);

async function getWeather(location){
    //search bar value
    location = String(mySearchBar.value);

    //If search bar is empty, get weather for NYC.
    if (location == '' || location == undefined) {
        location = 'new_york';
    }

    //Get Data from API
    try {
        const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3dc0446963c4461c96c162246230512&q=${location}`, {
            mode: 'cors'
        });
        const jsonData = await data.json();

        //Use Data for variables
        const tempF = jsonData.current.temp_f;
        const feelF = jsonData.current.feelslike_f;
        const tempC = jsonData.current.temp_c;
        const feelC = jsonData.current.feelslike_c;

        const humidity = jsonData.current.humidity;
        const condition = jsonData.current.condition.text;   //text - maybe for giphy

        const sunrise = jsonData.forecast.forecastday[0].astro.sunrise;
        const sunset = jsonData.forecast.forecastday[0].astro.sunset;

        const city = String(jsonData.location.name);
        const country = String(jsonData.location.country);

        //Display the data on page
        const currentCity = document.getElementById("currentCity");
        currentCity.innerText = `${city}, ${country}`;

        const docTempF = document.getElementById("tempF");
        docTempF.innerText = `${tempF}\u00B0F, feels like ${feelF}\u00B0F`;

        const docTempC = document.getElementById("tempC");
        docTempC.innerText = `${tempC}\u00B0C, feels like ${feelC}\u00B0C`;

        const docHumid = document.getElementById("humid");
        docHumid.innerText = "Humidity: " + humidity;

        const docCondition = document.getElementById("condition");
        docCondition.innerText = "Condition: " + condition;

        console.log("OG", condition);

        const docSunrise = document.getElementById("sun");
        docSunrise.innerText = "Sun: " + sunrise + " - " + sunset;

        getGif(condition);
    }
    //If Error
    catch(error) {
        console.log(error);
        getGif("error");
    }   

}

//Get Gif for Condition
const img = document.querySelector('img');

async function getGif(condition) {
    console.log(condition);
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=hvXblNAp9zDEpZdZE47lqN5gzpDAGTvy&s=${condition}`, {mode: 'cors'})
        const catData = await response.json();
        img.src = catData.data.images.original.url;


        return;

    
    // else {
    //   const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=hvXblNAp9zDEpZdZE47lqN5gzpDAGTvy&s=${currentSearchValue}`, {mode: 'cors'})
    //   const catData = await response.json();
    //   img.src = catData.data.images.original.url;

    //     if (searchAmount > 9) {
    //         document.body.append(" ok go back to studying >:) ");
    //     }
    // }
    }
    //If error
    catch(err) {
        console.log("Ruh Roh", err.name);
    }
};

getWeather();
