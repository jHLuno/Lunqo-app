import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectLanguage, setLanguage as setLanguageStorage } from '../utils/localization';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    // Detect language on mount
    const detectedLang = detectLanguage();
    setLanguageState(detectedLang);
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguageStorage(newLanguage);
    setLanguageState(newLanguage);
  };

  const value = {
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 