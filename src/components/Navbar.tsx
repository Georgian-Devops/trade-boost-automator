
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-trader-black bg-opacity-80 backdrop-blur-lg shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-trader-blue to-trader-lightBlue flex items-center justify-center">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
            <span className="text-xl font-bold text-trader-black dark:text-white animate-fade-in">
              CrazeTrader
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="#wallet" className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
              Trade
            </Link>
            <Link to="/market" className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
              Market
            </Link>
            <Link to="/portfolio" className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
              Portfolio
            </Link>
            <Link to="/about" className="text-trader-darkGray dark:text-trader-gray hover:text-trader-blue dark:hover:text-trader-lightBlue transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-trader-gray dark:bg-trader-darkGray bg-opacity-50 dark:bg-opacity-50 transition-colors hover:bg-opacity-70 dark:hover:bg-opacity-70"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            <button 
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors button-glow"
            >
              <span>Connect Wallet</span>
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-trader-gray bg-opacity-50 transition-colors hover:bg-opacity-70"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-trader-black bg-opacity-95 dark:bg-opacity-95 backdrop-blur-lg animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="px-4 py-3 text-trader-darkGray dark:text-trader-gray hover:bg-trader-gray hover:bg-opacity-20 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trade
            </Link>
            <Link 
              to="/market" 
              className="px-4 py-3 text-trader-darkGray dark:text-trader-gray hover:bg-trader-gray hover:bg-opacity-20 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Market
            </Link>
            <Link 
              to="/portfolio" 
              className="px-4 py-3 text-trader-darkGray dark:text-trader-gray hover:bg-trader-gray hover:bg-opacity-20 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-3 text-trader-darkGray dark:text-trader-gray hover:bg-trader-gray hover:bg-opacity-20 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <button 
              className="mt-2 px-4 py-3 bg-trader-blue hover:bg-trader-darkBlue text-white rounded-lg transition-colors button-glow"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
