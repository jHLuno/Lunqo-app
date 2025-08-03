import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Users, TrendingUp } from 'lucide-react';

const ScrollNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [reachCount, setReachCount] = useState(21532);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  // Trust badges with actual logo
  const trustBadges = [
    { name: 'Yandex Taxi', logo: '/images/Yandex_Go_icon.png' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show bottom rail when scrolling up
      if (currentScrollY < lastScrollY && currentScrollY > 200) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY || currentScrollY < 200) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Auto-increment reach count every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setReachCount(prev => prev + Math.floor(Math.random() * 30) + 20); // Add 20-50 views
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormData({ name: '', phone: '' });
        setShowForm(false);
        alert('Thank you! You\'ve been added to the waitlist.');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center"
          >
            <div className="bg-dark-900/95 backdrop-blur-md border border-dark-700/50 rounded-2xl shadow-2xl w-11/12 sm:w-10/12 md:w-auto md:max-w-5xl px-4 py-3 mx-auto md:mx-4">
              <div className="relative flex items-center justify-between space-x-4 md:space-x-8 w-full md:w-auto">
                {/* Left: Live Reach Counter */}
                <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-base flex-shrink-0">
                  <TrendingUp className="w-3 h-3 md:w-5 md:h-5 text-primary-blue flex-shrink-0" />
                  <div className="flex items-center space-x-1">
                    <span className="text-dark-300 text-xs md:text-sm hidden md:inline">Live:</span>
                    <span className="font-bold text-white text-xs md:text-base">
                      {formatNumber(reachCount)}
                    </span>
                    <span className="text-dark-300 text-xs md:text-sm">views</span> 
                  </div>
                </div>

                {/* Center: Get Early Access Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.button
                    className="relative py-2 px-4 md:px-6 text-xs md:text-base font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 rounded-xl"
                    style={{
                      border: '2px solid transparent',
                      borderRadius: '12px',
                      background:
                        'linear-gradient(rgba(13, 17, 23, 0.95), rgba(13, 17, 23, 0.95)) padding-box, ' +
                        'linear-gradient(to right, #18A0FB, #59FF70, #FF7A45) border-box'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(true)}
                  >
                    <span className="bg-gradient-to-r from-primary-blue via-primary-lime to-primary-orange bg-clip-text text-transparent">
                      <span className="hidden md:inline">Get Early Access</span>
                      <span className="md:hidden">Get Access</span>
                    </span>
                  </motion.button>
                </div>

                {/* Right: Trust Badges Ticker */}
                <div className="flex items-center space-x-2 md:space-x-4 overflow-hidden flex-shrink-0">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    {trustBadges.map((badge, index) => (
                      <div key={index} className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-dark-300 whitespace-nowrap">
                        <img
                          src={badge.logo}
                          alt={badge.name}
                          className="w-4 h-4 md:w-6 md:h-6 object-contain flex-shrink-0"
                        />
                        <span className="hidden md:inline">{badge.name}</span>
                        <span className="md:hidden">Yandex</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Early Access Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 border border-dark-700 rounded-2xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Get Early Access</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-dark-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-blue transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-blue transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-blue via-primary-lime to-primary-orange text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollNavbar; 