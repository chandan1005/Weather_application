const apiKey = '90f45d47b08fb4bc4b8d307fc0dfc59e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const container=document.querySelector(".container");
const body=document.querySelector("body");
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const latitude=document.querySelector(".lat");
const longtitude=document.querySelector(".lon");
const weatherdeatils=document.querySelector(".hide");
const error1=document.querySelector(".error");
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
        // weatherdeatils.classList.add("hide");
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            locationElement.textContent =`Location: ${data.name}, ${(data.sys.country)}`;
            latitude.textContent=`latitude:  ${data.coord.lat}`;
            longtitude.textContent=`Longtitude: ${data.coord.lon}`;
            temperatureElement.textContent = `temperature: ${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = `Clouds:  ${data.weather[0].description}`;
            if(data.main.temp>23){
                container.classList.add("sun");
                container.classList.remove("rain");
                body.classList.add("sunb");
                body.classList.remove("rainb");
            }
            else{
                container.classList.add("rain");
                container.classList.remove("sun");
                body.classList.add("rainb");
                body.classList.remove("sunb");
            }
            weatherdeatils.classList.remove("hide");
            error1.classList.add("error");
        })
        .catch(error => {
            error1.innerText='Error fetching weather data:', error;
            error1.classList.remove("error");
            weatherdeatils.classList.add("hide");
        });
}
