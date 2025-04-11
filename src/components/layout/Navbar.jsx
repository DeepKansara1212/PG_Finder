import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './../ui/button';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Home, Search, Heart, User, LogOut, MessageSquare, Calendar } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-xl font-bold text-primary">PG Finder</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                isActive('/properties') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Properties
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                isActive('/about') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/saved"
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                    isActive('/saved') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Saved
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-full h-full p-1" />
                      )}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/messages"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        Messages
                      </Link>
                      <Link
                        to="/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        Bookings
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t pt-2 pb-4 space-y-1 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
            onClick={closeMenu}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            to="/properties"
            className="flex items-center gap-2 text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
            onClick={closeMenu}
          >
            <Search className="h-5 w-5" />
            Properties
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
            onClick={closeMenu}
          >
            <span className="h-5 w-5 flex items-center justify-center">ℹ️</span>
            About
          </Link>
          
          {user ? (
            <>
              <Link
                to="/saved"
                className="flex items-center gap-2 text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
                onClick={closeMenu}
              >
                <Heart className="h-5 w-5" />
                Saved Properties
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
                onClick={closeMenu}
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
              <Link
                to="/messages"
                className="flex items-center gap-2 text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
                onClick={closeMenu}
              >
                <MessageSquare className="h-5 w-5" />
                Messages
              </Link>
              <Link
                to="/bookings"
                className="flex items-center gap-2 text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
                onClick={closeMenu}
              >
                <Calendar className="h-5 w-5" />
                Bookings
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center gap-2 w-full text-left text-gray-700 hover:bg-primary/10 hover:text-primary px-3 py-2 rounded-md"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 mt-4">
              <Link to="/login" onClick={closeMenu}>
                <Button variant="outline" className="w-full justify-center">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={closeMenu}>
                <Button className="w-full justify-center">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;