import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { motion as Motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, MapPin, Phone } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }
    
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        phone,
        farm_location: farmLocation,
        password
      });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center relative px-4">
      {/* Background Decor */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-emerald-200 rounded-full blur-[100px] opacity-20 -z-10 animate-float"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-[100px] opacity-20 -z-10"></div>

      <Motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl glass rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-white/40"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 mb-6 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-4xl font-black text-gray-800 tracking-tight text-center leading-none">Join <span className="text-emerald-600">SmartHarvest</span></h2>
          <p className="text-gray-500 font-medium mt-2">Create your agricultural profile</p>
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

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type="text" required
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type="email" required
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@gmail.com"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Contact Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type="tel" required
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 90000 00000"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Farm Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type="text" required
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={farmLocation} onChange={(e) => setFarmLocation(e.target.value)}
                  placeholder="Punjab, India"
                />
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} required minLength={6}
                  className="w-full pl-11 pr-12 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 mb-2 block">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type={showConfirmPassword ? "text" : "password"} required minLength={6}
                  className="w-full pl-11 pr-12 py-4 rounded-2xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-gray-700"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <Motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="w-full gradient-leaf text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all flex items-center justify-center disabled:opacity-50 mt-4"
          >
            {loading ? 'Initializing...' : 'Construct Account'}
            <ArrowRight className="ml-2" />
          </Motion.button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 font-medium font-outfit">
            Already in the network? <Link to="/login" className="text-emerald-600 font-black hover:text-emerald-500 underline underline-offset-4">Sign In</Link>
          </p>
        </div>
      </Motion.div>
    </div>
  );
};

export default Register;
