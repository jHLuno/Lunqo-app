import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { en } from '../translations/en';
import { ru } from '../translations/ru';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  // Memoize translations object to prevent unnecessary re-renders
  const translations = useMemo(() => ({
    en,
    ru
  }), []);

  // Optimize translation function with useCallback
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  }, [language, translations]);

  // Optimize language change function with useCallback
  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('lunqo-language', newLanguage);
    
    // Update URL to match the new language
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/(en|ru)/, `/${newLanguage}`);
    navigate(newPath);
  }, [location.pathname, navigate]);

  useEffect(() => {
    // Extract language from URL path
    const pathLanguage = location.pathname.split('/')[1];
    if (pathLanguage === 'en' || pathLanguage === 'ru') {
      setLanguage(pathLanguage);
      localStorage.setItem('lunqo-language', pathLanguage);
    } else {
      // Check for saved language preference if no language in URL
      const savedLanguage = localStorage.getItem('lunqo-language');
      if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
        // Only redirect if we're not already on a language path
        if (!location.pathname.startsWith('/en') && !location.pathname.startsWith('/ru')) {
          navigate(`/${savedLanguage}${location.pathname}`);
        }
      } else {
        // Default to English
        setLanguage('en');
        // Only redirect if we're not already on a language path
        if (!location.pathname.startsWith('/en') && !location.pathname.startsWith('/ru')) {
          navigate(`/en${location.pathname}`);
        }
      }
    }
  }, [location.pathname, navigate, translations]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    language,
    changeLanguage,
    t,
    translations
  }), [language, changeLanguage, t, translations]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 