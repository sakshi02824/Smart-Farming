import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { motion as Motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, ShieldCheck, Cpu } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile intelligence.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">Synchronizing Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-red-500 font-bold glass p-8 rounded-3xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <Motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
           <Cpu size={14} /> Identity Matrix
        </div>
        <h1 className="text-5xl font-black text-gray-800 tracking-tighter leading-none">
          Commander <span className="text-emerald-600">Profile</span>
        </h1>
      </Motion.div>

      <Motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-[3.5rem] p-10 md:p-14 border border-white/40 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
            <User size={200} />
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-2">
          
          <div className="space-y-2 bg-white/50 p-6 rounded-3xl border border-gray-100 shadow-sm group hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <User size={16} /> Identity Designation
            </div>
            <p className="text-2xl font-black text-gray-800 tracking-tight">{profile?.name || 'Unknown'}</p>
          </div>

          <div className="space-y-2 bg-white/50 p-6 rounded-3xl border border-gray-100 shadow-sm group hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <Mail size={16} /> Comms Channel (Email)
            </div>
            <p className="text-lg font-bold text-gray-600">{profile?.email || 'N/A'}</p>
          </div>

          <div className="space-y-2 bg-white/50 p-6 rounded-3xl border border-gray-100 shadow-sm group hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <Phone size={16} /> Direct Link (Mobile)
            </div>
            <p className="text-xl font-bold text-gray-700 font-mono tracking-widest">{profile?.phone || 'N/A'}</p>
          </div>

          <div className="space-y-2 bg-white/50 p-6 rounded-3xl border border-gray-100 shadow-sm group hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-4">
                <MapPin size={16} /> Operation Sector (Location)
            </div>
            <p className="text-lg font-bold text-gray-700 capitalize">{profile?.farm_location || 'Classified Sector'}</p>
          </div>

        </div>

        <div className="mt-8 bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-3 text-gray-500 font-black uppercase tracking-widest text-xs">
              <ShieldCheck size={18} /> Clearance Level
           </div>
           <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-200 shadow-inner">
             {profile?.role === 'admin' ? 'Administrator' : 'Standard Operative'}
           </span>
        </div>
      </Motion.div>
    </div>
  );
};

export default Profile;
