import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, MapPin, Grid3X3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('hero.stats.fleetsServed'), value: '500+' },
    { label: t('hero.stats.dailyImpressions'), value: '2.5M+' },
    { label: t('hero.stats.citiesCovered'), value: '25+' },
    { label: t('hero.stats.uptime'), value: '99.9%' }
  ];

  const handleDemoClick = () => {
    window.open(t('urls.demo'), '_blank', 'noopener,noreferrer');
  };

  const handleWatchClick = () => {
    window.open(t('urls.website') + '/overview', '_blank', 'noopener,noreferrer');
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

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-primary-blue rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-2 h-2 bg-primary-lime rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-primary-lime rounded-full animate-pulse" />
            <span className="text-sm text-dark-300">{t('hero.badge')}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">Lunqo: </span>
            <span className="gradient-text">Light-Up Ads</span>
            <br />
            <span className="text-white">on the Go</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl lg:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed"
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
            >
              <span>{t('hero.scheduleDemo')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWatchClick}
            >
              <Play className="w-5 h-5" />
              <span>{t('hero.watchDemo')}</span>
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
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-dark-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center space-y-2 text-dark-300"
            >
              <span className="text-sm">{t('hero.scrollToExplore')}</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-dark-300 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-dark-300 rounded-full mt-2" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 