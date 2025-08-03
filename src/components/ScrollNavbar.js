import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import lunqoLogo from '../Lunqo-white.png';

const ScrollNavbar = () => {
  const { t } = useLanguage();

  // Simple nav items
  const navItems = [
    { name: t('nav.solutions'), href: '#solutions' }, 
    { name: t('nav.analytics'), href: '#analytics' },
    { name: t('nav.advantages'), href: '#advantages' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contactUs'), href: '#footer' },
  ];

  // Handle demo button click
  const handleDemoClick = () => {
    window.open(t('urls.demo'), '_blank', 'noopener,noreferrer');
  };

  console.log('ScrollNavbar rendering - ALWAYS VISIBLE');

  return (
    <div 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[99999] gpu-accelerated" 
      style={{ 
        zIndex: 99999,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(55, 65, 81, 0.5)',
        borderRadius: '9999px',
        padding: '12px 24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        minWidth: '400px',
        maxWidth: '600px'
      }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img
            src={lunqoLogo}
            alt="Lunqo Logo"
            className="w-8 h-8"
            style={{ transform: 'translateZ(0)' }}
          />
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center space-x-6 mx-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm"
              style={{ transform: 'translateZ(0)' }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
          onClick={handleDemoClick}
          style={{ transform: 'translateZ(0)' }}
        >
          {t('nav.bookDemo')}
        </button>
      </div>
    </div>
  );
};

export default ScrollNavbar; 