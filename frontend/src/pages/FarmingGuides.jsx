import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Search, Filter } from 'lucide-react';

const FarmingGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchGuides();
  }, [search]);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8005/api/guides/farming-guide${search ? `?crop=${search}` : ''}`);
      setGuides(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <BookOpen className="h-8 w-8 mr-4 text-green-600" /> Farming Guides
          </h1>
          <p className="text-gray-500 mt-3 text-lg">Comprehensive cultivation techniques for optimal yield.</p>
        </div>
        <div className="mt-6 md:mt-0 relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search crop..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading guides...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="bg-green-600 text-white p-6 justify-between items-center relative overflow-hidden">
                <div className="relative z-10 text-2xl font-bold uppercase tracking-wider">{guide.crop}</div>
                <div className="absolute right-0 top-0 opacity-10 transform scale-150 -translate-y-4">
                  <BookOpen size={100} />
                </div>
              </div>
              <div className="p-6 space-y-4 flex-grow text-sm text-gray-600 bg-gray-50">
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="font-bold text-gray-800 block mb-1">Soil Prep</span>
                  {guide.soil_preparation}
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="font-bold text-gray-800 block mb-1">Seed Select</span>
                  {guide.seed_selection}
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="font-bold text-gray-800 block mb-1">Irrigation</span>
                  {guide.irrigation_method}
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="font-bold text-gray-800 block mb-1">Fertilizer</span>
                  {guide.fertilizer_usage}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmingGuides;
