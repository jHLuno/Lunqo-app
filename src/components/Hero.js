import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, MapPin, Grid3X3, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePopup } from '../App';

const Hero = () => {
  const { t } = useLanguage();
  const { openPopup } = usePopup();

  const stats = [
    { label: t('hero.stats.fleetsServed'), value: '500+' },
    { label: t('hero.stats.dailyImpressions'), value: '2.5M+' },
    { label: t('hero.stats.citiesCovered'), value: '25+' },
    { label: t('hero.stats.uptime'), value: '99.9%' }
  ];

  const handleDemoClick = () => {
    const url = t('urls.demo');
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWatchClick = () => {
    const url = t('urls.website') + '/overview';
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEarlyAccessClick = () => {
    openPopup();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-near-black via-charcoal to-dark-900">
        {/* Static Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(24, 160, 251, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(89, 255, 112, 0.1) 0%, transparent 50%)`,
              backgroundSize: '100px 100px, 150px 150px'
            }} 
          />
        </div>

        {/* Creative Decorative Elements - Optimized for Performance */}
        
        {/* Animated Geometric Screens - Reduced to 2 instead of 8 */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-10 bg-gradient-to-r from-primary-blue/20 to-primary-lime/20 rounded-lg border border-primary-blue/30"
          animate={{ 
            x: [0, 10, 0], 
            y: [0, -5, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-12 h-8 bg-gradient-to-l from-primary-orange/20 to-primary-lime/20 rounded-md border border-primary-orange/30"
          animate={{ 
            x: [0, -8, 0], 
            y: [0, 8, 0],
            rotate: [0, -2, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Floating Data Points - Limited to 4 */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-primary-blue' : 
              i % 3 === 1 ? 'bg-primary-lime' : 'bg-primary-orange'
            }/40`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Particle Network - Simplified */}
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{ filter: 'blur(0.5px)' }}>
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18A0FB" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#59FF70" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF7A45" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Simplified network connections - only 3 lines */}
          <motion.line
            x1="20%" y1="30%" x2="80%" y2="70%"
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line
            x1="30%" y1="80%" x2="70%" y2="20%"
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          <motion.line
            x1="10%" y1="50%" x2="90%" y2="50%"
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-blue/10 to-primary-lime/10 backdrop-blur-sm border border-primary-blue/20 rounded-full px-4 py-2 mb-6"
        >
          <div className="flex items-center space-x-1">
            <Grid3X3 className="w-4 h-4 text-primary-blue" />
            <span className="text-sm font-medium text-primary-blue">
              {t('hero.badge.text')}
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-primary-blue via-primary-lime to-primary-orange bg-clip-text text-transparent">
            {t('hero.title.highlight')}
          </span><br />
          <span className="text-white">
            {t('hero.title.main')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-base sm:text-lg lg:text-xl xl:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDemoClick}
            aria-label="Schedule a live demo of Lunqo platform"
          >
            <span>{t('hero.scheduleDemo')}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="btn-secondary flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWatchClick}
            aria-label="Watch demo video of Lunqo platform"
          >
            <Play className="w-5 h-5" />
            <span>{t('hero.watchDemo')}</span>
          </motion.button>

          {/* Early Access Button */}
          <motion.button
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 focus:scale-105"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #84cc16 50%, #f97316 100%)',
              boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEarlyAccessClick}
            aria-label="Get early access to Lunqo platform"
          >
            <Star className="w-5 h-5" />
            <span>Get Early Access</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-dark-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA - Optional location indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex items-center justify-center space-x-2 text-dark-400"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {t('hero.location')}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 