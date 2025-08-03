import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import lunqoLogo from '../Lunqo-white.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { t, language, changeLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: t('nav.solutions'), href: '#solutions' }, 
    { name: t('nav.analytics'), href: '#analytics' },
    { name: t('nav.advantages'), href: '#advantages' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contactUs'), href: '#footer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/(en|ru)/, `/${newLanguage}`);
    navigate(newPath);
    setIsLanguageMenuOpen(false);
  };

  const handleDemoClick = () => {
    window.open(t('urls.demo'), '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center items-start pt-4"
    >
      {/* Glass Effect Container */}
      <div className={`mx-4 px-8 py-4 rounded-full transition-all duration-300 w-full max-w-[1200px] lg:min-w-[800px] ${
        isScrolled 
          ? 'glass-effect border border-dark-700/50 shadow-lg' 
          : 'bg-dark-800/30 backdrop-blur-sm border border-dark-700/30'
      }`}>
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center flex-shrink-0"
          >
            <img
              src={lunqoLogo}
              alt="Lunqo Logo"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              loading="eager"
            />
          </motion.div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="nav-link text-center"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Language Switcher and CTA Button */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                className="flex items-center space-x-2 text-white hover:text-primary-blue transition-colors duration-200"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </motion.button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-dark-800 border border-dark-700 rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      language === 'en' ? 'bg-primary-blue/20 text-primary-blue' : 'text-white hover:bg-dark-700'
                    }`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </button>
                  <button
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      language === 'ru' ? 'bg-primary-blue/20 text-primary-blue' : 'text-white hover:bg-dark-700'
                    }`}
                    onClick={() => handleLanguageChange('ru')}
                  >
                    Русский
                  </button>
                </motion.div>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDemoClick}
            >
              {t('nav.bookDemo')}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-effect rounded-xl mt-4"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block nav-link py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-4 py-2">
                <span className="text-dark-300 text-sm">Language:</span>
                <button
                  className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                    language === 'en' ? 'bg-primary-blue text-white' : 'bg-dark-700 text-white hover:bg-dark-600'
                  }`}
                  onClick={() => handleLanguageChange('en')}
                >
                  EN
                </button>
                <button
                  className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                    language === 'ru' ? 'bg-primary-blue text-white' : 'bg-dark-700 text-white hover:bg-dark-600'
                  }`}
                  onClick={() => handleLanguageChange('ru')}
                >
                  RU
                </button>
              </div>
              
              <button 
                className="w-full btn-primary mt-4"
                onClick={handleDemoClick}
              >
                {t('nav.bookDemo')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 