import React, { useState, useEffect } from 'react';
import { Search, Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Weather App</h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            className="w-full py-3 px-4 pr-12 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-300 text-center">{error}</p>}
        {weather && (
          <div className="text-white">
            <h2 className="text-3xl font-semibold mb-4">{weather.name}, {weather.sys.country}</h2>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-20 h-20"
                />
                <span className="text-5xl ml-4">{Math.round(weather.main.temp)}°C</span>
              </div>
              <div className="text-right">
                <p className="text-xl capitalize">{weather.weather[0].description}</p>
                <p className="text-sm">Feels like: {Math.round(weather.main.feels_like)}°C</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white bg-opacity-20 rounded-xl p-3">
                <Thermometer className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">High / Low</p>
                <p className="font-semibold">{Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-3">
                <Droplets className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Humidity</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-3">
                <Wind className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Wind Speed</p>
                <p className="font-semibold">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;