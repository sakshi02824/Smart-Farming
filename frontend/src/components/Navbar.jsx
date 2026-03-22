import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, LayoutDashboard, Cloud, Leaf, BookOpen, BarChart3, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name') || 'User';
  const initial = name.charAt(0).toUpperCase();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setShowLogoutModal(false);
    setShowDropdown(false);
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <LayoutDashboard size={18} /> },
    { path: '/weather', label: 'Weather', icon: <Cloud size={18} /> },
    { path: '/recommend', label: 'Crop ML', icon: <Leaf size={18} /> },
    { path: '/guides', label: 'Guides', icon: <BookOpen size={18} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full glass border-b border-white/20 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group text-decoration-none">
          <Motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl border border-gray-100 overflow-hidden p-1.5"
          >
            <img src="/logo.png" alt="SmartHarvest" className="w-full h-full object-contain drop-shadow-sm" />
          </Motion.div>
          <span className="text-3xl font-black text-gray-800 tracking-tighter group-hover:text-emerald-600 transition-colors">
            Smart<span className="text-emerald-500">Harvest</span>
          </span>
        </Link>
        
        {/* Nav Links */}
        <div className="hidden lg:flex items-center space-x-1 bg-gray-100/50 p-1 rounded-2xl border border-gray-200/50">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path}
                className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {isActive && (
                  <Motion.div 
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
          {role === 'admin' && (
            <Link 
              to="/admin" 
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                location.pathname === '/admin' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-500 hover:text-yellow-600'
              }`}
            >
              <ShieldCheck size={18} />
              <span>Admin Dashboard</span>
            </Link>
          )}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <div className="flex items-center space-x-2 cursor-pointer bg-white border border-gray-100 p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-all group">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-700 flex items-center justify-center rounded-full font-black font-outfit shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {initial}
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-700 transition-colors hidden sm:block">{name}</span>
                  <ChevronDown size={14} className={`text-gray-400 group-hover:text-emerald-600 transition-all ${showDropdown ? 'rotate-180' : ''}`} />
                </div>
              </div>
              
              <AnimatePresence>
                {showDropdown && (
                  <Motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-[999] overflow-hidden origin-top-right"
                  >
                    <div className="px-5 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Signed in as</p>
                      <p className="text-sm font-black text-emerald-900 truncate">{name}</p>
                    </div>
                    
                    <div className="px-2 py-1 space-y-1">
                      <Link to="/profile" className="flex items-center space-x-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors">
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <button 
                        onClick={() => { setShowDropdown(false); setShowLogoutModal(true); }}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                      >
                        <LogOut size={16} />
                        <span>System Logout</span>
                      </button>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/login"
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 transition-all"
              >
                <User size={16} />
                <span>Login</span>
              </Link>
            </Motion.div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal - Portaled to absolute center */}
      {createPortal(
        <AnimatePresence>
          {showLogoutModal && (
            <Motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <Motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl max-w-sm w-full border border-gray-100 text-center"
              >
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <LogOut size={32} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">System Logout</h3>
                <p className="text-gray-500 font-medium mb-8">Are you sure you want to terminate your current session?</p>
                
                <div className="flex flex-col space-y-3">
                  <Motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-500/30 transition-all font-outfit tracking-wide"
                  >
                    Yes, Log Out
                  </Motion.button>
                  <Motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutModal(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl transition-all font-outfit"
                  >
                    Cancel
                  </Motion.button>
                </div>
              </Motion.div>
            </Motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
