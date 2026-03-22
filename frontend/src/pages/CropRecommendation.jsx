import React, { useState } from 'react';
import axios from 'axios';
import { Leaf, RefreshCcw } from 'lucide-react';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    rainfall: '',
    soil_type: 'loamy',
    ph_value: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to use this feature');
        return;
      }

      const res = await axios.post('http://localhost:8005/api/ml/recommend-crop', {
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        rainfall: parseFloat(formData.rainfall),
        soil_type: formData.soil_type,
        ph_value: parseFloat(formData.ph_value)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">AI Crop Recommender</h1>
        <p className="text-lg text-gray-600">Enter your soil and climate data to leverage our Random Forest model for the best crop selection.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        
        <div className="p-8 md:p-12 md:w-1/2 bg-gray-50 border-r border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Temperature (°C)</label>
                <input 
                  type="number" step="0.1" name="temperature" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                  value={formData.temperature} onChange={handleChange} placeholder="e.g. 25.5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Humidity (%)</label>
                <input 
                  type="number" step="0.1" name="humidity" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                  value={formData.humidity} onChange={handleChange} placeholder="e.g. 60"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rainfall (mm)</label>
                <input 
                  type="number" step="0.1" name="rainfall" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                  value={formData.rainfall} onChange={handleChange} placeholder="e.g. 150"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Soil pH Value</label>
                <input 
                  type="number" step="0.1" name="ph_value" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                  value={formData.ph_value} onChange={handleChange} placeholder="e.g. 6.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Soil Type</label>
              <select 
                name="soil_type"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                value={formData.soil_type} onChange={handleChange}
              >
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silt">Silt</option>
                <option value="peaty">Peaty</option>
                <option value="saline">Saline</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <><RefreshCcw className="animate-spin h-5 w-5 mr-3" /> Analyzing...</>
              ) : (
                'Generate Recommendation'
              )}
            </button>
          </form>
          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium">{error}</div>}
        </div>

        <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center bg-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Leaf className="w-full h-full" size={200} />
          </div>
          
          {result ? (
            <div className="w-full animate-fade-in relative z-10 text-center">
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-sm font-bold uppercase tracking-wide mb-4">
                Analysis Complete
              </span>
              <h2 className="text-gray-500 text-lg mb-2">Recommended Crop</h2>
              <div className="text-5xl font-black text-green-700 mb-6 drop-shadow-sm capitalize">
                {result.recommended_crop}
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6 text-left border border-green-100 shadow-sm">
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-2">Suitable Season</h4>
                  <p className="text-green-800 font-medium text-lg bg-white px-4 py-2 rounded-lg border border-green-200 inline-block">
                    {result.suitable_season}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-2">Reasoning Insight</h4>
                  <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-green-500 pl-4 py-1">
                    {result.reason}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Leaf className="h-24 w-24 mx-auto mb-6 opacity-20" />
              <p className="text-lg">Fill out the form to see AI-driven insights customized for your land.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
