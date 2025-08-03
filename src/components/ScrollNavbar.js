import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import lunqoLogo from '../Lunqo-white.png';

const ScrollNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useLanguage();

  // Memoized nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { name: t('nav.solutions'), href: '#solutions' }, 
    { name: t('nav.analytics'), href: '#analytics' },
    { name: t('nav.advantages'), href: '#advantages' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contactUs'), href: '#footer' },
  ], [t]);

  // Simplified scroll handler - removed isVisible from dependencies
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Debug logging
    console.log('Scroll detected:', { currentScrollY, lastScrollY });
    
    // Show navbar when scrolling up (current scroll < last scroll)
    // Only show if we've scrolled down at least 50px first
    if (currentScrollY < lastScrollY && currentScrollY > 50) {
      console.log('Setting navbar visible');
      setIsVisible(true);
    } else {
      console.log('Setting navbar hidden');
      setIsVisible(false);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]); // Removed isVisible from dependencies

  useEffect(() => {
    console.log('ScrollNavbar mounted, adding scroll listener');
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      console.log('ScrollNavbar unmounting, removing scroll listener');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Handle demo button click
  const handleDemoClick = () => {
    window.open(t('urls.demo'), '_blank', 'noopener,noreferrer');
  };

  // Memoized motion variants for better performance
  const navbarVariants = useMemo(() => ({
    hidden: { 
      y: 100,
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      y: 100,
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    }
  }), []);

  const logoVariants = useMemo(() => ({
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2, ease: "easeInOut" }
  }), []);

  const navLinkVariants = useMemo(() => ({
    whileHover: { y: -2 },
    transition: { duration: 0.2, ease: "easeInOut" }
  }), []);

  const buttonVariants = useMemo(() => ({
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.15, ease: "easeInOut" }
  }), []);

  console.log('ScrollNavbar rendering, isVisible:', isVisible);

  // TEMPORARY: Always show for testing
  const shouldShow = true; // isVisible;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[99999] gpu-accelerated" style={{ zIndex: 99999 }}>
      {/* Glass Effect Container */}
      <div className="glass-effect px-6 py-3 rounded-full shadow-2xl border border-dark-700/50 backdrop-blur-xl">
        <div className="flex items-center justify-between w-full max-w-[600px]">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="whileHover"
            className="flex items-center gpu-accelerated flex-shrink-0"
          >
            <img
              src={lunqoLogo}
              alt="Lunqo Logo"
              className="w-8 h-8"
              loading="eager"
              decoding="async"
              style={{ transform: 'translateZ(0)' }}
            />
          </motion.div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-6 mx-4">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="nav-link gpu-accelerated text-center text-sm font-medium"
                variants={navLinkVariants}
                whileHover="whileHover"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="btn-primary gpu-accelerated text-sm px-4 py-2"
            variants={buttonVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            onClick={handleDemoClick}
          >
            {t('nav.bookDemo')}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ScrollNavbar); 