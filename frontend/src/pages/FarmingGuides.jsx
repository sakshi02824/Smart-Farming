import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { BookOpen, Search, Sparkles, Navigation, ChevronRight, Info, Sprout } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const FarmingGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/guides/farming-guide${search ? `?crop=${search}` : ''}`);
        setGuides(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-16">
      <Motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-10"
      >
        <div>
          <span className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
             Knowledge Repository
          </span>
          <h1 className="text-6xl font-black text-gray-800 tracking-tighter leading-none">
            Cultivation <span className="text-emerald-600">Vault</span>
          </h1>
          <p className="text-gray-500 mt-4 text-xl font-medium">Expert-curated intelligence for high-density agricultural yields.</p>
        </div>
        
        <div className="relative group w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search Intelligence Base..." 
            className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <Motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40 space-y-6">
             <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
             <p className="text-emerald-600 font-black tracking-widest uppercase text-xs">Accessing Encrypted Knowledge</p>
          </Motion.div>
        ) : (
          <Motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {guides.length > 0 ? guides.map((guide, idx) => (
              <Motion.div 
                key={idx} 
                whileHover={{ y: -10 }}
                className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col group relative"
              >
                <div className="gradient-leaf p-10 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                       <Sprout size={24} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">{guide.crop}</h2>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Growth Protocol v1.4</p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/2 translate-y-1/2 rotate-12">
                    <BookOpen size={200} />
                  </div>
                </div>
                
                <div className="p-8 space-y-6 flex-grow bg-gray-50/50">
                  <GuideItem label="Soil Prep" content={guide.soil_preparation} icon={<Navigation size={14} className="text-emerald-500" />} />
                  <GuideItem label="Seed Logic" content={guide.seed_selection} icon={<Sparkles size={14} className="text-emerald-500" />} />
                  <GuideItem label="Irrigation" content={guide.irrigation_method} icon={<ChevronRight size={14} className="text-emerald-500" />} />
                  <GuideItem label="Nurture" content={guide.fertilizer_usage} icon={<Info size={14} className="text-emerald-500" />} />
                </div>
                
                <div className="px-8 pb-8 pt-2">
                   <button className="w-full py-4 rounded-2xl bg-gray-100 text-gray-400 font-black text-xs uppercase tracking-[0.2em] group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                      Expand Full Dossier
                   </button>
                </div>
              </Motion.div>
            )) : (
              <div className="lg:col-span-3 py-40 text-center glass rounded-[3rem] border border-gray-100 italic font-bold text-gray-400">
                 No agricultural patterns found for your search.
              </div>
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GuideItem = ({ label, content, icon }) => (
  <div className="relative group/item">
    <div className="flex items-center gap-2 mb-2">
       <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">{icon}</div>
       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-sm font-medium text-gray-600 leading-relaxed border-l-2 border-emerald-100 pl-4 py-1 group-hover/item:border-emerald-500 transition-colors">
      {content}
    </p>
  </div>
);

export default FarmingGuides;
