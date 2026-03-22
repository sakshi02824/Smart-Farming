import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { motion as Motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const res = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      if (res.data.role !== 'admin') {
        setError('Unauthorized: Administrative access required.');
        return;
      }

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center relative px-4">
      {/* Background Decor */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-200 rounded-full blur-[100px] opacity-20 -z-10 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-[120px] opacity-20 -z-10"></div>

      <Motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-white/40"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-white p-4 rounded-3xl shadow-xl border border-gray-100 mb-6 flex items-center justify-center">
            <ShieldCheck className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-4xl font-black text-gray-800 tracking-tight text-center leading-none">Admin <span className="text-emerald-600">Login</span></h2>
          <p className="text-gray-500 font-medium mt-2">Sign in to the control panel</p>
        </div>

        {error && (
          <Motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center space-x-3 text-sm font-bold"
          >
            <ShieldCheck size={18} />
            <span>{error}</span>
          </Motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Admin Email</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                <input 
                  type="email" required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smartharvest.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} required
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <Motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="w-full gradient-leaf text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
            <ArrowRight className="ml-2" />
          </Motion.button>
        </form>
        
        <div className="mt-10 text-center flex flex-col items-center space-y-4">
          <Link to="/login" className="flex items-center space-x-2 text-xs font-black text-gray-400 hover:text-emerald-600 uppercase tracking-widest transition-colors group">
            <User size={14} className="group-hover:scale-110 transition-transform" />
            <span>Return to Standard Login</span>
          </Link>
        </div>
      </Motion.div>
    </div>
  );
};

export default AdminLogin;
