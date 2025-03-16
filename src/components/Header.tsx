
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl bg-career-blue-500 flex items-center justify-center text-white font-bold shadow-lg"
          >
            CN
          </motion.div>
          <span className="text-xl font-display font-medium tracking-tight">CareerNavigator</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "relative font-medium text-sm transition-colors duration-200 py-2",
                location.pathname === link.path
                  ? "text-career-blue-600"
                  : "text-gray-700 hover:text-career-blue-500"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-career-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link 
            to="/assessment" 
            className="hidden md:inline-flex btn-primary text-sm"
          >
            Start Assessment
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md",
                  location.pathname === link.path
                    ? "bg-career-blue-50 text-career-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/assessment" 
              className="btn-primary text-center"
              onClick={closeMenu}
            >
              Start Assessment
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
