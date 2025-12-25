async function getCurrentWheatherByCity(city){
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=12cd89bc6cf54f85a1c210433252412&q=${city}&aqi=no`)
    const currentWheather = await data.json()
    return currentWheather
}

const locationInput = document.querySelector('.location-input')

async function getForecastByCity(city){
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=12cd89bc6cf54f85a1c210433252412&q=${city}&days=1&aqi=no&alerts=no`)
    const forecast = await data.json()
    return forecast
}

const locationButton = document.querySelector('.location-button')

locationButton.addEventListener('click', async () => {
    const locationInputValue = locationInput.value
    const currentWheather = await getCurrentWheatherByCity(locationInputValue) 
    const forecast = await getForecastByCity(locationInputValue)

    const currentWheatherIcon = `http:${currentWheather.current.condition.icon}`
    const currentWheatherTemperature = currentWheather.current.temp_c
    const currentWheatherStatus = currentWheather.current.condition.text

    resetWeatherApp()
    renderCurrentWheather(currentWheatherIcon, currentWheatherTemperature, currentWheatherStatus)
    renderForecast(forecast.forecast.forecastday[0].hour)
})

function renderCurrentWheather(iconSrc, temperature, status){
    const currentWheatherIconEl = document.createElement('img')
    currentWheatherIconEl.setAttribute('class', 'current-weather-icon')
    currentWheatherIconEl.setAttribute('src', iconSrc)
    
    const currentWeatherTemperatureEl = document.createElement('p')
    currentWeatherTemperatureEl.setAttribute('class', 'current-weather-temperature')
    currentWeatherTemperatureEl.innerHTML = temperature

    const currentWheatherStatusEl = document.createElement('p')
    currentWheatherStatusEl.setAttribute('class', 'current-weather-status')
    currentWheatherStatusEl.innerHTML = status

    const currentWeather = document.querySelector('.current-weather')
    currentWeather.appendChild(currentWheatherIconEl)
    currentWeather.appendChild(currentWeatherTemperatureEl)
    currentWeather.appendChild(currentWheatherStatusEl)

    return currentWeather
}

function createForecastElement(iconSrc, time, temperature){
    const forecastElement = document.createElement('div')
    forecastElement.setAttribute('class', 'forecast-element')

    const forecastTime = document.createElement('p')
    forecastTime.setAttribute('class', 'forecast-time')
    forecastTime.innerHTML = time.slice(11)

    const forecastIcon = document.createElement('img')
    forecastIcon.setAttribute('class', 'forecast-icon')
    forecastIcon.setAttribute('src', `http:${iconSrc}`)

    const forecastTtemperature = document.createElement('p')
    forecastTtemperature.setAttribute('class', 'forecast-temperature')
    forecastTtemperature.innerHTML = temperature

    forecastElement.appendChild(forecastTime)
    forecastElement.appendChild(forecastIcon)
    forecastElement.appendChild(forecastTtemperature)

    return forecastElement

}

function renderForecast(forecast){
    const forecastContainer = document.querySelector('.forecast')

    forecast.forEach(forecastItem => {
        const forecastElement = createForecastElement(forecastItem.condition.icon, forecastItem.time, forecastItem.temp_c)
        forecastContainer.appendChild(forecastElement)
    })
}

function resetWeatherApp(){
    const currentWeather = document.querySelector('.current-weather')
    currentWeather.innerHTML = ""

    const forecastContainer = document.querySelector('.forecast')
    forecastContainer.innerHTML = ""
}



