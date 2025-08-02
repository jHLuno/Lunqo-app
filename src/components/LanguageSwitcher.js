import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <motion.button
      onClick={handleLanguageChange}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-dark-800/50 backdrop-blur-sm border border-dark-700 text-sm text-white hover:bg-dark-700/50 transition-colors duration-200 gpu-accelerated"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      <span className="font-medium">
        {language === 'en' ? 'EN' : 'RU'}
      </span>
      <motion.div
        className="w-4 h-4 rounded-full bg-primary-blue"
        animate={{
          x: language === 'en' ? 0 : 16,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default LanguageSwitcher; 