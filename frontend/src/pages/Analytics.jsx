import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, CloudRain, ThermometerSun, Sparkles } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const mockData = [
  { name: 'Jan', temp: 22, rain: 50, humidity: 65 },
  { name: 'Feb', temp: 24, rain: 30, humidity: 60 },
  { name: 'Mar', temp: 28, rain: 20, humidity: 55 },
  { name: 'Apr', temp: 32, rain: 10, humidity: 45 },
  { name: 'May', temp: 35, rain: 40, humidity: 50 },
  { name: 'Jun', temp: 33, rain: 150, humidity: 75 },
  { name: 'Jul', temp: 29, rain: 200, humidity: 85 },
  { name: 'Aug', temp: 28, rain: 180, humidity: 82 },
  { name: 'Sep', temp: 29, rain: 120, humidity: 75 },
  { name: 'Oct', temp: 27, rain: 60, humidity: 65 },
  { name: 'Nov', temp: 24, rain: 20, humidity: 60 },
  { name: 'Dec', temp: 21, rain: 10, humidity: 62 },
];

const Analytics = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-16">
      <Motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-purple-100">
           <Sparkles size={14} /> Neural Data Stream
        </span>
        <h1 className="text-6xl font-black text-gray-800 tracking-tighter flex items-center justify-center gap-4">
          Visual <span className="text-purple-600">Intelligence</span>
        </h1>
        <p className="text-gray-500 mt-4 text-xl font-medium max-w-2xl mx-auto">Analyzing deep-soil moisture and atmospheric patterns across the seasonal timeline.</p>
      </Motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Temperature Trend */}
        <Motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }}
          className="glass rounded-[3rem] p-10 border border-white/40 shadow-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <ThermometerSun className="text-orange-500" /> Thermal Index
            </h2>
            <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-xl text-[10px] font-bold">ANNUAL °C</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px'}}
                />
                <Area type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>

        {/* Rainfall Analysis */}
        <Motion.div 
          initial={{ opacity: 0, x: 30 }} 
          whileInView={{ opacity: 1, x: 0 }}
          className="glass rounded-[3rem] p-10 border border-white/40 shadow-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <CloudRain className="text-blue-500" /> Hydrology Flow
            </h2>
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-xl text-[10px] font-bold">MONTHLY MM</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} contentStyle={{borderRadius: '24px', border: 'none'}} />
                <Bar dataKey="rain" fill="#3b82f6" radius={[12, 12, 12, 12]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>

        {/* High Precision Overlay */}
        <Motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-[3.5rem] p-12 border border-white/40 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-12">
             <div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">Global Equilibrium Map</h2>
                <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-2">Correlating Humidity vs Thermal Flux</p>
             </div>
             <div className="bg-emerald-50 text-emerald-600 p-4 rounded-3xl"><TrendingUp size={32} /></div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="5 5" stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontWeight: 700, fill: '#64748b'}} />
                <YAxis yAxisId="left" axisLine={false} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} />
                <Tooltip contentStyle={{borderRadius: '24px', padding: '16px', border: 'none'}} />
                <Legend iconType="circle" />
                <Line yAxisId="left" type="monotone" dataKey="temp" name="Heat Index" stroke="#f97316" strokeWidth={5} dot={{ r: 6, fill: '#f97316', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 10 }} />
                <Line yAxisId="right" type="monotone" dataKey="humidity" name="Moisture Content" stroke="#10b981" strokeWidth={5} dot={{ r: 6, fill: '#10b981', strokeWidth: 4, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>

      </div>
    </div>
  );
};

export default Analytics;
