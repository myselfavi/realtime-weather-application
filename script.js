const API_KEY = 'b0cee03bcc049bb372bff5c8c85a3511'; // Replace with your actual API key

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const loadingMessage = document.getElementById('loading');
const errorMessage = document.getElementById('error');
const weatherInfo = document.getElementById('weatherInfo');

function showLoading() {
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    weatherInfo.style.display = 'none';
}

function showError(message) {
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
    weatherInfo.style.display = 'none';
}

function showWeather(data) {
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    weatherInfo.style.display = 'block';

    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="weather-header">
            <div class="weather-main">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" class="weather-icon">
                <span class="temperature">${Math.round(data.main.temp)}°C</span>
            </div>
            <div class="weather-details">
                <p class="weather-description">${data.weather[0].description}</p>
                <p class="feels-like">Feels like: ${Math.round(data.main.feels_like)}°C</p>
            </div>
        </div>
        <div class="weather-stats">
            <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                <p class="stat-label">High / Low</p>
                <p class="stat-value">${Math.round(data.main.temp_max)}° / ${Math.round(data.main.temp_min)}°</p>
            </div>
            <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon"><path d="M12 2v6"></path><path d="M12 18v4"></path><path d="M4.93 10.93l1.41 1.41"></path><path d="M17.66 11.7l1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="M10.93 19.07l1.41-1.41"></path><path d="M11.7 6.34l1.41-1.41"></path></svg>
                <p class="stat-label">Humidity</p>
                <p class="stat-value">${data.main.humidity}%</p>
            </div>
            <div class="stat-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path></svg>
                <p class="stat-label">Wind Speed</p>
                <p class="stat-value">${data.wind.speed} m/s</p>
            </div>
        </div>
    `;
}

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    showLoading();

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        showWeather(data);
    } catch (err) {
        showError('Failed to fetch weather data. Please try again.');
    }
}

searchButton.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

// Hide loading and error messages initially
loadingMessage.style.display = 'none';
errorMessage.style.display = 'none';
weatherInfo.style.display = 'none';