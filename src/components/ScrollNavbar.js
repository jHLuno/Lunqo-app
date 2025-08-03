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

  // Fetch reach count
  useEffect(() => {
    const fetchReachCount = async () => {
      try {
        const response = await fetch('/api/v1/reach/today');
        if (response.ok) {
          const data = await response.json();
          setReachCount(data.count || 21532);
        }
      } catch (error) {
        console.log('Using fallback reach count');
      }
    };

    fetchReachCount();
    // Update every 30 seconds
    const interval = setInterval(fetchReachCount, 30000);
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
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-dark-900/95 backdrop-blur-md border border-dark-700/50 rounded-2xl shadow-2xl px-6 py-4 max-w-4xl mx-4">
              <div className="flex items-center justify-center space-x-8">
                {/* Left: Live Reach Counter */}
                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-primary-blue" />
                  <span className="text-dark-300">Live Reach:</span>
                  <span className="font-bold text-white">
                    {formatNumber(reachCount)} impressions today
                  </span>
                </div>

                {/* Center: Get Early Access Button */}
                <motion.button
                  className="btn-primary text-sm py-2 px-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                >
                  Get Early Access
                </motion.button>

                {/* Right: Trust Badges Ticker */}
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className="flex items-center space-x-3 animate-scroll-left">
                    {[...trustBadges, ...trustBadges].map((badge, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-dark-300 whitespace-nowrap">
                        <img
                          src={badge.logo}
                          alt={badge.name}
                          className="w-5 h-5 object-contain"
                        />
                        <span>{badge.name}</span>
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
                  className="w-full btn-primary py-3"
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