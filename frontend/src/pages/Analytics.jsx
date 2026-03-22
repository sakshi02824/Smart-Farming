import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Activity } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight inline-flex items-center">
          <Activity className="h-10 w-10 mr-4 text-purple-600" /> Climate Analytics
        </h1>
        <p className="text-gray-500 mt-3 text-lg">Historical trends for informed agricultural planning</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Temperature Trend */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Annual Temperature Trend (°C)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip cursor={{stroke: '#f97316', strokeWidth: 2}} contentStyle={{borderRadius: '10px'}} />
                <Area type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rainfall Analysis */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Rainfall (mm)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip cursor={{fill: '#eff6ff'}} contentStyle={{borderRadius: '10px'}} />
                <Bar dataKey="rain" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity Overlay */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Temperature vs Humidity</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip contentStyle={{borderRadius: '10px'}} />
                <Legend iconType="circle" />
                <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#f97316" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
