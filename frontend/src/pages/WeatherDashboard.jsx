import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { MapPin, Wind, Droplets, ThermometerSun, Sun, Cloud, CloudRain, Search, Sparkles, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      const res = await api.get(`/weather/?city=${searchCity}`);
      setWeatherData(res.data);
      localStorage.setItem('preferredCity', searchCity);
    } catch (err) {
      console.error(err);
      setError('Neural weather link failed. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      fetchWeather(searchInput);
      setSearchInput('');
    }
  };

  const getWeatherIcon = (condition, size = 24) => {
    if (!condition) return <Sun size={size} className="text-yellow-400" />;
    const c = condition.toLowerCase();
    if (c.includes('rain')) return <CloudRain size={size} className="text-blue-400" />;
    if (c.includes('cloud')) return <Cloud size={size} className="text-gray-400" />;
    return <Sun size={size} className="text-yellow-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-10 px-4">
      {/* Search & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-black text-gray-800 tracking-tighter flex items-center gap-4">
            Climate <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Intelligence</span>
          </h1>
          <p className="text-gray-500 font-medium mt-4 text-lg">Hyper-local precision forecasting for high-yield farming.</p>
        </motion.div>
        
        <form onSubmit={handleSearch} className="relative group w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search Global Cities..." 
            className="w-full pl-12 pr-32 py-4 rounded-2xl glass border border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold shadow-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 transition-all active:scale-95">
            Probe
          </button>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-blue-600 font-black tracking-widest uppercase text-xs">Syncing Satellite Data</p>
          </motion.div>
        ) : weatherData ? (
          <motion.div 
            key="data" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-10"
          >
            {/* Hero Weather Card */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 gradient-sky blur-3xl opacity-10 rounded-[3rem] -z-10 transition-opacity group-hover:opacity-20"></div>
              <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                
                <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 blur-sm">
                  {getWeatherIcon(weatherData.weather_condition, 300)}
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center space-x-3 bg-white/60 px-5 py-2.5 rounded-2xl border border-white/40 shadow-sm mb-12">
                    <Navigation className="text-blue-600" size={20} />
                    <span className="font-black text-gray-800 tracking-tight">{weatherData.city}</span>
                  </div>

                  <div className="space-y-4 mb-16">
                    <div className="flex items-end gap-2">
                       <span className="text-8xl font-black text-gray-800 tracking-tighter drop-shadow-sm">{weatherData.temperature}</span>
                       <span className="text-4xl font-black text-blue-500 mb-4 tracking-tighter">°C</span>
                    </div>
                    <p className="text-3xl font-medium text-gray-500 capitalize tracking-tight flex items-center gap-3">
                      {getWeatherIcon(weatherData.weather_condition, 32)}
                      {weatherData.weather_condition}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 relative z-10 pt-10 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Wind size={24} /></div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Wind Speed</p>
                      <p className="text-xl font-black text-gray-800">{weatherData.wind_speed} <span className="text-xs text-gray-400">m/s</span></p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Droplets size={24} /></div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Humidity</p>
                      <p className="text-xl font-black text-gray-800">{weatherData.humidity}<span className="text-xs text-gray-400">%</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast & Insight Column */}
            <div className="lg:col-span-7 space-y-10">
              <div className="glass rounded-[3rem] p-10 border border-white/40 shadow-xl relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-8 opacity-5">
                   <Cloud className="w-32 h-32" />
                </div>
                <h2 className="text-2xl font-black text-gray-800 mb-10 flex items-center gap-3">
                  <Sparkles className="text-yellow-500" />
                  5-Day Atmospheric Forecast
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {weatherData.forecast && weatherData.forecast.map((day, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ y: -5 }}
                      className="bg-white/40 border border-white/40 rounded-3xl p-6 text-center shadow-sm backdrop-blur-md"
                    >
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">
                        {day.day || new Date(day.date).toLocaleDateString('en-US', {weekday: 'short'})}
                      </p>
                      <div className="flex justify-center mb-4 transition-transform group-hover:scale-110">
                        {getWeatherIcon(day.condition, 32)}
                      </div>
                      <p className="text-2xl font-black text-gray-800 tracking-tighter">{day.temp}°</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Luxury Farming Insight */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="gradient-leaf p-[2px] rounded-[3rem] shadow-2xl"
              >
                <div className="bg-white rounded-[2.9rem] p-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-green-100 p-6 rounded-full shadow-inner shrink-0 scale-125 md:scale-100">
                    <ThermometerSun size={48} className="text-green-600" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-green-700 uppercase tracking-[0.4em]">Agricultural Strategy</h3>
                    <h4 className="text-2xl font-black text-gray-800 leading-tight">Climate-Optimized Suggestion</h4>
                    <p className="text-gray-500 font-medium leading-relaxed italic text-lg">
                      "At {weatherData.temperature}°C with {weatherData.humidity}% humidity, {weatherData.temperature > 30 ? "deployment of enhanced irrigation nodes is advised to mitigate evaporative stress." : "atmospheric conditions are synced perfectly for vegetative expansion."}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="p-20 text-center glass rounded-[3rem] border border-gray-100">
             <Cloud className="h-20 w-20 mx-auto text-gray-200 mb-6" />
             <p className="text-gray-400 font-bold text-lg italic">The atmosphere is quiet. Search a city to begin tracking.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherDashboard;
