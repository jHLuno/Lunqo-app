import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import lunqoLogo from '../Lunqo-white.png';

const ScrollNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.solutions'), href: '#solutions' }, 
    { name: t('nav.analytics'), href: '#analytics' },
    { name: t('nav.advantages'), href: '#advantages' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contactUs'), href: '#footer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleDemoClick = () => {
    window.open(t('urls.demo'), '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-40 bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50"
        >
          <div className="container-custom px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <img
                  src={lunqoLogo}
                  alt="Lunqo Logo"
                  className="w-8 h-8"
                />
                <span className="ml-2 text-white font-semibold text-lg">Lunqo</span>
              </motion.div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="nav-link text-sm"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                className="btn-primary text-sm py-2 px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoClick}
              >
                {t('nav.bookDemo')}
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default ScrollNavbar; 