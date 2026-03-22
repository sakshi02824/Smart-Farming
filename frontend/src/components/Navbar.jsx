import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-300" />
            <span className="font-bold text-xl tracking-tight">SmartFarm</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition-colors">Home</Link>
            <Link to="/weather" className="hover:text-green-200 transition-colors">Weather</Link>
            <Link to="/recommend" className="hover:text-green-200 transition-colors">Crop ML</Link>
            <Link to="/guides" className="hover:text-green-200 transition-colors">Guides</Link>
            <Link to="/analytics" className="hover:text-green-200 transition-colors">Analytics</Link>
            {isAuthenticated && <Link to="/admin" className="hover:text-green-200 transition-colors">Admin</Link>}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-green-600 hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-1 bg-white text-green-700 hover:bg-green-100 px-4 py-2 rounded-md font-medium transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
