import React, { useState } from 'react';
import api from '../api/api';
import { Leaf, Droplets, Thermometer, Wind, Zap, Target, Sparkles, ChevronRight, BrainCircuit, FlaskConical, Navigation, Info } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/ml/recommend-crop', {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Neural processing failed. Please verify metric convergence.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-16 mt-8">
      <Motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
           <BrainCircuit size={14} /> Neural Precision
        </div>
        <h1 className="text-6xl font-black text-gray-800 tracking-tighter leading-none">
          Satellite <span className="text-emerald-600">Intelligence</span>
        </h1>
        <p className="text-gray-500 mt-4 text-xl font-medium max-w-2xl mx-auto italic">Neuro-atmospheric processing for soil-to-seed compatibility mapping.</p>
      </Motion.div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Input Dashboard */}
        <Motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 glass rounded-[3.5rem] p-10 md:p-14 border border-white/40 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
             <Leaf size={200} />
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
            <div className="grid md:grid-cols-2 gap-10">
               <InputGroup title="Mineral Matrix" icon={<FlaskConical className="text-emerald-500" />}>
                  <InputField label="Nitrogen (N)" value={formData.N} onChange={v => setFormData({...formData, N: v})} placeholder="20-140" />
                  <InputField label="Phosphorus (P)" value={formData.P} onChange={v => setFormData({...formData, P: v})} placeholder="5-145" />
                  <InputField label="Potassium (K)" value={formData.K} onChange={v => setFormData({...formData, K: v})} placeholder="5-205" />
               </InputGroup>

               <InputGroup title="Atmospheric Data" icon={<Wind className="text-blue-500" />}>
                  <InputField label="Temp (°C)" value={formData.temperature} onChange={v => setFormData({...formData, temperature: v})} placeholder="10-45" />
                  <InputField label="Humidity (%)" value={formData.humidity} onChange={v => setFormData({...formData, humidity: v})} placeholder="15-100" />
                  <InputField label="Rainfall (mm)" value={formData.rainfall} onChange={v => setFormData({...formData, rainfall: v})} placeholder="20-300" />
               </InputGroup>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100">
               <header className="mb-6 flex items-center justify-between px-2">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Bio-Chemical Soil pH</span>
                  <Target size={16} className="text-emerald-500" />
               </header>
               <InputField label="pH Intensity" value={formData.ph} onChange={v => setFormData({...formData, ph: v})} placeholder="3.5 - 9.9" />
            </div>

            {error && (
               <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase text-center border border-red-100 italic">
                  Critical Error: {error}
               </Motion.div>
            )}

            <Motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full gradient-leaf text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                 <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Synchronized Data...</span>
                 </div>
              ) : (
                <div className="flex items-center gap-3">
                   <span>Execute Neural Prediction</span>
                   <ChevronRight />
                </div>
              )}
            </Motion.button>
          </form>
        </Motion.div>

        {/* Prediction Results */}
        <div className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            {result ? (
              <Motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="gradient-leaf rounded-[4rem] p-12 text-white shadow-[0_50px_100px_-20px_rgba(16,185,129,0.3)] min-h-[600px] relative overflow-hidden flex flex-col items-center justify-center text-center py-20"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <Motion.div 
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="bg-white/20 backdrop-blur-3xl p-10 rounded-[3.5rem] mb-10 border border-white/30 shadow-2xl group"
                >
                  <Sparkles size={80} className="animate-pulse" />
                </Motion.div>
                
                <h2 className="text-2xl font-black uppercase tracking-[0.3em] mb-4 opacity-70">Optimal Output</h2>
                <Motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-8xl font-black tracking-tighter leading-none mb-10 drop-shadow-2xl capitalize shadow-emerald-900"
                >
                  {result.recommended_crop}
                </Motion.div>
                
                <div className="bg-black/20 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 w-full shadow-inner">
                  <p className="text-white/80 font-bold leading-loose italic text-lg">
                    "Intelligence suggests {result.recommended_crop} matches the atmospheric flux and mineral density of your field."
                  </p>
                </div>
                
                <Motion.button 
                   whileHover={{ scale: 1.1 }}
                   onClick={() => setResult(null)}
                   className="mt-12 text-white/50 hover:text-white font-black uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
                >
                   <Zap size={14} /> Reset Analytical Stream
                </Motion.button>
              </Motion.div>
            ) : (
              <Motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-[4rem] border-2 border-dashed border-gray-200 h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 opacity-50 space-y-6 shadow-inner"
              >
                <div className="bg-gray-100 p-8 rounded-[2.5rem]">
                  <BrainCircuit size={80} className="text-gray-300 animate-pulse-slow" />
                </div>
                <h3 className="text-3xl font-black text-gray-400 tracking-tight">Intelligence Idle</h3>
                <p className="text-gray-400 font-medium max-w-xs mx-auto">Input soil and climate parameters to initialize the prediction sequence.</p>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ title, icon, children }) => (
  <div className="space-y-6">
    <header className="flex items-center gap-3">
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">{icon}</div>
      <h3 className="text-xl font-black text-gray-800 tracking-tight">{title}</h3>
    </header>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 group-focus-within:text-emerald-500 transition-colors">{label}</label>
    <div className="relative">
      <input 
        type="number" step="any" required
        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700 shadow-inner group-hover:border-emerald-200"
        value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default CropRecommendation;
