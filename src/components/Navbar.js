import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import lunqoLogo from '../Lunqo-white.png';
import { t } from '../utils/localization';

// Throttle function for performance
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoized nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { name: t('navbar.features'), href: '#solutions' }, 
    { name: t('navbar.about'), href: '#analytics' },
    { name: t('navbar.contact'), href: '#advantages' },
  ], []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    }, 16), // ~60fps throttling
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Memoized motion variants for better performance
  const navVariants = useMemo(() => ({
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
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

  const mobileMenuVariants = useMemo(() => ({
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3, ease: "easeInOut" }
  }), []);

  return (
    <motion.nav
      initial="initial"
      animate="animate"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-accelerated ${
        isScrolled 
          ? 'glass-effect border-b border-dark-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="whileHover"
            className="flex items-center gpu-accelerated"
          >
            <img
              src={lunqoLogo}
              alt="Lunqo Logo"
              className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20"
              loading="eager"
              decoding="async"
              style={{ transform: 'translateZ(0)' }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="nav-link gpu-accelerated"
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
            className="hidden lg:block btn-primary gpu-accelerated"
            variants={buttonVariants}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            {t('hero.cta.demo')}
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white gpu-accelerated"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden glass-effect rounded-xl mt-4 mb-4 gpu-accelerated"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block nav-link py-2 gpu-accelerated"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full btn-primary mt-4 gpu-accelerated">
                {t('hero.cta.demo')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default React.memo(Navbar); 