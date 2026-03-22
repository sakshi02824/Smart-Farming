import React, { useState } from 'react';
import api from '../api/api';
import { ShieldCheck, Plus, CheckCircle } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('guides');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [guideData, setGuideData] = useState({
    crop: '', soil_preparation: '', seed_selection: '', 
    irrigation_method: '', fertilizer_usage: '', pest_control: '', harvesting_time: ''
  });

  const [alertData, setAlertData] = useState({
    type: '', severity: 'Medium', message: ''
  });

  const handleGuideSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/guides', guideData);
      setSuccessMsg('Guide added successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      setGuideData({crop: '', soil_preparation: '', seed_selection: '', irrigation_method: '', fertilizer_usage: '', pest_control: '', harvesting_time: ''});
    } catch (err) {
      console.error(err);
      alert('Error adding guide. Check if you have admin rights.');
    }
  };

  const handleAlertSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/alerts', alertData);
      setSuccessMsg('Alert added successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      setAlertData({type: '', severity: 'Medium', message: ''});
    } catch (err) {
      console.error(err);
      alert('Error adding alert. Check if you have admin rights.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center mb-8 bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
        <ShieldCheck className="h-12 w-12 text-yellow-500 mr-4" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-gray-400">Manage farming guides and broadway alerts.</p>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button 
          className={`px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'guides' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-green-50'}`}
          onClick={() => setActiveTab('guides')}
        >
          Add Farming Guide
        </button>
        <button 
          className={`px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'alerts' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-red-50'}`}
          onClick={() => setActiveTab('alerts')}
        >
          Generate Weather Alert
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl flex items-center font-medium">
          <CheckCircle className="mr-2 h-5 w-5" /> {successMsg}
        </div>
      )}

      {activeTab === 'guides' && (
        <form onSubmit={handleGuideSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">New Crop Guide</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Name</label>
            <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              value={guideData.crop} onChange={e => setGuideData({...guideData, crop: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Soil Preparation</label>
              <textarea required rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={guideData.soil_preparation} onChange={e => setGuideData({...guideData, soil_preparation: e.target.value})}></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Seed Selection</label>
              <textarea required rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={guideData.seed_selection} onChange={e => setGuideData({...guideData, seed_selection: e.target.value})}></textarea>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Irrigation Method</label>
              <textarea required rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={guideData.irrigation_method} onChange={e => setGuideData({...guideData, irrigation_method: e.target.value})}></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fertilizer Usage</label>
              <textarea required rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={guideData.fertilizer_usage} onChange={e => setGuideData({...guideData, fertilizer_usage: e.target.value})}></textarea>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pest Control</label>
              <textarea required rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={guideData.pest_control} onChange={e => setGuideData({...guideData, pest_control: e.target.value})}></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Harvesting Time</label>
              <textarea required rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={guideData.harvesting_time} onChange={e => setGuideData({...guideData, harvesting_time: e.target.value})}></textarea>
            </div>
          </div>
          <button type="submit" className="flex items-center justify-center w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-md transition-colors">
            <Plus className="mr-2" /> Publish Guide
          </button>
        </form>
      )}

      {activeTab === 'alerts' && (
        <form onSubmit={handleAlertSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Broadcast Alert</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Alert Type (e.g., Heavy Rainfall, Heatwave)</label>
            <input required type="text" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              value={alertData.type} onChange={e => setAlertData({...alertData, type: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Severity Level</label>
            <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              value={alertData.severity} onChange={e => setAlertData({...alertData, severity: e.target.value})}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea required rows="4" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              value={alertData.message} onChange={e => setAlertData({...alertData, message: e.target.value})}></textarea>
          </div>
          <button type="submit" className="flex items-center justify-center w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md transition-colors">
            Broadcast Alert
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
