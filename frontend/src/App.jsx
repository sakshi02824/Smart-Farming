import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WeatherDashboard from './pages/WeatherDashboard';
import CropRecommendation from './pages/CropRecommendation';
import FarmingGuides from './pages/FarmingGuides';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-green-50 text-gray-800 font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/weather" element={<WeatherDashboard />} />
            <Route path="/recommend" element={<CropRecommendation />} />
            <Route path="/guides" element={<FarmingGuides />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
