import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Wind, Droplets, ThermometerSun, Sun, Cloud, CloudRain } from 'lucide-react';

const WeatherDashboard = () => {
  const [city, setCity] = useState(localStorage.getItem('preferredCity') || 'Mumbai');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:8005/api/weather/?city=${searchCity}`);
      setWeatherData(res.data);
      localStorage.setItem('preferredCity', searchCity);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      fetchWeather(searchInput);
      setSearchInput('');
    }
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return <Sun className="h-16 w-16 text-yellow-500" />;
    const c = condition.toLowerCase();
    if (c.includes('rain')) return <CloudRain className="h-16 w-16 text-blue-500" />;
    if (c.includes('cloud')) return <Cloud className="h-16 w-16 text-gray-400" />;
    return <Sun className="h-16 w-16 text-yellow-500" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Weather Monitoring</h1>
          <p className="text-gray-500 mt-2">Real-time climate data for smart farming decisions</p>
        </div>
        
        <form onSubmit={handleSearch} className="mt-4 md:mt-0 flex w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search city..." 
            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition">
            Search
          </button>
        </form>
      </div>

      {loading && <div className="text-center py-12 text-gray-500 font-semibold text-lg">Loading weather data...</div>}
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">{error}</div>}

      {weatherData && !loading && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
            <div className="absolute opacity-10 top-0 right-0 -mr-8 -mt-8">
              {getWeatherIcon(weatherData.weather_condition)}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-blue-100 mb-8">
                <MapPin className="h-5 w-5" />
                <span className="text-xl font-medium">{weatherData.city}</span>
              </div>
              
              <div className="mb-8">
                <span className="text-6xl font-black">{weatherData.temperature}°C</span>
                <p className="text-2xl mt-2 font-light capitalize">{weatherData.weather_condition}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-blue-400 pt-6">
                <div className="flex items-center space-x-3">
                  <Wind className="h-6 w-6 text-blue-200" />
                  <div>
                    <p className="text-sm text-blue-200">Wind</p>
                    <p className="font-semibold">{weatherData.wind_speed} m/s</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Droplets className="h-6 w-6 text-blue-200" />
                  <div>
                    <p className="text-sm text-blue-200">Humidity</p>
                    <p className="font-semibold">{weatherData.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>
            {weatherData.mocked && (
               <div className="mt-4 text-xs bg-black bg-opacity-30 p-2 rounded text-center">
                 Using mocked data. Add openweathermap API key in backend.
               </div>
            )}
          </div>

          {/* Forecast Cards */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">5-Day Forecast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {weatherData.forecast && weatherData.forecast.map((day, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis mb-3">
                    {day.day || new Date(day.date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})}
                  </p>
                  <div className="flex justify-center mb-3">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{day.temp}°</p>
                  <p className="text-sm text-gray-500 capitalize">{day.condition}</p>
                </div>
              ))}
            </div>
            
            {/* Quick Climate Insight */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 mt-8">
              <div className="flex items-start space-x-4">
                <ThermometerSun className="h-8 w-8 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Farming Insight</h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Based on current humidity ({weatherData.humidity}%) and temperature ({weatherData.temperature}°C), 
                    {weatherData.temperature > 30 ? " consider increasing irrigation frequency to prevent heat stress on crops." : " conditions are optimal for general crop development."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
