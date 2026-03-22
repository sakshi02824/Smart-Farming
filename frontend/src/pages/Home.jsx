import React from 'react';
import { Link } from 'react-router-dom';
import { CloudRain, Leaf, BookOpen, LineChart, ArrowRight, Zap, Target, ShieldCheck, Sprout, Droplets, Wheat } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="space-y-32 py-12">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-[4rem] shadow-2xl mx-2 md:mx-6">
        <div className="absolute inset-0 z-0 scale-105">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2600" 
            alt="Lush Rice Terraces" 
            className="w-full h-full object-cover blur-[1px] animate-pulse-slow"
          />
        </div>
        
        <div className="relative z-20 text-center text-white px-6 max-w-5xl">
          <Motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-10"
          >
            <div className="bg-white/20 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/40 shadow-2xl group cursor-pointer hover:bg-white/30 transition-all duration-500">
              <img src="/logo.png" alt="SmartFarm Logo" className="h-28 w-28 object-contain animate-float drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" />
            </div>
          </Motion.div>
          
          <Motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-black mb-8 tracking-tighter drop-shadow-2xl leading-[0.95] drop-shadow-emerald"
          >
            Smart <span className="text-emerald-400">Harvest</span>
          </Motion.h1>
          
          <Motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-3xl text-white/95 max-w-3xl mx-auto font-black mb-14 drop-shadow-lg leading-tight uppercase tracking-widest italic"
          >
            Elite Agriculture Hub • AI Powered Yield • Climate Intelligence
          </Motion.p>
          
          <Motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <Link to="/recommend" className="group bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl shadow-emerald-900/40 transition-all flex items-center border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1">
              <span>Predict Your Crop</span>
              <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
            </Link>
            <Link to="/weather" className="glass bg-white/10 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-white/20 transition-all border border-white/40 backdrop-blur-md">
              Climate Radar
            </Link>
          </Motion.div>
        </div>

        {/* Floating Icons for Decoration */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-4 opacity-50">
          <Droplets className="text-white animate-bounce-slow" size={32} />
          <Sprout className="text-white animate-bounce-slow delay-100" size={32} />
          <Wheat className="text-white animate-bounce-slow delay-200" size={32} />
        </div>
      </section>

      {/* Trust & Stats with Logo */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
           <h2 className="text-5xl font-black text-gray-800 tracking-tighter leading-tight">
             Revolutionizing <span className="text-emerald-600">Land Intelligence</span> for Modern Farmers
           </h2>
           <p className="text-lg text-gray-500 font-medium leading-relaxed">
             Our neural patterns analyze 20+ crop types, soil pH intensities, and seasonal shifts. We provide elite data architectures to ensure a bountiful harvest despite changing climate patterns.
           </p>
           <div className="grid grid-cols-2 gap-8">
              <StatCard value="98.2%" label="Neural Accuracy" />
              <StatCard value="2.4M" label="Data Points" />
           </div>
        </Motion.div>
        
        <Motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="relative">
           <div className="absolute inset-0 gradient-leaf blur-[100px] opacity-20 -z-10"></div>
           <div className="bg-white p-16 rounded-[4rem] shadow-2xl border border-gray-100 flex items-center justify-center transform hover:rotate-2 transition-transform duration-500">
              <img src="/logo.png" alt="SmartFarm Visual Identity" className="w-64 h-64 object-contain animate-float" />
           </div>
        </Motion.div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-16 py-12">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-6xl font-black text-gray-800 mb-6 tracking-tighter">Precision Ecosystem</h2>
          <p className="text-gray-500 text-xl font-medium tracking-tight">Access elite modules designed for data-driven cultivation.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 max-w-[90rem] mx-auto">
          <FeatureCard 
            icon={<CloudRain className="h-14 w-14 text-blue-500" />}
            title="Climate Engine"
            description="High-frequency atmospheric sync with real-time solar path tracking."
            link="/weather"
            delay={0.1}
          />
          <FeatureCard 
            icon={<Leaf className="h-14 w-14 text-emerald-500" />}
            title="ML Predictor"
            description="Random Forest algorithm trained on N-P-K soil dynamics."
            link="/recommend"
            delay={0.2}
          />
          <FeatureCard 
            icon={<BookOpen className="h-14 w-14 text-amber-500" />}
            title="Cultivation Vault"
            description="Exhaustive repository for irrigation, seed genetics, and pest control."
            link="/guides"
            delay={0.3}
          />
          <FeatureCard 
            icon={<LineChart className="h-14 w-14 text-indigo-500" />}
            title="Yield Analytics"
            description="Comparative visual intelligence mapping your harvest trends."
            link="/analytics"
            delay={0.4}
          />
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ value, label }) => (
  <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex flex-col gap-1 items-start">
    <span className="text-3xl font-black text-gray-800 tracking-tighter">{value}</span>
    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</span>
  </div>
);

const FeatureCard = ({ icon, title, description, link, delay }) => (
  <Motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <Link to={link} className="block group h-full">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 border border-gray-50 flex flex-col items-center text-center relative overflow-hidden h-full group-hover:-translate-y-4">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12 rotate-y-180 group-hover:scale-150 duration-700">
           {icon}
        </div>
        <div className="bg-gray-50/50 rounded-[2.5rem] w-28 h-28 flex items-center justify-center mb-10 group-hover:bg-white group-hover:scale-110 shadow-inner group-hover:shadow-2xl transition-all duration-700">
          {icon}
        </div>
        <h3 className="text-3xl font-black mb-4 text-gray-800 tracking-tight">{title}</h3>
        <p className="text-gray-500 leading-relaxed font-black text-sm uppercase tracking-wide px-4">{description}</p>
        <div className="mt-10 flex items-center text-emerald-600 font-black text-sm opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500 bg-emerald-50 px-6 py-2 rounded-full">
          Launch Module <ArrowRight className="ml-3 h-4 w-4" />
        </div>
      </div>
    </Link>
  </Motion.div>
);

export default Home;
